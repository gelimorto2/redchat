const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();
const httpOptions = {
};

const server = http.createServer(httpOptions, app);
const io = socketIo(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST']
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  maxHttpBufferSize: 1e8 // 100 MB
});

const PORT = process.env.PORT || 3000;

// =============================================================================
// SECURITY MIDDLEWARE
// =============================================================================

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "http://fonts.googleapis.com", "http://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "http://fonts.gstatic.com", "http://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "http://cdnjs.cloudflare.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:", "http:"],
      connectSrc: ["'self'", "wss:", "ws:"],
      mediaSrc: ["'self'", "blob:"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

// Compression
app.use(compression());

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: 'Too many uploads, please slow down' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: 'Too many login attempts, please try again later' }
});

// =============================================================================
// DIRECTORY SETUP
// =============================================================================

const uploadsDir = path.join(__dirname, 'public', 'uploads');
const dataDir = path.join(__dirname, 'data');
const logsDir = path.join(__dirname, 'logs');

[uploadsDir, dataDir, logsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const accountsFile = path.join(dataDir, 'accounts.json');
const avatarsFile = path.join(dataDir, 'avatars.json');
const stickersFile = path.join(dataDir, 'stickers.json');
const roomsFile = path.join(dataDir, 'rooms.json');
const messagesFile = path.join(dataDir, 'messages.json');
const reactionsFile = path.join(dataDir, 'reactions.json');
const readReceiptsFile = path.join(dataDir, 'read_receipts.json');

// =============================================================================
// PASSWORD HASHING UTILITIES
// =============================================================================

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) {
    // Legacy plain-text password check
    return password === storedHash;
  }
  const [salt, hash] = storedHash.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function generateMessageId() {
  return `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
}

// =============================================================================
// MULTER CONFIGURATION
// =============================================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'video/mp4', 'video/webm', 'video/ogg',
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/mp4',
    'application/pdf', 'text/plain',
    'application/zip', 'application/x-rar-compressed'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB
  }
});

// =============================================================================
// MIDDLEWARE
// =============================================================================

app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// =============================================================================
// DATA STORES
// =============================================================================

const users = new Map();
const userAvatars = loadAvatars();
const accounts = loadAccounts();
const userStickers = loadStickers();
const customRooms = loadRooms();
const chatHistory = loadMessages();
const messageReactions = loadReactions();
const readReceipts = loadReadReceipts();
const friendships = new Map();
const friendRequests = new Map();
const roomMembers = new Map();
const typingUsers = new Map();
const userSessions = new Map(); // Track active sessions
const blockedUsers = new Map(); // Track blocked users
const pinnedMessages = new Map(); // Track pinned messages per room

const adminUsers = new Set(['gelimorto']);

// =============================================================================
// PREDEFINED ROOMS
// =============================================================================

const PREDEFINED_ROOMS = [
  { id: 'general', name: 'General', description: 'Main chat for everyone', icon: 'fa-comments', color: '#667eea' },
  { id: 'gaming', name: 'Gaming', description: 'Talk about games', icon: 'fa-gamepad', color: '#e74c3c' },
  { id: 'music', name: 'Music', description: 'Share and discuss music', icon: 'fa-music', color: '#9b59b6' },
  { id: 'tech', name: 'Tech', description: 'Technology discussions', icon: 'fa-laptop-code', color: '#3498db' },
  { id: 'movies', name: 'Movies & TV', description: 'Film and television chat', icon: 'fa-film', color: '#e67e22' },
  { id: 'random', name: 'Random', description: 'Off-topic conversations', icon: 'fa-random', color: '#1abc9c' },
  { id: 'memes', name: 'Memes', description: 'Share funny memes', icon: 'fa-laugh-squint', color: '#f39c12' },
  { id: 'art', name: 'Art & Creative', description: 'Share your creations', icon: 'fa-palette', color: '#e91e63' }
];

// Initialize predefined rooms
PREDEFINED_ROOMS.forEach(room => {
  if (!customRooms.has(room.id)) {
    customRooms.set(room.id, {
      id: room.id,
      name: room.name,
      description: room.description,
      icon: room.icon,
      color: room.color,
      isPublic: true,
      members: new Set(),
      createdBy: 'system',
      createdAt: new Date()
    });
  } else {
    const existing = customRooms.get(room.id);
    Object.assign(existing, { name: room.name, description: room.description, icon: room.icon, color: room.color, isPublic: true });
  }
  
  if (!chatHistory.has(room.id)) {
    chatHistory.set(room.id, new Map());
  }
});

// Initialize room members from customRooms
customRooms.forEach((room, id) => {
  if (!chatHistory.has(id)) chatHistory.set(id, new Map());
  if (room.members) {
    room.members.forEach(username => {
      if (!roomMembers.has(username)) roomMembers.set(username, new Set());
      roomMembers.get(username).add(id);
    });
  }
});

// =============================================================================
// DATA PERSISTENCE FUNCTIONS
// =============================================================================

function loadAvatars() {
  try {
    if (fs.existsSync(avatarsFile)) {
      const data = JSON.parse(fs.readFileSync(avatarsFile, 'utf8'));
      console.log(`🖼️  Loaded ${Object.keys(data).length} avatars`);
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.error('Error loading avatars:', error.message);
  }
  return new Map();
}

function saveAvatars() {
  try {
    const data = Object.fromEntries(userAvatars);
    fs.writeFileSync(avatarsFile, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving avatars:', error.message);
  }
}

function loadStickers() {
  try {
    if (fs.existsSync(stickersFile)) {
      const data = JSON.parse(fs.readFileSync(stickersFile, 'utf8'));
      console.log(`🎨 Loaded stickers for ${Object.keys(data).length} users`);
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.error('Error loading stickers:', error.message);
  }
  return new Map();
}

function saveStickers() {
  try {
    const data = Object.fromEntries(userStickers);
    fs.writeFileSync(stickersFile, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving stickers:', error.message);
  }
}

function loadAccounts() {
  try {
    if (fs.existsSync(accountsFile)) {
      const data = JSON.parse(fs.readFileSync(accountsFile, 'utf8'));
      const accountsMap = new Map();
      for (const [username, account] of Object.entries(data)) {
        accountsMap.set(username, {
          ...account,
          createdAt: new Date(account.createdAt || account.created),
          lastLogin: new Date(account.lastLogin)
        });
      }
      console.log(`📁 Loaded ${accountsMap.size} accounts`);
      return accountsMap;
    }
  } catch (error) {
    console.error('Error loading accounts:', error.message);
  }
  return new Map();
}

function saveAccounts() {
  try {
    const data = Object.fromEntries(accounts);
    fs.writeFileSync(accountsFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving accounts:', error.message);
  }
}

function loadRooms() {
  try {
    if (fs.existsSync(roomsFile)) {
      const data = JSON.parse(fs.readFileSync(roomsFile, 'utf8'));
      const roomsMap = new Map();
      for (const [id, room] of Object.entries(data)) {
        roomsMap.set(id, {
          ...room,
          members: new Set(room.members || []),
          createdAt: new Date(room.createdAt)
        });
      }
      console.log(`🏠 Loaded ${roomsMap.size} rooms`);
      return roomsMap;
    }
  } catch (error) {
    console.error('Error loading rooms:', error.message);
  }
  return new Map();
}

function saveRooms() {
  try {
    const data = {};
    for (const [id, room] of customRooms.entries()) {
      data[id] = { ...room, members: Array.from(room.members) };
    }
    fs.writeFileSync(roomsFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving rooms:', error.message);
  }
}

function loadMessages() {
  try {
    if (fs.existsSync(messagesFile)) {
      const data = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
      const historyMap = new Map();
      for (const [roomId, messages] of Object.entries(data)) {
        const messageMap = new Map();
        if (Array.isArray(messages)) {
          messages.forEach(msg => messageMap.set(msg.id, msg));
        }
        historyMap.set(roomId, messageMap);
      }
      console.log(`💬 Loaded history for ${historyMap.size} rooms`);
      return historyMap;
    }
  } catch (error) {
    console.error('Error loading messages:', error.message);
  }
  return new Map();
}

function saveMessages() {
  try {
    const data = {};
    for (const [roomId, messageMap] of chatHistory.entries()) {
      const messages = Array.from(messageMap.values()).slice(-100); // Keep last 100
      if (messages.length > 0) data[roomId] = messages;
    }
    fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving messages:', error.message);
  }
}

function loadReactions() {
  try {
    if (fs.existsSync(reactionsFile)) {
      const data = JSON.parse(fs.readFileSync(reactionsFile, 'utf8'));
      console.log(`👍 Loaded reactions data`);
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.error('Error loading reactions:', error.message);
  }
  return new Map();
}

function saveReactions() {
  try {
    const data = Object.fromEntries(messageReactions);
    fs.writeFileSync(reactionsFile, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving reactions:', error.message);
  }
}

function loadReadReceipts() {
  try {
    if (fs.existsSync(readReceiptsFile)) {
      const data = JSON.parse(fs.readFileSync(readReceiptsFile, 'utf8'));
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.error('Error loading read receipts:', error.message);
  }
  return new Map();
}

function saveReadReceipts() {
  try {
    const data = Object.fromEntries(readReceipts);
    fs.writeFileSync(readReceiptsFile, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving read receipts:', error.message);
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function getRoomsForUser(username) {
  const userRoomsSet = roomMembers.get(username) || new Set();
  const result = [];
  
  for (const [id, room] of customRooms.entries()) {
    const isMember = userRoomsSet.has(id);
    if (room.isPublic || isMember) {
      result.push({
        id: room.id,
        name: room.name,
        description: room.description,
        icon: room.icon || 'fa-hashtag',
        color: room.color || '#667eea',
        memberCount: room.members ? room.members.size : 0,
        isPublic: room.isPublic,
        joined: isMember,
        creator: room.creator,
        createdAt: room.createdAt
      });
    }
  }
  return result;
}

function sanitizeMessage(message) {
  if (typeof message !== 'string') return '';
  return message
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .substring(0, 5000); // Max message length
}

function extractMentions(message) {
  const mentionRegex = /@(\w+)/g;
  const mentions = [];
  let match;
  while ((match = mentionRegex.exec(message)) !== null) {
    mentions.push(match[1]);
  }
  return mentions;
}

function logActivity(type, data) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type,
    ...data
  };
  
  const logFile = path.join(logsDir, `activity-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFile(logFile, JSON.stringify(logEntry) + '\n', err => {
    if (err) console.error('Logging error:', err.message);
  });
}

function broadcastUserList() {
  const userList = Array.from(users.values()).map(user => ({
    username: user.username,
    id: user.id,
    joinTime: user.joinTime,
    isAdmin: user.isAdmin,
    avatar: userAvatars.get(user.username) || null,
    status: user.status || 'online',
    nameColor: accounts.get(user.username)?.nameColor || null
  }));
  io.emit('userListUpdate', userList);
}

// =============================================================================
// HTTP ROUTES
// =============================================================================

app.post('/upload', uploadLimiter, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileExt = path.extname(req.file.originalname).toLowerCase();
  const mimeType = req.file.mimetype;
  
  let fileType = 'other';
  if (mimeType.startsWith('image/')) fileType = 'image';
  else if (mimeType.startsWith('video/')) fileType = 'video';
  else if (mimeType.startsWith('audio/')) fileType = 'audio';
  else if (mimeType === 'application/pdf' || mimeType === 'text/plain') fileType = 'document';

  res.json({
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: `/uploads/${req.file.filename}`,
    type: fileType,
    size: req.file.size,
    mimeType
  });
});

// Voice message upload endpoint
app.post('/upload/voice', uploadLimiter, upload.single('voice'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No voice file uploaded' });
  }

  res.json({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    type: 'voice',
    size: req.file.size,
    duration: req.body.duration || 0
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    connections: users.size,
    rooms: customRooms.size,
    timestamp: new Date().toISOString()
  });
});

// API: Search messages
app.get('/api/search', apiLimiter, (req, res) => {
  const { q, room, user } = req.query;
  if (!q || q.length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }

  const results = [];
  const searchLower = q.toLowerCase();
  
  const searchRoom = (roomId, messageMap) => {
    for (const [id, msg] of messageMap) {
      if (room && roomId !== room) continue;
      if (user && msg.username !== user) continue;
      if (msg.message && msg.message.toLowerCase().includes(searchLower)) {
        results.push({ ...msg, roomId });
        if (results.length >= 50) return true;
      }
    }
    return false;
  };

  for (const [roomId, messageMap] of chatHistory) {
    if (searchRoom(roomId, messageMap)) break;
  }

  res.json({ results, count: results.length });
});

// =============================================================================
// SOCKET.IO HANDLERS
// =============================================================================

// Rate limiting for socket events
const socketRateLimits = new Map();

function checkRateLimit(socketId, event, limit = 10, window = 1000) {
  const key = `${socketId}:${event}`;
  const now = Date.now();
  const record = socketRateLimits.get(key) || { count: 0, resetAt: now + window };
  
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + window;
  } else {
    record.count++;
  }
  
  socketRateLimits.set(key, record);
  return record.count <= limit;
}

io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // =========================================================================
  // AUTHENTICATION
  // =========================================================================

  socket.on('login', (data) => {
    if (!checkRateLimit(socket.id, 'login', 5, 60000)) {
      socket.emit('error', 'Too many login attempts. Please wait.');
      return;
    }

    const { username, password, captcha } = data;

    if (!username || username.trim() === '') {
      socket.emit('error', 'Username is required');
      return;
    }

    if (username.length > 20) {
      socket.emit('error', 'Username must be 20 characters or less');
      return;
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      socket.emit('error', 'Username can only contain letters, numbers, and underscores');
      return;
    }

    const cleanUsername = username.trim();

    // Check if already online
    const existingUser = Array.from(users.values()).find(u => u.username === cleanUsername);
    if (existingUser) {
      socket.emit('error', 'Username already online');
      return;
    }

    const existingAccount = accounts.get(cleanUsername);

    if (existingAccount) {
      if (!password || !verifyPassword(password, existingAccount.password)) {
        socket.emit('error', 'Invalid password');
        return;
      }

      existingAccount.lastLogin = new Date();
      existingAccount.loginCount = (existingAccount.loginCount || 0) + 1;
      existingAccount.status = 'online';
      
      // Migrate plain-text password to hashed
      if (!existingAccount.password.includes(':')) {
        existingAccount.password = hashPassword(password);
      }
      
      saveAccounts();
    } else {
      // New account
      if (captcha === undefined) {
        socket.emit('error', 'Please complete the security check');
        return;
      }

      const newPassword = password || Math.random().toString(36).substring(2, 15);
      
      accounts.set(cleanUsername, {
        username: cleanUsername,
        password: hashPassword(newPassword),
        createdAt: new Date(),
        lastLogin: new Date(),
        loginCount: 1,
        settings: {
          theme: 'dark',
          soundEnabled: true,
          notifications: true,
          compactMode: false,
          showTimestamps: true
        },
        stats: { messagesSent: 0, filesShared: 0, reactionsGiven: 0 },
        bio: '',
        nameColor: null,
        status: 'online',
        blockedUsers: []
      });

      saveAccounts();
      logActivity('account_created', { username: cleanUsername });

      if (!password) {
        socket.emit('accountCreated', { username: cleanUsername, autoPassword: newPassword });
      }
    }

    // Setup user session
    const sessionToken = generateToken();
    users.set(socket.id, {
      username: cleanUsername,
      id: socket.id,
      joinTime: new Date(),
      isAdmin: adminUsers.has(cleanUsername.toLowerCase()),
      status: 'online',
      sessionToken
    });

    userSessions.set(cleanUsername, { socketId: socket.id, token: sessionToken });
    socket.username = cleanUsername;
    socket.join('general');

    // Initialize user data
    if (!chatHistory.has(cleanUsername)) chatHistory.set(cleanUsername, new Map());
    if (!friendships.has(cleanUsername)) friendships.set(cleanUsername, new Set());
    if (!friendRequests.has(cleanUsername)) friendRequests.set(cleanUsername, { sent: new Set(), received: new Set() });
    if (!roomMembers.has(cleanUsername)) roomMembers.set(cleanUsername, new Set());

    // Load blocked users
    const account = accounts.get(cleanUsername);
    if (account?.blockedUsers) {
      blockedUsers.set(cleanUsername, new Set(account.blockedUsers));
    }

    // Auto-join predefined rooms
    const userRooms = roomMembers.get(cleanUsername);
    PREDEFINED_ROOMS.forEach(room => {
      if (!userRooms.has(room.id)) {
        userRooms.add(room.id);
        customRooms.get(room.id)?.members.add(cleanUsername);
      }
    });

    // Join all rooms
    userRooms.forEach(roomId => socket.join(roomId));

    // Send success response
    socket.emit('joinSuccess', {
      username: cleanUsername,
      sessionToken,
      isAdmin: adminUsers.has(cleanUsername.toLowerCase()),
      settings: account?.settings || {},
      knownAvatars: Array.from(userAvatars.entries())
    });

    // Sync stickers
    if (userStickers.has(cleanUsername)) {
      socket.emit('syncStickers', { stickers: userStickers.get(cleanUsername) });
    }

    // Send room list and chat history
    socket.emit('roomsUpdate', getRoomsForUser(cleanUsername));
    
    const generalHistory = chatHistory.get('general') || new Map();
    socket.emit('chatHistory', {
      room: 'general',
      messages: Array.from(generalHistory.values()).slice(-50)
    });

    // Send friends data
    const userFriends = Array.from(friendships.get(cleanUsername) || []);
    socket.emit('friendsUpdate', userFriends.map(friendName => ({
      username: friendName,
      online: Array.from(users.values()).some(u => u.username === friendName)
    })));

    const userRequests = friendRequests.get(cleanUsername) || { sent: new Set(), received: new Set() };
    socket.emit('friendRequestsUpdate', {
      sent: Array.from(userRequests.sent),
      received: Array.from(userRequests.received)
    });

    // Broadcast user list
    broadcastUserList();

    logActivity('login', { username: cleanUsername });
    console.log(`✅ ${cleanUsername} joined the chat`);
  });

  // =========================================================================
  // MESSAGING
  // =========================================================================

  socket.on('message', (data) => {
    if (!socket.username) {
      socket.emit('error', 'You must log in first');
      return;
    }

    if (!checkRateLimit(socket.id, 'message', 30, 10000)) {
      socket.emit('error', 'Slow down! Too many messages.');
      return;
    }

    const roomId = data.room || 'general';
    const isPredefinedRoom = PREDEFINED_ROOMS.some(r => r.id === roomId);
    const isCustomRoom = customRooms.has(roomId);

    if (!isPredefinedRoom && !isCustomRoom) {
      socket.emit('error', 'Room not found');
      return;
    }

    // Check if user is a room member
    const userRooms = roomMembers.get(socket.username);
    if (!isPredefinedRoom && (!userRooms || !userRooms.has(roomId))) {
      socket.emit('error', 'You are not a member of this room');
      return;
    }

    const sanitizedMessage = sanitizeMessage(data.message);
    if (!sanitizedMessage && !data.isSticker) {
      return;
    }

    // Handle slash commands
    if (sanitizedMessage.startsWith('/')) {
      const handled = handleSlashCommand(socket, sanitizedMessage, roomId);
      if (handled) return;
    }

    // Extract mentions
    const mentions = extractMentions(sanitizedMessage);

    // Get sender info
    const senderAccount = accounts.get(socket.username);
    const nameColor = senderAccount?.nameColor || null;
    const avatar = userAvatars.get(socket.username) || null;

    const messageData = {
      id: generateMessageId(),
      username: socket.username,
      nameColor,
      avatar,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
      type: data.isSticker ? 'sticker' : 'text',
      isSticker: data.isSticker || false,
      isCustomSticker: data.isCustomSticker || false,
      room: roomId,
      mentions,
      edited: false,
      reactions: {}
    };

    // Handle replies
    if (data.replyTo) {
      const roomHistory = chatHistory.get(roomId);
      const originalMsg = roomHistory?.get(data.replyTo.id);
      messageData.replyTo = originalMsg
        ? { id: data.replyTo.id, username: originalMsg.username, message: originalMsg.message }
        : data.replyTo;
    }

    // Store message
    if (!chatHistory.has(roomId)) chatHistory.set(roomId, new Map());
    chatHistory.get(roomId).set(messageData.id, messageData);
    saveMessages();

    // Broadcast message
    io.to(roomId).emit('message', messageData);

    // Send mention notifications
    mentions.forEach(mentionedUsername => {
      const mentionedUser = Array.from(users.values()).find(u => u.username === mentionedUsername);
      if (mentionedUser && mentionedUser.username !== socket.username) {
        io.to(mentionedUser.id).emit('mentioned', {
          by: socket.username,
          room: roomId,
          messageId: messageData.id,
          preview: sanitizedMessage.substring(0, 100)
        });
      }
    });

    // Update stats
    if (senderAccount) {
      senderAccount.stats.messagesSent = (senderAccount.stats.messagesSent || 0) + 1;
      if (senderAccount.stats.messagesSent % 20 === 0) saveAccounts();
    }
  });

  // =========================================================================
  // MESSAGE REACTIONS
  // =========================================================================

  socket.on('addReaction', (data) => {
    if (!socket.username) return;
    
    const { messageId, roomId, emoji } = data;
    if (!messageId || !roomId || !emoji) return;

    const roomHistory = chatHistory.get(roomId);
    if (!roomHistory) return;

    const message = roomHistory.get(messageId);
    if (!message) return;

    // Initialize reactions
    if (!message.reactions) message.reactions = {};
    if (!message.reactions[emoji]) message.reactions[emoji] = [];

    // Toggle reaction
    const userIndex = message.reactions[emoji].indexOf(socket.username);
    if (userIndex > -1) {
      message.reactions[emoji].splice(userIndex, 1);
      if (message.reactions[emoji].length === 0) {
        delete message.reactions[emoji];
      }
    } else {
      message.reactions[emoji].push(socket.username);
    }

    saveMessages();

    // Broadcast reaction update
    io.to(roomId).emit('reactionUpdate', {
      messageId,
      roomId,
      reactions: message.reactions
    });

    // Update stats
    const account = accounts.get(socket.username);
    if (account) {
      account.stats.reactionsGiven = (account.stats.reactionsGiven || 0) + 1;
    }
  });

  // =========================================================================
  // MESSAGE EDITING & DELETION
  // =========================================================================

  socket.on('editMessage', (data) => {
    if (!socket.username) return;

    const { messageId, roomId, newContent } = data;
    if (!messageId || !roomId || !newContent) return;

    const roomHistory = chatHistory.get(roomId);
    if (!roomHistory) return;

    const message = roomHistory.get(messageId);
    if (!message) return;

    // Only allow editing own messages (or admin)
    if (message.username !== socket.username && !adminUsers.has(socket.username)) {
      socket.emit('error', 'Cannot edit this message');
      return;
    }

    // Check edit time limit (15 minutes)
    const messageAge = Date.now() - new Date(message.timestamp).getTime();
    if (messageAge > 15 * 60 * 1000 && !adminUsers.has(socket.username)) {
      socket.emit('error', 'Message too old to edit');
      return;
    }

    message.message = sanitizeMessage(newContent);
    message.edited = true;
    message.editedAt = new Date().toISOString();
    saveMessages();

    io.to(roomId).emit('messageEdited', {
      messageId,
      roomId,
      newContent: message.message,
      editedAt: message.editedAt
    });
  });

  socket.on('deleteMessage', (data) => {
    if (!socket.username) return;

    const { messageId, roomId } = data;
    if (!messageId || !roomId) return;

    const roomHistory = chatHistory.get(roomId);
    if (!roomHistory) return;

    const message = roomHistory.get(messageId);
    if (!message) return;

    // Only allow deleting own messages (or admin)
    if (message.username !== socket.username && !adminUsers.has(socket.username)) {
      socket.emit('error', 'Cannot delete this message');
      return;
    }

    roomHistory.delete(messageId);
    saveMessages();

    io.to(roomId).emit('messageDeleted', { messageId, roomId });
  });

  // =========================================================================
  // READ RECEIPTS
  // =========================================================================

  socket.on('markAsRead', (data) => {
    if (!socket.username) return;

    const { roomId, messageId } = data;
    const key = `${roomId}:${socket.username}`;
    
    readReceipts.set(key, {
      lastRead: messageId,
      timestamp: new Date().toISOString()
    });
    saveReadReceipts();

    // Notify room members
    socket.to(roomId).emit('readReceipt', {
      username: socket.username,
      roomId,
      messageId
    });
  });

  // =========================================================================
  // VOICE MESSAGES
  // =========================================================================

  socket.on('voiceMessage', (data) => {
    if (!socket.username) return;

    const roomId = data.room || 'general';
    const messageData = {
      id: generateMessageId(),
      username: socket.username,
      avatar: userAvatars.get(socket.username) || null,
      type: 'voice',
      voicePath: data.voicePath,
      duration: data.duration,
      timestamp: new Date().toISOString(),
      room: roomId,
      reactions: {}
    };

    if (!chatHistory.has(roomId)) chatHistory.set(roomId, new Map());
    chatHistory.get(roomId).set(messageData.id, messageData);
    saveMessages();

    io.to(roomId).emit('message', messageData);
  });

  // =========================================================================
  // DIRECT MESSAGES
  // =========================================================================

  socket.on('directMessage', (data) => {
    if (!socket.username) return;

    const targetUser = Array.from(users.values()).find(u => u.username === data.targetUsername);
    if (!targetUser) {
      socket.emit('error', 'User not found or offline');
      return;
    }

    // Check if blocked
    const targetBlocked = blockedUsers.get(data.targetUsername);
    if (targetBlocked?.has(socket.username)) {
      socket.emit('error', 'Cannot send message to this user');
      return;
    }

    const messageData = {
      id: generateMessageId(),
      username: socket.username,
      message: sanitizeMessage(data.message),
      timestamp: new Date().toISOString(),
      type: data.type || (data.isSticker ? 'sticker' : 'text'),
      isSticker: data.isSticker || false,
      room: data.targetUsername,
      isPrivate: true,
      reactions: {}
    };

    if (data.replyTo) {
      messageData.replyTo = data.replyTo;
    }

    const dmRoomId = [socket.username, data.targetUsername].sort().join('-dm-');
    if (!chatHistory.has(dmRoomId)) chatHistory.set(dmRoomId, new Map());
    chatHistory.get(dmRoomId).set(messageData.id, messageData);
    saveMessages();

    io.to(targetUser.id).emit('message', messageData);
    socket.emit('message', messageData);
  });

  // =========================================================================
  // PROFILE & SETTINGS
  // =========================================================================

  socket.on('updateProfilePic', (data) => {
    if (!socket.username || !data?.image) return;
    
    userAvatars.set(socket.username, data.image);
    saveAvatars();
    broadcastUserList();
    socket.emit('profileUpdated', { success: true, message: 'Profile picture updated!' });
  });

  socket.on('updateBio', (data) => {
    if (!socket.username) return;
    
    const account = accounts.get(socket.username);
    if (account) {
      account.bio = (data.bio || '').substring(0, 500);
      saveAccounts();
      socket.emit('profileUpdated', { success: true, message: 'Bio updated!' });
    }
  });

  socket.on('updateSettings', (data) => {
    if (!socket.username || !data?.settings) return;

    const account = accounts.get(socket.username);
    if (account) {
      account.settings = { ...account.settings, ...data.settings };
      saveAccounts();
      socket.emit('settingsUpdated', { success: true, settings: account.settings });
    }
  });

  socket.on('updateNameColor', (data) => {
    if (!socket.username) return;

    if (!/^#[0-9A-Fa-f]{6}$/.test(data.color)) {
      socket.emit('error', 'Invalid color format');
      return;
    }

    const account = accounts.get(socket.username);
    if (account) {
      account.nameColor = data.color;
      saveAccounts();
      socket.emit('profileUpdated', { success: true, message: 'Name color updated!' });
      io.emit('userColorUpdate', { username: socket.username, nameColor: data.color });
    }
  });

  socket.on('getProfile', (data) => {
    if (!socket.username) return;
    
    const targetUsername = data?.username || socket.username;
    const account = accounts.get(targetUsername);
    const avatar = userAvatars.get(targetUsername);
    const targetUser = Array.from(users.values()).find(u => u.username === targetUsername);

    if (account) {
      socket.emit('profileData', {
        username: targetUsername,
        bio: account.bio || '',
        nameColor: account.nameColor || '#ffffff',
        createdAt: account.createdAt,
        lastLogin: account.lastLogin,
        loginCount: account.loginCount || 0,
        stats: account.stats || { messagesSent: 0, filesShared: 0, reactionsGiven: 0 },
        avatar: avatar || null,
        isOnline: !!targetUser,
        status: targetUser?.status || 'offline',
        isSelf: targetUsername === socket.username
      });
    } else {
      socket.emit('profileData', { error: 'User not found' });
    }
  });

  // =========================================================================
  // BLOCKING
  // =========================================================================

  socket.on('blockUser', (data) => {
    if (!socket.username || !data.username) return;

    if (!blockedUsers.has(socket.username)) {
      blockedUsers.set(socket.username, new Set());
    }
    blockedUsers.get(socket.username).add(data.username);

    const account = accounts.get(socket.username);
    if (account) {
      account.blockedUsers = Array.from(blockedUsers.get(socket.username));
      saveAccounts();
    }

    socket.emit('userBlocked', { username: data.username });
  });

  socket.on('unblockUser', (data) => {
    if (!socket.username || !data.username) return;

    blockedUsers.get(socket.username)?.delete(data.username);

    const account = accounts.get(socket.username);
    if (account) {
      account.blockedUsers = Array.from(blockedUsers.get(socket.username) || []);
      saveAccounts();
    }

    socket.emit('userUnblocked', { username: data.username });
  });

  // =========================================================================
  // TYPING INDICATORS
  // =========================================================================

  socket.on('typing', (data) => {
    if (!socket.username) return;
    
    const room = data.room || 'general';
    if (room === 'general') {
      socket.to('general').emit('userTyping', { username: socket.username, room });
    } else {
      const targetUser = Array.from(users.values()).find(u => u.username === room);
      if (targetUser) {
        io.to(targetUser.id).emit('userTyping', { username: socket.username, room });
      } else if (customRooms.has(room)) {
        socket.to(room).emit('userTyping', { username: socket.username, room });
      }
    }
  });

  socket.on('stopTyping', (data) => {
    if (!socket.username) return;
    
    const room = data.room || 'general';
    if (room === 'general') {
      socket.to('general').emit('userStoppedTyping', { username: socket.username, room });
    } else {
      const targetUser = Array.from(users.values()).find(u => u.username === room);
      if (targetUser) {
        io.to(targetUser.id).emit('userStoppedTyping', { username: socket.username, room });
      } else if (customRooms.has(room)) {
        socket.to(room).emit('userStoppedTyping', { username: socket.username, room });
      }
    }
  });

  // =========================================================================
  // FRIEND SYSTEM
  // =========================================================================

  socket.on('sendFriendRequest', (data) => {
    if (!socket.username) return;

    const targetRequests = friendRequests.get(data.targetUsername);
    const senderRequests = friendRequests.get(socket.username);
    const senderFriends = friendships.get(socket.username);

    if (!targetRequests || !senderRequests || !senderFriends) {
      socket.emit('error', 'User not found');
      return;
    }

    if (senderFriends.has(data.targetUsername)) {
      socket.emit('error', 'Already friends');
      return;
    }

    if (senderRequests.sent.has(data.targetUsername)) {
      socket.emit('error', 'Request already sent');
      return;
    }

    senderRequests.sent.add(data.targetUsername);
    targetRequests.received.add(socket.username);

    const targetUser = Array.from(users.values()).find(u => u.username === data.targetUsername);
    if (targetUser) {
      io.to(targetUser.id).emit('friendRequestReceived', { from: socket.username });
      io.to(targetUser.id).emit('friendRequestsUpdate', {
        sent: Array.from(targetRequests.sent),
        received: Array.from(targetRequests.received)
      });
    }

    socket.emit('friendRequestsUpdate', {
      sent: Array.from(senderRequests.sent),
      received: Array.from(senderRequests.received)
    });
  });

  socket.on('acceptFriendRequest', (data) => {
    if (!socket.username) return;

    const receiverRequests = friendRequests.get(socket.username);
    const senderRequests = friendRequests.get(data.fromUsername);
    const receiverFriends = friendships.get(socket.username);
    const senderFriends = friendships.get(data.fromUsername);

    if (!receiverRequests || !senderRequests || !receiverFriends || !senderFriends) {
      socket.emit('error', 'User not found');
      return;
    }

    receiverRequests.received.delete(data.fromUsername);
    senderRequests.sent.delete(socket.username);
    receiverFriends.add(data.fromUsername);
    senderFriends.add(socket.username);

    const updateFriendsList = (username) => {
      return Array.from(friendships.get(username) || []).map(friendName => ({
        username: friendName,
        online: Array.from(users.values()).some(u => u.username === friendName)
      }));
    };

    socket.emit('friendsUpdate', updateFriendsList(socket.username));
    socket.emit('friendRequestsUpdate', {
      sent: Array.from(receiverRequests.sent),
      received: Array.from(receiverRequests.received)
    });

    const senderUser = Array.from(users.values()).find(u => u.username === data.fromUsername);
    if (senderUser) {
      io.to(senderUser.id).emit('friendsUpdate', updateFriendsList(data.fromUsername));
      io.to(senderUser.id).emit('friendRequestsUpdate', {
        sent: Array.from(senderRequests.sent),
        received: Array.from(senderRequests.received)
      });
      io.to(senderUser.id).emit('friendRequestAccepted', { by: socket.username });
    }
  });

  socket.on('rejectFriendRequest', (data) => {
    if (!socket.username) return;

    const receiverRequests = friendRequests.get(socket.username);
    const senderRequests = friendRequests.get(data.fromUsername);

    if (receiverRequests) receiverRequests.received.delete(data.fromUsername);
    if (senderRequests) senderRequests.sent.delete(socket.username);

    socket.emit('friendRequestsUpdate', {
      sent: Array.from(receiverRequests?.sent || []),
      received: Array.from(receiverRequests?.received || [])
    });
  });

  socket.on('removeFriend', (data) => {
    if (!socket.username) return;

    const userFriends = friendships.get(socket.username);
    const friendFriends = friendships.get(data.friendUsername);

    if (userFriends) userFriends.delete(data.friendUsername);
    if (friendFriends) friendFriends.delete(socket.username);

    const updateFriendsList = (username) => {
      return Array.from(friendships.get(username) || []).map(friendName => ({
        username: friendName,
        online: Array.from(users.values()).some(u => u.username === friendName)
      }));
    };

    socket.emit('friendsUpdate', updateFriendsList(socket.username));

    const targetUser = Array.from(users.values()).find(u => u.username === data.friendUsername);
    if (targetUser) {
      io.to(targetUser.id).emit('friendsUpdate', updateFriendsList(data.friendUsername));
    }
  });

  // =========================================================================
  // STATUS
  // =========================================================================

  socket.on('changeStatus', (data) => {
    if (!socket.username) return;
    
    const validStatuses = ['online', 'away', 'dnd', 'invisible'];
    if (!validStatuses.includes(data.status)) return;

    const user = users.get(socket.id);
    if (user) {
      user.status = data.status;
      io.emit('userStatusUpdate', { username: socket.username, status: data.status });
      broadcastUserList();
    }
  });

  // =========================================================================
  // ROOMS
  // =========================================================================

  socket.on('createRoom', (data) => {
    if (!socket.username) return;

    const roomId = `room-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const roomData = {
      id: roomId,
      name: sanitizeMessage(data.name).substring(0, 50),
      description: sanitizeMessage(data.description || '').substring(0, 200),
      creator: socket.username,
      isPublic: !data.isPrivate,
      createdAt: new Date().toISOString(),
      members: new Set([socket.username]),
      icon: data.icon || 'fa-hashtag',
      color: data.color || '#667eea'
    };

    customRooms.set(roomId, roomData);
    roomMembers.get(socket.username).add(roomId);
    socket.join(roomId);
    chatHistory.set(roomId, new Map());
    saveRooms();

    socket.emit('roomsUpdate', getRoomsForUser(socket.username));
    socket.emit('roomCreated', { roomId, room: { ...roomData, memberCount: 1 } });

    if (roomData.isPublic) {
      users.forEach((u, sid) => {
        if (sid !== socket.id) {
          io.sockets.sockets.get(sid)?.emit('roomsUpdate', getRoomsForUser(u.username));
        }
      });
    }

    logActivity('room_created', { roomId, name: data.name, creator: socket.username });
  });

  socket.on('joinRoom', (data) => {
    if (!socket.username) return;

    const room = customRooms.get(data.roomId);
    if (!room) {
      socket.emit('error', 'Room not found');
      return;
    }

    if (!room.isPublic && !room.members.has(socket.username)) {
      socket.emit('error', 'Private room - invitation required');
      return;
    }

    room.members.add(socket.username);
    roomMembers.get(socket.username).add(data.roomId);
    socket.join(data.roomId);
    saveRooms();

    const roomHistory = chatHistory.get(data.roomId) || new Map();
    socket.emit('chatHistory', { room: data.roomId, messages: Array.from(roomHistory.values()).slice(-50) });
    socket.emit('roomsUpdate', getRoomsForUser(socket.username));

    socket.to(data.roomId).emit('userJoinedRoom', {
      username: socket.username,
      roomId: data.roomId,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('leaveRoom', (data) => {
    if (!socket.username || data.roomId === 'general') return;

    const room = customRooms.get(data.roomId);
    if (!room) return;

    room.members.delete(socket.username);
    roomMembers.get(socket.username)?.delete(data.roomId);
    socket.leave(data.roomId);
    saveRooms();

    socket.emit('roomsUpdate', getRoomsForUser(socket.username));
    socket.to(data.roomId).emit('userLeftRoom', {
      username: socket.username,
      roomId: data.roomId
    });
  });

  socket.on('deleteRoom', (data) => {
    if (!socket.username) return;

    const room = customRooms.get(data.roomId);
    if (!room) {
      socket.emit('error', 'Room not found');
      return;
    }

    if (room.creator !== socket.username && !adminUsers.has(socket.username)) {
      socket.emit('error', 'Not authorized');
      return;
    }

    customRooms.delete(data.roomId);
    chatHistory.delete(data.roomId);
    roomMembers.forEach(userRooms => userRooms.delete(data.roomId));
    saveRooms();

    io.emit('roomDeleted', { roomId: data.roomId, name: room.name });
    users.forEach(u => {
      io.sockets.sockets.get(u.id)?.emit('roomsUpdate', getRoomsForUser(u.username));
    });
  });

  socket.on('requestChatHistory', (data) => {
    if (!socket.username) return;

    let historyKey = data.room === 'general' ? 'general' :
      customRooms.has(data.room) ? data.room :
      [socket.username, data.room].sort().join('-dm-');

    const history = chatHistory.get(historyKey) || new Map();
    socket.emit('chatHistory', { room: data.room, messages: Array.from(history.values()).slice(-50) });
  });

  // =========================================================================
  // STICKERS
  // =========================================================================

  socket.on('syncCustomStickers', (data) => {
    if (!socket.username || !Array.isArray(data?.stickers)) return;
    
    userStickers.set(socket.username, data.stickers);
    saveStickers();
  });

  socket.on('requestStickers', () => {
    if (!socket.username) return;
    if (userStickers.has(socket.username)) {
      socket.emit('syncStickers', { stickers: userStickers.get(socket.username) });
    }
  });

  // =========================================================================
  // IMAGE/FILE MESSAGES
  // =========================================================================

  socket.on('imageMessage', (data) => {
    if (!socket.username) return;

    const target = data.room || 'general';
    const messageData = {
      id: generateMessageId(),
      username: socket.username,
      message: sanitizeMessage(data.message || ''),
      imagePath: data.imagePath,
      imageOriginalName: data.imageOriginalName,
      timestamp: new Date().toISOString(),
      type: 'image',
      room: target,
      reactions: {}
    };

    const targetUser = Array.from(users.values()).find(u => u.username === target);
    const isCustomRoom = customRooms.has(target);

    let historyKey = 'general';
    if (targetUser) {
      historyKey = [socket.username, targetUser.username].sort().join('-dm-');
      messageData.isPrivate = true;
    } else if (isCustomRoom) {
      historyKey = target;
    }

    if (!chatHistory.has(historyKey)) chatHistory.set(historyKey, new Map());
    chatHistory.get(historyKey).set(messageData.id, messageData);
    saveMessages();

    if (targetUser) {
      io.to(targetUser.id).emit('message', messageData);
      socket.emit('message', messageData);
    } else if (isCustomRoom) {
      io.to(target).emit('message', messageData);
    } else {
      io.to('general').emit('message', messageData);
    }
  });

  socket.on('fileMessage', (data) => {
    if (!socket.username) return;

    const target = data.room || 'general';
    const messageData = {
      id: generateMessageId(),
      username: socket.username,
      message: sanitizeMessage(data.message || ''),
      filePath: data.filePath,
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileType: data.fileType,
      timestamp: new Date().toISOString(),
      type: 'file',
      room: target,
      reactions: {}
    };

    const targetUser = Array.from(users.values()).find(u => u.username === target);
    const isCustomRoom = customRooms.has(target);

    let historyKey = 'general';
    if (targetUser) {
      historyKey = [socket.username, targetUser.username].sort().join('-dm-');
      messageData.isPrivate = true;
    } else if (isCustomRoom) {
      historyKey = target;
    }

    if (!chatHistory.has(historyKey)) chatHistory.set(historyKey, new Map());
    chatHistory.get(historyKey).set(messageData.id, messageData);
    saveMessages();

    if (targetUser) {
      io.to(targetUser.id).emit('fileMessage', messageData);
      socket.emit('fileMessage', messageData);
    } else if (isCustomRoom) {
      io.to(target).emit('fileMessage', messageData);
    } else {
      io.to('general').emit('fileMessage', messageData);
    }

    const account = accounts.get(socket.username);
    if (account) {
      account.stats.filesShared = (account.stats.filesShared || 0) + 1;
    }
  });

  // =========================================================================
  // ADMIN FEATURES
  // =========================================================================

  socket.on('kickUser', (data) => {
    if (!socket.username) return;

    const { roomId, username } = data;
    const room = customRooms.get(roomId);

    if (!room) {
      socket.emit('error', 'Room not found');
      return;
    }

    if (room.creator !== socket.username && !adminUsers.has(socket.username)) {
      socket.emit('error', 'Not authorized');
      return;
    }

    if (username === room.creator) {
      socket.emit('error', 'Cannot kick room creator');
      return;
    }

    if (room.members.has(username)) {
      room.members.delete(username);
      roomMembers.get(username)?.delete(roomId);

      const targetUser = Array.from(users.values()).find(u => u.username === username);
      if (targetUser) {
        const targetSocket = io.sockets.sockets.get(targetUser.id);
        if (targetSocket) {
          targetSocket.leave(roomId);
          targetSocket.emit('kickedFromRoom', { roomId, roomName: room.name });
          targetSocket.emit('roomsUpdate', getRoomsForUser(username));
        }
      }

      saveRooms();
      io.to(roomId).emit('userKicked', { username, kickedBy: socket.username, roomName: room.name });
      socket.emit('success', `Kicked ${username} from room`);
    }
  });

  socket.on('reportUser', (data) => {
    logActivity('user_report', {
      reporter: socket.username,
      reported: data.reportedUser,
      reason: data.reason
    });

    const adminUser = Array.from(users.values()).find(u => adminUsers.has(u.username));
    if (adminUser) {
      io.to(adminUser.id).emit('notification', {
        title: 'User Report',
        body: `${socket.username} reported ${data.reportedUser}: ${data.reason}`
      });
    }

    socket.emit('success', 'Report submitted');
  });

  // =========================================================================
  // DISCONNECT
  // =========================================================================

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      userSessions.delete(user.username);

      // Update friends
      const userFriends = friendships.get(user.username) || new Set();
      userFriends.forEach(friendName => {
        const friendUser = Array.from(users.values()).find(u => u.username === friendName);
        if (friendUser) {
          const friendsData = Array.from(friendships.get(friendName) || []).map(fname => ({
            username: fname,
            online: Array.from(users.values()).some(u => u.username === fname)
          }));
          io.to(friendUser.id).emit('friendsUpdate', friendsData);
        }
      });

      broadcastUserList();

      socket.to('general').emit('userLeft', {
        username: user.username,
        timestamp: new Date().toISOString()
      });

      logActivity('logout', { username: user.username });
      console.log(`👋 ${user.username} left the chat`);
    }
  });
});

// =============================================================================
// SLASH COMMANDS
// =============================================================================

function handleSlashCommand(socket, message, roomId) {
  const parts = message.slice(1).split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  const systemMessage = (text) => ({
    id: generateMessageId(),
    username: 'System',
    message: text,
    timestamp: new Date().toISOString(),
    type: 'system',
    room: roomId
  });

  switch (command) {
    case 'roll':
    case 'dice': {
      const max = parseInt(args[0]) || 6;
      const result = Math.floor(Math.random() * max) + 1;
      io.to(roomId).emit('message', systemMessage(`🎲 ${socket.username} rolled a ${result} (1-${max})`));
      return true;
    }
    
    case 'flip':
    case 'coin': {
      const side = Math.random() > 0.5 ? 'Heads' : 'Tails';
      io.to(roomId).emit('message', systemMessage(`🪙 ${socket.username} flipped: ${side}`));
      return true;
    }
    
    case '8ball': {
      const answers = [
        'It is certain', 'Without a doubt', 'Yes definitely', 'You may rely on it',
        'Most likely', 'Outlook good', 'Yes', 'Signs point to yes',
        'Reply hazy, try again', 'Ask again later', 'Cannot predict now',
        'Don\'t count on it', 'My reply is no', 'My sources say no',
        'Outlook not so good', 'Very doubtful'
      ];
      const answer = answers[Math.floor(Math.random() * answers.length)];
      io.to(roomId).emit('message', systemMessage(`🎱 ${socket.username} asks: "${args.join(' ')}" — ${answer}`));
      return true;
    }
    
    case 'shrug': {
      socket.emit('message', systemMessage('¯\\_(ツ)_/¯'));
      return true;
    }
    
    case 'tableflip': {
      socket.emit('message', systemMessage('(╯°□°)╯︵ ┻━┻'));
      return true;
    }
    
    case 'unflip': {
      socket.emit('message', systemMessage('┬─┬ノ( º _ ºノ)'));
      return true;
    }
    
    case 'help': {
      socket.emit('message', systemMessage(
        `**Available Commands:**\n` +
        `/roll [max] - Roll a die (default: 6)\n` +
        `/flip - Flip a coin\n` +
        `/8ball [question] - Ask the magic 8-ball\n` +
        `/me [action] - Perform an action\n` +
        `/shrug - ¯\\_(ツ)_/¯\n` +
        `/tableflip - (╯°□°)╯︵ ┻━┻\n` +
        `/unflip - ┬─┬ノ( º _ ºノ)`
      ));
      return true;
    }
    
    case 'me': {
      // Don't handle, let it pass through as italic action
      return false;
    }
    
    default:
      return false;
  }
}

// =============================================================================
// CLEANUP & MAINTENANCE
// =============================================================================

function cleanupInactiveAccounts() {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  let cleanedCount = 0;

  for (const [username, account] of accounts.entries()) {
    if (new Date(account.lastLogin) < oneWeekAgo) {
      accounts.delete(username);
      friendships.delete(username);
      friendRequests.delete(username);
      userAvatars.delete(username);
      userStickers.delete(username);
      cleanedCount++;

      // Remove from others' friend lists
      friendships.forEach(friends => friends.delete(username));
      friendRequests.forEach(requests => {
        requests.sent.delete(username);
        requests.received.delete(username);
      });
    }
  }

  if (cleanedCount > 0) {
    console.log(`🧹 Cleaned up ${cleanedCount} inactive accounts`);
    saveAccounts();
    saveAvatars();
    saveStickers();
  }
}

// Periodic cleanup
setInterval(cleanupInactiveAccounts, 24 * 60 * 60 * 1000);

// Clean up rate limit records
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of socketRateLimits) {
    if (now > record.resetAt + 60000) {
      socketRateLimits.delete(key);
    }
  }
}, 60000);

// Periodic data saves
setInterval(() => {
  saveMessages();
  saveAccounts();
  saveRooms();
}, 5 * 60 * 1000); // Every 5 minutes

// =============================================================================
// SERVER START
// =============================================================================

server.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                     🔴 REDCHAT v2.0 🔴                       ║
╠══════════════════════════════════════════════════════════════╣
║  Server running on http://localhost:${PORT}                    ║
║                                                              ║
║  ✅ Password hashing (PBKDF2-SHA512)                         ║
║  ✅ Rate limiting enabled                                    ║
║  ✅ Message reactions                                        ║
║  ✅ Message editing & deletion                               ║
║  ✅ Read receipts                                            ║
║  ✅ Voice messages                                           ║
║  ✅ User mentions & notifications                            ║
║  ✅ Message search API                                       ║
║  ✅ User blocking                                            ║
║  ✅ Activity logging                                         ║
║  ✅ Slash commands (/roll, /flip, /8ball, etc.)              ║
║  ✅ Security headers (Helmet)                                ║
║  ✅ Compression enabled                                      ║
║                                                              ║
║  Accounts: ${accounts.size.toString().padEnd(4)}  Rooms: ${customRooms.size.toString().padEnd(4)}                          ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down gracefully...');
  saveMessages();
  saveAccounts();
  saveRooms();
  saveAvatars();
  saveStickers();
  saveReactions();
  saveReadReceipts();
  server.close(() => {
    console.log('👋 Server closed');
    process.exit(0);
  });
});
