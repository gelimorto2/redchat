class ChatApp {
    constructor() {
        this.socket = io();
        this.currentUser = null;
        this.currentRoom = 'general';
        this.typingTimer = null;
        this.isTyping = false;
        this.dmTabs = new Map();
        this.chatHistory = new Map(); // Store chat history locally
        this.friends = new Set();
        this.friendRequests = { sent: new Set(), received: new Set() };
        this.customRooms = new Map(); // Store custom rooms data
        this.selectedUsers = new Set(); // For room invitations
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.customRooms = new Map();
        this.selectedUsers = new Set(); // For room invitations
        
        this.initializeElements();
        this.attachEventListeners();
        this.setupSocketListeners();
        this.applyDarkMode(); // Initialize dark mode
        this.loadAppSettings(); // Load user settings
    }

    loadAppSettings() {
        // Load saved settings on app startup
        const settings = JSON.parse(localStorage.getItem('redChatSettings') || '{}');
        
        if (settings.theme) {
            this.applyTheme(settings.theme);
        }
        
        if (settings.accentColor) {
            this.applyAccentColor(settings.accentColor);
        } else {
            this.applyAccentColor('#667eea'); // Default color
        }
        
        if (settings.fontSize) {
            this.applyFontSize(settings.fontSize);
        } else {
            this.applyFontSize('medium'); // Default size
        }

        // Load profile picture if available
        const profilePic = localStorage.getItem('redChatProfilePic');
        if (profilePic) {
            // Update profile pic in user interface when implemented
            console.log('Profile picture loaded');
        }
    }

    initializeElements() {
        // Login elements
        this.loginScreen = document.getElementById('loginScreen');
        this.loginForm = document.getElementById('loginForm');
        this.usernameInput = document.getElementById('usernameInput');
        this.passwordInput = document.getElementById('passwordInput');
        this.loginError = document.getElementById('loginError');

        // Chat elements
        this.chatApp = document.getElementById('chatApp');
        this.currentUserEl = document.getElementById('currentUser');
        this.leftSidebar = document.getElementById('leftSidebar');
        this.rightSidebar = document.getElementById('rightSidebar');
        this.userList = document.getElementById('userList');
        this.friendsList = document.getElementById('friendsList');
        this.friendRequests = document.getElementById('friendRequests');
        this.roomsList = document.getElementById('roomsList');
        this.onlineCount = document.getElementById('onlineCount');
        this.friendsCount = document.getElementById('friendsCount');
        this.requestsCount = document.getElementById('requestsCount');
        // Settings modal elements
        this.settingsModal = document.getElementById('settingsModal');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.profilePicInput = document.getElementById('profilePicInput');
        this.uploadPfpBtn = document.getElementById('uploadPfpBtn');
        this.userIdDisplay = document.getElementById('userIdDisplay');
        this.copyUserIdBtn = document.getElementById('copyUserIdBtn');
        this.themeSelect = document.getElementById('themeSelect');
        this.accentColorPicker = document.getElementById('accentColorPicker');
        this.fontSizeSelect = document.getElementById('fontSizeSelect');
        this.soundNotificationsCheck = document.getElementById('soundNotifications');
        this.desktopNotificationsCheck = document.getElementById('desktopNotifications');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        this.resetSettingsBtn = document.getElementById('resetSettingsBtn');
        this.roomsCount = document.getElementById('roomsCount');
        this.messagesArea = document.getElementById('messagesArea');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.fileButton = document.getElementById('fileButton');
        this.fileInput = document.getElementById('fileInput');
        this.filePreview = document.getElementById('filePreview');
        this.previewImage = document.getElementById('previewImage');
        this.removeFile = document.getElementById('removeFile');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.chatTabs = document.querySelector('.chat-tabs');
        this.addFriendBtn = document.getElementById('addFriendBtn');
        this.createRoomBtn = document.getElementById('createRoomBtn');
        
        // Modal elements
        this.imageModal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.addFriendModal = document.getElementById('addFriendModal');
        this.addFriendForm = document.getElementById('addFriendForm');
        this.friendUsernameInput = document.getElementById('friendUsernameInput');
        this.createRoomModal = document.getElementById('createRoomModal');
        this.createRoomForm = document.getElementById('createRoomForm');
        this.inviteUsersModal = document.getElementById('inviteUsersModal');
        this.availableUsers = document.getElementById('availableUsers');
        this.userSearchInput = document.getElementById('userSearchInput');
        this.sendInvitesBtn = document.getElementById('sendInvitesBtn');
        
        // Sticker system elements
        this.stickerButton = document.getElementById('stickerButton');
        this.stickerModal = document.getElementById('stickerModal');
        this.stickerGrid = document.getElementById('stickerGrid');
        this.stickerSearch = document.getElementById('stickerSearch');
        
        // Todo system elements  
        this.toolsBtn = document.getElementById('toolsBtn');
        this.toolsMenu = document.getElementById('toolsMenu');
        this.todoMenuBtn = document.getElementById('todoMenuBtn');
        this.todoModal = document.getElementById('todoModal');
        this.todoInput = document.getElementById('todoInput');
        this.addTodoBtn = document.getElementById('addTodoBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.exportChatBtn = document.getElementById('exportChatBtn');
        this.clearCacheBtn = document.getElementById('clearCacheBtn');
        
        // Context menu
        this.contextMenu = document.getElementById('contextMenu');
        
        // Notification sound
        this.notificationSound = document.getElementById('notificationSound');
        
        // Initialize sticker and todo data
        this.stickerData = this.initializeStickerData();
        this.currentStickerCategory = 'smileys';
        this.todos = JSON.parse(localStorage.getItem('chatApp_todos') || '[]');
        
        // Reply system
        this.replyingTo = null;
        this.replyInput = null;
    }

    attachEventListeners() {
        // Login
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));

        // Message sending
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            } else {
                this.handleTyping();
            }
        });

        // File handling
        this.fileButton.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        if (this.removeFile) {
            this.removeFile.addEventListener('click', () => this.clearFilePreview());
        }

        // Sidebar toggles
        const leftToggle = document.getElementById('toggleLeftSidebar');
        if (leftToggle) {
            leftToggle.addEventListener('click', () => {
                this.toggleSidebar('left');
            });
        }
        
        const rightToggle = document.getElementById('toggleRightSidebar');
        if (rightToggle) {
            rightToggle.addEventListener('click', () => {
                this.toggleSidebar('right');
            });
        }
        
        const closeSidebarBtn = document.getElementById('closeSidebar');
        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', () => {
                this.closeSidebars();
            });
        }

        // Sidebar overlay for mobile
        const overlay = document.getElementById('sidebarOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeSidebars();
            });
        }

        // Friend system
        this.addFriendBtn.addEventListener('click', () => this.showAddFriendModal());
        this.addFriendForm.addEventListener('submit', (e) => this.handleAddFriend(e));

        // Room system
        document.getElementById('discoverRoomsBtn')?.addEventListener('click', () => this.showRoomSearchModal());
        this.createRoomBtn.addEventListener('click', () => this.showCreateRoomModal());
        this.createRoomForm.addEventListener('submit', (e) => this.handleCreateRoom(e));
        this.sendInvitesBtn.addEventListener('click', () => this.handleSendInvites());

        // Sticker system
        this.stickerButton.addEventListener('click', () => this.showStickerModal());
        
        // Tools menu system
        this.toolsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toolsMenu.classList.toggle('hidden');
        });
        this.todoMenuBtn.addEventListener('click', () => {
            this.toolsMenu.classList.add('hidden');
            this.showTodoModal();
        });
        this.exportChatBtn.addEventListener('click', () => {
            this.toolsMenu.classList.add('hidden');
            this.exportChatHistory();
        });
        this.clearCacheBtn.addEventListener('click', () => {
            this.toolsMenu.classList.add('hidden');
            this.clearLocalCache();
        });
        
        // Close tools menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.toolsMenu.classList.contains('hidden') && 
                !e.target.closest('.tools-dropdown')) {
                this.toolsMenu.classList.add('hidden');
            }
        });
        
        // Todo system  
        this.addTodoBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompletedTodos());

        // Settings
        if (this.settingsBtn) {
            this.settingsBtn.addEventListener('click', () => this.showSettingsModal());
        }

        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => this.toggleDarkMode());

        // Room list clicks
        document.addEventListener('click', (e) => {
            const roomItem = e.target.closest('.room-item');
            if (roomItem) {
                const roomId = roomItem.dataset.room;
                if (roomId) {
                    this.switchRoom(roomId);
                }
            }
        });

        // Modal handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal') || e.target.dataset.modal) {
                const modalType = e.target.dataset.modal;
                if (modalType === 'addFriend') {
                    this.hideAddFriendModal();
                } else if (modalType === 'createRoom') {
                    this.hideCreateRoomModal();
                } else if (modalType === 'inviteUsers') {
                    this.hideInviteUsersModal();
                } else if (modalType === 'sticker') {
                    this.hideStickerModal();
                } else if (modalType === 'todo') {
                    this.hideTodoModal();
                } else if (modalType === 'settings') {
                    this.hideSettingsModal();
                }
            }
            if (e.target === this.imageModal) this.closeImageModal();
            if (e.target === this.stickerModal) this.hideStickerModal();
            if (e.target === this.todoModal) this.hideTodoModal();
            this.hideContextMenu();
        });

        // Context menu
        document.addEventListener('contextmenu', (e) => {
            const userItem = e.target.closest('.user-item');
            const friendItem = e.target.closest('.friend-item');
            if (userItem || friendItem) {
                e.preventDefault();
                const username = userItem ? userItem.dataset.username : friendItem.dataset.username;
                if (username && username !== this.currentUser) {
                    this.showContextMenu(e, username);
                }
            }
        });

        // Clickable usernames in chat
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('clickable-username')) {
                const username = e.target.dataset.username;
                if (username && username !== this.currentUser) {
                    this.showUserContextMenu(e, username);
                }
            }
        });
        
        // Tab switching
        this.chatTabs.addEventListener('click', (e) => {
            const tab = e.target.closest('.tab');
            if (tab) {
                this.switchRoom(tab.dataset.room);
            }
            
            const closeBtn = e.target.closest('.tab-close');
            if (closeBtn) {
                e.stopPropagation();
                this.closeDMTab(closeBtn.closest('.tab').dataset.room);
            }
        });

        // Stop typing when input loses focus
        this.messageInput.addEventListener('blur', () => this.stopTyping());
    }

    setupSocketListeners() {
        this.socket.on('joinSuccess', (data) => {
            this.currentUser = data.username;
            this.showChatApp();
        });

        this.socket.on('syncStickers', (data) => {
            if (data.stickers && Array.isArray(data.stickers)) {
                localStorage.setItem('customStickers', JSON.stringify(data.stickers));
                this.stickerData.custom = data.stickers;
                console.log(`🎨 Synced ${data.stickers.length} stickers from server`);
            }
        });

        this.socket.on('error', (message) => {
            this.showError(message);
        });

        this.socket.on('message', (data) => {
            this.handleIncomingMessage(data);
            if (data.username !== this.currentUser) {
                this.playNotification();
            }
        });

        this.socket.on('chatHistory', (data) => {
            this.loadChatHistory(data.room, data.messages);
        });

        this.socket.on('friendsUpdate', (friends) => {
            this.updateFriendsList(friends);
        });

        this.socket.on('friendRequestsUpdate', (requests) => {
            this.updateFriendRequests(requests);
        });

        this.socket.on('friendRequestReceived', (data) => {
            this.showNotification(`Friend request from ${data.from}`, 'info');
        });

        this.socket.on('friendRequestAccepted', (data) => {
            this.showNotification(`${data.by} accepted your friend request!`, 'success');
        });

        this.socket.on('roomsUpdate', (rooms) => {
            this.updateRoomsList(rooms);
        });

        this.socket.on('roomCreated', (data) => {
            this.showNotification(`Room "${data.room.name}" created successfully!`, 'success');
            this.switchRoom(data.roomId);
        });

        this.socket.on('roomInvitation', (data) => {
            this.showNotification(`You've been invited to "${data.roomName}" by ${data.invitedBy}`, 'info');
        });

        this.socket.on('userJoinedRoom', (data) => {
            if (this.currentRoom === data.roomId) {
                this.displaySystemMessage(`${data.username} joined the room`, data.timestamp);
            }
        });

        this.socket.on('userLeftRoom', (data) => {
            if (this.currentRoom === data.roomId) {
                this.displaySystemMessage(`${data.username} left the room`, data.timestamp);
            }
        });

        this.socket.on('userListUpdate', (users) => {
            this.updateUserList(users);
        });

        this.socket.on('userJoined', (data) => {
            this.displaySystemMessage(`${data.username} joined the chat`, data.timestamp);
        });

        this.socket.on('userLeft', (data) => {
            this.displaySystemMessage(`${data.username} left the chat`, data.timestamp);
        });

        this.socket.on('userTyping', (data) => {
            this.showTypingIndicator(data.username, data.room);
        });

        this.socket.on('userStoppedTyping', (data) => {
            this.hideTypingIndicator(data.username, data.room);
        });

        this.socket.on('availableRooms', (rooms) => {
            this.displayAvailableRooms(rooms);
        });

        this.socket.on('fileMessage', (data) => {
            this.displayFileMessage(data);
        });
    }

    handleLogin(e) {
        e.preventDefault();
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();
        
        if (!username) {
            this.showError('Please enter a username');
            return;
        }
        
        if (username.length > 20) {
            this.showError('Username must be 20 characters or less');
            return;
        }
        
        this.socket.emit('login', { username, password });
    }

    showError(message) {
        this.loginError.textContent = message;
        this.loginError.style.display = 'block';
        setTimeout(() => {
            this.loginError.style.display = 'none';
        }, 5000);
    }

    showChatApp() {
        this.loginScreen.classList.add('hidden');
        this.chatApp.classList.remove('hidden');
        this.currentUserEl.textContent = `@${this.currentUser}`;
        this.messageInput.focus();
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        const file = this.fileInput.files[0];

        if (!message && !file && !this.replyingTo) return;

        this.stopTyping();

        if (file) {
            this.uploadAndSendFile(file, message);
        } else if (message) {
            const messageData = {
                message: message,
                room: this.currentRoom === 'general' ? 'general' : this.currentRoom
            };

            // Add reply data if replying
            if (this.replyingTo) {
                messageData.replyTo = this.replyingTo;
            }

            if (this.currentRoom === 'general') {
                this.socket.emit('message', messageData);
            } else if (this.customRooms.has(this.currentRoom)) {
                this.socket.emit('message', messageData);
            } else {
                // DM - need to update for replies too
                const dmData = { 
                    targetUsername: this.currentRoom, 
                    message 
                };
                if (this.replyingTo) {
                    dmData.replyTo = this.replyingTo;
                }
                this.socket.emit('directMessage', dmData);
            }
            
            this.messageInput.value = '';
            this.cancelReply();
        }

        this.clearFilePreview();
    }

    async uploadAndSendFile(file, message) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                if (file.type.startsWith('image/')) {
                    // Send as image message for backward compatibility
                    this.socket.emit('imageMessage', {
                        message: message,
                        imagePath: data.path,
                        imageOriginalName: data.originalName,
                        room: this.currentRoom
                    });
                } else {
                    // Send as file message
                    this.socket.emit('fileMessage', {
                        message: message,
                        filePath: data.path,
                        fileName: data.originalName,
                        fileSize: file.size,
                        fileType: file.type,
                        room: this.currentRoom
                    });
                }

                this.messageInput.value = '';
                this.clearFilePreview();
            } else {
                this.showNotification(`Upload failed: ${data.error}`, 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            this.showNotification('Upload failed. Please try again.', 'error');
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                this.showNotification('File size must be less than 10MB', 'error');
                return;
            }

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    // Create a thumbnail instead of showing full image
                    const thumbnailDataUrl = await this.compressImage(e.target.result, 150, 150, 0.8);
                    this.previewImage.src = thumbnailDataUrl;
                    this.previewImage.style.maxWidth = '150px';
                    this.previewImage.style.maxHeight = '150px';
                    this.previewImage.style.objectFit = 'cover';
                    this.previewImage.style.borderRadius = '8px';
                    this.previewImage.classList.remove('hidden');
                    const fileInfo = this.filePreview.querySelector('#previewFile');
                    if (fileInfo) fileInfo.classList.add('hidden');
                    this.filePreview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            } else {
                // Show file info for non-images
                this.previewImage.classList.add('hidden');
                const fileInfo = this.filePreview.querySelector('#previewFile');
                if (fileInfo) {
                    fileInfo.classList.remove('hidden');
                    const icon = fileInfo.querySelector('.file-icon');
                    const nameEl = fileInfo.querySelector('.file-name');
                    const sizeEl = fileInfo.querySelector('.file-size');
                    
                    if (icon) icon.className = this.getFileIcon(file.type);
                    if (nameEl) nameEl.textContent = file.name;
                    if (sizeEl) sizeEl.textContent = this.formatFileSize(file.size);
                }
                this.filePreview.classList.remove('hidden');
            }
        }
    }

    clearFilePreview() {
        this.fileInput.value = '';
        this.filePreview.classList.add('hidden');
        this.previewImage.src = '';
        this.previewImage.classList.add('hidden');
        const fileInfo = this.filePreview.querySelector('#previewFile');
        if (fileInfo) fileInfo.classList.add('hidden');
    }

    getFileIcon(mimeType) {
        if (mimeType.startsWith('image/')) return 'fas fa-image file-icon';
        if (mimeType.startsWith('video/')) return 'fas fa-video file-icon';
        if (mimeType.startsWith('audio/')) return 'fas fa-music file-icon';
        if (mimeType.includes('pdf')) return 'fas fa-file-pdf file-icon';
        if (mimeType.includes('word')) return 'fas fa-file-word file-icon';
        if (mimeType.includes('excel') || mimeType.includes('sheet')) return 'fas fa-file-excel file-icon';
        if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'fas fa-file-powerpoint file-icon';
        if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) return 'fas fa-file-archive file-icon';
        return 'fas fa-file file-icon';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    clearImagePreview() {
        // Legacy method for compatibility
        this.clearFilePreview();
    }

    displayMessage(data) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${data.username === this.currentUser ? 'own-message' : ''}`;
        messageEl.dataset.messageId = data.id;
        messageEl.dataset.username = data.username;

        const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Get avatar with proper fallback handling
        const storedAvatar = data.username === this.currentUser 
            ? localStorage.getItem('redChatProfilePic') 
            : localStorage.getItem(`userAvatar_${data.username}`);
        
        let avatarSrc;
        if (storedAvatar && storedAvatar.startsWith('data:')) {
            avatarSrc = storedAvatar;
        } else {
            avatarSrc = this.generateAvatarUrl(data.username);
        }
        
        const avatarHtml = `<div class="msg-avatar">
            <img src="${avatarSrc}" alt="${data.username}" onerror="this.src='${this.generateAvatarUrl(data.username)}'">
        </div>`;

        let roomBadge = '';
        if (data.isPrivate) roomBadge = '<span class="room-indicator">DM</span>';

        let mediaHtml = '';
        if (data.type === 'image' && data.imagePath) {
            mediaHtml = `<div class="message-image"><img src="${data.imagePath}" alt="${data.imageOriginalName || ''}" class="chat-image" onclick="chatApp.openImageModal('${data.imagePath}')"></div>`;
        }

        let textHtml = '';
        if (data.isSticker && data.isCustomSticker) {
            // Custom stickers contain raw HTML (img tag)
            textHtml = `<div class="message-sticker">${data.message}</div>`;
        } else if (data.isSticker) {
            // Built-in stickers are just emoji text
            textHtml = `<div class="message-sticker">${data.message}</div>`;
        } else if (data.message) {
            // Regular messages get HTML-escaped for security
            textHtml = `<div class="message-text">${this.escapeHtml(data.message)}</div>`;
        }

        // Add reply indicator if this is a reply
        let replyHtml = '';
        if (data.replyTo) {
            replyHtml = `<div class="message-reply-info">
                <i class="fas fa-reply"></i>
                <span>Replying to ${data.replyTo.username}</span>
                <div class="reply-preview">${this.escapeHtml(data.replyTo.message?.substring(0, 50) || 'Message')}${data.replyTo.message?.length > 50 ? '...' : ''}</div>
            </div>`;
        }

        messageEl.innerHTML = `
            ${avatarHtml}
            <div class="message-body">
                <div class="message-header">
                    <span class="username clickable-username" data-username="${data.username}">${data.username}</span>
                    ${roomBadge}
                    <span class="timestamp">${time}</span>
                    <div class="message-actions">
                        <button class="reply-btn" onclick="chatApp.startReply('${data.id}', '${data.username}', '${this.escapeHtml(data.message || '')}')">
                            <i class="fas fa-reply"></i>
                        </button>
                    </div>
                </div>
                ${replyHtml}
                <div class="message-content">${textHtml}${mediaHtml}</div>
            </div>
        `;

        // Attach event listener to reply button to avoid inline-HTML quoting issues
        setTimeout(() => {
            const replyBtn = messageEl.querySelector('.reply-btn');
            if (replyBtn) {
                replyBtn.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    this.startReply(data.id, data.username, data.message || '');
                });
            }
        }, 0);

        // Show message in appropriate room
        if (data.room === 'general' && this.currentRoom === 'general') {
            this.messagesArea.appendChild(messageEl);
            this.scrollToBottom();
        } else if (data.isPrivate) {
            // Handle DM
            const dmRoom = data.username === this.currentUser ? data.room : data.username;
            this.openDMTab(dmRoom);
            
            if (this.currentRoom === dmRoom) {
                this.messagesArea.appendChild(messageEl);
                this.scrollToBottom();
            }
        }
    }

    displayFileMessage(data) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${data.username === this.currentUser ? 'own-message' : ''}`;

        const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const storedAvatar = data.username === this.currentUser 
            ? localStorage.getItem('redChatProfilePic') 
            : localStorage.getItem(`userAvatar_${data.username}`);
        const defaultAvatar = this.generateAvatarUrl(data.username);
        const avatarHtml = `<div class="msg-avatar"><img src="${storedAvatar || defaultAvatar}" alt="avatar"></div>`;
        let roomBadge = data.isPrivate ? '<span class="room-indicator">DM</span>' : '';
        const fileIcon = this.getFileIcon(data.fileType);
        const fileSize = this.formatFileSize(data.fileSize);
        const textHtml = data.message ? `<div class="message-text">${this.escapeHtml(data.message)}</div>` : '';
        const fileHtml = `
            <div class="file-attachment">
                <div class="file-info">
                    <i class="${fileIcon}"></i>
                    <div class="file-details">
                        <div class="file-name">${this.escapeHtml(data.fileName)}</div>
                        <div class="file-size">${fileSize}</div>
                    </div>
                </div>
                <a href="${data.filePath}" target="_blank" class="download-btn" title="Download"><i class="fas fa-download"></i></a>
            </div>`;
        messageEl.innerHTML = `
            ${avatarHtml}
            <div class="message-body">
                <div class="message-header">
                    <span class="username">${data.username}</span>
                    ${roomBadge}
                    <span class="timestamp">${time}</span>
                </div>
                <div class="message-content">${textHtml}${fileHtml}</div>
            </div>
        `;

        // Show message in appropriate room
        if (data.room === 'general' && this.currentRoom === 'general') {
            this.messagesArea.appendChild(messageEl);
            this.scrollToBottom();
        } else if (data.isPrivate) {
            // Handle DM
            const dmRoom = data.username === this.currentUser ? data.room : data.username;
            this.openDMTab(dmRoom);
            
            if (this.currentRoom === dmRoom) {
                this.messagesArea.appendChild(messageEl);
                this.scrollToBottom();
            }
        } else {
            // Handle custom room
            if (this.currentRoom === data.room) {
                this.messagesArea.appendChild(messageEl);
                this.scrollToBottom();
            }
        }
    }

    displaySystemMessage(message, timestamp) {
        if (this.currentRoom !== 'general') return;
        
        const messageEl = document.createElement('div');
        messageEl.className = 'message system-message';
        const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageEl.innerHTML = `
            <div class="system-content">
                <span class="system-text">${message}</span>
                <span class="timestamp">${time}</span>
            </div>
        `;

        this.messagesArea.appendChild(messageEl);
        this.scrollToBottom();
    }

    updateUserList(users) {
        this.userList.innerHTML = '';
        this.onlineCount.textContent = `${users.length} online`;

        users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'user-item';
            // Determine avatar source: server-provided avatar, local (current user), or generated avatar
            const avatarSrc = user.avatar
                || (user.username === this.currentUser ? localStorage.getItem('redChatProfilePic') : localStorage.getItem(`userAvatar_${user.username}`))
                || this.generateAvatarUrl(user.username);

            userEl.innerHTML = `
                <div class="user-info">
                    <div class="user-avatar">
                        <img src="${avatarSrc}" alt="${user.username}" onerror="this.src='${this.generateAvatarUrl(user.username)}'" />
                    </div>
                    <span class="username">${user.username}</span>
                    ${user.username === this.currentUser ? '<span class="you-badge">You</span>' : ''}
                </div>
            `;

            // Add context menu for other users
            if (user.username !== this.currentUser) {
                userEl.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.showContextMenu(e, user.username);
                });
                
                userEl.addEventListener('click', () => {
                    this.openDMTab(user.username);
                    this.switchRoom(user.username);
                });
            }

            this.userList.appendChild(userEl);
        });
    }

    showContextMenu(e, username) {
        const contextItem = this.contextMenu.querySelector('[data-action="dm"]');
        contextItem.onclick = () => {
            this.openDMTab(username);
            this.switchRoom(username);
            this.hideContextMenu();
        };

        this.contextMenu.style.display = 'block';
        this.contextMenu.style.left = e.pageX + 'px';
        this.contextMenu.style.top = e.pageY + 'px';
    }

    hideContextMenu() {
        this.contextMenu.style.display = 'none';
    }

    openDMTab(username) {
        if (this.dmTabs.has(username)) return;

        const tab = document.createElement('div');
        tab.className = 'tab dm-tab';
        tab.dataset.room = username;
        tab.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${username}</span>
            <button class="tab-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        this.chatTabs.appendChild(tab);
        this.dmTabs.set(username, tab);
    }

    closeDMTab(username) {
        const tab = this.dmTabs.get(username);
        if (tab) {
            tab.remove();
            this.dmTabs.delete(username);
            
            if (this.currentRoom === username) {
                this.switchRoom('general');
            }
        }
    }

    switchRoom(room) {
        console.log('Switching to room:', room);
        this.currentRoom = room;
        this.stopTyping();
        
        // Update current room indicator in header
        const roomNameEl = document.getElementById('currentRoomName');
        if (roomNameEl) {
            if (room === 'general') {
                roomNameEl.textContent = 'General';
            } else if (this.customRooms.has(room)) {
                roomNameEl.textContent = this.customRooms.get(room).name;
            } else {
                roomNameEl.textContent = `@${room}`; // For DMs
            }
        }
        
        // Close mobile sidebars when switching rooms
        this.closeSidebars();
        
        // Update room item appearance
        document.querySelectorAll('.room-item').forEach(item => {
            item.classList.toggle('active', item.dataset.room === room);
        });

        // Update tab appearance
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.room === room);
        });

        // Clear messages area and load room messages
        this.messagesArea.innerHTML = '';
        this.hideTypingIndicator();

        // Load chat history for this room
        if (this.chatHistory.has(room)) {
            const messages = this.chatHistory.get(room);
            messages.forEach(message => {
                if (message.type === 'file') {
                    this.displayFileMessage(message);
                } else {
                    this.displayMessage(message);
                }
            });
        } else {
            // Request chat history from server
            this.socket.emit('requestChatHistory', { room });
        }

        // Update placeholder text
        if (room === 'general') {
            this.messageInput.placeholder = 'Type a message...';
        } else if (this.customRooms.has(room)) {
            this.messageInput.placeholder = `Message ${this.customRooms.get(room).name}...`;
        } else {
            this.messageInput.placeholder = `Message ${room}...`;
        }

        this.messageInput.focus();
        this.scrollToBottom();
        
        console.log('Room switched successfully to:', room);
    }

    handleTyping() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.socket.emit('typing', { room: this.currentRoom });
        }

        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
            this.stopTyping();
        }, 2000);
    }

    stopTyping() {
        if (this.isTyping) {
            this.isTyping = false;
            this.socket.emit('stopTyping', { room: this.currentRoom });
        }
        clearTimeout(this.typingTimer);
    }

    showTypingIndicator(username, room) {
        if (room !== this.currentRoom) return;
        
        this.typingIndicator.querySelector('.typing-text').textContent = `${username} is typing...`;
        this.typingIndicator.classList.remove('hidden');
    }

    hideTypingIndicator(username = null, room = null) {
        if (room && room !== this.currentRoom) return;
        this.typingIndicator.classList.add('hidden');
    }

    openImageModal(imagePath) {
        this.modalImage.src = imagePath;
        this.imageModal.classList.remove('hidden');
    }

    closeImageModal() {
        this.imageModal.classList.add('hidden');
        this.modalImage.src = '';
    }

    scrollToBottom() {
        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    playNotification() {
        try {
            this.notificationSound.play().catch(() => {
                // Ignore autoplay restrictions
            });
        } catch (e) {
            // Ignore audio errors
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // New methods for enhanced features
    loadChatHistory(room, messages) {
        this.chatHistory.set(room, messages);
        
        // If this is the current room, display the messages
        if (room === this.currentRoom) {
            this.messagesArea.innerHTML = '';
            messages.forEach(message => this.displayMessage(message));
            this.scrollToBottom();
        }
    }

    handleIncomingMessage(data) {
        // Store message in local history
        const room = data.isPrivate ? (data.username === this.currentUser ? data.room : data.username) : data.room;
        if (!this.chatHistory.has(room)) {
            this.chatHistory.set(room, []);
        }
        this.chatHistory.get(room).push(data);

        // Handle DM tab creation
        if (data.isPrivate) {
            const dmRoom = data.username === this.currentUser ? data.room : data.username;
            this.openDMTab(dmRoom);
            
            if (this.currentRoom === dmRoom) {
                this.displayMessage(data);
            }
        } else if (data.room === 'general' && this.currentRoom === 'general') {
            this.displayMessage(data);
        }
    }

    showAddFriendModal() {
        this.addFriendModal.classList.remove('hidden');
        this.friendUsernameInput.focus();
    }

    hideAddFriendModal() {
        this.addFriendModal.classList.add('hidden');
        this.friendUsernameInput.value = '';
    }

    handleAddFriend(e) {
        e.preventDefault();
        const username = this.friendUsernameInput.value.trim();
        
        if (!username) {
            this.showNotification('Please enter a username', 'error');
            return;
        }

        if (username === this.currentUser) {
            this.showNotification('You cannot add yourself as a friend', 'error');
            return;
        }

        this.socket.emit('sendFriendRequest', { targetUsername: username });
        this.hideAddFriendModal();
        this.showNotification(`Friend request sent to ${username}`, 'success');
    }

    updateFriendsList(friends) {
        this.friends = new Set(friends.map(f => f.username));
        this.friendsList.innerHTML = '';
        this.friendsCount.textContent = friends.length;

        friends.forEach(friend => {
            const friendEl = document.createElement('div');
            friendEl.className = `friend-item ${friend.online ? 'online' : 'offline'}`;
            friendEl.dataset.username = friend.username;
            friendEl.innerHTML = `
                <div class="friend-info">
                    <div class="friend-avatar">
                        <i class="fas fa-user"></i>
                        <span class="status-indicator ${friend.online ? 'online' : 'offline'}"></span>
                    </div>
                    <div class="friend-details">
                        <span class="friend-name">${friend.username}</span>
                        <span class="friend-status">${friend.online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
                <div class="friend-actions">
                    <button class="friend-action-btn message-btn" onclick="chatApp.startDMWithFriend('${friend.username}')" title="Message">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button class="friend-action-btn remove-btn" onclick="chatApp.removeFriend('${friend.username}')" title="Remove Friend">
                        <i class="fas fa-user-times"></i>
                    </button>
                </div>
            `;

            this.friendsList.appendChild(friendEl);
        });
    }

    updateFriendRequests(requests) {
        this.friendRequests.sent = new Set(requests.sent);
        this.friendRequests.received = new Set(requests.received);
        this.requestsCount.textContent = requests.received.length;

        const friendRequestsEl = document.getElementById('friendRequests');
        friendRequestsEl.innerHTML = '';

        // Show received requests
        requests.received.forEach(username => {
            const requestEl = document.createElement('div');
            requestEl.className = 'friend-request-item';
            requestEl.innerHTML = `
                <div class="request-info">
                    <div class="request-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <span class="request-username">${username}</span>
                </div>
                <div class="request-actions">
                    <button class="request-btn accept" onclick="chatApp.acceptFriendRequest('${username}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="request-btn reject" onclick="chatApp.rejectFriendRequest('${username}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            friendRequestsEl.appendChild(requestEl);
        });

        // Show sent requests
        requests.sent.forEach(username => {
            const requestEl = document.createElement('div');
            requestEl.className = 'friend-request-item sent';
            requestEl.innerHTML = `
                <div class="request-info">
                    <div class="request-avatar">
                        <i class="fas fa-clock"></i>
                    </div>
                    <span class="request-username">${username}</span>
                    <span class="request-status">Pending</span>
                </div>
            `;

            friendRequestsEl.appendChild(requestEl);
        });
    }

    startDMWithFriend(username) {
        this.openDMTab(username);
        this.switchRoom(username);
    }

    removeFriend(username) {
        if (confirm(`Remove ${username} from your friends list?`)) {
            this.socket.emit('removeFriend', { friendUsername: username });
            this.showNotification(`Removed ${username} from friends`, 'info');
        }
    }

    acceptFriendRequest(username) {
        this.socket.emit('acceptFriendRequest', { fromUsername: username });
        this.showNotification(`Accepted friend request from ${username}`, 'success');
    }

    rejectFriendRequest(username) {
        this.socket.emit('rejectFriendRequest', { fromUsername: username });
        this.showNotification(`Rejected friend request from ${username}`, 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add to document
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    // Room Management Methods
    updateRoomsList(rooms) {
        this.customRooms.clear();
        this.roomsList.innerHTML = '';
        this.roomsCount.textContent = rooms.length;

        rooms.forEach(room => {
            if (room.id !== 'general') {
                this.customRooms.set(room.id, room);
            }

            const roomEl = document.createElement('div');
            roomEl.className = `room-item ${this.currentRoom === room.id ? 'active' : ''}`;
            roomEl.dataset.room = room.id;
            
            const isGeneral = room.id === 'general';
            roomEl.innerHTML = `
                <div class="room-info">
                    <div class="room-avatar" style="background: ${isGeneral ? '#667eea' : '#28a745'}">
                        <i class="fas ${isGeneral ? 'fa-hashtag' : 'fa-users'}"></i>
                    </div>
                    <div class="room-details">
                        <span class="room-name">${room.name}</span>
                        <span class="room-member-count">${room.memberCount} member${room.memberCount !== 1 ? 's' : ''}</span>
                    </div>
                </div>
                ${!isGeneral ? `
                    <div class="room-actions">
                        <button class="room-action-btn invite-btn" data-room-id="${room.id}" title="Invite Users">
                            <i class="fas fa-user-plus"></i>
                        </button>
                        <button class="room-action-btn leave-btn" data-room-id="${room.id}" title="Leave Room">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                ` : ''}
            `;

            // Add event listeners for room actions
            if (!isGeneral) {
                const inviteBtn = roomEl.querySelector('.invite-btn');
                const leaveBtn = roomEl.querySelector('.leave-btn');
                
                if (inviteBtn) {
                    inviteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.showInviteUsersModal(room.id);
                    });
                }
                
                if (leaveBtn) {
                    leaveBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.leaveRoom(room.id);
                    });
                }
            }

            this.roomsList.appendChild(roomEl);
        });
    }

    showCreateRoomModal() {
        this.createRoomModal.classList.remove('hidden');
        document.getElementById('roomNameInput').focus();
    }

    hideCreateRoomModal() {
        this.createRoomModal.classList.add('hidden');
        this.createRoomForm.reset();
    }

    handleCreateRoom(e) {
        e.preventDefault();
        const name = document.getElementById('roomNameInput').value.trim();
        const description = document.getElementById('roomDescriptionInput').value.trim();
        const isPrivate = document.getElementById('roomPrivateCheck').checked;
        
        if (!name) {
            this.showNotification('Please enter a room name', 'error');
            return;
        }

        if (name.length < 2 || name.length > 30) {
            this.showNotification('Room name must be between 2 and 30 characters', 'error');
            return;
        }

        console.log('Creating room:', { name, description, isPrivate });
        this.showNotification('Creating room...', 'info');

        this.socket.emit('createRoom', { 
            name, 
            description: description || `A ${isPrivate ? 'private' : 'public'} chat room`, 
            isPrivate 
        });
        
        this.hideCreateRoomModal();
    }

    showInviteUsersModal(roomId) {
        this.selectedUsers.clear();
        document.getElementById('inviteRoomName').textContent = this.customRooms.get(roomId)?.name || 'Unknown Room';
        this.inviteUsersModal.dataset.roomId = roomId;
        this.inviteUsersModal.classList.remove('hidden');
        this.populateAvailableUsers();
    }

    hideInviteUsersModal() {
        this.inviteUsersModal.classList.add('hidden');
        this.selectedUsers.clear();
        this.userSearchInput.value = '';
    }

    populateAvailableUsers() {
        this.availableUsers.innerHTML = '';
        const allUsers = Array.from(document.querySelectorAll('.user-item')).map(el => 
            el.querySelector('.username').textContent
        ).filter(username => username !== this.currentUser);

        allUsers.forEach(username => {
            const userEl = document.createElement('div');
            userEl.className = 'invite-user-item';
            userEl.innerHTML = `
                <div class="invite-user-info">
                    <div class="invite-user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <span class="invite-user-name">${username}</span>
                </div>
                <input type="checkbox" class="invite-checkbox" data-username="${username}">
            `;

            const checkbox = userEl.querySelector('.invite-checkbox');
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectedUsers.add(username);
                } else {
                    this.selectedUsers.delete(username);
                }
            });

            this.availableUsers.appendChild(userEl);
        });
    }

    handleSendInvites() {
        if (this.selectedUsers.size === 0) {
            this.showNotification('Please select at least one user to invite', 'error');
            return;
        }

        const roomId = this.inviteUsersModal.dataset.roomId;
        this.socket.emit('inviteToRoom', {
            roomId,
            usernames: Array.from(this.selectedUsers)
        });

        this.showNotification(`Invitations sent to ${this.selectedUsers.size} user${this.selectedUsers.size !== 1 ? 's' : ''}`, 'success');
        this.hideInviteUsersModal();
    }

    showRoomSearchModal() {
        this.roomSearchModal = document.getElementById('roomSearchModal');
        this.roomSearchModal.classList.remove('hidden');
        this.loadAvailableRooms();
        
        // Setup event listeners if not already done
        if (!this.roomSearchSetup) {
            this.setupRoomSearchListeners();
            this.roomSearchSetup = true;
        }
    }

    hideRoomSearchModal() {
        if (this.roomSearchModal) {
            this.roomSearchModal.classList.add('hidden');
            document.getElementById('roomSearchInput').value = '';
        }
    }

    setupRoomSearchListeners() {
        const searchInput = document.getElementById('roomSearchInput');
        const refreshBtn = document.getElementById('refreshRoomsBtn');
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        // Search input
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.filterRooms(e.target.value);
            }, 300);
        });

        // Refresh button
        refreshBtn.addEventListener('click', () => {
            this.loadAvailableRooms();
        });

        // Category buttons
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterRoomsByCategory(e.target.dataset.category);
            });
        });

        // Close modal when clicking outside
        this.roomSearchModal.addEventListener('click', (e) => {
            if (e.target === this.roomSearchModal) {
                this.hideRoomSearchModal();
            }
        });
    }

    loadAvailableRooms() {
        this.socket.emit('requestAvailableRooms');
    }

    displayAvailableRooms(rooms) {
        const container = document.getElementById('availableRooms');
        this.allAvailableRooms = rooms;
        
        if (rooms.length === 0) {
            container.innerHTML = '<div class="no-rooms">No public rooms available</div>';
            return;
        }

        container.innerHTML = rooms.map(room => `
            <div class="available-room-item" data-room-id="${room.id}">
                <div class="available-room-info">
                    <div class="available-room-name">${this.escapeHtml(room.name)}</div>
                    <div class="available-room-description">${this.escapeHtml(room.description || 'No description')}</div>
                    <div class="available-room-stats">
                        <span><i class="fas fa-users"></i> ${room.memberCount} members</span>
                        <span><i class="fas fa-comments"></i> ${room.messageCount || 0} messages</span>
                        ${room.isPrivate ? '<span><i class="fas fa-lock"></i> Private</span>' : ''}
                    </div>
                </div>
                <button class="join-room-btn" data-room-id="${room.id}" ${room.joined ? 'disabled' : ''}>
                    ${room.joined ? 'Joined' : 'Join'}
                </button>
            </div>
        `).join('');

        // Add join button listeners
        container.querySelectorAll('.join-room-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const roomId = btn.dataset.roomId;
                this.joinRoomFromSearch(roomId);
            });
        });
    }

    joinRoomFromSearch(roomId) {
        this.socket.emit('joinRoom', { roomId });
        this.hideRoomSearchModal();
    }

    filterRooms(searchTerm) {
        const container = document.getElementById('availableRooms');
        const items = container.querySelectorAll('.available-room-item');
        
        items.forEach(item => {
            const name = item.querySelector('.available-room-name').textContent.toLowerCase();
            const description = item.querySelector('.available-room-description').textContent.toLowerCase();
            const matches = name.includes(searchTerm.toLowerCase()) || 
                          description.includes(searchTerm.toLowerCase());
            
            item.style.display = matches ? 'flex' : 'none';
        });
    }

    filterRoomsByCategory(category) {
        if (!this.allAvailableRooms) return;
        
        let filteredRooms;
        switch (category) {
            case 'public':
                filteredRooms = this.allAvailableRooms.filter(room => !room.isPrivate);
                break;
            case 'popular':
                filteredRooms = this.allAvailableRooms
                    .filter(room => !room.isPrivate)
                    .sort((a, b) => b.memberCount - a.memberCount)
                    .slice(0, 10);
                break;
            default:
                filteredRooms = this.allAvailableRooms;
        }
        
        this.displayAvailableRooms(filteredRooms);
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode.toString());
        this.applyDarkMode();
    }

    applyDarkMode() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Update toggle button icon
        const toggleBtn = document.getElementById('darkModeToggle');
        const icon = toggleBtn.querySelector('i');
        if (this.isDarkMode) {
            icon.className = 'fas fa-sun';
            toggleBtn.title = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            toggleBtn.title = 'Dark Mode';
        }
    }

    toggleSidebar(side) {
        const overlay = document.getElementById('sidebarOverlay');
        
        if (side === 'left') {
            this.rightSidebar.classList.remove('show');
            this.leftSidebar.classList.toggle('show');
            
            if (this.leftSidebar.classList.contains('show')) {
                overlay.classList.add('show');
            } else {
                overlay.classList.remove('show');
            }
        } else if (side === 'right') {
            this.leftSidebar.classList.remove('show');
            this.rightSidebar.classList.toggle('show');
            
            if (this.rightSidebar.classList.contains('show')) {
                overlay.classList.add('show');
            } else {
                overlay.classList.remove('show');
            }
        }
    }

    closeSidebars() {
        this.leftSidebar.classList.remove('show');
        this.rightSidebar.classList.remove('show');
        document.getElementById('sidebarOverlay').classList.remove('show');
    }

    showSettingsModal() {
        if (!this.settingsModal) return;
        this.settingsModal.classList.remove('hidden');
        this.loadUserSettings();
        if (!this.settingsSetup) {
            this.setupSettingsListeners();
            this.settingsSetup = true;
        }
    }

    hideSettingsModal() {
        if (this.settingsModal) {
            this.settingsModal.classList.add('hidden');
        }
    }

    setupSettingsListeners() {
        // Profile picture upload
        if (this.uploadPfpBtn && this.profilePicInput) {
            this.uploadPfpBtn.addEventListener('click', () => this.profilePicInput.click());
            this.profilePicInput.addEventListener('change', (e) => this.handleProfilePicUpload(e));
        }

        // Copy user ID
        if (this.copyUserIdBtn && this.userIdDisplay) {
            this.copyUserIdBtn.addEventListener('click', () => {
                this.userIdDisplay.select();
                document.execCommand('copy');
                this.showNotification('User ID copied to clipboard!', 'success');
            });
        }

        // Accent color picker
        if (this.accentColorPicker) {
            this.accentColorPicker.addEventListener('change', (e) => this.applyAccentColor(e.target.value));
        }

        // Preset colors
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', () => {
                const color = preset.dataset.color;
                if (this.accentColorPicker) this.accentColorPicker.value = color;
                this.applyAccentColor(color);
            });
        });

        // Theme selector
        if (this.themeSelect) {
            this.themeSelect.addEventListener('change', (e) => this.applyTheme(e.target.value));
        }

        // Font size selector
        if (this.fontSizeSelect) {
            this.fontSizeSelect.addEventListener('change', (e) => this.applyFontSize(e.target.value));
        }

        // Save settings
        if (this.saveSettingsBtn) {
            this.saveSettingsBtn.addEventListener('click', () => {
                this.saveUserSettings();
                this.hideSettingsModal();
            });
        }

        // Reset settings
        if (this.resetSettingsBtn) {
            this.resetSettingsBtn.addEventListener('click', () => this.resetUserSettings());
        }

        // Close modal when backdrop or X clicked
        if (this.settingsModal) {
            this.settingsModal.addEventListener('click', (e) => {
                if (e.target === this.settingsModal || e.target.dataset.modal === 'settings') {
                    this.hideSettingsModal();
                }
            });
        }
    }

    loadUserSettings() {
        if (this.userIdDisplay && this.currentUser) {
            // Generate a stable ID once per session unless already set
            if (!this.generatedUserId) {
                this.generatedUserId = `USR_${this.currentUser}_${(this.currentUser.length + Date.now()).toString(36).toUpperCase().slice(-6)}`;
            }
            this.userIdDisplay.value = this.generatedUserId;
        }

        const settings = JSON.parse(localStorage.getItem('redChatSettings') || '{}');
        if (this.themeSelect && settings.theme) this.themeSelect.value = settings.theme;
        if (this.accentColorPicker && settings.accentColor) this.accentColorPicker.value = settings.accentColor;
        if (this.fontSizeSelect && settings.fontSize) this.fontSizeSelect.value = settings.fontSize;
        if (this.soundNotificationsCheck) this.soundNotificationsCheck.checked = settings.soundNotifications !== false;
        if (this.desktopNotificationsCheck) this.desktopNotificationsCheck.checked = settings.desktopNotifications !== false;
    }

    saveUserSettings() {
        const settings = {
            theme: this.themeSelect ? this.themeSelect.value : 'light',
            accentColor: this.accentColorPicker ? this.accentColorPicker.value : '#667eea',
            fontSize: this.fontSizeSelect ? this.fontSizeSelect.value : 'medium',
            soundNotifications: this.soundNotificationsCheck ? this.soundNotificationsCheck.checked : true,
            desktopNotifications: this.desktopNotificationsCheck ? this.desktopNotificationsCheck.checked : true
        };
        localStorage.setItem('redChatSettings', JSON.stringify(settings));
        this.showNotification('Settings saved!', 'success');
    }

    resetUserSettings() {
        localStorage.removeItem('redChatSettings');
        if (this.themeSelect) this.themeSelect.value = 'light';
        if (this.accentColorPicker) this.accentColorPicker.value = '#667eea';
        if (this.fontSizeSelect) this.fontSizeSelect.value = 'medium';
        if (this.soundNotificationsCheck) this.soundNotificationsCheck.checked = true;
        if (this.desktopNotificationsCheck) this.desktopNotificationsCheck.checked = true;
        this.applyAccentColor('#667eea');
        this.applyFontSize('medium');
        this.showNotification('Settings reset to defaults!', 'success');
    }

    applyAccentColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
        // Calculate hover color (darker version)
        const hoverColor = this.adjustColor(color, -20);
        document.documentElement.style.setProperty('--primary-hover', hoverColor);
        
        // Extract RGB values for use in rgba()
        const rgb = this.hexToRgb(color);
        if (rgb) {
            document.documentElement.style.setProperty('--primary-color-rgb', `${rgb.r},${rgb.g},${rgb.b}`);
        }
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Compress image to reduce file size
    compressImage(dataUrl, maxWidth, maxHeight, quality = 0.8) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = Math.floor(width * ratio);
                    height = Math.floor(height * ratio);
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to compressed JPEG
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.src = dataUrl;
        });
    }

    applyFontSize(size) {
        document.body.classList.remove('font-small', 'font-medium', 'font-large');
        document.body.classList.add(`font-${size}`);
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            this.isDarkMode = true;
        } else if (theme === 'light') {
            this.isDarkMode = false;
        } else {
            // Auto theme - detect system preference
            this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        this.applyDarkMode();
    }

    handleProfilePicUpload(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                // Compress the image before saving
                const compressed = await this.compressImage(e.target.result, 200, 200, 0.7);
                
                const preview = document.getElementById('profilePicPreview');
                preview.innerHTML = `<img src="${compressed}" alt="Profile Picture">`;
                
                // Save to localStorage and notify server so others can see this avatar
                localStorage.setItem('redChatProfilePic', compressed);
                try {
                    if (this.socket && this.socket.connected) {
                        this.socket.emit('updateProfilePic', { image: compressed });
                    }
                } catch (err) {
                    console.warn('Failed to send profile pic to server', err);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    adjustColor(color, amount) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * amount);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    generateAvatarUrl(username) {
        // Generate initials-based avatar
        const initials = username.slice(0, 2).toUpperCase();
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#ff6b6b', '#4ecdc4'];
        const colorIndex = username.charCodeAt(0) % colors.length;
        const bgColor = colors[colorIndex];
        
        // Create a simple data URL with initials
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');
        
        // Background circle
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.arc(20, 20, 20, 0, 2 * Math.PI);
        ctx.fill();
        
        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials, 20, 20);
        
        return canvas.toDataURL();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    leaveRoom(roomId) {
        const room = this.customRooms.get(roomId);
        if (room && confirm(`Leave "${room.name}"?`)) {
            this.socket.emit('leaveRoom', { roomId });
            if (this.currentRoom === roomId) {
                this.switchRoom('general');
            }
        }
    }

    // Sticker System Implementation
    initializeStickerData() {
        const customStickers = JSON.parse(localStorage.getItem('customStickers') || '[]');
        
        return {
            smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔'],
            animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇'],
            food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥖', '🍞'],
            activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '⛸️', '🥌', '🛷', '🛼', '🏊', '🏄'],
            travel: ['✈️', '🚁', '🚂', '🚝', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚃', '🚂', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️'],
            objects: ['🎉', '🎊', '🎈', '🎁', '🎀', '🎂', '🍰', '🧁', '🍾', '🥂', '🍻', '🍺', '🍷', '🥃', '🍸', '🍹', '🍶', '☕', '🍵', '🧃', '🥤', '🧋', '🧊', '🥄', '🍴', '🍽️', '🥢', '⚽', '🏀', '🏈', '⚾'],
            symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎'],
            flags: ['🏴', '🏳️', '🏁', '🚩', '🏳️‍🌈', '🏳️‍⚧️', '🇺🇳', '🇦🇫', '🇦🇽', '🇦🇱', '🇩🇿', '🇦🇸', '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇶', '🇦🇬', '🇦🇷', '🇦🇲', '🇦🇼', '🇦🇺', '🇦🇹', '🇦🇿', '🇧🇸', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇾', '🇧🇪', '🇧🇿'],
            custom: customStickers
        };
    }

    showStickerModal() {
        this.stickerModal.classList.remove('hidden');
        this.loadStickers(this.currentStickerCategory);
        this.setupStickerListeners();
    }

    hideStickerModal() {
        this.stickerModal.classList.add('hidden');
    }

    setupStickerListeners() {
        if (this.stickerListenersSetup) return;
        this.stickerListenersSetup = true;

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.category-btn.active').classList.remove('active');
                e.target.classList.add('active');
                this.currentStickerCategory = e.target.dataset.category;
                this.loadStickers(this.currentStickerCategory);
            });
        });

        // Search functionality
        this.stickerSearch.addEventListener('input', (e) => {
            this.searchStickers(e.target.value);
        });
    }

    loadStickers(category) {
        const stickers = this.stickerData[category] || [];
        this.stickerGrid.innerHTML = '';

        if (category === 'custom') {
            // Add upload button for custom stickers
            const uploadBtn = document.createElement('div');
            uploadBtn.className = 'sticker-upload-btn';
            uploadBtn.innerHTML = `
                <input type="file" id="stickerUpload" accept="image/*" style="display: none;">
                <button class="upload-sticker-btn">
                    <i class="fas fa-plus"></i>
                    <span>Add Sticker</span>
                </button>
            `;
            this.stickerGrid.appendChild(uploadBtn);

            // Handle file upload
            const fileInput = uploadBtn.querySelector('#stickerUpload');
            const uploadButton = uploadBtn.querySelector('.upload-sticker-btn');
            uploadButton.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => this.handleStickerUpload(e));
        }

        stickers.forEach(sticker => {
            const stickerEl = document.createElement('button');
            stickerEl.className = 'sticker-item';
            
            if (category === 'custom') {
                // Custom stickers are images
                stickerEl.innerHTML = `<img src="${sticker}" alt="custom sticker" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
                stickerEl.addEventListener('click', () => this.sendCustomSticker(sticker));
            } else {
                // Regular emoji stickers
                stickerEl.textContent = sticker;
                stickerEl.addEventListener('click', () => this.sendSticker(sticker));
            }
            
            this.stickerGrid.appendChild(stickerEl);
        });
    }

    searchStickers(searchTerm) {
        if (!searchTerm.trim()) {
            this.loadStickers(this.currentStickerCategory);
            return;
        }

        const allStickers = Object.values(this.stickerData).flat();
        const filteredStickers = allStickers.filter(sticker => 
            sticker.includes(searchTerm) || 
            this.getStickerKeywords(sticker).some(keyword => 
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        this.stickerGrid.innerHTML = '';
        filteredStickers.forEach(sticker => {
            const stickerEl = document.createElement('button');
            stickerEl.className = 'sticker-item';
            
            // Check if it's a custom sticker (data URL)
            if (sticker.startsWith('data:image')) {
                stickerEl.innerHTML = `<img src="${sticker}" alt="custom sticker" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
                stickerEl.addEventListener('click', () => this.sendCustomSticker(sticker));
            } else {
                stickerEl.textContent = sticker;
                stickerEl.addEventListener('click', () => this.sendSticker(sticker));
            }
            this.stickerGrid.appendChild(stickerEl);
        });
    }

    getStickerKeywords(sticker) {
        const keywords = {
            '😀': ['smile', 'happy', 'grin'],
            '🐶': ['dog', 'puppy', 'pet'],
            '🍕': ['pizza', 'food', 'italian'],
            '⚽': ['soccer', 'football', 'sport'],
            '✈️': ['plane', 'travel', 'fly'],
            '🎉': ['party', 'celebration', 'confetti'],
            '❤️': ['heart', 'love', 'red']
        };
        return keywords[sticker] || [];
    }

    sendSticker(sticker) {
        if (!this.currentUser) return;

        const stickerMessage = {
            text: sticker,
            isSticker: true,
            timestamp: new Date().toISOString()
        };

        // Send sticker message
        this.socket.emit('message', {
            message: sticker,
            room: this.currentRoom,
            isSticker: true
        });

        this.hideStickerModal();
    }

    handleStickerUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select an image file', 'error');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            this.showNotification('Image must be less than 2MB', 'error');
            return;
        }

        // Convert to data URL for storage
        const reader = new FileReader();
        reader.onload = async (e) => {
            // Compress the sticker image
            const compressed = await this.compressImage(e.target.result, 150, 150, 0.8);
            this.addCustomSticker(compressed);
        };
        reader.readAsDataURL(file);
    }

    async addCustomSticker(dataUrl) {
        const customStickers = JSON.parse(localStorage.getItem('customStickers') || '[]');
        
        // Limit to 20 custom stickers
        if (customStickers.length >= 20) {
            this.showNotification('Maximum 20 custom stickers allowed', 'error');
            return;
        }

        // Check for duplicates using simple hash comparison
        const newHash = await this.hashImage(dataUrl);
        for (const existingSticker of customStickers) {
            const existingHash = await this.hashImage(existingSticker);
            if (newHash === existingHash) {
                this.showNotification('This sticker already exists!', 'error');
                return;
            }
        }

        customStickers.push(dataUrl);
        localStorage.setItem('customStickers', JSON.stringify(customStickers));
        
        // Sync to server
        this.socket.emit('syncCustomStickers', { stickers: customStickers });
        
        // Update the sticker data
        this.stickerData.custom = customStickers;
        
        // Refresh the custom stickers view
        this.loadStickers('custom');
        
        this.showNotification('Custom sticker added!', 'success');
    }

    // Simple hash function for image data URLs
    async hashImage(dataUrl) {
        // Use the data portion only (strip the data:image/... prefix)
        const data = dataUrl.split(',')[1] || dataUrl;
        // Create a simple hash using the first, middle, and last portions
        const len = data.length;
        return data.substring(0, 50) + data.substring(len / 2 - 25, len / 2 + 25) + data.substring(len - 50);
    }

    sendCustomSticker(stickerUrl) {
        if (!this.currentUser) return;

        // Send custom sticker with the image embedded in the message
        this.socket.emit('message', {
            message: `<img src="${stickerUrl}" alt="sticker" class="custom-sticker-img" style="max-width: 150px; max-height: 150px; border-radius: 8px;">`,
            room: this.currentRoom,
            isSticker: true,
            isCustomSticker: true
        });

        this.hideStickerModal();
    }

    // Todo System Implementation
    showTodoModal() {
        this.todoModal.classList.remove('hidden');
        this.renderTodos();
    }

    hideTodoModal() {
        this.todoModal.classList.add('hidden');
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date()
        };

        this.todos.push(todo);
        this.saveTodos();
        this.renderTodos();
        this.todoInput.value = '';
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.renderTodos();
    }

    clearCompletedTodos() {
        if (confirm('Delete all completed todos?')) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.renderTodos();
        }
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        
        this.todos.forEach(todo => {
            const todoEl = document.createElement('div');
            todoEl.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            todoEl.innerHTML = `
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="chatApp.toggleTodo(${todo.id})"></div>
                <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                <button class="todo-delete" onclick="chatApp.deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            this.todoList.appendChild(todoEl);
        });

        // Update count
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        this.todoCount.textContent = `${total} task${total !== 1 ? 's' : ''} (${completed} completed)`;
    }

    saveTodos() {
        localStorage.setItem('chatApp_todos', JSON.stringify(this.todos));
    }

    // Export chat history
    exportChatHistory() {
        const exportData = {
            exportDate: new Date().toISOString(),
            username: this.currentUser,
            currentRoom: this.currentRoom,
            chatHistory: {}
        };

        // Convert chatHistory Map to object
        for (const [room, messages] of this.chatHistory.entries()) {
            exportData.chatHistory[room] = Array.from(messages.values());
        }

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `chat-export-${new Date().getTime()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Chat history exported!', 'success');
    }

    // Clear local cache
    clearLocalCache() {
        if (confirm('This will clear your local chat history and custom stickers. Your account and server data will be safe. Continue?')) {
            // Keep only essential data
            const username = this.currentUser;
            const darkMode = document.body.classList.contains('dark-mode');
            
            // Clear everything
            localStorage.clear();
            
            // Restore essential settings
            if (darkMode) {
                document.body.classList.add('dark-mode');
            }
            
            // Clear in-memory data
            this.chatHistory.clear();
            this.stickerData.custom = [];
            
            this.showNotification('Cache cleared! Refresh to reload from server.', 'success');
        }
    }

    // Enhanced utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    formatRelativeTime(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'just now';
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Copied to clipboard!', 'success');
        });
    }

    getDeviceInfo() {
        return {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isTablet: /iPad|Android(?=.*\bMobile\b)/i.test(navigator.userAgent),
            isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            hasTouch: 'ontouchstart' in window,
            userAgent: navigator.userAgent
        };
    }

    // Reply System Implementation
    startReply(messageId, username, messageText) {
        this.replyingTo = {
            id: messageId,
            username: username,
            message: messageText
        };
        
        this.showReplyInput();
        this.messageInput.focus();
    }

    showReplyInput() {
        if (!this.replyInput) {
            this.replyInput = document.createElement('div');
            this.replyInput.className = 'message-reply-input';
            this.messageInput.parentNode.insertBefore(this.replyInput, this.messageInput);
        }

        this.replyInput.innerHTML = `
            <div class="reply-info">
                <i class="fas fa-reply"></i>
                <span>Replying to <strong>${this.replyingTo.username}</strong></span>
                <button class="reply-cancel" onclick="chatApp.cancelReply()">×</button>
            </div>
            <div class="reply-preview">${this.escapeHtml(this.replyingTo.message.substring(0, 100))}${this.replyingTo.message.length > 100 ? '...' : ''}</div>
        `;
        
        this.replyInput.classList.add('active');
    }

    cancelReply() {
        this.replyingTo = null;
        if (this.replyInput) {
            this.replyInput.classList.remove('active');
        }
    }

    // User Context Menu Implementation
    showUserContextMenu(event, username) {
        event.preventDefault();
        
        // Remove existing context menu
        const existingMenu = document.querySelector('.user-context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menu = document.createElement('div');
        menu.className = 'user-context-menu';
        menu.style.position = 'fixed';
        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        menu.style.zIndex = '10000';

        const isFriend = this.friends.has(username);
        const hasRequestSent = this.friendRequests.sent.has(username);
        
        menu.innerHTML = `
            <div class="context-menu-item" onclick="chatApp.startDMWithFriend('${username}')">
                <i class="fas fa-comment"></i> Send Message
            </div>
            ${!isFriend && !hasRequestSent ? `
                <div class="context-menu-item" onclick="chatApp.sendQuickFriendRequest('${username}')">
                    <i class="fas fa-user-plus"></i> Add Friend
                </div>
            ` : ''}
            ${isFriend ? `
                <div class="context-menu-item" onclick="chatApp.removeFriend('${username}')">
                    <i class="fas fa-user-times"></i> Remove Friend
                </div>
            ` : ''}
            <div class="context-menu-item" onclick="chatApp.viewUserProfile('${username}')">
                <i class="fas fa-user"></i> View Profile
            </div>
        `;

        document.body.appendChild(menu);

        // Auto-hide after 5 seconds or on click outside
        setTimeout(() => {
            if (menu.parentNode) menu.remove();
        }, 5000);

        document.addEventListener('click', function removeMenu() {
            if (menu.parentNode) menu.remove();
            document.removeEventListener('click', removeMenu);
        });
    }

    sendQuickFriendRequest(username) {
        this.socket.emit('sendFriendRequest', { targetUsername: username });
        this.showNotification(`Friend request sent to ${username}`, 'success');
    }

    viewUserProfile(username) {
        // Simple profile view - can be enhanced later
        const avatar = this.generateAvatarUrl(username);
        this.showNotification(`Viewing profile of ${username}`, 'info');
    }
}

// Initialize the chat app when the page loads
let chatApp;
document.addEventListener('DOMContentLoaded', () => {
    chatApp = new ChatApp();
});

// Handle beforeunload to clean up
window.addEventListener('beforeunload', () => {
    if (chatApp && chatApp.socket) {
        chatApp.socket.disconnect();
    }
});
