# Discord-like Chat Application

A fully-featured, Discord-inspired real-time chat application built with Node.js, Express, and Socket.IO. This advanced chat platform includes servers, channels, file uploads, emoji picker, message formatting, and much more!

## 🚀 Features

### Core Chat Features
- **Real-time messaging** - Instant message delivery using WebSocket (Socket.IO)
- **Server & Channel System** - Create multiple servers with multiple text channels
- **User presence & status** - Online/Away/Busy/Invisible status indicators
- **Typing indicators** - Real-time typing status per channel
- **Message formatting** - Support for **bold**, *italic*, `code`, and ~~strikethrough~~

### Advanced Features
- **File uploads** - Share images, documents, and other files (10MB limit)
- **Image previews** - Automatic image display in chat
- **Emoji picker** - Full emoji support with categorized picker
- **User management** - Member list with avatars and status
- **Server creation** - Users can create their own servers
- **Channel creation** - Create new text channels within servers
- **Connection status** - Visual connection monitoring
- **Responsive design** - Works perfectly on desktop and mobile

### Discord-like UI/UX
- **Server sidebar** - Navigate between different servers
- **Channel list** - Browse channels within each server
- **Member sidebar** - View online members with status
- **Modern dark theme** - Discord-inspired color scheme
- **Intuitive navigation** - Familiar Discord-like interface
- **Smooth animations** - Polished user experience

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js, Socket.IO, Multer
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Real-time**: WebSocket communication via Socket.IO
- **File Handling**: Multer for file uploads with size limits
- **Security**: Helmet, CORS protection
- **Styling**: Custom CSS with Discord-like design system

## 📁 Project Structure

```
chat/
├── server.js              # Enhanced server with servers/channels system
├── package.json            # Updated dependencies
├── README.md              # This documentation
├── public/
│   ├── index.html         # Discord-like UI interface
│   ├── style.css          # Discord-inspired styling
│   ├── script.js          # Advanced client-side functionality
│   └── uploads/           # File upload directory (auto-created)
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd /home/leo/chat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

### Development Mode

For development with auto-restart:

```bash
npm run dev
```

## 💻 Usage Guide

### Getting Started
1. **Enter your username** on the Discord-like login screen
2. **Join the main server** - You'll start in the default "Main Server"
3. **Navigate channels** - Click on #general or other channels in the sidebar
4. **Start chatting** - Type messages with full formatting support

### Server Management
- **Create servers** - Click the "+" button in the servers sidebar
- **Switch servers** - Click on server icons in the left sidebar
- **Server settings** - Access server information and settings

### Channel Features
- **Create channels** - Use the "+" button next to "TEXT CHANNELS"
- **Switch channels** - Click on any channel name to switch
- **Channel types** - Currently supports text channels

### Messaging Features
- **Send messages** - Type and press Enter or use Shift+Enter for new lines
- **File uploads** - Click the "+" button to upload files (images, documents)
- **Emoji picker** - Click the emoji button to access hundreds of emojis
- **Text formatting**:
  - `**bold text**` → **bold text**
  - `*italic text*` → *italic text*
  - `` `code` `` → `code`
  - `~~strikethrough~~` → ~~strikethrough~~

### User Features
- **Status management** - Change your status (Online, Away, Busy, Invisible)
- **Member list** - View all online users in the current server
- **User avatars** - Automatic avatar generation from username initials

## 🎨 Advanced Features in Detail

### File Upload System
- **Supported formats**: Images (JPEG, PNG, GIF, WebP), Documents (PDF, DOC, TXT), Archives (ZIP, RAR)
- **File size limit**: 10MB per file
- **Image preview**: Images display directly in chat
- **File information**: Shows filename and size for documents

### Emoji System
- **Categories**: Recent, Smileys, People, Nature, Food, Activities, Travel, Objects, Symbols
- **Recent emojis**: Automatically tracks your most used emojis
- **Quick access**: Click emoji button or type to insert emojis

### Server & Channel Architecture
- **Multi-server support**: Join or create multiple servers
- **Channel organization**: Each server can have multiple text channels
- **Real-time sync**: All changes sync instantly across users
- **Permissions**: Server owners can manage their servers

### Status System
- **Online** (green) - Active and available
- **Away** (yellow) - Away from keyboard
- **Do Not Disturb** (red) - Busy, minimal notifications
- **Invisible** (gray) - Appear offline to others

## 🔧 Configuration

### Server Settings
- **Port**: Default 3000 (configurable via PORT environment variable)
- **File upload path**: `public/uploads/` (auto-created)
- **File size limit**: 10MB (configurable in server.js)

### Security Features
- **CORS protection** - Cross-origin request security
- **Helmet protection** - Security headers
- **File type validation** - Only allow safe file types
- **Input sanitization** - XSS protection for messages

### Customization Options
- **Themes**: Easy to modify via CSS variables
- **File limits**: Adjustable upload size limits
- **Emoji sets**: Expandable emoji categories
- **Server limits**: Configurable server and channel limits

## 🔍 API Events (Socket.IO)

### Client to Server Events
```javascript
// User management
join({ username, serverId })      // Join with username and server
changeStatus(status)              // Change user status

// Server & Channel management
createServer({ name, description })    // Create new server
createChannel({ serverId, name, description })  // Create new channel
joinServer(serverId)              // Switch to different server
switchChannel(channelId)          // Switch to different channel

// Messaging
sendMessage({ message, file })    // Send text message or file
typing({ isTyping })             // Send typing indicator
addReaction({ messageId, emoji }) // Add reaction to message
```

### Server to Client Events
```javascript
// Server data
serverData({ servers, channels, currentServer, currentChannel })
serverCreated({ server, channel })
channelCreated(channel)
channelSwitched({ channelId, channel })

// Messages
newMessage(messageData)           // New chat message
systemMessage({ message })        // System notifications
reactionAdded({ messageId, emoji, userId, username })

// User events
userList({ serverId, users })     // Updated user list
userJoined({ username, message }) // User joined notification
userLeft({ username, message })   // User left notification
userTyping({ username, isTyping, channelId })
statusChanged({ userId, status })
```

## 🚨 Troubleshooting

### Common Issues

**Server won't start:**
```bash
# Check if port is in use
sudo lsof -ti:3000 | xargs kill -9

# Try different port
PORT=3001 npm start
```

**File uploads failing:**
- Check file size (must be under 10MB)
- Ensure file type is supported
- Verify uploads directory exists and is writable

**UI not loading properly:**
- Clear browser cache
- Check browser console for JavaScript errors
- Ensure all static files are being served correctly

**Users not appearing:**
- Verify Socket.IO connection is established
- Check server logs for connection errors
- Ensure users are joining the same server

### Performance Tips

**For high traffic:**
- Implement Redis for Socket.IO scaling
- Add message history database (MongoDB/PostgreSQL)
- Implement rate limiting for messages and uploads
- Add CDN for file delivery

**Memory optimization:**
- Clear old messages periodically
- Implement message pagination
- Optimize image compression for uploads

## 🆕 What's New in Version 2.0

### Major Additions
- ✅ **Server/Channel System** - Full Discord-like server architecture
- ✅ **File Upload System** - Images, documents, and file sharing
- ✅ **Emoji Picker** - Comprehensive emoji support with categories
- ✅ **Enhanced UI** - Complete Discord-like redesign
- ✅ **User Status System** - Online, Away, Busy, Invisible states
- ✅ **Message Formatting** - Markdown-style text formatting
- ✅ **Improved User List** - Fixed and enhanced with avatars and status
- ✅ **Real-time Everything** - Enhanced Socket.IO implementation

### UI/UX Improvements
- 🎨 **Discord-like Theme** - Authentic Discord color scheme and layout
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- ✨ **Smooth Animations** - Polished transitions and effects
- 🖼️ **Image Previews** - Direct image viewing in chat
- 👥 **Enhanced Member List** - Better user management interface

### Technical Enhancements
- 🚀 **Performance Optimizations** - Faster message delivery
- 🔒 **Security Improvements** - Enhanced input validation and security
- 📁 **File Management** - Robust file upload and storage system
- 🔄 **Better Error Handling** - Improved error messages and recovery
- 📊 **Enhanced Logging** - Better server monitoring and debugging

## 📄 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🎉 Enjoy Your Discord-like Chat!

Your enhanced Discord-like chat application is now ready with all advanced features! 

**Key Features Available:**
- ✅ Servers and Channels
- ✅ File Uploads (Images & Documents)
- ✅ Emoji Picker with Categories
- ✅ User Status System
- ✅ Message Formatting
- ✅ Real-time Everything
- ✅ Discord-like UI/UX

Open multiple browser tabs to test the multi-user functionality, create servers, upload files, and enjoy the full Discord-like experience!

---

**Server Status**: ✅ Running on http://localhost:3000 with all advanced features enabled!