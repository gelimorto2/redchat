const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure data directory exists for account persistence
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const accountsFile = path.join(dataDir, 'accounts.json');
const avatarsFile = path.join(dataDir, 'avatars.json');
const stickersFile = path.join(dataDir, 'stickers.json');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept all file types, but categorize them
    cb(null, true);
  }
});

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Store connected users and data
const users = new Map();
const userAvatars = loadAvatars(); // Load from file
const accounts = loadAccounts(); // Load from file
const userStickers = loadStickers(); // Load from file
const rooms = new Map();
const chatHistory = new Map(); // Store chat messages by room
const friendships = new Map(); // Store friendships by user ID
const friendRequests = new Map(); // Store pending friend requests
const customRooms = new Map(); // Store custom rooms data
const roomMembers = new Map(); // Store room memberships
const adminUsers = new Set(['gelimorto']); // Admin users
const publicRooms = new Map(); // Public rooms for discovery

// Load avatars from file
function loadAvatars() {
  try {
    if (fs.existsSync(avatarsFile)) {
      const data = fs.readFileSync(avatarsFile, 'utf8');
      const avatarsData = JSON.parse(data);
      const avatarsMap = new Map();
      
      for (const [username, avatar] of Object.entries(avatarsData)) {
        avatarsMap.set(username, avatar);
      }
      
      console.log(`🖼️  Loaded ${avatarsMap.size} avatars from disk`);
      return avatarsMap;
    }
  } catch (error) {
    console.error('Error loading avatars:', error);
  }
  return new Map();
}

// Save avatars to file
function saveAvatars() {
  try {
    const avatarsData = {};
    for (const [username, avatar] of userAvatars.entries()) {
      avatarsData[username] = avatar;
    }
    fs.writeFileSync(avatarsFile, JSON.stringify(avatarsData));
    console.log(`💾 Saved ${userAvatars.size} avatars to disk`);
  } catch (error) {
    console.error('Error saving avatars:', error);
  }
}

// Load stickers from file
function loadStickers() {
  try {
    if (fs.existsSync(stickersFile)) {
      const data = fs.readFileSync(stickersFile, 'utf8');
      const stickersData = JSON.parse(data);
      const stickersMap = new Map();
      
      for (const [username, stickers] of Object.entries(stickersData)) {
        stickersMap.set(username, stickers);
      }
      
      console.log(`🎨 Loaded stickers for ${stickersMap.size} users from disk`);
      return stickersMap;
    }
  } catch (error) {
    console.error('Error loading stickers:', error);
  }
  return new Map();
}

// Save stickers to file
function saveStickers() {
  try {
    const stickersData = {};
    for (const [username, stickers] of userStickers.entries()) {
      stickersData[username] = stickers;
    }
    fs.writeFileSync(stickersFile, JSON.stringify(stickersData));
    console.log(`💾 Saved stickers for ${userStickers.size} users to disk`);
  } catch (error) {
    console.error('Error saving stickers:', error);
  }
}

// Load accounts from file
function loadAccounts() {
  try {
    if (fs.existsSync(accountsFile)) {
      const data = fs.readFileSync(accountsFile, 'utf8');
      const accountsData = JSON.parse(data);
      const accountsMap = new Map();
      
      // Convert stored data back to Map with Date objects
      for (const [username, account] of Object.entries(accountsData)) {
        accountsMap.set(username, {
          ...account,
          createdAt: new Date(account.createdAt),
          lastLogin: new Date(account.lastLogin)
        });
      }
      
      console.log(`📁 Loaded ${accountsMap.size} accounts from disk`);
      return accountsMap;
    }
  } catch (error) {
    console.error('Error loading accounts:', error);
  }
  return new Map();
}

// Save accounts to file
function saveAccounts() {
  try {
    const accountsData = {};
    for (const [username, account] of accounts.entries()) {
      accountsData[username] = account;
    }
    fs.writeFileSync(accountsFile, JSON.stringify(accountsData, null, 2));
    console.log(`💾 Saved ${accounts.size} accounts to disk`);
  } catch (error) {
    console.error('Error saving accounts:', error);
  }
}

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Determine file type
  const fileExt = path.extname(req.file.originalname).toLowerCase();
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/.test(fileExt);
  const isVideo = /\.(mp4|webm|ogg|mov)$/.test(fileExt);
  const isAudio = /\.(mp3|wav|ogg|m4a)$/.test(fileExt);
  const isDocument = /\.(pdf|doc|docx|txt|rtf)$/.test(fileExt);
  
  let fileType = 'other';
  if (isImage) fileType = 'image';
  else if (isVideo) fileType = 'video';
  else if (isAudio) fileType = 'audio';
  else if (isDocument) fileType = 'document';
  
  res.json({
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: `/uploads/${req.file.filename}`,
    type: fileType,
    size: req.file.size
  });
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user login
  socket.on('login', (data) => {
    const { username, password } = data;
    
    if (!username || username.trim() === '') {
      socket.emit('error', 'Username is required');
      return;
    }
    
    if (username.length > 20) {
      socket.emit('error', 'Username must be 20 characters or less');
      return;
    }

    const cleanUsername = username.trim();
    
    // Check if username is currently online
    const existingUser = Array.from(users.values()).find(user => user.username === cleanUsername);
    if (existingUser) {
      socket.emit('error', 'Username already online');
      return;
    }

    // Check if account exists
    const existingAccount = accounts.get(cleanUsername);
    
    if (existingAccount) {
      // Account exists, verify password
      if (!password || existingAccount.password !== password) {
        socket.emit('error', 'Invalid password for existing account');
        return;
      }
      
      // Update last login
      existingAccount.lastLogin = new Date();
      saveAccounts(); // Save after login update
    } else {
      // Create new account
      if (!password) {
        socket.emit('error', 'Password required for new accounts');
        return;
      }
      
      accounts.set(cleanUsername, {
        username: cleanUsername,
        password: password,
        createdAt: new Date(),
        lastLogin: new Date()
      });
      saveAccounts(); // Save after account creation
    }

    users.set(socket.id, {
      username: cleanUsername,
      id: socket.id,
      joinTime: new Date(),
      isAdmin: adminUsers.has(cleanUsername)
    });

    socket.username = cleanUsername;
    socket.join('general'); // Join general chat room

    // Initialize user data if not exists
    if (!chatHistory.has(cleanUsername)) {
      chatHistory.set(cleanUsername, new Map());
    }
    if (!friendships.has(cleanUsername)) {
      friendships.set(cleanUsername, new Set());
    }
    if (!friendRequests.has(cleanUsername)) {
      friendRequests.set(cleanUsername, { sent: new Set(), received: new Set() });
    }

    socket.emit('joinSuccess', { username: cleanUsername });
    
    // Send user's custom stickers if they exist
    if (userStickers.has(cleanUsername)) {
      socket.emit('syncStickers', { stickers: userStickers.get(cleanUsername) });
    }
    
    // Emit updated user lists and friends to all users
    // Broadcast user list including avatar data if available
    io.emit('userListUpdate', Array.from(users.values()).map(user => ({
      username: user.username,
      id: user.id,
      joinTime: user.joinTime,
      isAdmin: user.isAdmin,
      avatar: userAvatars.get(user.username) || null
    })));


    // Send friends and requests to the new user
    const userFriends = Array.from(friendships.get(cleanUsername) || []);
    const userRequests = friendRequests.get(cleanUsername) || { sent: new Set(), received: new Set() };
    
    socket.emit('friendsUpdate', userFriends);
    socket.emit('friendRequestsUpdate', {
      sent: Array.from(userRequests.sent),
      received: Array.from(userRequests.received)
    });

    // Load chat history for general room
    const generalHistory = chatHistory.get('general') || new Map();
    const messages = Array.from(generalHistory.values()).slice(-50); // Last 50 messages
    socket.emit('chatHistory', { room: 'general', messages });

    console.log(`${cleanUsername} joined the chat`);
  });

  // Keep the old join handler for backwards compatibility temporarily
  socket.on('join', (username) => {
    if (!username || username.trim() === '') {
      socket.emit('error', 'Username is required');
      return;
    }

    // Check if username is already taken
    const existingUser = Array.from(users.values()).find(user => user.username === username);
    if (existingUser) {
      socket.emit('error', 'Username already taken');
      return;
    }

    users.set(socket.id, {
      username: username,
      id: socket.id,
      joinTime: new Date(),
      isAdmin: adminUsers.has(username)
    });

    socket.username = username;
    socket.join('general'); // Join general chat room

    // Initialize user data if not exists
    if (!chatHistory.has(username)) {
      chatHistory.set(username, new Map());
    }
    if (!friendships.has(username)) {
      friendships.set(username, new Set());
    }
    if (!friendRequests.has(username)) {
      friendRequests.set(username, { sent: new Set(), received: new Set() });
    }

    // Initialize room memberships
    if (!roomMembers.has(username)) {
      roomMembers.set(username, new Set(['general'])); // Everyone starts in general
    }

    // Send success message to user
    socket.emit('joinSuccess', { username: username });
    
    // Send chat history for general room
    if (chatHistory.has('general')) {
      const generalHistory = Array.from(chatHistory.get('general').values()).slice(-50); // Last 50 messages
      socket.emit('chatHistory', { room: 'general', messages: generalHistory });
    }
    
    // Send user's friends list
    const userFriends = Array.from(friendships.get(username) || []);
    const friendsData = userFriends.map(friendName => {
      const friendUser = Array.from(users.values()).find(u => u.username === friendName);
      return {
        username: friendName,
        online: !!friendUser
      };
    });
    socket.emit('friendsUpdate', friendsData);
    
    // Send user's custom rooms
    const userRoomsList = Array.from(roomMembers.get(username) || []);
    const roomsData = userRoomsList.map(roomId => {
      if (roomId === 'general') {
        return {
          id: 'general',
          name: 'General',
          description: 'Public chat for everyone',
          memberCount: users.size,
          isPublic: true
        };
      }
      const room = customRooms.get(roomId);
      return room ? {
        ...room,
        memberCount: Array.from(roomMembers.values()).filter(memberRooms => memberRooms.has(roomId)).length
      } : null;
    }).filter(Boolean);
    socket.emit('roomsUpdate', roomsData);
    
    // Send pending friend requests
    const requests = friendRequests.get(username);
    socket.emit('friendRequestsUpdate', {
      sent: Array.from(requests.sent),
      received: Array.from(requests.received)
    });
    
    // Broadcast user list update
    io.emit('userListUpdate', Array.from(users.values()).map(user => ({
      username: user.username,
      id: user.id,
      joinTime: user.joinTime,
      isAdmin: user.isAdmin,
      avatar: userAvatars.get(user.username) || null
    })));
    
    // Notify others about new user
    socket.to('general').emit('userJoined', {
      username: username,
      timestamp: new Date().toISOString()
    });

    console.log(`${username} joined the chat`);
  });

  // Allow clients to update their profile picture (base64 string). Broadcast updated user list.
  socket.on('updateProfilePic', (data) => {
    if (!socket.username) return;
    if (!data || !data.image) return;
    userAvatars.set(socket.username, data.image);
    saveAvatars(); // Save avatars to disk

    io.emit('userListUpdate', Array.from(users.values()).map(user => ({
      username: user.username,
      id: user.id,
      joinTime: user.joinTime,
      isAdmin: user.isAdmin,
      avatar: userAvatars.get(user.username) || null
    })));
  });

  // Handle custom sticker sync
  socket.on('syncCustomStickers', (data) => {
    if (!socket.username) return;
    if (!data || !Array.isArray(data.stickers)) return;
    
    userStickers.set(socket.username, data.stickers);
    saveStickers(); // Save stickers to disk
    console.log(`🎨 Synced ${data.stickers.length} stickers for ${socket.username}`);
  });

  // Request stickers (in case client needs to re-sync)
  socket.on('requestStickers', () => {
    if (!socket.username) return;
    if (userStickers.has(socket.username)) {
      socket.emit('syncStickers', { stickers: userStickers.get(socket.username) });
    }
  });

  // Handle public messages
  socket.on('message', (data) => {
    if (!socket.username) {
      socket.emit('error', 'You must join with a username first');
      return;
    }

    const roomId = data.room || 'general';
    
    // Check if user is member of the room (for custom rooms)
    if (roomId !== 'general') {
      const userRooms = roomMembers.get(socket.username);
      if (!userRooms || !userRooms.has(roomId)) {
        socket.emit('error', 'You are not a member of this room');
        return;
      }
    }

    const messageData = {
      id: Date.now() + Math.random(),
      username: socket.username,
      message: data.message,
      timestamp: new Date().toISOString(),
      type: data.isSticker ? 'sticker' : 'text',
      isSticker: data.isSticker || false,
      isCustomSticker: data.isCustomSticker || false,
      room: roomId
    };

    // If the client included reply information, try to resolve the original message content
    if (data.replyTo) {
      let resolved = null;
      if (chatHistory.has(roomId)) {
        resolved = chatHistory.get(roomId).get(data.replyTo.id);
      }
      if (resolved) {
        messageData.replyTo = { id: data.replyTo.id, username: resolved.username, message: resolved.message };
      } else {
        // Fallback to client-provided reply data
        messageData.replyTo = data.replyTo;
      }
    }

    // Store message in chat history
    if (!chatHistory.has(roomId)) {
      chatHistory.set(roomId, new Map());
    }
    chatHistory.get(roomId).set(messageData.id, messageData);

    if (roomId === 'general') {
      io.to('general').emit('message', messageData);
    } else {
      io.to(roomId).emit('message', messageData);
    }
    
    console.log(`Message from ${socket.username} in ${roomId}: ${data.message}`);
  });

  // Handle image messages (DM, custom rooms, or general)
  socket.on('imageMessage', (data) => {
    if (!socket.username) {
      socket.emit('error', 'You must join with a username first');
      return;
    }

    const target = data.room || 'general';
    const messageData = {
      id: Date.now() + Math.random(),
      username: socket.username,
      message: data.message || '',
      imagePath: data.imagePath,
      imageOriginalName: data.imageOriginalName,
      timestamp: new Date().toISOString(),
      type: 'image',
      room: target
    };

    if (data.replyTo) {
      // Resolve reply within the history key if possible
      let historyKey = historyKey = targetUser ? [socket.username, targetUser.username].sort().join('-dm-') : (isCustomRoom ? target : 'general');
      let resolved = null;
      if (chatHistory.has(historyKey)) resolved = chatHistory.get(historyKey).get(data.replyTo.id);
      messageData.replyTo = resolved ? { id: data.replyTo.id, username: resolved.username, message: resolved.message } : data.replyTo;
    }
    
    // Determine destination: DM vs custom room vs general
    const targetUser = Array.from(users.values()).find(user => user.username === target);
    const isCustomRoom = customRooms.has(target);

    // Store message in appropriate chat history
    let historyKey = 'general';
    if (targetUser) {
      historyKey = [socket.username, targetUser.username].sort().join('-dm-');
      messageData.isPrivate = true;
    } else if (isCustomRoom) {
      historyKey = target;
    }

    if (!chatHistory.has(historyKey)) {
      chatHistory.set(historyKey, new Map());
    }
    chatHistory.get(historyKey).set(messageData.id, messageData);

    // Emit to proper channel
    if (targetUser) {
      // Direct image message
      io.to(targetUser.id).emit('message', messageData);
      socket.emit('message', messageData);
    } else if (isCustomRoom) {
      // Custom room (ensure membership)
      const userRooms = roomMembers.get(socket.username);
      if (!userRooms || !userRooms.has(target)) {
        socket.emit('error', 'You are not a member of this room');
        return;
      }
      io.to(target).emit('message', messageData);
    } else {
      // General
      io.to('general').emit('message', messageData);
    }
  });

  // Handle file messages (DM, custom rooms, or general)
  socket.on('fileMessage', (data) => {
    if (!socket.username) {
      socket.emit('error', 'You must join with a username first');
      return;
    }

    const target = data.room || 'general';
    const messageData = {
      id: Date.now() + Math.random(),
      username: socket.username,
      message: data.message || '',
      filePath: data.filePath,
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileType: data.fileType,
      timestamp: new Date().toISOString(),
      type: 'file',
      room: target
    };
    
    if (data.replyTo) {
      const targetUser = Array.from(users.values()).find(user => user.username === target);
      let historyKey = targetUser ? [socket.username, targetUser.username].sort().join('-dm-') : (isCustomRoom ? target : 'general');
      let resolved = null;
      if (chatHistory.has(historyKey)) resolved = chatHistory.get(historyKey).get(data.replyTo.id);
      messageData.replyTo = resolved ? { id: data.replyTo.id, username: resolved.username, message: resolved.message } : data.replyTo;
    }
    
    const targetUser = Array.from(users.values()).find(user => user.username === target);
    const isCustomRoom = customRooms.has(target);

    // Store message in appropriate chat history
    let historyKey = 'general';
    if (targetUser) {
      historyKey = [socket.username, targetUser.username].sort().join('-dm-');
      messageData.isPrivate = true;
    } else if (isCustomRoom) {
      historyKey = target;
    }

    if (!chatHistory.has(historyKey)) {
      chatHistory.set(historyKey, new Map());
    }
    chatHistory.get(historyKey).set(messageData.id, messageData);

    // Emit to proper channel
    if (targetUser) {
      io.to(targetUser.id).emit('fileMessage', messageData);
      socket.emit('fileMessage', messageData);
    } else if (isCustomRoom) {
      const userRooms = roomMembers.get(socket.username);
      if (!userRooms || !userRooms.has(target)) {
        socket.emit('error', 'You are not a member of this room');
        return;
      }
      io.to(target).emit('fileMessage', messageData);
    } else {
      io.to('general').emit('fileMessage', messageData);
    }
  });

  // Handle direct messages
  socket.on('directMessage', (data) => {
    if (!socket.username) {
      socket.emit('error', 'You must join with a username first');
      return;
    }

    const targetUser = Array.from(users.values()).find(user => user.username === data.targetUsername);
    
    if (!targetUser) {
      socket.emit('error', 'User not found');
      return;
    }

    const messageData = {
      id: Date.now() + Math.random(),
      username: socket.username,
      message: data.message,
      timestamp: new Date().toISOString(),
      type: 'text',
      room: data.targetUsername,
      isPrivate: true
    };

    if (data.replyTo) {
      const dmRoomIdLookup = [socket.username, data.targetUsername].sort().join('-dm-');
      let resolved = null;
      if (chatHistory.has(dmRoomIdLookup)) resolved = chatHistory.get(dmRoomIdLookup).get(data.replyTo.id);
      messageData.replyTo = resolved ? { id: data.replyTo.id, username: resolved.username, message: resolved.message } : data.replyTo;
    }

    // Store message in both users' chat history
    const dmRoomId = [socket.username, data.targetUsername].sort().join('-dm-');
    if (!chatHistory.has(dmRoomId)) {
      chatHistory.set(dmRoomId, new Map());
    }
    chatHistory.get(dmRoomId).set(messageData.id, messageData);

    // Send to target user and sender
    io.to(targetUser.id).emit('message', messageData);
    socket.emit('message', messageData);

    console.log(`DM from ${socket.username} to ${data.targetUsername}: ${data.message}`);
  });

  // Handle chat history requests (general, DM, custom rooms)
  socket.on('requestChatHistory', (data) => {
    if (!socket.username) return;

    let historyKey;
    if (data.room === 'general') {
      historyKey = 'general';
    } else {
      // DM or custom room
      if (customRooms.has(data.room)) {
        historyKey = data.room;
      } else {
        historyKey = [socket.username, data.room].sort().join('-dm-');
      }
    }

    if (chatHistory.has(historyKey)) {
      const messages = Array.from(chatHistory.get(historyKey).values()).slice(-50);
      socket.emit('chatHistory', { room: data.room, messages });
    } else {
      socket.emit('chatHistory', { room: data.room, messages: [] });
    }
  });

  // Handle friend requests
  socket.on('sendFriendRequest', (data) => {
    if (!socket.username) return;

    const targetUser = Array.from(users.values()).find(user => user.username === data.targetUsername);
    const targetRequests = friendRequests.get(data.targetUsername);
    const senderRequests = friendRequests.get(socket.username);
    const senderFriends = friendships.get(socket.username);

    if (!targetRequests || !senderRequests || !senderFriends) {
      socket.emit('error', 'User not found');
      return;
    }

    // Check if already friends
    if (senderFriends.has(data.targetUsername)) {
      socket.emit('error', 'Already friends with this user');
      return;
    }

    // Check if request already sent
    if (senderRequests.sent.has(data.targetUsername)) {
      socket.emit('error', 'Friend request already sent');
      return;
    }

    // Add friend request
    senderRequests.sent.add(data.targetUsername);
    targetRequests.received.add(socket.username);

    // Notify target user if online
    if (targetUser) {
      io.to(targetUser.id).emit('friendRequestReceived', {
        from: socket.username,
        timestamp: new Date().toISOString()
      });
      io.to(targetUser.id).emit('friendRequestsUpdate', {
        sent: Array.from(targetRequests.sent),
        received: Array.from(targetRequests.received)
      });
    }

    // Update sender
    socket.emit('friendRequestsUpdate', {
      sent: Array.from(senderRequests.sent),
      received: Array.from(senderRequests.received)
    });
  });

  socket.on('acceptFriendRequest', (data) => {
    if (!socket.username) return;

    const senderUser = Array.from(users.values()).find(user => user.username === data.fromUsername);
    const receiverRequests = friendRequests.get(socket.username);
    const senderRequests = friendRequests.get(data.fromUsername);
    const receiverFriends = friendships.get(socket.username);
    const senderFriends = friendships.get(data.fromUsername);

    if (!receiverRequests || !senderRequests || !receiverFriends || !senderFriends) {
      socket.emit('error', 'User not found');
      return;
    }

    // Remove friend request
    receiverRequests.received.delete(data.fromUsername);
    senderRequests.sent.delete(socket.username);

    // Add to friends lists
    receiverFriends.add(data.fromUsername);
    senderFriends.add(socket.username);

    // Update both users
    const receiverFriendsData = Array.from(receiverFriends).map(friendName => {
      const friendUser = Array.from(users.values()).find(u => u.username === friendName);
      return { username: friendName, online: !!friendUser };
    });

    socket.emit('friendsUpdate', receiverFriendsData);
    socket.emit('friendRequestsUpdate', {
      sent: Array.from(receiverRequests.sent),
      received: Array.from(receiverRequests.received)
    });

    // Notify sender if online
    if (senderUser) {
      const senderFriendsData = Array.from(senderFriends).map(friendName => {
        const friendUser = Array.from(users.values()).find(u => u.username === friendName);
        return { username: friendName, online: !!friendUser };
      });

      io.to(senderUser.id).emit('friendsUpdate', senderFriendsData);
      io.to(senderUser.id).emit('friendRequestsUpdate', {
        sent: Array.from(senderRequests.sent),
        received: Array.from(senderRequests.received)
      });
      io.to(senderUser.id).emit('friendRequestAccepted', {
        by: socket.username,
        timestamp: new Date().toISOString()
      });
    }
  });

  socket.on('rejectFriendRequest', (data) => {
    if (!socket.username) return;

    const senderUser = Array.from(users.values()).find(user => user.username === data.fromUsername);
    const receiverRequests = friendRequests.get(socket.username);
    const senderRequests = friendRequests.get(data.fromUsername);

    if (!receiverRequests || !senderRequests) {
      socket.emit('error', 'User not found');
      return;
    }

    // Remove friend request
    receiverRequests.received.delete(data.fromUsername);
    senderRequests.sent.delete(socket.username);

    // Update both users
    socket.emit('friendRequestsUpdate', {
      sent: Array.from(receiverRequests.sent),
      received: Array.from(receiverRequests.received)
    });

    if (senderUser) {
      io.to(senderUser.id).emit('friendRequestsUpdate', {
        sent: Array.from(senderRequests.sent),
        received: Array.from(senderRequests.received)
      });
    }
  });

  socket.on('removeFriend', (data) => {
    if (!socket.username) return;

    const targetUser = Array.from(users.values()).find(user => user.username === data.friendUsername);
    const userFriends = friendships.get(socket.username);
    const friendFriends = friendships.get(data.friendUsername);

    if (!userFriends || !friendFriends) {
      socket.emit('error', 'User not found');
      return;
    }

    // Remove from both friends lists
    userFriends.delete(data.friendUsername);
    friendFriends.delete(socket.username);

    // Update user
    const userFriendsData = Array.from(userFriends).map(friendName => {
      const friendUser = Array.from(users.values()).find(u => u.username === friendName);
      return { username: friendName, online: !!friendUser };
    });
    socket.emit('friendsUpdate', userFriendsData);

    // Update friend if online
    if (targetUser) {
      const friendFriendsData = Array.from(friendFriends).map(friendName => {
        const friendUser = Array.from(users.values()).find(u => u.username === friendName);
        return { username: friendName, online: !!friendUser };
      });
      io.to(targetUser.id).emit('friendsUpdate', friendFriendsData);
    }
  });

  // Handle typing indicators (general, DM, custom rooms)
  socket.on('typing', (data) => {
    if (!socket.username) return;
    
    if (data.room === 'general') {
      socket.to('general').emit('userTyping', {
        username: socket.username,
        room: data.room
      });
    } else {
      const targetUser = Array.from(users.values()).find(user => user.username === data.room);
      if (targetUser) {
        io.to(targetUser.id).emit('userTyping', { username: socket.username, room: data.room });
      } else if (customRooms.has(data.room)) {
        io.to(data.room).emit('userTyping', { username: socket.username, room: data.room });
      }
    }
  });

  socket.on('stopTyping', (data) => {
    if (!socket.username) return;
    
    if (data.room === 'general') {
      socket.to('general').emit('userStoppedTyping', {
        username: socket.username,
        room: data.room
      });
    } else {
      const targetUser = Array.from(users.values()).find(user => user.username === data.room);
      if (targetUser) {
        io.to(targetUser.id).emit('userStoppedTyping', { username: socket.username, room: data.room });
      } else if (customRooms.has(data.room)) {
        io.to(data.room).emit('userStoppedTyping', { username: socket.username, room: data.room });
      }
    }
  });

  // Handle room creation
  socket.on('createRoom', (data) => {
    if (!socket.username) return;

    const roomId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
    const roomData = {
      id: roomId,
      name: data.name,
      description: data.description || '',
      creator: socket.username,
      isPublic: !data.isPrivate,
      createdAt: new Date().toISOString(),
      members: new Set([socket.username])
    };

    customRooms.set(roomId, roomData);
    
    // Add creator to room members
    if (!roomMembers.has(socket.username)) {
      roomMembers.set(socket.username, new Set());
    }
    roomMembers.get(socket.username).add(roomId);
    
    // Join the socket room
    socket.join(roomId);
    
    // Initialize chat history for the room
    chatHistory.set(roomId, new Map());
    
    // Send room update to creator
    const userRoomsList = Array.from(roomMembers.get(socket.username));
    const roomsData = userRoomsList.map(rId => {
      if (rId === 'general') {
        return {
          id: 'general',
          name: 'General',
          description: 'Public chat for everyone',
          memberCount: users.size,
          isPublic: true
        };
      }
      const room = customRooms.get(rId);
      if (!room) return null;
      
      return {
        id: room.id,
        name: room.name,
        description: room.description,
        creator: room.creator,
        isPublic: room.isPublic,
        createdAt: room.createdAt,
        memberCount: Array.from(roomMembers.values()).filter(memberRooms => memberRooms.has(rId)).length
      };
    }).filter(Boolean);
    
    socket.emit('roomsUpdate', roomsData);
    
    // Send room data without the Set for members (convert to count)
    socket.emit('roomCreated', { 
      roomId, 
      room: {
        id: roomData.id,
        name: roomData.name,
        description: roomData.description,
        creator: roomData.creator,
        isPublic: roomData.isPublic,
        createdAt: roomData.createdAt,
        memberCount: roomData.members.size
      }
    });
    
    console.log(`Room "${data.name}" created by ${socket.username}`);
  });

  socket.on('joinRoom', (data) => {
    if (!socket.username) return;

    const room = customRooms.get(data.roomId);
    if (!room) {
      socket.emit('error', 'Room not found');
      return;
    }

    // Check if room is private and user is not invited
    if (!room.isPublic && !room.members.has(socket.username)) {
      socket.emit('error', 'You need an invitation to join this private room');
      return;
    }

    // Add user to room
    room.members.add(socket.username);
    if (!roomMembers.has(socket.username)) {
      roomMembers.set(socket.username, new Set());
    }
    roomMembers.get(socket.username).add(data.roomId);
    
    // Join socket room
    socket.join(data.roomId);
    
    // Send room history
    if (chatHistory.has(data.roomId)) {
      const roomHistory = Array.from(chatHistory.get(data.roomId).values()).slice(-50);
      socket.emit('chatHistory', { room: data.roomId, messages: roomHistory });
    }
    
    // Update rooms list for user
    const userRoomsList = Array.from(roomMembers.get(socket.username));
    const roomsData = userRoomsList.map(rId => {
      if (rId === 'general') {
        return {
          id: 'general',
          name: 'General',
          description: 'Public chat for everyone',
          memberCount: users.size,
          isPublic: true
        };
      }
      const r = customRooms.get(rId);
      return r ? {
        ...r,
        memberCount: Array.from(roomMembers.values()).filter(memberRooms => memberRooms.has(rId)).length
      } : null;
    }).filter(Boolean);
    
    socket.emit('roomsUpdate', roomsData);
    
    // Notify other room members
    socket.to(data.roomId).emit('userJoinedRoom', {
      username: socket.username,
      roomId: data.roomId,
      timestamp: new Date().toISOString()
    });
    
    console.log(`${socket.username} joined room ${room.name}`);
  });

  socket.on('inviteToRoom', (data) => {
    if (!socket.username) return;

    const room = customRooms.get(data.roomId);
    if (!room) {
      socket.emit('error', 'Room not found');
      return;
    }

    // Check if user is room member
    if (!room.members.has(socket.username)) {
      socket.emit('error', 'You are not a member of this room');
      return;
    }

    // Invite users
    data.usernames.forEach(username => {
      const targetUser = Array.from(users.values()).find(u => u.username === username);
      
      if (targetUser && !room.members.has(username)) {
        // Add to room members
        room.members.add(username);
        if (!roomMembers.has(username)) {
          roomMembers.set(username, new Set());
        }
        roomMembers.get(username).add(data.roomId);
        
        // Notify invited user
        io.to(targetUser.id).emit('roomInvitation', {
          roomId: data.roomId,
          roomName: room.name,
          invitedBy: socket.username,
          timestamp: new Date().toISOString()
        });
        
        // Join socket room
        io.sockets.sockets.get(targetUser.id)?.join(data.roomId);
        
        // Send updated rooms list
        const userRoomsList = Array.from(roomMembers.get(username));
        const roomsData = userRoomsList.map(rId => {
          if (rId === 'general') {
            return {
              id: 'general',
              name: 'General',
              description: 'Public chat for everyone',
              memberCount: users.size,
              isPublic: true
            };
          }
          const r = customRooms.get(rId);
          return r ? {
            ...r,
            memberCount: Array.from(roomMembers.values()).filter(memberRooms => memberRooms.has(rId)).length
          } : null;
        }).filter(Boolean);
        
        io.to(targetUser.id).emit('roomsUpdate', roomsData);
      }
    });
    
    socket.emit('invitationsSent', { count: data.usernames.length });
  });

  socket.on('leaveRoom', (data) => {
    if (!socket.username || data.roomId === 'general') return;

    const room = customRooms.get(data.roomId);
    if (!room) return;

    // Remove from room
    room.members.delete(socket.username);
    roomMembers.get(socket.username)?.delete(data.roomId);
    
    // Leave socket room
    socket.leave(data.roomId);
    
    // If room is empty and not created by this user, delete it
    if (room.members.size === 0) {
      customRooms.delete(data.roomId);
      chatHistory.delete(data.roomId);
    }
    
    // Update user's rooms list
    const userRoomsList = Array.from(roomMembers.get(socket.username) || []);
    const roomsData = userRoomsList.map(rId => {
      if (rId === 'general') {
        return {
          id: 'general',
          name: 'General',
          description: 'Public chat for everyone',
          memberCount: users.size,
          isPublic: true
        };
      }
      const r = customRooms.get(rId);
      return r ? {
        ...r,
        memberCount: Array.from(roomMembers.values()).filter(memberRooms => memberRooms.has(rId)).length
      } : null;
    }).filter(Boolean);
    
    socket.emit('roomsUpdate', roomsData);
    
    // Notify other room members
    socket.to(data.roomId).emit('userLeftRoom', {
      username: socket.username,
      roomId: data.roomId,
      timestamp: new Date().toISOString()
    });
    
    console.log(`${socket.username} left room ${room.name}`);
  });

  // Handle room search/discovery
  socket.on('requestAvailableRooms', () => {
    if (!socket.username) return;
    
    const availableRooms = [];
    
    customRooms.forEach((room, roomId) => {
      // Skip invalid rooms
      if (!room) return;
      
      const isPrivate = !room.isPublic;
      const joined = room.members.has(socket.username);
      const roomHistory = chatHistory.get(roomId);
      const messageCount = roomHistory ? roomHistory.size : 0;
      
      // Expose public rooms, or private rooms if user is a member
      if (!isPrivate || joined) {
        availableRooms.push({
          id: roomId,
          name: room.name,
          description: room.description || '',
          memberCount: room.members.size,
          messageCount,
          isPrivate,
          joined,
          createdBy: room.creator
        });
      }
    });
    
    // Sort by member count (popular rooms first)
    availableRooms.sort((a, b) => b.memberCount - a.memberCount);
    
    socket.emit('availableRooms', availableRooms);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      
      // Notify friends about user going offline
      const userFriends = friendships.get(user.username) || new Set();
      userFriends.forEach(friendName => {
        const friendUser = Array.from(users.values()).find(u => u.username === friendName);
        if (friendUser) {
          const friendsData = Array.from(friendships.get(friendName) || []).map(fname => {
            const fuser = Array.from(users.values()).find(u => u.username === fname);
            return { username: fname, online: !!fuser };
          });
          io.to(friendUser.id).emit('friendsUpdate', friendsData);
        }
      });
      
      // Broadcast user list update
      io.emit('userListUpdate', Array.from(users.values()).map(user => ({
        username: user.username,
        id: user.id,
        joinTime: user.joinTime,
        isAdmin: user.isAdmin,
        avatar: userAvatars.get(user.username) || null
      })));
      
      // Notify others about user leaving
      socket.to('general').emit('userLeft', {
        username: user.username,
        timestamp: new Date().toISOString()
      });

      console.log(`${user.username} left the chat`);
    } else {
      console.log('User disconnected:', socket.id);
    }
  });
});

// Account cleanup system - remove accounts inactive for more than 1 week
function cleanupInactiveAccounts() {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  let cleanedCount = 0;
  
  for (const [username, account] of accounts.entries()) {
    if (account.lastLogin < oneWeekAgo) {
      // Remove account and associated data
      accounts.delete(username);
      friendships.delete(username);
      friendRequests.delete(username);
      chatHistory.delete(username);
      cleanedCount++;
      
      // Remove from other users' friend lists
      for (const [otherUser, friends] of friendships.entries()) {
        friends.delete(username);
      }
      
      // Remove from other users' friend requests
      for (const [otherUser, requests] of friendRequests.entries()) {
        requests.sent.delete(username);
        requests.received.delete(username);
      }
    }
  }
  
  if (cleanedCount > 0) {
    console.log(`🧹 Cleaned up ${cleanedCount} inactive accounts`);
    saveAccounts(); // Save after cleanup
  }
}

// Run cleanup every 24 hours
setInterval(cleanupInactiveAccounts, 24 * 60 * 60 * 1000);

server.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
  console.log(`🔐 Password-based authentication enabled`);
  console.log(`🧹 Account cleanup system active (7-day inactivity)`);
});
