// ============================================================================
// RedChat Server v4.0 — Ultimate Edition
// ============================================================================
// Features: Real-time chat, email verification, password recovery, report
// system, admin dashboard, polls, pinned messages, user roles, auto-moderation,
// activity logging, server announcements, enhanced stats tracking
// ============================================================================

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const nodemailer = require('nodemailer');

// ============================================================================
// App Initialization
// ============================================================================

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    pingTimeout: 60000,
    maxHttpBufferSize: 100 * 1024 * 1024,
    cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// Ensure directories exist
[DATA_DIR, UPLOADS_DIR].forEach(function(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ============================================================================
// Middleware
// ============================================================================

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

const uploadLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 30,
    message: { error: 'Upload limit reached. Please wait.' }
});

// ============================================================================
// Cryptographic Helpers
// ============================================================================

function hashPassword(password, salt) {
    if (!salt) salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return { hash: hash, salt: salt };
}

function verifyPassword(password, storedHash, salt) {
    var result = hashPassword(password, salt);
    return result.hash === storedHash;
}

function generateToken(length) {
    return crypto.randomBytes(length || 32).toString('hex');
}

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ============================================================================
// Data File Management
// ============================================================================

var dataFiles = {
    accounts: 'accounts.json',
    avatars: 'avatars.json',
    stickers: 'stickers.json',
    rooms: 'rooms.json',
    messages: 'messages.json',
    bannedUsers: 'banned_users.json',
    reports: 'reports.json',
    announcements: 'announcements.json',
    polls: 'polls.json',
    pinnedMessages: 'pinned_messages.json',
    activityLog: 'activity_log.json',
    userNotes: 'user_notes.json',
    serverStats: 'server_stats.json',
    emailVerifications: 'email_verifications.json',
    passwordResets: 'password_resets.json',
    userRoles: 'user_roles.json',
    moderationLog: 'moderation_log.json',
    bookmarks: 'bookmarks.json'
};

function loadJSON(filename) {
    var filePath = path.join(DATA_DIR, filename);
    try {
        if (fs.existsSync(filePath)) {
            var data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error loading ' + filename + ':', err.message);
    }
    return {};
}

function saveJSON(filename, data) {
    var filePath = path.join(DATA_DIR, filename);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error saving ' + filename + ':', err.message);
    }
}

// ============================================================================
// Data Stores
// ============================================================================

// Core data
var accounts = new Map(Object.entries(loadJSON(dataFiles.accounts)));
var avatars = new Map(Object.entries(loadJSON(dataFiles.avatars)));
var stickers = new Map(Object.entries(loadJSON(dataFiles.stickers)));
var bannedUsers = new Map(Object.entries(loadJSON(dataFiles.bannedUsers)));
var userRoles = new Map(Object.entries(loadJSON(dataFiles.userRoles)));

// Reports system
var reports = [];
var reportsData = loadJSON(dataFiles.reports);
if (Array.isArray(reportsData)) {
    reports = reportsData;
} else if (reportsData.reports) {
    reports = reportsData.reports;
}

// Announcements
var announcements = [];
var announcementsData = loadJSON(dataFiles.announcements);
if (Array.isArray(announcementsData)) {
    announcements = announcementsData;
}

// Polls
var polls = new Map();
var pollsData = loadJSON(dataFiles.polls);
if (pollsData && typeof pollsData === 'object') {
    Object.entries(pollsData).forEach(function(entry) {
        polls.set(entry[0], entry[1]);
    });
}

// Pinned messages
var pinnedMessages = new Map();
var pinnedData = loadJSON(dataFiles.pinnedMessages);
if (pinnedData && typeof pinnedData === 'object') {
    Object.entries(pinnedData).forEach(function(entry) {
        pinnedMessages.set(entry[0], entry[1]);
    });
}

// Activity log
var activityLog = [];
var activityData = loadJSON(dataFiles.activityLog);
if (Array.isArray(activityData)) {
    activityLog = activityData;
}

// User notes (admin)
var userNotes = new Map(Object.entries(loadJSON(dataFiles.userNotes)));

// Email verifications
var emailVerifications = new Map(Object.entries(loadJSON(dataFiles.emailVerifications)));

// Password reset tokens
var passwordResets = new Map(Object.entries(loadJSON(dataFiles.passwordResets)));

// Bookmarks
var bookmarks = new Map(Object.entries(loadJSON(dataFiles.bookmarks)));

// Moderation log
var moderationLog = [];
var modLogData = loadJSON(dataFiles.moderationLog);
if (Array.isArray(modLogData)) {
    moderationLog = modLogData;
}

// Server stats
var serverStats = loadJSON(dataFiles.serverStats);
if (!serverStats.startTime) {
    serverStats = {
        startTime: Date.now(),
        totalMessages: 0,
        totalLogins: 0,
        totalRegistrations: 0,
        totalFileUploads: 0,
        totalReports: 0,
        totalBans: 0,
        peakOnlineUsers: 0,
        dailyStats: {},
        hourlyActivity: {}
    };
}

// ============================================================================
// Runtime State
// ============================================================================

var onlineUsers = new Map(); // username -> { socketId, status, joinedAt, rooms }
var socketToUser = new Map(); // socketId -> username
var typingUsers = new Map(); // room -> Set of usernames
var messageHistory = new Map(); // room -> [messages]
var customRooms = new Map(); // roomId -> room data
var dmHistory = new Map(); // dmKey -> [messages]

// Bridge: roomMessages proxy so v5 code using roomMessages[room] works with messageHistory Map
var roomMessages = new Proxy({}, {
    get: function(target, prop) {
        if (typeof prop !== 'string') return undefined;
        return messageHistory.get(prop);
    },
    set: function(target, prop, value) {
        messageHistory.set(prop, Array.isArray(value) ? value : []);
        return true;
    },
    has: function(target, prop) {
        return messageHistory.has(prop);
    },
    ownKeys: function() {
        return Array.from(messageHistory.keys());
    },
    getOwnPropertyDescriptor: function(target, prop) {
        if (messageHistory.has(prop)) {
            return { configurable: true, enumerable: true, writable: true, value: messageHistory.get(prop) };
        }
    }
});

// Admin users
var ADMIN_USERS = new Set(['gelimorto']);
var MODERATOR_USERS = new Set();

// Load roles
userRoles.forEach(function(role, username) {
    if (role === 'admin') ADMIN_USERS.add(username);
    if (role === 'moderator') MODERATOR_USERS.add(username);
});

// Auto-moderation word filter
var FILTERED_WORDS = [
    'spam', 'scam', 'phishing'
];

var AUTO_MOD_SETTINGS = {
    enabled: true,
    maxCapsPercentage: 80,
    maxMessageLength: 5000,
    minMessageInterval: 500,
    maxRepeatedChars: 15,
    warnBeforeMute: true
};

var userWarnings = new Map(); // username -> { count, lastWarning }
var mutedUsers = new Map(); // username -> { until, reason }

// ============================================================================
// Predefined Rooms
// ============================================================================

var PREDEFINED_ROOMS = [
    { id: 'general', name: 'General', description: 'General discussion', icon: 'fa-comments', color: '#667eea', isDefault: true },
    { id: 'gaming', name: 'Gaming', description: 'Gaming talk', icon: 'fa-gamepad', color: '#e74c3c' },
    { id: 'music', name: 'Music', description: 'Music lovers', icon: 'fa-music', color: '#9b59b6' },
    { id: 'tech', name: 'Technology', description: 'Tech discussion', icon: 'fa-laptop-code', color: '#3498db' },
    { id: 'movies', name: 'Movies & TV', description: 'Entertainment', icon: 'fa-film', color: '#e67e22' },
    { id: 'random', name: 'Random', description: 'Anything goes', icon: 'fa-dice', color: '#1abc9c' },
    { id: 'memes', name: 'Memes', description: 'Dank memes only', icon: 'fa-face-laugh-squint', color: '#f39c12' },
    { id: 'art', name: 'Art & Design', description: 'Creative corner', icon: 'fa-palette', color: '#e91e63' }
];

// Initialize predefined rooms
PREDEFINED_ROOMS.forEach(function(room) {
    if (!customRooms.has(room.id)) {
        customRooms.set(room.id, {
            id: room.id,
            name: room.name,
            description: room.description,
            icon: room.icon,
            color: room.color,
            creator: 'system',
            isPrivate: false,
            isPredefined: true,
            members: new Set(),
            created: Date.now()
        });
    }
    if (!messageHistory.has(room.id)) {
        messageHistory.set(room.id, []);
    }
});

// Load saved rooms
var savedRooms = loadJSON(dataFiles.rooms);
if (savedRooms && typeof savedRooms === 'object') {
    Object.entries(savedRooms).forEach(function(entry) {
        var id = entry[0];
        var room = entry[1];
        if (!customRooms.has(id)) {
            room.members = new Set(room.members || []);
            customRooms.set(id, room);
        }
    });
}

// Load saved messages
var savedMessages = loadJSON(dataFiles.messages);
if (savedMessages && typeof savedMessages === 'object') {
    Object.entries(savedMessages).forEach(function(entry) {
        messageHistory.set(entry[0], entry[1]);
    });
}

// ============================================================================
// Activity Logging
// ============================================================================

function logActivity(type, username, details) {
    var entry = {
        id: generateToken(8),
        type: type,
        username: username || 'system',
        details: details || '',
        timestamp: Date.now(),
        ip: ''
    };
    activityLog.push(entry);
    // Keep only last 10000 entries
    if (activityLog.length > 10000) {
        activityLog = activityLog.slice(-10000);
    }
    return entry;
}

function logModeration(action, moderator, target, reason) {
    var entry = {
        id: generateToken(8),
        action: action,
        moderator: moderator,
        target: target,
        reason: reason || '',
        timestamp: Date.now()
    };
    moderationLog.push(entry);
    if (moderationLog.length > 5000) {
        moderationLog = moderationLog.slice(-5000);
    }
    return entry;
}

// ============================================================================
// Stats Tracking
// ============================================================================

function trackDailyStat(key) {
    var today = new Date().toISOString().split('T')[0];
    if (!serverStats.dailyStats[today]) {
        serverStats.dailyStats[today] = { messages: 0, logins: 0, registrations: 0, reports: 0 };
    }
    if (serverStats.dailyStats[today][key] !== undefined) {
        serverStats.dailyStats[today][key]++;
    }
}

function trackHourlyActivity() {
    var hour = new Date().getHours().toString();
    if (!serverStats.hourlyActivity[hour]) {
        serverStats.hourlyActivity[hour] = 0;
    }
    serverStats.hourlyActivity[hour]++;
}

function updatePeakOnline() {
    var currentOnline = onlineUsers.size;
    if (currentOnline > serverStats.peakOnlineUsers) {
        serverStats.peakOnlineUsers = currentOnline;
    }
}

// ============================================================================
// Auto-Moderation
// ============================================================================

function checkAutoMod(username, message) {
    if (!AUTO_MOD_SETTINGS.enabled) return { allowed: true };
    if (isAdmin(username) || isModerator(username)) return { allowed: true };

    // Check muted
    if (mutedUsers.has(username)) {
        var muteInfo = mutedUsers.get(username);
        if (muteInfo.until > Date.now()) {
            return { allowed: false, reason: 'You are muted. Reason: ' + muteInfo.reason };
        } else {
            mutedUsers.delete(username);
        }
    }

    // Check message length
    if (message.length > AUTO_MOD_SETTINGS.maxMessageLength) {
        return { allowed: false, reason: 'Message too long (max ' + AUTO_MOD_SETTINGS.maxMessageLength + ' chars)' };
    }

    // Check caps percentage
    if (message.length > 10) {
        var upperCount = (message.match(/[A-Z]/g) || []).length;
        var letterCount = (message.match(/[a-zA-Z]/g) || []).length;
        if (letterCount > 0 && (upperCount / letterCount) * 100 > AUTO_MOD_SETTINGS.maxCapsPercentage) {
            addWarning(username, 'Excessive caps');
            return { allowed: true, warning: 'Please avoid excessive caps.' };
        }
    }

    // Check repeated characters
    var repeatedPattern = new RegExp('(.)\\1{' + AUTO_MOD_SETTINGS.maxRepeatedChars + ',}', 'g');
    if (repeatedPattern.test(message)) {
        addWarning(username, 'Character spam');
        return { allowed: true, warning: 'Please avoid character spam.' };
    }

    // Check filtered words
    var lowerMsg = message.toLowerCase();
    for (var i = 0; i < FILTERED_WORDS.length; i++) {
        if (lowerMsg.includes(FILTERED_WORDS[i])) {
            addWarning(username, 'Filtered word: ' + FILTERED_WORDS[i]);
            return { allowed: true, filtered: true, warning: 'Message contained filtered content.' };
        }
    }

    return { allowed: true };
}

function addWarning(username, reason) {
    if (!userWarnings.has(username)) {
        userWarnings.set(username, { count: 0, lastWarning: 0 });
    }
    var warnings = userWarnings.get(username);
    warnings.count++;
    warnings.lastWarning = Date.now();

    // Auto-mute after 5 warnings
    if (warnings.count >= 5) {
        mutedUsers.set(username, {
            until: Date.now() + 5 * 60 * 1000, // 5 minutes
            reason: 'Auto-mute: Too many warnings'
        });
        warnings.count = 0;
        logModeration('auto_mute', 'system', username, 'Too many warnings');
    }
}

// ============================================================================
// Role Management
// ============================================================================

function isAdmin(username) {
    return ADMIN_USERS.has(username);
}

function isModerator(username) {
    return MODERATOR_USERS.has(username) || ADMIN_USERS.has(username);
}

function getUserRole(username) {
    if (ADMIN_USERS.has(username)) return 'admin';
    if (MODERATOR_USERS.has(username)) return 'moderator';
    return 'member';
}

function setUserRole(username, role) {
    userRoles.set(username, role);
    ADMIN_USERS.delete(username);
    MODERATOR_USERS.delete(username);
    if (role === 'admin') ADMIN_USERS.add(username);
    if (role === 'moderator') MODERATOR_USERS.add(username);
    saveJSON(dataFiles.userRoles, Object.fromEntries(userRoles));
}

// ============================================================================
// Multer Configuration
// ============================================================================

var storage = multer.diskStorage({
    destination: function(req, file, cb) { cb(null, UPLOADS_DIR); },
    filename: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: function(req, file, cb) {
        var allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mp3|wav|ogg|pdf|doc|docx|txt|zip|rar|ptz/;
        var extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) { cb(null, true); }
        else { cb(new Error('File type not supported')); }
    }
});

// ============================================================================
// HTTP Routes
// ============================================================================

// Health metrics tracking middleware (must be before routes)
var healthMetrics = {
    requestsTotal: 0,
    requestsPerMinute: [],
    socketEventsTotal: 0,
    errorsTotal: 0,
    lastError: null,
    avgResponseTime: 0,
    responseTimes: []
};

app.use(function(req, res, next) {
    healthMetrics.requestsTotal++;
    var start = Date.now();
    res.on('finish', function() {
        var duration = Date.now() - start;
        healthMetrics.responseTimes.push(duration);
        if (healthMetrics.responseTimes.length > 100) healthMetrics.responseTimes.shift();
        healthMetrics.avgResponseTime = Math.round(
            healthMetrics.responseTimes.reduce(function(a, b) { return a + b; }, 0) /
            healthMetrics.responseTimes.length
        );
    });
    next();
});

// File upload
app.post('/upload', uploadLimiter, upload.single('file'), function(req, res) {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    serverStats.totalFileUploads++;
    var fileUrl = '/uploads/' + req.file.filename;
    res.json({
        url: fileUrl,
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
    });
});

// Voice upload
app.post('/upload/voice', uploadLimiter, upload.single('voice'), function(req, res) {
    if (!req.file) return res.status(400).json({ error: 'No voice file uploaded' });
    serverStats.totalFileUploads++;
    res.json({ url: '/uploads/' + req.file.filename });
});

// Health check
app.get('/health', function(req, res) {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        onlineUsers: onlineUsers.size,
        totalAccounts: accounts.size,
        totalRooms: customRooms.size,
        version: '5.0'
    });
});

// Search API
app.get('/api/search', function(req, res) {
    var query = (req.query.q || '').toLowerCase();
    var room = req.query.room || 'general';
    if (!query || query.length < 2) return res.json({ results: [] });

    var messages = messageHistory.get(room) || [];
    var results = messages.filter(function(m) {
        return (m.message && m.message.toLowerCase().includes(query)) ||
               (m.username && m.username.toLowerCase().includes(query));
    }).slice(-50);
    res.json({ results: results });
});

// ============================================================================
// Admin API Routes
// ============================================================================

// Middleware to check admin auth via query param (simple approach)
function adminAuth(req, res, next) {
    var username = req.query.user || req.headers['x-admin-user'];
    if (!username || !isAdmin(username)) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    req.adminUser = username;
    next();
}

// Server stats
app.get('/api/admin/stats', adminAuth, function(req, res) {
    // Calculate additional stats
    var totalMessages = 0;
    messageHistory.forEach(function(msgs) { totalMessages += msgs.length; });

    var onlineList = [];
    onlineUsers.forEach(function(data, username) {
        onlineList.push({
            username: username,
            status: data.status,
            joinedAt: data.joinedAt,
            rooms: Array.from(data.rooms || [])
        });
    });

    // User stats
    var totalUsers = accounts.size;
    var activeToday = 0;
    var today = new Date().toISOString().split('T')[0];
    accounts.forEach(function(acc) {
        if (acc.lastLogin) {
            var loginDate = new Date(acc.lastLogin).toISOString().split('T')[0];
            if (loginDate === today) activeToday++;
        }
    });

    // Room stats
    var roomStats = [];
    customRooms.forEach(function(room, id) {
        var msgs = messageHistory.get(id) || [];
        roomStats.push({
            id: id,
            name: room.name,
            members: room.members ? room.members.size : 0,
            messages: msgs.length,
            isPredefined: room.isPredefined || false
        });
    });

    res.json({
        server: {
            uptime: process.uptime(),
            startTime: serverStats.startTime,
            version: '5.0',
            nodeVersion: process.version,
            memoryUsage: process.memoryUsage(),
            platform: process.platform
        },
        users: {
            total: totalUsers,
            online: onlineUsers.size,
            activeToday: activeToday,
            banned: bannedUsers.size,
            peakOnline: serverStats.peakOnlineUsers
        },
        messages: {
            total: totalMessages,
            todayCount: serverStats.dailyStats[today] ? serverStats.dailyStats[today].messages : 0
        },
        rooms: roomStats,
        onlineUsers: onlineList,
        reports: {
            total: reports.length,
            pending: reports.filter(function(r) { return r.status === 'pending'; }).length,
            resolved: reports.filter(function(r) { return r.status === 'resolved'; }).length
        },
        totals: serverStats,
        dailyStats: serverStats.dailyStats,
        hourlyActivity: serverStats.hourlyActivity
    });
});

// Reports management
app.get('/api/admin/reports', adminAuth, function(req, res) {
    var status = req.query.status;
    var filtered = reports;
    if (status) {
        filtered = reports.filter(function(r) { return r.status === status; });
    }
    res.json({ reports: filtered });
});

app.post('/api/admin/reports/:id/resolve', adminAuth, function(req, res) {
    var reportId = req.params.id;
    var report = reports.find(function(r) { return r.id === reportId; });
    if (!report) return res.status(404).json({ error: 'Report not found' });

    report.status = 'resolved';
    report.resolvedBy = req.adminUser;
    report.resolvedAt = Date.now();
    report.resolution = req.body.resolution || 'Resolved by admin';
    saveJSON(dataFiles.reports, reports);
    logModeration('resolve_report', req.adminUser, report.reportedUser, report.resolution);
    res.json({ success: true, report: report });
});

// Activity log
app.get('/api/admin/activity', adminAuth, function(req, res) {
    var limit = parseInt(req.query.limit) || 100;
    var type = req.query.type;
    var filtered = activityLog;
    if (type) {
        filtered = activityLog.filter(function(a) { return a.type === type; });
    }
    res.json({ activities: filtered.slice(-limit) });
});

// Moderation log
app.get('/api/admin/moderation', adminAuth, function(req, res) {
    var limit = parseInt(req.query.limit) || 100;
    res.json({ log: moderationLog.slice(-limit) });
});

// User management
app.get('/api/admin/users', adminAuth, function(req, res) {
    var users = [];
    accounts.forEach(function(acc, username) {
        users.push({
            username: username,
            email: acc.email || '',
            role: getUserRole(username),
            created: acc.created,
            lastLogin: acc.lastLogin,
            loginCount: acc.loginCount || 0,
            messagesSent: acc.messagesSent || 0,
            isOnline: onlineUsers.has(username),
            isBanned: bannedUsers.has(username),
            isVerified: acc.emailVerified || false,
            status: onlineUsers.has(username) ? onlineUsers.get(username).status : 'offline'
        });
    });
    res.json({ users: users });
});

// Announcements
app.get('/api/admin/announcements', adminAuth, function(req, res) {
    res.json({ announcements: announcements });
});

app.post('/api/admin/announcements', adminAuth, function(req, res) {
    var duration = Math.max(5, Math.min(300, parseInt(req.body.duration) || 30));
    var announcement = {
        id: generateToken(8),
        title: req.body.title || 'Announcement',
        message: req.body.message,
        type: req.body.type || 'info',
        duration: duration,
        creator: req.adminUser,
        created: Date.now(),
        active: true
    };
    announcements.push(announcement);
    saveJSON(dataFiles.announcements, announcements);

    // Broadcast to all connected users
    io.emit('announcement', announcement);
    logActivity('announcement', req.adminUser, announcement.title);
    res.json({ success: true, announcement: announcement });
});

// User notes
app.get('/api/admin/notes/:username', adminAuth, function(req, res) {
    var notes = userNotes.get(req.params.username) || [];
    res.json({ notes: notes });
});

app.post('/api/admin/notes/:username', adminAuth, function(req, res) {
    var username = req.params.username;
    if (!userNotes.has(username)) userNotes.set(username, []);
    var notes = userNotes.get(username);
    notes.push({
        id: generateToken(8),
        text: req.body.note,
        author: req.adminUser,
        created: Date.now()
    });
    saveJSON(dataFiles.userNotes, Object.fromEntries(userNotes));
    res.json({ success: true });
});

// ============================================================================
// Email System (Gmail SMTP)
// ============================================================================
var smtpTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'redchatverif@gmail.com',
        pass: 'wgmy fmsk cvmk xidu'
    }
});

function sendEmail(to, subject, htmlBody) {
    return smtpTransporter.sendMail({
        from: '"RedChat" <redchatverif@gmail.com>',
        to: to,
        subject: subject,
        html: htmlBody
    }).then(function(info) {
        console.log('[EMAIL] Sent to ' + to + ': ' + info.messageId);
        return true;
    }).catch(function(err) {
        console.error('[EMAIL] Failed to send to ' + to + ':', err.message);
        return false;
    });
}

function sendVerificationEmail(email, code, username) {
    var subject = 'RedChat — Verify Your Email';
    var html = '<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:20px;background:#0d1117;color:#c9d1d9;border-radius:12px;">' +
        '<h1 style="color:#667eea;text-align:center;">RedChat</h1>' +
        '<h2 style="text-align:center;">Email Verification</h2>' +
        '<p>Hi <strong>' + username + '</strong>,</p>' +
        '<p>Your verification code is:</p>' +
        '<div style="text-align:center;margin:24px 0;"><span style="font-size:32px;font-weight:bold;letter-spacing:6px;background:#161b22;padding:16px 32px;border-radius:8px;color:#667eea;">' + code + '</span></div>' +
        '<p>This code expires in 30 minutes.</p>' +
        '<p style="color:#484f58;font-size:12px;">If you didn\'t request this, you can safely ignore this email.</p>' +
        '</div>';
    return sendEmail(email, subject, html);
}

function sendPasswordResetEmail(email, code, username) {
    var subject = 'RedChat — Password Reset';
    var html = '<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:20px;background:#0d1117;color:#c9d1d9;border-radius:12px;">' +
        '<h1 style="color:#667eea;text-align:center;">RedChat</h1>' +
        '<h2 style="text-align:center;">Password Reset</h2>' +
        '<p>Hi <strong>' + username + '</strong>,</p>' +
        '<p>Your password reset code is:</p>' +
        '<div style="text-align:center;margin:24px 0;"><span style="font-size:32px;font-weight:bold;letter-spacing:6px;background:#161b22;padding:16px 32px;border-radius:8px;color:#f85149;">' + code + '</span></div>' +
        '<p>This code expires in 1 hour.</p>' +
        '<p style="color:#484f58;font-size:12px;">If you didn\'t request this, please secure your account.</p>' +
        '</div>';
    return sendEmail(email, subject, html);
}

function createVerificationCode(username, email) {
    var code = generateVerificationCode();
    var token = generateToken(16);
    emailVerifications.set(username, {
        code: code,
        token: token,
        email: email,
        created: Date.now(),
        expires: Date.now() + 30 * 60 * 1000, // 30 minutes
        attempts: 0
    });
    saveJSON(dataFiles.emailVerifications, Object.fromEntries(emailVerifications));
    return { code: code, token: token };
}

function verifyEmailCode(username, code) {
    var verification = emailVerifications.get(username);
    if (!verification) return { success: false, error: 'No verification pending' };
    if (Date.now() > verification.expires) {
        emailVerifications.delete(username);
        return { success: false, error: 'Verification code expired' };
    }
    verification.attempts++;
    if (verification.attempts > 5) {
        emailVerifications.delete(username);
        return { success: false, error: 'Too many attempts' };
    }
    if (verification.code !== code) {
        return { success: false, error: 'Invalid verification code' };
    }
    emailVerifications.delete(username);
    saveJSON(dataFiles.emailVerifications, Object.fromEntries(emailVerifications));
    return { success: true };
}

// ============================================================================
// Password Recovery System
// ============================================================================

function createPasswordReset(username) {
    var account = accounts.get(username);
    if (!account) return null;

    var token = generateToken(32);
    var code = generateVerificationCode();
    passwordResets.set(username, {
        token: token,
        code: code,
        created: Date.now(),
        expires: Date.now() + 60 * 60 * 1000, // 1 hour
        attempts: 0
    });
    saveJSON(dataFiles.passwordResets, Object.fromEntries(passwordResets));
    return { token: token, code: code, email: account.email };
}

function resetUserPassword(username, code, newPassword) {
    var resetData = passwordResets.get(username);
    if (!resetData) return { success: false, error: 'No password reset pending' };
    if (Date.now() > resetData.expires) {
        passwordResets.delete(username);
        return { success: false, error: 'Reset code expired' };
    }
    resetData.attempts++;
    if (resetData.attempts > 5) {
        passwordResets.delete(username);
        return { success: false, error: 'Too many attempts' };
    }
    if (resetData.code !== code) {
        return { success: false, error: 'Invalid reset code' };
    }

    // Update password
    var account = accounts.get(username);
    if (!account) return { success: false, error: 'Account not found' };

    var hashed = hashPassword(newPassword);
    account.passwordHash = hashed.hash;
    account.salt = hashed.salt;
    account.passwordChanged = Date.now();
    accounts.set(username, account);
    saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

    passwordResets.delete(username);
    saveJSON(dataFiles.passwordResets, Object.fromEntries(passwordResets));

    logActivity('password_reset', username, 'Password was reset');
    return { success: true };
}

// ============================================================================
// Slash Commands
// ============================================================================

function handleSlashCommand(command, args, username, room) {
    var cmd = command.toLowerCase();
    var result = null;

    switch (cmd) {
        case '/roll':
        case '/dice':
            var max = parseInt(args[0]) || 6;
            var roll = Math.floor(Math.random() * max) + 1;
            result = { message: '🎲 ' + username + ' rolled a ' + roll + ' (1-' + max + ')' };
            break;
        case '/flip':
        case '/coin':
            var flip = Math.random() < 0.5 ? 'Heads' : 'Tails';
            result = { message: '🪙 ' + username + ' flipped a coin: ' + flip + '!' };
            break;
        case '/8ball':
            var responses = [
                'It is certain.', 'Without a doubt.', 'Yes, definitely.',
                'You may rely on it.', 'As I see it, yes.', 'Most likely.',
                'Outlook good.', 'Yes.', 'Signs point to yes.',
                'Reply hazy, try again.', 'Ask again later.',
                'Better not tell you now.', 'Cannot predict now.',
                'Concentrate and ask again.', 'Don\'t count on it.',
                'My reply is no.', 'My sources say no.',
                'Outlook not so good.', 'Very doubtful.'
            ];
            var answer = responses[Math.floor(Math.random() * responses.length)];
            result = { message: '🎱 ' + answer };
            break;
        case '/shrug':
            result = { message: '¯\\_(ツ)_/¯', isUser: true };
            break;
        case '/tableflip':
            result = { message: '(╯°□°)╯︵ ┻━┻', isUser: true };
            break;
        case '/unflip':
            result = { message: '┬─┬ノ( º _ ºノ)', isUser: true };
            break;
        case '/lenny':
            result = { message: '( ͡° ͜ʖ ͡°)', isUser: true };
            break;
        case '/disapprove':
            result = { message: 'ಠ_ಠ', isUser: true };
            break;
        case '/sparkle':
            result = { message: '✨ ' + args.join(' ') + ' ✨', isUser: true };
            break;
        case '/me':
            result = { message: '* ' + username + ' ' + args.join(' '), isAction: true };
            break;
        case '/poll':
            // Handled separately
            break;
        case '/announce':
            if (isAdmin(username)) {
                var msg = args.join(' ');
                if (msg) {
                    var announcement = {
                        id: generateToken(8),
                        title: 'Server Announcement',
                        message: msg,
                        type: 'info',
                        creator: username,
                        created: Date.now(),
                        active: true
                    };
                    announcements.push(announcement);
                    saveJSON(dataFiles.announcements, announcements);
                    io.emit('announcement', announcement);
                    result = { message: '📢 Announcement sent!' };
                }
            } else {
                result = { message: '❌ Only admins can send announcements.' };
            }
            break;
        case '/clear':
            if (isAdmin(username)) {
                result = { message: '🧹 Chat cleared by admin.', clearChat: true };
            }
            break;
        case '/stats':
            var totalMessages = 0;
            messageHistory.forEach(function(msgs) { totalMessages += msgs.length; });
            result = {
                message: '📊 Server Stats:\n' +
                    '• Online: ' + onlineUsers.size + ' users\n' +
                    '• Total accounts: ' + accounts.size + '\n' +
                    '• Total messages: ' + totalMessages + '\n' +
                    '• Rooms: ' + customRooms.size + '\n' +
                    '• Uptime: ' + Math.floor(process.uptime() / 60) + ' minutes'
            };
            break;
        case '/help':
            result = {
                message: '📋 Available Commands:\n' +
                    '/roll [max] - Roll a dice\n' +
                    '/flip - Flip a coin\n' +
                    '/8ball - Ask the magic 8-ball\n' +
                    '/shrug - ¯\\_(ツ)_/¯\n' +
                    '/tableflip - Flip a table\n' +
                    '/unflip - Put it back\n' +
                    '/lenny - ( ͡° ͜ʖ ͡°)\n' +
                    '/me [action] - Action message\n' +
                    '/sparkle [text] - Sparkle text\n' +
                    '/stats - Server statistics\n' +
                    '/poll [question] | [opt1] | [opt2] ... - Create poll\n' +
                    '/help - Show this help'
            };
            break;
        default:
            break;
    }

    return result;
}

// ============================================================================
// Helper Functions
// ============================================================================

function getDMKey(user1, user2) {
    return [user1, user2].sort().join('-dm-');
}

function broadcastUserList(room) {
    var roomData = customRooms.get(room);
    var userList = [];

    onlineUsers.forEach(function(data, username) {
        var shouldShow = false;
        if (roomData && roomData.isPredefined) {
            shouldShow = true;
        } else if (roomData && roomData.members && roomData.members.has(username)) {
            shouldShow = true;
        } else if (room === 'general') {
            shouldShow = true;
        }

        if (shouldShow) {
            userList.push({
                username: username,
                status: data.status || 'online',
                avatar: avatars.get(username) || null,
                role: getUserRole(username),
                nameColor: accounts.get(username) ? accounts.get(username).nameColor : null
            });
        }
    });

    io.to(room).emit('userListUpdate', userList);
    io.to(room).emit('userList', userList);
}

function broadcastRoomLists() {
    onlineUsers.forEach(function(data, username) {
        var rooms = getRoomsForUser(username);
        var socketId = data.socketId;
        if (socketId) {
            // Separate predefined and custom rooms, send room names for default rooms
            var defaultRooms = rooms.filter(function(r) { return r.isPredefined; }).map(function(r) { return r.name; });
            var customRoomsList = rooms.filter(function(r) { return !r.isPredefined; }).map(function(r) { return r.name; });
            var payload = { rooms: defaultRooms, customRooms: customRoomsList, allRooms: rooms };
            io.to(socketId).emit('roomsUpdate', payload);
            io.to(socketId).emit('roomList', payload);
        }
    });
}

function getRoomsForUser(username) {
    var rooms = [];
    customRooms.forEach(function(room, id) {
        var isMember = room.isPredefined || (room.members && room.members.has(username));
        var msgs = messageHistory.get(id) || [];
        rooms.push({
            id: id,
            name: room.name,
            description: room.description,
            icon: room.icon || 'fa-hashtag',
            color: room.color || '#667eea',
            creator: room.creator,
            isPrivate: room.isPrivate || false,
            isPredefined: room.isPredefined || false,
            memberCount: room.members ? room.members.size : 0,
            messageCount: msgs.length,
            joined: isMember,
            isPublic: !room.isPrivate
        });
    });
    return rooms;
}

function saveRooms() {
    var roomsObj = {};
    customRooms.forEach(function(room, id) {
        if (!room.isPredefined) {
            roomsObj[id] = {
                id: room.id,
                name: room.name,
                description: room.description,
                icon: room.icon,
                color: room.color,
                creator: room.creator,
                isPrivate: room.isPrivate,
                members: Array.from(room.members || []),
                created: room.created
            };
        }
    });
    saveJSON(dataFiles.rooms, roomsObj);
}

function saveMessages() {
    var msgsObj = {};
    messageHistory.forEach(function(msgs, room) {
        msgsObj[room] = msgs.slice(-500);
    });
    saveJSON(dataFiles.messages, msgsObj);
}

// ============================================================================
// Socket.IO Connection Handler
// ============================================================================

io.on('connection', function(socket) {
    console.log('New connection:', socket.id);

    // ========================================================================
    // v5 Event Compatibility Layer — translate client→server event names
    // ========================================================================
    // chatMessage → message (v4 handler name)
    socket.on('chatMessage', function(data) {
        var handlers = socket.listeners('message');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('sendMessage', function(data) {
        // Compatibility: client v5 sends 'sendMessage' with {text, room}
        var compat = { message: data.text || data.message, room: data.room, replyTo: data.replyTo, isSticker: data.isSticker, isCustomSticker: data.isCustomSticker };
        var handlers = socket.listeners('message');
        handlers.forEach(function(h) { h(compat); });
    });
    socket.on('autoLogin', function(data) {
        // Auto-login using saved username
        if (!data.username) return;
        var account = accounts.get(data.username);
        if (account && !bannedUsers.has(data.username)) {
            completeLogin(socket, data.username, account);
        } else {
            socket.emit('loginError', { message: 'Session expired. Please log in again.' });
        }
    });
    socket.on('getRoomList', function() {
        var handlers = socket.listeners('requestAvailableRooms');
        handlers.forEach(function(h) { h(); });
    });
    socket.on('getFriendsList', function() {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (account) socket.emit('friendsList', { friends: account.friends || [] });
    });
    socket.on('getFriendRequests', function() {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (account) {
            socket.emit('friendRequests', {
                sent: account.sentFriendRequests || [],
                received: account.friendRequests || []
            });
        }
    });
    socket.on('getMessageHistory', function(data) {
        var handlers = socket.listeners('requestChatHistory');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('getUserList', function() {
        // Send current room user list
        var room = socket.currentRoom || 'General';
        var roomObj = io.sockets.adapter.rooms.get(room);
        var users = [];
        if (roomObj) {
            roomObj.forEach(function(id) {
                var s = io.sockets.sockets.get(id);
                if (s && s.username) users.push(s.username);
            });
        }
        socket.emit('userList', { users: users });
    });
    socket.on('getDMHistory', function(data) {
        var username = socket.username || socketToUser.get(socket.id);
        if (!username || !data.with) return;
        var dmKey = getDMKey(username, data.with);
        var msgs = dmHistory.get(dmKey) || [];
        socket.emit('dmHistory', { messages: msgs.slice(-100) });
    });

    socket.on('rejoin', function(data) {
        var username = (data.username || '').trim();
        if (!username || !accounts.has(username)) return;

        // Re-authenticate socket mapping
        socketToUser.set(socket.id, username);
        var existing = onlineUsers.get(username);
        if (existing) {
            existing.socketId = socket.id;
        } else {
            onlineUsers.set(username, { socketId: socket.id, status: 'online', joinedAt: Date.now(), rooms: new Set(['general']) });
        }

        // Re-join all rooms
        socket.join('general');
        customRooms.forEach(function(room, id) {
            if (room.isPredefined || (room.members && room.members.has(username))) {
                socket.join(id);
                var userData = onlineUsers.get(username);
                if (userData) userData.rooms.add(id);
            }
        });

        // Sync all DM conversations for this user
        var dmConversations = {};
        dmHistory.forEach(function(messages, dmKey) {
            var parts = dmKey.split('-dm-');
            if (parts.length === 2) {
                var other = null;
                if (parts[0] === username) other = parts[1];
                else if (parts[1] === username) other = parts[0];
                if (other) dmConversations[other] = messages.slice(-100);
            }
        });
        socket.emit('dmSync', { conversations: dmConversations });

        // Sync friends and room list
        socket.emit('friendsUpdate', getFriendsData(username));
        var allRooms = getRoomsForUser(username);
        socket.emit('roomList', {
            rooms: allRooms.filter(function(r) { return r.isPredefined; }).map(function(r) { return r.name; }),
            customRooms: allRooms.filter(function(r) { return !r.isPredefined; }).map(function(r) { return r.name; }),
            allRooms: allRooms
        });

        // Sync avatars
        var avatarObj = {};
        avatars.forEach(function(url, user) { avatarObj[user] = url; });
        socket.emit('avatarData', avatarObj);

        broadcastUserList('general');
    });

    socket.on('acceptFriend', function(data) {
        var handlers = socket.listeners('acceptFriendRequest');
        handlers.forEach(function(h) { h({ fromUsername: data.username || data.from || data.fromUsername }); });
    });
    socket.on('rejectFriend', function(data) {
        var handlers = socket.listeners('rejectFriendRequest');
        handlers.forEach(function(h) { h({ fromUsername: data.username || data.from || data.fromUsername }); });
    });
    socket.on('friendRequest', function(data) {
        var handlers = socket.listeners('sendFriendRequest');
        handlers.forEach(function(h) { h({ targetUsername: data.to || data.username || data.target || data.targetUsername }); });
    });
    socket.on('report', function(data) {
        var handlers = socket.listeners('reportUser');
        handlers.forEach(function(h) { h({ reportedUser: data.reported || data.reportedUser, reason: data.reason, details: data.details, room: data.room, messageId: data.messageId }); });
    });
    socket.on('getPinned', function(data) {
        var handlers = socket.listeners('getPinnedMessages');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('getBookmarks', function() {
        // Forwarded to v5 handler below
        var username = socketToUser.get(socket.id);
        if (!username) return;
        var bmarks = bookmarks.get(username) || [];
        socket.emit('bookmarksUpdate', { bookmarks: bmarks });
        socket.emit('bookmarks', { bookmarks: bmarks });
    });
    socket.on('bookmark', function(data) {
        var handlers = socket.listeners('bookmarkMessage');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('removeBookmark', function(data) {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (account && account.bookmarks) {
            account.bookmarks = account.bookmarks.filter(function(b) { return b.messageId !== data.messageId; });
            saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
            socket.emit('bookmarks', { bookmarks: account.bookmarks });
        }
    });
    socket.on('setStatus', function(data) {
        var handlers = socket.listeners('changeStatus');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('changeDisplayName', function(data) {
        var username = socket.username;
        if (!username || !data.name) return;
        var account = accounts.get(username);
        if (account) {
            account.displayName = data.name.substring(0, 30);
            saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
            socket.emit('profileData', { username: username, displayName: account.displayName });
        }
    });
    socket.on('changeNameColor', function(data) {
        var handlers = socket.listeners('updateNameColor');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('changePassword', function(data) {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (!account) return;
        if (!verifyPassword(data.currentPassword, account.hash, account.salt)) {
            socket.emit('error', { message: 'Wrong current password' });
            return;
        }
        var newCreds = hashPassword(data.newPassword);
        account.hash = newCreds.hash;
        account.salt = newCreds.salt;
        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
        socket.emit('passwordResetSuccess', { message: 'Password changed successfully' });
    });
    socket.on('deleteAccount', function() {
        var username = socket.username;
        if (!username) return;
        accounts.delete(username);
        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
        socket.emit('error', { message: 'Account deleted. You will be disconnected.' });
        socket.disconnect();
    });
    socket.on('updateAvatar', function(data) {
        var handlers = socket.listeners('updateProfilePic');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('browseRooms', function() {
        var roomList = [];
        PREDEFINED_ROOMS.forEach(function(r) { roomList.push({ name: r.name, id: r.id, type: 'default', icon: r.icon, color: r.color, description: r.description }); });
        customRooms.forEach(function(val, key) {
          if (!val.isPredefined) roomList.push({ name: val.name || key, id: key, type: 'custom', members: val.members ? val.members.size || 0 : 0 });
        });
        socket.emit('browseRooms', { rooms: roomList });
    });
    socket.on('getStickers', function() {
        var handlers = socket.listeners('requestStickers');
        handlers.forEach(function(h) { h(); });
    });
    socket.on('getAnnouncements', function() {
        socket.emit('announcementsList', { announcements: announcements || [] });
    });
    socket.on('announce', function(data) {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (!account || account.role !== 'admin') return;
        var duration = Math.max(5, Math.min(300, parseInt(data.duration) || 30));
        var ann = { title: data.title, message: data.message, type: data.type || 'info', duration: duration, author: username, timestamp: Date.now() };
        if (!announcements) announcements = [];
        announcements.push(ann);
        io.emit('announcement', ann);
    });
    // Admin events for v5 client
    socket.on('adminGetStats', function() {
        var handlers = socket.listeners('getAdminStats');
        handlers.forEach(function(h) { h(); });
    });
    socket.on('adminGetUsers', function() {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (!account || account.role !== 'admin') return;
        var users = [];
        accounts.forEach(function(val, key) {
            users.push({ username: key, role: val.role || 'member', level: val.level || 1, avatar: val.avatar || '', email: val.email || '' });
        });
        socket.emit('adminUsers', { users: users });
    });
    socket.on('adminGetRooms', function() {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (!account || account.role !== 'admin') return;
        var rooms = [];
        PREDEFINED_ROOMS.forEach(function(r) { rooms.push({ name: r.name, id: r.id, type: 'default' }); });
        customRooms.forEach(function(val, key) {
          if (!val.isPredefined) rooms.push({ name: val.name || key, id: key, type: 'custom', creator: val.creator });
        });
        socket.emit('adminRooms', { rooms: rooms });
    });
    socket.on('adminGetReports', function() {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (!account || account.role !== 'admin') return;
        socket.emit('adminReports', { reports: reports || [] });
    });
    socket.on('adminGetBans', function() {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (!account || account.role !== 'admin') return;
        var bans = [];
        bannedUsers.forEach(function(val, key) { bans.push({ username: key, reason: val.reason, timestamp: val.timestamp || val.bannedAt }); });
        socket.emit('bannedUsers', { bans: bans });
    });
    socket.on('adminBan', function(data) {
        var handlers = socket.listeners('banUser');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('adminUnban', function(data) {
        var handlers = socket.listeners('unbanUser');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('adminSetRole', function(data) {
        var handlers = socket.listeners('setUserRole');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('adminDeleteRoom', function(data) {
        var handlers = socket.listeners('deleteRoom');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('adminResolveReport', function(data) {
        var handlers = socket.listeners('resolveReport');
        handlers.forEach(function(h) { h(data); });
    });
    socket.on('adminSearchUsers', function(data) {
        var username = socket.username;
        if (!username) return;
        var account = accounts.get(username);
        if (!account || account.role !== 'admin') return;
        var q = (data.query || '').toLowerCase();
        var results = [];
        accounts.forEach(function(val, key) {
            if (key.toLowerCase().includes(q)) {
                results.push({ username: key, role: val.role || 'member', level: val.level || 1 });
            }
        });
        socket.emit('adminUsers', { users: results });
    });

    // ========================================================================
    // v5 Emit Compatibility — dual-emit old→new event names
    // ========================================================================
    var _origEmit = socket.emit.bind(socket);
    var emitAliases = {
        'registrationSuccess': 'registerSuccess',
        'chatHistory': 'messageHistory',
        'joinedRoom': 'roomJoined',
        'availableRooms': 'roomList',
        'roomsUpdate': 'roomList',
        'userListUpdate': 'userList',
        'friendsUpdate': 'friendsList',
        'friendRequestsUpdate': 'friendRequests',
        'userTyping': 'typing',
        'userStopTyping': 'stopTyping',
        'reactionUpdate': 'reactionUpdated',
        'newPoll': 'pollCreated',
        'pollUpdate': 'pollUpdated',
        'wheelSpinResult': 'wheelResult',
        'emailVerified': 'verifySuccess',
        'bookmarksUpdate': 'bookmarks',
        'chatMessage': 'message',
        'accountCreated': 'registerSuccess',
        'bannedUsersList': 'bannedUsers',
        'reportsList': 'adminReports',
        'allUsers': 'adminUsers',
        'syncStickers': 'stickerList',
        'kickedFromRoom': 'kicked',
        'roomInvitation': 'roomInvite',
        'passwordResetSent': 'resetCodeSent',
        'passwordResetError': 'resetError',
        'roomCreated': 'roomCreated',
        'roomDeleted': 'roomDeleted'
    };
    socket.emit = function(event) {
        var args = Array.prototype.slice.call(arguments);
        _origEmit.apply(null, args);  // send original event
        if (emitAliases[event]) {
            args[0] = emitAliases[event];
            _origEmit.apply(null, args);  // also send under new name
        }
    };

    // ========================================================================
    // Authentication: Register
    // ========================================================================
    socket.on('register', function(data) {
        var username = (data.username || '').trim();
        var password = data.password || '';
        var email = (data.email || '').trim();

        // Validation
        if (!username || username.length < 2 || username.length > 20) {
            socket.emit('registerError', { message: 'Username must be 2-20 characters' });
            return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            socket.emit('registerError', { message: 'Username can only contain letters, numbers, and underscores' });
            return;
        }
        if (password.length < 4) {
            socket.emit('registerError', { message: 'Password must be at least 4 characters' });
            return;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            socket.emit('registerError', { message: 'Invalid email format' });
            return;
        }
        if (accounts.has(username)) {
            socket.emit('registerError', { message: 'Username already taken' });
            return;
        }

        // Check if email is already used
        if (email) {
            var emailTaken = false;
            accounts.forEach(function(acc) {
                if (acc.email && acc.email.toLowerCase() === email.toLowerCase()) {
                    emailTaken = true;
                }
            });
            if (emailTaken) {
                socket.emit('registerError', { message: 'Email already registered' });
                return;
            }
        }

        // Create account
        var hashed = hashPassword(password);
        var account = {
            passwordHash: hashed.hash,
            salt: hashed.salt,
            email: email || '',
            emailVerified: !email, // If no email, consider verified
            created: Date.now(),
            lastLogin: Date.now(),
            loginCount: 1,
            messagesSent: 0,
            bio: '',
            nameColor: '',
            settings: {},
            friends: [],
            friendRequests: { sent: [], received: [] },
            blocked: [],
            achievements: [],
            xp: 0,
            level: 1
        };

        accounts.set(username, account);
        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

        serverStats.totalRegistrations++;
        trackDailyStat('registrations');
        logActivity('register', username, 'New account created');

        // If email provided, create verification
        if (email) {
            var verification = createVerificationCode(username, email);
            // Send verification email
            sendVerificationEmail(email, verification.code, username);
            socket.emit('registerSuccess', {
                username: username,
                requiresVerification: true
            });
        } else {
            // Auto-login
            completeLogin(socket, username, account);
        }
    });

    // ========================================================================
    // Authentication: Login
    // ========================================================================
    socket.on('login', function(data) {
        var username = (data.username || '').trim();
        var password = data.password || '';
        var captchaAnswer = data.captchaAnswer;
        var expectedCaptcha = data.expectedCaptcha;

        if (!username || !password) {
            socket.emit('loginError', { message: 'Please enter username and password' });
            return;
        }

        // Check ban
        if (bannedUsers.has(username)) {
            var ban = bannedUsers.get(username);
            if (ban.expiresAt && Date.now() > ban.expiresAt) {
                bannedUsers.delete(username);
                saveJSON(dataFiles.bannedUsers, Object.fromEntries(bannedUsers));
            } else {
                var banMsg = 'You are banned. Reason: ' + (ban.reason || 'No reason given');
                if (ban.expiresAt) banMsg += '. Expires: ' + new Date(ban.expiresAt).toLocaleString();
                socket.emit('loginError', { message: banMsg });
                return;
            }
        }

        var account = accounts.get(username);
        if (!account) {
            // New account registration via login form (backwards compat)
            if (captchaAnswer && expectedCaptcha) {
                if (parseInt(captchaAnswer) !== parseInt(expectedCaptcha)) {
                    socket.emit('loginError', { message: 'Incorrect captcha answer' });
                    return;
                }
            }

            var hashed = hashPassword(password);
            account = {
                passwordHash: hashed.hash,
                salt: hashed.salt,
                email: '',
                emailVerified: false,
                created: Date.now(),
                lastLogin: Date.now(),
                loginCount: 1,
                messagesSent: 0,
                bio: '',
                nameColor: '',
                settings: {},
                friends: [],
                friendRequests: { sent: [], received: [] },
                blocked: [],
                achievements: [],
                xp: 0,
                level: 1
            };
            accounts.set(username, account);
            saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
            serverStats.totalRegistrations++;
            trackDailyStat('registrations');
            logActivity('register', username, 'Account created via login form');

            socket.emit('accountCreated', { username: username });
            completeLogin(socket, username, account);
            return;
        }

        // Verify password
        if (!verifyPassword(password, account.passwordHash, account.salt)) {
            socket.emit('loginError', { message: 'Invalid password' });
            return;
        }

        // Update login stats
        account.lastLogin = Date.now();
        account.loginCount = (account.loginCount || 0) + 1;
        accounts.set(username, account);
        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

        completeLogin(socket, username, account);
    });

    // ========================================================================
    // Complete Login (shared logic)
    // ========================================================================
    function completeLogin(sock, username, account) {
        // Disconnect existing session
        if (onlineUsers.has(username)) {
            var existing = onlineUsers.get(username);
            var existingSocket = io.sockets.sockets.get(existing.socketId);
            if (existingSocket) {
                existingSocket.emit('forceDisconnect', { reason: 'Logged in from another location' });
                existingSocket.disconnect(true);
            }
        }

        socketToUser.set(sock.id, username);
        onlineUsers.set(username, {
            socketId: sock.id,
            status: 'online',
            joinedAt: Date.now(),
            rooms: new Set(['general'])
        });

        // Join general room
        sock.join('general');

        // Join all rooms user is member of
        customRooms.forEach(function(room, id) {
            if (room.isPredefined || (room.members && room.members.has(username))) {
                sock.join(id);
                var userData = onlineUsers.get(username);
                if (userData) userData.rooms.add(id);
            }
        });

        serverStats.totalLogins++;
        trackDailyStat('logins');
        trackHourlyActivity();
        updatePeakOnline();
        logActivity('login', username, 'User logged in');

        // Send login success
        sock.emit('loginSuccess', {
            username: username,
            role: getUserRole(username),
            isAdmin: isAdmin(username),
            isModerator: isModerator(username),
            settings: account.settings || {},
            email: account.email || '',
            emailVerified: account.emailVerified || false,
            xp: account.xp || 0,
            level: account.level || 1,
            achievements: account.achievements || [],
            avatar: avatars.get(username) || '',
            bio: account.bio || '',
            nameColor: account.nameColor || '',
            bannerColor: account.bannerColor || '',
            bannerColor2: account.bannerColor2 || ''
        });

        // Send chat history  
        var generalHistory = (messageHistory.get('general') || []).map(function(m) {
            return Object.assign({}, m, { text: m.text || m.message, message: m.message || m.text, room: 'General' });
        });
        sock.emit('chatHistory', { room: 'General', messages: generalHistory.slice(-100) });
        sock.emit('messageHistory', { room: 'General', messages: generalHistory.slice(-100) });

        // Send friends data
        sock.emit('friendsUpdate', getFriendsData(username));
        sock.emit('friendRequestsUpdate', {
            sent: account.friendRequests ? account.friendRequests.sent : [],
            received: account.friendRequests ? account.friendRequests.received : []
        });

        // Send rooms list
        var allRooms = getRoomsForUser(username);
        var defaultRoomNames = allRooms.filter(function(r) { return r.isPredefined; }).map(function(r) { return r.name; });
        var customRoomNames = allRooms.filter(function(r) { return !r.isPredefined; }).map(function(r) { return r.name; });
        var roomPayload = { rooms: defaultRoomNames, customRooms: customRoomNames, allRooms: allRooms };
        sock.emit('roomsUpdate', roomPayload);
        sock.emit('roomList', roomPayload);

        // Send stickers
        var userStickers = stickers.get(username) || [];
        sock.emit('syncStickers', { stickers: userStickers });

        // Send avatar data (all known avatars)
        var avatarObj = {};
        avatars.forEach(function(url, user) { avatarObj[user] = url; });
        sock.emit('avatarData', avatarObj);

        // Send active announcements
        var activeAnnouncements = announcements.filter(function(a) { return a.active; }).slice(-5);
        if (activeAnnouncements.length > 0) {
            sock.emit('announcements', activeAnnouncements);
        }

        // Send active polls
        var activePolls = [];
        polls.forEach(function(poll) {
            if (poll.active && poll.room === 'general') {
                activePolls.push(poll);
            }
        });
        if (activePolls.length > 0) {
            sock.emit('activePolls', activePolls);
        }

        // Broadcast join to all connected sockets
        io.emit('systemMessage', {
            message: username + ' has joined the chat',
            timestamp: Date.now()
        });

        // Update user lists
        broadcastUserList('general');
        broadcastRoomLists();
    }

    // ========================================================================
    // Email Verification
    // ========================================================================
    socket.on('verifyEmail', function(data) {
        var username = socketToUser.get(socket.id) || data.username;
        if (!username) return;

        var result = verifyEmailCode(username, data.code);
        if (result.success) {
            var account = accounts.get(username);
            if (account) {
                account.emailVerified = true;
                accounts.set(username, account);
                saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
            }
            socket.emit('verifySuccess', { username: username, emailVerified: true });
            logActivity('email_verified', username, 'Email verified');
        } else {
            socket.emit('verifyError', { message: result.error });
        }
    });

    socket.on('resendVerification', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var account = accounts.get(username);
        if (!account || !account.email) {
            socket.emit('error', { message: 'No email associated with account' });
            return;
        }

        var verification = createVerificationCode(username, account.email);
        sendVerificationEmail(account.email, verification.code, username);
        socket.emit('verificationResent', {
            message: 'Verification code sent to your email!'
        });
    });

    // ========================================================================
    // Password Recovery
    // ========================================================================
    socket.on('forgotPassword', function(data) {
        var username = (data.username || '').trim();
        if (!username) {
            socket.emit('passwordResetError', { message: 'Please enter your username' });
            return;
        }

        var account = accounts.get(username);
        if (!account) {
            // Don't reveal if account exists
            socket.emit('passwordResetSent', {
                message: 'If an account exists, a reset code has been generated.',
                code: null
            });
            return;
        }

        var resetData = createPasswordReset(username);
        if (resetData) {
            // Send password reset email if email exists
            if (resetData.email) {
                sendPasswordResetEmail(resetData.email, resetData.code, username);
            }
            socket.emit('passwordResetSent', {
                message: resetData.email ? 'Password reset code sent to your email.' : 'Password reset code generated.',
                email: resetData.email ? resetData.email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : null
            });
            logActivity('password_reset_request', username, 'Password reset requested');
        }
    });

    socket.on('resetPassword', function(data) {
        var username = (data.username || '').trim();
        var code = data.code;
        var newPassword = data.newPassword;

        if (!username || !code || !newPassword) {
            socket.emit('passwordResetResult', { success: false, error: 'Missing required fields' });
            return;
        }

        if (newPassword.length < 4) {
            socket.emit('passwordResetResult', { success: false, error: 'Password must be at least 4 characters' });
            return;
        }

        var result = resetUserPassword(username, code, newPassword);
        socket.emit('passwordResetResult', result);
    });

    // ========================================================================
    // Messaging
    // ========================================================================
    socket.on('message', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var message = (data.message || data.text || '').trim();
        var room = data.room || 'general';
        if (!message) return;

        // Resolve room name to room ID
        if (!customRooms.has(room)) {
            // Try case-insensitive match by name or id
            for (var [key, val] of customRooms) {
                if (key.toLowerCase() === room.toLowerCase() || val.name.toLowerCase() === room.toLowerCase()) {
                    room = key;
                    break;
                }
            }
        }

        // Auto-moderation check
        var modResult = checkAutoMod(username, message);
        if (!modResult.allowed) {
            socket.emit('error', { message: modResult.reason });
            return;
        }
        if (modResult.warning) {
            socket.emit('systemMessage', { message: '⚠️ ' + modResult.warning, timestamp: Date.now() });
        }

        // Check for slash commands
        if (message.startsWith('/')) {
            var parts = message.split(' ');
            var cmd = parts[0];
            var args = parts.slice(1);

            // Handle /poll command
            if (cmd === '/poll') {
                var pollParts = args.join(' ').split('|').map(function(s) { return s.trim(); });
                if (pollParts.length >= 3) {
                    var pollQuestion = pollParts[0];
                    var pollOptions = pollParts.slice(1);
                    createPoll(username, room, pollQuestion, pollOptions);
                    return;
                } else {
                    socket.emit('error', { message: 'Usage: /poll Question | Option 1 | Option 2 | ...' });
                    return;
                }
            }

            var cmdResult = handleSlashCommand(cmd, args, username, room);
            if (cmdResult) {
                if (cmdResult.clearChat) {
                    io.to(room).emit('clearChat');
                    messageHistory.set(room, []);
                    return;
                }
                if (cmdResult.isUser || cmdResult.isAction) {
                    // Send as user message
                    message = cmdResult.message;
                } else {
                    // Send as system message
                    io.to(room).emit('systemMessage', {
                        message: cmdResult.message,
                        timestamp: Date.now()
                    });
                    return;
                }
            }
        }

        var msgId = generateToken(12);
        var roomObj = customRooms.get(room);
        var roomDisplayName = roomObj ? roomObj.name : room;
        var messageObj = {
            id: msgId,
            username: username,
            message: message,
            text: message,
            room: roomDisplayName,
            roomId: room,
            timestamp: Date.now(),
            isSticker: data.isSticker || false,
            isCustomSticker: data.isCustomSticker || false,
            replyTo: data.replyTo || null,
            reactions: {},
            edited: false,
            editedAt: null,
            nameColor: accounts.get(username) ? accounts.get(username).nameColor : '',
            avatar: avatars.get(username) || null,
            role: getUserRole(username)
        };

        // Store message
        if (!messageHistory.has(room)) messageHistory.set(room, []);
        var roomMsgs = messageHistory.get(room);
        roomMsgs.push(messageObj);
        if (roomMsgs.length > 500) roomMsgs.splice(0, roomMsgs.length - 500);

        // Update stats
        var acc = accounts.get(username);
        if (acc) {
            acc.messagesSent = (acc.messagesSent || 0) + 1;
            acc.xp = (acc.xp || 0) + 1;
            // Level up every 100 XP
            var newLevel = Math.floor(acc.xp / 100) + 1;
            if (newLevel > acc.level) {
                acc.level = newLevel;
                socket.emit('levelUp', { level: newLevel, xp: acc.xp });
            }
        }
        serverStats.totalMessages++;
        trackDailyStat('messages');
        trackHourlyActivity();

        // Broadcast message
        io.to(room).emit('chatMessage', messageObj);
        io.to(room).emit('message', messageObj);
    });

    // ========================================================================
    // Reactions
    // ========================================================================
    socket.on('addReaction', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room || socket.currentRoom || 'general';
        var msgs = messageHistory.get(room) || [];
        var msgId = data.messageId || data.id;
        var msg = msgs.find(function(m) { return m.id === msgId; });
        if (!msg) return;

        if (!msg.reactions) msg.reactions = {};
        if (!msg.reactions[data.emoji]) msg.reactions[data.emoji] = [];

        var idx = msg.reactions[data.emoji].indexOf(username);
        if (idx === -1) {
            msg.reactions[data.emoji].push(username);
        } else {
            msg.reactions[data.emoji].splice(idx, 1);
            if (msg.reactions[data.emoji].length === 0) delete msg.reactions[data.emoji];
        }

        io.to(room).emit('reactionUpdate', {
            messageId: data.messageId,
            reactions: msg.reactions,
            room: room
        });
        io.to(room).emit('reactionUpdated', {
            messageId: data.messageId,
            reactions: msg.reactions,
            room: room
        });
    });

    // ========================================================================
    // Edit / Delete Messages
    // ========================================================================
    socket.on('editMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room || socket.currentRoom || 'general';
        // Normalize room name → room ID (server stores by ID, client may send display name)
        if (!messageHistory.has(room)) {
            for (var [key, val] of customRooms) {
                if (key.toLowerCase() === room.toLowerCase() || (val.name && val.name.toLowerCase() === room.toLowerCase())) {
                    room = key;
                    break;
                }
            }
        }
        var msgs = messageHistory.get(room) || [];
        var msgId = data.messageId || data.id;
        var newText = data.newMessage || data.text;
        var msg = msgs.find(function(m) { return m.id === msgId; });
        if (!msg) return;
        if (msg.username !== username && !isAdmin(username)) return;

        msg.message = newText;
        msg.text = newText;
        msg.edited = true;
        msg.editedAt = Date.now();

        io.to(room).emit('messageEdited', {
            id: msgId,
            messageId: msgId,
            text: newText,
            newMessage: newText,
            room: room
        });
    });

    socket.on('deleteMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room || socket.currentRoom || 'general';
        // Normalize room name → room ID
        if (!messageHistory.has(room)) {
            for (var [key, val] of customRooms) {
                if (key.toLowerCase() === room.toLowerCase() || (val.name && val.name.toLowerCase() === room.toLowerCase())) {
                    room = key;
                    break;
                }
            }
        }
        var msgs = messageHistory.get(room) || [];
        var msgId = data.messageId || data.id;
        var idx = msgs.findIndex(function(m) { return m.id === msgId; });
        if (idx === -1) return;

        var msg = msgs[idx];
        if (msg.username !== username && !isAdmin(username) && !isModerator(username)) return;

        msgs.splice(idx, 1);
        io.to(room).emit('messageDeleted', {
            id: msgId,
            messageId: msgId,
            room: room
        });

        if (msg.username !== username) {
            logModeration('delete_message', username, msg.username, 'Message deleted by moderator');
        }
    });

    // ========================================================================
    // Direct Messages
    // ========================================================================
    socket.on('directMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username || !data.targetUsername) return;

        var target = data.targetUsername;
        var dmKey = getDMKey(username, target);

        var msgObj = {
            id: generateToken(12),
            username: username,
            message: data.message || '',
            timestamp: Date.now(),
            isSticker: data.isSticker || false,
            replyTo: data.replyTo || null,
            isDM: true,
            nameColor: accounts.get(username) ? accounts.get(username).nameColor : '',
            avatar: avatars.get(username) || null
        };

        if (!dmHistory.has(dmKey)) dmHistory.set(dmKey, []);
        var history = dmHistory.get(dmKey);
        history.push(msgObj);
        if (history.length > 200) history.splice(0, history.length - 200);

        // Send to both users
        var dmMsgForSender = Object.assign({}, msgObj, { from: username, to: target, text: msgObj.message });
        var dmMsgForTarget = Object.assign({}, msgObj, { from: username, to: target, text: msgObj.message });
        socket.emit('dmMessage', dmMsgForSender);
        var targetData = onlineUsers.get(target);
        if (targetData) {
            io.to(targetData.socketId).emit('dmMessage', dmMsgForTarget);
        }
    });

    // ========================================================================
    // Chat History
    // ========================================================================
    socket.on('requestChatHistory', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room;
        var history;

        // Check if it's a DM
        if (room && !customRooms.has(room) && room !== 'general') {
            var dmKey = getDMKey(username, room);
            history = dmHistory.get(dmKey) || [];
        } else {
            history = messageHistory.get(room) || [];
        }

        // Ensure messages have both 'text' and 'message' fields for compatibility
        var compatHistory = history.slice(-100).map(function(m) {
            return Object.assign({}, m, { text: m.text || m.message, message: m.message || m.text });
        });

        socket.emit('chatHistory', {
            room: room,
            messages: compatHistory
        });
        socket.emit('messageHistory', {
            room: room,
            messages: compatHistory
        });
    });

    // ========================================================================
    // Room Management
    // ========================================================================
    socket.on('createRoom', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var name = (data.name || '').trim();
        if (!name || name.length < 2 || name.length > 30) {
            socket.emit('error', { message: 'Room name must be 2-30 characters' });
            return;
        }

        var roomId = 'room_' + generateToken(6);
        var room = {
            id: roomId,
            name: name,
            description: data.description || '',
            icon: data.icon || 'fa-hashtag',
            color: data.color || '#667eea',
            creator: username,
            isPrivate: data.isPrivate || false,
            members: new Set([username]),
            created: Date.now()
        };

        customRooms.set(roomId, room);
        messageHistory.set(roomId, []);
        socket.join(roomId);

        var userData = onlineUsers.get(username);
        if (userData) userData.rooms.add(roomId);

        saveRooms();
        logActivity('create_room', username, 'Created room: ' + name);

        socket.emit('roomCreated', { room: { id: roomId, name: name } });
        broadcastRoomLists();
    });

    socket.on('joinRoom', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var roomId = data.roomId || data.room;
        if (!roomId) return;

        var room = customRooms.get(roomId);
        if (!room) {
            // Try case-insensitive match for predefined rooms
            for (var [key, val] of customRooms) {
                if (key.toLowerCase() === roomId.toLowerCase() || val.name.toLowerCase() === roomId.toLowerCase()) {
                    room = val;
                    roomId = key;
                    break;
                }
            }
            if (!room) return;
        }
        if (room.isPrivate && room.creator !== username && !(room.members && room.members.has(username))) {
            socket.emit('error', { message: 'This room is private' });
            return;
        }

        if (!room.members) room.members = new Set();
        room.members.add(username);
        socket.join(roomId);
        socket.currentRoom = roomId;

        var userData = onlineUsers.get(username);
        if (userData) userData.rooms.add(roomId);

        saveRooms();
        logActivity('join_room', username, 'Joined room: ' + room.name);

        socket.emit('joinedRoom', { roomId: roomId, roomName: room.name, room: room.name, topic: room.description || '' });
        socket.emit('roomJoined', { roomId: roomId, roomName: room.name, room: room.name, topic: room.description || '' });
        broadcastRoomLists();
        broadcastUserList(roomId);

        // Send message history for the room
        var msgs = messageHistory.get(roomId) || [];
        socket.emit('messageHistory', { room: room.name, messages: msgs.slice(-100).map(function(m) { return Object.assign({}, m, { text: m.message || m.text }); }) });

        io.to(roomId).emit('systemMessage', {
            message: username + ' joined the room',
            timestamp: Date.now()
        });
    });

    socket.on('leaveRoom', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        // Resolve room name to room ID
        var roomId = data.roomId || data.room;
        if (!customRooms.has(roomId)) {
            for (var [key, val] of customRooms) {
                if (key === roomId || val.name === roomId || val.name.toLowerCase() === (roomId || '').toLowerCase()) {
                    roomId = key;
                    break;
                }
            }
        }

        var room = customRooms.get(roomId);
        if (!room || room.isPredefined) return;

        if (room.members) room.members.delete(username);
        socket.leave(roomId);

        var userData = onlineUsers.get(username);
        if (userData) userData.rooms.delete(roomId);

        saveRooms();
        broadcastRoomLists();

        io.to(roomId).emit('systemMessage', {
            message: username + ' left the room',
            timestamp: Date.now()
        });
    });

    socket.on('deleteRoom', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        // Resolve room name to room ID
        var roomId = data.roomId || data.room;
        if (!customRooms.has(roomId)) {
            for (var [key, val] of customRooms) {
                if (key === roomId || val.name === roomId || val.name.toLowerCase() === (roomId || '').toLowerCase()) {
                    roomId = key;
                    break;
                }
            }
        }

        var room = customRooms.get(roomId);
        if (!room) return;
        if (room.creator !== username && !isAdmin(username)) return;
        if (room.isPredefined) return;

        customRooms.delete(roomId);
        messageHistory.delete(roomId);
        saveRooms();

        logActivity('delete_room', username, 'Deleted room: ' + room.name);
        io.emit('roomDeleted', { roomId: roomId, room: room.name });
        broadcastRoomLists();
    });

    socket.on('inviteToRoom', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = customRooms.get(data.roomId);
        if (!room) return;

        var usernames = data.usernames || [];
        usernames.forEach(function(target) {
            if (!room.members) room.members = new Set();
            room.members.add(target);

            var targetData = onlineUsers.get(target);
            if (targetData) {
                var targetSocket = io.sockets.sockets.get(targetData.socketId);
                if (targetSocket) {
                    targetSocket.join(data.roomId);
                    targetSocket.emit('roomInvitation', {
                        roomId: data.roomId,
                        roomName: room.name,
                        invitedBy: username
                    });
                }
            }
        });

        saveRooms();
        broadcastRoomLists();
    });

    socket.on('requestAvailableRooms', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var available = [];
        customRooms.forEach(function(room, id) {
            if (!room.isPrivate || (room.members && room.members.has(username))) {
                var msgs = messageHistory.get(id) || [];
                available.push({
                    id: id,
                    name: room.name,
                    description: room.description,
                    memberCount: room.members ? room.members.size : 0,
                    messageCount: msgs.length,
                    isPrivate: room.isPrivate || false,
                    joined: room.members ? room.members.has(username) : false,
                    creator: room.creator,
                    icon: room.icon,
                    color: room.color
                });
            }
        });

        socket.emit('availableRooms', available);
        // Send in expected format
        var defaultRooms = available.filter(function(r) { return r.id && PREDEFINED_ROOMS.some(function(p) { return p.id === r.id; }); }).map(function(r) { return r.name; });
        var customRoomNames = available.filter(function(r) { return !PREDEFINED_ROOMS.some(function(p) { return p.id === r.id; }); }).map(function(r) { return r.name; });
        socket.emit('roomList', { rooms: defaultRooms, customRooms: customRoomNames, allRooms: available });
    });

    // ========================================================================
    // Profile & Settings
    // ========================================================================
    socket.on('updateProfilePic', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        avatars.set(username, data.image);
        saveJSON(dataFiles.avatars, Object.fromEntries(avatars));
        // Broadcast avatar update to all users
        io.emit('avatarUpdate', { username: username, avatar: data.image });
    });

    socket.on('updateBio', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        var acc = accounts.get(username);
        if (acc) {
            acc.bio = (data.bio || '').substring(0, 500);
            saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
        }
    });

    socket.on('updateNameColor', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        var acc = accounts.get(username);
        if (acc) {
            acc.nameColor = data.color || '';
            saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
            socket.emit('nameColorUpdated', { color: acc.nameColor });
            // Broadcast color update
            var userData = onlineUsers.get(username);
            if (userData && userData.rooms) {
                userData.rooms.forEach(function(room) {
                    broadcastUserList(room);
                });
            }
        }
    });

    socket.on('updateSettings', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        var acc = accounts.get(username);
        if (acc) {
            acc.settings = data.settings || {};
            saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
        }
    });

    socket.on('updateEmail', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var email = (data.email || '').trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            socket.emit('error', { message: 'Invalid email format' });
            return;
        }

        var acc = accounts.get(username);
        if (acc) {
            acc.email = email;
            acc.emailVerified = false;
            saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

            var verification = createVerificationCode(username, email);
            sendVerificationEmail(email, verification.code, username);
            socket.emit('emailUpdateSuccess', {
                email: email,
                message: 'Verification code sent to your email!'
            });
        }
    });

    socket.on('getProfile', function(data) {
        // Forward to v5 handler — emit both event names for compatibility
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var target = data.username || username;
        var profile = userProfiles.get(target) || {};
        var acc = accounts.get(target);
        if (!acc) {
            socket.emit('profileData', { error: 'User not found' });
            return;
        }

        var xpDetail = userXPDetails.get(target);
        var userAchievements = achievements.get(target) || [];

        var profileData = {
            username: target,
            profile: profile,
            bio: acc.bio || profile.bio || '',
            nameColor: acc.nameColor || '',
            bannerColor: acc.bannerColor || '',
            bannerColor2: acc.bannerColor2 || '',
            avatar: avatars.get(target) || null,
            role: getUserRole(target),
            online: onlineUsers.has(target),
            isOnline: onlineUsers.has(target),
            status: onlineUsers.has(target) ? onlineUsers.get(target).status : 'offline',
            created: acc.created || acc.createdAt,
            joinedAt: acc.createdAt || acc.created,
            lastLogin: acc.lastLogin,
            loginCount: acc.loginCount || 0,
            isSelf: target === username,
            level: xpDetail ? xpDetail.level : (acc.level || 1),
            xp: xpDetail ? {
                totalXP: xpDetail.totalXP,
                level: xpDetail.level,
                streak: xpDetail.streak,
                nextLevelXP: getXPForLevel(xpDetail.level + 1)
            } : { totalXP: acc.xp || 0, level: acc.level || 1, streak: 0, nextLevelXP: getXPForLevel(2) },
            achievements: userAchievements.map(function(a) {
                return { id: a.id, name: a.name, icon: a.icon, earnedAt: a.earnedAt };
            }),
            isFriend: acc.friends ? acc.friends.includes(username) : false,
            isBlocked: blockLists.has(username) && blockLists.get(username).has(target),
            badges: getBadgesForUser(target),
            stats: {
                messagesSent: acc.messagesSent || 0,
                roomsJoined: 0,
                achievements: userAchievements.length
            }
        };

        // Emit both event names for v4/v5 compatibility
        socket.emit('profileData', profileData);
        socket.emit('userProfile', profileData);
    });

    // ========================================================================
    // Friends System
    // ========================================================================
    socket.on('sendFriendRequest', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var target = data.targetUsername;
        if (!accounts.has(target)) {
            socket.emit('error', { message: 'User not found' });
            return;
        }
        if (target === username) return;

        var myAcc = accounts.get(username);
        var targetAcc = accounts.get(target);

        // Check if already friends
        if (myAcc.friends && myAcc.friends.includes(target)) {
            socket.emit('error', { message: 'Already friends' });
            return;
        }

        // Add to sent/received
        if (!myAcc.friendRequests) myAcc.friendRequests = { sent: [], received: [] };
        if (!targetAcc.friendRequests) targetAcc.friendRequests = { sent: [], received: [] };

        if (!myAcc.friendRequests.sent.includes(target)) {
            myAcc.friendRequests.sent.push(target);
        }
        if (!targetAcc.friendRequests.received.includes(username)) {
            targetAcc.friendRequests.received.push(username);
        }

        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

        // Notify target
        var targetData = onlineUsers.get(target);
        if (targetData) {
            io.to(targetData.socketId).emit('friendRequestsUpdate', {
                sent: targetAcc.friendRequests.sent,
                received: targetAcc.friendRequests.received
            });
            io.to(targetData.socketId).emit('friendRequests', {
                sent: targetAcc.friendRequests.sent,
                received: targetAcc.friendRequests.received
            });
            io.to(targetData.socketId).emit('notification', {
                type: 'friendRequest',
                message: username + ' sent you a friend request',
                from: username
            });
        }

        socket.emit('friendRequestsUpdate', {
            sent: myAcc.friendRequests.sent,
            received: myAcc.friendRequests.received
        });
    });

    socket.on('acceptFriendRequest', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var from = data.fromUsername;
        var myAcc = accounts.get(username);
        var fromAcc = accounts.get(from);
        if (!myAcc || !fromAcc) return;

        // Add to friends
        if (!myAcc.friends) myAcc.friends = [];
        if (!fromAcc.friends) fromAcc.friends = [];
        if (!myAcc.friends.includes(from)) myAcc.friends.push(from);
        if (!fromAcc.friends.includes(username)) fromAcc.friends.push(username);

        // Remove from requests
        if (myAcc.friendRequests) {
            myAcc.friendRequests.received = myAcc.friendRequests.received.filter(function(u) { return u !== from; });
        }
        if (fromAcc.friendRequests) {
            fromAcc.friendRequests.sent = fromAcc.friendRequests.sent.filter(function(u) { return u !== username; });
        }

        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

        // Update both users
        socket.emit('friendsUpdate', getFriendsData(username));
        socket.emit('friendsList', getFriendsData(username));
        socket.emit('friendRequestsUpdate', myAcc.friendRequests);
        socket.emit('friendRequests', myAcc.friendRequests);

        var fromData = onlineUsers.get(from);
        if (fromData) {
            io.to(fromData.socketId).emit('friendsUpdate', getFriendsData(from));
            io.to(fromData.socketId).emit('friendsList', getFriendsData(from));
            io.to(fromData.socketId).emit('friendRequestsUpdate', fromAcc.friendRequests);
            io.to(fromData.socketId).emit('friendRequests', fromAcc.friendRequests);
        }
    });

    socket.on('rejectFriendRequest', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var from = data.fromUsername;
        var myAcc = accounts.get(username);
        var fromAcc = accounts.get(from);

        if (myAcc && myAcc.friendRequests) {
            myAcc.friendRequests.received = myAcc.friendRequests.received.filter(function(u) { return u !== from; });
        }
        if (fromAcc && fromAcc.friendRequests) {
            fromAcc.friendRequests.sent = fromAcc.friendRequests.sent.filter(function(u) { return u !== username; });
        }

        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
        socket.emit('friendRequestsUpdate', myAcc.friendRequests);
        socket.emit('friendRequests', myAcc.friendRequests);
    });

    socket.on('removeFriend', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var friend = data.friendUsername;
        var myAcc = accounts.get(username);
        var friendAcc = accounts.get(friend);

        if (myAcc && myAcc.friends) {
            myAcc.friends = myAcc.friends.filter(function(f) { return f !== friend; });
        }
        if (friendAcc && friendAcc.friends) {
            friendAcc.friends = friendAcc.friends.filter(function(f) { return f !== username; });
        }

        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

        socket.emit('friendsUpdate', getFriendsData(username));
        socket.emit('friendsList', getFriendsData(username));
        var friendData = onlineUsers.get(friend);
        if (friendData) {
            io.to(friendData.socketId).emit('friendsUpdate', getFriendsData(friend));
            io.to(friendData.socketId).emit('friendsList', getFriendsData(friend));
        }
    });

    function getFriendsData(username) {
        var acc = accounts.get(username);
        if (!acc || !acc.friends) return [];
        return acc.friends.map(function(f) {
            return {
                username: f,
                online: onlineUsers.has(f),
                status: onlineUsers.has(f) ? onlineUsers.get(f).status : 'offline',
                avatar: avatars.get(f) || null
            };
        });
    }

    // ========================================================================
    // Typing Indicators
    // ========================================================================
    socket.on('typing', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        var room = data.room || 'general';
        if (!typingUsers.has(room)) typingUsers.set(room, new Set());
        typingUsers.get(room).add(username);
        socket.to(room).emit('userTyping', { username: username, room: room });
        socket.to(room).emit('typing', { username: username, room: room });
    });

    socket.on('stopTyping', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        var room = data.room || 'general';
        if (typingUsers.has(room)) typingUsers.get(room).delete(username);
        socket.to(room).emit('userStopTyping', { username: username, room: room });
        socket.to(room).emit('stopTyping', { username: username, room: room });
    });

    // ========================================================================
    // Status
    // ========================================================================
    socket.on('changeStatus', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        var userData = onlineUsers.get(username);
        if (userData) {
            userData.status = data.status || 'online';
            // Broadcast to all rooms
            userData.rooms.forEach(function(room) {
                broadcastUserList(room);
            });
        }
    });

    // ========================================================================
    // Stickers
    // ========================================================================
    socket.on('syncCustomStickers', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        stickers.set(username, data.stickers || []);
        saveJSON(dataFiles.stickers, Object.fromEntries(stickers));
    });

    socket.on('requestStickers', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        socket.emit('syncStickers', { stickers: stickers.get(username) || [] });
    });

    // ========================================================================
    // File Messages
    // ========================================================================
    socket.on('imageMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var msgObj = {
            id: generateToken(12),
            username: username,
            message: '',
            imageUrl: data.imageUrl,
            room: data.room || 'general',
            timestamp: Date.now(),
            type: 'image',
            nameColor: accounts.get(username) ? accounts.get(username).nameColor : '',
            avatar: avatars.get(username) || null,
            role: getUserRole(username)
        };

        if (!messageHistory.has(data.room)) messageHistory.set(data.room, []);
        messageHistory.get(data.room).push(msgObj);

        io.to(data.room).emit('chatMessage', msgObj);
        io.to(data.room).emit('message', msgObj);
    });

    socket.on('fileMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var msgObj = {
            id: generateToken(12),
            username: username,
            message: '',
            fileUrl: data.fileUrl,
            fileName: data.fileName,
            fileSize: data.fileSize,
            fileType: data.fileType,
            room: data.room || 'general',
            timestamp: Date.now(),
            type: 'file',
            nameColor: accounts.get(username) ? accounts.get(username).nameColor : '',
            avatar: avatars.get(username) || null,
            role: getUserRole(username)
        };

        if (!messageHistory.has(data.room)) messageHistory.set(data.room, []);
        messageHistory.get(data.room).push(msgObj);

        io.to(data.room).emit('chatMessage', msgObj);
        io.to(data.room).emit('message', msgObj);
        serverStats.totalFileUploads++;
    });

    // ========================================================================
    // Report System
    // ========================================================================
    socket.on('reportUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var report = {
            id: generateToken(12),
            reporter: username,
            reportedUser: data.reportedUser,
            reason: data.reason || 'No reason',
            category: data.category || 'other',
            details: data.details || '',
            room: data.room || 'general',
            messageId: data.messageId || null,
            status: 'pending',
            timestamp: Date.now(),
            resolvedBy: null,
            resolvedAt: null,
            resolution: null
        };

        reports.push(report);
        saveJSON(dataFiles.reports, reports);
        serverStats.totalReports++;
        trackDailyStat('reports');
        logActivity('report', username, 'Reported user: ' + data.reportedUser);

        socket.emit('reportSubmitted', { success: true, reportId: report.id });

        // Notify admins
        ADMIN_USERS.forEach(function(admin) {
            var adminData = onlineUsers.get(admin);
            if (adminData) {
                io.to(adminData.socketId).emit('newReport', report);
                io.to(adminData.socketId).emit('notification', {
                    type: 'report',
                    message: 'New report: ' + data.reportedUser + ' reported by ' + username,
                    report: report
                });
            }
        });
    });

    socket.on('resolveReport', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username || !isAdmin(username)) return;

        var report = reports.find(function(r) { return r.id === data.reportId; });
        if (!report) return;

        report.status = data.action || 'resolved';
        report.resolvedBy = username;
        report.resolvedAt = Date.now();
        report.resolution = data.resolution || 'Resolved';

        saveJSON(dataFiles.reports, reports);
        logModeration('resolve_report', username, report.reportedUser, report.resolution);

        socket.emit('reportResolved', { reportId: report.id, status: report.status });
    });

    socket.on('getReports', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username || !isAdmin(username)) return;

        var status = data ? data.status : null;
        var filtered = reports;
        if (status) {
            filtered = reports.filter(function(r) { return r.status === status; });
        }
        socket.emit('reportsList', { reports: filtered });
    });

    // ========================================================================
    // Polls System
    // ========================================================================
    function createPoll(creator, room, question, options) {
        var pollId = 'poll_' + generateToken(6);
        var poll = {
            id: pollId,
            creator: creator,
            room: room,
            question: question,
            options: options.map(function(opt, i) {
                return { id: i, text: opt, votes: [] };
            }),
            active: true,
            created: Date.now(),
            expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        };

        polls.set(pollId, poll);
        saveJSON(dataFiles.polls, Object.fromEntries(polls));

        io.to(room).emit('newPoll', poll);
        io.to(room).emit('pollCreated', poll);
        logActivity('create_poll', creator, 'Created poll: ' + question);
    }

    socket.on('createPoll', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        var question = (data.question || '').substring(0, 200);
        var options = (data.options || []).slice(0, 10).map(function(o) { return (o + '').substring(0, 50); });
        if (!question || options.length < 2) return;
        var room = data.room || 'General';
        // Resolve room name to ID
        var resolvedRoom = room;
        customRooms.forEach(function(val, key) {
            if (val.name === room || val.name.toLowerCase() === room.toLowerCase()) resolvedRoom = key;
        });
        if (!customRooms.has(resolvedRoom)) resolvedRoom = room.toLowerCase();
        createPoll(username, resolvedRoom, question, options);
    });

    socket.on('votePoll', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var poll = polls.get(data.pollId);
        if (!poll || !poll.active) return;

        // Remove previous vote
        poll.options.forEach(function(opt) {
            opt.votes = opt.votes.filter(function(v) { return v !== username; });
        });

        // Add new vote
        var option = poll.options.find(function(o) { return o.id === data.optionId; });
        if (option) {
            option.votes.push(username);
        }

        saveJSON(dataFiles.polls, Object.fromEntries(polls));
        io.to(poll.room).emit('pollUpdate', poll);
        io.to(poll.room).emit('pollUpdated', poll);
    });

    socket.on('closePoll', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var poll = polls.get(data.pollId);
        if (!poll) return;
        if (poll.creator !== username && !isAdmin(username)) return;

        poll.active = false;
        saveJSON(dataFiles.polls, Object.fromEntries(polls));
        io.to(poll.room).emit('pollClosed', poll);
    });

    // ========================================================================
    // Pinned Messages
    // ========================================================================
    socket.on('pinMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        // Resolve room name to room ID
        var roomKey = data.room || socket.currentRoom || 'general';
        if (!customRooms.has(roomKey)) {
            for (var [key, val] of customRooms) {
                if (key.toLowerCase() === roomKey.toLowerCase() || val.name.toLowerCase() === roomKey.toLowerCase()) {
                    roomKey = key;
                    break;
                }
            }
        }

        if (!isAdmin(username) && !isModerator(username)) {
            // Check if room creator
            var room = customRooms.get(roomKey);
            if (!room || room.creator !== username) {
                socket.emit('error', { message: 'Only moderators or room creators can pin messages' });
                return;
            }
        }

        var roomPins = pinnedMessages.get(roomKey) || [];
        var msgs = messageHistory.get(roomKey) || [];
        var msg = msgs.find(function(m) { return m.id === data.messageId; });
        if (!msg) return;

        // Check if already pinned
        var alreadyPinned = roomPins.some(function(p) { return p.id === data.messageId; });
        if (alreadyPinned) return;

        roomPins.push({
            id: msg.id,
            username: msg.username,
            message: msg.message,
            timestamp: msg.timestamp,
            pinnedBy: username,
            pinnedAt: Date.now()
        });

        // Limit to 50 pins per room
        if (roomPins.length > 50) roomPins.shift();

        pinnedMessages.set(roomKey, roomPins);
        saveJSON(dataFiles.pinnedMessages, Object.fromEntries(pinnedMessages));

        io.to(roomKey).emit('messagePinned', {
            messageId: data.messageId,
            room: roomKey,
            pinnedBy: username
        });

        io.to(roomKey).emit('systemMessage', {
            message: username + ' pinned a message',
            timestamp: Date.now()
        });
    });

    socket.on('unpinMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username) && !isModerator(username)) return;

        // Resolve room name to room ID
        var roomKey = data.room || socket.currentRoom || 'general';
        if (!customRooms.has(roomKey)) {
            for (var [key, val] of customRooms) {
                if (key.toLowerCase() === roomKey.toLowerCase() || val.name.toLowerCase() === roomKey.toLowerCase()) {
                    roomKey = key;
                    break;
                }
            }
        }

        var roomPins = pinnedMessages.get(roomKey) || [];
        pinnedMessages.set(roomKey, roomPins.filter(function(p) { return p.id !== data.messageId; }));
        saveJSON(dataFiles.pinnedMessages, Object.fromEntries(pinnedMessages));

        io.to(roomKey).emit('messageUnpinned', {
            messageId: data.messageId,
            room: roomKey
        });
    });

    socket.on('getPinnedMessages', function(data) {
        // Resolve room name to room ID
        var roomKey = data.room || socket.currentRoom || 'general';
        if (!customRooms.has(roomKey)) {
            for (var [key, val] of customRooms) {
                if (key.toLowerCase() === roomKey.toLowerCase() || val.name.toLowerCase() === roomKey.toLowerCase()) {
                    roomKey = key;
                    break;
                }
            }
        }
        var pins = pinnedMessages.get(roomKey) || [];
        socket.emit('pinnedMessages', { room: roomKey, messages: pins });
    });

    // ========================================================================
    // Bookmarks
    // ========================================================================
    socket.on('bookmarkMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var userBookmarks = bookmarks.get(username) || [];
        var exists = userBookmarks.some(function(b) { return b.messageId === data.messageId; });
        if (exists) {
            userBookmarks = userBookmarks.filter(function(b) { return b.messageId !== data.messageId; });
        } else {
            userBookmarks.push({
                messageId: data.messageId,
                room: data.room,
                message: data.message,
                username: data.username,
                timestamp: data.timestamp,
                bookmarkedAt: Date.now()
            });
        }

        bookmarks.set(username, userBookmarks);
        saveJSON(dataFiles.bookmarks, Object.fromEntries(bookmarks));
        socket.emit('bookmarksUpdate', { bookmarks: userBookmarks });
        socket.emit('bookmarks', { bookmarks: userBookmarks });
    });

    // ========================================================================
    // Admin Actions
    // ========================================================================
    socket.on('kickUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        // Check permissions
        var room = customRooms.get(data.roomId);
        var canKick = isAdmin(username) || isModerator(username);
        if (room && room.creator === username) canKick = true;
        if (!canKick) return;

        var targetData = onlineUsers.get(data.username);
        if (targetData) {
            var targetSocket = io.sockets.sockets.get(targetData.socketId);
            if (targetSocket) {
                targetSocket.leave(data.roomId);
                targetSocket.emit('kickedFromRoom', {
                    roomId: data.roomId,
                    by: username
                });
            }
        }

        if (room && room.members) {
            room.members.delete(data.username);
            saveRooms();
        }

        logModeration('kick', username, data.username, 'Kicked from ' + data.roomId);
        broadcastUserList(data.roomId);
    });

    socket.on('banUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username || !isAdmin(username)) return;

        var targetUser = data.username;
        if (isAdmin(targetUser)) {
            socket.emit('error', { message: 'Cannot ban an admin' });
            return;
        }

        var banInfo = {
            username: targetUser,
            reason: data.reason || 'No reason given',
            bannedBy: username,
            bannedAt: Date.now(),
            expiresAt: data.duration ? Date.now() + data.duration * 60 * 60 * 1000 : null
        };

        bannedUsers.set(targetUser, banInfo);
        saveJSON(dataFiles.bannedUsers, Object.fromEntries(bannedUsers));
        serverStats.totalBans++;
        logModeration('ban', username, targetUser, banInfo.reason);

        // Disconnect banned user
        var targetData = onlineUsers.get(targetUser);
        if (targetData) {
            var targetSocket = io.sockets.sockets.get(targetData.socketId);
            if (targetSocket) {
                targetSocket.emit('banned', { reason: banInfo.reason });
                targetSocket.disconnect(true);
            }
        }

        socket.emit('userBanned', { username: targetUser });
        io.emit('systemMessage', {
            message: targetUser + ' has been banned',
            timestamp: Date.now()
        });
    });

    socket.on('unbanUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username || !isAdmin(username)) return;

        bannedUsers.delete(data.username);
        saveJSON(dataFiles.bannedUsers, Object.fromEntries(bannedUsers));
        logModeration('unban', username, data.username, 'Unbanned');
        socket.emit('userUnbanned', { username: data.username });
    });

    socket.on('getAllUsers', function() {
        var username = socketToUser.get(socket.id);
        if (!username || !isAdmin(username)) return;

        var users = [];
        accounts.forEach(function(acc, uname) {
            users.push({
                username: uname,
                email: acc.email || '',
                role: getUserRole(uname),
                isOnline: onlineUsers.has(uname),
                isBanned: bannedUsers.has(uname),
                loginCount: acc.loginCount || 0,
                messagesSent: acc.messagesSent || 0,
                created: acc.created,
                lastLogin: acc.lastLogin,
                level: acc.level || 1,
                xp: acc.xp || 0,
                emailVerified: acc.emailVerified || false,
                status: onlineUsers.has(uname) ? onlineUsers.get(uname).status : 'offline'
            });
        });

        socket.emit('allUsers', users);
    });

    socket.on('getBannedUsers', function() {
        var username = socketToUser.get(socket.id);
        if (!username || !isAdmin(username)) return;

        var banned = [];
        bannedUsers.forEach(function(ban) {
            banned.push(ban);
        });
        socket.emit('bannedUsersList', banned);
    });

    socket.on('setUserRole', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username || !isAdmin(username)) return;

        var targetUser = data.username;
        var newRole = data.role;
        if (!['member', 'moderator', 'admin'].includes(newRole)) return;

        setUserRole(targetUser, newRole);
        logModeration('set_role', username, targetUser, 'Role set to ' + newRole);

        // Notify target
        var targetData = onlineUsers.get(targetUser);
        if (targetData) {
            io.to(targetData.socketId).emit('roleUpdate', { role: newRole });
        }

        socket.emit('roleUpdated', { username: targetUser, role: newRole });
    });

    // Admin stats via socket
    socket.on('getAdminStats', function() {
        var username = socketToUser.get(socket.id);
        if (!username || !isAdmin(username)) return;

        var totalMessages = 0;
        messageHistory.forEach(function(msgs) { totalMessages += msgs.length; });

        var today = new Date().toISOString().split('T')[0];
        var activeToday = 0;
        accounts.forEach(function(acc) {
            if (acc.lastLogin) {
                var d = new Date(acc.lastLogin).toISOString().split('T')[0];
                if (d === today) activeToday++;
            }
        });

        socket.emit('adminStats', {
            server: {
                uptime: process.uptime(),
                version: '5.0',
                memory: process.memoryUsage()
            },
            users: {
                total: accounts.size,
                online: onlineUsers.size,
                activeToday: activeToday,
                banned: bannedUsers.size,
                peakOnline: serverStats.peakOnlineUsers
            },
            messages: {
                total: totalMessages,
                today: serverStats.dailyStats[today] ? serverStats.dailyStats[today].messages : 0
            },
            reports: {
                total: reports.length,
                pending: reports.filter(function(r) { return r.status === 'pending'; }).length,
                resolved: reports.filter(function(r) { return r.status === 'resolved'; }).length
            },
            dailyStats: serverStats.dailyStats,
            hourlyActivity: serverStats.hourlyActivity,
            recentActivity: activityLog.slice(-50),
            moderationLog: moderationLog.slice(-50)
        });
    });

    // ========================================================================
    // Wheel of Fortune
    // ========================================================================
    socket.on('shareWheel', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var wheelData = {
            wheelId: generateToken(8),
            creator: username,
            options: data.options,
            room: data.room || 'general'
        };

        io.to(data.room || 'general').emit('sharedWheel', wheelData);
    });

    socket.on('spinWheel', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var options = data.options || [];
        if (options.length < 2) return;
        var resultIndex = Math.floor(Math.random() * options.length);
        var sliceAngle = 360 / options.length;
        var rotations = 5 + Math.floor(Math.random() * 5);
        var finalAngle = (rotations * 360) + (360 - (resultIndex * sliceAngle + sliceAngle / 2));
        var room = data.room || 'general';

        var spinData = {
            wheelId: data.wheelId,
            result: options[resultIndex],
            resultIndex: resultIndex,
            finalAngle: finalAngle,
            spinDuration: 4000 + Math.random() * 2000,
            options: options,
            creator: username,
            timestamp: Date.now()
        };

        io.to(room).emit('wheelResult', spinData);
    });

    // ========================================================================
    // v5: Thread System
    // ========================================================================

    socket.on('createThread', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room || 'general';
        if (!hasRoomPermission(username, room, ROOM_PERMISSIONS.CREATE_THREADS)) {
            socket.emit('error', { message: 'You do not have permission to create threads in this room' });
            return;
        }

        var parentMessageId = data.parentMessageId;
        if (!parentMessageId) {
            socket.emit('error', { message: 'Parent message ID required' });
            return;
        }

        // Find parent message
        var history = messageHistory.get(room) || [];
        var parentMsg = history.find(function(m) { return m.id === parentMessageId; });
        if (!parentMsg) {
            socket.emit('error', { message: 'Parent message not found' });
            return;
        }

        var threadId = generateToken(8);
        var thread = {
            id: threadId,
            parentMessageId: parentMessageId,
            room: room,
            creator: username,
            createdAt: Date.now(),
            messages: [],
            participants: new Set([username]),
            title: data.title || (parentMsg.message || '').substring(0, 50),
            lastActivity: Date.now(),
            messageCount: 0,
            locked: false
        };

        // Add initial reply if provided
        if (data.message) {
            var replyMsg = {
                id: generateToken(8),
                username: username,
                message: data.message,
                timestamp: Date.now(),
                threadId: threadId,
                avatar: avatars.get(username) || null,
                role: getUserRole(username),
                nameColor: accounts.get(username) ? accounts.get(username).nameColor : ''
            };
            thread.messages.push(replyMsg);
            thread.messageCount = 1;
        }

        threads.set(threadId, thread);
        saveThreads();

        // Mark parent message as having a thread
        parentMsg.threadId = threadId;
        parentMsg.threadCount = 1;

        checkAndAwardAchievement(username, 'thread_starter');
        awardXP(username, 5, 'Created thread');
        addAuditEntry('create_thread', username, 'Thread: ' + thread.title);

        socket.emit('threadCreated', {
            threadId: threadId,
            thread: Object.assign({}, thread, { participants: Array.from(thread.participants) })
        });

        // Notify room about thread
        io.to(room).emit('messageThreaded', {
            messageId: parentMessageId,
            threadId: threadId,
            threadCount: 1,
            room: room
        });
    });

    socket.on('replyToThread', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var thread = threads.get(data.threadId);
        if (!thread) {
            socket.emit('error', { message: 'Thread not found' });
            return;
        }
        if (thread.locked && !isAdmin(username)) {
            socket.emit('error', { message: 'This thread is locked' });
            return;
        }

        var message = (data.message || '').trim();
        if (!message || message.length > AUTO_MOD_SETTINGS.maxMessageLength) {
            socket.emit('error', { message: 'Invalid message length' });
            return;
        }

        var replyMsg = {
            id: generateToken(8),
            username: username,
            message: message,
            timestamp: Date.now(),
            threadId: data.threadId,
            avatar: avatars.get(username) || null,
            role: getUserRole(username),
            nameColor: accounts.get(username) ? accounts.get(username).nameColor : '',
            replyTo: data.replyTo || null
        };

        thread.messages.push(replyMsg);
        thread.messageCount = thread.messages.length;
        thread.participants.add(username);
        thread.lastActivity = Date.now();

        if (thread.messages.length > 500) {
            thread.messages.splice(0, thread.messages.length - 500);
        }

        saveThreads();
        awardXP(username, 3, 'Thread reply');
        trackMessageAnalytics(message, username);

        // Notify all thread participants
        var threadData = Object.assign({}, thread, { participants: Array.from(thread.participants) });
        thread.participants.forEach(function(participant) {
            var partData = onlineUsers.get(participant);
            if (partData) {
                io.to(partData.socketId).emit('threadReply', {
                    threadId: data.threadId,
                    message: replyMsg,
                    thread: threadData
                });
            }
        });

        // Update thread count on parent message
        var history = messageHistory.get(thread.room) || [];
        var parentMsg = history.find(function(m) { return m.id === thread.parentMessageId; });
        if (parentMsg) {
            parentMsg.threadCount = thread.messageCount;
        }

        io.to(thread.room).emit('threadUpdated', {
            messageId: thread.parentMessageId,
            threadId: data.threadId,
            threadCount: thread.messageCount,
            lastReply: replyMsg,
            room: thread.room
        });
    });

    socket.on('getThread', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var thread = threads.get(data.threadId);
        if (!thread) {
            socket.emit('error', { message: 'Thread not found' });
            return;
        }

        socket.emit('threadData', {
            threadId: data.threadId,
            thread: Object.assign({}, thread, { participants: Array.from(thread.participants) })
        });
    });

    socket.on('lockThread', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var thread = threads.get(data.threadId);
        if (!thread) return;
        if (thread.creator !== username && !isAdmin(username) && !isModerator(username)) return;

        thread.locked = !thread.locked;
        saveThreads();

        thread.participants.forEach(function(participant) {
            var partData = onlineUsers.get(participant);
            if (partData) {
                io.to(partData.socketId).emit('threadLocked', {
                    threadId: data.threadId,
                    locked: thread.locked
                });
            }
        });

        addAuditEntry('thread_lock', username, (thread.locked ? 'Locked' : 'Unlocked') + ' thread: ' + thread.title);
    });

    // ========================================================================
    // v5: Scheduled Messages
    // ========================================================================

    socket.on('scheduleMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var message = (data.message || '').trim();
        if (!message) {
            socket.emit('error', { message: 'Message cannot be empty' });
            return;
        }

        var scheduledAt = data.scheduledAt;
        if (!scheduledAt || scheduledAt <= Date.now()) {
            socket.emit('error', { message: 'Schedule time must be in the future' });
            return;
        }

        // Max 24 hours in advance
        if (scheduledAt > Date.now() + 24 * 60 * 60 * 1000) {
            socket.emit('error', { message: 'Cannot schedule more than 24 hours ahead' });
            return;
        }

        var scheduled = {
            id: generateToken(8),
            username: username,
            message: message,
            room: data.room || 'general',
            scheduledAt: scheduledAt,
            createdAt: Date.now(),
            delivered: false,
            cancelled: false
        };

        scheduledMessages.push(scheduled);
        saveScheduledMessages();

        socket.emit('messageScheduled', {
            id: scheduled.id,
            scheduledAt: scheduledAt,
            message: message,
            room: scheduled.room
        });

        addAuditEntry('schedule_message', username, 'Scheduled for ' + new Date(scheduledAt).toISOString());
    });

    socket.on('cancelScheduledMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var msg = scheduledMessages.find(function(m) { return m.id === data.messageId && m.username === username; });
        if (!msg) {
            socket.emit('error', { message: 'Scheduled message not found' });
            return;
        }

        msg.cancelled = true;
        saveScheduledMessages();
        socket.emit('scheduledMessageCancelled', { id: data.messageId });
    });

    socket.on('getScheduledMessages', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var userScheduled = scheduledMessages.filter(function(m) {
            return m.username === username && !m.delivered && !m.cancelled;
        });

        socket.emit('scheduledMessagesList', { messages: userScheduled });
    });

    // ========================================================================
    // v5: Server-Side Message Search
    // ========================================================================

    socket.on('searchMessages', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var query = (data.query || '').trim().toLowerCase();
        if (!query || query.length < 2) {
            socket.emit('searchResults', { results: [], query: data.query });
            return;
        }

        var results = [];
        var maxResults = Math.min(data.limit || 50, 100);
        var searchRoom = data.room; // null = search all accessible rooms
        var fromUser = data.fromUser;
        var dateFrom = data.dateFrom;
        var dateTo = data.dateTo;
        var hasFile = data.hasFile;

        function searchInHistory(room, messages) {
            messages.forEach(function(msg) {
                if (results.length >= maxResults) return;

                // Apply filters
                if (fromUser && msg.username !== fromUser) return;
                if (dateFrom && msg.timestamp < dateFrom) return;
                if (dateTo && msg.timestamp > dateTo) return;
                if (hasFile && !msg.fileUrl) return;

                // Check if user is blocked
                var blocked = blockLists.get(username);
                if (blocked && blocked.has(msg.username)) return;

                // Text search
                var msgText = (msg.message || '').toLowerCase();
                var msgUser = (msg.username || '').toLowerCase();
                if (msgText.includes(query) || msgUser.includes(query)) {
                    results.push({
                        id: msg.id,
                        username: msg.username,
                        message: msg.message,
                        room: room,
                        timestamp: msg.timestamp,
                        fileUrl: msg.fileUrl || null,
                        fileName: msg.fileName || null,
                        avatar: msg.avatar || null,
                        highlight: getHighlightSnippet(msg.message, query)
                    });
                }
            });
        }

        if (searchRoom) {
            var history = messageHistory.get(searchRoom) || [];
            searchInHistory(searchRoom, history);
        } else {
            // Search all rooms user has access to
            messageHistory.forEach(function(messages, room) {
                if (results.length >= maxResults) return;
                searchInHistory(room, messages);
            });

            // Also search DMs
            dmHistory.forEach(function(messages, dmKey) {
                if (results.length >= maxResults) return;
                if (dmKey.includes(username)) {
                    searchInHistory('DM', messages);
                }
            });
        }

        // Sort by relevance (most recent first)
        results.sort(function(a, b) { return b.timestamp - a.timestamp; });

        socket.emit('searchResults', {
            results: results.slice(0, maxResults),
            query: data.query,
            totalFound: results.length
        });
    });

    function getHighlightSnippet(text, query) {
        if (!text) return '';
        var idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text.substring(0, 100);
        var start = Math.max(0, idx - 30);
        var end = Math.min(text.length, idx + query.length + 30);
        var snippet = '';
        if (start > 0) snippet += '...';
        snippet += text.substring(start, end);
        if (end < text.length) snippet += '...';
        return snippet;
    }

    // ========================================================================
    // v5: User Block System
    // ========================================================================

    socket.on('blockUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var target = data.username;
        if (!target || target === username) {
            socket.emit('error', { message: 'Cannot block yourself' });
            return;
        }
        if (!accounts.has(target)) {
            socket.emit('error', { message: 'User not found' });
            return;
        }
        if (isAdmin(target)) {
            socket.emit('error', { message: 'Cannot block administrators' });
            return;
        }

        if (!blockLists.has(username)) blockLists.set(username, new Set());
        blockLists.get(username).add(target);
        saveBlockLists();

        socket.emit('userBlocked', { username: target });
        socket.emit('blockList', { blocked: Array.from(blockLists.get(username)) });
        addAuditEntry('block_user', username, 'Blocked: ' + target);
    });

    socket.on('unblockUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var target = data.username;
        var list = blockLists.get(username);
        if (list) {
            list.delete(target);
            saveBlockLists();
        }

        socket.emit('userUnblocked', { username: target });
        socket.emit('blockList', { blocked: Array.from(list || []) });
        addAuditEntry('unblock_user', username, 'Unblocked: ' + target);
    });

    socket.on('getBlockList', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var list = blockLists.get(username) || new Set();
        socket.emit('blockList', { blocked: Array.from(list) });
    });

    // ========================================================================
    // v5: Room Invite System
    // ========================================================================

    socket.on('createRoomInvite', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var roomId = data.roomId;
        var room = customRooms.get(roomId);
        if (!room) {
            socket.emit('error', { message: 'Room not found' });
            return;
        }

        if (!hasRoomPermission(username, roomId, ROOM_PERMISSIONS.INVITE_USERS)) {
            socket.emit('error', { message: 'You do not have permission to create invites' });
            return;
        }

        var inviteCode = generateToken(4).toUpperCase();
        var invite = {
            code: inviteCode,
            roomId: roomId,
            roomName: room.name,
            creator: username,
            createdAt: Date.now(),
            expiresAt: data.expiresIn ? Date.now() + data.expiresIn : Date.now() + 7 * 24 * 60 * 60 * 1000, // Default 7 days
            maxUses: data.maxUses || 0, // 0 = unlimited
            uses: 0
        };

        roomInvites.set(inviteCode, invite);
        saveRoomInvites();

        socket.emit('roomInviteCreated', {
            code: inviteCode,
            invite: invite,
            link: '/invite/' + inviteCode
        });

        addAuditEntry('create_invite', username, 'Room: ' + room.name + ' Code: ' + inviteCode);
    });

    socket.on('useRoomInvite', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var code = (data.code || '').toUpperCase().trim();
        var invite = roomInvites.get(code);
        if (!invite) {
            socket.emit('error', { message: 'Invalid or expired invite code' });
            return;
        }

        if (invite.expiresAt && Date.now() > invite.expiresAt) {
            roomInvites.delete(code);
            saveRoomInvites();
            socket.emit('error', { message: 'This invite has expired' });
            return;
        }

        if (invite.maxUses > 0 && invite.uses >= invite.maxUses) {
            socket.emit('error', { message: 'This invite has reached its maximum uses' });
            return;
        }

        var room = customRooms.get(invite.roomId);
        if (!room) {
            socket.emit('error', { message: 'Room no longer exists' });
            return;
        }

        // Add user to room
        if (!room.members) room.members = new Set();
        if (room.members.has(username)) {
            socket.emit('error', { message: 'You are already in this room' });
            return;
        }

        room.members.add(username);
        socket.join(invite.roomId);

        var userData = onlineUsers.get(username);
        if (userData) userData.rooms.add(invite.roomId);

        invite.uses++;
        saveRoomInvites();
        saveRooms();

        socket.emit('roomJoined', { roomId: invite.roomId, roomName: room.name });
        broadcastRoomLists();
        broadcastUserList(invite.roomId);

        io.to(invite.roomId).emit('systemMessage', {
            message: username + ' joined via invite',
            timestamp: Date.now()
        });

        addAuditEntry('use_invite', username, 'Room: ' + room.name);
    });

    socket.on('revokeRoomInvite', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var code = (data.code || '').toUpperCase().trim();
        var invite = roomInvites.get(code);
        if (!invite) {
            socket.emit('error', { message: 'Invite not found' });
            return;
        }

        if (invite.creator !== username && !isAdmin(username)) {
            socket.emit('error', { message: 'You can only revoke your own invites' });
            return;
        }

        roomInvites.delete(code);
        saveRoomInvites();
        socket.emit('roomInviteRevoked', { code: code });
        addAuditEntry('revoke_invite', username, 'Code: ' + code);
    });

    socket.on('getRoomInvites', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var roomId = data.roomId;
        var invites = [];
        roomInvites.forEach(function(invite, code) {
            if (invite.roomId === roomId) {
                invites.push(Object.assign({ code: code }, invite));
            }
        });

        socket.emit('roomInvitesList', { roomId: roomId, invites: invites });
    });

    // ========================================================================
    // v5: Slow Mode
    // ========================================================================

    socket.on('setSlowMode', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var roomId = data.roomId || 'general';
        if (!hasRoomPermission(username, roomId, ROOM_PERMISSIONS.USE_SLOWMODE)) {
            socket.emit('error', { message: 'You do not have permission to set slow mode' });
            return;
        }

        var interval = parseInt(data.interval) || 0; // seconds
        if (interval < 0 || interval > 3600) {
            socket.emit('error', { message: 'Slow mode interval must be 0-3600 seconds' });
            return;
        }

        if (interval === 0) {
            slowModeSettings.delete(roomId);
        } else {
            slowModeSettings.set(roomId, {
                interval: interval * 1000, // convert to ms
                enabled: true,
                setBy: username,
                setAt: Date.now()
            });
        }

        saveSlowMode();

        io.to(roomId).emit('slowModeUpdate', {
            roomId: roomId,
            interval: interval,
            enabled: interval > 0,
            setBy: username
        });

        io.to(roomId).emit('systemMessage', {
            message: interval > 0
                ? username + ' enabled slow mode (' + interval + 's)'
                : username + ' disabled slow mode',
            timestamp: Date.now()
        });

        addAuditEntry('slow_mode', username, 'Room: ' + roomId + ' Interval: ' + interval + 's');
    });

    // Check slow mode before allowing messages (helper used in chat)
    function checkSlowMode(username, room) {
        var settings = slowModeSettings.get(room);
        if (!settings || !settings.enabled) return true;
        if (isAdmin(username) || isModerator(username)) return true;

        var key = room + ':' + username;
        var lastTime = userLastMessageTime.get(key) || 0;
        var now = Date.now();

        if (now - lastTime < settings.interval) {
            var remaining = Math.ceil((settings.interval - (now - lastTime)) / 1000);
            return remaining; // Returns seconds remaining
        }

        userLastMessageTime.set(key, now);
        return true;
    }

    // ========================================================================
    // v5: Scheduled Events / Calendar
    // ========================================================================

    socket.on('createEvent', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var title = (data.title || '').trim();
        if (!title || title.length < 2 || title.length > 100) {
            socket.emit('error', { message: 'Event title must be 2-100 characters' });
            return;
        }

        var startTime = data.startTime;
        if (!startTime || startTime <= Date.now()) {
            socket.emit('error', { message: 'Event start time must be in the future' });
            return;
        }

        var event = {
            id: generateToken(8),
            title: title,
            description: (data.description || '').trim().substring(0, 500),
            room: data.room || 'general',
            creator: username,
            startTime: startTime,
            endTime: data.endTime || startTime + 60 * 60 * 1000, // Default 1 hour
            createdAt: Date.now(),
            attendees: [username],
            interested: [],
            color: data.color || '#5865f2',
            recurring: data.recurring || false,
            recurrencePattern: data.recurrencePattern || null, // daily, weekly, monthly
            reminders: data.reminders || [15], // minutes before
            cancelled: false,
            category: data.category || 'general',
            location: data.location || '',
            maxAttendees: data.maxAttendees || 0 // 0 = unlimited
        };

        scheduledEvents.push(event);
        saveScheduledEvents();

        checkAndAwardAchievement(username, 'event_organizer');
        addAuditEntry('create_event', username, 'Event: ' + title);

        io.to(event.room).emit('eventCreated', event);
        io.to(event.room).emit('systemMessage', {
            message: username + ' created event: ' + title,
            timestamp: Date.now()
        });
    });

    socket.on('respondToEvent', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var event = scheduledEvents.find(function(e) { return e.id === data.eventId; });
        if (!event || event.cancelled) {
            socket.emit('error', { message: 'Event not found or cancelled' });
            return;
        }

        var response = data.response; // 'attending', 'interested', 'decline'

        // Remove from all lists first
        event.attendees = event.attendees.filter(function(u) { return u !== username; });
        event.interested = event.interested.filter(function(u) { return u !== username; });

        if (response === 'attending') {
            if (event.maxAttendees > 0 && event.attendees.length >= event.maxAttendees) {
                socket.emit('error', { message: 'Event is full' });
                return;
            }
            event.attendees.push(username);
        } else if (response === 'interested') {
            event.interested.push(username);
        }

        saveScheduledEvents();

        io.to(event.room).emit('eventUpdated', event);
        socket.emit('eventResponseSaved', { eventId: data.eventId, response: response });
    });

    socket.on('cancelEvent', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var event = scheduledEvents.find(function(e) { return e.id === data.eventId; });
        if (!event) return;
        if (event.creator !== username && !isAdmin(username)) return;

        event.cancelled = true;
        saveScheduledEvents();

        io.to(event.room).emit('eventCancelled', { eventId: data.eventId });
        io.to(event.room).emit('systemMessage', {
            message: 'Event cancelled: ' + event.title,
            timestamp: Date.now()
        });

        addAuditEntry('cancel_event', username, 'Event: ' + event.title);
    });

    socket.on('getEvents', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room;
        var upcoming = scheduledEvents.filter(function(e) {
            if (e.cancelled) return false;
            if (room && e.room !== room) return false;
            return e.startTime > Date.now() - 60 * 60 * 1000; // Include events that started within last hour
        });

        upcoming.sort(function(a, b) { return a.startTime - b.startTime; });
        socket.emit('eventsList', { events: upcoming.slice(0, 50) });
    });

    // ========================================================================
    // v5: Custom Emoji System
    // ========================================================================

    socket.on('createCustomEmoji', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        if (!isAdmin(username) && !isModerator(username)) {
            socket.emit('error', { message: 'Only admins and moderators can create custom emojis' });
            return;
        }

        var name = (data.name || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
        if (!name || name.length < 2 || name.length > 32) {
            socket.emit('error', { message: 'Emoji name must be 2-32 characters (a-z, 0-9, _)' });
            return;
        }

        // Check for duplicate names
        var exists = false;
        customEmojis.forEach(function(emoji) {
            if (emoji.name === name) exists = true;
        });
        if (exists) {
            socket.emit('error', { message: 'An emoji with that name already exists' });
            return;
        }

        if (!data.url || data.url.length > 500000) {
            socket.emit('error', { message: 'Invalid emoji data' });
            return;
        }

        var emojiId = generateToken(6);
        var emoji = {
            id: emojiId,
            name: name,
            url: data.url,
            creator: username,
            createdAt: Date.now(),
            usageCount: 0,
            animated: data.animated || false,
            category: data.category || 'custom'
        };

        customEmojis.set(emojiId, emoji);
        saveCustomEmojis();

        checkAndAwardAchievement(username, 'custom_emoji_creator');
        addAuditEntry('create_emoji', username, 'Emoji: :' + name + ':');

        // Broadcast to all connected users
        io.emit('customEmojiAdded', emoji);
        socket.emit('customEmojiCreated', emoji);
    });

    socket.on('deleteCustomEmoji', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) {
            socket.emit('error', { message: 'Only admins can delete custom emojis' });
            return;
        }

        var emoji = customEmojis.get(data.emojiId);
        if (!emoji) {
            socket.emit('error', { message: 'Emoji not found' });
            return;
        }

        customEmojis.delete(data.emojiId);
        saveCustomEmojis();

        io.emit('customEmojiDeleted', { emojiId: data.emojiId });
        addAuditEntry('delete_emoji', username, 'Deleted emoji: :' + emoji.name + ':');
    });

    socket.on('getCustomEmojis', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var emojiList = [];
        customEmojis.forEach(function(emoji, id) {
            emojiList.push(Object.assign({ id: id }, emoji));
        });

        socket.emit('customEmojiList', { emojis: emojiList });
    });

    // ========================================================================
    // v5: Extended User Profile
    // ========================================================================

    socket.on('updateProfile', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var profile = userProfiles.get(username) || {};

        if (data.bio !== undefined) profile.bio = (data.bio || '').substring(0, 500);
        if (data.location !== undefined) profile.location = (data.location || '').substring(0, 100);
        if (data.website !== undefined) {
            var website = (data.website || '').substring(0, 200);
            if (website && !website.startsWith('http')) website = 'https://' + website;
            profile.website = website;
        }
        if (data.birthday !== undefined) profile.birthday = data.birthday;
        if (data.pronouns !== undefined) profile.pronouns = (data.pronouns || '').substring(0, 50);
        if (data.timezone !== undefined) profile.timezone = (data.timezone || '').substring(0, 50);
        if (data.languages !== undefined) profile.languages = (data.languages || []).slice(0, 5);
        if (data.socials !== undefined) {
            profile.socials = {
                github: (data.socials.github || '').substring(0, 100),
                twitter: (data.socials.twitter || '').substring(0, 100),
                discord: (data.socials.discord || '').substring(0, 100),
                website: (data.socials.website || '').substring(0, 200)
            };
        }
        if (data.theme !== undefined) profile.theme = data.theme;
        if (data.aboutMe !== undefined) profile.aboutMe = (data.aboutMe || '').substring(0, 1000);
        if (data.bannerColor !== undefined) {
            var bc = (data.bannerColor || '').substring(0, 20);
            profile.bannerColor = bc;
            var acc = accounts.get(username);
            if (acc) { acc.bannerColor = bc; saveAccounts(); }
        }
        if (data.bannerColor2 !== undefined) {
            var bc2 = (data.bannerColor2 || '').substring(0, 20);
            profile.bannerColor2 = bc2;
            var acc2 = accounts.get(username);
            if (acc2) { acc2.bannerColor2 = bc2; saveAccounts(); }
        }

        profile.updatedAt = Date.now();
        userProfiles.set(username, profile);
        saveUserProfiles();

        socket.emit('profileUpdated', { profile: profile });
        addAuditEntry('update_profile', username, 'Profile updated');
    });

    function getBadgesForUser(username) {
        var badges = [];
        if (isAdmin(username)) badges.push({ id: 'admin', name: 'Admin', icon: '👑', color: '#ff4444' });
        if (isModerator(username)) badges.push({ id: 'mod', name: 'Moderator', icon: '🛡️', color: '#4488ff' });

        var xpDetail = userXPDetails.get(username);
        if (xpDetail) {
            if (xpDetail.level >= 50) badges.push({ id: 'legend', name: 'Legend', icon: '🏆', color: '#ffd700' });
            else if (xpDetail.level >= 25) badges.push({ id: 'veteran', name: 'Veteran', icon: '🏅', color: '#c0c0c0' });
            else if (xpDetail.level >= 10) badges.push({ id: 'regular', name: 'Regular', icon: '⭐', color: '#cd7f32' });

            if (xpDetail.streak >= 30) badges.push({ id: 'streak30', name: '30-Day Streak', icon: '🔥', color: '#ff6600' });
            else if (xpDetail.streak >= 7) badges.push({ id: 'streak7', name: '7-Day Streak', icon: '✨', color: '#ffaa00' });
        }

        var userAchievements = achievements.get(username) || [];
        if (userAchievements.length >= 20) badges.push({ id: 'achiever', name: 'Achiever', icon: '🎖️', color: '#9b59b6' });
        if (userAchievements.length >= 10) badges.push({ id: 'collector', name: 'Collector', icon: '📀', color: '#3498db' });

        return badges;
    }

    // ========================================================================
    // v5: Read Receipts
    // ========================================================================

    socket.on('markAsRead', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room;
        var messageId = data.messageId;
        if (!room || !messageId) return;

        if (!readReceipts.has(room)) readReceipts.set(room, {});
        readReceipts.get(room)[username] = {
            messageId: messageId,
            timestamp: Date.now()
        };

        saveReadReceipts();

        // Broadcast read receipt to room (so senders see message was read)
        io.to(room).emit('readReceipt', {
            username: username,
            room: room,
            messageId: messageId,
            timestamp: Date.now()
        });
    });

    socket.on('getReadReceipts', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room;
        var receipts = readReceipts.get(room) || {};
        socket.emit('readReceiptsData', { room: room, receipts: receipts });
    });

    // ========================================================================
    // v5: Notification Preferences
    // ========================================================================

    socket.on('updateNotificationPrefs', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var prefs = notificationPrefs.get(username) || {
            muted: new Set(),
            dnd: false,
            sounds: true,
            desktop: true,
            mentions: true,
            friendRequests: true,
            roomInvites: true,
            achievements: true,
            dmNotifications: true,
            emailNotifications: false
        };

        if (data.muted !== undefined) {
            if (Array.isArray(data.muted)) {
                prefs.muted = new Set(data.muted);
            }
        }
        if (data.muteRoom) {
            if (!(prefs.muted instanceof Set)) prefs.muted = new Set(prefs.muted);
            prefs.muted.add(data.muteRoom);
        }
        if (data.unmuteRoom) {
            if (prefs.muted instanceof Set) prefs.muted.delete(data.unmuteRoom);
        }
        if (data.dnd !== undefined) prefs.dnd = !!data.dnd;
        if (data.sounds !== undefined) prefs.sounds = !!data.sounds;
        if (data.desktop !== undefined) prefs.desktop = !!data.desktop;
        if (data.mentions !== undefined) prefs.mentions = !!data.mentions;
        if (data.friendRequests !== undefined) prefs.friendRequests = !!data.friendRequests;
        if (data.roomInvites !== undefined) prefs.roomInvites = !!data.roomInvites;
        if (data.achievements !== undefined) prefs.achievements = !!data.achievements;
        if (data.dmNotifications !== undefined) prefs.dmNotifications = !!data.dmNotifications;
        if (data.emailNotifications !== undefined) prefs.emailNotifications = !!data.emailNotifications;

        notificationPrefs.set(username, prefs);
        saveNotificationPrefs();

        socket.emit('notificationPrefsUpdated', {
            prefs: Object.assign({}, prefs, { muted: Array.from(prefs.muted || []) })
        });
    });

    socket.on('getNotificationPrefs', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var prefs = notificationPrefs.get(username) || {
            muted: new Set(),
            dnd: false,
            sounds: true,
            desktop: true,
            mentions: true,
            friendRequests: true,
            roomInvites: true,
            achievements: true,
            dmNotifications: true,
            emailNotifications: false
        };

        socket.emit('notificationPrefsData', {
            prefs: Object.assign({}, prefs, { muted: Array.from(prefs.muted || []) })
        });
    });

    // ========================================================================
    // v5: Room Permissions Management
    // ========================================================================

    socket.on('setRoomPermission', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var roomId = data.roomId;
        if (!hasRoomPermission(username, roomId, ROOM_PERMISSIONS.MANAGE_PERMISSIONS)) {
            socket.emit('error', { message: 'No permission to manage room permissions' });
            return;
        }

        if (!roomPermissions.has(roomId)) {
            roomPermissions.set(roomId, { roles: {}, users: {} });
        }
        var perms = roomPermissions.get(roomId);

        if (data.targetUser) {
            if (!perms.users) perms.users = {};
            perms.users[data.targetUser] = data.permissions || [];
        } else if (data.targetRole) {
            if (!perms.roles) perms.roles = {};
            perms.roles[data.targetRole] = data.permissions || [];
        }

        saveRoomPermissions();

        socket.emit('roomPermissionsUpdated', {
            roomId: roomId,
            permissions: perms
        });

        addAuditEntry('set_permission', username, 'Room: ' + roomId + ' Target: ' + (data.targetUser || data.targetRole));
    });

    socket.on('getRoomPermissions', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var roomId = data.roomId;
        var perms = roomPermissions.get(roomId) || { roles: {}, users: {} };

        socket.emit('roomPermissionsData', {
            roomId: roomId,
            permissions: perms,
            availablePermissions: Object.values(ROOM_PERMISSIONS)
        });
    });

    // ========================================================================
    // v5: Room Topic Management
    // ========================================================================

    socket.on('setRoomTopic', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var roomId = data.roomId;
        if (!hasRoomPermission(username, roomId, ROOM_PERMISSIONS.SET_TOPIC)) {
            socket.emit('error', { message: 'No permission to set topic' });
            return;
        }

        var topic = (data.topic || '').trim().substring(0, 256);
        var room = customRooms.get(roomId);
        if (!room) {
            socket.emit('error', { message: 'Room not found' });
            return;
        }

        var oldTopic = room.topic || '';
        room.topic = topic;
        saveRooms();

        // Save to topic history
        if (!topicHistory.has(roomId)) topicHistory.set(roomId, []);
        topicHistory.get(roomId).push({
            topic: topic,
            setBy: username,
            setAt: Date.now(),
            previousTopic: oldTopic
        });
        var history = topicHistory.get(roomId);
        if (history.length > 50) history.splice(0, history.length - 50);
        saveTopicHistory();

        io.to(roomId).emit('topicChanged', {
            roomId: roomId,
            topic: topic,
            setBy: username,
            timestamp: Date.now()
        });

        io.to(roomId).emit('systemMessage', {
            message: username + ' changed the topic to: ' + (topic || '(cleared)'),
            timestamp: Date.now()
        });

        addAuditEntry('set_topic', username, 'Room: ' + (room.name || roomId));
    });

    socket.on('getTopicHistory', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var roomId = data.roomId;
        var history = topicHistory.get(roomId) || [];
        socket.emit('topicHistoryData', { roomId: roomId, history: history.slice(-20) });
    });

    // ========================================================================
    // v5: User Presence
    // ========================================================================

    socket.on('updatePresence', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var presence = userPresence.get(username) || {};
        if (data.status) presence.status = data.status;
        if (data.customStatus !== undefined) presence.customStatus = (data.customStatus || '').substring(0, 128);
        if (data.device) presence.device = data.device;
        if (data.activity) {
            presence.activity = {
                type: data.activity.type || 'custom', // playing, listening, watching, custom
                name: (data.activity.name || '').substring(0, 100),
                details: (data.activity.details || '').substring(0, 100),
                startedAt: Date.now()
            };
        }
        presence.lastSeen = Date.now();
        userPresence.set(username, presence);

        // Update online user data too
        var userData = onlineUsers.get(username);
        if (userData) {
            userData.status = presence.status || userData.status;
            userData.customStatus = presence.customStatus;
        }

        // Broadcast presence update to friends
        var acc = accounts.get(username);
        if (acc && acc.friends) {
            acc.friends.forEach(function(friend) {
                var friendData = onlineUsers.get(friend);
                if (friendData) {
                    io.to(friendData.socketId).emit('presenceUpdate', {
                        username: username,
                        presence: presence
                    });
                }
            });
        }

        // Also broadcast to current rooms
        if (userData && userData.rooms) {
            userData.rooms.forEach(function(room) {
                socket.to(room).emit('presenceUpdate', {
                    username: username,
                    presence: presence
                });
            });
        }
    });

    // ========================================================================
    // v5: Auto-Response System
    // ========================================================================

    socket.on('createAutoResponse', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        if (!isAdmin(username) && !isModerator(username)) {
            socket.emit('error', { message: 'Only admins and moderators can create auto-responses' });
            return;
        }

        var trigger = (data.trigger || '').trim().toLowerCase();
        if (!trigger || trigger.length < 2) {
            socket.emit('error', { message: 'Trigger must be at least 2 characters' });
            return;
        }

        var response = (data.response || '').trim();
        if (!response) {
            socket.emit('error', { message: 'Response cannot be empty' });
            return;
        }

        var autoResp = {
            trigger: trigger,
            response: response,
            creator: username,
            createdAt: Date.now(),
            isRegex: data.isRegex || false,
            room: data.room || null, // null = all rooms
            cooldown: data.cooldown || 30000, // 30 second default cooldown
            lastTriggered: 0,
            triggerCount: 0,
            enabled: true
        };

        autoResponses.set(trigger, autoResp);
        saveAutoResponses();

        socket.emit('autoResponseCreated', autoResp);
        addAuditEntry('create_auto_response', username, 'Trigger: ' + trigger);
    });

    socket.on('deleteAutoResponse', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username) && !isModerator(username)) return;

        autoResponses.delete(data.trigger);
        saveAutoResponses();
        socket.emit('autoResponseDeleted', { trigger: data.trigger });
        addAuditEntry('delete_auto_response', username, 'Trigger: ' + data.trigger);
    });

    socket.on('getAutoResponses', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username) && !isModerator(username)) return;

        var list = [];
        autoResponses.forEach(function(resp, trigger) {
            list.push(Object.assign({ trigger: trigger }, resp));
        });
        socket.emit('autoResponsesList', { responses: list });
    });

    function checkAutoResponses(message, room) {
        var responses = [];
        var now = Date.now();

        autoResponses.forEach(function(resp) {
            if (!resp.enabled) return;
            if (resp.room && resp.room !== room) return;
            if (now - resp.lastTriggered < resp.cooldown) return;

            var triggered = false;
            if (resp.isRegex) {
                try {
                    var regex = new RegExp(resp.trigger, 'i');
                    triggered = regex.test(message);
                } catch (e) { /* invalid regex */ }
            } else {
                triggered = message.toLowerCase().includes(resp.trigger);
            }

            if (triggered) {
                resp.lastTriggered = now;
                resp.triggerCount++;
                responses.push(resp.response);
            }
        });

        return responses;
    }

    // ========================================================================
    // v5: Server Warnings
    // ========================================================================

    socket.on('warnUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username) && !isModerator(username)) return;

        var target = data.username;
        if (!accounts.has(target)) {
            socket.emit('error', { message: 'User not found' });
            return;
        }

        var warning = {
            id: generateToken(8),
            reason: (data.reason || 'No reason specified').substring(0, 500),
            issuedBy: username,
            issuedAt: Date.now(),
            expires: data.expiresIn ? Date.now() + data.expiresIn : null,
            acknowledged: false,
            severity: data.severity || 'warning' // warning, serious, final
        };

        if (!serverWarnings.has(target)) serverWarnings.set(target, []);
        serverWarnings.get(target).push(warning);
        saveServerWarnings();

        // Notify target
        var targetData = onlineUsers.get(target);
        if (targetData) {
            io.to(targetData.socketId).emit('warningReceived', warning);
            io.to(targetData.socketId).emit('notification', {
                type: 'warning',
                message: 'You have received a warning: ' + warning.reason,
                severity: warning.severity
            });
        }

        socket.emit('warningSent', { target: target, warning: warning });
        addAuditEntry('warn_user', username, 'Warned: ' + target + ' Reason: ' + warning.reason);

        // Auto-action based on warning count
        var warnings = serverWarnings.get(target);
        var activeWarnings = warnings.filter(function(w) {
            return !w.expires || w.expires > Date.now();
        });

        if (activeWarnings.length >= 5) {
            // Auto-temp-ban after 5 active warnings
            bannedUsers.set(target, {
                reason: 'Accumulated 5 warnings (auto-ban)',
                bannedBy: 'System',
                bannedAt: Date.now(),
                expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hour ban
            });
            saveJSON(dataFiles.bannedUsers, Object.fromEntries(bannedUsers));

            if (targetData) {
                io.to(targetData.socketId).emit('banned', {
                    reason: 'Accumulated too many warnings',
                    expiresAt: Date.now() + 24 * 60 * 60 * 1000
                });
            }

            addAuditEntry('auto_ban', 'System', 'Auto-banned: ' + target + ' (5 warnings)');
        }
    });

    socket.on('getUserWarnings', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var target = data.username || username;
        // Users can see their own warnings, admins/mods can see anyone's
        if (target !== username && !isAdmin(username) && !isModerator(username)) {
            socket.emit('error', { message: 'You can only view your own warnings' });
            return;
        }

        var warnings = serverWarnings.get(target) || [];
        socket.emit('userWarnings', {
            username: target,
            warnings: warnings,
            activeCount: warnings.filter(function(w) {
                return !w.expires || w.expires > Date.now();
            }).length
        });
    });

    socket.on('acknowledgeWarning', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var warnings = serverWarnings.get(username);
        if (!warnings) return;

        var warning = warnings.find(function(w) { return w.id === data.warningId; });
        if (warning) {
            warning.acknowledged = true;
            saveServerWarnings();
            socket.emit('warningAcknowledged', { warningId: data.warningId });
        }
    });

    // ========================================================================
    // v5: Saved / Favorite Messages
    // ========================================================================

    socket.on('saveMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        if (!savedMessages.has(username)) savedMessages.set(username, []);
        var saved = savedMessages.get(username);

        // Check if already saved
        var exists = saved.find(function(s) { return s.messageId === data.messageId; });
        if (exists) {
            socket.emit('error', { message: 'Message already saved' });
            return;
        }

        saved.push({
            messageId: data.messageId,
            room: data.room,
            message: data.message,
            username: data.username,
            timestamp: data.timestamp,
            savedAt: Date.now(),
            note: (data.note || '').substring(0, 200),
            tags: (data.tags || []).slice(0, 5)
        });

        if (saved.length > 200) saved.shift();
        saveSavedMessages();

        socket.emit('messageSaved', { messageId: data.messageId });

        // Check bookmark collector achievement
        if (saved.length >= 25) {
            checkAndAwardAchievement(username, 'bookmark_collector');
        }
    });

    socket.on('unsaveMessage', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var saved = savedMessages.get(username);
        if (!saved) return;

        savedMessages.set(username, saved.filter(function(s) {
            return s.messageId !== data.messageId;
        }));
        saveSavedMessages();

        socket.emit('messageUnsaved', { messageId: data.messageId });
    });

    socket.on('getSavedMessages', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var saved = savedMessages.get(username) || [];
        var filtered = saved;

        // Apply tag filter
        if (data && data.tag) {
            filtered = saved.filter(function(s) {
                return s.tags && s.tags.includes(data.tag);
            });
        }

        // Apply room filter
        if (data && data.room) {
            filtered = filtered.filter(function(s) { return s.room === data.room; });
        }

        socket.emit('savedMessagesList', {
            messages: filtered.slice(-50),
            totalCount: saved.length
        });
    });

    // ========================================================================
    // v5: Channel Categories
    // ========================================================================

    socket.on('createCategory', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) {
            socket.emit('error', { message: 'Only admins can create categories' });
            return;
        }

        var name = (data.name || '').trim();
        if (!name || name.length < 2 || name.length > 40) {
            socket.emit('error', { message: 'Category name must be 2-40 characters' });
            return;
        }

        var categoryId = generateToken(6);
        var category = {
            id: categoryId,
            name: name,
            rooms: data.rooms || [],
            position: channelCategories.size,
            collapsed: false,
            createdBy: username,
            createdAt: Date.now()
        };

        channelCategories.set(categoryId, category);
        saveChannelCategories();

        io.emit('categoryCreated', category);
        addAuditEntry('create_category', username, 'Category: ' + name);
    });

    socket.on('updateCategory', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) return;

        var category = channelCategories.get(data.categoryId);
        if (!category) return;

        if (data.name) category.name = (data.name || '').trim().substring(0, 40);
        if (data.rooms) category.rooms = data.rooms;
        if (data.position !== undefined) category.position = data.position;

        saveChannelCategories();

        io.emit('categoryUpdated', category);
    });

    socket.on('deleteCategory', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) return;

        channelCategories.delete(data.categoryId);
        saveChannelCategories();

        io.emit('categoryDeleted', { categoryId: data.categoryId });
        addAuditEntry('delete_category', username, 'Category: ' + data.categoryId);
    });

    socket.on('getCategories', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var cats = [];
        channelCategories.forEach(function(cat, id) {
            cats.push(Object.assign({ id: id }, cat));
        });
        cats.sort(function(a, b) { return a.position - b.position; });

        socket.emit('categoriesList', { categories: cats });
    });

    // ========================================================================
    // v5: Chat Analytics & Stats
    // ========================================================================

    socket.on('getChatAnalytics', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        // Per-user stats
        var xpDetail = userXPDetails.get(username) || {};
        var userStats = {
            messagesCount: xpDetail.totalMessages || 0,
            reactionsGiven: xpDetail.totalReactions || 0,
            dmsCount: xpDetail.totalDMs || 0,
            roomsJoined: xpDetail.roomsJoined || 0,
            level: xpDetail.level || 1,
            xp: xpDetail.totalXP || 0,
            streak: xpDetail.streak || 0,
            memberSince: accounts.get(username) ? accounts.get(username).createdAt : null,
            achievementCount: (achievements.get(username) || []).length,
            bookmarkCount: (bookmarks.get(username) || []).length,
            savedMessageCount: (savedMessages.get(username) || []).length,
            friendCount: accounts.get(username) && accounts.get(username).friends
                ? accounts.get(username).friends.length : 0
        };

        socket.emit('chatAnalyticsData', {
            serverStats: {
                totalMessages: serverStats.totalMessages,
                totalUsers: accounts.size,
                onlineUsers: onlineUsers.size,
                totalRooms: customRooms.size + 1,
                peakOnline: serverStats.peakOnlineUsers,
                uptime: Date.now() - serverStats.startTime,
                messagesByHour: chatAnalytics.messagesByHour,
                messagesByDay: chatAnalytics.messagesByDay,
                averageMessageLength: chatAnalytics.averageMessageLength,
                topEmojis: getTopN(chatAnalytics.topEmojis, 10),
                messageVelocity: chatAnalytics.messageVelocity.slice(-30)
            },
            userStats: userStats
        });
    });

    socket.on('getLeaderboard', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var type = data.type || 'xp'; // xp, messages, streaks, achievements
        var leaderboard = [];

        userXPDetails.forEach(function(xpDetail, user) {
            var entry = {
                username: user,
                avatar: avatars.get(user) || null,
                online: onlineUsers.has(user)
            };

            if (type === 'xp') {
                entry.value = xpDetail.totalXP || 0;
                entry.level = xpDetail.level || 1;
            } else if (type === 'messages') {
                entry.value = xpDetail.totalMessages || 0;
            } else if (type === 'streaks') {
                entry.value = xpDetail.streak || 0;
            } else if (type === 'achievements') {
                entry.value = (achievements.get(user) || []).length;
            }

            leaderboard.push(entry);
        });

        leaderboard.sort(function(a, b) { return b.value - a.value; });

        socket.emit('leaderboardData', {
            type: type,
            entries: leaderboard.slice(0, 50),
            myRank: leaderboard.findIndex(function(e) { return e.username === username; }) + 1
        });
    });

    function getTopN(obj, n) {
        return Object.entries(obj)
            .sort(function(a, b) { return b[1] - a[1]; })
            .slice(0, n)
            .map(function(entry) { return { key: entry[0], count: entry[1] }; });
    }

    // ========================================================================
    // v5: Admin Audit Log
    // ========================================================================

    socket.on('getAuditLog', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) {
            socket.emit('error', { message: 'Admin access required' });
            return;
        }

        var filter = data.filter || {};
        var filtered = auditLog;

        if (filter.action) {
            filtered = filtered.filter(function(e) { return e.action === filter.action; });
        }
        if (filter.user) {
            filtered = filtered.filter(function(e) { return e.user === filter.user; });
        }
        if (filter.from) {
            filtered = filtered.filter(function(e) { return e.timestamp >= filter.from; });
        }
        if (filter.to) {
            filtered = filtered.filter(function(e) { return e.timestamp <= filter.to; });
        }

        var page = data.page || 1;
        var pageSize = Math.min(data.pageSize || 50, 100);
        var start = (page - 1) * pageSize;

        socket.emit('auditLogData', {
            entries: filtered.slice(start, start + pageSize),
            total: filtered.length,
            page: page,
            totalPages: Math.ceil(filtered.length / pageSize)
        });
    });

    // ========================================================================
    // v5: Admin Server Config
    // ========================================================================

    socket.on('getServerConfig', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) return;

        socket.emit('serverConfig', {
            autoMod: AUTO_MOD_SETTINGS,
            xpConfig: XP_CONFIG,
            filteredWords: FILTERED_WORDS,
            maxFileSize: 100 * 1024 * 1024,
            maxMessageLength: AUTO_MOD_SETTINGS.maxMessageLength,
            serverVersion: '5.0',
            nodeVersion: process.version,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            dataDir: DATA_DIR,
            accountCount: accounts.size,
            roomCount: customRooms.size,
            onlineCount: onlineUsers.size,
            bannedCount: bannedUsers.size,
            reportCount: reports.length,
            pollCount: polls.size,
            customEmojiCount: customEmojis.size,
            threadCount: threads.size,
            scheduledEventCount: scheduledEvents.length,
            autoResponseCount: autoResponses.size
        });
    });

    socket.on('updateServerConfig', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) return;

        if (data.autoMod) {
            Object.assign(AUTO_MOD_SETTINGS, data.autoMod);
        }
        if (data.xpConfig) {
            Object.assign(XP_CONFIG, data.xpConfig);
        }
        if (data.filteredWords) {
            FILTERED_WORDS.length = 0;
            data.filteredWords.forEach(function(w) { FILTERED_WORDS.push(w); });
        }

        socket.emit('serverConfigUpdated', { success: true });
        addAuditEntry('update_config', username, 'Server configuration updated');
    });

    // ========================================================================
    // v5: Admin Mass Operations
    // ========================================================================

    socket.on('adminPurgeMessages', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) return;

        var room = data.room;
        var count = Math.min(data.count || 10, 100);
        var targetUser = data.targetUser;

        var history = messageHistory.get(room);
        if (!history) return;

        var removed = 0;
        if (targetUser) {
            // Remove messages from specific user
            var newHistory = [];
            for (var i = history.length - 1; i >= 0; i--) {
                if (history[i].username === targetUser && removed < count) {
                    removed++;
                } else {
                    newHistory.unshift(history[i]);
                }
            }
            messageHistory.set(room, newHistory);
        } else {
            // Remove last N messages
            removed = Math.min(count, history.length);
            history.splice(-removed);
        }

        saveMessages();

        io.to(room).emit('messagesPurged', {
            room: room,
            count: removed,
            purgedBy: username,
            targetUser: targetUser || null
        });

        io.to(room).emit('systemMessage', {
            message: username + ' purged ' + removed + ' messages' + (targetUser ? ' from ' + targetUser : ''),
            timestamp: Date.now()
        });

        addAuditEntry('purge_messages', username, 'Room: ' + room + ' Count: ' + removed + (targetUser ? ' User: ' + targetUser : ''));
    });

    socket.on('adminBroadcast', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username)) return;

        var message = (data.message || '').trim();
        if (!message) return;

        io.emit('adminBroadcast', {
            message: message,
            from: username,
            timestamp: Date.now(),
            priority: data.priority || 'normal' // normal, important, critical
        });

        addAuditEntry('admin_broadcast', username, 'Broadcast: ' + message.substring(0, 100));
    });

    socket.on('adminMuteUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username) && !isModerator(username)) return;

        var target = data.username;
        var duration = data.duration || 300000; // 5 minutes default

        var acc = accounts.get(target);
        if (!acc) return;

        acc.mutedUntil = Date.now() + duration;
        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

        var targetData = onlineUsers.get(target);
        if (targetData) {
            io.to(targetData.socketId).emit('muted', {
                until: acc.mutedUntil,
                reason: data.reason || 'Muted by moderator',
                by: username
            });
        }

        socket.emit('userMuted', {
            username: target,
            until: acc.mutedUntil
        });

        addAuditEntry('mute_user', username, 'Muted: ' + target + ' for ' + Math.round(duration / 60000) + ' minutes');
    });

    socket.on('adminUnmuteUser', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;
        if (!isAdmin(username) && !isModerator(username)) return;

        var acc = accounts.get(data.username);
        if (!acc) return;

        delete acc.mutedUntil;
        saveJSON(dataFiles.accounts, Object.fromEntries(accounts));

        var targetData = onlineUsers.get(data.username);
        if (targetData) {
            io.to(targetData.socketId).emit('unmuted', { by: username });
        }

        socket.emit('userUnmuted', { username: data.username });
        addAuditEntry('unmute_user', username, 'Unmuted: ' + data.username);
    });

    // ========================================================================
    // v5: User Sessions & Activity
    // ========================================================================

    socket.on('getSessionHistory', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var sessions = userSessions.get(username) || [];
        socket.emit('sessionHistory', {
            sessions: sessions.slice(-20),
            totalSessions: sessions.length
        });
    });

    socket.on('getUserActivity', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var target = data.username || username;
        if (target !== username && !isAdmin(username)) return;

        var xpDetail = userXPDetails.get(target) || {};
        var acc = accounts.get(target);
        var sessions = userSessions.get(target) || [];
        var lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

        socket.emit('userActivityData', {
            username: target,
            totalMessages: xpDetail.totalMessages || 0,
            totalReactions: xpDetail.totalReactions || 0,
            totalDMs: xpDetail.totalDMs || 0,
            level: xpDetail.level || 1,
            xp: xpDetail.totalXP || 0,
            streak: xpDetail.streak || 0,
            lastActive: xpDetail.lastActive,
            memberSince: acc ? acc.createdAt : null,
            sessionCount: sessions.length,
            lastSession: lastSession,
            xpHistory: (xpDetail.xpHistory || []).slice(-20),
            friendCount: acc && acc.friends ? acc.friends.length : 0,
            roomsJoined: xpDetail.roomsJoined || 0,
            achievementCount: (achievements.get(target) || []).length,
            warningCount: (serverWarnings.get(target) || []).length
        });
    });

    // ========================================================================
    // v5: Message Formatting & Rich Content
    // ========================================================================

    socket.on('getMessageContext', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var room = data.room;
        var messageId = data.messageId;
        var contextSize = Math.min(data.contextSize || 10, 50);

        var history = messageHistory.get(room) || [];
        var msgIndex = history.findIndex(function(m) { return m.id === messageId; });
        if (msgIndex === -1) {
            socket.emit('error', { message: 'Message not found' });
            return;
        }

        var start = Math.max(0, msgIndex - contextSize);
        var end = Math.min(history.length, msgIndex + contextSize + 1);

        socket.emit('messageContext', {
            room: room,
            messageId: messageId,
            messages: history.slice(start, end),
            targetIndex: msgIndex - start
        });
    });

    socket.on('getLinkPreview', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var url = data.url;
        if (!url) return;

        var preview = generateLinkPreview(url);
        socket.emit('linkPreviewData', {
            url: url,
            preview: preview
        });
    });

    // ========================================================================
    // v5: Achievements Query
    // ========================================================================

    socket.on('getAchievements', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var target = data.username || username;
        var earned = achievements.get(target) || [];

        var allAchievements = Object.entries(ACHIEVEMENT_DEFS).map(function(entry) {
            var id = entry[0];
            var def = entry[1];
            var userAch = earned.find(function(a) { return a.id === id; });
            return {
                id: id,
                name: def.name,
                description: def.description,
                icon: def.icon,
                xp: def.xp,
                earned: !!userAch,
                earnedAt: userAch ? userAch.earnedAt : null
            };
        });

        socket.emit('achievementsData', {
            username: target,
            achievements: allAchievements,
            totalEarned: earned.length,
            totalAvailable: Object.keys(ACHIEVEMENT_DEFS).length,
            completionPercentage: Math.round((earned.length / Object.keys(ACHIEVEMENT_DEFS).length) * 100)
        });
    });

    // ========================================================================
    // v5: XP & Level Queries
    // ========================================================================

    socket.on('getXPDetails', function(data) {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        var target = data.username || username;
        var xpDetail = userXPDetails.get(target) || {
            totalXP: 0, level: 1, dailyXP: 0, streak: 0, lastActive: null
        };

        socket.emit('xpDetailsData', {
            username: target,
            totalXP: xpDetail.totalXP || 0,
            level: xpDetail.level || 1,
            dailyXP: xpDetail.dailyXP || 0,
            dailyCap: XP_CONFIG.maxDailyXP,
            streak: xpDetail.streak || 0,
            streakMultiplier: 1 + ((xpDetail.streak || 0) * XP_CONFIG.streakMultiplier),
            nextLevelXP: getXPForLevel((xpDetail.level || 1) + 1),
            currentLevelXP: getXPForLevel(xpDetail.level || 1),
            progress: xpDetail.totalXP - getXPForLevel(xpDetail.level || 1),
            xpHistory: (xpDetail.xpHistory || []).slice(-20),
            badges: getBadgesForUser(target)
        });
    });

    // ========================================================================
    // Disconnect
    // ========================================================================
    socket.on('disconnect', function() {
        var username = socketToUser.get(socket.id);
        if (!username) return;

        socketToUser.delete(socket.id);
        var userData = onlineUsers.get(username);
        onlineUsers.delete(username);

        // Clean up typing
        typingUsers.forEach(function(users) {
            users.delete(username);
        });

        logActivity('disconnect', username, 'User disconnected');

        // Broadcast leave
        io.emit('systemMessage', {
            message: username + ' has left the chat',
            timestamp: Date.now()
        });

        // Update user lists in all rooms
        if (userData && userData.rooms) {
            userData.rooms.forEach(function(room) {
                broadcastUserList(room);
            });
        }

        broadcastRoomLists();
    });
});

// ============================================================================
// Periodic Tasks (v5 Enhanced)
// ============================================================================

// Save all data every 5 minutes
setInterval(function() {
    saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
    saveMessages();
    saveRooms();
    saveJSON(dataFiles.serverStats, serverStats);
    saveJSON(dataFiles.reports, reports);
    saveJSON(dataFiles.activityLog, activityLog);
    saveJSON(dataFiles.moderationLog, moderationLog);

    // v5 data saves
    saveThreads();
    saveAchievements();
    saveCustomEmojis();
    saveBlockLists();
    saveRoomInvites();
    saveReadReceipts();
    saveSlowMode();
    saveScheduledEvents();
    saveAutoResponses();
    saveNotificationPrefs();
    saveRoomPermissions();
    saveUserXP();
    saveChatAnalytics();
    saveUserProfiles();
    saveAuditLog();
    saveReactionStats();
    saveUserSessions();
    saveTopicHistory();
    saveServerWarnings();
    saveSavedMessages();
    saveChannelCategories();
    saveUserPresence();

    console.log('[Periodic] All data saved. Online:', onlineUsers.size,
        'Accounts:', accounts.size, 'Rooms:', customRooms.size,
        'Threads:', threads.size, 'Events:', scheduledEvents.length);
}, 5 * 60 * 1000);

// Deliver scheduled messages every 10 seconds
setInterval(function() {
    var now = Date.now();
    var delivered = 0;

    scheduledMessages.forEach(function(msg) {
        if (msg.delivered || msg.cancelled) return;
        if (now >= msg.scheduledAt) {
            msg.delivered = true;
            delivered++;

            var messageObj = {
                id: generateToken(12),
                username: msg.username,
                message: msg.message,
                room: msg.room,
                timestamp: now,
                type: 'text',
                scheduled: true,
                nameColor: accounts.get(msg.username) ? accounts.get(msg.username).nameColor : '',
                avatar: avatars.get(msg.username) || null,
                role: getUserRole(msg.username)
            };

            if (!messageHistory.has(msg.room)) messageHistory.set(msg.room, []);
            messageHistory.get(msg.room).push(messageObj);

            io.to(msg.room).emit('chatMessage', messageObj);
            io.to(msg.room).emit('message', messageObj);

            var userData = onlineUsers.get(msg.username);
            if (userData) {
                io.to(userData.socketId).emit('scheduledMessageDelivered', {
                    id: msg.id,
                    messageId: messageObj.id
                });
            }
        }
    });

    if (delivered > 0) {
        // Clean up delivered messages older than 1 hour
        scheduledMessages = scheduledMessages.filter(function(m) {
            return !m.delivered || (now - m.scheduledAt < 60 * 60 * 1000);
        });
        saveScheduledMessages();
    }
}, 10 * 1000);

// Event reminders every minute
setInterval(function() {
    var now = Date.now();
    scheduledEvents.forEach(function(event) {
        if (event.cancelled) return;

        (event.reminders || []).forEach(function(reminderMinutes) {
            var reminderTime = event.startTime - (reminderMinutes * 60 * 1000);
            // Check if we're within the reminder window (±30 seconds)
            if (Math.abs(now - reminderTime) < 30000) {
                var allUsers = event.attendees.concat(event.interested);
                allUsers.forEach(function(username) {
                    var userData = onlineUsers.get(username);
                    if (userData) {
                        io.to(userData.socketId).emit('eventReminder', {
                            event: event,
                            minutesUntil: reminderMinutes
                        });
                        io.to(userData.socketId).emit('notification', {
                            type: 'event_reminder',
                            message: event.title + ' starts in ' + reminderMinutes + ' minutes',
                            eventId: event.id
                        });
                    }
                });
            }
        });
    });
}, 60 * 1000);

// Clean expired bans every hour
setInterval(function() {
    var now = Date.now();
    var cleaned = 0;
    bannedUsers.forEach(function(ban, username) {
        if (ban.expiresAt && now > ban.expiresAt) {
            bannedUsers.delete(username);
            cleaned++;
        }
    });
    if (cleaned > 0) {
        saveJSON(dataFiles.bannedUsers, Object.fromEntries(bannedUsers));
        console.log('[Periodic] Cleaned', cleaned, 'expired bans');
    }

    // Clean expired room invites
    var inviteCleaned = 0;
    roomInvites.forEach(function(invite, code) {
        if (invite.expiresAt && now > invite.expiresAt) {
            roomInvites.delete(code);
            inviteCleaned++;
        }
    });
    if (inviteCleaned > 0) {
        saveRoomInvites();
        console.log('[Periodic] Cleaned', inviteCleaned, 'expired invites');
    }
}, 60 * 60 * 1000);

// Clean expired data every 30 minutes
setInterval(function() {
    var now = Date.now();
    passwordResets.forEach(function(reset, username) {
        if (now > reset.expires) {
            passwordResets.delete(username);
        }
    });
    emailVerifications.forEach(function(verification, username) {
        if (now > verification.expires) {
            emailVerifications.delete(username);
        }
    });
    polls.forEach(function(poll, id) {
        if (poll.active && poll.expiresAt && now > poll.expiresAt) {
            poll.active = false;
        }
    });

    // Clean expired warnings
    serverWarnings.forEach(function(warnings, username) {
        var active = warnings.filter(function(w) {
            return !w.expires || w.expires > now;
        });
        if (active.length < warnings.length) {
            serverWarnings.set(username, active);
        }
    });

    // Clean old cancelled scheduled messages
    scheduledMessages = scheduledMessages.filter(function(m) {
        if (m.cancelled && now - m.createdAt > 24 * 60 * 60 * 1000) return false;
        if (m.delivered && now - m.scheduledAt > 24 * 60 * 60 * 1000) return false;
        return true;
    });
}, 30 * 60 * 1000);

// Daily cleanup tasks
setInterval(function() {
    // Clean old daily stats
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    var cutoffStr = cutoff.toISOString().split('T')[0];
    Object.keys(serverStats.dailyStats).forEach(function(date) {
        if (date < cutoffStr) {
            delete serverStats.dailyStats[date];
        }
    });

    // Reset daily analytics
    resetDailyAnalytics();

    // Trim audit log
    if (auditLog.length > 10000) {
        auditLog.splice(0, auditLog.length - 10000);
    }

    // Trim activity log
    if (activityLog.length > 5000) {
        activityLog.splice(0, activityLog.length - 5000);
    }

    // Check veteran achievements
    var thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    accounts.forEach(function(acc, username) {
        if (acc.createdAt && acc.createdAt < thirtyDaysAgo) {
            checkAndAwardAchievement(username, 'veteran');
        }
    });

    console.log('[Daily] Cleanup complete. Audit log:', auditLog.length, 'entries');
}, 24 * 60 * 60 * 1000);

// Reset warnings periodically
setInterval(function() {
    var now = Date.now();
    userWarnings.forEach(function(w, username) {
        if (now - w.lastWarning > 60 * 60 * 1000) {
            userWarnings.delete(username);
        }
    });
}, 15 * 60 * 1000);

// XP streak check every 6 hours
setInterval(function() {
    var now = new Date();
    userXPDetails.forEach(function(xpDetail, username) {
        if (xpDetail.lastActive) {
            var lastActive = new Date(xpDetail.lastActive);
            var daysDiff = Math.floor((now - lastActive) / (24 * 60 * 60 * 1000));
            if (daysDiff > 1 && xpDetail.streak > 0) {
                xpDetail.streak = 0;
                console.log('[XP] Reset streak for inactive user:', username);
            }
        }
    });
}, 6 * 60 * 60 * 1000);

// ============================================================================
// Module-Scope Utility Functions (v5)
// ============================================================================

// Get badges for user (module scope for REST API access)
function getBadgesForUserGlobal(username) {
    var badges = [];
    if (isAdmin(username)) badges.push({ id: 'admin', name: 'Admin', icon: '👑', color: '#ff4444' });
    if (isModerator(username)) badges.push({ id: 'mod', name: 'Moderator', icon: '🛡️', color: '#4488ff' });

    var xpDetail = userXPDetails.get(username);
    if (xpDetail) {
        if (xpDetail.level >= 50) badges.push({ id: 'legend', name: 'Legend', icon: '🏆', color: '#ffd700' });
        else if (xpDetail.level >= 25) badges.push({ id: 'veteran', name: 'Veteran', icon: '🏅', color: '#c0c0c0' });
        else if (xpDetail.level >= 10) badges.push({ id: 'regular', name: 'Regular', icon: '⭐', color: '#cd7f32' });

        if (xpDetail.streak >= 30) badges.push({ id: 'streak30', name: '30-Day Streak', icon: '🔥', color: '#ff6600' });
        else if (xpDetail.streak >= 7) badges.push({ id: 'streak7', name: '7-Day Streak', icon: '✨', color: '#ffaa00' });
    }

    var userAchievements = achievements.get(username) || [];
    if (userAchievements.length >= 20) badges.push({ id: 'achiever', name: 'Achiever', icon: '🎖️', color: '#9b59b6' });
    if (userAchievements.length >= 10) badges.push({ id: 'collector', name: 'Collector', icon: '📀', color: '#3498db' });

    var acc = accounts.get(username);
    if (acc && acc.createdAt) {
        var daysSinceJoin = (Date.now() - acc.createdAt) / (24 * 60 * 60 * 1000);
        if (daysSinceJoin >= 365) badges.push({ id: 'yearone', name: '1 Year', icon: '🎂', color: '#e91e63' });
        if (daysSinceJoin >= 180) badges.push({ id: 'halfyear', name: '6 Months', icon: '📅', color: '#9c27b0' });
    }

    return badges;
}

// Message formatter - parse markdown-like syntax
function formatMessageText(text) {
    if (!text) return '';
    var formatted = text;

    // Bold: **text** or __text__
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic: *text* or _text_
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/_(.*?)_/g, '<em>$1</em>');

    // Strikethrough: ~~text~~
    formatted = formatted.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Code blocks: ```text```
    formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline code: `text`
    formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');

    // Spoiler: ||text||
    formatted = formatted.replace(/\|\|(.*?)\|\|/g, '<span class="spoiler">$1</span>');

    return formatted;
}

// Extract mentions from message
function extractMentions(message) {
    var mentions = [];
    var regex = /@([a-zA-Z0-9_]+)/g;
    var match;
    while ((match = regex.exec(message)) !== null) {
        mentions.push(match[1]);
    }
    return mentions;
}

// Rate limiter
var rateLimits = new Map();

function checkRateLimit(identifier, action, maxRequests, windowMs) {
    var key = identifier + ':' + action;
    var now = Date.now();

    if (!rateLimits.has(key)) {
        rateLimits.set(key, { count: 1, windowStart: now });
        return { allowed: true, remaining: maxRequests - 1 };
    }

    var limit = rateLimits.get(key);
    if (now - limit.windowStart > windowMs) {
        limit.count = 1;
        limit.windowStart = now;
        return { allowed: true, remaining: maxRequests - 1 };
    }

    if (limit.count >= maxRequests) {
        var retryAfter = Math.ceil((limit.windowStart + windowMs - now) / 1000);
        return { allowed: false, remaining: 0, retryAfter: retryAfter };
    }

    limit.count++;
    return { allowed: true, remaining: maxRequests - limit.count };
}

// Clean old rate limit entries every 5 minutes
setInterval(function() {
    var now = Date.now();
    rateLimits.forEach(function(limit, key) {
        if (now - limit.windowStart > 300000) {
            rateLimits.delete(key);
        }
    });
}, 300000);

// Message edit history tracking
var messageEditHistory = new Map();

function trackMessageEdit(messageId, oldContent, newContent, editor) {
    if (!messageEditHistory.has(messageId)) {
        messageEditHistory.set(messageId, []);
    }
    messageEditHistory.get(messageId).push({
        oldContent: oldContent,
        newContent: newContent,
        editor: editor,
        timestamp: Date.now()
    });
    // Keep only last 10 edits per message
    var history = messageEditHistory.get(messageId);
    if (history.length > 10) {
        messageEditHistory.set(messageId, history.slice(-10));
    }
}

// User relationship analysis
function getMutualFriends(user1, user2) {
    var friends1 = [];
    var friends2 = [];

    accounts.forEach(function(acc, username) {
        if (acc.friends && acc.friends.indexOf(user1) >= 0) friends1.push(username);
        if (acc.friends && acc.friends.indexOf(user2) >= 0) friends2.push(username);
    });

    return friends1.filter(function(f) { return friends2.indexOf(f) >= 0; });
}

function getFriendSuggestions(username, maxSuggestions) {
    maxSuggestions = maxSuggestions || 10;
    var acc = accounts.get(username);
    if (!acc || !acc.friends) return [];

    var friends = acc.friends;
    var suggestions = new Map();

    friends.forEach(function(friend) {
        var friendAcc = accounts.get(friend);
        if (!friendAcc || !friendAcc.friends) return;

        friendAcc.friends.forEach(function(fof) {
            if (fof === username) return;
            if (friends.indexOf(fof) >= 0) return;
            if (blockLists.has(username) && blockLists.get(username).has(fof)) return;

            if (!suggestions.has(fof)) {
                suggestions.set(fof, { username: fof, mutualCount: 0, mutualFriends: [] });
            }
            var s = suggestions.get(fof);
            s.mutualCount++;
            if (s.mutualFriends.indexOf(friend) < 0) s.mutualFriends.push(friend);
        });
    });

    var result = Array.from(suggestions.values());
    result.sort(function(a, b) { return b.mutualCount - a.mutualCount; });
    return result.slice(0, maxSuggestions);
}

// Room analytics
function getRoomAnalytics(roomId) {
    var messages = messageHistory.get(roomId) || [];
    var now = Date.now();
    var last24h = now - 24 * 60 * 60 * 1000;
    var last7d = now - 7 * 24 * 60 * 60 * 1000;
    var last30d = now - 30 * 24 * 60 * 60 * 1000;

    var analytics = {
        totalMessages: messages.length,
        last24h: 0,
        last7d: 0,
        last30d: 0,
        uniqueUsers24h: new Set(),
        uniqueUsers7d: new Set(),
        topUsers: {},
        averageLength: 0,
        fileCount: 0,
        reactionCount: 0,
        peakHour: -1,
        hourlyDistribution: new Array(24).fill(0)
    };

    var totalLength = 0;

    messages.forEach(function(msg) {
        if (msg.timestamp > last24h) {
            analytics.last24h++;
            analytics.uniqueUsers24h.add(msg.username);
        }
        if (msg.timestamp > last7d) {
            analytics.last7d++;
            analytics.uniqueUsers7d.add(msg.username);
        }
        if (msg.timestamp > last30d) analytics.last30d++;

        if (!analytics.topUsers[msg.username]) analytics.topUsers[msg.username] = 0;
        analytics.topUsers[msg.username]++;

        if (msg.message) totalLength += msg.message.length;
        if (msg.type === 'file') analytics.fileCount++;
        if (msg.reactions) {
            Object.keys(msg.reactions).forEach(function(r) {
                analytics.reactionCount += msg.reactions[r].length;
            });
        }

        var hour = new Date(msg.timestamp).getHours();
        analytics.hourlyDistribution[hour]++;
    });

    analytics.averageLength = messages.length > 0 ? Math.round(totalLength / messages.length) : 0;
    analytics.uniqueUsers24h = analytics.uniqueUsers24h.size;
    analytics.uniqueUsers7d = analytics.uniqueUsers7d.size;

    // Find peak hour
    var maxMessages = 0;
    analytics.hourlyDistribution.forEach(function(count, hour) {
        if (count > maxMessages) {
            maxMessages = count;
            analytics.peakHour = hour;
        }
    });

    // Top users sorted
    var topEntries = Object.entries(analytics.topUsers);
    topEntries.sort(function(a, b) { return b[1] - a[1]; });
    analytics.topUsers = topEntries.slice(0, 10).map(function(e) {
        return { username: e[0], count: e[1] };
    });

    return analytics;
}

// User activity score
function getUserActivityScore(username) {
    var xpDetail = userXPDetails.get(username) || {};
    var acc = accounts.get(username);
    if (!acc) return 0;

    var score = 0;
    score += (xpDetail.totalXP || 0) * 0.1;
    score += (xpDetail.streak || 0) * 50;
    score += (xpDetail.level || 1) * 100;
    score += ((achievements.get(username) || []).length) * 200;

    if (xpDetail.lastActive) {
        var hoursSinceActive = (Date.now() - xpDetail.lastActive) / (60 * 60 * 1000);
        if (hoursSinceActive < 1) score += 500;
        else if (hoursSinceActive < 24) score += 200;
        else if (hoursSinceActive < 168) score += 50;
    }

    return Math.round(score);
}

// Trending topics detection
function getTrendingTopics(timeWindowMs) {
    timeWindowMs = timeWindowMs || 3600000; // Default: 1 hour
    var now = Date.now();
    var wordCounts = {};
    var stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been',
        'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
        'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for', 'on', 'with',
        'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above',
        'below', 'between', 'out', 'off', 'up', 'down', 'and', 'but', 'or', 'nor', 'not',
        'so', 'yet', 'both', 'either', 'neither', 'each', 'every', 'all', 'any', 'few',
        'more', 'most', 'other', 'some', 'such', 'no', 'only', 'own', 'same', 'than',
        'too', 'very', 'just', 'because', 'if', 'when', 'then', 'that', 'this', 'it',
        'its', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'they', 'them',
        'what', 'which', 'who', 'whom', 'how', 'where', 'why', 'here', 'there']);

    messageHistory.forEach(function(messages) {
        messages.forEach(function(msg) {
            if (!msg.message || msg.timestamp < now - timeWindowMs) return;

            var words = msg.message.toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .split(/\s+/)
                .filter(function(w) { return w.length > 2 && !stopWords.has(w); });

            words.forEach(function(word) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            });
        });
    });

    var entries = Object.entries(wordCounts);
    entries.sort(function(a, b) { return b[1] - a[1]; });
    return entries.slice(0, 20).map(function(e) {
        return { topic: e[0], count: e[1] };
    });
}

// Server activity feed
var activityFeed = [];
var MAX_ACTIVITY_FEED = 500;

function addActivityFeedEntry(type, data) {
    activityFeed.push({
        id: generateToken(8),
        type: type,
        data: data,
        timestamp: Date.now()
    });
    if (activityFeed.length > MAX_ACTIVITY_FEED) {
        activityFeed = activityFeed.slice(-MAX_ACTIVITY_FEED);
    }
}

// Webhook system
var webhooks = new Map();

function registerWebhook(id, config) {
    webhooks.set(id, {
        id: id,
        url: config.url,
        events: config.events || ['message'],
        room: config.room || null,
        creator: config.creator,
        secret: config.secret || generateToken(16),
        active: true,
        createdAt: Date.now(),
        lastTriggered: null,
        triggerCount: 0
    });
}

function triggerWebhooks(eventType, payload) {
    webhooks.forEach(function(webhook) {
        if (!webhook.active) return;
        if (webhook.events.indexOf(eventType) < 0) return;
        if (webhook.room && payload.room && webhook.room !== payload.room) return;

        webhook.lastTriggered = Date.now();
        webhook.triggerCount++;

        // Queue webhook delivery (non-blocking)
        setImmediate(function() {
            try {
                var http = require(webhook.url.startsWith('https') ? 'https' : 'http');
                var urlObj = new URL(webhook.url);
                var postData = JSON.stringify({
                    event: eventType,
                    payload: payload,
                    timestamp: Date.now(),
                    webhookId: webhook.id
                });

                var options = {
                    hostname: urlObj.hostname,
                    port: urlObj.port,
                    path: urlObj.pathname,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData),
                        'X-Webhook-Secret': webhook.secret,
                        'X-Webhook-Event': eventType
                    },
                    timeout: 5000
                };

                var req = http.request(options, function(res) {
                    // Just consume response
                    res.on('data', function() {});
                });
                req.on('error', function(err) {
                    console.log('[Webhook] Error delivering to', webhook.url, ':', err.message);
                });
                req.write(postData);
                req.end();
            } catch (e) {
                console.log('[Webhook] Failed:', e.message);
            }
        });
    });
}

// Room templates
var roomTemplates = {
    gaming: {
        name: 'Gaming Room',
        icon: '🎮',
        color: '#7c3aed',
        slowMode: 0,
        permissions: { sendMessages: true, uploadFiles: true, createPolls: true },
        defaultTopic: 'Gaming Chat - share your plays!'
    },
    study: {
        name: 'Study Group',
        icon: '📚',
        color: '#059669',
        slowMode: 5,
        permissions: { sendMessages: true, uploadFiles: true, createPolls: false },
        defaultTopic: 'Study group - stay focused!'
    },
    music: {
        name: 'Music Room',
        icon: '🎵',
        color: '#d946ef',
        slowMode: 0,
        permissions: { sendMessages: true, uploadFiles: true, createPolls: true },
        defaultTopic: 'Share and discover music'
    },
    art: {
        name: 'Art Studio',
        icon: '🎨',
        color: '#f59e0b',
        slowMode: 0,
        permissions: { sendMessages: true, uploadFiles: true, createPolls: true },
        defaultTopic: 'Share your artwork and creations'
    },
    tech: {
        name: 'Tech Talk',
        icon: '💻',
        color: '#0ea5e9',
        slowMode: 0,
        permissions: { sendMessages: true, uploadFiles: true, createPolls: true },
        defaultTopic: 'Tech discussions and help'
    },
    chill: {
        name: 'Chill Zone',
        icon: '☕',
        color: '#78716c',
        slowMode: 0,
        permissions: { sendMessages: true, uploadFiles: true, createPolls: true },
        defaultTopic: 'Relax and chat'
    },
    announcements: {
        name: 'Announcements',
        icon: '📢',
        color: '#ef4444',
        slowMode: 60,
        permissions: { sendMessages: false, uploadFiles: false, createPolls: false },
        defaultTopic: 'Important announcements only'
    },
    debate: {
        name: 'Debate Hall',
        icon: '🏛️',
        color: '#6366f1',
        slowMode: 10,
        permissions: { sendMessages: true, uploadFiles: false, createPolls: true },
        defaultTopic: 'Respectful debates and discussions'
    }
};

// User statistics aggregation
function getUserStatistics(username) {
    var stats = {
        totalMessages: 0,
        totalReactions: 0,
        totalRoomsJoined: 0,
        totalPollsCreated: 0,
        totalPollsVoted: 0,
        totalFilesShared: 0,
        totalThreadsCreated: 0,
        totalThreadReplies: 0,
        favoriteRoom: null,
        favoriteEmoji: null,
        averageMessageLength: 0,
        longestStreak: 0,
        currentStreak: 0,
        totalXP: 0,
        level: 1,
        achievementCount: 0,
        joinDate: null,
        lastActive: null,
        wordCount: 0,
        uniqueWordsUsed: new Set(),
        mostActiveHour: -1,
        hourlyActivity: new Array(24).fill(0),
        dailyMessageCounts: {},
        roomMessageCounts: {}
    };

    var acc = accounts.get(username);
    if (acc) {
        stats.joinDate = acc.createdAt;
    }

    // Count messages across all rooms
    var totalLength = 0;
    messageHistory.forEach(function(messages, roomId) {
        messages.forEach(function(msg) {
            if (msg.username !== username) return;
            stats.totalMessages++;
            if (msg.message) {
                totalLength += msg.message.length;
                var words = msg.message.split(/\s+/);
                stats.wordCount += words.length;
                words.forEach(function(w) { stats.uniqueWordsUsed.add(w.toLowerCase()); });
            }
            if (msg.type === 'file') stats.totalFilesShared++;
            if (msg.reactions) {
                Object.values(msg.reactions).forEach(function(users) {
                    stats.totalReactions += users.length;
                });
            }

            var hour = new Date(msg.timestamp).getHours();
            stats.hourlyActivity[hour]++;

            var day = new Date(msg.timestamp).toISOString().split('T')[0];
            stats.dailyMessageCounts[day] = (stats.dailyMessageCounts[day] || 0) + 1;

            if (!stats.roomMessageCounts[roomId]) stats.roomMessageCounts[roomId] = 0;
            stats.roomMessageCounts[roomId]++;
        });
    });

    stats.averageMessageLength = stats.totalMessages > 0 ? Math.round(totalLength / stats.totalMessages) : 0;

    // Find favorite room
    var maxRoomMessages = 0;
    Object.entries(stats.roomMessageCounts).forEach(function(entry) {
        if (entry[1] > maxRoomMessages) {
            maxRoomMessages = entry[1];
            stats.favoriteRoom = entry[0];
        }
    });

    // Find most active hour
    var maxHourMsg = 0;
    stats.hourlyActivity.forEach(function(count, hour) {
        if (count > maxHourMsg) {
            maxHourMsg = count;
            stats.mostActiveHour = hour;
        }
    });

    // Count rooms joined
    customRooms.forEach(function(room) {
        if (room.members && room.members.has(username)) stats.totalRoomsJoined++;
    });

    // Polls
    polls.forEach(function(poll) {
        if (poll.creator === username) stats.totalPollsCreated++;
        (poll.options || []).forEach(function(opt) {
            if (opt.voters && opt.voters.indexOf(username) >= 0) stats.totalPollsVoted++;
        });
    });

    // Threads
    threads.forEach(function(thread) {
        if (thread.creator === username) stats.totalThreadsCreated++;
        (thread.replies || []).forEach(function(reply) {
            if (reply.username === username) stats.totalThreadReplies++;
        });
    });

    // XP details
    var xpDetail = userXPDetails.get(username);
    if (xpDetail) {
        stats.totalXP = xpDetail.totalXP || 0;
        stats.level = xpDetail.level || 1;
        stats.currentStreak = xpDetail.streak || 0;
        stats.longestStreak = xpDetail.longestStreak || stats.currentStreak;
        stats.lastActive = xpDetail.lastActive || null;
    }

    // Achievements
    stats.achievementCount = (achievements.get(username) || []).length;

    // Convert Set to number
    stats.uniqueWordsUsed = stats.uniqueWordsUsed.size;

    return stats;
}

// Notification aggregator
function aggregateNotifications(username, maxAge) {
    maxAge = maxAge || 24 * 60 * 60 * 1000; // Default 24h
    var cutoff = Date.now() - maxAge;
    var notifications = [];

    // Friend requests
    var acc = accounts.get(username);
    if (acc && acc.friendRequests) {
        acc.friendRequests.forEach(function(req) {
            notifications.push({
                type: 'friend_request',
                from: req.from || req,
                timestamp: req.timestamp || Date.now(),
                read: false
            });
        });
    }

    // Pending room invites
    roomInvites.forEach(function(invite) {
        if (invite.targetUser === username && !invite.used) {
            notifications.push({
                type: 'room_invite',
                from: invite.creator,
                room: invite.roomName,
                code: invite.code,
                timestamp: invite.createdAt,
                read: false
            });
        }
    });

    // Recent mentions
    messageHistory.forEach(function(messages, roomId) {
        messages.forEach(function(msg) {
            if (msg.timestamp < cutoff) return;
            if (msg.username === username) return;
            if (msg.message && msg.message.indexOf('@' + username) >= 0) {
                notifications.push({
                    type: 'mention',
                    from: msg.username,
                    room: roomId,
                    messageId: msg.id,
                    preview: msg.message.substring(0, 100),
                    timestamp: msg.timestamp,
                    read: false
                });
            }
        });
    });

    // Achievement unlocks (recent)
    var userAchievements = achievements.get(username) || [];
    userAchievements.forEach(function(a) {
        if (a.unlockedAt > cutoff) {
            notifications.push({
                type: 'achievement',
                achievement: a.name,
                icon: a.icon,
                timestamp: a.unlockedAt,
                read: false
            });
        }
    });

    // Warnings
    var warnings = serverWarnings.get(username) || [];
    warnings.forEach(function(w) {
        if (w.timestamp > cutoff && !w.acknowledged) {
            notifications.push({
                type: 'warning',
                reason: w.reason,
                from: w.issuedBy,
                timestamp: w.timestamp,
                read: false
            });
        }
    });

    notifications.sort(function(a, b) { return b.timestamp - a.timestamp; });
    return notifications;
}

// Chat export formatter
function exportChatHistory(roomId, format, options) {
    options = options || {};
    var messages = messageHistory.get(roomId) || [];
    var startDate = options.startDate || 0;
    var endDate = options.endDate || Date.now();

    var filtered = messages.filter(function(msg) {
        return msg.timestamp >= startDate && msg.timestamp <= endDate;
    });

    if (format === 'json') {
        return JSON.stringify({
            room: roomId,
            exportDate: new Date().toISOString(),
            messageCount: filtered.length,
            messages: filtered.map(function(m) {
                return {
                    id: m.id,
                    username: m.username,
                    message: m.message,
                    timestamp: m.timestamp,
                    type: m.type || 'text',
                    reactions: m.reactions || {}
                };
            })
        }, null, 2);
    }

    if (format === 'csv') {
        var lines = ['timestamp,username,message,type'];
        filtered.forEach(function(msg) {
            var escapedMsg = (msg.message || '').replace(/"/g, '""').replace(/\n/g, ' ');
            lines.push('"' + new Date(msg.timestamp).toISOString() + '","' +
                msg.username + '","' + escapedMsg + '","' + (msg.type || 'text') + '"');
        });
        return lines.join('\n');
    }

    if (format === 'txt' || format === 'text') {
        var output = '=== Chat Export: ' + roomId + ' ===\n';
        output += 'Exported: ' + new Date().toISOString() + '\n';
        output += 'Messages: ' + filtered.length + '\n';
        output += ''.padStart(50, '=') + '\n\n';

        var lastDate = '';
        filtered.forEach(function(msg) {
            var date = new Date(msg.timestamp).toLocaleDateString();
            if (date !== lastDate) {
                output += '\n--- ' + date + ' ---\n';
                lastDate = date;
            }
            var time = new Date(msg.timestamp).toLocaleTimeString();
            output += '[' + time + '] ' + msg.username + ': ' + (msg.message || '[file]') + '\n';
        });

        return output;
    }

    // HTML format
    var html = '<!DOCTYPE html><html><head><meta charset="utf-8">';
    html += '<title>Chat Export - ' + roomId + '</title>';
    html += '<style>body{font-family:system-ui;max-width:800px;margin:0 auto;padding:20px;background:#1a1a2e;color:#eee}';
    html += '.msg{padding:8px 12px;margin:4px 0;border-radius:8px;background:#16213e}';
    html += '.username{font-weight:bold;color:#e94560}.time{color:#666;font-size:12px}';
    html += '.date{text-align:center;color:#888;padding:10px;margin:10px 0;border-top:1px solid #333}';
    html += 'h1{color:#e94560}</style></head><body>';
    html += '<h1>Chat Export: ' + roomId + '</h1>';
    html += '<p>Exported: ' + new Date().toISOString() + ' | Messages: ' + filtered.length + '</p>';

    var prevDate = '';
    filtered.forEach(function(msg) {
        var d = new Date(msg.timestamp).toLocaleDateString();
        if (d !== prevDate) {
            html += '<div class="date">' + d + '</div>';
            prevDate = d;
        }
        var t = new Date(msg.timestamp).toLocaleTimeString();
        html += '<div class="msg"><span class="username">' + msg.username +
            '</span> <span class="time">' + t + '</span><br>' +
            (msg.message || '[file]') + '</div>';
    });

    html += '</body></html>';
    return html;
}

// Server configuration manager
var serverConfig = {
    maxMessageLength: 5000,
    maxUsernameLength: 24,
    maxRoomNameLength: 50,
    maxRoomDescLength: 500,
    maxFileSize: 50 * 1024 * 1024, // 50MB
    maxUploadSizeMB: 50,
    maxRooms: 500,
    maxRoomsPerUser: 20,
    maxFriendsPerUser: 200,
    maxPollOptions: 10,
    maxThreadDepth: 50,
    maxCustomEmojis: 100,
    maxAutoResponses: 20,
    maxScheduledMessages: 25,
    maxStickersPerUser: 50,
    registrationOpen: true,
    maintenanceMode: false,
    maintenanceMessage: 'Server is under maintenance.',
    welcomeMessage: 'Welcome to RedChat! 🎉',
    rulesText: 'Be respectful. No spam. No NSFW content.',
    minAccountAge: 0, // milliseconds
    requireEmail: false,
    allowGuestAccess: false,
    defaultTheme: 'dark',
    defaultRoom: 'general',
    slowModeDefault: 0,
    maxLoginAttempts: 5,
    loginLockoutMinutes: 15,
    enableAchievements: true,
    enableXP: true,
    enableThreads: true,
    enablePolls: true,
    enableFileUpload: true,
    enableCustomEmojis: true,
    enableAutoResponses: true,
    enableScheduledMessages: true,
    enableReadReceipts: true,
    enableTypingIndicator: true,
    xpMultiplier: 1.0,
    version: '5.0'
};

// Input sanitization helpers
function sanitizeInput(str, maxLength) {
    if (!str || typeof str !== 'string') return '';
    return str.trim().substring(0, maxLength || 1000);
}

function sanitizeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

function isValidUsername(username) {
    if (!username || typeof username !== 'string') return false;
    if (username.length < 3 || username.length > serverConfig.maxUsernameLength) return false;
    return /^[a-zA-Z0-9_]+$/.test(username);
}

function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Message content analysis
function analyzeMessageContent(message) {
    var analysis = {
        length: message.length,
        wordCount: message.split(/\s+/).filter(function(w) { return w.length > 0; }).length,
        hasLinks: /https?:\/\//.test(message),
        hasMentions: /@[a-zA-Z0-9_]+/.test(message),
        hasEmoji: /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(message),
        hasCode: /```[\s\S]*```/.test(message) || /`[^`]+`/.test(message),
        hasSpoiler: /\|\|[\s\S]*?\|\|/.test(message),
        isQuestion: /\?/.test(message),
        isExclamation: /!/.test(message),
        mentionedUsers: extractMentions(message),
        linkCount: (message.match(/https?:\/\//g) || []).length,
        language: detectLanguage(message)
    };
    return analysis;
}

// Simple language detection
function detectLanguage(text) {
    if (!text || text.length < 10) return 'unknown';

    var patterns = {
        english: /\b(the|is|are|was|were|have|has|had|been|will|would|could|should|can|this|that|with|from|they|their|what|about|when|there|which|make|like|time|just|know|take|come|good|over|such|after)\b/gi,
        spanish: /\b(el|la|los|las|un|una|es|son|tiene|para|por|con|que|del|pero|más|este|esta|como|sin|sobre|todo|también|hacer|poder|hay|donde|cuando)\b/gi,
        french: /\b(le|la|les|un|une|des|est|sont|avec|pour|pas|dans|que|qui|sur|plus|mais|tout|être|faire|avoir|aussi|comme|très|cette|quel|où)\b/gi,
        german: /\b(der|die|das|ein|eine|ist|sind|hat|mit|für|auf|nicht|auch|sich|von|werden|haben|kann|nach|über|aber|wenn|noch|wie|oder)\b/gi,
        italian: /\b(il|la|le|un|una|è|sono|con|per|non|che|del|della|questo|questa|anche|come|più|fare|avere|essere|tutto|molto|dove)\b/gi,
        portuguese: /\b(o|a|os|as|um|uma|é|são|com|para|não|que|do|da|este|esta|também|como|mais|fazer|ter|ser|todo|muito|onde)\b/gi
    };

    var maxScore = 0;
    var detectedLang = 'unknown';

    Object.entries(patterns).forEach(function(entry) {
        var matches = text.match(entry[1]);
        var score = matches ? matches.length : 0;
        if (score > maxScore) {
            maxScore = score;
            detectedLang = entry[0];
        }
    });

    return maxScore >= 2 ? detectedLang : 'unknown';
}

// Profanity filter (basic - customizable word list)
var profanityList = new Set();
var profanityEnabled = false;

function checkProfanity(message) {
    if (!profanityEnabled || profanityList.size === 0) return { clean: true };

    var words = message.toLowerCase().split(/\s+/);
    var found = [];
    words.forEach(function(word) {
        var cleaned = word.replace(/[^a-z]/g, '');
        if (profanityList.has(cleaned)) found.push(cleaned);
    });

    return {
        clean: found.length === 0,
        matches: found,
        censored: found.length > 0 ? message.replace(
            new RegExp('\\b(' + found.join('|') + ')\\b', 'gi'),
            function(m) { return '*'.repeat(m.length); }
        ) : message
    };
}

// Flood detection
var floodTrackers = new Map();

function checkFlood(username, type) {
    type = type || 'message';
    var key = username + ':' + type;
    var now = Date.now();

    if (!floodTrackers.has(key)) {
        floodTrackers.set(key, [now]);
        return { flooding: false };
    }

    var timestamps = floodTrackers.get(key);
    // Remove entries older than 10 seconds
    timestamps = timestamps.filter(function(t) { return now - t < 10000; });
    timestamps.push(now);
    floodTrackers.set(key, timestamps);

    var thresholds = {
        message: 10,      // 10 messages per 10 seconds
        reaction: 20,     // 20 reactions per 10 seconds
        typing: 5,        // 5 typing events per 10 seconds
        command: 8,        // 8 commands per 10 seconds
        file: 3            // 3 files per 10 seconds
    };

    var threshold = thresholds[type] || 10;
    return {
        flooding: timestamps.length > threshold,
        count: timestamps.length,
        limit: threshold,
        windowSeconds: 10
    };
}

// Clean flood trackers every 30 seconds
setInterval(function() {
    var now = Date.now();
    floodTrackers.forEach(function(timestamps, key) {
        var filtered = timestamps.filter(function(t) { return now - t < 10000; });
        if (filtered.length === 0) {
            floodTrackers.delete(key);
        } else {
            floodTrackers.set(key, filtered);
        }
    });
}, 30000);

// Message queue for reliable delivery
var messageQueues = new Map();

function queueMessage(username, message) {
    if (!messageQueues.has(username)) {
        messageQueues.set(username, []);
    }
    messageQueues.get(username).push({
        message: message,
        timestamp: Date.now(),
        delivered: false
    });

    // Limit queue size
    var queue = messageQueues.get(username);
    if (queue.length > 100) {
        messageQueues.set(username, queue.slice(-100));
    }
}

function deliverQueuedMessages(username, socket) {
    var queue = messageQueues.get(username);
    if (!queue || queue.length === 0) return;

    var undelivered = queue.filter(function(m) { return !m.delivered; });
    undelivered.forEach(function(m) {
        socket.emit('queuedMessage', m.message);
        m.delivered = true;
    });

    // Clean delivered messages
    messageQueues.set(username, queue.filter(function(m) { return !m.delivered; }));
}

// Connection quality monitor
function getConnectionQuality(socket) {
    if (!socket.handshake) return 'unknown';

    var transport = socket.conn ? socket.conn.transport.name : 'unknown';
    var quality = 'good';

    if (transport === 'polling') quality = 'fair';

    return {
        transport: transport,
        quality: quality,
        protocol: socket.handshake.headers['x-forwarded-proto'] || 'http',
        userAgent: socket.handshake.headers['user-agent'] || 'unknown',
        ip: socket.handshake.address,
        connectTime: socket.handshake.time
    };
}

// Media processing helpers
function getMediaType(filename) {
    if (!filename) return 'unknown';
    var ext = filename.split('.').pop().toLowerCase();

    var types = {
        image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff'],
        video: ['mp4', 'webm', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'm4v'],
        audio: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a', 'wma', 'opus'],
        document: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods'],
        code: ['js', 'ts', 'py', 'java', 'c', 'cpp', 'h', 'cs', 'go', 'rs', 'rb', 'php', 'html', 'css', 'json', 'xml', 'yaml', 'yml', 'md', 'sh', 'sql'],
        archive: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'],
        text: ['txt', 'log', 'csv', 'tsv', 'ini', 'cfg', 'conf']
    };

    var mediaType = 'unknown';
    Object.entries(types).forEach(function(entry) {
        if (entry[1].indexOf(ext) >= 0) mediaType = entry[0];
    });

    return mediaType;
}

function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0) + ' ' + sizes[i];
}

// Color utilities
function generateUserColor(username) {
    var hash = 0;
    for (var i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }

    var colors = [
        '#e94560', '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3',
        '#54a0ff', '#5f27cd', '#01a3a4', '#00d2d3', '#1dd1a1',
        '#10ac84', '#ee5a24', '#0abde3', '#f368e0', '#ff9f43',
        '#c44569', '#574b90', '#f78fb3', '#3dc1d3', '#e15f41'
    ];

    return colors[Math.abs(hash) % colors.length];
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getContrastColor(hex) {
    var rgb = hexToRgb(hex);
    if (!rgb) return '#ffffff';
    var luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Date/time formatting
function formatTimestamp(timestamp, format) {
    var d = new Date(timestamp);
    format = format || 'full';

    if (format === 'relative') {
        var diff = Date.now() - timestamp;
        if (diff < 60000) return 'just now';
        if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
        return d.toLocaleDateString();
    }

    if (format === 'time') {
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (format === 'date') {
        return d.toLocaleDateString();
    }

    return d.toLocaleString();
}

function getTimeZoneOffset(timezone) {
    try {
        var date = new Date();
        var utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        var tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        return (tzDate - utcDate) / (60 * 1000);
    } catch (e) {
        return 0;
    }
}

// Pagination helper
function paginate(items, page, pageSize) {
    page = Math.max(1, parseInt(page) || 1);
    pageSize = Math.min(200, Math.max(1, parseInt(pageSize) || 20));
    var start = (page - 1) * pageSize;
    var end = start + pageSize;

    return {
        items: items.slice(start, end),
        page: page,
        pageSize: pageSize,
        total: items.length,
        totalPages: Math.ceil(items.length / pageSize),
        hasNext: end < items.length,
        hasPrev: page > 1
    };
}

// Search scoring
function calculateSearchRelevance(text, query) {
    if (!text || !query) return 0;
    var lowerText = text.toLowerCase();
    var lowerQuery = query.toLowerCase();

    var score = 0;

    // Exact match
    if (lowerText === lowerQuery) return 100;

    // Starts with
    if (lowerText.startsWith(lowerQuery)) score += 50;

    // Contains exact phrase
    if (lowerText.indexOf(lowerQuery) >= 0) score += 30;

    // Word matches
    var queryWords = lowerQuery.split(/\s+/);
    var textWords = lowerText.split(/\s+/);
    var matchedWords = 0;

    queryWords.forEach(function(qw) {
        textWords.forEach(function(tw) {
            if (tw === qw) matchedWords += 3;
            else if (tw.indexOf(qw) >= 0) matchedWords += 1;
        });
    });

    score += matchedWords * 5;

    // Penalize length difference
    var lengthRatio = Math.min(query.length, text.length) / Math.max(query.length, text.length);
    score *= lengthRatio;

    return Math.round(score * 100) / 100;
}

// ============================================================================
// REST API Endpoints (v5)
// ============================================================================

// Health check
app.get('/api/health', function(req, res) {
    res.json({
        status: 'ok',
        version: '5.0',
        uptime: process.uptime(),
        timestamp: Date.now(),
        memory: process.memoryUsage(),
        online: onlineUsers.size
    });
});

// Public server stats
app.get('/api/stats', function(req, res) {
    res.json({
        totalUsers: accounts.size,
        onlineUsers: onlineUsers.size,
        totalRooms: customRooms.size + 1,
        totalMessages: serverStats.totalMessages,
        peakOnline: serverStats.peakOnlineUsers,
        uptime: Date.now() - serverStats.startTime,
        version: '5.0'
    });
});

// Room info (public rooms only)
app.get('/api/rooms', function(req, res) {
    var rooms = [{ id: 'general', name: 'General', memberCount: 0, isDefault: true }];
    customRooms.forEach(function(room, id) {
        if (!room.isPrivate) {
            rooms.push({
                id: id,
                name: room.name,
                description: room.description || '',
                memberCount: room.members ? room.members.size : 0,
                creator: room.creator,
                icon: room.icon || null,
                color: room.color || null,
                topic: room.topic || '',
                createdAt: room.createdAt
            });
        }
    });
    res.json({ rooms: rooms });
});

// Invite handler (redirect to room)
app.get('/invite/:code', function(req, res) {
    var invite = roomInvites.get(req.params.code.toUpperCase());
    if (!invite) {
        return res.status(404).json({ error: 'Invite not found or expired' });
    }
    if (invite.expiresAt && Date.now() > invite.expiresAt) {
        return res.status(410).json({ error: 'Invite expired' });
    }
    // Redirect to main page with invite param
    res.redirect('/?invite=' + req.params.code.toUpperCase());
});

// User profile (public info only)
app.get('/api/user/:username', function(req, res) {
    var username = req.params.username;
    var acc = accounts.get(username);
    if (!acc) {
        return res.status(404).json({ error: 'User not found' });
    }

    var profile = userProfiles.get(username) || {};
    var xpDetail = userXPDetails.get(username) || {};
    var userAchievements = achievements.get(username) || [];

    res.json({
        username: username,
        avatar: avatars.get(username) || null,
        role: getUserRole(username),
        online: onlineUsers.has(username),
        joinedAt: acc.createdAt,
        bio: profile.bio || '',
        level: xpDetail.level || 1,
        xp: xpDetail.totalXP || 0,
        achievementCount: userAchievements.length,
        badges: getBadgesForUserGlobal(username)
    });
});

// Leaderboard
app.get('/api/leaderboard', function(req, res) {
    var type = req.query.type || 'xp';
    var limit = Math.min(parseInt(req.query.limit) || 20, 100);

    var entries = [];
    userXPDetails.forEach(function(xd, user) {
        var entry = { username: user, avatar: avatars.get(user) || null };
        if (type === 'xp') entry.value = xd.totalXP || 0;
        else if (type === 'messages') entry.value = xd.totalMessages || 0;
        else if (type === 'streaks') entry.value = xd.streak || 0;
        else if (type === 'level') { entry.value = xd.level || 1; entry.xp = xd.totalXP || 0; }
        entries.push(entry);
    });

    entries.sort(function(a, b) { return b.value - a.value; });
    res.json({ type: type, entries: entries.slice(0, limit) });
});

// Upcoming events
app.get('/api/events', function(req, res) {
    var upcoming = scheduledEvents.filter(function(e) {
        return !e.cancelled && e.startTime > Date.now();
    });
    upcoming.sort(function(a, b) { return a.startTime - b.startTime; });

    res.json({
        events: upcoming.slice(0, 20).map(function(e) {
            return {
                id: e.id,
                title: e.title,
                description: e.description,
                startTime: e.startTime,
                endTime: e.endTime,
                room: e.room,
                attendeeCount: e.attendees.length,
                interestedCount: e.interested.length,
                category: e.category,
                color: e.color
            };
        })
    });
});

// Achievements list
app.get('/api/achievements', function(req, res) {
    var list = Object.entries(ACHIEVEMENT_DEFS).map(function(entry) {
        return {
            id: entry[0],
            name: entry[1].name,
            description: entry[1].description,
            icon: entry[1].icon,
            xp: entry[1].xp
        };
    });
    res.json({ achievements: list, total: list.length });
});

// Stickers
app.get('/api/stickers', function(req, res) {
    var list = [];
    stickers.forEach(function(sticker, id) {
        list.push(Object.assign({ id: id }, sticker));
    });
    res.json({ stickers: list });
});

// Custom emojis
app.get('/api/emojis', function(req, res) {
    var list = [];
    customEmojis.forEach(function(emoji, id) {
        list.push({ id: id, name: emoji.name, url: emoji.url, animated: emoji.animated });
    });
    res.json({ emojis: list });
});

// Admin API - requires auth header
function adminAuth(req, res, next) {
    var auth = req.headers['x-admin-token'];
    if (!auth) {
        return res.status(401).json({ error: 'Admin token required' });
    }
    // Simple token check - in production, use proper JWT
    var adminSession = null;
    accounts.forEach(function(acc, username) {
        if (acc.adminToken === auth && isAdmin(username)) {
            adminSession = username;
        }
    });
    if (!adminSession) {
        return res.status(403).json({ error: 'Invalid admin token' });
    }
    req.adminUser = adminSession;
    next();
}

app.get('/api/admin/stats', adminAuth, function(req, res) {
    res.json({
        accounts: accounts.size,
        onlineUsers: onlineUsers.size,
        totalMessages: serverStats.totalMessages,
        totalRooms: customRooms.size,
        totalBans: bannedUsers.size,
        totalReports: reports.length,
        totalThreads: threads.size,
        totalPolls: polls.size,
        totalCustomEmojis: customEmojis.size,
        totalEvents: scheduledEvents.length,
        totalAutoResponses: autoResponses.size,
        peakOnline: serverStats.peakOnlineUsers,
        uptime: Date.now() - serverStats.startTime,
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        serverVersion: '5.0',
        dailyStats: serverStats.dailyStats,
        auditLogSize: auditLog.length,
        dataFiles: Object.keys(dataFiles).length + 15 // v5 additions
    });
});

app.get('/api/admin/audit', adminAuth, function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var limit = Math.min(parseInt(req.query.limit) || 50, 200);
    var start = (page - 1) * limit;

    res.json({
        entries: auditLog.slice(start, start + limit),
        total: auditLog.length,
        page: page,
        totalPages: Math.ceil(auditLog.length / limit)
    });
});

app.get('/api/admin/users', adminAuth, function(req, res) {
    var search = (req.query.search || '').toLowerCase();
    var page = parseInt(req.query.page) || 1;
    var limit = Math.min(parseInt(req.query.limit) || 50, 200);
    var start = (page - 1) * limit;

    var users = [];
    accounts.forEach(function(acc, username) {
        if (search && !username.toLowerCase().includes(search)) return;
        users.push({
            username: username,
            email: acc.email || null,
            role: getUserRole(username),
            online: onlineUsers.has(username),
            createdAt: acc.createdAt,
            banned: bannedUsers.has(username),
            warningCount: (serverWarnings.get(username) || []).length,
            level: (userXPDetails.get(username) || {}).level || 1,
            xp: (userXPDetails.get(username) || {}).totalXP || 0
        });
    });

    users.sort(function(a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });

    res.json({
        users: users.slice(start, start + limit),
        total: users.length,
        page: page,
        totalPages: Math.ceil(users.length / limit)
    });
});

// Room analytics
app.get('/api/rooms/:roomId/analytics', function(req, res) {
    var roomId = req.params.roomId;
    if (roomId !== 'general' && !customRooms.has(roomId)) {
        return res.status(404).json({ error: 'Room not found' });
    }
    var analytics = getRoomAnalytics(roomId);
    res.json(analytics);
});

// User statistics
app.get('/api/user/:username/stats', function(req, res) {
    var username = req.params.username;
    if (!accounts.has(username)) {
        return res.status(404).json({ error: 'User not found' });
    }
    var stats = getUserStatistics(username);
    res.json(stats);
});

// User badges
app.get('/api/user/:username/badges', function(req, res) {
    var username = req.params.username;
    if (!accounts.has(username)) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ badges: getBadgesForUserGlobal(username) });
});

// User achievements
app.get('/api/user/:username/achievements', function(req, res) {
    var username = req.params.username;
    if (!accounts.has(username)) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ achievements: achievements.get(username) || [] });
});

// Friend suggestions
app.get('/api/user/:username/suggestions', function(req, res) {
    var username = req.params.username;
    if (!accounts.has(username)) {
        return res.status(404).json({ error: 'User not found' });
    }
    var suggestions = getFriendSuggestions(username, parseInt(req.query.limit) || 10);
    res.json({ suggestions: suggestions });
});

// Trending topics
app.get('/api/trending', function(req, res) {
    var window = parseInt(req.query.window) || 3600000;
    var topics = getTrendingTopics(window);
    res.json({ topics: topics, window: window });
});

// Activity feed
app.get('/api/activity', function(req, res) {
    var limit = Math.min(parseInt(req.query.limit) || 50, 200);
    res.json({ feed: activityFeed.slice(-limit).reverse() });
});

// Room templates
app.get('/api/templates', function(req, res) {
    res.json({ templates: roomTemplates });
});

// Server config (public subset)
app.get('/api/config', function(req, res) {
    res.json({
        maxMessageLength: serverConfig.maxMessageLength,
        maxFileSize: serverConfig.maxFileSize,
        maxRooms: serverConfig.maxRooms,
        registrationOpen: serverConfig.registrationOpen,
        maintenanceMode: serverConfig.maintenanceMode,
        maintenanceMessage: serverConfig.maintenanceMessage,
        welcomeMessage: serverConfig.welcomeMessage,
        rulesText: serverConfig.rulesText,
        defaultTheme: serverConfig.defaultTheme,
        enableAchievements: serverConfig.enableAchievements,
        enableXP: serverConfig.enableXP,
        enableThreads: serverConfig.enableThreads,
        enablePolls: serverConfig.enablePolls,
        enableFileUpload: serverConfig.enableFileUpload,
        enableCustomEmojis: serverConfig.enableCustomEmojis,
        version: serverConfig.version
    });
});

// Chat export
app.get('/api/export/:roomId', function(req, res) {
    var roomId = req.params.roomId;
    var format = req.query.format || 'json';
    var auth = req.headers['x-user-token'];

    // Simple auth check
    if (!auth) {
        return res.status(401).json({ error: 'Authentication required for export' });
    }

    var opts = {
        startDate: parseInt(req.query.startDate) || 0,
        endDate: parseInt(req.query.endDate) || Date.now()
    };

    var exported = exportChatHistory(roomId, format, opts);

    var contentTypes = {
        json: 'application/json',
        csv: 'text/csv',
        txt: 'text/plain',
        text: 'text/plain',
        html: 'text/html'
    };

    res.setHeader('Content-Type', contentTypes[format] || 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="chat-export-' + roomId + '.' + format + '"');
    res.send(exported);
});

// Webhooks management (admin only)
app.post('/api/admin/webhooks', adminAuth, function(req, res) {
    var config = req.body;
    if (!config.url) {
        return res.status(400).json({ error: 'Webhook URL required' });
    }

    var id = 'wh_' + generateToken(8);
    config.creator = req.adminUser;
    registerWebhook(id, config);

    addAuditEntry('create_webhook', req.adminUser, 'Webhook: ' + id + ' URL: ' + config.url);
    res.json({ id: id, webhook: webhooks.get(id) });
});

app.get('/api/admin/webhooks', adminAuth, function(req, res) {
    var list = [];
    webhooks.forEach(function(wh, id) {
        list.push(wh);
    });
    res.json({ webhooks: list });
});

app.delete('/api/admin/webhooks/:id', adminAuth, function(req, res) {
    var id = req.params.id;
    if (!webhooks.has(id)) {
        return res.status(404).json({ error: 'Webhook not found' });
    }
    webhooks.delete(id);
    addAuditEntry('delete_webhook', req.adminUser, 'Webhook: ' + id);
    res.json({ success: true });
});

// Admin ban management
app.get('/api/admin/bans', adminAuth, function(req, res) {
    var bans = [];
    bannedUsers.forEach(function(ban, username) {
        bans.push(Object.assign({ username: username }, ban));
    });
    res.json({ bans: bans, total: bans.length });
});

app.post('/api/admin/ban/:username', adminAuth, function(req, res) {
    var username = req.params.username;
    var reason = (req.body && req.body.reason) || 'Admin action';
    var duration = (req.body && req.body.duration) || 0; // 0 = permanent

    bannedUsers.set(username, {
        reason: reason,
        bannedBy: req.adminUser,
        timestamp: Date.now(),
        expiresAt: duration > 0 ? Date.now() + duration : null
    });

    saveJSON(dataFiles.bannedUsers, Object.fromEntries(bannedUsers));

    // Disconnect if online
    var userData = onlineUsers.get(username);
    if (userData) {
        io.to(userData.socketId).emit('forcedDisconnect', { reason: 'You have been banned: ' + reason });
    }

    addAuditEntry('ban_user', req.adminUser, 'Banned: ' + username + ' Reason: ' + reason);
    res.json({ success: true, username: username });
});

app.delete('/api/admin/ban/:username', adminAuth, function(req, res) {
    var username = req.params.username;
    if (!bannedUsers.has(username)) {
        return res.status(404).json({ error: 'User not banned' });
    }
    bannedUsers.delete(username);
    saveJSON(dataFiles.bannedUsers, Object.fromEntries(bannedUsers));
    addAuditEntry('unban_user', req.adminUser, 'Unbanned: ' + username);
    res.json({ success: true });
});

// Admin reports
app.get('/api/admin/reports', adminAuth, function(req, res) {
    var status = req.query.status || 'all';
    var filtered = reports;
    if (status !== 'all') {
        filtered = reports.filter(function(r) { return r.status === status; });
    }
    var paginated = paginate(filtered, req.query.page, req.query.limit);
    res.json(paginated);
});

app.put('/api/admin/reports/:id', adminAuth, function(req, res) {
    var id = req.params.id;
    var report = reports.find(function(r) { return r.id === id; });
    if (!report) {
        return res.status(404).json({ error: 'Report not found' });
    }
    if (req.body.status) report.status = req.body.status;
    if (req.body.resolution) report.resolution = req.body.resolution;
    report.resolvedBy = req.adminUser;
    report.resolvedAt = Date.now();

    saveJSON(dataFiles.reports, reports);
    addAuditEntry('resolve_report', req.adminUser, 'Report: ' + id + ' Status: ' + report.status);
    res.json({ success: true, report: report });
});

// Admin server configuration
app.get('/api/admin/config', adminAuth, function(req, res) {
    res.json({ config: serverConfig });
});

app.put('/api/admin/config', adminAuth, function(req, res) {
    var updates = req.body;
    var changed = [];

    Object.keys(updates).forEach(function(key) {
        if (key in serverConfig && key !== 'version') {
            var old = serverConfig[key];
            serverConfig[key] = updates[key];
            changed.push(key + ': ' + old + ' → ' + updates[key]);
        }
    });

    if (changed.length > 0) {
        addAuditEntry('update_config', req.adminUser, changed.join(', '));
    }
    res.json({ success: true, config: serverConfig, changed: changed });
});

// Admin data export
app.get('/api/admin/export', adminAuth, function(req, res) {
    var type = req.query.type || 'full';

    var exportData = {};
    if (type === 'full' || type === 'accounts') {
        exportData.accounts = Object.fromEntries(accounts);
    }
    if (type === 'full' || type === 'rooms') {
        var roomData = {};
        customRooms.forEach(function(room, id) {
            roomData[id] = Object.assign({}, room);
            if (roomData[id].members) roomData[id].members = Array.from(roomData[id].members);
        });
        exportData.rooms = roomData;
    }
    if (type === 'full' || type === 'messages') {
        exportData.messages = Object.fromEntries(messageHistory);
    }
    if (type === 'full' || type === 'stats') {
        exportData.serverStats = serverStats;
        exportData.chatAnalytics = chatAnalytics;
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="redchat-export-' + type + '-' + Date.now() + '.json"');
    res.send(JSON.stringify(exportData, null, 2));
});

// Admin profanity filter management
app.get('/api/admin/profanity', adminAuth, function(req, res) {
    res.json({
        enabled: profanityEnabled,
        words: Array.from(profanityList),
        count: profanityList.size
    });
});

app.post('/api/admin/profanity', adminAuth, function(req, res) {
    if (req.body.enabled !== undefined) profanityEnabled = req.body.enabled;
    if (req.body.add && Array.isArray(req.body.add)) {
        req.body.add.forEach(function(word) {
            profanityList.add(word.toLowerCase().trim());
        });
    }
    if (req.body.remove && Array.isArray(req.body.remove)) {
        req.body.remove.forEach(function(word) {
            profanityList.delete(word.toLowerCase().trim());
        });
    }
    addAuditEntry('update_profanity', req.adminUser, 'Filter: ' + (profanityEnabled ? 'enabled' : 'disabled') + ' Words: ' + profanityList.size);
    res.json({ success: true, enabled: profanityEnabled, count: profanityList.size });
});

// Admin dashboard data
app.get('/api/admin/dashboard', adminAuth, function(req, res) {
    var now = Date.now();
    var last24h = now - 24 * 60 * 60 * 1000;
    var last7d = now - 7 * 24 * 60 * 60 * 1000;

    // Count messages in last 24h across all rooms
    var messages24h = 0;
    var messages7d = 0;
    var activeRooms24h = new Set();
    messageHistory.forEach(function(msgs, roomId) {
        msgs.forEach(function(m) {
            if (m.timestamp > last24h) { messages24h++; activeRooms24h.add(roomId); }
            if (m.timestamp > last7d) messages7d++;
        });
    });

    // New accounts in last 24h
    var newAccounts24h = 0;
    accounts.forEach(function(acc) {
        if (acc.createdAt && acc.createdAt > last24h) newAccounts24h++;
    });

    // Active threads
    var activeThreads = 0;
    threads.forEach(function(thread) {
        if (!thread.locked) activeThreads++;
    });

    // Pending reports
    var pendingReports = reports.filter(function(r) { return r.status === 'pending'; }).length;

    res.json({
        overview: {
            totalAccounts: accounts.size,
            onlineUsers: onlineUsers.size,
            totalRooms: customRooms.size + 1,
            totalMessages: serverStats.totalMessages,
            peakOnline: serverStats.peakOnlineUsers,
            uptime: now - serverStats.startTime
        },
        recent: {
            messages24h: messages24h,
            messages7d: messages7d,
            activeRooms24h: activeRooms24h.size,
            newAccounts24h: newAccounts24h,
            activeThreads: activeThreads,
            pendingReports: pendingReports
        },
        systems: {
            threads: threads.size,
            polls: polls.size,
            customEmojis: customEmojis.size,
            scheduledEvents: scheduledEvents.filter(function(e) { return !e.cancelled; }).length,
            autoResponses: autoResponses.size,
            webhooks: webhooks.size,
            bans: bannedUsers.size,
            warnings: serverWarnings.size,
            roomInvites: roomInvites.size,
            achievementDefs: Object.keys(ACHIEVEMENT_DEFS).length
        },
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        dailyStats: serverStats.dailyStats
    });
});

// ============================================================================
// Start Server
// ============================================================================

server.listen(PORT, function() {
    console.log('');
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║        RedChat Server v5.0 — Ultimate+       ║');
    console.log('║        Running on port ' + PORT + '                   ║');
    console.log('║        Accounts: ' + accounts.size + '                          ║');
    console.log('║        Rooms: ' + customRooms.size + '                            ║');
    console.log('║        Threads: ' + threads.size + '                           ║');
    console.log('║        Custom Emojis: ' + customEmojis.size + '                      ║');
    console.log('║        Events: ' + scheduledEvents.length + '                            ║');
    console.log('║        Achievements: ' + Object.keys(ACHIEVEMENT_DEFS).length + ' defined              ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');
});

// ============================================================================
// ============================================================================
//                    RedChat Server v5.0 — Expanded Features
// ============================================================================
// ============================================================================

// ============================================================================
// Extended Data Stores (v5)
// ============================================================================

// Thread System
var threads = new Map(); // threadId -> { parentMessageId, room, messages: [], participants: Set }
var threadData = loadJSON('threads.json');
if (threadData && typeof threadData === 'object') {
    Object.entries(threadData).forEach(function(entry) {
        var t = entry[1];
        t.participants = new Set(t.participants || []);
        threads.set(entry[0], t);
    });
}

// Scheduled Messages
var scheduledMessages = [];
var scheduledData = loadJSON('scheduled_messages.json');
if (Array.isArray(scheduledData)) {
    scheduledMessages = scheduledData;
}

// User Achievements / Badges
var achievements = new Map(); // username -> [{ id, name, description, earnedAt, icon }]
var achievementsData = loadJSON('achievements.json');
if (achievementsData && typeof achievementsData === 'object') {
    Object.entries(achievementsData).forEach(function(entry) {
        achievements.set(entry[0], entry[1]);
    });
}

// Custom Emoji System
var customEmojis = new Map(); // emojiId -> { name, url, creator, createdAt }
var customEmojisData = loadJSON('custom_emojis.json');
if (customEmojisData && typeof customEmojisData === 'object') {
    Object.entries(customEmojisData).forEach(function(entry) {
        customEmojis.set(entry[0], entry[1]);
    });
}

// User Block Lists
var blockLists = new Map(); // username -> Set of blocked usernames
var blockData = loadJSON('block_lists.json');
if (blockData && typeof blockData === 'object') {
    Object.entries(blockData).forEach(function(entry) {
        blockLists.set(entry[0], new Set(entry[1]));
    });
}

// Room Invites
var roomInvites = new Map(); // inviteCode -> { roomId, creator, expiresAt, maxUses, uses }
var inviteData = loadJSON('room_invites.json');
if (inviteData && typeof inviteData === 'object') {
    Object.entries(inviteData).forEach(function(entry) {
        roomInvites.set(entry[0], entry[1]);
    });
}

// Read Receipts
var readReceipts = new Map(); // room -> { username -> lastReadMessageId }
var receiptData = loadJSON('read_receipts.json');
if (receiptData && typeof receiptData === 'object') {
    Object.entries(receiptData).forEach(function(entry) {
        readReceipts.set(entry[0], entry[1]);
    });
}

// Slow Mode Settings
var slowModeSettings = new Map(); // room -> { interval: ms, enabled: boolean }
var slowModeData = loadJSON('slow_mode.json');
if (slowModeData && typeof slowModeData === 'object') {
    Object.entries(slowModeData).forEach(function(entry) {
        slowModeSettings.set(entry[0], entry[1]);
    });
}

// User Last Message Timestamps (for slow mode enforcement)
var userLastMessageTime = new Map(); // `room:username` -> timestamp

// Scheduled Events / Calendar
var scheduledEvents = [];
var eventsData = loadJSON('scheduled_events.json');
if (Array.isArray(eventsData)) {
    scheduledEvents = eventsData;
}

// Auto-Responses
var autoResponses = new Map(); // trigger -> { response, creator, room, regex }
var autoRespData = loadJSON('auto_responses.json');
if (autoRespData && typeof autoRespData === 'object') {
    Object.entries(autoRespData).forEach(function(entry) {
        autoResponses.set(entry[0], entry[1]);
    });
}

// Notification Preferences
var notificationPrefs = new Map(); // username -> { muted: Set, dnd: bool, sounds: bool, ... }
var notifData = loadJSON('notification_prefs.json');
if (notifData && typeof notifData === 'object') {
    Object.entries(notifData).forEach(function(entry) {
        var prefs = entry[1];
        if (prefs.muted) prefs.muted = new Set(prefs.muted);
        notificationPrefs.set(entry[0], prefs);
    });
}

// Room Permissions System
var roomPermissions = new Map(); // roomId -> { roles: {}, permissions: {} }
var permData = loadJSON('room_permissions.json');
if (permData && typeof permData === 'object') {
    Object.entries(permData).forEach(function(entry) {
        roomPermissions.set(entry[0], entry[1]);
    });
}

// User XP Extended (detailed tracking)
var userXPDetails = new Map(); // username -> { totalXP, level, dailyXP, streak, lastActive, ... }
var xpData = loadJSON('user_xp.json');
if (xpData && typeof xpData === 'object') {
    Object.entries(xpData).forEach(function(entry) {
        userXPDetails.set(entry[0], entry[1]);
    });
}

// Chat Analytics
var chatAnalytics = {
    messagesByHour: new Array(24).fill(0),
    messagesByDay: new Array(7).fill(0),
    topEmojis: {},
    topCommands: {},
    averageMessageLength: 0,
    totalCharacters: 0,
    linkCount: 0,
    imageCount: 0,
    fileCount: 0,
    reactionCount: 0,
    uniqueUsersToday: new Set(),
    peakConcurrentToday: 0,
    messageVelocity: [] // messages per minute over last hour
};
var analyticsData = loadJSON('chat_analytics.json');
if (analyticsData && typeof analyticsData === 'object') {
    Object.assign(chatAnalytics, analyticsData);
    chatAnalytics.uniqueUsersToday = new Set(chatAnalytics.uniqueUsersToday || []);
    if (!chatAnalytics.messageVelocity) chatAnalytics.messageVelocity = [];
}

// User Profiles Extended
var userProfiles = new Map(); // username -> { bio, location, website, birthday, pronouns, ... }
var profileData = loadJSON('user_profiles.json');
if (profileData && typeof profileData === 'object') {
    Object.entries(profileData).forEach(function(entry) {
        userProfiles.set(entry[0], entry[1]);
    });
}

// Server Audit Log (detailed)
var auditLog = [];
var auditData = loadJSON('audit_log.json');
if (Array.isArray(auditData)) {
    auditLog = auditData;
}

// Message Reactions Extended (reaction stats)
var reactionStats = new Map(); // emoji -> count
var reactionStatsData = loadJSON('reaction_stats.json');
if (reactionStatsData && typeof reactionStatsData === 'object') {
    Object.entries(reactionStatsData).forEach(function(entry) {
        reactionStats.set(entry[0], parseInt(entry[1]));
    });
}

// User Sessions Tracking
var userSessions = new Map(); // username -> [{ loginAt, logoutAt, duration, ip }]
var sessionsData = loadJSON('user_sessions.json');
if (sessionsData && typeof sessionsData === 'object') {
    Object.entries(sessionsData).forEach(function(entry) {
        userSessions.set(entry[0], entry[1]);
    });
}

// Room Topics History
var topicHistory = new Map(); // roomId -> [{ topic, setBy, setAt }]
var topicData = loadJSON('topic_history.json');
if (topicData && typeof topicData === 'object') {
    Object.entries(topicData).forEach(function(entry) {
        topicHistory.set(entry[0], entry[1]);
    });
}

// Server Warnings System
var serverWarnings = new Map(); // username -> [{ reason, issuedBy, issuedAt, expires }]
var warningsData = loadJSON('server_warnings.json');
if (warningsData && typeof warningsData === 'object') {
    Object.entries(warningsData).forEach(function(entry) {
        serverWarnings.set(entry[0], entry[1]);
    });
}

// Saved / Favorite Messages (per user)
var savedMessages = new Map(); // username -> [messageId]
var savedData = loadJSON('saved_messages.json');
if (savedData && typeof savedData === 'object') {
    Object.entries(savedData).forEach(function(entry) {
        savedMessages.set(entry[0], entry[1]);
    });
}

// Channel Categories
var channelCategories = new Map(); // categoryId -> { name, rooms: [], position, collapsed }
var categoryData = loadJSON('channel_categories.json');
if (categoryData && typeof categoryData === 'object') {
    Object.entries(categoryData).forEach(function(entry) {
        channelCategories.set(entry[0], entry[1]);
    });
}

// User Presence Extended
var userPresence = new Map(); // username -> { status, customStatus, lastSeen, device, activity }
var presenceData = loadJSON('user_presence.json');
if (presenceData && typeof presenceData === 'object') {
    Object.entries(presenceData).forEach(function(entry) {
        userPresence.set(entry[0], entry[1]);
    });
}


// ============================================================================
// v5 Extended Save Helpers
// ============================================================================

function saveAccounts() {
    saveJSON(dataFiles.accounts, Object.fromEntries(accounts));
}

function saveCustomRooms() {
    saveRooms(); // Use existing saveRooms function
}

function saveFriends() {
    // Friends are stored within accounts, so save accounts
    saveAccounts();
}

function saveBans() {
    saveJSON(dataFiles.bannedUsers, Object.fromEntries(bannedUsers));
}

function saveReports() {
    saveJSON(dataFiles.reports, reports);
}

function saveThreads() {
    var data = {};
    threads.forEach(function(thread, id) {
        var t = Object.assign({}, thread);
        t.participants = Array.from(thread.participants || []);
        data[id] = t;
    });
    saveJSON('threads.json', data);
}

function saveScheduledMessages() {
    saveJSON('scheduled_messages.json', scheduledMessages);
}

function saveAchievements() {
    saveJSON('achievements.json', Object.fromEntries(achievements));
}

function saveCustomEmojis() {
    saveJSON('custom_emojis.json', Object.fromEntries(customEmojis));
}

function saveBlockLists() {
    var data = {};
    blockLists.forEach(function(set, username) {
        data[username] = Array.from(set);
    });
    saveJSON('block_lists.json', data);
}

function saveRoomInvites() {
    saveJSON('room_invites.json', Object.fromEntries(roomInvites));
}

function saveReadReceipts() {
    saveJSON('read_receipts.json', Object.fromEntries(readReceipts));
}

function saveSlowMode() {
    saveJSON('slow_mode.json', Object.fromEntries(slowModeSettings));
}

function saveScheduledEvents() {
    saveJSON('scheduled_events.json', scheduledEvents);
}

function saveAutoResponses() {
    saveJSON('auto_responses.json', Object.fromEntries(autoResponses));
}

function saveNotificationPrefs() {
    var data = {};
    notificationPrefs.forEach(function(prefs, username) {
        var p = Object.assign({}, prefs);
        if (p.muted instanceof Set) p.muted = Array.from(p.muted);
        data[username] = p;
    });
    saveJSON('notification_prefs.json', data);
}

function saveRoomPermissions() {
    saveJSON('room_permissions.json', Object.fromEntries(roomPermissions));
}

function saveUserXP() {
    saveJSON('user_xp.json', Object.fromEntries(userXPDetails));
}

function saveChatAnalytics() {
    var data = Object.assign({}, chatAnalytics);
    data.uniqueUsersToday = Array.from(chatAnalytics.uniqueUsersToday);
    saveJSON('chat_analytics.json', data);
}

function saveUserProfiles() {
    saveJSON('user_profiles.json', Object.fromEntries(userProfiles));
}

function saveAuditLog() {
    saveJSON('audit_log.json', auditLog.slice(-5000)); // Keep last 5000 entries
}

function saveReactionStats() {
    saveJSON('reaction_stats.json', Object.fromEntries(reactionStats));
}

function saveUserSessions() {
    saveJSON('user_sessions.json', Object.fromEntries(userSessions));
}

function saveTopicHistory() {
    saveJSON('topic_history.json', Object.fromEntries(topicHistory));
}

function saveServerWarnings() {
    saveJSON('server_warnings.json', Object.fromEntries(serverWarnings));
}

function saveSavedMessages() {
    saveJSON('saved_messages.json', Object.fromEntries(savedMessages));
}

function saveChannelCategories() {
    saveJSON('channel_categories.json', Object.fromEntries(channelCategories));
}

function saveUserPresence() {
    saveJSON('user_presence.json', Object.fromEntries(userPresence));
}

// ============================================================================
// v5 Achievement Definitions
// ============================================================================

var ACHIEVEMENT_DEFS = {
    'first_message': {
        name: 'First Words',
        description: 'Send your first message',
        icon: '💬',
        xp: 10
    },
    'hundred_messages': {
        name: 'Chatterbox',
        description: 'Send 100 messages',
        icon: '🗣️',
        xp: 50
    },
    'thousand_messages': {
        name: 'Storyteller',
        description: 'Send 1,000 messages',
        icon: '📖',
        xp: 200
    },
    'first_reaction': {
        name: 'Reactor',
        description: 'Add your first reaction',
        icon: '⚡',
        xp: 10
    },
    'hundred_reactions': {
        name: 'Reaction Master',
        description: 'Add 100 reactions',
        icon: '🎯',
        xp: 75
    },
    'first_friend': {
        name: 'Social Butterfly',
        description: 'Make your first friend',
        icon: '🦋',
        xp: 15
    },
    'ten_friends': {
        name: 'Popular',
        description: 'Have 10 friends',
        icon: '🌟',
        xp: 100
    },
    'create_room': {
        name: 'Room Creator',
        description: 'Create your first room',
        icon: '🏠',
        xp: 20
    },
    'create_poll': {
        name: 'Pollster',
        description: 'Create your first poll',
        icon: '📊',
        xp: 15
    },
    'upload_file': {
        name: 'File Sharer',
        description: 'Upload your first file',
        icon: '📁',
        xp: 10
    },
    'pin_message': {
        name: 'Pinner',
        description: 'Pin your first message',
        icon: '📌',
        xp: 10
    },
    'night_owl': {
        name: 'Night Owl',
        description: 'Chat between 2 AM and 5 AM',
        icon: '🦉',
        xp: 25
    },
    'early_bird': {
        name: 'Early Bird',
        description: 'Chat between 5 AM and 7 AM',
        icon: '🐦',
        xp: 25
    },
    'week_streak': {
        name: 'Dedicated',
        description: 'Chat for 7 days in a row',
        icon: '🔥',
        xp: 100
    },
    'month_streak': {
        name: 'Committed',
        description: 'Chat for 30 days in a row',
        icon: '💎',
        xp: 500
    },
    'emoji_master': {
        name: 'Emoji Master',
        description: 'Use 50 different emojis',
        icon: '😎',
        xp: 50
    },
    'thread_starter': {
        name: 'Thread Starter',
        description: 'Start your first thread',
        icon: '🧵',
        xp: 15
    },
    'mentor': {
        name: 'Mentor',
        description: 'Help 10 users (get thanked)',
        icon: '🎓',
        xp: 150
    },
    'bookmark_collector': {
        name: 'Collector',
        description: 'Bookmark 25 messages',
        icon: '📚',
        xp: 30
    },
    'custom_emoji_creator': {
        name: 'Artist',
        description: 'Create a custom emoji',
        icon: '🎨',
        xp: 25
    },
    'event_organizer': {
        name: 'Event Organizer',
        description: 'Create a scheduled event',
        icon: '📅',
        xp: 20
    },
    'dm_champion': {
        name: 'DM Champion',
        description: 'Send 100 direct messages',
        icon: '✉️',
        xp: 50
    },
    'veteran': {
        name: 'Veteran',
        description: 'Be a member for 30 days',
        icon: '🏅',
        xp: 200
    },
    'explorer': {
        name: 'Explorer',
        description: 'Join 10 different rooms',
        icon: '🧭',
        xp: 50
    },
    'speed_typer': {
        name: 'Speed Typer',
        description: 'Send 10 messages in under a minute',
        icon: '⌨️',
        xp: 30
    }
};

function checkAndAwardAchievement(username, achievementId) {
    if (!ACHIEVEMENT_DEFS[achievementId]) return false;
    if (!achievements.has(username)) achievements.set(username, []);
    var userAchievements = achievements.get(username);
    if (userAchievements.find(function(a) { return a.id === achievementId; })) return false;

    var def = ACHIEVEMENT_DEFS[achievementId];
    var achievement = {
        id: achievementId,
        name: def.name,
        description: def.description,
        icon: def.icon,
        earnedAt: Date.now()
    };
    userAchievements.push(achievement);
    saveAchievements();

    // Award XP
    awardXP(username, def.xp, 'Achievement: ' + def.name);

    // Notify user
    var userData = onlineUsers.get(username);
    if (userData) {
        io.to(userData.socketId).emit('achievementUnlocked', achievement);
        io.to(userData.socketId).emit('notification', {
            type: 'achievement',
            message: 'Achievement unlocked: ' + def.name + ' ' + def.icon,
            achievement: achievement
        });
    }

    // Audit
    addAuditEntry('achievement', username, 'Earned: ' + def.name);
    return true;
}

// ============================================================================
// v5 XP / Level System (Enhanced)
// ============================================================================

var XP_CONFIG = {
    messageXP: 5,
    reactionXP: 2,
    loginXP: 10,
    dailyBonusXP: 25,
    streakMultiplier: 0.1, // +10% per day streak
    maxDailyXP: 500,
    levelCurve: 'quadratic', // linear, quadratic, exponential
    xpPerLevel: 100, // base XP per level
    maxLevel: 100
};

function calculateLevel(totalXP) {
    if (XP_CONFIG.levelCurve === 'linear') {
        return Math.floor(totalXP / XP_CONFIG.xpPerLevel) + 1;
    } else if (XP_CONFIG.levelCurve === 'quadratic') {
        // level = floor(sqrt(totalXP / 50)) + 1
        return Math.floor(Math.sqrt(totalXP / 50)) + 1;
    } else {
        // exponential: level = floor(log2(totalXP / 50 + 1)) + 1
        return Math.floor(Math.log2(totalXP / 50 + 1)) + 1;
    }
}

function getXPForLevel(level) {
    if (XP_CONFIG.levelCurve === 'linear') {
        return (level - 1) * XP_CONFIG.xpPerLevel;
    } else if (XP_CONFIG.levelCurve === 'quadratic') {
        return (level - 1) * (level - 1) * 50;
    } else {
        return Math.floor((Math.pow(2, level - 1) - 1) * 50);
    }
}

function awardXP(username, amount, reason) {
    if (!userXPDetails.has(username)) {
        userXPDetails.set(username, {
            totalXP: 0,
            level: 1,
            dailyXP: 0,
            streak: 0,
            lastActive: null,
            xpHistory: [],
            totalMessages: 0,
            totalReactions: 0,
            totalDMs: 0,
            roomsJoined: 0,
            emojisUsed: new Set()
        });
    }

    var xpData = userXPDetails.get(username);

    // Check daily cap
    var today = new Date().toISOString().split('T')[0];
    if (xpData.lastDailyReset !== today) {
        xpData.dailyXP = 0;
        xpData.lastDailyReset = today;
    }

    if (xpData.dailyXP >= XP_CONFIG.maxDailyXP) return;

    // Apply streak multiplier
    var multiplier = 1 + (xpData.streak * XP_CONFIG.streakMultiplier);
    var finalAmount = Math.floor(amount * Math.min(multiplier, 3)); // Cap at 3x

    xpData.totalXP += finalAmount;
    xpData.dailyXP += finalAmount;

    // Check for level up
    var oldLevel = xpData.level;
    xpData.level = Math.min(calculateLevel(xpData.totalXP), XP_CONFIG.maxLevel);

    if (xpData.level > oldLevel) {
        var userData = onlineUsers.get(username);
        if (userData) {
            io.to(userData.socketId).emit('levelUp', {
                username: username,
                oldLevel: oldLevel,
                newLevel: xpData.level,
                totalXP: xpData.totalXP,
                nextLevelXP: getXPForLevel(xpData.level + 1)
            });
        }
        addAuditEntry('level_up', username, 'Level ' + oldLevel + ' -> ' + xpData.level);
    }

    // Track XP history (last 50 entries)
    if (!xpData.xpHistory) xpData.xpHistory = [];
    xpData.xpHistory.push({
        amount: finalAmount,
        reason: reason,
        timestamp: Date.now()
    });
    if (xpData.xpHistory.length > 50) xpData.xpHistory.splice(0, xpData.xpHistory.length - 50);

    // Update streak
    var now = new Date();
    var lastActive = xpData.lastActive ? new Date(xpData.lastActive) : null;
    if (lastActive) {
        var daysDiff = Math.floor((now - lastActive) / (24 * 60 * 60 * 1000));
        if (daysDiff === 1) {
            xpData.streak++;
        } else if (daysDiff > 1) {
            xpData.streak = 1;
        }
    } else {
        xpData.streak = 1;
    }
    xpData.lastActive = now.toISOString();

    saveUserXP();
}

// ============================================================================
// v5 Audit Log System
// ============================================================================

function addAuditEntry(action, user, details, metadata) {
    var entry = {
        id: generateToken(8),
        action: action,
        user: user,
        details: details,
        metadata: metadata || {},
        timestamp: Date.now(),
        ip: null
    };
    auditLog.push(entry);
    if (auditLog.length > 10000) auditLog.splice(0, auditLog.length - 10000);

    // Notify admin sockets
    ADMIN_USERS.forEach(function(admin) {
        var adminData = onlineUsers.get(admin);
        if (adminData) {
            io.to(adminData.socketId).emit('auditLogEntry', entry);
        }
    });

    return entry;
}

// ============================================================================
// v5 Room Permission Helpers
// ============================================================================

var ROOM_PERMISSIONS = {
    SEND_MESSAGES: 'send_messages',
    MANAGE_MESSAGES: 'manage_messages',
    PIN_MESSAGES: 'pin_messages',
    CREATE_THREADS: 'create_threads',
    MANAGE_ROOM: 'manage_room',
    INVITE_USERS: 'invite_users',
    KICK_USERS: 'kick_users',
    BAN_USERS: 'ban_users',
    MANAGE_PERMISSIONS: 'manage_permissions',
    CREATE_POLLS: 'create_polls',
    USE_SLOWMODE: 'use_slowmode',
    UPLOAD_FILES: 'upload_files',
    USE_CUSTOM_EMOJI: 'use_custom_emoji',
    SET_TOPIC: 'set_topic',
    VIEW_AUDIT_LOG: 'view_audit_log',
    MANAGE_EVENTS: 'manage_events'
};

var DEFAULT_PERMISSIONS = {
    admin: Object.values(ROOM_PERMISSIONS),
    moderator: [
        ROOM_PERMISSIONS.SEND_MESSAGES,
        ROOM_PERMISSIONS.MANAGE_MESSAGES,
        ROOM_PERMISSIONS.PIN_MESSAGES,
        ROOM_PERMISSIONS.CREATE_THREADS,
        ROOM_PERMISSIONS.INVITE_USERS,
        ROOM_PERMISSIONS.KICK_USERS,
        ROOM_PERMISSIONS.CREATE_POLLS,
        ROOM_PERMISSIONS.UPLOAD_FILES,
        ROOM_PERMISSIONS.USE_CUSTOM_EMOJI,
        ROOM_PERMISSIONS.SET_TOPIC,
        ROOM_PERMISSIONS.MANAGE_EVENTS
    ],
    member: [
        ROOM_PERMISSIONS.SEND_MESSAGES,
        ROOM_PERMISSIONS.CREATE_THREADS,
        ROOM_PERMISSIONS.CREATE_POLLS,
        ROOM_PERMISSIONS.UPLOAD_FILES,
        ROOM_PERMISSIONS.USE_CUSTOM_EMOJI
    ]
};

function hasRoomPermission(username, roomId, permission) {
    // Admins always have all permissions
    if (isAdmin(username)) return true;

    var room = customRooms.get(roomId);
    if (!room) return true; // Default room, everyone has basic perms

    // Room creator has all permissions
    if (room.creator === username) return true;

    // Check room-specific permissions
    var perms = roomPermissions.get(roomId);
    if (perms && perms.users && perms.users[username]) {
        return perms.users[username].includes(permission);
    }

    // Fall back to role-based permissions
    var role = getUserRole(username);
    if (perms && perms.roles && perms.roles[role]) {
        return perms.roles[role].includes(permission);
    }

    return DEFAULT_PERMISSIONS[role] ? DEFAULT_PERMISSIONS[role].includes(permission) : false;
}

// ============================================================================
// v5 Chat Analytics Helpers
// ============================================================================

function trackMessageAnalytics(message, username) {
    var now = new Date();
    chatAnalytics.messagesByHour[now.getHours()]++;
    chatAnalytics.messagesByDay[now.getDay()]++;
    chatAnalytics.totalCharacters += (message || '').length;
    chatAnalytics.uniqueUsersToday.add(username);

    // Track concurrent users
    if (onlineUsers.size > chatAnalytics.peakConcurrentToday) {
        chatAnalytics.peakConcurrentToday = onlineUsers.size;
    }

    // Track message velocity
    var minute = Math.floor(Date.now() / 60000);
    if (chatAnalytics.messageVelocity.length === 0 ||
        chatAnalytics.messageVelocity[chatAnalytics.messageVelocity.length - 1].minute !== minute) {
        chatAnalytics.messageVelocity.push({ minute: minute, count: 1 });
        if (chatAnalytics.messageVelocity.length > 60) chatAnalytics.messageVelocity.shift();
    } else {
        chatAnalytics.messageVelocity[chatAnalytics.messageVelocity.length - 1].count++;
    }

    // Track links
    var urlRegex = /https?:\/\/[^\s]+/g;
    var links = (message || '').match(urlRegex);
    if (links) chatAnalytics.linkCount += links.length;

    // Track emojis
    var emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    var emojis = (message || '').match(emojiRegex);
    if (emojis) {
        emojis.forEach(function(e) {
            chatAnalytics.topEmojis[e] = (chatAnalytics.topEmojis[e] || 0) + 1;
        });
    }

    // Update average message length
    var totalMessages = 0;
    chatAnalytics.messagesByHour.forEach(function(c) { totalMessages += c; });
    if (totalMessages > 0) {
        chatAnalytics.averageMessageLength = Math.round(chatAnalytics.totalCharacters / totalMessages);
    }
}

function resetDailyAnalytics() {
    chatAnalytics.uniqueUsersToday = new Set();
    chatAnalytics.peakConcurrentToday = onlineUsers.size;
}

// ============================================================================
// v5 Link Preview Helper
// ============================================================================

function extractLinksFromMessage(message) {
    var urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g;
    return (message || '').match(urlRegex) || [];
}

function generateLinkPreview(url) {
    // Simple URL metadata extraction (without HTTP request)
    var parsed = {};
    try {
        var urlObj = new URL(url);
        parsed = {
            url: url,
            hostname: urlObj.hostname,
            pathname: urlObj.pathname,
            protocol: urlObj.protocol,
            title: urlObj.hostname.replace('www.', ''),
            favicon: urlObj.protocol + '//' + urlObj.hostname + '/favicon.ico'
        };

        // Detect known domains for richer previews
        if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
            parsed.type = 'video';
            parsed.provider = 'YouTube';
            var videoId = urlObj.searchParams ? urlObj.searchParams.get('v') : null;
            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            }
            if (videoId) {
                parsed.thumbnail = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
                parsed.embedUrl = 'https://www.youtube.com/embed/' + videoId;
            }
        } else if (urlObj.hostname.includes('github.com')) {
            parsed.type = 'repository';
            parsed.provider = 'GitHub';
            var parts = urlObj.pathname.split('/').filter(Boolean);
            if (parts.length >= 2) {
                parsed.title = parts[0] + '/' + parts[1];
            }
        } else if (urlObj.hostname.includes('twitter.com') || urlObj.hostname.includes('x.com')) {
            parsed.type = 'social';
            parsed.provider = 'Twitter/X';
        } else if (urlObj.hostname.includes('reddit.com')) {
            parsed.type = 'social';
            parsed.provider = 'Reddit';
        } else if (urlObj.hostname.includes('imgur.com') || urlObj.hostname.includes('i.imgur.com')) {
            parsed.type = 'image';
            parsed.provider = 'Imgur';
        } else if (urlObj.hostname.includes('spotify.com')) {
            parsed.type = 'music';
            parsed.provider = 'Spotify';
        } else if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(urlObj.pathname)) {
            parsed.type = 'image';
            parsed.imageUrl = url;
        } else if (/\.(mp4|webm|ogg|avi|mov)$/i.test(urlObj.pathname)) {
            parsed.type = 'video';
            parsed.videoUrl = url;
        } else if (/\.(mp3|wav|flac|aac|m4a)$/i.test(urlObj.pathname)) {
            parsed.type = 'audio';
            parsed.audioUrl = url;
        } else {
            parsed.type = 'link';
        }
    } catch (e) {
        parsed = { url: url, title: url, type: 'link' };
    }
    return parsed;
}


// ============================================================================
// v5 Periodic Tasks & Schedulers
// ============================================================================

// Scheduled Message Processor - runs every 15 seconds
setInterval(function() {
    var now = Date.now();
    var toSend = [];
    var remaining = [];

    scheduledMessages.forEach(function(msg) {
        if (msg.sendAt <= now) {
            toSend.push(msg);
        } else {
            remaining.push(msg);
        }
    });

    if (toSend.length > 0) {
        scheduledMessages = remaining;
        saveScheduledMessages();

        toSend.forEach(function(msg) {
            var messageData = {
                id: generateToken(12),
                text: msg.text,
                username: msg.username,
                room: msg.room,
                timestamp: Date.now(),
                type: 'scheduled',
                isScheduled: true
            };

            // Store in room history
            var roomMsgs = messageHistory.get(msg.room) || [];
            roomMsgs.push(messageData);
            messageHistory.set(msg.room, roomMsgs);
            saveMessages();

            // Broadcast to room
            io.to(msg.room).emit('message', messageData);

            // Track analytics
            trackMessageAnalytics(msg.text, msg.username);

            // Log
            addAuditEntry('scheduled_message_sent', msg.username, 'Scheduled message delivered to ' + msg.room);
        });
    }
}, 15000);

// Scheduled Events Processor - runs every 30 seconds
setInterval(function() {
    var now = Date.now();
    var changed = false;

    scheduledEvents.forEach(function(event) {
        if (!event.notified && event.startTime <= now + 300000 && event.startTime > now) {
            // 5-minute warning
            io.to(event.room).emit('notification', {
                type: 'event_reminder',
                message: 'Event "' + event.title + '" starts in 5 minutes!',
                event: event
            });
            event.notified5min = true;
            changed = true;
        }

        if (!event.started && event.startTime <= now) {
            event.started = true;
            changed = true;
            io.to(event.room).emit('notification', {
                type: 'event_start',
                message: 'Event "' + event.title + '" has started!',
                event: event
            });
            io.to(event.room).emit('systemMessage', {
                text: '🎉 Event "' + event.title + '" is now live!',
                room: event.room,
                timestamp: Date.now()
            });
        }

        if (event.endTime && event.endTime <= now && !event.ended) {
            event.ended = true;
            changed = true;
            io.to(event.room).emit('notification', {
                type: 'event_end',
                message: 'Event "' + event.title + '" has ended.',
                event: event
            });
        }
    });

    if (changed) saveScheduledEvents();
}, 30000);

// Daily Reset Timer - midnight
setInterval(function() {
    var now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetDailyAnalytics();
        saveChatAnalytics();
        addAuditEntry('system', 'server', 'Daily analytics reset');

        // Reset daily XP for all users
        userXPDetails.forEach(function(data, username) {
            data.dailyXP = 0;
        });
        saveUserXP();

        // Clean up expired invites
        var expiredInvites = [];
        roomInvites.forEach(function(invite, code) {
            if (invite.expiresAt && invite.expiresAt < Date.now()) {
                expiredInvites.push(code);
            }
        });
        expiredInvites.forEach(function(code) { roomInvites.delete(code); });
        if (expiredInvites.length > 0) {
            saveRoomInvites();
            addAuditEntry('system', 'server', 'Cleaned ' + expiredInvites.length + ' expired invites');
        }

        // Clean up ended events
        var activeEvents = scheduledEvents.filter(function(e) { return !e.ended; });
        if (activeEvents.length !== scheduledEvents.length) {
            scheduledEvents = activeEvents;
            saveScheduledEvents();
        }
    }
}, 60000);

// Analytics Save Timer - every 5 minutes
setInterval(function() {
    saveChatAnalytics();
}, 300000);

// Presence Heartbeat Checker - every 2 minutes
setInterval(function() {
    var now = Date.now();
    var timeout = 5 * 60 * 1000; // 5 minutes

    onlineUsers.forEach(function(userData, username) {
        var presence = userPresence.get(username);
        if (presence && presence.lastHeartbeat) {
            if (now - presence.lastHeartbeat > timeout) {
                // Mark as away
                if (presence.status !== 'dnd') {
                    presence.status = 'away';
                    presence.autoAway = true;
                    io.emit('userPresenceUpdate', {
                        username: username,
                        status: 'away',
                        autoAway: true
                    });
                }
            }
        }
    });
}, 120000);


// ============================================================================
// v5 Message Search Engine
// ============================================================================

function searchMessages(query, options) {
    options = options || {};
    var results = [];
    var limit = options.limit || 50;
    var room = options.room || null;
    var author = options.author || null;
    var before = options.before || null;
    var after = options.after || null;
    var hasFile = options.hasFile || false;
    var hasImage = options.hasImage || false;
    var hasPoll = options.hasPoll || false;
    var hasLink = options.hasLink || false;
    var sortBy = options.sortBy || 'relevance'; // relevance, newest, oldest

    var searchRegex;
    try {
        // Escape special regex chars but allow * as wildcard
        var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*');
        searchRegex = new RegExp(escaped, 'i');
    } catch (e) {
        searchRegex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }

    var roomsToSearch = room ? [room] : Object.keys(roomMessages);

    roomsToSearch.forEach(function(roomId) {
        var messages = roomMessages[roomId] || [];
        messages.forEach(function(msg) {
            if (!msg.text) return;

            // Apply filters
            if (author && msg.username !== author) return;
            if (before && msg.timestamp > before) return;
            if (after && msg.timestamp < after) return;
            if (hasFile && !msg.fileUrl) return;
            if (hasImage && !msg.imageUrl && !(msg.fileUrl && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(msg.fileUrl))) return;
            if (hasPoll && msg.type !== 'poll') return;
            if (hasLink && !/https?:\/\/[^\s]+/.test(msg.text)) return;

            // Match query
            if (searchRegex.test(msg.text) || searchRegex.test(msg.username)) {
                var relevanceScore = 0;

                // Exact match boost
                if (msg.text.toLowerCase().includes(query.toLowerCase())) {
                    relevanceScore += 10;
                }

                // Username match boost
                if (msg.username.toLowerCase() === query.toLowerCase()) {
                    relevanceScore += 5;
                }

                // Recency boost (last 24h = +3, last week = +2, last month = +1)
                var age = Date.now() - msg.timestamp;
                if (age < 86400000) relevanceScore += 3;
                else if (age < 604800000) relevanceScore += 2;
                else if (age < 2592000000) relevanceScore += 1;

                results.push({
                    message: msg,
                    room: roomId,
                    relevanceScore: relevanceScore,
                    matchedText: highlightMatch(msg.text, query)
                });
            }
        });
    });

    // Sort results
    if (sortBy === 'newest') {
        results.sort(function(a, b) { return b.message.timestamp - a.message.timestamp; });
    } else if (sortBy === 'oldest') {
        results.sort(function(a, b) { return a.message.timestamp - b.message.timestamp; });
    } else {
        results.sort(function(a, b) { return b.relevanceScore - a.relevanceScore; });
    }

    return results.slice(0, limit);
}

function highlightMatch(text, query) {
    try {
        var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp('(' + escaped + ')', 'gi'), '**$1**');
    } catch (e) {
        return text;
    }
}


// ============================================================================
// v5 Welcome Message System
// ============================================================================

var welcomeMessages = new Map(); // roomId -> { enabled, message, showRules, rules }
var welcomeData = loadJSON('welcome_messages.json');
if (welcomeData && typeof welcomeData === 'object') {
    Object.entries(welcomeData).forEach(function(entry) {
        welcomeMessages.set(entry[0], entry[1]);
    });
}

function saveWelcomeMessages() {
    saveJSON('welcome_messages.json', Object.fromEntries(welcomeMessages));
}

function sendWelcomeMessage(socket, username, room) {
    var welcome = welcomeMessages.get(room);
    if (!welcome || !welcome.enabled) return;

    var text = welcome.message
        .replace('{username}', username)
        .replace('{room}', room)
        .replace('{memberCount}', (io.sockets.adapter.rooms.get(room) || { size: 0 }).size)
        .replace('{date}', new Date().toLocaleDateString());

    socket.emit('systemMessage', {
        text: text,
        room: room,
        timestamp: Date.now(),
        isWelcome: true
    });

    if (welcome.showRules && welcome.rules) {
        socket.emit('systemMessage', {
            text: '📜 **Room Rules:**\n' + welcome.rules,
            room: room,
            timestamp: Date.now(),
            isRules: true
        });
    }
}


// ============================================================================
// v5 Word Filter / Moderation Tools
// ============================================================================

var wordFilter = {
    enabled: false,
    words: [],
    action: 'mask', // mask, block, warn
    maskChar: '*',
    exemptRoles: ['admin'],
    customRegex: []
};
var filterData = loadJSON('word_filter.json');
if (filterData && typeof filterData === 'object') {
    Object.assign(wordFilter, filterData);
}

function saveWordFilter() {
    saveJSON('word_filter.json', wordFilter);
}

function applyWordFilter(text, username) {
    if (!wordFilter.enabled) return { text: text, filtered: false };

    var role = getUserRole(username);
    if (wordFilter.exemptRoles.includes(role)) return { text: text, filtered: false };

    var filtered = false;
    var resultText = text;

    // Check custom regex patterns
    wordFilter.customRegex.forEach(function(pattern) {
        try {
            var regex = new RegExp(pattern, 'gi');
            if (regex.test(resultText)) {
                filtered = true;
                if (wordFilter.action === 'mask') {
                    resultText = resultText.replace(regex, function(match) {
                        return wordFilter.maskChar.repeat(match.length);
                    });
                }
            }
        } catch (e) { /* invalid regex, skip */ }
    });

    // Check word list
    wordFilter.words.forEach(function(word) {
        var escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var regex = new RegExp('\\b' + escaped + '\\b', 'gi');
        if (regex.test(resultText)) {
            filtered = true;
            if (wordFilter.action === 'mask') {
                resultText = resultText.replace(regex, function(match) {
                    return wordFilter.maskChar.repeat(match.length);
                });
            }
        }
    });

    return { text: resultText, filtered: filtered };
}


// ============================================================================
// v5 Rate Limiter
// ============================================================================

var rateLimits = new Map(); // socketId -> { messages: [], commands: [], uploads: [] }

function checkRateLimit(socketId, type, limit, window) {
    if (!rateLimits.has(socketId)) {
        rateLimits.set(socketId, { messages: [], commands: [], uploads: [] });
    }

    var limits = rateLimits.get(socketId);
    if (!limits[type]) limits[type] = [];

    var now = Date.now();
    // Clean old entries
    limits[type] = limits[type].filter(function(t) { return now - t < window; });

    if (limits[type].length >= limit) {
        return false; // Rate limited
    }

    limits[type].push(now);
    return true;
}

// Rate limit config
var RATE_LIMITS = {
    messages: { limit: 10, window: 10000 },    // 10 messages per 10 seconds
    commands: { limit: 5, window: 10000 },      // 5 commands per 10 seconds
    uploads: { limit: 3, window: 60000 },       // 3 uploads per minute
    reactions: { limit: 20, window: 10000 },     // 20 reactions per 10 seconds
    searches: { limit: 5, window: 30000 },       // 5 searches per 30 seconds
    invites: { limit: 3, window: 300000 },       // 3 invites per 5 minutes
    roomCreation: { limit: 2, window: 600000 }   // 2 rooms per 10 minutes
};


// ============================================================================
// v5 Additional REST API Endpoints
// ============================================================================

// User achievements
app.get('/api/users/:username/achievements', function(req, res) {
    var username = req.params.username;
    var userAch = achievements.get(username) || [];
    res.json({
        username: username,
        achievements: userAch,
        total: Object.keys(ACHIEVEMENT_DEFS).length,
        earned: userAch.length,
        progress: Math.round((userAch.length / Object.keys(ACHIEVEMENT_DEFS).length) * 100) + '%'
    });
});

// Server analytics (admin only - basic version for public)
app.get('/api/analytics', function(req, res) {
    res.json({
        messagesPerHour: chatAnalytics.messagesByHour,
        messagesPerDay: chatAnalytics.messagesByDay,
        averageMessageLength: chatAnalytics.averageMessageLength,
        topEmojis: Object.entries(chatAnalytics.topEmojis)
            .sort(function(a, b) { return b[1] - a[1]; })
            .slice(0, 10)
            .reduce(function(obj, e) { obj[e[0]] = e[1]; return obj; }, {}),
        peakConcurrent: chatAnalytics.peakConcurrentToday,
        totalLinks: chatAnalytics.linkCount,
        totalImages: chatAnalytics.imageCount,
        totalFiles: chatAnalytics.fileCount,
        totalReactions: chatAnalytics.reactionCount
    });
});

// Active rooms
app.get('/api/rooms/active', function(req, res) {
    var rooms = [];
    var allRoomIds = new Set(Object.keys(roomMessages));
    customRooms.forEach(function(room, id) { allRoomIds.add(id); });
    allRoomIds.add('general');

    allRoomIds.forEach(function(roomId) {
        var msgs = roomMessages[roomId] || [];
        var recentCount = msgs.filter(function(m) { return Date.now() - m.timestamp < 86400000; }).length;
        var memberCount = (io.sockets.adapter.rooms.get(roomId) || { size: 0 }).size;
        var room = customRooms.get(roomId);

        rooms.push({
            id: roomId,
            name: room ? room.name : roomId,
            description: room ? room.description : '',
            members: memberCount,
            totalMessages: msgs.length,
            recentMessages: recentCount,
            lastActivity: msgs.length > 0 ? msgs[msgs.length - 1].timestamp : 0,
            category: room ? (room.category || 'general') : 'general'
        });
    });

    rooms.sort(function(a, b) { return b.recentMessages - a.recentMessages; });
    res.json(rooms);
});

// Online users summary
app.get('/api/online', function(req, res) {
    var users = [];
    onlineUsers.forEach(function(userData, username) {
        var presence = userPresence.get(username);
        users.push({
            username: username,
            status: presence ? presence.status : 'online',
            customStatus: presence ? presence.customStatus : null,
            room: userData.room || 'general'
        });
    });
    res.json({ count: users.length, users: users });
});

// Server uptime
app.get('/api/uptime', function(req, res) {
    var uptimeMs = process.uptime() * 1000;
    var hours = Math.floor(uptimeMs / 3600000);
    var minutes = Math.floor((uptimeMs % 3600000) / 60000);
    var seconds = Math.floor((uptimeMs % 60000) / 1000);

    res.json({
        uptimeMs: uptimeMs,
        formatted: hours + 'h ' + minutes + 'm ' + seconds + 's',
        startedAt: new Date(Date.now() - uptimeMs).toISOString(),
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsage: process.memoryUsage()
    });
});

// Room invite info (public)
app.get('/api/invite/:code', function(req, res) {
    var code = req.params.code;
    var invite = roomInvites.get(code);
    if (!invite) return res.status(404).json({ error: 'Invite not found or expired' });
    if (invite.expiresAt && invite.expiresAt < Date.now()) {
        roomInvites.delete(code);
        saveRoomInvites();
        return res.status(410).json({ error: 'Invite expired' });
    }
    if (invite.maxUses && invite.uses >= invite.maxUses) {
        return res.status(410).json({ error: 'Invite has reached max uses' });
    }

    var room = customRooms.get(invite.roomId);
    res.json({
        code: code,
        roomId: invite.roomId,
        roomName: room ? room.name : invite.roomId,
        description: room ? room.description : '',
        creator: invite.creator,
        members: (io.sockets.adapter.rooms.get(invite.roomId) || { size: 0 }).size,
        uses: invite.uses || 0,
        maxUses: invite.maxUses || 'unlimited',
        expiresAt: invite.expiresAt
    });
});


// ============================================================================
// v5 Graceful Shutdown
// ============================================================================

function gracefulShutdown(signal) {
    console.log('\n[' + signal + '] Shutting down RedChat gracefully...');

    // Save all data
    saveAccounts();
    saveMessages();
    saveCustomRooms();
    saveFriends();
    saveBans();
    saveReports();
    saveThreads();
    saveScheduledMessages();
    saveAchievements();
    saveCustomEmojis();
    saveBlockLists();
    saveRoomInvites();
    saveReadReceipts();
    saveSlowMode();
    saveScheduledEvents();
    saveAutoResponses();
    saveNotificationPrefs();
    saveRoomPermissions();
    saveUserXP();
    saveChatAnalytics();
    saveUserProfiles();
    saveAuditLog();
    saveReactionStats();
    saveUserSessions();
    saveTopicHistory();
    saveServerWarnings();
    saveSavedMessages();
    saveChannelCategories();
    saveUserPresence();
    saveWordFilter();
    saveWelcomeMessages();

    // Log final session for all online users
    onlineUsers.forEach(function(userData, username) {
        var sessions = userSessions.get(username) || [];
        var lastSession = sessions[sessions.length - 1];
        if (lastSession && !lastSession.logoutAt) {
            lastSession.logoutAt = Date.now();
            lastSession.duration = lastSession.logoutAt - lastSession.loginAt;
        }
    });
    saveUserSessions();

    // Close server
    server.close(function() {
        console.log('Server closed. All data saved.');
        process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(function() {
        console.log('Forced shutdown after timeout.');
        process.exit(1);
    }, 10000);
}

process.on('SIGTERM', function() { gracefulShutdown('SIGTERM'); });
process.on('SIGINT', function() { gracefulShutdown('SIGINT'); });

// Uncaught exception handler
process.on('uncaughtException', function(err) {
    console.error('[FATAL] Uncaught exception:', err);
    addAuditEntry('error', 'server', 'Uncaught exception: ' + err.message);
    saveAuditLog();
    // Don't exit — try to keep running
});

process.on('unhandledRejection', function(reason) {
    console.error('[WARN] Unhandled rejection:', reason);
    addAuditEntry('warning', 'server', 'Unhandled rejection: ' + String(reason));
});


// ============================================================================
// v5 Server Health Monitor — Detailed Endpoint
// ============================================================================

app.get('/api/health/detailed', function(req, res) {
    var memUsage = process.memoryUsage();
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        memory: {
            rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
            heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
            heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
            external: Math.round(memUsage.external / 1024 / 1024) + 'MB'
        },
        connections: {
            users: onlineUsers.size,
            sockets: io.sockets.sockets.size
        },
        data: {
            accounts: accounts.size,
            rooms: customRooms.size,
            threads: threads.size,
            emojis: customEmojis.size,
            events: scheduledEvents.length,
            invites: roomInvites.size,
            auditLogSize: auditLog.length
        },
        performance: {
            totalRequests: healthMetrics.requestsTotal,
            avgResponseTime: healthMetrics.avgResponseTime + 'ms',
            totalSocketEvents: healthMetrics.socketEventsTotal,
            totalErrors: healthMetrics.errorsTotal
        }
    });
});

