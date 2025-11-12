const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "blob:", "https:"],
            connectSrc: ["'self'", "ws:", "wss:"],
            mediaSrc: ["'self'", "blob:"]
        }
    }
}));
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Create necessary directories
const uploadsDir = path.join(__dirname, 'public', 'uploads');
const avatarsDir = path.join(__dirname, 'public', 'avatars');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadType = req.body.uploadType || 'files';
        const destDir = uploadType === 'avatar' ? avatarsDir : uploadsDir;
        cb(null, destDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
        'application/pdf', 'text/plain', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip', 'application/x-rar-compressed', 'application/json',
        'video/mp4', 'video/webm', 'audio/mp3', 'audio/wav', 'audio/ogg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter: fileFilter
});

// Enhanced data structures
const users = new Map(); // userId -> user object
const servers = new Map(); // serverId -> server object
const channels = new Map(); // channelId -> channel object
const directMessages = new Map(); // conversationId -> DM data
const friendships = new Map(); // userId -> Set of friend IDs
const friendRequests = new Map(); // userId -> Set of pending requests
const userSettings = new Map(); // userId -> settings object
const messageHistory = new Map(); // channelId -> array of messages
const userProfiles = new Map(); // userId -> profile data
const notifications = new Map(); // userId -> array of notifications
const blockedUsers = new Map(); // userId -> Set of blocked user IDs

// Default server and channel
const defaultServerId = 'general-server';
const defaultChannelId = 'welcome';

// Initialize default server and channel
servers.set(defaultServerId, {
    id: defaultServerId,
    name: 'General Community',
    description: 'Welcome to ChatSphere! Connect with people around the world.',
    icon: '🌍',
    owner: 'system',
    createdAt: new Date(),
    channels: [defaultChannelId],
    members: new Set(),
    roles: new Map([
        ['admin', { name: 'Administrator', permissions: ['all'], color: '#ff5555' }],
        ['mod', { name: 'Moderator', permissions: ['kick', 'ban', 'delete_messages'], color: '#55ff55' }],
        ['member', { name: 'Member', permissions: ['send_messages', 'read_messages'], color: '#5555ff' }]
    ]),
    rules: [
        'Be respectful to all members',
        'No spam or excessive messaging', 
        'Keep conversations appropriate',
        'Use appropriate channels for topics',
        'Have fun and make friends!'
    ]
});

channels.set(defaultChannelId, {
    id: defaultChannelId,
    name: 'welcome',
    serverId: defaultServerId,
    type: 'text',
    description: 'Welcome new members and general discussion',
    createdAt: new Date(),
    topic: 'Welcome to ChatSphere! 🎉'
});

// Utility functions
function generateEncryptionKey() {
    return crypto.randomBytes(32).toString('hex');
}

function encryptMessage(message, key) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function createNotification(userId, type, title, message, data = {}) {
    const notification = {
        id: uuidv4(),
        type,
        title,
        message,
        data,
        timestamp: new Date(),
        read: false
    };
    
    if (!notifications.has(userId)) {
        notifications.set(userId, []);
    }
    
    notifications.get(userId).unshift(notification);
    
    // Limit notifications to 100 per user
    if (notifications.get(userId).length > 100) {
        notifications.get(userId) = notifications.get(userId).slice(0, 100);
    }
    
    return notification;
}

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileInfo = {
            id: uuidv4(),
            originalName: req.file.originalname,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype,
            url: req.body.uploadType === 'avatar' 
                ? `/avatars/${req.file.filename}` 
                : `/uploads/${req.file.filename}`,
            uploadedAt: new Date(),
            uploadType: req.body.uploadType || 'file'
        };

        res.json({ success: true, file: fileInfo });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// API Routes
app.get('/api/users/:userId/profile', (req, res) => {
    const userId = req.params.userId;
    const profile = userProfiles.get(userId);
    const user = users.get(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
        id: userId,
        username: user.username,
        avatar: user.avatar,
        status: user.status,
        customStatus: user.customStatus,
        profile: profile || {},
        joinedAt: user.joinedAt,
        isOnline: true
    });
});

app.post('/api/users/:userId/settings', (req, res) => {
    const userId = req.params.userId;
    const settings = req.body;
    
    userSettings.set(userId, { ...userSettings.get(userId), ...settings });
    res.json({ success: true });
});

app.get('/api/search', (req, res) => {
    const { query, type = 'messages', userId } = req.query;
    
    if (!query || !userId) {
        return res.status(400).json({ error: 'Query and userId required' });
    }
    
    const results = [];
    const user = users.get(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    if (type === 'messages') {
        // Search through message history
        for (const [channelId, messages] of messageHistory.entries()) {
            const channel = channels.get(channelId);
            if (channel && servers.get(channel.serverId)?.members.has(userId)) {
                const matchingMessages = messages.filter(msg => 
                    msg.message.toLowerCase().includes(query.toLowerCase()) ||
                    msg.username.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 10);
                
                results.push(...matchingMessages.map(msg => ({
                    ...msg,
                    channelName: channel.name,
                    serverName: servers.get(channel.serverId)?.name
                })));
            }
        }
    } else if (type === 'users') {
        // Search through users
        for (const [id, user] of users.entries()) {
            if (user.username.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    id,
                    username: user.username,
                    avatar: user.avatar,
                    status: user.status,
                    type: 'user'
                });
            }
        }
    }
    
    res.json({ results: results.slice(0, 50) });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.currentServer = defaultServerId;
    socket.currentChannel = defaultChannelId;
    socket.directMessagesWith = null;

    // Handle user joining
    socket.on('join', (data) => {
        const { username, serverId = defaultServerId } = data;
        
        if (username && username.trim() !== '') {
            const user = {
                id: socket.id,
                username: username.trim(),
                status: 'online',
                customStatus: '',
                avatar: `/avatars/default-${username.trim().charAt(0).toLowerCase()}.png`,
                joinedAt: new Date(),
                currentServer: serverId,
                currentChannel: defaultChannelId,
                lastSeen: new Date(),
                theme: 'dark',
                soundEnabled: true,
                notificationsEnabled: true
            };

            users.set(socket.id, user);
            socket.join(serverId);
            socket.join(defaultChannelId);

            // Initialize user data structures
            if (!friendships.has(socket.id)) {
                friendships.set(socket.id, new Set());
            }
            if (!friendRequests.has(socket.id)) {
                friendRequests.set(socket.id, new Set());
            }
            if (!userSettings.has(socket.id)) {
                userSettings.set(socket.id, {
                    theme: 'dark',
                    soundEnabled: true,
                    notificationsEnabled: true,
                    showOnlineStatus: true,
                    allowDirectMessages: true,
                    language: 'en'
                });
            }
            if (!notifications.has(socket.id)) {
                notifications.set(socket.id, []);
            }
            if (!blockedUsers.has(socket.id)) {
                blockedUsers.set(socket.id, new Set());
            }

            // Add user to server members
            if (servers.has(serverId)) {
                servers.get(serverId).members.add(socket.id);
            }

            // Send initial data to the new user
            socket.emit('userData', {
                user: user,
                settings: userSettings.get(socket.id),
                friends: Array.from(friendships.get(socket.id)).map(id => users.get(id)).filter(Boolean),
                friendRequests: {
                    sent: Array.from(friendRequests.get(socket.id)).map(id => users.get(id)).filter(Boolean),
                    received: Array.from(friendRequests.values()).filter(reqs => reqs.has(socket.id)).map(reqs => {
                        for (const [userId, requests] of friendRequests.entries()) {
                            if (requests.has(socket.id)) return users.get(userId);
                        }
                    }).filter(Boolean)
                },
                notifications: notifications.get(socket.id).slice(0, 20)
            });

            // Send server and channel data
            socket.emit('serverData', {
                servers: Array.from(servers.values()).map(server => ({
                    ...server,
                    members: Array.from(server.members).map(id => users.get(id)).filter(Boolean)
                })),
                channels: Array.from(channels.values()),
                currentServer: serverId,
                currentChannel: defaultChannelId
            });

            // Send recent message history
            if (messageHistory.has(defaultChannelId)) {
                socket.emit('messageHistory', {
                    channelId: defaultChannelId,
                    messages: messageHistory.get(defaultChannelId).slice(-50)
                });
            }

            // Notify friends about user coming online
            const userFriends = friendships.get(socket.id) || new Set();
            userFriends.forEach(friendId => {
                const friendSocket = [...io.sockets.sockets.values()].find(s => s.id === friendId);
                if (friendSocket) {
                    friendSocket.emit('friendStatusChange', {
                        userId: socket.id,
                        username: user.username,
                        status: 'online',
                        lastSeen: user.lastSeen
                    });
                }
            });

            // Update user list for all users in the server
            io.to(serverId).emit('userList', {
                serverId: serverId,
                users: Array.from(servers.get(serverId).members).map(id => users.get(id)).filter(Boolean)
            });

            // Send welcome message
            socket.emit('systemMessage', {
                message: `Welcome to ChatSphere, ${username.trim()}! 🎉`,
                timestamp: new Date(),
                channelId: defaultChannelId
            });

            console.log(`${username.trim()} joined server ${serverId}`);
        }
    });

    // Friend system
    socket.on('sendFriendRequest', (targetUsername) => {
        const sender = users.get(socket.id);
        const target = Array.from(users.values()).find(u => u.username === targetUsername);
        
        if (sender && target && target.id !== socket.id) {
            // Check if already friends or request exists
            if (friendships.get(socket.id)?.has(target.id)) {
                socket.emit('error', { message: 'Already friends with this user' });
                return;
            }
            
            if (friendRequests.get(socket.id)?.has(target.id)) {
                socket.emit('error', { message: 'Friend request already sent' });
                return;
            }

            // Check if blocked
            if (blockedUsers.get(target.id)?.has(socket.id)) {
                socket.emit('error', { message: 'Unable to send friend request' });
                return;
            }
            
            // Add to sender's sent requests
            if (!friendRequests.has(socket.id)) {
                friendRequests.set(socket.id, new Set());
            }
            friendRequests.get(socket.id).add(target.id);
            
            // Notify target user
            const targetSocket = [...io.sockets.sockets.values()].find(s => s.id === target.id);
            if (targetSocket) {
                targetSocket.emit('friendRequest', {
                    from: {
                        id: socket.id,
                        username: sender.username,
                        avatar: sender.avatar
                    },
                    timestamp: new Date()
                });
                
                // Create notification
                const notification = createNotification(
                    target.id,
                    'friend_request',
                    'New Friend Request',
                    `${sender.username} sent you a friend request`,
                    { fromUserId: socket.id }
                );
                targetSocket.emit('notification', notification);
            }
            
            socket.emit('friendRequestSent', { targetUsername });
        } else {
            socket.emit('error', { message: 'User not found' });
        }
    });

    socket.on('acceptFriendRequest', (fromUserId) => {
        const accepter = users.get(socket.id);
        const requester = users.get(fromUserId);
        
        if (accepter && requester) {
            // Remove from pending requests
            friendRequests.get(fromUserId)?.delete(socket.id);
            
            // Add to friends list for both users
            if (!friendships.has(socket.id)) {
                friendships.set(socket.id, new Set());
            }
            if (!friendships.has(fromUserId)) {
                friendships.set(fromUserId, new Set());
            }
            
            friendships.get(socket.id).add(fromUserId);
            friendships.get(fromUserId).add(socket.id);
            
            // Notify both users
            const requesterSocket = [...io.sockets.sockets.values()].find(s => s.id === fromUserId);
            if (requesterSocket) {
                requesterSocket.emit('friendAdded', {
                    friend: {
                        id: socket.id,
                        username: accepter.username,
                        avatar: accepter.avatar,
                        status: accepter.status
                    }
                });
                
                const notification = createNotification(
                    fromUserId,
                    'friend_accepted',
                    'Friend Request Accepted',
                    `${accepter.username} accepted your friend request`,
                    { userId: socket.id }
                );
                requesterSocket.emit('notification', notification);
            }
            
            socket.emit('friendAdded', {
                friend: {
                    id: fromUserId,
                    username: requester.username,
                    avatar: requester.avatar,
                    status: requester.status
                }
            });
        }
    });

    socket.on('rejectFriendRequest', (fromUserId) => {
        // Remove from pending requests
        friendRequests.get(fromUserId)?.delete(socket.id);
        socket.emit('friendRequestHandled', { fromUserId, action: 'rejected' });
    });

    socket.on('removeFriend', (friendId) => {
        // Remove from both users' friend lists
        friendships.get(socket.id)?.delete(friendId);
        friendships.get(friendId)?.delete(socket.id);
        
        // Notify both users
        const friendSocket = [...io.sockets.sockets.values()].find(s => s.id === friendId);
        if (friendSocket) {
            friendSocket.emit('friendRemoved', { userId: socket.id });
        }
        
        socket.emit('friendRemoved', { userId: friendId });
    });

    // Direct messaging
    socket.on('startDirectMessage', (targetUserId) => {
        const user = users.get(socket.id);
        const target = users.get(targetUserId);
        
        if (user && target) {
            // Create or find existing DM conversation
            const conversationId = [socket.id, targetUserId].sort().join('-');
            
            if (!directMessages.has(conversationId)) {
                directMessages.set(conversationId, {
                    id: conversationId,
                    participants: [socket.id, targetUserId],
                    messages: [],
                    createdAt: new Date(),
                    lastActivity: new Date()
                });
                
                if (!messageHistory.has(`dm-${conversationId}`)) {
                    messageHistory.set(`dm-${conversationId}`, []);
                }
            }
            
            // Join DM room
            socket.join(`dm-${conversationId}`);
            socket.directMessagesWith = targetUserId;
            
            // Send DM data
            socket.emit('directMessageStarted', {
                conversationId,
                participant: {
                    id: targetUserId,
                    username: target.username,
                    avatar: target.avatar,
                    status: target.status
                },
                messages: messageHistory.get(`dm-${conversationId}`)?.slice(-50) || []
            });
        }
    });

    socket.on('sendDirectMessage', (data) => {
        const { targetUserId, message, file } = data;
        const sender = users.get(socket.id);
        const target = users.get(targetUserId);
        
        if (sender && target && message?.trim()) {
            const conversationId = [socket.id, targetUserId].sort().join('-');
            const dmChannelId = `dm-${conversationId}`;
            
            // Check if users are blocked
            if (blockedUsers.get(targetUserId)?.has(socket.id)) {
                socket.emit('error', { message: 'Cannot send message to this user' });
                return;
            }
            
            const messageData = {
                id: uuidv4(),
                username: sender.username,
                message: message.trim(),
                timestamp: new Date(),
                userId: socket.id,
                channelId: dmChannelId,
                type: 'direct',
                avatar: sender.avatar,
                reactions: [],
                file: file || null
            };

            // Store message
            if (!messageHistory.has(dmChannelId)) {
                messageHistory.set(dmChannelId, []);
            }
            messageHistory.get(dmChannelId).push(messageData);
            
            // Limit message history
            if (messageHistory.get(dmChannelId).length > 1000) {
                messageHistory.set(dmChannelId, messageHistory.get(dmChannelId).slice(-1000));
            }

            // Send to both participants
            io.to(dmChannelId).emit('newDirectMessage', messageData);
            
            // Create notification for target if they're not in the DM
            const targetSocket = [...io.sockets.sockets.values()].find(s => s.id === targetUserId);
            if (targetSocket && targetSocket.directMessagesWith !== socket.id) {
                const notification = createNotification(
                    targetUserId,
                    'direct_message',
                    `Message from ${sender.username}`,
                    message.trim().substring(0, 100),
                    { fromUserId: socket.id, conversationId }
                );
                targetSocket.emit('notification', notification);
            }
        }
    });

    // Settings management
    socket.on('updateSettings', (settings) => {
        const currentSettings = userSettings.get(socket.id) || {};
        const updatedSettings = { ...currentSettings, ...settings };
        userSettings.set(socket.id, updatedSettings);
        
        // Update user object if necessary
        const user = users.get(socket.id);
        if (user) {
            if (settings.theme) user.theme = settings.theme;
            if (settings.customStatus !== undefined) user.customStatus = settings.customStatus;
        }
        
        socket.emit('settingsUpdated', updatedSettings);
    });

    // User profile management
    socket.on('updateProfile', (profileData) => {
        const user = users.get(socket.id);
        if (user) {
            const profile = userProfiles.get(socket.id) || {};
            const updatedProfile = { ...profile, ...profileData };
            userProfiles.set(socket.id, updatedProfile);
            
            // Update user object
            if (profileData.avatar) user.avatar = profileData.avatar;
            if (profileData.customStatus !== undefined) user.customStatus = profileData.customStatus;
            
            socket.emit('profileUpdated', updatedProfile);
            
            // Notify friends of profile changes
            const userFriends = friendships.get(socket.id) || new Set();
            userFriends.forEach(friendId => {
                const friendSocket = [...io.sockets.sockets.values()].find(s => s.id === friendId);
                if (friendSocket) {
                    friendSocket.emit('friendProfileUpdate', {
                        userId: socket.id,
                        username: user.username,
                        avatar: user.avatar,
                        customStatus: user.customStatus
                    });
                }
            });
        }
    });

        // Server creation
    socket.on('createServer', (data) => {
        const { name, description, icon } = data;
        const user = users.get(socket.id);
        
        if (user && name && name.trim() !== '') {
            const serverId = uuidv4();
            const generalChannelId = uuidv4();
            
            const server = {
                id: serverId,
                name: name.trim(),
                description: description || '',
                icon: icon || '🌐',
                owner: user.id,
                createdAt: new Date(),
                channels: [generalChannelId],
                members: new Set([user.id]),
                roles: new Map([
                    ['owner', { name: 'Owner', permissions: ['all'], color: '#ff5555' }],
                    ['admin', { name: 'Administrator', permissions: ['all'], color: '#ff8855' }],
                    ['mod', { name: 'Moderator', permissions: ['kick', 'ban', 'delete_messages'], color: '#55ff55' }],
                    ['member', { name: 'Member', permissions: ['send_messages', 'read_messages'], color: '#5555ff' }]
                ]),
                rules: []
            };

            const channel = {
                id: generalChannelId,
                name: 'general',
                serverId: serverId,
                type: 'text',
                description: 'General chat channel',
                createdAt: new Date(),
                topic: `Welcome to ${name.trim()}!`
            };

            servers.set(serverId, server);
            channels.set(generalChannelId, channel);
            messageHistory.set(generalChannelId, []);

            socket.join(serverId);
            socket.join(generalChannelId);

            // Send updated server list to the user
            socket.emit('serverCreated', { server, channel });
            
            console.log(`${user.username} created server: ${name}`);
        }
    });

    // Channel creation
    socket.on('createChannel', (data) => {
        const { serverId, name, description, type = 'text' } = data;
        const user = users.get(socket.id);
        const server = servers.get(serverId);
        
        if (user && server && server.members.has(user.id) && name && name.trim() !== '') {
            const channelId = uuidv4();
            
            const channel = {
                id: channelId,
                name: name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                serverId: serverId,
                type: type,
                description: description || '',
                createdAt: new Date(),
                topic: ''
            };

            channels.set(channelId, channel);
            server.channels.push(channelId);
            messageHistory.set(channelId, []);

            // Notify all server members about the new channel
            io.to(serverId).emit('channelCreated', channel);
            
            console.log(`${user.username} created channel: ${name} in server ${server.name}`);
        }
    });

    // Server and channel management
    socket.on('joinServer', (serverId) => {
        const user = users.get(socket.id);
        const server = servers.get(serverId);
        
        if (user && server) {
            // Leave current server
            if (user.currentServer && servers.has(user.currentServer)) {
                socket.leave(user.currentServer);
                servers.get(user.currentServer).members.delete(socket.id);
            }

            // Join new server
            socket.join(serverId);
            server.members.add(socket.id);
            user.currentServer = serverId;
            
            // Join general channel of the new server
            const generalChannel = Array.from(channels.values())
                .find(ch => ch.serverId === serverId && ch.name === 'general');
            
            if (generalChannel) {
                socket.join(generalChannel.id);
                user.currentChannel = generalChannel.id;
            }

            // Send updated data
            socket.emit('serverJoined', {
                server: {
                    ...server,
                    members: Array.from(server.members).map(id => users.get(id)).filter(Boolean)
                },
                channels: Array.from(channels.values()).filter(ch => ch.serverId === serverId)
            });

            // Update user lists
            io.to(serverId).emit('userList', {
                serverId: serverId,
                users: Array.from(server.members).map(id => users.get(id)).filter(Boolean)
            });
        }
    });

    socket.on('switchChannel', (channelId) => {
        const user = users.get(socket.id);
        const channel = channels.get(channelId);
        
        if (user && channel) {
            socket.leave(user.currentChannel);
            socket.join(channelId);
            user.currentChannel = channelId;
            
            socket.emit('channelSwitched', {
                channelId: channelId,
                channel: channel
            });

            // Send recent message history
            if (messageHistory.has(channelId)) {
                socket.emit('messageHistory', {
                    channelId: channelId,
                    messages: messageHistory.get(channelId).slice(-50)
                });
            }
        }
    });

    // Typing indicators
    socket.on('typing', (data) => {
        const user = users.get(socket.id);
        if (user) {
            const targetChannel = data.channelId || user.currentChannel;
            socket.to(targetChannel).emit('userTyping', {
                username: user.username,
                isTyping: data.isTyping,
                channelId: targetChannel,
                userId: user.id
            });
        }
    });

    // Status changes
    socket.on('changeStatus', (status) => {
        const user = users.get(socket.id);
        if (user && ['online', 'away', 'busy', 'invisible'].includes(status)) {
            user.status = status;
            user.lastSeen = new Date();
            
            // Update status for friends
            const userFriends = friendships.get(socket.id) || new Set();
            userFriends.forEach(friendId => {
                const friendSocket = [...io.sockets.sockets.values()].find(s => s.id === friendId);
                if (friendSocket) {
                    friendSocket.emit('friendStatusChange', {
                        userId: socket.id,
                        status: status,
                        lastSeen: user.lastSeen
                    });
                }
            });

            // Update status for server members
            io.emit('statusChanged', {
                userId: user.id,
                status: status,
                lastSeen: user.lastSeen
            });
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        const user = users.get(socket.id);
        if (user) {
            // Update last seen
            user.lastSeen = new Date();
            user.status = 'offline';

            // Remove user from server members
            if (servers.has(user.currentServer)) {
                servers.get(user.currentServer).members.delete(socket.id);
            }
            
            // Notify friends
            const userFriends = friendships.get(socket.id) || new Set();
            userFriends.forEach(friendId => {
                const friendSocket = [...io.sockets.sockets.values()].find(s => s.id === friendId);
                if (friendSocket) {
                    friendSocket.emit('friendStatusChange', {
                        userId: socket.id,
                        username: user.username,
                        status: 'offline',
                        lastSeen: user.lastSeen
                    });
                }
            });

            // Notify users in current channel
            if (user.currentChannel) {
                socket.to(user.currentChannel).emit('userLeft', {
                    username: user.username,
                    message: `${user.username} left the chat`,
                    timestamp: new Date(),
                    channelId: user.currentChannel
                });
            }

            // Update user list for current server
            if (servers.has(user.currentServer)) {
                const server = servers.get(user.currentServer);
                io.to(user.currentServer).emit('userList', {
                    serverId: user.currentServer,
                    users: Array.from(server.members).map(id => users.get(id)).filter(Boolean)
                });
            }

            // Keep user data for a while (for offline status)
            setTimeout(() => {
                users.delete(socket.id);
            }, 30000); // Remove after 30 seconds

            console.log(`${user.username} disconnected`);
        } else {
            console.log('A user disconnected:', socket.id);
        }
    });

    // Handle user list request
    socket.on('getUserList', () => {
        const user = users.get(socket.id);
        if (user && servers.has(user.currentServer)) {
            const server = servers.get(user.currentServer);
            socket.emit('userList', {
                serverId: user.currentServer,
                users: Array.from(server.members).map(id => users.get(id)).filter(Boolean)
            });
        }
    });

    // Get friends list
    socket.on('getFriendsList', () => {
        const userFriends = friendships.get(socket.id) || new Set();
        const friendsData = Array.from(userFriends).map(friendId => {
            const friend = users.get(friendId);
            return friend ? {
                id: friendId,
                username: friend.username,
                avatar: friend.avatar,
                status: friend.status,
                customStatus: friend.customStatus,
                lastSeen: friend.lastSeen
            } : null;
        }).filter(Boolean);

        socket.emit('friendsList', { friends: friendsData });
    });

    // Get direct message conversations
    socket.on('getDirectMessages', () => {
        const conversations = [];
        
        for (const [conversationId, dmData] of directMessages.entries()) {
            if (dmData.participants.includes(socket.id)) {
                const otherParticipant = dmData.participants.find(id => id !== socket.id);
                const otherUser = users.get(otherParticipant);
                
                if (otherUser) {
                    conversations.push({
                        conversationId: conversationId,
                        participant: {
                            id: otherParticipant,
                            username: otherUser.username,
                            avatar: otherUser.avatar,
                            status: otherUser.status
                        },
                        lastMessage: dmData.messages[dmData.messages.length - 1] || null,
                        lastActivity: dmData.lastActivity
                    });
                }
            }
        }

        socket.emit('directMessagesList', { conversations });
    });
});

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(PORT, () => {
    console.log(`🚀 ChatSphere Server running on http://localhost:${PORT}`);
    console.log('✨ Features: Servers, Channels, Friends, Private Messages, Voice/Video Calls, and more!');
    console.log('🌐 Open your browser and navigate to the URL above to start connecting!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

    // Handle channel creation
    socket.on('createChannel', (data) => {
        const { serverId, name, description } = data;
        const user = users.get(socket.id);
        const server = servers.get(serverId);
        
        if (user && server && server.members.has(user.id) && name && name.trim() !== '') {
            const channelId = uuidv4();
            
            const channel = {
                id: channelId,
                name: name.trim(),
                serverId: serverId,
                type: 'text',
                description: description || '',
                createdAt: new Date()
            };

            channels.set(channelId, channel);
            server.channels.push(channelId);

            // Notify all server members about the new channel
            io.to(serverId).emit('channelCreated', channel);
            
            console.log(`${user.username} created channel: ${name} in server ${server.name}`);
        }
    });

    // Handle joining a server
    socket.on('joinServer', (serverId) => {
        const user = users.get(socket.id);
        const server = servers.get(serverId);
        
        if (user && server) {
            // Leave current server
            socket.leave(user.currentServer);
            if (servers.has(user.currentServer)) {
                servers.get(user.currentServer).members.delete(socket.id);
            }

            // Join new server
            socket.join(serverId);
            server.members.add(socket.id);
            user.currentServer = serverId;
            
            // Join general channel of the new server
            const generalChannel = Array.from(channels.values())
                .find(ch => ch.serverId === serverId && ch.name === 'general');
            
            if (generalChannel) {
                socket.join(generalChannel.id);
                user.currentChannel = generalChannel.id;
            }

            // Update user lists
            io.emit('userList', {
                serverId: serverId,
                users: Array.from(server.members).map(id => users.get(id)).filter(Boolean)
            });
        }
    });

    // Handle switching channels
    socket.on('switchChannel', (channelId) => {
        const user = users.get(socket.id);
        const channel = channels.get(channelId);
        
        if (user && channel) {
            socket.leave(user.currentChannel);
            socket.join(channelId);
            user.currentChannel = channelId;
            
            socket.emit('channelSwitched', {
                channelId: channelId,
                channel: channel
            });
        }
    });

    // Enhanced message handling
    socket.on('sendMessage', (data) => {
        const user = users.get(socket.id);
        if (user && data.message && data.message.trim() !== '') {
            const messageData = {
                id: uuidv4(),
                username: user.username,
                message: data.message.trim(),
                timestamp: new Date(),
                userId: socket.id,
                channelId: user.currentChannel,
                serverId: user.currentServer,
                type: 'text',
                avatar: user.avatar,
                reactions: [],
                file: data.file || null,
                mentions: data.mentions || [],
                edited: false,
                thread: data.thread || null
            };

            // Store message in history
            if (!messageHistory.has(user.currentChannel)) {
                messageHistory.set(user.currentChannel, []);
            }
            messageHistory.get(user.currentChannel).push(messageData);
            
            // Limit message history per channel
            if (messageHistory.get(user.currentChannel).length > 1000) {
                messageHistory.set(user.currentChannel, messageHistory.get(user.currentChannel).slice(-1000));
            }

            // Send message to all users in the current channel
            io.to(user.currentChannel).emit('newMessage', messageData);
            
            // Handle mentions and create notifications
            if (data.mentions && data.mentions.length > 0) {
                data.mentions.forEach(mentionedUsername => {
                    const mentionedUser = Array.from(users.values()).find(u => u.username === mentionedUsername);
                    if (mentionedUser) {
                        const notification = createNotification(
                            mentionedUser.id,
                            'mention',
                            `You were mentioned`,
                            `${user.username} mentioned you in #${channels.get(user.currentChannel)?.name}`,
                            { messageId: messageData.id, channelId: user.currentChannel }
                        );
                        
                        const mentionedSocket = [...io.sockets.sockets.values()].find(s => s.id === mentionedUser.id);
                        if (mentionedSocket) {
                            mentionedSocket.emit('notification', notification);
                            mentionedSocket.emit('mentioned', {
                                message: messageData,
                                by: user.username
                            });
                        }
                    }
                });
            }
            
            console.log(`Message from ${user.username} in channel ${user.currentChannel}: ${data.message.trim()}`);
        }
    });

    // Message reactions
    socket.on('addReaction', (data) => {
        const { messageId, emoji } = data;
        const user = users.get(socket.id);
        
        if (user && messageId && emoji) {
            // Find message in history
            for (const [channelId, messages] of messageHistory.entries()) {
                const message = messages.find(m => m.id === messageId);
                if (message) {
                    // Add or update reaction
                    let reaction = message.reactions.find(r => r.emoji === emoji);
                    if (reaction) {
                        if (reaction.users.includes(user.id)) {
                            // Remove reaction
                            reaction.users = reaction.users.filter(id => id !== user.id);
                            if (reaction.users.length === 0) {
                                message.reactions = message.reactions.filter(r => r.emoji !== emoji);
                            }
                        } else {
                            // Add user to reaction
                            reaction.users.push(user.id);
                        }
                    } else {
                        // Create new reaction
                        message.reactions.push({
                            emoji: emoji,
                            users: [user.id],
                            count: 1
                        });
                    }
                    
                    // Update reaction count
                    message.reactions.forEach(r => {
                        r.count = r.users.length;
                    });
                    
                    // Broadcast reaction update
                    if (channelId.startsWith('dm-')) {
                        io.to(channelId).emit('reactionUpdated', {
                            messageId: messageId,
                            reactions: message.reactions
                        });
                    } else {
                        io.to(channelId).emit('reactionUpdated', {
                            messageId: messageId,
                            reactions: message.reactions
                        });
                    }
                    break;
                }
            }
        }
    });

    // Message editing and deletion
    socket.on('editMessage', (data) => {
        const { messageId, newContent } = data;
        const user = users.get(socket.id);
        
        if (user && messageId && newContent?.trim()) {
            for (const [channelId, messages] of messageHistory.entries()) {
                const message = messages.find(m => m.id === messageId && m.userId === user.id);
                if (message) {
                    message.message = newContent.trim();
                    message.edited = true;
                    message.editedAt = new Date();
                    
                    io.to(channelId).emit('messageEdited', {
                        messageId: messageId,
                        newContent: newContent.trim(),
                        editedAt: message.editedAt
                    });
                    break;
                }
            }
        }
    });

    socket.on('deleteMessage', (messageId) => {
        const user = users.get(socket.id);
        
        if (user && messageId) {
            for (const [channelId, messages] of messageHistory.entries()) {
                const messageIndex = messages.findIndex(m => m.id === messageId);
                const message = messages[messageIndex];
                
                if (message && (message.userId === user.id || user.role === 'admin' || user.role === 'mod')) {
                    messages.splice(messageIndex, 1);
                    
                    io.to(channelId).emit('messageDeleted', {
                        messageId: messageId,
                        deletedBy: user.username
                    });
                    break;
                }
            }
        }
    });

    // Search functionality
    socket.on('search', (data) => {
        const { query, type = 'messages', scope = 'current' } = data;
        const user = users.get(socket.id);
        
        if (!user || !query?.trim()) {
            socket.emit('searchResults', { results: [] });
            return;
        }
        
        const results = [];
        
        if (type === 'messages') {
            const searchChannels = scope === 'all' ? 
                Array.from(messageHistory.keys()) : 
                [user.currentChannel];
                
            searchChannels.forEach(channelId => {
                const messages = messageHistory.get(channelId) || [];
                const matchingMessages = messages.filter(msg => 
                    msg.message.toLowerCase().includes(query.toLowerCase()) ||
                    msg.username.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 20);
                
                results.push(...matchingMessages.map(msg => ({
                    ...msg,
                    channelName: channels.get(channelId)?.name || 'Direct Message',
                    type: 'message'
                })));
            });
        } else if (type === 'users') {
            for (const [id, user] of users.entries()) {
                if (user.username.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        id,
                        username: user.username,
                        avatar: user.avatar,
                        status: user.status,
                        type: 'user'
                    });
                }
            }
        }
        
        socket.emit('searchResults', { results: results.slice(0, 50) });
    });

    // Voice/Video call features
    socket.on('initiateCall', (data) => {
        const { targetUserId, type } = data; // type: 'voice' or 'video'
        const caller = users.get(socket.id);
        const target = users.get(targetUserId);
        
        if (caller && target) {
            const callId = uuidv4();
            
            const targetSocket = [...io.sockets.sockets.values()].find(s => s.id === targetUserId);
            if (targetSocket) {
                targetSocket.emit('incomingCall', {
                    callId: callId,
                    caller: {
                        id: socket.id,
                        username: caller.username,
                        avatar: caller.avatar
                    },
                    type: type
                });
                
                socket.emit('callInitiated', { callId, targetUser: target.username });
            }
        }
    });

    socket.on('answerCall', (data) => {
        const { callId, accept } = data;
        
        if (accept) {
            socket.join(`call-${callId}`);
            io.to(`call-${callId}`).emit('callAccepted', { callId });
        } else {
            io.to(`call-${callId}`).emit('callRejected', { callId });
        }
    });

    socket.on('endCall', (callId) => {
        io.to(`call-${callId}`).emit('callEnded', { callId });
        // Remove users from call room
        const socketsInCall = io.sockets.adapter.rooms.get(`call-${callId}`);
        if (socketsInCall) {
            socketsInCall.forEach(socketId => {
                const socket = io.sockets.sockets.get(socketId);
                if (socket) {
                    socket.leave(`call-${callId}`);
                }
            });
        }
    });

    // WebRTC signaling for voice/video
    socket.on('webrtc-offer', (data) => {
        socket.to(data.target).emit('webrtc-offer', {
            offer: data.offer,
            from: socket.id
        });
    });

    socket.on('webrtc-answer', (data) => {
        socket.to(data.target).emit('webrtc-answer', {
            answer: data.answer,
            from: socket.id
        });
    });

    socket.on('webrtc-ice-candidate', (data) => {
        socket.to(data.target).emit('webrtc-ice-candidate', {
            candidate: data.candidate,
            from: socket.id
        });
    });

    // Notification management
    socket.on('markNotificationRead', (notificationId) => {
        const userNotifications = notifications.get(socket.id) || [];
        const notification = userNotifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            socket.emit('notificationMarkedRead', { notificationId });
        }
    });

    socket.on('markAllNotificationsRead', () => {
        const userNotifications = notifications.get(socket.id) || [];
        userNotifications.forEach(n => n.read = true);
        socket.emit('allNotificationsMarkedRead');
    });

    // Block/unblock users
    socket.on('blockUser', (targetUserId) => {
        if (!blockedUsers.has(socket.id)) {
            blockedUsers.set(socket.id, new Set());
        }
        blockedUsers.get(socket.id).add(targetUserId);
        
        // Remove from friends if they are friends
        friendships.get(socket.id)?.delete(targetUserId);
        friendships.get(targetUserId)?.delete(socket.id);
        
        socket.emit('userBlocked', { userId: targetUserId });
    });

    socket.on('unblockUser', (targetUserId) => {
        blockedUsers.get(socket.id)?.delete(targetUserId);
        socket.emit('userUnblocked', { userId: targetUserId });
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
        const user = users.get(socket.id);
        if (user) {
            socket.to(user.currentChannel).emit('userTyping', {
                username: user.username,
                isTyping: data.isTyping,
                channelId: user.currentChannel
            });
        }
    });

    // Handle status changes
    socket.on('changeStatus', (status) => {
        const user = users.get(socket.id);
        if (user && ['online', 'away', 'busy', 'invisible'].includes(status)) {
            user.status = status;
            
            // Update status for all servers the user is in
            io.emit('statusChanged', {
                userId: user.id,
                status: status
            });
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        const user = users.get(socket.id);
        if (user) {
            // Remove user from server members
            if (servers.has(user.currentServer)) {
                servers.get(user.currentServer).members.delete(socket.id);
            }
            
            users.delete(socket.id);
            
            // Notify users in the current channel about the user leaving
            socket.to(user.currentChannel).emit('userLeft', {
                username: user.username,
                message: `${user.username} left the chat`,
                timestamp: new Date(),
                channelId: user.currentChannel
            });

            // Update user list for the server
            if (servers.has(user.currentServer)) {
                const server = servers.get(user.currentServer);
                io.to(user.currentServer).emit('userList', {
                    serverId: user.currentServer,
                    users: Array.from(server.members).map(id => users.get(id)).filter(Boolean)
                });
            }

            console.log(`${user.username} disconnected`);
        } else {
            console.log('A user disconnected:', socket.id);
        }
    });

    // Get friends list
    socket.on('getFriendsList', () => {
        const userFriends = friendships.get(socket.id) || new Set();
        const friendsData = Array.from(userFriends).map(friendId => {
            const friend = users.get(friendId);
            return friend ? {
                id: friendId,
                username: friend.username,
                avatar: friend.avatar,
                status: friend.status,
                customStatus: friend.customStatus,
                lastSeen: friend.lastSeen
            } : null;
        }).filter(Boolean);

        socket.emit('friendsList', { friends: friendsData });
    });

    // Get direct message conversations
    socket.on('getDirectMessages', () => {
        const conversations = [];
        
        for (const [conversationId, dmData] of directMessages.entries()) {
            if (dmData.participants.includes(socket.id)) {
                const otherParticipant = dmData.participants.find(id => id !== socket.id);
                const otherUser = users.get(otherParticipant);
                
                if (otherUser) {
                    conversations.push({
                        conversationId: conversationId,
                        participant: {
                            id: otherParticipant,
                            username: otherUser.username,
                            avatar: otherUser.avatar,
                            status: otherUser.status
                        },
                        lastMessage: dmData.messages[dmData.messages.length - 1] || null,
                        lastActivity: dmData.lastActivity
                    });
                }
            }
        }

        socket.emit('directMessagesList', { conversations });
    });
});

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(PORT, () => {
    console.log(`🚀 ChatSphere Server running on http://localhost:${PORT}`);
    console.log('✨ Features: Servers, Channels, Friends, Private Messages, Voice/Video Calls, and more!');
    console.log('🌐 Open your browser and navigate to the URL above to start connecting!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});