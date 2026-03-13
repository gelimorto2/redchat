/* ═══════════════════════════════════════════════════════════════
   RedChat v5.0 — Ultimate Client (Mobile-First Rewrite)
   ═══════════════════════════════════════════════════════════════ */

class ChatApp {
  constructor() {
    /* ─── State ─── */
    this.socket = null;
    this.username = '';
    this.currentRoom = 'General';
    this.currentDM = null;
    this.isDM = false;
    this.rooms = [];
    this.customRooms = [];
    this.onlineUsers = [];
    this.friends = [];
    this.friendRequests = { sent: [], received: [] };
    this.blocked = [];
    this.messageHistory = {};
    this.dmHistory = {};
    this.replyingTo = null;
    this.editingMessage = null;
    this.typingTimer = null;
    this.isTyping = false;
    this.avatars = {};
    this.myAvatar = null;
    this.stickers = {};
    this.captchaA = 0;
    this.captchaB = 0;
    this.captchaOp = '+';
    this.loginAttempts = 0;
    this.pendingVerifyUser = null;
    this.userRoles = {};
    this.pinnedMessages = [];
    this.bookmarks = [];
    this.polls = [];
    this.announcements = [];
    this.adminStats = null;
    this.todoList = [];
    this.wheelOptions = [];
    this.isRecording = false;
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.contextMenuTarget = null;
    this.selectedInvites = new Set();
    this.unreadCounts = {};
    this.unreadDMs = {};
    this.favorites = [];
    this.mutedRooms = [];
    this.sidebarActiveTab = 'channels';
    this.isMobile = window.innerWidth <= 768;
    this.sidebarOpen = false;
    this.membersOpen = false;
    this.notifications = [];
    this.inputHistory = [];
    this.inputHistoryIndex = -1;
    this.drafts = {};
    this.messageFilter = 'all';
    this.userNotes = {};
    this.scheduledMessages = [];
    this.focusMode = false;
    this.compactMode = false;
    this.idleTimeout = null;
    this.idleTime = 0;
    this.emojiRecent = [];
    this.searchFilters = { type: 'all' };
    this.imageViewerZoom = 1;
    this.imageViewerRotation = 0;
    this.viewerZoom = 1;
    this.viewerRotation = 0;
    this.lastMessageTimestamp = {};
    this.connectionMonitor = null;
    this.performanceMetrics = {};
    this.sessionStart = Date.now();
    this.typingUsers = new Set();
    this.typingTimers = {};
    this.editingMessageId = null;
    this.pendingFile = null;
    this.pendingCW = null;
    this.slowModeActive = false;
    this.slowModeInterval = 0;
    this.lastMessageTime = 0;
    this.userRole = 'member';

    // v5 state object
    this.state = {
      activeThread: null,
      scheduledMessages: [],
      customStatus: null,
      isSpinning: false,
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      todos: [],
      favorites: [],
      wheelOptions: [],
      commandHistory: [],
      selectedText: null,
      replyingTo: null,
      editingMessage: null,
      drafts: {},
      perfMetrics: null,
      messageFilterType: 'all',
      inputHistory: [],
      inputHistoryIndex: -1
    };

    this.settings = {
      theme: 'midnight',
      accent: '#667eea',
      fontSize: 14,
      density: 'cozy',
      chatBackground: 'none',
      sound: true,
      desktop: true,
      preview: true,
      animations: true,
      compact: false,
      showTyping: true,
      showOnline: true,
      allowDMs: true,
      dmNotif: true,
      friendNotif: true,
      mentionNotif: true,
      screenReader: false,
      highContrast: false,
      reducedMotion: false,
      readReceipt: true
    };

    this.loadLocalSettings();
    this.loadTodos();
    this.loadFavorites();
    this.loadMuted();
    this.loadDrafts();
    this.loadUserNotes();
    this.loadEmojiRecent();

    this.cacheDOM();
    this.connect();
    this.bindEvents();
    this.applySavedTheme();
    this.initEmojiPicker();
    this.initIdleDetection();
    this.initServiceWorker();
    this.startConnectionMonitor();
    this.initPerformanceTracking();
  }

  /* ─── DOM CACHE ─── */
  cacheDOM() {
    const $ = id => document.getElementById(id);
    const $$ = sel => document.querySelectorAll(sel);

    this.dom = {
      // Screens
      splash: $('splashScreen'),
      auth: $('authScreen'),
      app: $('chatApp'),

      // Auth panels
      loginPanel: $('loginPanel'),
      registerPanel: $('registerPanel'),
      forgotPanel: $('forgotPanel'),
      verifyPanel: $('verifyPanel'),

      // Login
      loginForm: $('loginForm'),
      loginUsername: $('loginUsername'),
      loginPassword: $('loginPassword'),
      loginCaptcha: $('loginCaptcha'),
      captchaQuestion: $('captchaQuestion'),
      captchaAnswer: $('captchaAnswer'),
      loginError: $('loginError'),

      // Register
      registerForm: $('registerForm'),
      regUsername: $('regUsername'),
      regEmail: $('regEmail'),
      regPassword: $('regPassword'),
      regPasswordConfirm: $('regPasswordConfirm'),
      registerError: $('registerError'),
      passwordStrength: $('passwordStrength'),

      // Forgot/Reset
      forgotForm: $('forgotForm'),
      forgotUsername: $('forgotUsername'),
      forgotError: $('forgotError'),
      forgotSuccess: $('forgotSuccess'),
      resetCodePanel: $('resetCodePanel'),
      resetForm: $('resetForm'),
      resetCode: $('resetCode'),
      resetNewPassword: $('resetNewPassword'),
      resetError: $('resetError'),

      // Verify
      verifyForm: $('verifyForm'),
      verifyError: $('verifyError'),
      verifyDigits: $$('.verify-digit'),

      // Header
      sidebarToggle: $('sidebarToggle'),
      headerRoomName: $('headerRoomName'),
      headerRoomDesc: $('headerRoomDesc'),
      headerRoomIcon: $('headerRoomIcon'),
      topicBar: $('topicBar'),
      topicText: $('topicText'),
      pinnedBtn: $('pinnedBtn'),
      membersBtn: $('membersBtn'),
      searchBtn: $('searchBtn'),
      toolsBtn: $('toolsBtn'),
      toolsDropdown: $('toolsDropdown'),
      adminPanelBtn: $('adminPanelBtn'),
      notifCenterBtn: $('notifCenterBtn'),
      notifBadge: $('notifBadge'),

      // Sidebar
      sidebar: $('sidebar'),
      sidebarOverlay: $('sidebarOverlay'),
      sidebarClose: $('sidebarClose'),
      sidebarTabs: $('sidebarTabs'),
      sidebarSearchInput: $('sidebarSearchInput'),
      sidebarChannels: $('sidebarChannels'),
      sidebarDMs: $('sidebarDMs'),
      sidebarFriends: $('sidebarFriends'),
      sidebarExplore: $('sidebarExplore'),
      roomsList: $('roomsList'),
      favoritesList: $('favoritesList'),
      favoritesEmpty: $('favoritesEmpty'),
      dmSection: $('dmSection'),
      dmEmpty: $('dmEmpty'),
      dmBadge: $('dmBadge'),
      friendsList: $('friendsList'),
      friendRequestsList: $('friendRequestsList'),
      friendCount: $('friendCount'),
      friendBadge: $('friendBadge'),
      friendFilters: $('friendFilters'),
      exploreSearch: $('exploreSearch'),
      exploreRoomsList: $('exploreRoomsList'),
      exploreEmpty: $('exploreEmpty'),
      trendingTags: $('trendingTags'),
      createRoomBtn: $('createRoomBtn'),
      addFriendBtn: $('addFriendBtn'),
      newDMBtn: $('newDMBtn'),

      // User panel
      userPanelAvatar: $('userPanelAvatar'),
      userPanelName: $('userPanelName'),
      userPanelStatus: $('userPanelStatus'),
      statusBtn: $('statusBtn'),
      userSettingsBtn: $('userSettingsBtn'),

      // Chat
      chatView: $('chatView'),
      welcomeState: $('welcomeState'),
      chatMessages: $('chatMessages'),
      typingIndicator: $('typingIndicator'),
      typingText: $('typingText'),
      newMsgIndicator: $('newMsgIndicator'),
      editBar: $('editBar'),
      cancelEdit: $('cancelEdit'),
      replyPreview: $('replyPreview'),
      replyToUsername: $('replyToUsername'),
      replyToText: $('replyToText'),
      cancelReply: $('cancelReply'),
      messageInput: $('messageInput'),
      charCounter: $('charCounter'),
      markdownBtn: $('markdownBtn'),
      markdownPreview: $('markdownPreview'),
      sendBtn: $('sendBtn'),
      attachBtn: $('attachBtn'),
      fileInput: $('fileInput'),
      stickerBtn: $('stickerBtn'),
      gifBtn: $('gifBtn'),
      voiceBtn: $('voiceBtn'),

      // Announcement
      announcementBanner: $('announcementBanner'),
      announcementText: $('announcementText'),
      dismissAnnouncement: $('dismissAnnouncement'),

      // Members sidebar
      membersSidebar: $('membersSidebar'),
      membersOverlay: $('membersOverlay'),
      onlineUsersList: $('onlineUsersList'),
      memberSearch: $('memberSearch'),
      closeMembersBtn: $('closeMembersBtn'),

      // Mobile nav
      mobileNav: $('mobileNav'),
      mobileNavChat: $('mobileNavChat'),
      mobileNavChannels: $('mobileNavChannels'),
      mobileNavDMs: $('mobileNavDMs'),
      mobileNavFriends: $('mobileNavFriends'),
      mobileNavProfile: $('mobileNavProfile'),
      mobileNavDMBadge: $('mobileNavDMBadge'),
      mobileNavFriendBadge: $('mobileNavFriendBadge'),

      // Drag overlay
      dragOverlay: $('dragOverlay'),

      // ARIA
      ariaLive: $('ariaLive'),

      // Modals
      searchModal: $('searchModal'),
      searchInput: $('searchInput'),
      searchResults: $('searchResults'),
      settingsModal: $('settingsModal'),
      createRoomModal: $('createRoomModal'),
      browseRoomsModal: $('browseRoomsModal'),
      browseRoomsList: $('browseRoomsList'),
      browseRoomsSearch: $('browseRoomsSearch'),
      inviteModal: $('inviteModal'),
      addFriendModal: $('addFriendModal'),
      profileModal: $('profileModal'),
      profileModalBody: $('profileModalBody'),
      reportModal: $('reportModal'),
      imageModal: $('imageModal'),
      imageModalImg: $('imageModalImg'),
      stickerPicker: $('stickerPicker'),
      todoModal: $('todoModal'),
      adminModal: $('adminModal'),
      pinnedModal: $('pinnedModal'),
      bookmarksModal: $('bookmarksModal'),
      pollModal: $('pollModal'),
      wheelModal: $('wheelModal'),
      banModal: $('banModal'),
      sharedWheelOverlay: $('sharedWheelOverlay'),
      notifCenterModal: $('notifCenterModal'),

      // Context menus
      contextMenu: $('contextMenu'),
      roomContextMenu: $('roomContextMenu'),
      statusPicker: $('statusPicker'),
      reactionPicker: $('reactionPicker'),

      // Image viewer toolbar
      ivZoomIn: $('ivZoomIn'),
      ivZoomOut: $('ivZoomOut'),
      ivRotate: $('ivRotate'),
      ivDownload: $('ivDownload'),

      // Toast & Audio
      toastContainer: $('toastContainer'),
      notifSound: $('notifSound'),

      // ── Aliases for compatibility between v4/v5 code ──
      messagesContainer: $('chatMessages'),
      channelName: $('headerRoomName'),
      channelIcon: $('headerRoomIcon'),
      membersList: $('onlineUsersList'),
      replyBar: $('replyPreview'),
    };
  }


  /* ─── LOCAL STORAGE ─── */
  loadLocalSettings() {
    try { const s = localStorage.getItem('redchat_settings'); if (s) Object.assign(this.settings, JSON.parse(s)); } catch(e) {}
  }
  saveLocalSettings() {
    try { localStorage.setItem('redchat_settings', JSON.stringify(this.settings)); } catch(e) {}
  }
  loadTodos() {
    try { const s = localStorage.getItem('redchat_todos'); if (s) this.todoList = JSON.parse(s); } catch(e) {}
  }
  saveTodos() {
    try { localStorage.setItem('redchat_todos', JSON.stringify(this.todoList)); } catch(e) {}
  }
  loadFavorites() {
    try { const s = localStorage.getItem('redchat_favorites'); if (s) this.favorites = JSON.parse(s) || []; } catch(e) { this.favorites = []; }
    // Clean up invalid entries (e.g. [object HTMLDivElement])
    this.favorites = this.favorites.filter(f => typeof f === 'string' && !f.includes('[object'));
    if (this.state) this.state.favorites = this.favorites;
    this.saveFavorites();
  }
  saveFavorites() {
    try { localStorage.setItem('redchat_favorites', JSON.stringify(this.favorites)); } catch(e) {}
  }
  loadMuted() {
    try { const s = localStorage.getItem('redchat_muted'); if (s) this.mutedRooms = JSON.parse(s) || []; } catch(e) { this.mutedRooms = []; }
    if (this.state) this.state.mutedRooms = this.mutedRooms;
  }
  saveMuted() {
    try { localStorage.setItem('redchat_muted', JSON.stringify(this.mutedRooms)); } catch(e) {}
  }
  loadDrafts() {
    try { const s = localStorage.getItem('redchat_drafts'); if (s) this.drafts = JSON.parse(s); } catch(e) {}
  }
  saveDrafts() {
    try { localStorage.setItem('redchat_drafts', JSON.stringify(this.drafts)); } catch(e) {}
  }
  loadUserNotes() {
    try { const s = localStorage.getItem('redchat_notes'); if (s) this.userNotes = JSON.parse(s); } catch(e) {}
  }
  saveUserNotes() {
    try { localStorage.setItem('redchat_notes', JSON.stringify(this.userNotes)); } catch(e) {}
  }
  loadEmojiRecent() {
    try { const s = localStorage.getItem('redchat_emoji_recent'); if (s) this.emojiRecent = JSON.parse(s); } catch(e) {}
  }
  saveEmojiRecent() {
    try { localStorage.setItem('redchat_emoji_recent', JSON.stringify(this.emojiRecent.slice(0, 24))); } catch(e) {}
  }

  applySavedTheme() {
    const body = document.body;
    body.classList.remove('dark-mode', 'light-mode', 'midnight-mode', 'amoled-mode',
      'reduce-motion', 'high-contrast', 'compact-mode');
    body.classList.add(this.settings.theme + '-mode');
    const accent = this.settings.accent;
    document.documentElement.style.setProperty('--accent', accent);
    // Parse accent hex to RGB for backdrop tinting
    const hex = accent.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) || 102;
    const g = parseInt(hex.substr(2, 2), 16) || 126;
    const b = parseInt(hex.substr(4, 2), 16) || 234;
    document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    document.documentElement.style.setProperty('--accent-hover', this.adjustColor(accent, -15));
    document.documentElement.style.setProperty('--accent-light', `rgba(${r}, ${g}, ${b}, 0.15)`);
    if (this.settings.reducedMotion) body.classList.add('reduce-motion');
    if (this.settings.highContrast) body.classList.add('high-contrast');
    if (this.settings.compact || this.settings.density === 'compact') body.classList.add('compact-mode');
    if (this.settings.fontSize) {
      document.documentElement.style.setProperty('--message-font-size', this.settings.fontSize + 'px');
    }
    this.applyChatBackground();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const bg = getComputedStyle(document.body).getPropertyValue('--bg-primary').trim();
      if (bg) meta.content = bg;
    }
  }

  applyChatBackground() {
    const container = this.dom.messagesContainer || document.getElementById('messagesContainer');
    if (!container) return;
    container.classList.remove('chat-bg-dots', 'chat-bg-grid', 'chat-bg-gradient');
    const bg = this.settings.chatBackground || 'none';
    if (bg !== 'none') {
      container.classList.add('chat-bg-' + bg);
    }
  }

  /* ─── SCREEN TRANSITIONS ─── */
  showAuth() {
    if (this.dom.splash) this.dom.splash.style.display = 'none';
    if (this.dom.auth) this.dom.auth.style.display = 'flex';
    this.generateCaptcha();
  }

  showApp() {
    if (this.dom.auth) this.dom.auth.style.display = 'none';
    if (this.dom.app) {
      this.dom.app.classList.add('active');
      this.dom.app.style.display = '';
    }
    this.updateMobileNav('chat');
    this.announce('Connected to RedChat');
    this.requestNotificationPermission();
  }

  showAuthPanel(panel) {
    ['loginPanel', 'registerPanel', 'forgotPanel', 'verifyPanel'].forEach(p => {
      if (this.dom[p]) this.dom[p].classList.remove('active');
    });
    if (this.dom[panel]) this.dom[panel].classList.add('active');
    if (panel === 'loginPanel') this.generateCaptcha();
  }

  /* ─── ACCESSIBILITY ─── */
  announce(text) {
    if (this.dom.ariaLive) {
      this.dom.ariaLive.textContent = text;
      setTimeout(() => { this.dom.ariaLive.textContent = ''; }, 3000);
    }
  }

  /* ─── NOTIFICATIONS PERMISSION ─── */
  requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  /* ─── SERVICE WORKER ─── */
  initServiceWorker() {
    // Placeholder for PWA service worker registration
    if ('serviceWorker' in navigator) {
      // navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }

  /* ─── IDLE DETECTION ─── */
  initIdleDetection() {
    const resetIdle = () => {
      this.idleTime = 0;
      if (this.socket && this.username) {
        // Could auto-set status to away after idle
      }
    };
    document.addEventListener('mousemove', resetIdle, { passive: true });
    document.addEventListener('keypress', resetIdle, { passive: true });
    document.addEventListener('touchstart', resetIdle, { passive: true });
    document.addEventListener('scroll', resetIdle, { passive: true });
    this.idleTimeout = setInterval(() => {
      this.idleTime++;
      if (this.idleTime > 300) { // 5 minutes
        // Auto-set status to away
        if (this.socket && this.username) {
          this.socket.emit('setStatus', { status: 'away' });
        }
      }
    }, 1000);
  }

  /* ─── CONNECTION MONITOR ─── */
  startConnectionMonitor() {
    let lastPing = Date.now();
    this.connectionMonitor = setInterval(() => {
      if (this.socket && this.socket.connected) {
        lastPing = Date.now();
      }
    }, 5000);

    window.addEventListener('online', () => {
      this.toast('Back online', 'success');
      if (this.socket) this.socket.connect();
    });
    window.addEventListener('offline', () => {
      this.toast('Connection lost', 'error');
    });
  }

  /* ─── PERFORMANCE TRACKING ─── */
  initPerformanceTracking() {
    this.performanceMetrics.pageLoad = performance.now();
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              this.performanceMetrics.lcp = entry.startTime;
            }
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch(e) {}
    }
  }

  /* ─── SOCKET CONNECTION ─── */
  connect() {
    this.socket = io({ reconnection: true, reconnectionDelay: 2000, reconnectionAttempts: 10 });

    this.socket.on('connect', () => {
      console.log('[RedChat] Connected:', this.socket.id);
      this.performanceMetrics.socketConnect = performance.now();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[RedChat] Disconnected:', reason);
      this.toast('Disconnected from server', 'warning');
    });

    this.socket.on('reconnect', () => {
      this.toast('Reconnected!', 'success');
      if (this.username) {
        this.socket.emit('rejoin', { username: this.username, room: this.currentRoom });
      }
    });

    // Auth responses
    this.socket.on('loginSuccess', data => this.handleLoginSuccess(data));
    this.socket.on('loginError', data => this.handleAuthError('loginError', data.message));
    this.socket.on('registerSuccess', data => this.handleRegisterSuccess(data));
    this.socket.on('registerError', data => this.handleAuthError('registerError', data.message));
    this.socket.on('verifySuccess', data => this.handleVerifySuccess(data));
    this.socket.on('verifyError', data => this.handleAuthError('verifyError', data.message));
    this.socket.on('verificationResent', data => this.toast(data.message || 'Verification code sent!', 'success'));
    this.socket.on('resetCodeSent', (data) => {
      this.pendingResetUser = data.username;
      if(this.dom.resetCodePanel) this.dom.resetCodePanel.style.display = 'block';
    });
    this.socket.on('passwordResetSuccess', () => { this.toast('Password reset!', 'success'); this.showAuthPanel('loginPanel'); });
    this.socket.on('forgotError', data => this.handleAuthError('forgotError', data.message));
    this.socket.on('resetError', data => this.handleAuthError('resetError', data.message));
    this.socket.on('requireVerification', data => {
      this.pendingVerifyUser = data.username;
      this.showAuthPanel('verifyPanel');
    });

    // Room & user data
    this.socket.on('roomList', data => this.handleRoomList(data));
    this.socket.on('userList', data => this.handleUserList(data));
    this.socket.on('message', data => this.handleMessage(data));
    this.socket.on('messageHistory', data => this.handleMessageHistory(data));
    this.socket.on('roomJoined', data => this.handleRoomJoined(data));
    this.socket.on('typing', data => this.handleTyping(data));
    this.socket.on('stopTyping', data => this.handleStopTyping(data));
    this.socket.on('messageDeleted', data => this.handleMessageDeleted(data));
    this.socket.on('messageEdited', data => this.handleMessageEdited(data));
    this.socket.on('roomCreated', data => this.handleRoomCreated(data));
    this.socket.on('roomDeleted', data => this.handleRoomDeleted(data));
    this.socket.on('customRooms', data => { this.customRooms = data; this.renderRooms(); });
    this.socket.on('browseRooms', data => this.renderBrowseRooms(data));

    // System messages (join/leave/react events)
    this.socket.on('systemMessage', data => {
      if (!this.dom.messagesContainer) return;
      if (this.isDM) {
        // Buffer system messages while in DM view; flush on room switch
        if (!this._pendingSystemMsgs) this._pendingSystemMsgs = [];
        this._pendingSystemMsgs.push(data);
      } else {
        this.appendMessage({ type: 'system', text: data.message, timestamp: data.timestamp });
        this.scrollToBottom();
      }
    });

    // DM events
    this.socket.on('dmMessage', data => this.handleDMMessage(data));
    this.socket.on('dmHistory', data => this.handleDMHistory(data));
    this.socket.on('dmSync', data => this.handleDMSync(data));

    // Friends
    this.socket.on('friendsList', data => this.handleFriendsList(data));
    this.socket.on('friendRequests', data => this.handleFriendRequests(data));
    this.socket.on('friendRequestReceived', data => {
      this.toast(`${data.from} sent you a friend request!`, 'info');
      this.addNotification({ type: 'friend', user: data.from, text: `${data.from} sent you a friend request`, time: Date.now() });
      this.socket.emit('getFriendRequests');
    });
    this.socket.on('friendAdded', data => {
      this.toast(`${data.friend} is now your friend!`, 'success');
      this.socket.emit('getFriends');
    });
    this.socket.on('friendRemoved', data => {
      this.toast(`Removed ${data.friend} from friends`, 'info');
      this.socket.emit('getFriends');
    });
    this.socket.on('friendError', data => this.toast(data.message, 'error'));
    this.socket.on('blockedList', data => { this.blocked = data; });
    this.socket.on('blockSuccess', data => this.toast(`Blocked ${data.target}`, 'warning'));
    this.socket.on('unblockSuccess', data => this.toast(`Unblocked ${data.target}`, 'success'));

    // Avatar
    this.socket.on('avatarUpdate', data => {
      this.avatars[data.username] = data.avatar;
      this.updateAvatarsInDOM(data.username, data.avatar);
    });
    this.socket.on('avatarData', data => {
      this.avatars = { ...this.avatars, ...data };
      // Update ALL users' avatars in the DOM (history loads before avatarData arrives)
      for (const [user, url] of Object.entries(data)) {
        if (url) this.updateAvatarsInDOM(user, url);
      }
    });

    // Pinned messages
    this.socket.on('pinnedMessages', data => { this.pinnedMessages = data; this.renderPinnedMessages(data); });
    this.socket.on('messagePinned', data => {
      this.toast(`Message pinned by ${data.by}`, 'info');
      this.socket.emit('getPinned', { room: this.currentRoom });
    });
    this.socket.on('messageUnpinned', data => {
      this.socket.emit('getPinned', { room: this.currentRoom });
    });

    // Bookmarks
    this.socket.on('bookmarks', data => { this.bookmarks = data.bookmarks || data; this.renderBookmarks(data); });
    this.socket.on('bookmarksUpdate', data => { this.bookmarks = data.bookmarks || data; this.renderBookmarks(data); });
    this.socket.on('bookmarkAdded', () => this.toast('Bookmark added!', 'success'));
    this.socket.on('bookmarkRemoved', () => this.toast('Bookmark removed', 'info'));

    // Polls
    this.socket.on('pollCreated', data => this.handlePollCreated(data));
    this.socket.on('pollUpdated', data => this.handlePollUpdate(data));

    // Reactions
    this.socket.on('reactionUpdated', data => this.handleReactionUpdate(data));

    // XP
    this.socket.on('xpUpdate', data => this.handleXPUpdate(data));
    this.socket.on('levelUp', data => this.handleLevelUp(data));

    // Announcements
    this.socket.on('announcement', data => this.handleAnnouncement(data));
    this.socket.on('announcementsList', data => { this.announcements = data; this.renderAnnouncementsList(); });

    // Admin
    this.socket.on('adminStats', data => { this.adminStats = data; this.renderAdminStats(data); });
    this.socket.on('adminUsers', data => this.renderAdminUsers(data));
    this.socket.on('adminRooms', data => this.renderAdminRooms(data));
    this.socket.on('adminReports', data => this.renderAdminReports(data));
    this.socket.on('reportSuccess', () => { this.toast('Report submitted', 'success'); this.closeModal('reportModal'); });
    this.socket.on('adminError', data => this.toast(data.message, 'error'));

    // Bans
    this.socket.on('banned', data => { this.toast(`You have been banned: ${data.reason}`, 'error'); this.showAuth(); location.reload(); });
    this.socket.on('kicked', data => { this.toast(`Kicked: ${data.reason}`, 'warning'); this.showAuth(); });
    this.socket.on('muted', data => this.toast(`Muted for ${data.duration}`, 'warning'));
    this.socket.on('unmuted', () => this.toast('You have been unmuted', 'success'));
    this.socket.on('bannedUsers', data => this.renderBannedUsers(data));

    // Stickers
    this.socket.on('stickerList', data => { this.stickers = data; this.renderStickers(); });
    this.socket.on('syncStickers', data => { this.stickers = data.stickers || data; this.renderStickers(); });
    this.socket.on('stickerAdded', () => { this.toast('Sticker added!', 'success'); this.socket.emit('getStickers'); });

    // Status
    this.socket.on('statusUpdate', data => this.handleStatusUpdate(data));
    this.socket.on('userStatusList', data => this.handleUserStatusList(data));

    // Wheel of Fortune
    this.socket.on('wheelResult', data => this.handleWheelResult(data));
    this.socket.on('sharedWheel', data => this.handleSharedWheel(data));

    // Invite user to room
    this.socket.on('roomInvite', data => {
      this.toast(`You've been invited to ${data.room}`, 'info');
      this.addNotification({ type: 'system', user: data.by, text: `Invited to room: ${data.room}`, time: Date.now() });
    });

    // Profile data
    this.socket.on('profileData', data => this.handleProfileData(data));
    this.socket.on('userProfile', data => this.handleProfileData(data));
    this.socket.on('searchResults', data => this.handleSearchResults(data));
    this.socket.on('nameColorUpdated', data => {
      // Update all existing message author names in DOM for current user
      const color = data.color || '';
      this.nameColor = color;
      document.querySelectorAll(`.msg-author[data-user="${this.username}"]`).forEach(el => {
        el.style.color = color;
        if (color) el.style.fontWeight = '600';
      });
      // Update user panel name color
      if (this.dom.userPanelName) this.dom.userPanelName.style.color = color;
    });
    this.socket.on('bioUpdated', data => this.toast('Bio updated!', 'success'));
    this.socket.on('profileError', data => this.toast(data.message, 'error'));

    // Threads
    this.socket.on('threadReply', data => this.handleThreadReplies(data));
    this.socket.on('threadUpdated', data => {
      if (this.state.activeThread === data.threadId) this.socket.emit('getThread', { messageId: data.threadId });
    });

    // Achievements
    this.socket.on('achievementUnlocked', data => {
      this.toast(`Achievement Unlocked: ${data.name || data.title || ''} ${data.icon || '🏆'}`, 'success');
      if (this.state.achievements) this.state.achievements.push(data);
    });

    // Custom Emoji
    this.socket.on('customEmojiAdded', data => { if (!this.customEmojis) this.customEmojis = []; this.customEmojis.push(data); });
    this.socket.on('customEmojiDeleted', data => { if (this.customEmojis) this.customEmojis = this.customEmojis.filter(e => e.id !== data.emojiId); });
    this.socket.on('customEmojiList', data => { this.customEmojis = data.emojis || data || []; });
    this.socket.on('customEmojiCreated', data => this.toast('Custom emoji created!', 'success'));

    // Read receipts
    this.socket.on('readReceipt', data => this.handleReadReceipt(data));
    this.socket.on('readReceiptsData', data => {
      if (!this.state.readReceipts) this.state.readReceipts = {};
      this.state.readReceipts[data.room] = data.receipts || {};
      this.updateReadReceiptIndicators(data.room);
    });

    // Events / Calendar
    this.socket.on('eventCreated', data => this.toast(`Event created: ${data.title || ''}`, 'success'));
    this.socket.on('eventUpdated', data => this.toast(`Event updated: ${data.title || ''}`, 'info'));

    // Room settings
    this.socket.on('roomPermissionsUpdated', data => this.toast('Room permissions updated', 'success'));
    this.socket.on('roomPermissionsData', data => { this.state.roomPermissions = data; });

    // Warnings
    this.socket.on('warningReceived', data => this.toast(`Warning: ${data.reason || data.message || 'You received a warning'}`, 'warning'));

    // Saved messages
    this.socket.on('savedMessagesList', data => { this.state.savedMessages = data.messages || data || []; });

    // Notifications from server
    this.socket.on('notification', data => {
      this.addNotification({ type: data.type || 'system', text: data.message || data.text || '', user: data.from, time: Date.now() });
      this.toast(data.message || data.text || 'New notification', 'info');
    });
    this.socket.on('notificationPrefsUpdated', data => this.toast('Notification preferences saved', 'success'));
    this.socket.on('notificationPrefsData', data => { this.state.notificationPrefs = data.prefs || data; });

    // Misc
    this.socket.on('error', data => this.toast(data.message || 'An error occurred', 'error'));
    this.socket.on('slowMode', data => this.toast(`Slow mode: wait ${data.seconds}s`, 'warning'));
    this.socket.on('authStats', data => this.updateAuthStats(data));
  }


  /* ─── EVENT BINDING ─── */
  bindEvents() {
    const on = (el, evt, fn) => { if (el && fn) el.addEventListener(evt, fn.bind(this)); };
    const onClick = (el, fn) => on(el, 'click', fn);
    const onSubmit = (el, fn) => on(el, 'submit', fn);

    // Auth
    onSubmit(this.dom.loginForm, this.handleLogin);
    onSubmit(this.dom.registerForm, this.handleRegister);
    onSubmit(this.dom.forgotForm, this.handleForgot);
    onSubmit(this.dom.verifyForm, this.handleVerify);
    onSubmit(this.dom.resetForm, this.handleReset);

    // Auth panel switching
    onClick(document.getElementById('showRegister'), () => this.showAuthPanel('registerPanel'));
    onClick(document.getElementById('showLogin'), () => this.showAuthPanel('loginPanel'));
    onClick(document.getElementById('showForgotPassword'), () => this.showAuthPanel('forgotPanel'));
    onClick(document.getElementById('showLoginFromForgot'), () => this.showAuthPanel('loginPanel'));
    onClick(document.getElementById('skipVerification'), () => this.showAuthPanel('loginPanel'));
    onClick(document.getElementById('resendVerification'), () => {
      if (this.pendingVerifyUser) this.socket.emit('resendVerification', { username: this.pendingVerifyUser });
    });

    // Password visibility toggles (using event delegation for reliability)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.password-toggle')) {
        e.preventDefault();
        const btn = e.target.closest('.password-toggle');
        const input = btn.parentElement.querySelector('input[type="password"], input[type="text"]');
        const icon = btn.querySelector('i');
        if (input && icon) {
          if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
          } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
          }
        }
      }
    });

    // Password strength
    on(this.dom.regPassword, 'input', this.updatePasswordStrength);

    // Verify digit auto-advance
    if (this.dom.verifyDigits) {
      this.dom.verifyDigits.forEach((digit, i) => {
        digit.addEventListener('input', () => {
          if (digit.value && i < this.dom.verifyDigits.length - 1) {
            this.dom.verifyDigits[i + 1].focus();
          }
        });
        digit.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !digit.value && i > 0) {
            this.dom.verifyDigits[i - 1].focus();
          }
        });
      });
    }

    // ═══ SIDEBAR (Mobile-first toggling) ═══
    onClick(this.dom.sidebarToggle, this.toggleSidebar);
    onClick(this.dom.sidebarClose, this.closeSidebar);
    onClick(this.dom.sidebarOverlay, this.closeSidebar);

    // Global delegated listener: close modal when [data-close] button is clicked
    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('[data-close]');
      if (closeBtn) { e.stopPropagation(); this.closeModal(closeBtn.dataset.close); return; }
      // Close modal on backdrop click
      if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    // Sidebar tabs
    if (this.dom.sidebarTabs) {
      this.dom.sidebarTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.sidebar-tab');
        if (tab) this.switchSidebarTab(tab.dataset.tab);
      });
    }

    // Sidebar search filter
    on(this.dom.sidebarSearchInput, 'input', (e) => this.filterSidebar(e.target.value));

    // Room actions
    onClick(this.dom.createRoomBtn, () => this.openModal('createRoomModal'));
    onClick(this.dom.addFriendBtn, () => this.openModal('addFriendModal'));
    onClick(this.dom.newDMBtn, () => this.openModal('addFriendModal'));

    // ═══ MOBILE BOTTOM NAV ═══
    onClick(this.dom.mobileNavChat, () => {
      this.closeSidebar();
      this.closeMembers();
      this.updateMobileNav('chat');
    });
    onClick(this.dom.mobileNavChannels, () => {
      this.switchSidebarTab('channels');
      this.openSidebar();
      this.updateMobileNav('channels');
    });
    onClick(this.dom.mobileNavDMs, () => {
      this.switchSidebarTab('dms');
      this.openSidebar();
      this.updateMobileNav('dms');
    });
    onClick(this.dom.mobileNavFriends, () => {
      this.switchSidebarTab('friends');
      this.openSidebar();
      this.updateMobileNav('friends');
    });
    onClick(this.dom.mobileNavProfile, () => {
      this.openModal('settingsModal');
      this.updateMobileNav('profile');
    });

    // ═══ HEADER ═══
    onClick(this.dom.searchBtn, () => this.openModal('searchModal'));
    onClick(this.dom.membersBtn, this.toggleMembers);
    onClick(this.dom.pinnedBtn, () => {
      this.socket.emit('getPinned', { room: this.currentRoom });
      this.openModal('pinnedModal');
    });
    onClick(document.getElementById('pinnedBarClose'), () => {
      this.socket.emit('getPinned', { room: this.currentRoom });
      this.openModal('pinnedModal');
    });
    onClick(this.dom.notifCenterBtn, () => this.openModal('notifCenterModal'));

    // Tools dropdown
    onClick(this.dom.toolsBtn, (e) => {
      e.stopPropagation();
      this.dom.toolsDropdown.classList.toggle('active');
    });

    // Tools dropdown items
    this.dom.toolsDropdown?.querySelectorAll('[data-action]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dom.toolsDropdown.classList.remove('active');
        this.handleToolAction(item.dataset.action);
      });
    });

    onClick(this.dom.adminPanelBtn, () => {
      this.socket.emit('getAdminStats');
      this.openModal('adminModal');
    });

    // ═══ CHAT ═══
    // Message input
    on(this.dom.messageInput, 'keydown', this.handleInputKeydown);
    on(this.dom.messageInput, 'input', this.handleInputChange);
    this.dom.messageInput?.addEventListener('blur', () => setTimeout(() => this.hideChatAutocomplete(), 150));
    onClick(this.dom.sendBtn, () => this.sendMessage());
    onClick(this.dom.cancelReply, this.cancelReply);
    onClick(this.dom.cancelEdit, this.cancelEdit);
    onClick(document.getElementById('cancelUpload'), () => this.cancelUploadPreview());

    // New message indicator
    onClick(this.dom.newMsgIndicator, () => {
      this.scrollToBottom();
      this.dom.newMsgIndicator?.classList.remove('visible');
    });

    // Markdown preview toggle
    onClick(this.dom.markdownBtn, () => {
      this.dom.markdownPreview?.classList.toggle('active');
      this.dom.markdownBtn?.classList.toggle('active');
      if (this.dom.markdownPreview?.classList.contains('active')) {
        this.dom.markdownPreview.innerHTML = this.formatText(this.dom.messageInput.value);
      }
    });

    // File upload / attachment menu
    onClick(this.dom.attachBtn, (e) => {
      e.stopPropagation();
      const rect = this.dom.attachBtn.getBoundingClientRect();
      const items = [
        { label: 'Upload File', icon: 'fas fa-file-upload', action: 'file', handler: () => { this.dom.fileInput.accept = '*/*'; this.dom.fileInput?.click(); } },
        { label: 'Upload Image/Video', icon: 'fas fa-image', action: 'image', handler: () => { this.dom.fileInput.accept = 'image/*,video/*'; this.dom.fileInput?.click(); } },
        { separator: true },
        { label: 'Create Poll', icon: 'fas fa-poll', action: 'poll', handler: () => this.showCreatePollDialog() },
        { label: 'Spin the Wheel', icon: 'fas fa-dharmachakra', action: 'wheel', handler: () => this.showWheelDialog() },
      ];
      // Position the context menu above the button, clamped to viewport
      const fakeEvent = { preventDefault: () => {}, clientX: rect.left + rect.width / 2, clientY: rect.top - 4 };
      this.showContextMenu(fakeEvent, items);
    });
    on(this.dom.fileInput, 'change', this.handleFileUpload);

    // Sticker picker
    onClick(this.dom.stickerBtn, (e) => {
      e.stopPropagation();
      const picker = this.dom.stickerPicker;
      if (!picker) return;
      // Move to body on first use so it can never be clipped by overflow
      if (picker.parentNode !== document.body) document.body.appendChild(picker);
      picker.classList.toggle('active');
      if (picker.classList.contains('active')) {
        if (!this._emojiInitialized) {
          this.initEmojiPicker();
        }
        // Position picker near the button
        const btnRect = this.dom.stickerBtn.getBoundingClientRect();
        picker.style.position = 'fixed';
        picker.style.bottom = (window.innerHeight - btnRect.top + 8) + 'px';
        picker.style.right = (window.innerWidth - btnRect.right) + 'px';
        picker.style.left = 'auto';
        picker.style.top = 'auto';
      }
    });

    // Voice recording
    onClick(this.dom.voiceBtn, this.toggleRecording);

    // Announcement dismiss
    onClick(this.dom.dismissAnnouncement, () => {
      this.dismissAnnouncement();
    });

    // ═══ MEMBERS ═══
    onClick(this.dom.closeMembersBtn, this.closeMembers);
    onClick(this.dom.membersOverlay, this.closeMembers);
    on(this.dom.memberSearch, 'input', (e) => this.filterMembers(e.target.value));

    // ═══ USER PANEL ═══
    onClick(this.dom.statusBtn, (e) => {
      e.stopPropagation();
      const picker = this.dom.statusPicker;
      if (picker) {
        if (picker.classList.contains('active')) {
          picker.classList.remove('active');
          picker.style.display = 'none';
        } else {
          // Position above the status button
          const rect = this.dom.statusBtn.getBoundingClientRect();
          picker.style.display = 'block';
          picker.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
          picker.style.left = rect.left + 'px';
          picker.classList.add('active');
        }
      }
    });
    onClick(this.dom.userSettingsBtn, () => this.openModal('settingsModal'));
    onClick(this.dom.userPanelAvatar, () => this.showProfile(this.username));
    onClick(this.dom.userPanelName, () => this.openModal('settingsModal'));

    // Status picker items
    this.dom.statusPicker?.querySelectorAll('.ctx-item[data-status]').forEach(opt => {
      opt.addEventListener('click', () => {
        const status = opt.dataset.status;
        this.socket.emit('setStatus', { status });
        this.dom.statusPicker.classList.remove('active');
        this.dom.statusPicker.style.display = 'none';
        this.updateUserPanelStatus(status);
      });
    });

    // Custom status
    const customStatusInput = document.getElementById('customStatusInput');
    if (customStatusInput) {
      customStatusInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.socket.emit('setStatus', { status: 'online', customText: customStatusInput.value });
          this.dom.statusPicker?.classList.remove('active');
        }
      });
    }

    // ═══ MODALS ═══
    // Close modal on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    });
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-backdrop')?.classList.remove('active');
      });
    });

    // Search
    on(this.dom.searchInput, 'input', this.debounce(this.handleSearchV5, 300));
    // Search filters
    document.querySelectorAll('.search-filters .filter-chip')?.forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.search-filters .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.searchFilters.type = chip.dataset.filter || 'all';
        this.state.messageFilterType = chip.dataset.filter || 'all';
        this.handleSearchV5();
      });
    });

    // Create room form
    onClick(document.getElementById('submitCreateRoom'), this.handleCreateRoom);

    // Icon selector
    document.querySelectorAll('#iconSelector .icon-pick')?.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#iconSelector .icon-pick').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const iconEl = document.getElementById('roomPreviewIcon');
        if (iconEl) iconEl.innerHTML = `<i class="fas ${btn.dataset.icon}"></i>`;
      });
    });

    // Color selector (for room creation — not the settings accent color)
    document.querySelectorAll('#colorSelector .color-pick')?.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#colorSelector .color-pick').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const iconEl = document.getElementById('roomPreviewIcon');
        if (iconEl) iconEl.style.color = btn.dataset.color;
      });
    });

    // Live preview for channel name
    const roomNameInput = document.getElementById('newRoomName');
    if (roomNameInput) {
      roomNameInput.addEventListener('input', () => {
        const preview = document.getElementById('roomPreviewName');
        if (preview) preview.textContent = roomNameInput.value || 'new-channel';
      });
    }
    const roomDescInput = document.getElementById('newRoomDescription');
    if (roomDescInput) {
      roomDescInput.addEventListener('input', () => {
        const preview = document.getElementById('roomPreviewDesc');
        if (preview) preview.textContent = roomDescInput.value || 'Channel description';
      });
    }

    // Browse rooms search
    on(this.dom.browseRoomsSearch, 'input', this.debounce(() => {
      this.socket.emit('browseRooms', { query: this.dom.browseRoomsSearch?.value || '' });
    }, 300));
    // Browse room categories
    document.querySelectorAll('.browse-categories .filter-chip')?.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.browse-categories .filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.socket.emit('browseRooms', { category: btn.dataset.cat || 'all' });
      });
    });

    // Add friend
    onClick(document.getElementById('submitAddFriend'), this.handleAddFriend);

    // Friend filter pills
    document.getElementById('friendFilters')?.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (pill) {
        document.querySelectorAll('#friendFilters .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.filterFriendsList(pill.dataset.filter);
      }
    });

    // Invite
    onClick(document.getElementById('submitInvite'), this.handleInvite);
    on(document.getElementById('inviteSearch'), 'input', (e) => this.filterInviteList(e.target.value));

    // Poll
    onClick(document.getElementById('addPollOption'), this.addPollOption);
    onClick(document.getElementById('submitPoll'), this.handleCreatePoll);

    // Todo
    onClick(document.getElementById('addTodoBtn'), this.handleAddTodo);
    on(document.getElementById('todoInput'), 'keydown', (e) => { if (e.key === 'Enter') this.handleAddTodo(); });
    onClick(document.getElementById('clearCompletedBtn'), this.clearCompletedTodos);
    // Todo filters
    this.dom.todoModal?.querySelectorAll('.todo-filters .filter-pill')?.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.todoModal.querySelectorAll('.todo-filters .filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderTodos(btn.dataset.filter);
      });
    });

    // Report
    onClick(document.getElementById('submitReport'), this.handleReport);
    // Report reason selection
    document.querySelectorAll('.report-reason')?.forEach(reason => {
      reason.addEventListener('click', () => {
        document.querySelectorAll('.report-reason').forEach(r => r.classList.remove('selected'));
        reason.classList.add('selected');
      });
    });

    // Wheel of Fortune
    onClick(document.getElementById('addWheelOption'), this.addWheelOption);
    onClick(document.getElementById('spinWheelBtn'), this.spinWheelV5.bind(this));

    // Ban
    onClick(document.getElementById('submitBan'), this.handleBan);

    // ═══ IMAGE VIEWER ═══
    onClick(this.dom.imageModal, (e) => {
      if (e.target === this.dom.imageModal) {
        this.dom.imageModal.classList.remove('active');
        this.imageViewerZoom = 1;
        this.imageViewerRotation = 0;
      }
    });
    onClick(this.dom.ivZoomIn, () => {
      this.imageViewerZoom = Math.min(this.imageViewerZoom + 0.25, 5);
      this.updateImageViewer();
    });
    onClick(this.dom.ivZoomOut, () => {
      this.imageViewerZoom = Math.max(this.imageViewerZoom - 0.25, 0.25);
      this.updateImageViewer();
    });
    onClick(this.dom.ivRotate, () => {
      this.imageViewerRotation = (this.imageViewerRotation + 90) % 360;
      this.updateImageViewer();
    });
    onClick(this.dom.ivDownload, () => {
      const img = this.dom.imageModalImg;
      if (img?.src) {
        const a = document.createElement('a');
        a.href = img.src;
        a.download = 'image.png';
        a.click();
      }
    });

    // ═══ NOTIFICATION CENTER ═══
    onClick(document.getElementById('markAllReadBtn'), () => {
      this.notifications.forEach(n => n.read = true);
      this.renderNotifications();
      this.updateNotifBadge();
    });
    // Notification filter pills
    this.dom.notifCenterModal?.querySelectorAll('.notif-filters .filter-pill')?.forEach(pill => {
      pill.addEventListener('click', () => {
        this.dom.notifCenterModal.querySelectorAll('.notif-filters .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderNotifications(pill.dataset.filter);
      });
    });

    // ═══ SETTINGS ═══
    this.bindSettingsEvents();

    // ═══ ADMIN PANEL ═══
    this.bindAdminEvents();

    // ═══ CONTEXT MENUS ═══
    // Click on message to highlight/select it
    this.dom.chatMessages?.addEventListener('click', (e) => {
      const msgEl = e.target.closest('.message');
      if (msgEl && !e.target.closest('button') && !e.target.closest('a') && !e.target.closest('.msg-actions') && !e.target.closest('.emoji-item') && !e.target.closest('.quick-react')) {
        document.querySelectorAll('.message.highlighted').forEach(m => m.classList.remove('highlighted'));
        msgEl.classList.add('highlighted');
      }
      // Click username to open profile
      const nameEl = e.target.closest('.msg-author');
      if (nameEl) {
        const username = nameEl.dataset.user || nameEl.textContent?.trim();
        if (username) this.showProfile(username);
      }
    });

    this.dom.chatMessages?.addEventListener('contextmenu', (e) => {
      const msgEl = e.target.closest('.message');
      if (msgEl) {
        e.preventDefault();
        const msgId = msgEl.dataset.id;
        const msgUser = msgEl.dataset.user;
        const msgText = msgEl.dataset.rawText || msgEl.querySelector('.msg-text')?.textContent || '';
        const data = { id: msgId, username: msgUser, text: msgText };
        const items = [
          { label: 'React', icon: 'fas fa-smile', action: 'react', handler: () => this.showReactionPicker(msgEl, msgId) },
          { label: 'Reply', icon: 'fas fa-reply', action: 'reply', handler: () => this.startReply(data) },
          { label: 'Pin', icon: 'fas fa-thumbtack', action: 'pin', handler: () => { this.socket.emit('pinMessage', { messageId: msgId, room: this.currentRoom }); this.toast('Message pinned!', 'success'); } },
          { label: 'Bookmark', icon: 'fas fa-bookmark', action: 'bookmark', handler: () => { this.socket.emit('bookmark', { messageId: msgId, message: msgText, username: msgUser, room: this.currentRoom, timestamp: Date.now() }); this.toast('Bookmarked!', 'success'); } },
          { label: 'Copy Text', icon: 'fas fa-copy', action: 'copy', handler: () => { navigator.clipboard.writeText(msgText); this.toast('Copied!', 'success'); } },
        ];
        if (msgUser !== this.username) {
          items.push({ label: 'Report', icon: 'fas fa-flag', action: 'report', danger: true, handler: () => { this.socket.emit('reportMessage', { messageId: msgId, reason: 'Inappropriate content' }); this.toast('Message reported', 'info'); } });
        }
        if (msgUser === this.username || this.userRole === 'admin') {
          items.push({ separator: true });
          items.push({ label: 'Edit', icon: 'fas fa-pencil', action: 'edit', handler: () => this.startEdit(data) });
          items.push({ label: 'Delete', icon: 'fas fa-trash', action: 'delete', danger: true, handler: () => { if (confirm('Delete this message?')) this.socket.emit('deleteMessage', { id: msgId }); } });
        }
        this.showContextMenu(e, items);
      }
    });

    // ═══ LONG-PRESS FOR MOBILE MESSAGE ACTIONS ═══
    let longPressTimer = null;
    let longPressMsg = null;
    this.dom.chatMessages?.addEventListener('touchstart', (e) => {
      const msg = e.target.closest('.message');
      if (!msg) return;
      longPressMsg = msg;
      longPressTimer = setTimeout(() => {
        // Remove actions-visible from all other messages
        document.querySelectorAll('.message.actions-visible').forEach(m => m.classList.remove('actions-visible'));
        msg.classList.add('actions-visible');
        // Vibrate for feedback if supported
        if (navigator.vibrate) navigator.vibrate(30);
      }, 500);
    }, { passive: true });
    this.dom.chatMessages?.addEventListener('touchmove', () => {
      clearTimeout(longPressTimer);
    }, { passive: true });
    this.dom.chatMessages?.addEventListener('touchend', () => {
      clearTimeout(longPressTimer);
    }, { passive: true });
    // Dismiss actions when tapping elsewhere
    document.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.message') && !e.target.closest('.msg-actions')) {
        document.querySelectorAll('.message.actions-visible').forEach(m => m.classList.remove('actions-visible'));
      }
    }, { passive: true });

    // Room context menu
    this.dom.roomsList?.addEventListener('contextmenu', (e) => {
      const roomEl = e.target.closest('.room-item');
      if (roomEl) {
        e.preventDefault();
        this.showRoomContextMenu(e, roomEl.dataset.room);
      }
    });

    // Close all popups on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.context-menu')) this.dom.contextMenu?.classList.remove('active');
      if (!e.target.closest('.room-context-menu')) this.dom.roomContextMenu?.classList.remove('active');
      if (!e.target.closest('#statusPicker') && !e.target.closest('#statusBtn')) this.dom.statusPicker?.classList.remove('active');
      if (!e.target.closest('.reaction-picker')) this.dom.reactionPicker?.classList.remove('active');
      if (!e.target.closest('#toolsDropdown') && !e.target.closest('#toolsBtn')) this.dom.toolsDropdown?.classList.remove('active');
      if (!e.target.closest('.picker-panel') && !e.target.closest('#stickerBtn')) this.dom.stickerPicker?.classList.remove('active');
    });

    // ═══ ESCAPE KEY ═══
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.handleEscape();
      }
    });

    // ═══ DRAG & DROP ═══
    document.addEventListener('dragenter', (e) => {
      e.preventDefault();
      this.dom.dragOverlay?.classList.add('active');
    });
    this.dom.dragOverlay?.addEventListener('dragleave', (e) => {
      if (e.target === this.dom.dragOverlay) {
        this.dom.dragOverlay.classList.remove('active');
      }
    });
    this.dom.dragOverlay?.addEventListener('dragover', (e) => e.preventDefault());
    this.dom.dragOverlay?.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dom.dragOverlay?.classList.remove('active');
      const files = e.dataTransfer?.files;
      if (files?.length) this.uploadFile(files[0]);
    });

    // ═══ SCROLL ═══
    this.dom.chatMessages?.addEventListener('scroll', () => {
      const el = this.dom.chatMessages;
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
      if (atBottom) {
        this.dom.newMsgIndicator?.classList.remove('visible');
      }
    });

    // ═══ PASTE UPLOAD ═══
    this.dom.messageInput?.addEventListener('paste', (e) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.startsWith('image/')) {
            e.preventDefault();
            const file = item.getAsFile();
            if (file) this.uploadFile(file);
            break;
          }
        }
      }
    });

    // ═══ RESIZE ═══
    window.addEventListener('resize', this.debounce(() => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      if (wasMobile !== this.isMobile) {
        if (!this.isMobile) {
          this.closeSidebar();
          this.closeMembers();
        }
      }
    }, 200));

    // ═══ VISIBILITY ═══
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.idleTime = 0;
        if (this.socket && this.username) {
          this.socket.emit('setStatus', { status: 'online' });
        }
      }
    });
  }

  /* ─── SETTINGS EVENTS ─── */
  bindSettingsEvents() {
    const onClick = (id, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', fn.bind(this));
    };
    const onToggle = (id, key) => {
      const el = document.getElementById(id);
      if (el) {
        const input = el.querySelector('input') || el;
        input.checked = this.settings[key] || false;
        input.addEventListener('change', () => {
          this.settings[key] = input.checked;
          this.saveLocalSettings();
          this.applySavedTheme();
        });
      }
    };

    // Settings nav
    this.dom.settingsModal?.querySelectorAll('.settings-nav-item')?.forEach(item => {
      item.addEventListener('click', () => {
        this.dom.settingsModal.querySelectorAll('.settings-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const tab = item.dataset.tab;
        this.dom.settingsModal.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(tab + 'SettingsPanel')?.classList.add('active');
      });
    });

    // Theme cards
    document.querySelectorAll('.theme-card')?.forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.settings.theme = card.dataset.theme;
        this.saveLocalSettings();
        this.applySavedTheme();
      });
    });

    // Mark current theme active
    document.querySelectorAll('.theme-card').forEach(c => {
      if (c.dataset.theme === this.settings.theme) c.classList.add('active');
    });

    // Font size slider
    const fontSlider = document.getElementById('fontSizeSlider');
    const fontValue = document.getElementById('fontSizeValue');
    if (fontSlider) {
      fontSlider.value = this.settings.fontSize;
      if (fontValue) fontValue.textContent = this.settings.fontSize + 'px';
      fontSlider.addEventListener('input', () => {
        this.settings.fontSize = parseInt(fontSlider.value);
        if (fontValue) fontValue.textContent = fontSlider.value + 'px';
        document.documentElement.style.setProperty('--message-font-size', fontSlider.value + 'px');
        // Apply to all message text elements directly
        document.querySelectorAll('.msg-text').forEach(el => {
          el.style.fontSize = fontSlider.value + 'px';
        });
        this.saveLocalSettings();
      });
    }

    // Toggles
    onToggle('soundToggle', 'sound');
    onToggle('desktopNotifToggle', 'desktop');
    onToggle('animationsToggle', 'animations');
    onToggle('showTypingToggle', 'showTyping');
    onToggle('showOnlineToggle', 'showOnline');
    onToggle('allowDMsToggle', 'allowDMs');
    onToggle('dmNotifToggle', 'dmNotif');
    onToggle('friendNotifToggle', 'friendNotif');
    onToggle('mentionNotifToggle', 'mentionNotif');
    onToggle('screenReaderToggle', 'screenReader');
    onToggle('highContrastToggle', 'highContrast');
    onToggle('previewToggle', 'preview');
    onToggle('readReceiptToggle', 'readReceipt');
    onToggle('reducedMotionToggle', 'reducedMotion');

    // Test notification button
    onClick('testNotifBtn', () => {
      this.toast('This is a test notification!', 'info');
      this.playNotificationSound?.();
      if (Notification.permission === 'granted') {
        new Notification('RedChat Test', { body: 'Notifications are working!', icon: '/uploads/default-avatar.png' });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') new Notification('RedChat Test', { body: 'Notifications are working!', icon: '/uploads/default-avatar.png' });
        });
      }
      this.addNotification?.({ type: 'test', text: 'Test notification sent!', time: Date.now() });
    });

    // Avatar change
    onClick('changeAvatarBtn', () => document.getElementById('avatarInput')?.click());
    document.getElementById('avatarInput')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.uploadAvatar(file);
    });

    // Bio save
    onClick('saveBioBtn', () => {
      const bio = document.getElementById('bioInput')?.value || '';
      const age = document.getElementById('ageInput')?.value || '';
      const genre = document.getElementById('genreInput')?.value || '';
      this.socket.emit('updateBio', { bio });
      this.socket.emit('updateProfile', { bio, age, genre });
      this.bio = bio;
      this.age = age;
      this.genre = genre;
      this.toast('Profile updated!', 'success');
      this.updateProfilePreviewCard();
    });

    // Bio char count – also live preview
    document.getElementById('bioInput')?.addEventListener('input', (e) => {
      const count = e.target.value.length;
      const counter = document.getElementById('bioCharCount');
      if (counter) counter.textContent = `${count}/190`;
    });

    // Name color
    onClick('saveNameColorBtn', () => {
      const color = document.getElementById('nameColorInput')?.value || '';
      this.socket.emit('changeNameColor', { color });
      this.nameColor = color;
      // Immediately update all existing messages in DOM
      document.querySelectorAll(`.msg-author[data-user="${this.username}"]`).forEach(el => {
        el.style.color = color;
        if (color) el.style.fontWeight = '600';
      });
      if (this.dom.userPanelName) this.dom.userPanelName.style.color = color;
      this.toast('Name color updated!', 'success');
      this.updateProfilePreviewCard();
    });
    document.getElementById('nameColorInput')?.addEventListener('input', (e) => {
      const preview = document.getElementById('nameColorPreview');
      if (preview) preview.style.color = e.target.value;
      const nameEl = document.getElementById('settingsNamePreview');
      if (nameEl) nameEl.style.color = e.target.value;
    });

    // Banner gradient colors – live preview
    const bannerColorUpdate = () => {
      const c1 = document.getElementById('bannerColor1Input')?.value || '#667eea';
      const c2 = document.getElementById('bannerColor2Input')?.value || '#764ba2';
      const gradPreview = document.getElementById('bannerGradientPreview');
      if (gradPreview) gradPreview.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
      const bannerEl = document.getElementById('profileBanner');
      if (bannerEl) bannerEl.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
      this.updateProfilePreviewCard();
    };
    document.getElementById('bannerColor1Input')?.addEventListener('input', bannerColorUpdate);
    document.getElementById('bannerColor2Input')?.addEventListener('input', bannerColorUpdate);
    document.getElementById('bannerColor2Input')?.addEventListener('input', bannerColorUpdate);

    onClick('saveBannerColorsBtn', () => {
      const c1 = document.getElementById('bannerColor1Input')?.value || '#667eea';
      const c2 = document.getElementById('bannerColor2Input')?.value || '#764ba2';
      this.bannerColor = c1;
      this.bannerColor2 = c2;
      this.socket.emit('updateProfile', { bannerColor: c1, bannerColor2: c2 });
      this.toast('Banner updated!', 'success');
      this.updateProfilePreviewCard();
    });

    // Self note save
    onClick('saveSelfNoteBtn', () => {
      const note = document.getElementById('selfNoteInput')?.value || '';
      this.setUserNote(this.username, note);
    });

    // Save status
    onClick('saveStatusBtn', () => {
      const text = document.getElementById('customStatusInput')?.value || '';
      this.socket.emit('setStatus', { status: 'online', customText: text });
      this.toast('Status updated!', 'success');
      setTimeout(() => window.location.reload(), 1000);
    });

    // Accent color dots
    document.querySelectorAll('.accent-dot')?.forEach(dot => {
      dot.addEventListener('click', () => {
        document.querySelectorAll('.accent-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        const color = dot.dataset.color;
        if (color) {
          this.settings.accent = color;
          document.documentElement.style.setProperty('--accent', color);
          this.saveLocalSettings();
        }
      });
    });

    // Mark saved accent dot active on load
    document.querySelectorAll('.accent-dot').forEach(d => {
      if (d.dataset.color === this.settings.accent) {
        document.querySelectorAll('.accent-dot').forEach(dd => dd.classList.remove('active'));
        d.classList.add('active');
      }
    });

    // Chat background options
    document.querySelectorAll('.bg-option')?.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bg-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const bg = btn.dataset.bg;
        this.settings.chatBackground = bg || 'none';
        this.applyChatBackground();
        this.saveLocalSettings();
      });
    });

    // Mark saved background active on load
    document.querySelectorAll('.bg-option').forEach(b => {
      if (b.dataset.bg === (this.settings.chatBackground || 'none')) {
        document.querySelectorAll('.bg-option').forEach(bb => bb.classList.remove('active'));
        b.classList.add('active');
      }
    });

    // Chat density options
    document.querySelectorAll('.density-btn')?.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.density-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const density = btn.dataset.density;
        this.settings.density = density || 'cozy';
        document.body.classList.toggle('compact-mode', density === 'compact');
        this.saveLocalSettings();
      });
    });

    // Mark saved density active on load
    document.querySelectorAll('.density-btn').forEach(b => {
      if (b.dataset.density === (this.settings.density || 'cozy')) {
        document.querySelectorAll('.density-btn').forEach(bb => bb.classList.remove('active'));
        b.classList.add('active');
      }
    });

    // Change password
    onClick('changePasswordBtn', () => {
      const current = document.getElementById('currentPasswordInput')?.value;
      const newPw = document.getElementById('newPasswordInput')?.value;
      if (current && newPw) {
        this.socket.emit('changePassword', { currentPassword: current, newPassword: newPw });
      }
    });

    // Update email
    onClick('updateEmailBtn', () => {
      const email = document.getElementById('accountEmail')?.value;
      if (email) this.socket.emit('updateEmail', { email });
    });

    // Export data
    onClick('exportDataBtn', () => this.exportUserData());

    // Delete account
    onClick('deleteAccountBtn', () => {
      if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        this.socket.emit('deleteAccount');
      }
    });
  }

  /* ─── ADMIN EVENTS ─── */
  bindAdminEvents() {
    // Admin nav
    this.dom.adminModal?.querySelectorAll('.admin-nav-item')?.forEach(item => {
      item.addEventListener('click', () => {
        this.dom.adminModal.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const tab = item.dataset.tab;
        this.dom.adminModal.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
        const target = document.getElementById('admin' + tab.charAt(0).toUpperCase() + tab.slice(1) + 'Panel');
        if (target) target.classList.add('active');
        this.loadAdminPage(tab);
      });
    });

    // Admin user search
    document.getElementById('adminUserSearch')?.addEventListener('input', this.debounce((e) => {
      this.socket.emit('adminSearchUsers', { query: e.target.value });
    }, 300));

    // Send announcement
    document.getElementById('sendAnnouncementBtn')?.addEventListener('click', () => {
      const title = document.getElementById('announcementTitle')?.value;
      const message = document.getElementById('announcementMessage')?.value;
      const type = document.getElementById('announcementType')?.value || 'info';
      const duration = parseInt(document.getElementById('announcementDuration')?.value) || 30;
      if (title && message) {
        this.socket.emit('announce', { title, message, type, duration });
        this.toast('Announcement sent!', 'success');
      }
    });

    // Live announcement preview
    const updateAnnouncementPreview = () => {
      const title = document.getElementById('announcementTitle')?.value || 'Title';
      const message = document.getElementById('announcementMessage')?.value || 'Message';
      const type = document.getElementById('announcementType')?.value || 'info';
      const previewText = document.getElementById('announcementPreviewText');
      const previewBanner = document.getElementById('announcementPreview');
      if (previewText) previewText.innerHTML = `<strong>${this.escapeHTML(title)}</strong> — ${this.escapeHTML(message)}`;
      if (previewBanner) previewBanner.setAttribute('data-type', type);
    };
    document.getElementById('announcementTitle')?.addEventListener('input', updateAnnouncementPreview);
    document.getElementById('announcementMessage')?.addEventListener('input', updateAnnouncementPreview);
    document.getElementById('announcementType')?.addEventListener('change', updateAnnouncementPreview);
  }


  /* ═══════════════════════ AUTH HANDLERS ═══════════════════════ */
  handleLogin(e) {
    e.preventDefault();
    const username = this.dom.loginUsername?.value?.trim();
    const password = this.dom.loginPassword?.value;
    const captchaAnswer = this.dom.captchaAnswer?.value;
    
    if (!username || !password) {
      this.handleAuthError('loginError', 'Please enter username and password');
      return;
    }
    
    this.socket.emit('login', {
      username: username,
      password: password,
      captchaAnswer: captchaAnswer,
      expectedCaptcha: this.captchaAnswer
    });
  }
  
  handleRegister(e) {
    e.preventDefault();
    const username = this.dom.regUsername?.value?.trim();
    const email = this.dom.regEmail?.value?.trim();
    const password = this.dom.regPassword?.value;
    const confirmPassword = this.dom.regPasswordConfirm?.value;
    
    if (!username || !password) {
      this.handleAuthError('registerError', 'Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      this.handleAuthError('registerError', 'Passwords do not match');
      return;
    }
    
    if (password.length < 4) {
      this.handleAuthError('registerError', 'Password must be at least 4 characters');
      return;
    }
    
    this.socket.emit('register', {
      username: username,
      email: email,
      password: password
    });
  }
  
  handleForgot(e) {
    e.preventDefault();
    const username = this.dom.forgotUsername?.value?.trim();
    
    if (!username) {
      this.handleAuthError('forgotError', 'Please enter your username');
      return;
    }
    
    this.pendingResetUser = username;
    this.socket.emit('forgotPassword', { username: username });
  }
  
  handleVerify(e) {
    e.preventDefault();
    if (!this.dom.verifyDigits) return;
    
    let code = '';
    this.dom.verifyDigits.forEach(digit => {
      code += digit.value || '0';
    });
    
    if (code.length !== 6) {
      this.handleAuthError('verifyError', 'Please enter the complete 6-digit code');
      return;
    }
    
    this.socket.emit('verifyEmail', {
      username: this.pendingVerifyUser,
      code: code
    });
  }
  
  handleReset(e) {
    e.preventDefault();
    const code = this.dom.resetCode?.value?.trim();
    const newPassword = this.dom.resetNewPassword?.value;
    
    if (!code || !newPassword) {
      this.handleAuthError('resetError', 'Please enter reset code and new password');
      return;
    }
    
    if (newPassword.length < 4) {
      this.handleAuthError('resetError', 'Password must be at least 4 characters');
      return;
    }
    
    this.socket.emit('resetPassword', {
      username: this.pendingResetUser,
      code: code,
      newPassword: newPassword
    });
  }

  generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    this.captchaAnswer = a + b;
    const display = document.getElementById('captchaQuestion');
    if (display) display.textContent = `${a} + ${b} = ?`;
  }

  handleLoginSuccess(data) {
    this.username = data.username;
    this.currentRoom = data.room || 'General';
    this.userRole = data.role || 'member';
    this.userLevel = data.level || 1;
    this.userXP = data.xp || 0;
    this.xpNeeded = data.xpNeeded || 100;
    this.userAvatar = data.avatar || '';
    if (data.avatar) {
      this.avatars[data.username] = data.avatar;
    }
    this.userBio = data.bio || '';
    this.bio = data.bio || '';
    this.nameColor = data.nameColor || '';
    this.bannerColor = data.bannerColor || '';
    this.bannerColor2 = data.bannerColor2 || '';
    localStorage.setItem('redchat_token', data.username);
    // Update sidebar user panel
    if (this.dom.userPanelName) this.dom.userPanelName.textContent = data.username;
    if (this.dom.userPanelStatus) this.dom.userPanelStatus.textContent = 'Online';
    // Show role badge for admin/moderator
    const roleBadge = document.getElementById('userPanelRoleBadge');
    if (roleBadge) {
      if (data.role === 'admin') { roleBadge.textContent = 'ADMIN'; roleBadge.style.display = ''; roleBadge.className = 'user-panel-role-badge admin'; }
      else if (data.role === 'moderator') { roleBadge.textContent = 'MOD'; roleBadge.style.display = ''; roleBadge.className = 'user-panel-role-badge mod'; }
      else { roleBadge.style.display = 'none'; }
    }
    // Update panel avatar (always — falls back to initials if no avatar stored)
    this.updateAvatarsInDOM(data.username, data.avatar || '');
    // Show admin button if admin
    if (this.dom.adminPanelBtn && data.role === 'admin') this.dom.adminPanelBtn.style.display = '';
    this.showApp();
    this.toast(`Welcome back, ${data.username}!`, 'success');
    this.socket.emit('getRoomList');
    this.socket.emit('getFriendsList');
    this.socket.emit('getFriendRequests');
  }

  handleRegisterSuccess(data) {
    if (data && data.requiresVerification) {
      this.showAuthPanel('verifyPanel');
      this.toast('Account created! Check your email for the verification code.', 'success');
    } else {
      this.showAuthPanel('loginPanel');
      this.toast('Account created! You can now log in.', 'success');
    }
  }

  handleVerifySuccess(data) {
    this.handleLoginSuccess(data);
  }

  handleAuthError(errorId, message) {
    // Handle both old format (single object) and new format (errorId, message)
    if (typeof errorId === 'object') {
      message = errorId.message || 'Authentication failed';
      // Find the active panel's error div
      const activePanel = document.querySelector('.auth-panel.active');
      const err = activePanel?.querySelector('.auth-error');
      if (err) {
        err.textContent = message;
        err.style.display = 'block';
        setTimeout(() => { err.textContent = ''; err.style.display = ''; }, 5000);
      }
    } else {
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        errorEl.textContent = message || 'An error occurred';
        errorEl.style.display = 'block';
        setTimeout(() => { errorEl.textContent = ''; errorEl.style.display = ''; }, 5000);
      }
    }
    this.toast(message || 'Error', 'error');
  }

  updateAuthStats() {
    fetch('/api/stats').then(r => r.json()).then(data => {
      const usersEl = document.getElementById('authStatUsers');
      const roomsEl = document.getElementById('authStatRooms');
      const onlineEl = document.getElementById('authStatOnline');
      if (usersEl) usersEl.textContent = data.totalUsers || 0;
      if (roomsEl) roomsEl.textContent = data.totalRooms || 0;
      if (onlineEl) onlineEl.textContent = data.onlineUsers || 0;
    }).catch(() => {});
  }

  /* ═══════════════════════ SIDEBAR & MOBILE NAV ═══════════════════════ */
  toggleSidebar() {
    const sidebar = this.dom.sidebar;
    const overlay = this.dom.sidebarOverlay;
    if (!sidebar) return;
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) this.closeSidebar();
    else this.openSidebar();
  }

  openSidebar() {
    this.dom.sidebar?.classList.add('open');
    this.dom.sidebarOverlay?.classList.add('active');
    // Only lock scroll on mobile where sidebar is an overlay
    if (window.innerWidth < 768) document.body.style.overflow = 'hidden';
  }

  closeSidebar() {
    this.dom.sidebar?.classList.remove('open');
    this.dom.sidebarOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  switchSidebarTab(tab) {
    // Update active tab
    this.dom.sidebarTabs?.querySelectorAll('.sidebar-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    // Update active panel — HTML IDs are sidebarChannels, sidebarDMs, sidebarFriends, sidebarExplore
    const panelMap = { channels: 'sidebarChannels', dms: 'sidebarDMs', friends: 'sidebarFriends', explore: 'sidebarExplore' };
    document.querySelectorAll('.sidebar-panel').forEach(p => {
      p.classList.toggle('active', p.id === panelMap[tab]);
    });
    this.activeSidebarTab = tab;
    // Update search placeholder based on active tab
    const placeholderMap = { channels: 'Search channels...', dms: 'Search messages...', friends: 'Search friends...', explore: 'Search public rooms...' };
    if (this.dom.sidebarSearchInput) {
      this.dom.sidebarSearchInput.placeholder = placeholderMap[tab] || 'Search...';
      this.dom.sidebarSearchInput.value = '';
    }
    // Load content accordingly
    if (tab === 'explore') this.renderBrowseRooms();
  }

  updateMobileNav(tab) {
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tab);
    });
    if (tab === 'chat') {
      this.closeSidebar();
      this.isDM = false;
    } else if (tab === 'channels') {
      this.switchSidebarTab('channels');
      this.openSidebar();
    } else if (tab === 'dms') {
      this.switchSidebarTab('dms');
      this.openSidebar();
    } else if (tab === 'friends') {
      this.switchSidebarTab('friends');
      this.openSidebar();
    } else if (tab === 'profile') {
      this.openModal('settingsModal');
    }
  }

  filterSidebar(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('.room-item, .dm-item, .friend-item').forEach(item => {
      const name = item.textContent.toLowerCase();
      item.style.display = name.includes(q) ? '' : 'none';
    });
  }

  /* ═══════════════════════ ROOM MANAGEMENT ═══════════════════════ */
  handleRoomList(data) {
    this.rooms = data.rooms || [];
    this.customRooms = data.customRooms || [];
    this.allRoomsData = data.allRooms || [];
    this.renderRooms();
    this.renderBrowseRooms();
  }

  renderRooms() {
    const container = document.getElementById('roomsList');
    if (!container) return;
    const allRooms = [...this.rooms, ...this.customRooms.map(r => typeof r === 'string' ? r : r.name)];
    const uniqueRooms = [...new Set(allRooms)];
    // Sort: favorites first
    const sorted = uniqueRooms.sort((a, b) => {
      const aFav = this.favorites.includes(a);
      const bFav = this.favorites.includes(b);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
    container.innerHTML = sorted.map(room => {
      const active = !this.isDM && this.currentRoom === room ? 'active' : '';
      const fav = this.favorites.includes(room) ? 'favorite' : '';
      const muted = this.mutedRooms.includes(room) ? 'muted' : '';
      const badge = this.unreadCounts[room] ? `<span class="room-badge">${this.unreadCounts[room]}</span>` : '';
      const unreadDot = this.unreadCounts[room] ? ' has-unread' : '';
      // Look up icon/color from allRoomsData
      const roomData = (this.allRoomsData || []).find(r => r.name === room);
      const icon = roomData?.icon || 'fa-hashtag';
      const iconColor = roomData?.color ? ` style="color:${roomData.color}"` : '';
      const verified = roomData?.isPredefined ? '<i class="fas fa-circle-check room-verified" title="Official channel"></i>' : '';
      const joined = this.rooms.includes(room) || this.customRooms.some(r => (typeof r === 'string' ? r : r.name) === room);
      // don't show a second checkmark on official/predefined rooms
      const checkmark = (joined && !roomData?.isPredefined) ? '<i class="fas fa-check room-joined-check" title="Joined"></i>' : '';
      return `<div class="room-item ${active} ${fav} ${muted}${unreadDot}" data-room="${this.escapeHTML(room)}" title="${this.escapeHTML(room)}">
        <i class="fas ${icon} room-icon"${iconColor}></i>
        <span class="room-name">${this.escapeHTML(room)}</span>
        ${checkmark}
        ${verified}
        ${badge}
      </div>`;
    }).join('');
    // Bind click events
    document.querySelectorAll('.room-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.room-context-menu')) return;
        this.joinRoom(item.dataset.room);
      });
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.showRoomContextMenu(e, item.dataset.room);
      });
    });
    // Update favorites list
    this.renderFavorites();
  }

  renderBrowseRooms() {
    const list = document.getElementById('exploreRoomsList');
    const emptyEl = document.getElementById('exploreEmpty');
    if (!list) return;
    // Use allRooms data with memberCount for sorting
    const allData = this.allRoomsData || [];
    // Show public rooms sorted by member count (most popular first)
    const browsable = allData
      .filter(r => r.isPublic !== false && !r.isPredefined)
      .sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
    const joinedNames = new Set([...this.rooms, ...this.customRooms.map(r => typeof r === 'string' ? r : r.name)]);
    if (browsable.length === 0) {
      list.innerHTML = '';
      if (emptyEl) emptyEl.style.display = '';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    list.innerHTML = browsable.map(room => {
      const joined = joinedNames.has(room.name) || room.joined;
      return `
      <div class="explore-room-card ${joined ? 'joined' : ''}" data-room="${this.escapeHTML(room.name)}" data-room-id="${this.escapeHTML(room.id || '')}">
        <div class="explore-room-icon" style="background:transparent;color:${room.color || 'var(--accent)'}"><i class="fas ${room.icon || 'fa-hashtag'}"></i></div>
        <div class="explore-room-info">
          <div class="explore-room-name">${this.escapeHTML(room.name)}</div>
          <div class="explore-room-meta">${room.memberCount || 0} members &bull; ${room.messageCount || 0} messages</div>
          ${room.description ? `<div class="explore-room-desc">${this.escapeHTML(room.description)}</div>` : ''}
        </div>
        <button class="explore-join-btn">${joined ? 'Joined' : 'Join'}</button>
      </div>`;
    }).join('');
    list.querySelectorAll('.explore-room-card').forEach(card => {
      const roomName = card.dataset.room;
      card.querySelector('.explore-join-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = card.querySelector('.explore-join-btn');
        if (card.classList.contains('joined')) {
          // Already joined — switch to it
          this.joinRoom(roomName);
          this.closeSidebar();
        } else {
          this.joinRoom(roomName);
          card.classList.add('joined');
          btn.textContent = 'Joined';
          this.toast(`Joined ${roomName}`, 'success');
        }
      });
      card.addEventListener('click', () => {
        // Show room info popup instead of joining
        this.showExploreRoomInfo(roomName);
      });
    });
  }

  showExploreRoomInfo(roomName) {
    const room = (this.allRoomsData || []).find(r => r.name === roomName);
    if (!room) return;
    const joinedNames = new Set([...this.rooms, ...this.customRooms.map(r => typeof r === 'string' ? r : r.name)]);
    const isJoined = joinedNames.has(room.name) || room.joined;
    const content = document.getElementById('profileModalBody') || document.querySelector('#profileModal .modal-body');
    if (!content) return;
    content.innerHTML = `
      <div class="profile-banner" style="background: linear-gradient(135deg, ${room.color || 'var(--accent)'}, ${this.adjustColor?.(room.color || '#667eea', -40) || 'var(--accent-hover)'})">
        <div class="explore-info-icon"><i class="fas ${room.icon || 'fa-hashtag'}"></i></div>
      </div>
      <div class="profile-body">
        <div class="profile-name-section">
          <h2>${this.escapeHTML(room.name)}</h2>
          ${room.creator ? `<span class="profile-username">Created by @${this.escapeHTML(room.creator)}</span>` : ''}
        </div>
        ${room.description ? `<div class="profile-section"><h4>Description</h4><p>${this.escapeHTML(room.description)}</p></div>` : ''}
        <div class="profile-section">
          <h4>Room Info</h4>
          <div class="profile-info-grid">
            <div class="profile-info-item"><i class="fas fa-users"></i><span>${room.memberCount || 0} members</span></div>
            <div class="profile-info-item"><i class="fas fa-comment"></i><span>${room.messageCount || 0} messages</span></div>
            <div class="profile-info-item"><i class="fas fa-${room.isPublic !== false ? 'globe' : 'lock'}"></i><span>${room.isPublic !== false ? 'Public' : 'Private'}</span></div>
          </div>
        </div>
        <div class="profile-actions">
          ${isJoined ? `
            <button class="profile-action-btn primary" onclick="app.joinRoom('${this.escapeHTML(room.name)}');app.closeModal('profileModal');app.closeSidebar()"><i class="fas fa-sign-in-alt"></i> Go to Room</button>
          ` : `
            <button class="profile-action-btn primary" onclick="app.joinRoom('${this.escapeHTML(room.name)}');app.closeModal('profileModal');app.renderBrowseRooms()"><i class="fas fa-plus"></i> Join Room</button>
          `}
        </div>
      </div>
    `;
    this.openModal('profileModal');
  }

  joinRoom(room) {
    if (!room || (room === this.currentRoom && !this.isDM)) return;
    this.saveDraft();
    this.isDM = false;
    this.currentDM = null;
    this.currentRoom = room;
    this.unreadCounts[room] = 0;
    if (this.state) {
      this.state.replyingTo = null;
      this.state.editingMessage = null;
    }
    this.replyingTo = null;
    this.editingMessageId = null;
    this.dom.replyBar?.classList.remove('active');
    this.dom.editBar?.classList.remove('active');
    // Clear messages container immediately to avoid stale/duplicate messages
    if (this.dom.messagesContainer) this.dom.messagesContainer.innerHTML = '';
    this.socket.emit('joinRoom', { room });
    this.renderRooms();
    this.updateHeaderRoomInfo(room);
    if (this.dom.messageInput) this.dom.messageInput.placeholder = `Message #${room}`;
    this.dom.messageInput?.focus();
    if (window.innerWidth < 768) this.closeSidebar();
    this.loadDraftForRoom(room);
    this.markAsRead?.(room);
    // Update active state
    document.querySelectorAll('.room-item').forEach(item => {
      item.classList.toggle('active', item.dataset.room === room);
    });
  }

  handleRoomJoined(data) {
    this.currentRoom = data.room;
    if (this.dom.channelName) this.dom.channelName.textContent = data.room;
    if (data.topic) this.dom.topicBar && (this.dom.topicBar.textContent = data.topic);
    else if (this.dom.topicBar) this.dom.topicBar.textContent = 'Click to add a topic';
    if (this.dom.welcomeState) this.dom.welcomeState.style.display = 'none';
    if (this.dom.messagesContainer) this.dom.messagesContainer.style.display = '';
    // Discard stale buffered system messages from before this room join
    this._pendingSystemMsgs = [];
    // History is already sent by the server as part of joinRoom — no need to request again
    this.socket.emit('getUserList', { room: data.room });
    this.renderRooms();
  }

  handleRoomCreated(data) {
    this.toast(`Room "${data.room}" created!`, 'success');
    this.closeModal('createRoomModal');
    this.socket.emit('getRoomList');
    this.joinRoom(data.room);
  }

  handleRoomDeleted(data) {
    const roomName = data.room || data.roomId;
    this.toast(`Room "${roomName}" was deleted`, 'info');
    if (this.currentRoom === roomName || this.currentRoom === data.roomId) this.joinRoom('General');
    // Remove from local lists
    this.rooms = this.rooms.filter(r => r !== roomName && r !== data.roomId);
    this.customRooms = this.customRooms.filter(r => {
      const name = typeof r === 'string' ? r : r.name;
      return name !== roomName && name !== data.roomId;
    });
    this.favorites = this.favorites.filter(f => f !== roomName && f !== data.roomId);
    this.saveFavorites();
    this.renderRooms();
    this.socket.emit('getRoomList');
  }

  updateHeaderRoomInfo(room) {
    const roomData = (this.allRoomsData || []).find(r => r.id === room || r.name === room);
    if (this.dom.headerRoomName) this.dom.headerRoomName.textContent = roomData?.name || room;
    if (this.dom.headerRoomIcon) {
      const icon = roomData?.icon || 'fa-comments';
      this.dom.headerRoomIcon.innerHTML = `<i class="fas ${icon}" style="color:${roomData?.color || '#667eea'}"></i>`;
    }
  }

  showRoomContextMenu(e, room) {
    const ctx = document.getElementById('roomContextMenu');
    if (!ctx) return;
    ctx.dataset.room = room;
    const isFav = this.favorites.includes(room);
    const isMuted = this.mutedRooms.includes(room);
    const favItem = ctx.querySelector('[data-action="favorite"]');
    const muteItem = ctx.querySelector('[data-action="mute"]');
    if (favItem) {
      favItem.innerHTML = `<i class="fas fa-${isFav ? 'star' : 'star'}"></i> ${isFav ? 'Unfavorite' : 'Favorite'}`;
    }
    if (muteItem) {
      muteItem.innerHTML = `<i class="fas fa-${isMuted ? 'bell' : 'bell-slash'}"></i> ${isMuted ? 'Unmute' : 'Mute'}`;
    }
    ctx.style.top = `${e.clientY}px`;
    ctx.style.left = `${e.clientX}px`;
    ctx.classList.add('active');
    const close = (ev) => { if (!ctx.contains(ev.target)) { ctx.classList.remove('active'); document.removeEventListener('click', close); } };
    setTimeout(() => document.addEventListener('click', close), 10);
  }

  toggleFavorite(room) {
    if (typeof room !== 'string' || !room) return;
    const idx = this.favorites.indexOf(room);
    if (idx > -1) this.favorites.splice(idx, 1);
    else this.favorites.push(room);
    if (this.state) this.state.favorites = this.favorites;
    this.saveFavorites();
    this.renderRooms();
    this.toast(idx > -1 ? 'Removed from favorites' : 'Added to favorites', 'info');
  }

  toggleMuteRoom(room) {
    const idx = this.mutedRooms.indexOf(room);
    if (idx > -1) this.mutedRooms.splice(idx, 1);
    else this.mutedRooms.push(room);
    if (this.state) this.state.mutedRooms = this.mutedRooms;
    this.saveMuted();
    this.renderRooms();
    this.toast(idx > -1 ? 'Room unmuted' : 'Room muted', 'info');
  }

  /* ═══════════════════════ MESSAGE HANDLING ═══════════════════════ */
  sendMessage(textArg) {
    this.hideChatAutocomplete();
    const input = this.dom.messageInput;
    if (!input) return;
    const rawText = textArg || input.value.trim();

    // If there's a pending upload, send it with the caption
    if (this.pendingUploadFile) {
      const caption = rawText;
      input.value = '';
      this.updateCharCounter?.();
      this.autoResize?.(input);
      this.sendPendingUpload(caption);
      return;
    }

    if (!rawText && !this.pendingFile) return;

    // Resolve edit state early so we can bypass slow-mode for edits
    const editId = this.editingMessageId || this.state?.editingMessage;

    // Check slow mode (bypass for edits — edits are not new messages)
    if (!editId && this.slowModeActive && this.lastMessageTime) {
      const elapsed = Date.now() - this.lastMessageTime;
      if (elapsed < this.slowModeInterval) {
        this.toast(`Slow mode: wait ${Math.ceil((this.slowModeInterval - elapsed) / 1000)}s`, 'warning');
        return;
      }
    }

    // Handle commands
    if (!editId && rawText.startsWith('/')) {
      this.handleCommand?.(rawText) || this.handleSlashCommand?.(rawText);
      input.value = '';
      this.updateCharCounter?.();
      return;
    }

    // Process emoji shortcodes and content warnings if available
    let text = rawText;
    if (this.processEmojiShortcodes) text = this.processEmojiShortcodes(text);
    if (this.wrapWithContentWarning) text = this.wrapWithContentWarning(text);

    const payload = {
      text,
      message: text,
      room: this.isDM ? null : this.currentRoom,
      to: this.isDM ? this.currentDM : null,
      targetUsername: this.isDM ? this.currentDM : null,
      replyTo: this.replyingTo || (this.state?.replyingTo) || null,
      contentWarning: this.pendingCW || null
    };

    if (editId) {
      // Edit cooldown: 10 seconds between edit submissions
      const EDIT_COOLDOWN = 10000;
      if (this.lastEditTime && (Date.now() - this.lastEditTime) < EDIT_COOLDOWN) {
        const remaining = Math.ceil((EDIT_COOLDOWN - (Date.now() - this.lastEditTime)) / 1000);
        this.toast(`Edit cooldown: wait ${remaining}s`, 'warning');
        return;
      }
      this.socket.emit('editMessage', { id: editId, messageId: editId, text, room: this.currentRoom });
      this.lastEditTime = Date.now();
      this.editingMessageId = null;
      if (this.state) this.state.editingMessage = null;
      this.dom.editBar?.classList.remove('active');
    } else if (this.isDM) {
      this.socket.emit('directMessage', payload);
    } else {
      this.socket.emit('chatMessage', payload);
    }

    input.value = '';
    this.replyingTo = null;
    if (this.state) this.state.replyingTo = null;
    this.pendingCW = null;
    document.querySelector('.reply-bar')?.classList.remove('active');
    this.updateCharCounter?.();
    if (!editId) this.lastMessageTime = Date.now();
    this.autoResize?.(input);
    this.addToInputHistory?.(rawText);
    document.getElementById('smartReplies')?.classList.remove('active');
    input.focus();
  }

  handleCommand(text) {
    const parts = text.slice(1).split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const commands = {
      'help': () => this.toast('Commands: /shrug /tableflip /unflip /lenny /disapproval /sparkles /spoiler /roll /time /help', 'info'),
      'shrug':      () => this.socket.emit('chatMessage', { text: (args ? args + ' ' : '') + '¯\\_(ツ)_/¯', room: this.currentRoom }),
      'tableflip':  () => this.socket.emit('chatMessage', { text: '(╯°□°）╯︵ ┻━┻', room: this.currentRoom }),
      'unflip':     () => this.socket.emit('chatMessage', { text: '┬─┬ ノ( ゜-゜ノ)', room: this.currentRoom }),
      'lenny':      () => this.socket.emit('chatMessage', { text: '( ͡° ͜ʖ ͡°) ' + args, room: this.currentRoom }),
      'disapproval':() => this.socket.emit('chatMessage', { text: 'ಠ_ಠ ' + args, room: this.currentRoom }),
      'sparkles':   () => this.socket.emit('chatMessage', { text: `✨ ${args} ✨`, room: this.currentRoom }),
      'spoiler':    () => this.socket.emit('chatMessage', { text: `||${args}||`, room: this.currentRoom }),
      'roll': () => {
        const max = parseInt(args) || 100;
        const result = Math.floor(Math.random() * max) + 1;
        this.socket.emit('chatMessage', { text: `🎲 rolled **${result}** (1-${max})`, room: this.currentRoom });
      },
      'time':  () => this.toast(new Date().toLocaleTimeString(), 'info'),
    };

    if (commands[cmd]) { commands[cmd](); return true; }
    else return false; // let handleSlashCommand try
  }

  handleMessage(data) {
    if (this.isDM) return;
    const msgRoom = data.room || data.roomId;
    if (msgRoom !== this.currentRoom && data.roomId !== this.currentRoom) {
      // Unread count
      this.unreadCounts[msgRoom] = (this.unreadCounts[msgRoom] || 0) + 1;
      this.renderRooms();
      if (!this.mutedRooms.includes(msgRoom)) {
        this.playSound('notification');
        this.showDesktopNotification(data.username, data.text, msgRoom);
      }
      return;
    }
    this.appendMessage(data);
    if (!this.isScrolledToBottom()) {
      this.dom.newMsgIndicator?.classList.add('visible');
    } else {
      this.scrollToBottom();
    }
    if (data.username !== this.username) {
      this.playSound('message');
    }
    // Add to notification center
    if (data.text?.includes(`@${this.username}`)) {
      this.addNotification({ type: 'mention', user: data.username, text: data.text, room: data.room, time: Date.now() });
    }
  }

  handleDMMessage(data) {
    const partner = data.from === this.username ? data.to : data.from;
    if (!this.dmHistory[partner]) this.dmHistory[partner] = [];
    this.dmHistory[partner].push(data);
    if (this.isDM && this.currentDM === partner) {
      this.appendMessage({ ...data, username: data.from });
      this.scrollToBottom();
    } else {
      this.unreadDMs[partner] = (this.unreadDMs[partner] || 0) + 1;
      this.renderDMs();
      this.playSound('notification');
      this.showDesktopNotification(data.from, data.text, 'DM');
      this.addNotification({ type: 'dm', user: data.from, text: data.text, time: Date.now() });
    }
  }

  handleMessageHistory(data) {
    if (!this.dom.messagesContainer) return;
    // Only apply history for the current room to prevent cross-room bugs
    const historyRoom = data.room || this.currentRoom;
    this.messageHistory[historyRoom] = data.messages || [];
    if (historyRoom !== this.currentRoom) return;
    this.dom.messagesContainer.innerHTML = '';
    (data.messages || []).forEach(msg => this.appendMessage(msg));
    // Flush system messages that arrived while in DM view
    if (this._pendingSystemMsgs?.length) {
      this._pendingSystemMsgs.forEach(d => {
        this.appendMessage({ type: 'system', text: d.message, timestamp: d.timestamp });
      });
      this._pendingSystemMsgs = [];
    }
    this.scrollToBottom(false);
    // Request pinned messages for current room
    this.socket.emit('getPinnedMessages', { room: this.currentRoom });
  }

  handleDMHistory(data) {
    if (!this.dom.messagesContainer) return;
    this.dom.messagesContainer.innerHTML = '';
    this.dmHistory[this.currentDM] = data.messages || [];
    (data.messages || []).forEach(msg => this.appendMessage({ ...msg, username: msg.from || msg.username }));
    this.scrollToBottom(false);
  }

  handleDMSync(data) {
    if (!data || !data.conversations) return;
    // Merge all server conversations into local dmHistory
    Object.keys(data.conversations).forEach(partner => {
      this.dmHistory[partner] = data.conversations[partner];
    });
    this.renderDMs();
    // If currently viewing a DM conversation, refresh its messages
    if (this.isDM && this.currentDM && data.conversations[this.currentDM] && this.dom.messagesContainer) {
      this.dom.messagesContainer.innerHTML = '';
      (data.conversations[this.currentDM] || []).forEach(msg =>
        this.appendMessage({ ...msg, username: msg.from || msg.username })
      );
      this.scrollToBottom(false);
    }
  }

  handleMessageEdited(data) {
    const msgEl = document.querySelector(`.message[data-id="${data.id}"]`);
    if (msgEl) {
      const textEl = msgEl.querySelector('.msg-text');
      if (textEl) textEl.innerHTML = this.formatText(data.text);
      if (!msgEl.querySelector('.edited-marker')) {
        const header = msgEl.querySelector('.msg-header');
        if (header) {
          const marker = document.createElement('span');
          marker.className = 'edited-marker';
          marker.textContent = '(edited)';
          marker.title = new Date().toLocaleString();
          header.appendChild(marker);
        }
      }
    }
  }

  handleMessageDeleted(data) {
    const msgEl = document.querySelector(`.message[data-id="${data.id}"]`);
    if (msgEl) {
      msgEl.style.opacity = '0';
      msgEl.style.transform = 'translateX(-20px)';
      setTimeout(() => msgEl.remove(), 300);
    }
  }

  appendMessage(data) {
    const container = this.dom.messagesContainer;
    if (!container) return;
    
    const msg = document.createElement('div');
    msg.className = 'message';
    msg.dataset.id = data.id || '';
    msg.dataset.user = data.username || '';
    msg.dataset.rawText = data.text || data.message || '';

    // Check if same author as last message (compact mode)
    const lastMsg = container.lastElementChild;
    const isCompact = lastMsg?.classList.contains('message') && 
                      lastMsg.dataset.user === data.username &&
                      !data.replyTo;

    if (data.type === 'system') {
      msg.className = 'system-message';
      msg.innerHTML = `<i class="fas fa-info-circle"></i> <span>${this.escapeHTML(data.text)}</span>`;
      container.appendChild(msg);
      return;
    }

    if (data.type === 'wheel' && data.options) {
      const avatarUrl = data.avatar || this.getAvatarUrl(data.creator || '');
      const time = data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const canvasSize = 120;
      msg.innerHTML = `
        <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="" loading="lazy" data-user="${this.escapeHTML(data.creator || '')}" data-avatar-user="${this.escapeHTML(data.creator || '')}">
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author" data-user="${this.escapeHTML(data.creator || '')}">${this.escapeHTML(data.creator || '')}</span>
            <span class="msg-timestamp">${time}</span>
          </div>
          <div class="msg-wheel" data-result="${this.escapeHTML(data.result || '')}">
            <canvas class="wheel-msg-canvas" width="${canvasSize}" height="${canvasSize}"></canvas>
            <div class="wheel-msg-result" style="display:none;"></div>
          </div>
        </div>`;
      container.appendChild(msg);
      // draw and animate wheel after insertion
      const canvas = msg.querySelector('.wheel-msg-canvas');
      const resultDiv = msg.querySelector('.wheel-msg-result');
      this.drawWheel(canvas, data.options);
      setTimeout(() => {
        if (canvas) {
          canvas.style.transition = `transform ${data.spinDuration}ms ease-out`;
          canvas.style.transform = `rotate(${data.finalAngle}deg)`;
        }
        setTimeout(() => {
          if (resultDiv) resultDiv.textContent = `Winner: ${data.result}`;
          if (resultDiv) resultDiv.style.display = 'block';
        }, data.spinDuration || 0);
      }, 50);
      return;
    }

    // Use avatar from avatars map if available, else fallback
    let avatarUrl = '';
    if (this.avatars && this.avatars[data.username]) {
      avatarUrl = this.avatars[data.username];
    } else if (data.avatar) {
      avatarUrl = data.avatar;
    } else {
      avatarUrl = this.getAvatarUrl(data.username || '');
    }
    const roleClass = data.role === 'admin' ? 'admin' : data.role === 'moderator' ? 'moderator' : '';
    const roleBadge = data.role === 'admin' ? '<span class="msg-badge admin">ADMIN</span>' : 
                      data.role === 'moderator' ? '<span class="msg-badge moderator">MOD</span>' : '';
    const time = data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const editedMark = data.edited ? ' <span class="edited-marker">(edited)</span>' : '';
    const nameColor = data.nameColor || '';
    const nameStyle = nameColor ? `style="color: ${nameColor}; font-weight: 600;"` : '';

    let replyHTML = '';
    if (data.replyTo) {
      replyHTML = `<div class="msg-reply" data-reply-id="${data.replyTo.id || ''}">
        <span class="reply-author">@${this.escapeHTML(data.replyTo.username || '')}</span>
        <span class="reply-text">${this.escapeHTML(data.replyTo.text || '').substring(0, 60)}</span>
      </div>`;
    }

    let contentHTML = '';
    if (data.file) {
      contentHTML = this.renderFileAttachment(data.file);
    }
    if (data.text) {
      contentHTML += `<div class="msg-text">${this.formatText(data.text)}</div>`;
    }

    // Reactions
    let reactionsHTML = '';
    if (data.reactions && Object.keys(data.reactions).length > 0) {
      reactionsHTML = '<div class="msg-reactions">';
      for (const [emoji, users] of Object.entries(data.reactions)) {
        const active = users.includes(this.username) ? 'active' : '';
        reactionsHTML += `<span class="reaction ${active}" data-emoji="${emoji}" data-msg-id="${data.id}">
          ${emoji} <span class="reaction-count">${users.length}</span>
        </span>`;
      }
      reactionsHTML += '</div>';
    }

    if (isCompact) {
      msg.classList.add('compact');
      msg.innerHTML = `<div class="msg-content">
        ${contentHTML}${reactionsHTML}
      </div>
      <div class="msg-actions">
        <button class="msg-action-btn" data-action="react" title="React"><i class="fas fa-smile"></i></button>
        <button class="msg-action-btn" data-action="reply" title="Reply"><i class="fas fa-reply"></i></button>
        <button class="msg-action-btn" data-action="pin" title="Pin"><i class="fas fa-thumbtack"></i></button>
        <button class="msg-action-btn" data-action="bookmark" title="Bookmark"><i class="fas fa-bookmark"></i></button>
        ${data.username === this.username || this.userRole === 'admin' ? 
          '<button class="msg-action-btn" data-action="edit" title="Edit"><i class="fas fa-pencil"></i></button><button class="msg-action-btn danger" data-action="delete" title="Delete"><i class="fas fa-trash"></i></button>' : ''}
        <button class="msg-action-btn" data-action="more" title="More"><i class="fas fa-ellipsis-h"></i></button>
      </div>`;
    } else {
      msg.innerHTML = `
        <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="" loading="lazy" data-user="${this.escapeHTML(data.username || '')}" data-avatar-user="${this.escapeHTML(data.username || '')}">
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author ${roleClass}" ${nameStyle} data-user="${this.escapeHTML(data.username || '')}">${this.escapeHTML(data.username || '')}</span>
            ${roleBadge}
            <span class="msg-timestamp" title="${data.timestamp ? new Date(data.timestamp).toLocaleString() : ''}">${time}</span>
            ${editedMark}
          </div>
          ${replyHTML}
          ${contentHTML}
          ${reactionsHTML}
        </div>
        <div class="msg-actions">
          <button class="msg-action-btn" data-action="react" title="React"><i class="fas fa-smile"></i></button>
          <button class="msg-action-btn" data-action="reply" title="Reply"><i class="fas fa-reply"></i></button>
          <button class="msg-action-btn" data-action="pin" title="Pin"><i class="fas fa-thumbtack"></i></button>
          <button class="msg-action-btn" data-action="bookmark" title="Bookmark"><i class="fas fa-bookmark"></i></button>
          ${data.username === this.username || this.userRole === 'admin' ? 
            '<button class="msg-action-btn" data-action="edit" title="Edit"><i class="fas fa-pencil"></i></button><button class="msg-action-btn danger" data-action="delete" title="Delete"><i class="fas fa-trash"></i></button>' : ''}
          <button class="msg-action-btn" data-action="more" title="More"><i class="fas fa-ellipsis-h"></i></button>
        </div>`;
    }

    container.appendChild(msg);
    this.bindMessageActions(msg, data);
  }

  renderFileAttachment(file) {
    if (!file) return '';
    const url = file.url || file.path || '';
    const name = file.name || file.originalName || 'file';
    const size = file.size ? this.formatFileSize(file.size) : '';
    const ext = name.split('.').pop().toLowerCase();
    const imgExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
    const vidExts = ['mp4', 'webm', 'mov', 'avi'];
    const audExts = ['mp3', 'wav', 'ogg', 'flac', 'aac'];

    if (imgExts.includes(ext)) {
      return `<img class="msg-image" src="${this.escapeHTML(url)}" alt="${this.escapeHTML(name)}" loading="lazy" onclick="app.openImageViewer('${this.escapeHTML(url)}')">`;
    }
    if (vidExts.includes(ext)) {
      return `<video class="msg-video" src="${this.escapeHTML(url)}" controls preload="metadata"></video>`;
    }
    if (audExts.includes(ext)) {
      return `<audio class="msg-audio" src="${this.escapeHTML(url)}" controls preload="metadata"></audio>`;
    }
    return `<div class="msg-file">
      <div class="msg-file-icon"><i class="fas fa-file"></i></div>
      <div class="msg-file-info">
        <a class="msg-file-name" href="${this.escapeHTML(url)}" target="_blank">${this.escapeHTML(name)}</a>
        <span class="msg-file-size">${size}</span>
      </div>
      <a class="msg-file-download" href="${this.escapeHTML(url)}" download title="Download"><i class="fas fa-download"></i></a>
    </div>`;
  }

  bindMessageActions(msg, data) {
    // Reaction click
    msg.querySelectorAll('.reaction').forEach(r => {
      r.addEventListener('click', () => {
        this.socket.emit('addReaction', { messageId: r.dataset.msgId, emoji: r.dataset.emoji, room: this.currentRoom });
      });
    });
    // Action buttons
    msg.querySelectorAll('.msg-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const msgId = msg.dataset.id;
        switch (action) {
          case 'react':
            this.showReactionPicker(msg, msgId);
            break;
          case 'reply':
            this.startReply(data);
            break;
          case 'pin':
            this.socket.emit('pinMessage', { messageId: msgId, room: this.currentRoom });
            this.toast('Message pinned!', 'success');
            break;
          case 'bookmark':
            this.socket.emit('bookmark', { messageId: msgId, message: data.message || data.text || '', username: data.username, room: this.currentRoom, timestamp: Date.now() });
            this.toast('Bookmarked!', 'success');
            break;
          case 'edit':
            this.startEdit(data);
            break;
          case 'delete':
            if (confirm('Delete this message?')) {
              this.socket.emit('deleteMessage', { id: msgId });
            }
            break;
          case 'more':
            this.showMessageContextMenu(e, data);
            break;
        }
      });
    });
    // Avatar/author click → profile
    msg.querySelectorAll('.msg-avatar, .msg-author').forEach(el => {
      el.addEventListener('click', () => this.showProfile(el.dataset.user));
    });
    // Mention click → profile
    msg.querySelectorAll('.mention').forEach(el => {
      el.addEventListener('click', () => this.showProfile(el.dataset.user));
    });
    // Image click → viewer
    msg.querySelectorAll('.msg-image').forEach(img => {
      img.addEventListener('click', () => this.openImageViewer(img.src));
    });
    // Spoiler click
    msg.querySelectorAll('.spoiler').forEach(s => {
      s.addEventListener('click', () => s.classList.toggle('revealed'));
    });
  }

  startReply(data) {
    this.replyingTo = { id: data.id, username: data.username || data.author, text: data.text };
    if (this.state) this.state.replyingTo = this.replyingTo;
    const replyBar = this.dom.replyBar || document.querySelector('.reply-bar');
    if (replyBar) {
      replyBar.classList.add('active');
      const usernameEl = document.getElementById('replyToUsername');
      const textEl = document.getElementById('replyToText');
      if (usernameEl) usernameEl.textContent = data.username || data.author || '';
      if (textEl) textEl.textContent = (data.text || '').substring(0, 60);
    }
    this.dom.messageInput?.focus();
  }

  startEdit(data) {
    if (data.username !== this.username && this.userRole !== 'admin') return;
    if (!data.id) { this.toast('Cannot edit this message', 'warning'); return; }
    this.editingMessageId = data.id;
    if (this.state) this.state.editingMessage = data.id;
    if (this.dom.messageInput) {
      this.dom.messageInput.value = data.text || '';
      this.dom.messageInput.focus();
      this.autoResize?.(this.dom.messageInput);
    }
    this.dom.editBar?.classList.add('active');
  }

  // showReactionPicker defined in V5 section below

  handleReactionUpdate(data) {
    const msgEl = document.querySelector(`.message[data-id="${data.messageId}"]`);
    if (!msgEl) return;
    let reactionsContainer = msgEl.querySelector('.msg-reactions');
    if (!reactionsContainer) {
      reactionsContainer = document.createElement('div');
      reactionsContainer.className = 'msg-reactions';
      msgEl.querySelector('.msg-content')?.appendChild(reactionsContainer);
    }
    reactionsContainer.innerHTML = '';
    for (const [emoji, users] of Object.entries(data.reactions || {})) {
      if (users.length === 0) continue;
      const active = users.includes(this.username) ? 'active' : '';
      const span = document.createElement('span');
      span.className = `reaction ${active}`;
      span.dataset.emoji = emoji;
      span.dataset.msgId = data.messageId;
      span.innerHTML = `${emoji} <span class="reaction-count">${users.length}</span>`;
      span.addEventListener('click', () => {
        this.socket.emit('addReaction', { messageId: data.messageId, emoji });
      });
      reactionsContainer.appendChild(span);
    }
  }

  // showMessageContextMenu defined in V5 section below


  /* ═══════════════════════ DM MANAGEMENT ═══════════════════════ */
  startDM(user) {
    if (user === this.username) return;
    this.isDM = true;
    this.currentDM = user;
    this.unreadDMs[user] = 0;
    if (this.dom.headerRoomName) this.dom.headerRoomName.textContent = user;
    if (this.dom.headerRoomIcon) this.dom.headerRoomIcon.innerHTML = `<i class="fas fa-user"></i>`;
    if (this.dom.headerRoomDesc) this.dom.headerRoomDesc.style.display = 'none';
    if (this.dom.welcomeState) this.dom.welcomeState.style.display = 'none';
    if (this.dom.messagesContainer) this.dom.messagesContainer.style.display = '';
    this.socket.emit('getDMHistory', { with: user });
    this.renderDMs();
    if (window.innerWidth < 768) this.closeSidebar();
    this.dom.messageInput?.focus();
  }

  renderDMs() {
    const list = document.getElementById('dmSection');
    if (!list) return;
    const partners = Object.keys({ ...this.dmHistory, ...this.unreadDMs });
    const unique = [...new Set(partners)].filter(u => u !== this.username);
    
    const dmEmpty = document.getElementById('dmEmpty');
    if (unique.length === 0) {
      list.innerHTML = '';
      if (dmEmpty) dmEmpty.style.display = '';
      return;
    }
    if (dmEmpty) dmEmpty.style.display = 'none';

    list.innerHTML = unique.map(user => {
      const active = this.isDM && this.currentDM === user ? 'active' : '';
      const badge = this.unreadDMs[user] ? `<span class="dm-badge">${this.unreadDMs[user]}</span>` : '';
      const lastMsgs = this.dmHistory[user] || [];
      const lastMsg = lastMsgs.length > 0 ? lastMsgs[lastMsgs.length - 1].text || '' : '';
      const online = this.onlineUsers.includes(user) ? 'online' : '';
      return `<div class="dm-item ${active}" data-user="${this.escapeHTML(user)}">
        <div class="dm-avatar-wrapper">
          <img class="avatar" src="${this.getAvatarUrl(user)}" alt="" data-avatar-user="${this.escapeHTML(user)}">
          <span class="dm-status-dot ${online}"></span>
        </div>
        <div class="dm-info">
          <span class="dm-name">${this.escapeHTML(user)}</span>
          <span class="dm-last-msg">${this.escapeHTML(lastMsg).substring(0, 40)}</span>
        </div>
        ${badge}
      </div>`;
    }).join('');

    list.querySelectorAll('.dm-item').forEach(item => {
      item.addEventListener('click', () => this.startDM(item.dataset.user));
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const user = item.dataset.user;
        this.showContextMenu(e, [
          {
            label: 'Delete Conversation',
            icon: 'fas fa-trash',
            action: () => {
              if (!confirm(`Delete your conversation with ${user}?`)) return;
              delete this.dmHistory[user];
              this.dmConversations = (this.dmConversations || []).filter(u => u !== user);
              if (this.currentDM === user) {
                this.isDM = false;
                this.currentDM = null;
              }
              this.renderDMs();
              this.toast('Conversation deleted', 'success');
            }
          },
          {
            label: 'Report User',
            icon: 'fas fa-flag',
            action: () => {
              this.contextMenuTarget = user;
              this.openModal('reportModal');
            }
          }
        ]);
      });
    });
  }

  /* ═══════════════════════ FRIENDS MANAGEMENT ═══════════════════════ */
  handleFriendsList(data) {
    this.friends = data.friends || [];
    this.renderFriends();
  }

  handleFriendRequests(data) {
    this.friendRequests = data || { sent: [], received: [] };
    this.renderFriends();
    // Update tab badge
    const badge = document.querySelector('.sidebar-tab[data-tab="friends"] .tab-badge');
    if (badge) {
      const count = (this.friendRequests.received || []).length;
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  renderFriends() {
    const list = document.getElementById('friendsList');
    const requestsList = document.getElementById('friendRequestsList');
    if (!list) return;

    // Online friends first
    const sortedFriends = [...this.friends].sort((a, b) => {
      const aOnline = this.onlineUsers.includes(a) ? 1 : 0;
      const bOnline = this.onlineUsers.includes(b) ? 1 : 0;
      return bOnline - aOnline;
    });

    if (sortedFriends.length === 0) {
      list.innerHTML = `<div class="sidebar-empty-state">
        <i class="fas fa-user-friends"></i>
        <h4>No friends yet</h4>
        <p>Add friends to see them here!</p>
      </div>`;
    } else {
      list.innerHTML = sortedFriends.map(friend => {
        const online = this.onlineUsers.includes(friend) ? 'online' : '';
        return `<div class="friend-item" data-user="${this.escapeHTML(friend)}">
          <div class="friend-avatar-wrapper">
            <img class="avatar" src="${this.getAvatarUrl(friend)}" alt="" data-avatar-user="${this.escapeHTML(friend)}">
            <span class="friend-status-dot ${online}"></span>
          </div>
          <div class="friend-info">
            <span class="friend-name">${this.escapeHTML(friend)}</span>
            <span class="friend-status-text">${online ? 'Online' : 'Offline'}</span>
          </div>
          <div class="friend-actions">
            <button class="friend-action-btn dm-btn" title="Message"><i class="fas fa-comment"></i></button>
            <button class="friend-action-btn profile-btn" title="Profile"><i class="fas fa-user"></i></button>
          </div>
        </div>`;
      }).join('');

      list.querySelectorAll('.friend-item').forEach(item => {
        item.querySelector('.dm-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.startDM(item.dataset.user);
        });
        item.querySelector('.profile-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showProfile(item.dataset.user);
        });
      });
    }

    // Friend requests
    if (requestsList) {
      const received = this.friendRequests.received || [];
      if (received.length === 0) {
        requestsList.innerHTML = '';
        return;
      }
      requestsList.innerHTML = received.map(req => `
        <div class="friend-item" data-user="${this.escapeHTML(req)}">
          <div class="friend-avatar-wrapper">
            <img class="avatar" src="${this.getAvatarUrl(req)}" alt="" data-avatar-user="${this.escapeHTML(req)}">
          </div>
          <div class="friend-info">
            <span class="friend-name">${this.escapeHTML(req)}</span>
            <span class="friend-status-text">Incoming request</span>
          </div>
          <div class="friend-actions">
            <button class="friend-action-btn accept" title="Accept"><i class="fas fa-check"></i></button>
            <button class="friend-action-btn reject" title="Reject"><i class="fas fa-times"></i></button>
          </div>
        </div>
      `).join('');
      requestsList.querySelectorAll('.friend-item').forEach(item => {
        item.querySelector('.accept')?.addEventListener('click', () => {
          this.socket.emit('acceptFriend', { username: item.dataset.user });
          this.toast('Friend request accepted!', 'success');
        });
        item.querySelector('.reject')?.addEventListener('click', () => {
          this.socket.emit('rejectFriend', { username: item.dataset.user });
          this.toast('Friend request rejected', 'info');
        });
      });
    }
  }

  filterFriendsList(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('#friendsList .friend-item').forEach(item => {
      const name = item.dataset.user.toLowerCase();
      item.style.display = name.includes(q) ? '' : 'none';
    });
  }

  /* ═══════════════════════ USER LIST ═══════════════════════ */
  handleUserList(data) {
    this.onlineUsers = data.users || [];
    this.renderMembers();
    this.renderFriends();
    this.renderDMs();
  }

  handleUserStatusList(data) {
    this.userStatuses = data.statuses || {};
    this.renderMembers();
  }

  renderMembers() {
    const container = this.dom.membersList;
    if (!container) return;
    
    // Group by role
    const admins = [];
    const mods = [];
    const members = [];
    
    this.onlineUsers.forEach(user => {
      const status = this.userStatuses?.[user];
      const role = status?.role || 'member';
      const entry = { name: user, role, status: status?.status || 'online' };
      if (role === 'admin') admins.push(entry);
      else if (role === 'moderator') mods.push(entry);
      else members.push(entry);
    });

    let html = '';
    const renderGroup = (label, list, roleClass) => {
      if (list.length === 0) return '';
      let h = `<div class="member-category">${label} — ${list.length}</div>`;
      list.forEach(u => {
        h += `<div class="member-item" data-user="${this.escapeHTML(u.name)}">
          <div class="member-avatar-wrapper">
            <img class="avatar" src="${this.getAvatarUrl(u.name)}" alt="" data-avatar-user="${this.escapeHTML(u.name)}">
            <span class="member-status-dot ${u.status}"></span>
          </div>
          <span class="member-name">${this.escapeHTML(u.name)}</span>
          ${roleClass ? `<span class="member-role-dot ${roleClass}"></span>` : ''}
        </div>`;
      });
      return h;
    };

    html += renderGroup('Admin', admins, 'admin');
    html += renderGroup('Moderators', mods, 'moderator');
    html += renderGroup('Members', members, '');
    
    container.innerHTML = html;

    container.querySelectorAll('.member-item').forEach(item => {
      item.addEventListener('click', () => this.showProfile(item.dataset.user));
    });
    
    // Update member count in header
    const memberCount = document.getElementById('memberCount');
    if (memberCount) memberCount.textContent = this.onlineUsers.length;
  }

  toggleMembers() {
    const sidebar = document.getElementById('membersSidebar');
    if (!sidebar) return;
    
    if (window.innerWidth < 768) {
      sidebar.classList.toggle('open');
      this.dom.membersOverlay?.classList.toggle('active');
    } else {
      sidebar.classList.toggle('open');
    }
    this.membersOpen = sidebar.classList.contains('open');
  }

  closeMembers() {
    const sidebar = document.getElementById('membersSidebar');
    sidebar?.classList.remove('open');
    this.dom.membersOverlay?.classList.remove('active');
    this.membersOpen = false;
  }

  filterMembers(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('.member-item').forEach(item => {
      const name = item.dataset.user.toLowerCase();
      item.style.display = name.includes(q) ? '' : 'none';
    });
  }

  /* ═══════════════════════ TYPING INDICATOR ═══════════════════════ */
  handleTyping(data) {
    if (data.username === this.username) return;
    this.typingUsers.add(data.username);
    this.updateTypingDisplay();
    clearTimeout(this.typingTimers[data.username]);
    this.typingTimers[data.username] = setTimeout(() => {
      this.typingUsers.delete(data.username);
      this.updateTypingDisplay();
    }, 3000);
  }

  handleStopTyping(data) {
    this.typingUsers.delete(data.username);
    this.updateTypingDisplay();
  }

  updateTypingDisplay() {
    const indicator = this.dom.typingIndicator;
    if (!indicator) return;
    const users = [...this.typingUsers];
    if (users.length === 0) {
      indicator.classList.remove('active');
      return;
    }
    indicator.classList.add('active');
    const text = indicator.querySelector('.typing-text') || indicator.lastChild;
    if (users.length === 1) text.textContent = `${users[0]} is typing...`;
    else if (users.length === 2) text.textContent = `${users[0]} and ${users[1]} are typing...`;
    else text.textContent = `${users.length} people are typing...`;
    // Also update activity bar
    this.updateActivityBar();
  }

  updateActivityBar() {
    const bar = document.getElementById('activityBar');
    const textEl = document.getElementById('activityBarText');
    if (!bar || !textEl) return;
    const activities = [];
    const typingUsers = [...(this.typingUsers || [])];
    if (typingUsers.length > 0) {
      if (typingUsers.length === 1) activities.push(`✏️ ${typingUsers[0]} is typing`);
      else activities.push(`✏️ ${typingUsers.length} people typing`);
    }
    if (this.recordingUsers?.size > 0) {
      activities.push(`🎤 ${[...this.recordingUsers].join(', ')} recording`);
    }
    if (this.uploadingUsers?.size > 0) {
      activities.push(`📎 ${[...this.uploadingUsers].join(', ')} uploading`);
    }
    if (activities.length === 0) {
      bar.style.display = 'none';
    } else {
      textEl.textContent = activities.join(' • ');
      bar.style.display = 'flex';
    }
  }

  /* ═══════════════════════ STATUS ═══════════════════════ */
  handleStatusUpdate(data) {
    if (this.userStatuses) this.userStatuses[data.username] = data;
    this.renderMembers();
    // Update DM status dots
    document.querySelectorAll(`.dm-status-dot[data-user="${data.username}"]`).forEach(dot => {
      dot.className = `dm-status-dot ${data.status}`;
    });
    // If it's the current user, update user panel
    if (data.username === this.username) {
      this.updateUserPanelStatus(data.status);
    }
  }

  updateUserPanelStatus(status) {
    // Update status text
    const statusEl = document.getElementById('userPanelStatus');
    if (statusEl) statusEl.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    // Update status dot indicator
    const indicator = document.querySelector('#userPanelAvatar .status-indicator');
    if (indicator) {
      indicator.className = `status-indicator ${status}`;
    }
    // Update status button icon color
    const statusColors = { online: '#43b581', away: '#faa61a', dnd: '#f04747', invisible: '#747f8d' };
    const statusIcon = this.dom.statusBtn?.querySelector('i');
    if (statusIcon) statusIcon.style.color = statusColors[status] || '#43b581';
  }

  /* ═══════════════════════ PROFILE ═══════════════════════ */
  editBanner() {
    // Open settings modal to the profile tab where banner colors are
    this.openModal('settingsModal');
    // Activate the profile tab
    document.querySelectorAll('.settings-nav-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
    const profileTab = document.querySelector('.settings-nav-item[data-tab="profile"]');
    if (profileTab) profileTab.classList.add('active');
    const profilePanel = document.getElementById('profileSettingsPanel');
    if (profilePanel) profilePanel.classList.add('active');
    // Scroll to banner section
    document.getElementById('bannerColor1Input')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  updateProfilePreviewCard() {
    const banner = document.getElementById('profileBanner');
    const nameEl = document.getElementById('settingsNamePreview');
    const avatarEl = document.getElementById('settingsAvatarPreview');
    // Always read live input values first (so preview updates as user edits)
    const c1 = document.getElementById('bannerColor1Input')?.value || this.bannerColor || '#667eea';
    const c2 = document.getElementById('bannerColor2Input')?.value || this.bannerColor2 || '#764ba2';
    if (banner) banner.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
    if (nameEl) {
      nameEl.textContent = this.username || 'Username';
      const liveNameColor = document.getElementById('nameColorInput')?.value || this.nameColor || '';
      nameEl.style.color = liveNameColor;
    }
    const avatarUrl = this.avatars?.[this.username] || (this.dom.userPanelAvatar?.querySelector('img')?.src);
    if (avatarEl && avatarUrl) {
      avatarEl.innerHTML = `<img src="${avatarUrl}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    }
    // Update gradient preview
    const gradPreview = document.getElementById('bannerGradientPreview');
    if (gradPreview) gradPreview.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;

    // If profile popup is open and showing self, refresh it live
    const profileModal = document.getElementById('profileModal');
    if (profileModal && profileModal.style.display !== 'none' && this._lastProfileData?.username === this.username) {
      const popupBanner = profileModal.querySelector('.profile-banner');
      if (popupBanner) popupBanner.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
    }
  }

  loadProfileSettingsValues() {
    // Load current banner colors into pickers
    const c1Input = document.getElementById('bannerColor1Input');
    const c2Input = document.getElementById('bannerColor2Input');
    if (c1Input) c1Input.value = this.bannerColor || '#667eea';
    if (c2Input) c2Input.value = this.bannerColor2 || '#764ba2';
    // Load bio
    const bioInput = document.getElementById('bioInput');
    if (bioInput && this.bio) bioInput.value = this.bio;
    // Load age
    const ageInput = document.getElementById('ageInput');
    if (ageInput && this.age) ageInput.value = this.age;
    // Load genre
    const genreInput = document.getElementById('genreInput');
    if (genreInput && this.genre) genreInput.value = this.genre;
    // Load name color
    const nameColorInput = document.getElementById('nameColorInput');
    if (nameColorInput && this.nameColor) {
      nameColorInput.value = this.nameColor;
      const preview = document.getElementById('nameColorPreview');
      if (preview) preview.style.color = this.nameColor;
    }
    // Load self note
    const selfNoteInput = document.getElementById('selfNoteInput');
    if (selfNoteInput) selfNoteInput.value = this.getUserNote?.(this.username) || this.userNotes?.[this.username] || '';
    // Update the preview card
    this.updateProfilePreviewCard();
  }

  showProfile(username) {
    if (!username) return;
    this.socket.emit('getProfile', { username });
  }

  renderProfile(data) {
    const modal = this.dom.profileModal;
    if (!modal) return;
    
    modal.querySelector('.profile-avatar')?.setAttribute('src', data.avatar || '/uploads/default-avatar.png');
    const nameEl = modal.querySelector('.profile-display-name');
    if (nameEl) nameEl.textContent = data.displayName || data.username;
    const userEl = modal.querySelector('.profile-username');
    if (userEl) userEl.textContent = `@${data.username}`;
    const roleEl = modal.querySelector('.profile-role');
    if (roleEl) {
      roleEl.textContent = data.role || 'member';
      roleEl.className = `profile-role ${data.role || ''}`;
    }
    const bioEl = modal.querySelector('.profile-bio');
    if (bioEl) bioEl.textContent = data.bio || 'No bio set.';
    const joinEl = modal.querySelector('.profile-joined');
    if (joinEl) joinEl.textContent = data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Unknown';

    // Level/XP
    const lvlEl = modal.querySelector('.profile-level');
    if (lvlEl) lvlEl.textContent = data.level || 1;
    const xpBar = modal.querySelector('.profile-xp-fill');
    if (xpBar) {
      const currentXP = data.xp?.totalXP ?? (typeof data.xp === 'number' ? data.xp : 0);
      const neededXP = data.xp?.nextLevelXP ?? data.xpNeeded ?? 100;
      const pct = neededXP ? Math.min((currentXP / neededXP) * 100, 100) : 0;
      xpBar.style.width = `${pct}%`;
    }

    // Profile actions
    const actionsEl = modal.querySelector('.profile-actions');
    if (actionsEl && data.username !== this.username) {
      const isFriend = this.friends.includes(data.username);
      const isBlocked = this.blocked.includes(data.username);
      actionsEl.innerHTML = `
        <button class="btn primary" onclick="app.startDM('${this.escapeHTML(data.username)}'); app.closeModal('profileModal')">
          <i class="fas fa-comment"></i> Message
        </button>
        ${isFriend ? 
          `<button class="btn secondary" onclick="app.socket.emit('removeFriend', { friendUsername: '${this.escapeHTML(data.username)}' }); app.toast('Friend removed', 'info')">
            <i class="fas fa-user-minus"></i> Remove
          </button>` :
          `<button class="btn secondary" onclick="app.socket.emit('friendRequest', { to: '${this.escapeHTML(data.username)}' }); app.toast('Friend request sent!', 'success')">
            <i class="fas fa-user-plus"></i> Add Friend
          </button>`
        }
        <button class="btn ${isBlocked ? 'secondary' : 'danger'}" onclick="app.socket.emit('${isBlocked ? 'unblock' : 'block'}User', { username: '${this.escapeHTML(data.username)}' }); app.toast('${isBlocked ? 'Unblocked' : 'Blocked'}', 'info')">
          <i class="fas fa-ban"></i> ${isBlocked ? 'Unblock' : 'Block'}
        </button>
      `;
    } else if (actionsEl) {
      actionsEl.innerHTML = '<button class=\"btn primary\" onclick=\"app.openModal(\'settingsModal\')\"><i class=\"fas fa-cog\"></i> Edit Profile</button>';
    }

    this.openModal('profileModal');
  }

  /* ═══════════════════════ FILE UPLOAD ═══════════════════════ */
  uploadFile(file) {
    if (!file) return;
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
      this.toast('File too large (max 25MB)', 'error');
      return;
    }
    this.pendingUploadFile = file;
    this.showUploadPreview(file);
  }

  showUploadPreview(file) {
    const bar = document.getElementById('uploadPreview');
    const thumb = document.getElementById('uploadPreviewThumb');
    const nameEl = document.getElementById('uploadPreviewName');
    const sizeEl = document.getElementById('uploadPreviewSize');
    if (!bar) return;

    nameEl.textContent = file.name;
    sizeEl.textContent = this.formatFileSize(file.size);

    // Show thumbnail for images
    thumb.innerHTML = '';
    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = () => URL.revokeObjectURL(img.src);
      thumb.appendChild(img);
    } else if (file.type.startsWith('video/')) {
      thumb.innerHTML = '<i class="fas fa-video"></i>';
    } else if (file.type.startsWith('audio/')) {
      thumb.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      thumb.innerHTML = '<i class="fas fa-file"></i>';
    }

    bar.style.display = 'flex';
    // Focus input so user can type a caption then hit Enter to send
    if (this.dom.messageInput) {
      this.dom.messageInput.placeholder = 'Add a caption...';
      this.dom.messageInput.focus();
    }
  }

  cancelUploadPreview() {
    this.pendingUploadFile = null;
    const bar = document.getElementById('uploadPreview');
    if (bar) bar.style.display = 'none';
    if (this.dom.messageInput) {
      this.dom.messageInput.placeholder = `Message #${this.currentRoom || 'General'}`;
    }
  }

  sendPendingUpload(caption) {
    const file = this.pendingUploadFile;
    if (!file) return;
    this.pendingUploadFile = null;
    const bar = document.getElementById('uploadPreview');
    if (bar) bar.style.display = 'none';
    if (this.dom.messageInput) {
      this.dom.messageInput.placeholder = `Message #${this.currentRoom || 'General'}`;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.toast('Uploading...', 'info', 10000);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.url) {
        const payload = {
          text: caption || '',
          file: { url: data.url, name: file.name, size: file.size, type: file.type },
          room: this.isDM ? null : this.currentRoom,
          to: this.isDM ? this.currentDM : null,
        };
        if (this.isDM) this.socket.emit('directMessage', payload);
        else this.socket.emit('chatMessage', payload);
        this.toast('File uploaded!', 'success');
      } else {
        this.toast(data.error || 'Upload failed', 'error');
      }
    })
    .catch(() => this.toast('Upload failed', 'error'));
  }

  uploadAvatar(file) {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', this.username);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.url) {
        this.myAvatar = data.url;
        this.userAvatar = data.url;
        this.avatars[this.username] = data.url;
        this.socket.emit('updateAvatar', { avatar: data.url, image: data.url });
        this.updateAvatarsInDOM(this.username, data.url);
        this.toast('Avatar updated!', 'success');
      }
    })
    .catch(() => this.toast('Avatar upload failed', 'error'));
  }

  /* ═══════════════════════ TEXT FORMATTING ═══════════════════════ */
  formatText(text) {
    if (!text) return '';
    let t = this.escapeHTML(text);
    
    // Code blocks ```
    t = t.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang}">${code}</code><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent); this.textContent='Copied!'">Copy</button></pre>`;
    });
    // Inline code
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    t = t.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Strikethrough
    t = t.replace(/~~(.+?)~~/g, '<del>$1</del>');
    // Underline
    t = t.replace(/__(.+?)__/g, '<u>$1</u>');
    // Spoiler
    t = t.replace(/\|\|(.+?)\|\|/g, '<span class="spoiler">$1</span>');
    // Blockquote
    t = t.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
    // Mentions
    t = t.replace(/@(\w+)/g, '<span class="mention" data-user="$1">@$1</span>');
    // URLs
    t = t.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    // Emoji shortcodes
    t = t.replace(/:([a-z_]+):/g, (match, name) => {
      const map = { heart: '❤️', fire: '🔥', thumbsup: '👍', thumbsdown: '👎', laugh: '😂', cry: '😢', 
                    smile: '😊', star: '⭐', rocket: '🚀', check: '✅', x: '❌', wave: '👋',
                    clap: '👏', thinking: '🤔', eyes: '👀', skull: '💀', party: '🎉', 100: '💯' };
      return map[name] || match;
    });
    // Newlines
    t = t.replace(/\n/g, '<br>');
    
    // Big emoji detection (only emojis, no text)
    const emojiOnly = t.replace(/<br>/g, '').trim();
    const emojiRegex = /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}){1,3}$/u;
    if (emojiRegex.test(emojiOnly)) {
      t = `<span class="emoji-xl">${t}</span>`;
    }
    
    return t;
  }

  /* ═══════════════════════ POLLS ═══════════════════════ */
  handlePollCreated(data) {
    this.appendMessage({
      username: data.creator || 'System',
      text: '',
      type: 'poll',
      poll: data,
      timestamp: Date.now(),
      id: data.id
    });
    this.toast('New poll created!', 'info');
  }

  handlePollUpdate(data) {
    // Re-render the poll in messages
    const pollEl = document.querySelector(`.message[data-id="${data.id}"] .msg-poll`);
    if (pollEl) {
      this.renderPollContent(pollEl, data);
    }
  }

  renderPollContent(container, poll) {
    const voteCount = (v) => Array.isArray(v) ? v.length : (v || 0);
    const totalVotes = poll.options.reduce((sum, opt) => sum + voteCount(opt.votes), 0);
    container.innerHTML = `
      <div class="poll-question">${this.escapeHTML(poll.question)}</div>
      ${poll.options.map((opt, i) => {
        const count = voteCount(opt.votes);
        const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
        const voted = (Array.isArray(opt.votes) ? opt.votes.includes(this.username) : opt.voters?.includes(this.username)) ? 'voted' : '';
        let votersList = '';
        if (!poll.anonymous && Array.isArray(opt.votes) && opt.votes.length > 0) {
          votersList = `<div class='poll-voters'>${opt.votes.map(u => `<span class='poll-voter'>${this.escapeHTML(u)}</span>`).join(', ')}</div>`;
        }
        return `<div class="poll-option ${voted}" data-poll="${poll.id}" data-option="${i}">
          <div class="poll-bar" style="width: ${pct}%"></div>
          <span class="poll-option-text">${this.escapeHTML(opt.text)}</span>
          <span class="poll-option-pct">${pct}% (${count})</span>
          <button class="poll-vote-btn">Vote</button>
          ${votersList}
        </div>`;
      }).join('')}
      <div class="poll-votes">${totalVotes} vote${totalVotes !== 1 ? 's' : ''}</div>
    `;
    container.querySelectorAll('.poll-vote-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const opt = btn.closest('.poll-option');
        if (opt) {
          this.socket.emit('votePoll', { pollId: opt.dataset.poll, optionId: parseInt(opt.dataset.option), option: parseInt(opt.dataset.option) });
        }
      });
    });
  }

  /* ═══════════════════════ PINNED & BOOKMARKS ═══════════════════════ */
  renderPinnedMessages(data) {
    const list = document.getElementById('pinnedMessagesList');
    const messages = data.messages || data || [];

    // Update pinned bar at top of chat
    this.updatePinnedBar(messages);

    if (!list) return;
    if (messages.length === 0) {
      list.innerHTML = '<div class="empty-state"><i class="fas fa-thumbtack"></i><p>No pinned messages</p></div>';
      return;
    }
    list.innerHTML = messages.map(msg => `
      <div class="pinned-item" data-id="${msg.id}">
        <div class="pinned-author">${this.escapeHTML(msg.username)}</div>
        <div class="pinned-text">${this.formatText(msg.message || msg.text || '')}</div>
        <div class="pinned-time">${new Date(msg.timestamp).toLocaleString()}</div>
        <button class="pinned-unpin-btn" title="Unpin" data-msg-id="${msg.id}"><i class="fas fa-thumbtack"></i></button>
      </div>
    `).join('');
    list.querySelectorAll('.pinned-unpin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.socket.emit('unpinMessage', { messageId: btn.dataset.msgId, room: this.currentRoom });
        this.toast('Message unpinned', 'info');
      });
    });
  }

  updatePinnedBar(messages) {
    const bar = document.getElementById('pinnedBar');
    const text = document.getElementById('pinnedBarText');
    if (!bar || !text) return;
    if (!messages || messages.length === 0) {
      bar.style.display = 'none';
      return;
    }
    // Show most recent pinned message
    const latest = messages[messages.length - 1];
    const content = latest.message || latest.text || '';
    text.textContent = `${latest.username}: ${content}`.substring(0, 200);
    bar.style.display = 'flex';
  }

  renderBookmarks(data) {
    const list = document.getElementById('bookmarksList');
    if (!list) return;
    const bookmarks = data.bookmarks || data || [];
    if (bookmarks.length === 0) {
      list.innerHTML = '<div class="empty-state"><i class="fas fa-bookmark"></i><p>No bookmarks yet</p></div>';
      return;
    }
    list.innerHTML = bookmarks.map(b => `
      <div class="bookmark-item" data-id="${b.id || b.messageId}">
        <div class="bookmark-author">${this.escapeHTML(b.username || '')}</div>
        <div class="bookmark-text">${this.formatText(b.message || b.text || '')}</div>
        <div class="bookmark-meta">
          <span>${b.room || 'DM'}</span>
          <span>${new Date(b.timestamp || b.savedAt).toLocaleString()}</span>
        </div>
        <button class="bookmark-remove" onclick="app.socket.emit('removeBookmark', { messageId: '${b.id || b.messageId}' }); this.closest('.bookmark-item').remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
  }


  /* ═══════════════════════ ANNOUNCEMENTS ═══════════════════════ */
  handleAnnouncement(data) {
    const banner = this.dom.announcementBanner || document.getElementById('announcementBanner');
    const textEl = this.dom.announcementText || document.getElementById('announcementText');
    const timerBar = document.getElementById('announcementTimer');
    if (!banner || !textEl) return;

    // Clear any existing auto-dismiss
    if (this._announcementTimeout) clearTimeout(this._announcementTimeout);
    if (this._announcementInterval) clearInterval(this._announcementInterval);

    // Set content
    const title = this.escapeHTML(data.title || '');
    const msg = this.escapeHTML(data.message || '');
    textEl.innerHTML = `<strong>${title}</strong> — ${msg}`;
    banner.setAttribute('data-type', data.type || 'info');

    // Show with animation
    banner.style.display = 'flex';
    banner.style.animation = 'none';
    banner.offsetHeight; // force reflow
    banner.style.animation = 'announcementSlideIn 0.4s ease-out';

    // Duration in seconds (default 30)
    const duration = Math.max(5, Math.min(300, data.duration || 30));

    // Animate progress bar
    if (timerBar) {
      timerBar.style.transition = 'none';
      timerBar.style.width = '100%';
      timerBar.offsetHeight; // force reflow
      timerBar.style.transition = `width ${duration}s linear`;
      timerBar.style.width = '0%';
    }

    // Auto-dismiss after duration
    this._announcementTimeout = setTimeout(() => {
      this.dismissAnnouncement();
    }, duration * 1000);

    this.addNotification({ type: 'announcement', text: `${data.title}: ${data.message}`, time: Date.now() });
    this.toast(`📢 ${data.title}`, 'info');
  }

  dismissAnnouncement() {
    const banner = this.dom.announcementBanner || document.getElementById('announcementBanner');
    if (!banner) return;
    if (this._announcementTimeout) { clearTimeout(this._announcementTimeout); this._announcementTimeout = null; }
    if (this._announcementInterval) { clearInterval(this._announcementInterval); this._announcementInterval = null; }
    banner.style.animation = 'announcementSlideOut 0.3s ease-in forwards';
    setTimeout(() => { banner.style.display = 'none'; }, 300);
  }

  renderAnnouncementsList(data) {
    const list = document.getElementById('announcementsList');
    if (!list) return;
    const items = data.announcements || data || [];
    list.innerHTML = items.map(a => `
      <div class="announcement-item">
        <div class="announcement-header"><i class="fas fa-bullhorn"></i> ${this.escapeHTML(a.title)}</div>
        <div class="announcement-body">${this.escapeHTML(a.message)}</div>
        <div class="announcement-time">${new Date(a.timestamp || a.createdAt).toLocaleString()}</div>
      </div>
    `).join('');
  }

  /* ═══════════════════════ LEVEL & XP ═══════════════════════ */
  handleXPUpdate(data) {
    this.userXP = data.xp;
    this.userLevel = data.level;
    this.xpNeeded = data.xpNeeded;
    // Update XP bar in user panel if exists
    const xpBar = document.querySelector('.user-xp-fill');
    if (xpBar) xpBar.style.width = `${(data.xp / data.xpNeeded) * 100}%`;
  }

  handleLevelUp(data) {
    this.userLevel = data.level;
    this.toast(`🎉 Level Up! You're now level ${data.level}!`, 'success', 5000);
    this.playSound('levelup');
    // Confetti effect
    this.showConfetti();
  }

  showConfetti() {
    const colors = ['#5865f2', '#ed4245', '#fee75c', '#57f287', '#eb459e'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed; top: -10px; left: ${Math.random() * 100}vw;
        width: ${Math.random() * 8 + 4}px; height: ${Math.random() * 8 + 4}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 99999; pointer-events: none;
        animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }

  /* ═══════════════════════ POLL / WHEEL DIALOGS ═══════════════════════ */
  showCreatePollDialog() {
    this.openModal('pollModal');
  }

  showWheelDialog() {
    this.openModal('wheelModal');
  }

  /* ═══════════════════════ WHEEL OF FORTUNE ═══════════════════════ */
  handleWheelResult(data) {
    // Create a chat message that will render a spinning wheel graphic
    const msgData = {
      type: 'wheel',
      creator: data.creator,
      options: data.options || [],
      result: data.result,
      finalAngle: data.finalAngle,
      spinDuration: data.spinDuration,
      timestamp: data.timestamp || Date.now()
    };
    this.appendMessage(msgData);
    this.scrollToBottom();
    this.toast(`🎰 Wheel result: ${data.result}`, 'success', 4000);
  }

  handleSharedWheel(data) {
    // Handled by wheelResult now
  }

  /* ═══════════════════════ SEARCH ═══════════════════════ */
  handleSearch(data) {
    const panel = document.querySelector('.search-results-panel');
    const list = document.querySelector('.search-results-list');
    if (!panel || !list) return;
    
    panel.classList.add('active');
    const results = data.results || [];
    
    if (results.length === 0) {
      list.innerHTML = '<div class="search-empty"><i class="fas fa-search"></i><p>No results found</p></div>';
      return;
    }
    
    list.innerHTML = results.map(r => `
      <div class="search-result-item" data-room="${this.escapeHTML(r.room || '')}" data-id="${r.id || ''}">
        <img class="avatar" src="${this.escapeHTML(r.avatar || '/uploads/default-avatar.png')}" alt="">
        <div class="search-result-content">
          <div class="search-result-meta">
            <strong>${this.escapeHTML(r.username || '')}</strong> in #${this.escapeHTML(r.room || '')}
            • ${r.timestamp ? new Date(r.timestamp).toLocaleString() : ''}
          </div>
          <div class="search-result-text">${this.formatText(r.text || '')}</div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const room = item.dataset.room;
        if (room) this.joinRoom(room);
        panel.classList.remove('active');
      });
    });
  }

  /* ═══════════════════════ TODO LIST ═══════════════════════ */
  renderTodos(filterArg) {
    const list = document.getElementById('todoList');
    if (!list) return;
    
    const filter = filterArg || this.todoFilter || 'all';
    this.todoFilter = filter;
    let filtered = [...this.todoList];
    if (filter === 'active') filtered = filtered.filter(t => !t.done);
    else if (filter === 'done' || filter === 'completed') filtered = filtered.filter(t => t.done);
    
    if (filtered.length === 0) {
      list.innerHTML = '<div class="empty-state"><i class="fas fa-check-circle"></i><p>No todos</p></div>';
    } else {
      list.innerHTML = filtered.map((todo, i) => `
        <div class="todo-item ${todo.done ? 'done' : ''} priority-${todo.priority || 'normal'}" data-index="${i}">
          <label class="todo-checkbox">
            <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="app.toggleTodo(${i})">
            <span class="checkmark"></span>
          </label>
          <span class="todo-text">${this.escapeHTML(todo.text)}</span>
          <span class="todo-priority-dot priority-${todo.priority || 'normal'}"></span>
          <button class="todo-delete" onclick="app.deleteTodo(${i})"><i class="fas fa-times"></i></button>
        </div>
      `).join('');
    }
    
    // Footer
    const footer = document.querySelector('.todo-footer');
    if (footer) {
      const remaining = this.todoList.filter(t => !t.done).length;
      const countEl = footer.querySelector('.todo-count') || footer.querySelector('#todoCount');
      if (countEl) countEl.textContent = `${remaining} item${remaining !== 1 ? 's' : ''} left`;
    }
  }

  handleAddTodo() {
    const input = document.getElementById('todoInput');
    const priority = document.getElementById('todoPriority');
    if (!input?.value.trim()) return;
    this.todoList.push({ text: input.value.trim(), done: false, priority: priority?.value || 'normal', createdAt: Date.now() });
    input.value = '';
    this.saveTodos();
    this.renderTodos();
  }

  toggleTodo(index) {
    if (this.todoList[index]) {
      this.todoList[index].done = !this.todoList[index].done;
      this.saveTodos();
      this.renderTodos();
    }
  }

  deleteTodo(index) {
    this.todoList.splice(index, 1);
    this.saveTodos();
    this.renderTodos();
  }

  /* ═══════════════════════ NOTIFICATION CENTER ═══════════════════════ */
  addNotification(notif) {
    this.notifications.unshift(notif);
    if (this.notifications.length > 100) this.notifications.pop();
    this.updateNotifBadge();
    this.renderNotifications();
  }

  updateNotifBadge() {
    const badge = this.dom.notifBadge;
    if (!badge) return;
    const unread = this.notifications.filter(n => !n.read).length;
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }

  renderNotifications(filter) {
    const list = document.getElementById('notifList');
    if (!list) return;
    let notifs = this.notifications;
    if (filter && filter !== 'all') {
      notifs = notifs.filter(n => n.type === filter || (filter === 'mentions' && n.type === 'mention') || (filter === 'dms' && n.type === 'dm'));
    }
    const notifEmpty = document.getElementById('notifEmpty');
    if (notifs.length === 0) {
      list.innerHTML = '';
      if (notifEmpty) notifEmpty.style.display = '';
      return;
    }
    if (notifEmpty) notifEmpty.style.display = 'none';
    list.innerHTML = notifs.slice(0, 50).map((n, i) => {
      const icon = n.type === 'mention' ? 'at' : n.type === 'dm' ? 'envelope' : n.type === 'friend' ? 'user-plus' : 'bell';
      const text = n.type === 'mention' ? `${n.user} mentioned you` :
                   n.type === 'dm' ? `${n.user} sent you a message` :
                   n.type === 'friend' ? `${n.user} sent a friend request` :
                   n.text || 'Notification';
      const time = n.time ? this.timeAgo(n.time) : '';
      return `<div class="notif-item ${n.read ? 'read' : ''}" data-index="${i}">
        <i class="fas fa-${icon} notif-icon"></i>
        <div class="notif-content">
          <div class="notif-text">${this.escapeHTML(text)}</div>
          <div class="notif-time">${time}</div>
        </div>
      </div>`;
    }).join('');
    list.querySelectorAll('.notif-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index);
        if (this.notifications[idx]) {
          this.notifications[idx].read = true;
          this.updateNotifBadge();
          item.classList.add('read');
        }
      });
    });
  }

  /* ═══════════════════════ STICKERS ═══════════════════════ */
  renderStickers() {
    // Only show custom stickers
    const grid = document.getElementById('stickerGrid');
    if (!grid) return;
    this.renderCustomStickerTab(grid);
  }

  /* ═══════════════════════ EMOJI PICKER ═══════════════════════ */
  initEmojiPicker() {
    // Prevent double-init
    if (this._emojiInitialized) return;
    this._emojiInitialized = true;

    const grid = document.getElementById('stickerGrid');
    const search = document.getElementById('emojiSearch');
    if (!grid) return;

    const emojiCategories = {
      'Smileys': ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🫡','🤐','🤨','😐','😑','😶','🫥','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','🫤','😟','🙁','☹️','😮','😯','😲','😳','🥺','🥹','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖'],
      'Gestures': ['👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','👌','🤌','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','💪'],
      'Hearts': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟'],
      'Animals': ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🦅','🦆','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛'],
      'Food': ['🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🫘','🥐','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🫓','🌮','🌯','🫔','🥙','🧆','🥗','🍿','🧂','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍣','🍤','🍥','🍢'],
      'Objects': ['⌚','📱','💻','⌨️','🖥️','🖨️','🖱️','🖲️','🕹️','🗜️','💾','💿','📀','📼','📷','📸','📹','🎥','📽️','🎞️','📞','☎️','📟','📠','📺','📻','🎙️','🎚️','🎛️','🧭','⏱️','⏲️','⏰','🕰️','⌛','⏳','📡','🔋','🔌','💡','🔦','🕯️','🧯','🛢️','💸','💵','💴','💶','💷','🪙','💰','💳','💎','⚖️','🪜','🧰','🪛','🔧','🔨','⚒️','🛠️','⛏️','🪚','🔩','⚙️','🪤','🧲','🔫'],
      'Symbols': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','✨','⭐','🌟','💫','⚡','🔥','💥','☀️','🌈','💯','♻️','🎵','🎶','🔔','🔕','📣','📢','💬','💭','🗯️','♠️','♣️','♥️','♦️','🃏','🎴','🀄','🔇','🔈','🔉','🔊']
    };

    const renderCategory = (emojis) => {
      grid.innerHTML = emojis.map(e => `<span class="emoji-item" data-emoji="${e}">${e}</span>`).join('');
      grid.querySelectorAll('.emoji-item').forEach(item => {
        item.addEventListener('click', () => {
          const input = this.dom.messageInput;
          if (input) {
            input.value += item.dataset.emoji;
            input.focus();
          }
          this.emojiRecent.unshift(item.dataset.emoji);
          this.emojiRecent = [...new Set(this.emojiRecent)].slice(0, 30);
          this.saveEmojiRecent();
        });
      });
    };

    const stickerPacks = [
      '😀','😂','🥰','😍','🤩','🥳','😎','🤯','😭','😤',
      '🤣','😇','🤗','🫡','😈','👻','💀','🤡','🐱','🐸',
      '👍','👎','❤️','🔥','💯','⭐','🎉','🚀','💪','👏',
      '🙏','💔','😴','🥺','😬','🤔','🫠','🫶','🤝','🎯',
      '💥','🌈','🍕','🎮','💎','🏆','👑','🎵','📸','🦄'
    ];

    const renderStickersCategory = () => {
      grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
      grid.style.gap = '6px';
      grid.innerHTML = stickerPacks.map(s =>
        `<span class="emoji-item sticker-large" data-emoji="${s}" title="${s}">${s}</span>`
      ).join('');
      grid.querySelectorAll('.emoji-item').forEach(item => {
        item.addEventListener('click', () => {
          const input = this.dom.messageInput;
          if (input) { input.value += item.dataset.emoji; input.focus(); }
          this.emojiRecent.unshift(item.dataset.emoji);
          this.emojiRecent = [...new Set(this.emojiRecent)].slice(0, 30);
          this.saveEmojiRecent();
          document.getElementById('stickerPicker')?.classList.remove('active');
        });
      });
    };

    // Category tabs
    document.querySelectorAll('.picker-tab')?.forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.picker-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        grid.style.gridTemplateColumns = '';
        const cat = tab.dataset.category;
        grid.style.gap = '2px';
        if (cat === 'stickers') renderStickersCategory();
        else if (cat === 'recent') renderCategory(this.emojiRecent || []);
        else if (cat === 'custom') {
          this.renderCustomStickerTab(grid);
        } else {
          const catMap = { 'smileys': 'Smileys', 'animals': 'Animals', 'food': 'Food', 'activities': 'Gestures', 'travel': 'Hearts', 'objects': 'Objects', 'symbols': 'Symbols', 'flags': 'Symbols' };
          const mapped = catMap[cat] || cat;
          if (emojiCategories[mapped]) renderCategory(emojiCategories[mapped]);
        }
      });
    });

    // Custom sticker add button
const addStickerBtn = document.getElementById('addCustomStickerBtn');
const stickerFileInput = document.getElementById('customStickerInput');
if (addStickerBtn && stickerFileInput) {
  addStickerBtn.addEventListener('click', () => stickerFileInput.click());
  stickerFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const name = file.name.replace(/\.[^.]+$/, '');
      const stickers = JSON.parse(localStorage.getItem('redchat_custom_stickers') || '[]');
      stickers.push({ url: dataUrl, name });
      localStorage.setItem('redchat_custom_stickers', JSON.stringify(stickers));
      this.toast('Custom sticker added!', 'success');
      this.renderCustomStickerTab(document.getElementById('stickerGrid'));
    };
    reader.readAsDataURL(file);
    stickerFileInput.value = '';
  });
}
    // end initEmojiPicker
  }

  // modal handling moved out of picker
  openModal(id) {
    document.querySelectorAll('.modal-overlay').forEach(m => {
      if (m.id !== id) m.style.display = 'none';
    });
    const modal = document.getElementById(id);
    if (!modal) { console.warn('[openModal] not found:', id); return; }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Trigger content loading
    switch (id) {
      case 'settingsModal': 
        // Update username in profile preview
        const namePreview = document.getElementById('settingsNamePreview');
        if (namePreview) namePreview.textContent = this.username || 'Username';
        this.loadProfileSettingsValues();
        break;
      case 'todoModal': this.renderTodos(); break;
      case 'pinnedModal': this.socket.emit('getPinned', { room: this.currentRoom }); break;
      case 'bookmarksModal': this.socket.emit('getBookmarks'); break;
      case 'stickerModal': this.renderStickers(); break;
      case 'emojiModal': this.initEmojiPicker(); break;
      case 'notifCenterModal': this.renderNotifications(); break;
      case 'adminModal': this.socket.emit('getAdminStats'); break;
      case 'wheelModal':
        modal.querySelectorAll('.remove-opt').forEach(btn => {
          btn.addEventListener('click', () => btn.closest('.wheel-opt-row')?.remove());
        });
        break;
    }
  }

  closeModal(id) {
    if (id) {
      const modal = document.getElementById(id);
      if (modal) modal.style.display = 'none';
    } else {
      document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
    }
    document.body.style.overflow = '';
  }

  /* ═══════════════════════ CONTEXT MENU ═══════════════════════ */
  showContextMenu(e, items) {
    e.preventDefault();
    let menu = document.getElementById('dynamicContextMenu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'dynamicContextMenu';
      menu.className = 'context-menu';
      document.body.appendChild(menu);
    }
    menu.innerHTML = items.map(item => {
      if (item.separator) return '<div class="context-menu-separator"></div>';
      return `<div class="context-menu-item ${item.danger ? 'danger' : ''}" data-action="${item.action || ''}">
        <i class="${item.icon || ''}"></i> ${item.label}
      </div>`;
    }).join('');
    // Position with viewport clamping
    menu.style.top = '0px';
    menu.style.left = '0px';
    menu.classList.add('active');
    const menuRect = menu.getBoundingClientRect();
    let top = e.clientY;
    let left = e.clientX;
    if (top + menuRect.height > window.innerHeight) top = window.innerHeight - menuRect.height - 8;
    if (left + menuRect.width > window.innerWidth) left = window.innerWidth - menuRect.width - 8;
    if (top < 8) top = 8;
    if (left < 8) left = 8;
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.querySelectorAll('.context-menu-item').forEach(el => {
      el.addEventListener('click', () => {
        const item = items.find(i => i.action === el.dataset.action);
        if (item?.handler) item.handler();
        menu.classList.remove('active');
      });
    });
    const close = (ev) => { if (!menu.contains(ev.target)) { menu.classList.remove('active'); document.removeEventListener('click', close); } };
    setTimeout(() => document.addEventListener('click', close), 10);
  }

  /* ═══════════════════════ FOCUS MODE ═══════════════════════ */
  toggleFocusMode() {
    this.focusMode = !this.focusMode;
    document.body.classList.toggle('focus-mode', this.focusMode);
    this.toast(this.focusMode ? 'Focus mode ON' : 'Focus mode OFF', 'info');
  }

  /* ═══════════════════════ TOOL ACTIONS ═══════════════════════ */
  handleToolAction(action) {
    switch (action) {
      case 'gallery':
        this.openModal('galleryModal');
        this.loadMediaGallery();
        break;
      case 'stats':
        this.openModal('statsModal');
        this.loadChatStats();
        break;
      case 'export':
        this.exportChatHistory();
        break;
      case 'wheel':
        this.openModal('wheelModal');
        break;
      case 'focus':
        this.toggleFocusMode();
        break;
      case 'settings':
        this.openModal('settingsModal');
        break;
      case 'bookmarks':
        this.openModal('bookmarksModal');
        break;
      case 'todo':
        this.openModal('todoModal');
        break;
      case 'admin':
        this.socket.emit('getAdminStats');
        this.openModal('adminModal');
        break;
      case 'logout':
        this.performLogout();
        break;
    }
  }

  performLogout() {
    if (confirm('Are you sure you want to logout?')) {
      this.socket.emit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('redchat_token');
      document.getElementById('chatApp').style.display = 'none';
      document.getElementById('authScreen').style.display = 'flex';
      this.socket.disconnect();
      this.toast('Logged out successfully', 'info');
      setTimeout(() => location.reload(), 500);
    }
  }

  loadMediaGallery() {
    // Collect all images from message history
    const msgs = this.messageHistory[this.currentRoom] || [];
    const images = msgs.filter(m => m.file?.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(m.file.url || m.file.name || ''));
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    if (images.length === 0) {
      galleryGrid.innerHTML = '<div class="empty-state"><i class="fas fa-images"></i><p>No media shared yet</p></div>';
      return;
    }
    galleryGrid.innerHTML = images.map(m => `
      <div class="gallery-item" onclick="app.openImageViewer('${this.escapeHTML(m.file.url)}')">
        <img src="${this.escapeHTML(m.file.url)}" loading="lazy" alt="">
        <div class="gallery-info">${this.escapeHTML(m.username)} • ${new Date(m.timestamp).toLocaleDateString()}</div>
      </div>
    `).join('');
  }

  loadChatStats() {
    const msgs = this.messageHistory[this.currentRoom] || [];
    const container = document.getElementById('statsContent');
    if (!container) return;
    
    const totalMsgs = msgs.length;
    const uniqueUsers = new Set(msgs.map(m => m.username)).size;
    const todayMsgs = msgs.filter(m => {
      const d = new Date(m.timestamp);
      const today = new Date();
      return d.toDateString() === today.toDateString();
    }).length;
    
    // Most active users
    const userCounts = {};
    msgs.forEach(m => { userCounts[m.username] = (userCounts[m.username] || 0) + 1; });
    const topUsers = Object.entries(userCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    
    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-value">${totalMsgs}</div><div class="stat-label">Total Messages</div></div>
        <div class="stat-card"><div class="stat-value">${uniqueUsers}</div><div class="stat-label">Unique Users</div></div>
        <div class="stat-card"><div class="stat-value">${todayMsgs}</div><div class="stat-label">Today</div></div>
        <div class="stat-card"><div class="stat-value">${this.onlineUsers.length}</div><div class="stat-label">Online Now</div></div>
      </div>
      <h4 style="margin: 20px 0 10px; color: var(--text-secondary)">Most Active</h4>
      <div class="stats-leaderboard">
        ${topUsers.map(([user, count], i) => `
          <div class="leaderboard-item">
            <span class="leaderboard-rank">#${i + 1}</span>
            <span class="leaderboard-name">${this.escapeHTML(user)}</span>
            <span class="leaderboard-count">${count} msgs</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  exportChatHistory() {
    const msgs = this.messageHistory[this.currentRoom] || [];
    if (msgs.length === 0) { this.toast('No messages to export', 'warning'); return; }
    
    const text = msgs.map(m => `[${new Date(m.timestamp).toLocaleString()}] ${m.username}: ${m.text}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redchat-${this.currentRoom}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    this.toast('Chat exported!', 'success');
  }

  exportUserData() {
    const data = {
      username: this.username,
      settings: this.settings,
      todos: this.todoList,
      favorites: this.favorites,
      mutedRooms: this.mutedRooms,
      userNotes: this.userNotes,
      drafts: this.drafts,
      emojiRecent: this.emojiRecent,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redchat-userdata-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.toast('User data exported!', 'success');
  }


  /* ═══════════════════════ ADMIN DASHBOARD ═══════════════════════ */
  loadAdminPage(page) {
    switch (page) {
      case 'overview':
      case 'adminStats': this.socket.emit('getAdminStats'); break;
      case 'users':
      case 'adminUsers': this.socket.emit('adminGetUsers'); break;
      case 'rooms':
      case 'adminRooms': this.socket.emit('adminGetRooms'); break;
      case 'reports':
      case 'adminReports': this.socket.emit('adminGetReports'); break;
      case 'moderation':
      case 'adminBans': this.socket.emit('adminGetBans'); break;
      case 'announcements':
      case 'adminAnnouncements': this.socket.emit('getAnnouncements'); break;
      case 'activity': this.socket.emit('getAdminStats'); break;
    }
  }

  renderAdminStats(data) {
    if (!data) return;
    const u = data.users || {};
    const m = data.messages || {};
    const r = data.reports || {};
    const s = data.server || {};
    // Update stat cards in the overview panel (uses individual element IDs from HTML)
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val ?? '—'; };
    set('statTotalUsers',    u.total    ?? 0);
    set('statOnlineUsers',   u.online   ?? 0);
    set('statTotalMessages', m.total    ?? 0);
    set('statTotalRooms',    data.rooms ?? 0);
    set('statPendingReports',r.pending  ?? 0);
    set('statPeakOnline',    u.peakOnline ?? u.total ?? 0);
    // Recent events
    const eventsEl = document.getElementById('recentEvents');
    if (eventsEl && data.recentActivity) {
      const recent = data.recentActivity.slice(-20).reverse();
      eventsEl.innerHTML = recent.length ? recent.map(e =>
        `<div class="event-item"><span class="event-type">${this.escapeHTML(e.type || '')}</span> <span class="event-user">${this.escapeHTML(e.username || '')}</span> <span class="event-time">${e.timestamp ? new Date(e.timestamp).toLocaleTimeString() : ''}</span></div>`
      ).join('') : '<div class="empty-hint">No recent activity</div>';
    }
    // Moderation log (shown in the moderation tab)
    const modLog = document.getElementById('moderationLog');
    if (modLog && data.moderationLog) {
      const log = data.moderationLog.slice(-30).reverse();
      modLog.innerHTML = log.length ? log.map(e =>
        `<div class="event-item"><span class="event-type">${this.escapeHTML(e.type || e.action || '')}</span> <span class="event-user">${this.escapeHTML(e.username || e.target || '')}</span> <span class="event-time">${e.timestamp ? new Date(e.timestamp).toLocaleString() : ''}</span></div>`
      ).join('') : '<div class="empty-hint">No moderation actions</div>';
    }
    // Activity log panel
    const activityList = document.getElementById('activityLogList');
    if (activityList && data.recentActivity) {
      const all = data.recentActivity.slice(-100).reverse();
      activityList.innerHTML = all.length ? all.map(e =>
        `<div class="event-item"><span class="event-type">${this.escapeHTML(e.type || '')}</span> <span class="event-user">${this.escapeHTML(e.username || '')}</span>${e.details ? ` <span class="event-detail">${this.escapeHTML(e.details)}</span>` : ''} <span class="event-time">${e.timestamp ? new Date(e.timestamp).toLocaleString() : ''}</span></div>`
      ).join('') : '<div class="empty-hint">No activity recorded</div>';
    }
  }

  renderAdminUsers(data) {
    const list = document.getElementById('adminUsersList');
    if (!list) return;
    const users = data.users || data || [];
    list.innerHTML = users.map(u => `
      <div class="admin-user-item" data-user="${this.escapeHTML(u.username)}">
        <img class="avatar" src="${this.escapeHTML(u.avatar || '/uploads/default-avatar.png')}" alt="">
        <div class="admin-user-info">
          <span class="admin-user-name">${this.escapeHTML(u.username)}</span>
          <span class="admin-user-meta">${u.role || 'member'} • Level ${u.level || 1}</span>
        </div>
        <div class="admin-user-actions">
          <select class="admin-role-select" onchange="app.socket.emit('adminSetRole', { username: '${this.escapeHTML(u.username)}', role: this.value })">
            <option value="member" ${u.role === 'member' ? 'selected' : ''}>Member</option>
            <option value="moderator" ${u.role === 'moderator' ? 'selected' : ''}>Moderator</option>
            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
          </select>
          <button class="btn small danger" onclick="if(confirm('Ban ${this.escapeHTML(u.username)}?')) app.socket.emit('adminBan', { username: '${this.escapeHTML(u.username)}', reason: prompt('Reason:') || 'No reason' })">
            <i class="fas fa-ban"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  renderAdminRooms(data) {
    const list = document.getElementById('adminRoomsList');
    if (!list) return;
    const rooms = data.rooms || data || [];
    list.innerHTML = rooms.map(r => {
      const name = typeof r === 'string' ? r : r.name;
      return `<div class="admin-room-item">
        <i class="fas fa-hashtag"></i>
        <span>${this.escapeHTML(name)}</span>
        <span class="admin-room-meta">${typeof r === 'object' && r.members ? r.members + ' members' : ''}</span>
        <button class="btn small danger" onclick="if(confirm('Delete ${this.escapeHTML(name)}?')) app.socket.emit('adminDeleteRoom', { room: '${this.escapeHTML(name)}', roomId: '${this.escapeHTML(name)}' })">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;
    }).join('');
  }

  renderAdminReports(data) {
    const list = document.getElementById('adminReportsList');
    if (!list) return;
    const reports = data.reports || data || [];
    if (reports.length === 0) {
      list.innerHTML = '<div class="empty-state"><i class="fas fa-shield-alt"></i><p>No reports</p></div>';
      return;
    }
    list.innerHTML = reports.map(r => `
      <div class="admin-report-item" data-id="${r.id}">
        <div class="report-header">
          <strong>${this.escapeHTML(r.reporter || '')}</strong> reported <strong>${this.escapeHTML(r.reported || '')}</strong>
          <span class="report-time">${r.timestamp ? new Date(r.timestamp).toLocaleString() : ''}</span>
        </div>
        <div class="report-reason">${this.escapeHTML(r.reason || '')}</div>
        <div class="report-actions">
          <button class="btn small primary" onclick="app.socket.emit('adminResolveReport', { id: '${r.id}', reportId: '${r.id}' })">Resolve</button>
          <button class="btn small danger" onclick="app.socket.emit('adminBan', { username: '${this.escapeHTML(r.reported)}', reason: '${this.escapeHTML(r.reason)}' })">Ban User</button>
        </div>
      </div>
    `).join('');
  }

  renderBannedUsers(data) {
    const list = document.getElementById('bannedUsersList');
    if (!list) return;
    const bans = data.bans || data || [];
    if (bans.length === 0) {
      list.innerHTML = '<div class="empty-hint">No banned users</div>';
      return;
    }
    list.innerHTML = bans.map(b => `
      <div class="admin-ban-item">
        <strong>${this.escapeHTML(b.username || '')}</strong>
        <span class="ban-reason">${this.escapeHTML(b.reason || '')}</span>
        <span class="ban-time">${b.timestamp ? new Date(b.timestamp).toLocaleString() : ''}</span>
        <button class="btn small secondary" onclick="app.socket.emit('adminUnban', { username: '${this.escapeHTML(b.username)}' }); this.closest('.admin-ban-item').remove();">Unban</button>
      </div>
    `).join('');
  }

  /* ═══════════════════════ AVATAR MANAGEMENT ═══════════════════════ */
  updateAvatarsInDOM(username, avatarUrl) {
    const user = username || this.username;
    const url = avatarUrl || (user === this.username ? this.userAvatar : null) || this.generateInitialsAvatar(user);
    // Update all img[data-avatar-user] elements for this user
    document.querySelectorAll(`[data-avatar-user="${user}"]`).forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = url;
      } else {
        // div-based avatar wrapper — set background or replace icon
        this._setAvatarOnWrapper(el, url);
      }
    });
    // If updating current user, also update user panel and settings avatars
    if (user === this.username) {
      this.userAvatar = avatarUrl || this.userAvatar;
      // User panel bottom avatar
      const panelWrapper = document.getElementById('userPanelAvatar');
      if (panelWrapper) {
        const innerWrapper = panelWrapper.querySelector('.avatar-wrapper');
        if (innerWrapper) this._setAvatarOnWrapper(innerWrapper, url);
      }
      // Settings page — avatar preview card
      const settingsPreview = document.getElementById('settingsAvatarPreview');
      if (settingsPreview) this._setAvatarOnWrapper(settingsPreview, url);
      // Settings page — upload area preview
      const settingsAvatar = document.getElementById('settingsAvatar');
      if (settingsAvatar) this._setAvatarOnWrapper(settingsAvatar, url);
    }
  }

  _setAvatarOnWrapper(wrapper, url) {
    let img = wrapper.querySelector('img');
    if (img) {
      img.src = url;
    } else {
      const icon = wrapper.querySelector('i');
      if (icon) icon.remove();
      img = document.createElement('img');
      img.className = 'avatar';
      img.style.cssText = 'width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;';
      wrapper.prepend(img);
      img.src = url;
    }
  }

  filterInviteList(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('.invite-user-item').forEach(item => {
      const name = item.dataset.user?.toLowerCase() || '';
      item.style.display = name.includes(q) ? '' : 'none';
    });
  }

  /* ═══════════════════════ UTILITY METHODS ═══════════════════════ */
  escapeHTML(str) {
    if (!str) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '/': '&#x2F;' };
    return String(str).replace(/[&<>"'/]/g, c => map[c]);
  }

  debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  scrollToBottom(smooth = true) {
    const container = this.dom.messagesContainer;
    if (!container) return;
    if (smooth) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }

  isScrolledToBottom() {
    const c = this.dom.messagesContainer;
    if (!c) return true;
    return c.scrollHeight - c.scrollTop - c.clientHeight < 100;
  }

  autoResize(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  }

  updateCharCounter() {
    const input = this.dom.messageInput;
    const counter = this.dom.charCounter;
    if (!input || !counter) return;
    const len = input.value.length;
    const max = 2000;
    if (len > max * 0.8) {
      counter.classList.add('visible');
      counter.textContent = `${len}/${max}`;
      counter.classList.toggle('warning', len > max * 0.9);
      counter.classList.toggle('danger', len >= max);
    } else {
      counter.classList.remove('visible');
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  timeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(timestamp).toLocaleDateString();
  }

  saveDraft() {
    const text = this.dom.messageInput?.value;
    if (!text) return;
    const key = this.isDM ? `dm_${this.currentDM}` : `room_${this.currentRoom}`;
    this.drafts[key] = text;
    this.saveDrafts();
    this.isDM = false;
    this.currentDM = null;
    if (this.dom.headerRoomDesc) this.dom.headerRoomDesc.style.display = '';
  }
  loadDraftForRoom(room) {
    const key = `room_${room}`;
    const draft = this.drafts[key];
    if (draft && this.dom.messageInput) {
      this.dom.messageInput.value = draft;
      delete this.drafts[key];
      this.saveDrafts();
    }
  }

  /* ═══════════════════════ MISSING METHOD STUBS ═══════════════════════ */

  announce(message) {
    // Accessibility: announce to screen readers via live region
    let liveRegion = document.getElementById('a11y-announcer');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'a11y-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);';
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
    console.log('[announce]', message);
  }

  updatePasswordStrength() {
    const pw = this.dom.regPassword?.value || '';
    const el = this.dom.passwordStrength;
    if (!el) return;
    let strength = 0;
    if (pw.length >= 6) strength++;
    if (pw.length >= 10) strength++;
    if (/[A-Z]/.test(pw)) strength++;
    if (/[0-9]/.test(pw)) strength++;
    if (/[^A-Za-z0-9]/.test(pw)) strength++;
    const levels = ['', 'strength-weak', 'strength-fair', 'strength-good', 'strength-strong', 'strength-strong'];
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    el.className = 'password-strength ' + (levels[strength] || '');
    const text = el.querySelector('.strength-text');
    if (text) text.textContent = labels[strength] || '';
    const fill = el.querySelector('.strength-fill');
    if (fill) fill.style.width = (strength * 20) + '%';
  }

  handleInputKeydown(e) {
    // Autocomplete navigation
    const dropdown = document.getElementById('chatAutocomplete');
    if (dropdown?.classList.contains('active')) {
      const items = [...dropdown.querySelectorAll('.autocomplete-item')];
      const selectedIdx = items.findIndex(i => i.classList.contains('selected'));
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (selectedIdx - 1 + items.length) % items.length;
        items.forEach((item, idx) => item.classList.toggle('selected', idx === prev));
        items[prev]?.scrollIntoView({ block: 'nearest' });
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (selectedIdx + 1) % items.length;
        items.forEach((item, idx) => item.classList.toggle('selected', idx === next));
        items[next]?.scrollIntoView({ block: 'nearest' });
        return;
      }
      if (e.key === 'Tab' || (e.key === 'Enter' && this._autocompleteType === 'mention')) {
        if (items[selectedIdx >= 0 ? selectedIdx : 0]) {
          e.preventDefault();
          items[selectedIdx >= 0 ? selectedIdx : 0].click();
          return;
        }
      }
      if (e.key === 'Escape') {
        e.stopPropagation();
        this.hideChatAutocomplete();
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
    if (e.key === 'Escape') {
      if (this.replyingTo || this.state?.replyingTo) this.cancelReply();
      if (this.editingMessageId || this.state?.editingMessage) this.cancelEdit();
      if (this.pendingUploadFile) this.cancelUploadPreview();
    }
    // Typing indicator
    if (!this.isTyping && this.socket) {
      this.isTyping = true;
      this.socket.emit('typing', { room: this.currentRoom });
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.isTyping = false;
        this.socket.emit('stopTyping', { room: this.currentRoom });
      }, 2000);
    }
  }

  handleInputChange() {
    // Auto-resize textarea
    const input = this.dom.messageInput;
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 200) + 'px';
    // Save draft
    if (input.value) {
      var draftKey = this.isDM ? 'dm_' + this.currentDM : 'room_' + this.currentRoom;
      this.drafts[draftKey] = input.value;
    } else {
      var draftKey2 = this.isDM ? 'dm_' + this.currentDM : 'room_' + this.currentRoom;
      delete this.drafts[draftKey2];
    }
    // Slash command & @mention autocomplete
    if (input.value.startsWith('/')) {
      this.showCommandSuggestions(input.value);
    } else {
      const cursorPos = input.selectionStart;
      const beforeCursor = input.value.substring(0, cursorPos);
      const atMatch = beforeCursor.match(/@(\w*)$/);
      if (atMatch) {
        this.showMentionSuggestions(atMatch[1]);
      } else {
        this.hideChatAutocomplete();
      }
    }
  }

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.recordedChunks = [];
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.recordedChunks.push(e.data);
      };
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        const file = new File([blob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
        this.uploadFile(file);
        stream.getTracks().forEach(t => t.stop());
      };
      this.mediaRecorder.start();
      this.isRecording = true;
      this.dom.voiceBtn?.classList.add('recording');
      this.toast('Recording...', 'info');
    } catch (e) {
      this.toast('Microphone access denied', 'error');
    }
  }

  // stopRecording defined in V5 section below

  handleAddFriend() {
    const input = document.getElementById('friendUsernameInput');
    const username = input?.value?.trim();
    if (!username) { this.toast('Enter a username', 'error'); return; }
    this.socket.emit('friendRequest', { to: username });
    if (input) input.value = '';
    this.toast(`Friend request sent to ${username}`, 'success');
  }

  handleInvite() {
    if (this.selectedInvites.size === 0) { this.toast('Select users to invite', 'error'); return; }
    this.selectedInvites.forEach(user => {
      this.socket.emit('inviteToRoom', { usernames: [user], roomId: this.currentRoom, room: this.currentRoom });
    });
    this.toast(`Invited ${this.selectedInvites.size} user(s)`, 'success');
    this.selectedInvites.clear();
    this.closeModal('inviteModal');
  }

  addPollOption() {
    const container = document.getElementById('pollOptions');
    if (!container) return;
    const count = container.querySelectorAll('.poll-option-row').length;
    if (count >= 10) { this.toast('Maximum 10 options', 'error'); return; }
    const div = document.createElement('div');
    div.className = 'poll-option-row';
    div.innerHTML = `<input type="text" placeholder="Option ${count + 1}" maxlength="50"><button class="remove-opt"><i class="fas fa-xmark"></i></button>`;
    div.querySelector('.remove-opt')?.addEventListener('click', () => div.remove());
    container.appendChild(div);
  }

  handleCreatePoll() {
    const question = document.getElementById('pollQuestion')?.value?.trim();
    const options = Array.from(document.querySelectorAll('#pollOptions .poll-option-row input')).map(i => i.value.trim()).filter(Boolean);
    if (!question) { this.toast('Enter a question', 'error'); return; }
    if (options.length < 2) { this.toast('Add at least 2 options', 'error'); return; }
    this.socket.emit('createPoll', { question, options, room: this.currentRoom });
    this.closeModal('pollModal');
    this.toast('Poll created!', 'success');
  }

  clearCompletedTodos() {
    this.todoList = this.todoList.filter(t => !t.done && !t.completed);
    this.saveTodos();
    this.renderTodos();
    this.toast('Completed todos cleared', 'success');
  }

  handleReport() {
    const reason = document.getElementById('reportCategory')?.value;
    const details = (document.getElementById('reportDescription') || document.getElementById('reportDetails'))?.value?.trim();
    if (!reason) { this.toast('Select a reason', 'error'); return; }
    this.socket.emit('reportUser', {
      reported: this.contextMenuTarget,
      reportedUser: this.contextMenuTarget,
      reason: reason,
      details: details || '',
      room: this.currentRoom
    });
    this.closeModal('reportModal');
    this.toast('Report submitted', 'success');
  }

  addWheelOption() {
    const container = document.getElementById('wheelOptions');
    if (!container) return;
    const count = container.querySelectorAll('.wheel-opt-row').length;
    if (count >= 10) { this.toast('Maximum 10 options', 'error'); return; }
    const row = document.createElement('div');
    row.className = 'wheel-opt-row';
    row.innerHTML = `<input type="text" class="wheel-opt-input" placeholder="Option ${count + 1}" maxlength="30"><button class="remove-opt"><i class="fas fa-xmark"></i></button>`;
    row.querySelector('.remove-opt')?.addEventListener('click', () => row.remove());
    container.appendChild(row);
  }

  renderWheelOptions() {
    // No-op; the wheel options are in the DOM already as .wheel-opt-input
  }

  spinWheel() {
    // Graphical wheel spin
    const canvas = document.getElementById('wheelCanvas');
    const resultDiv = document.getElementById('wheelResult');
    const inputs = document.querySelectorAll('#wheelOptions .wheel-opt-input');
    const options = Array.from(inputs).map(i => i.value.trim()).filter(Boolean);
    if (!canvas || options.length < 2) { this.toast('Add at least 2 options', 'error'); return; }
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height, r = w/2;
    ctx.clearRect(0,0,w,h);
    // Draw wheel
    const n = options.length;
    const angle = 2 * Math.PI / n;
    for (let i = 0; i < n; ++i) {
      ctx.beginPath();
      ctx.moveTo(r, r);
      ctx.arc(r, r, r-2, i*angle, (i+1)*angle);
      ctx.closePath();
      ctx.fillStyle = `hsl(${i*360/n},70%,60%)`;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Label
      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(i*angle + angle/2);
      ctx.textAlign = 'right';
      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#222';
      ctx.fillText(options[i], r-24, 6);
      ctx.restore();
    }
    // Animate spin
    let spinAngle = Math.random() * 6 + 6; // 6-12 full spins
    let current = 0;
    let frame = 0;
    canvas.style.display = 'block';
    resultDiv.style.display = 'none';
    const spin = () => {
      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(current);
      ctx.drawImage(canvas, -r, -r);
      ctx.restore();
      current += spinAngle / 60;
      frame++;
      if (frame < 60) requestAnimationFrame(spin);
      else {
        // Pick winner
        const winnerIdx = Math.floor(((2*Math.PI - (current % (2*Math.PI))) / angle) % n);
        resultDiv.textContent = `Winner: ${options[winnerIdx]}`;
        resultDiv.style.display = 'block';
      }
    };
    spin();
  }

  shareWheel() {
    const inputs = document.querySelectorAll('#wheelOptions .wheel-opt-input');
    const options = [];
    inputs.forEach(inp => { if (inp.value.trim()) options.push(inp.value.trim()); });
    if (options.length < 2) { this.toast('Add at least 2 options', 'error'); return; }
    this.wheelOptions = options;
    this.socket.emit('shareWheel', { options, room: this.currentRoom });
    this.toast('Wheel shared with room!', 'success');
  }

  handleBan() {
    const username = document.getElementById('banUsername')?.value?.trim();
    const duration = document.getElementById('banDuration')?.value;
    const reason = document.getElementById('banReason')?.value?.trim();
    if (!username) { this.toast('Enter a username', 'error'); return; }
    this.socket.emit('banUser', {
      username: username,
      duration: parseInt(duration) || 0,
      reason: reason || 'No reason given'
    });
    this.closeModal('banModal');
    this.toast(`${username} has been banned`, 'success');
  }

  showCommandSuggestions(text) {
    const dropdown = document.getElementById('chatAutocomplete');
    if (!dropdown) return;
    const slashCommands = [
      { cmd: 'shrug',       desc: '¯\\_(ツ)_/¯',               icon: 'fa-face-smile' },
      { cmd: 'tableflip',   desc: '(╯°□°)╯︵ ┻━┻',             icon: 'fa-face-angry' },
      { cmd: 'unflip',      desc: '┬─┬ ノ( ゜-゜ノ)',            icon: 'fa-face-smile' },
      { cmd: 'lenny',       desc: '( ͡° ͜ʖ ͡°)',                 icon: 'fa-face-meh' },
      { cmd: 'disapproval', desc: 'ಠ_ಠ',                         icon: 'fa-face-rolling-eyes' },
      { cmd: 'sparkles',    desc: '✨ wrap text with sparkles',   icon: 'fa-star' },
      { cmd: 'spoiler',     desc: 'Send text as a spoiler',       icon: 'fa-eye-slash' },
      { cmd: 'roll',        desc: 'Roll a random number',         icon: 'fa-dice' },
      { cmd: 'nick',        desc: 'Change your display name',     icon: 'fa-tag' },
      { cmd: 'clear',       desc: 'Clear chat view',              icon: 'fa-eraser' },
      { cmd: 'dm',          desc: 'Open a direct message',        icon: 'fa-envelope' },
      { cmd: 'poll',        desc: 'Create a poll',                icon: 'fa-chart-bar' },
      { cmd: 'todo',        desc: 'Open todo list',               icon: 'fa-list-check' },
      { cmd: 'time',        desc: 'Show current time',            icon: 'fa-clock' },
      { cmd: 'stats',       desc: 'Chat statistics',              icon: 'fa-chart-pie' },
      { cmd: 'help',        desc: 'Show available commands',      icon: 'fa-circle-question' },
    ];
    const query = text.slice(1).split(' ')[0].toLowerCase();
    const filtered = query === '' ? slashCommands : slashCommands.filter(c => c.cmd.startsWith(query));
    if (filtered.length === 0) { this.hideChatAutocomplete(); return; }
    dropdown.innerHTML = filtered.map((c, i) => `
      <div class="autocomplete-item ${i === 0 ? 'selected' : ''}" data-cmd="${c.cmd}">
        <i class="fas ${c.icon}" style="width:16px;text-align:center;color:var(--accent);flex-shrink:0"></i>
        <span><strong>/${c.cmd}</strong></span>
        <span class="autocomplete-detail">${c.desc}</span>
      </div>
    `).join('');
    dropdown.classList.add('active');
    this._autocompleteType = 'command';
    dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('mousedown', (e) => { e.preventDefault(); });
      item.addEventListener('click', () => {
        const input = this.dom.messageInput;
        if (!input) return;
        const parts = input.value.split(' ');
        input.value = '/' + item.dataset.cmd + (parts.length > 1 ? ' ' + parts.slice(1).join(' ') : ' ');
        this.hideChatAutocomplete();
        input.focus();
      });
    });
  }

  showMentionSuggestions(query) {
    const dropdown = document.getElementById('chatAutocomplete');
    if (!dropdown) return;
    const allUsers = this.state?.users || [];
    const q = query.toLowerCase();
    const matches = allUsers
      .filter(u => { const n = u.username || u; return n.toLowerCase().includes(q); })
      .slice(0, 8);
    if (matches.length === 0) { this.hideChatAutocomplete(); return; }
    dropdown.innerHTML = matches.map((u, i) => {
      const name = u.username || u;
      const avatar = this.getAvatarUrl(name);
      return `
        <div class="autocomplete-item ${i === 0 ? 'selected' : ''}" data-mention="${this.escapeHTML(name)}">
          <img class="avatar" src="${avatar}" onerror="this.src='/uploads/default-avatar.png'" style="width:24px;height:24px;border-radius:50%;flex-shrink:0">
          <span>@${this.escapeHTML(name)}</span>
        </div>
      `;
    }).join('');
    dropdown.classList.add('active');
    this._autocompleteType = 'mention';
    dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('mousedown', (e) => { e.preventDefault(); });
      item.addEventListener('click', () => this.insertMention(item.dataset.mention));
    });
  }

  insertMention(username) {
    const input = this.dom.messageInput;
    if (!input) return;
    const text = input.value;
    const cursorPos = input.selectionStart;
    const beforeCursor = text.substring(0, cursorPos);
    const afterCursor = text.substring(cursorPos);
    const atIdx = beforeCursor.lastIndexOf('@');
    if (atIdx >= 0) {
      input.value = beforeCursor.substring(0, atIdx) + '@' + username + ' ' + afterCursor;
      input.selectionStart = input.selectionEnd = atIdx + username.length + 2;
    }
    this.hideChatAutocomplete();
    input.focus();
  }

  hideChatAutocomplete() {
    document.getElementById('chatAutocomplete')?.classList.remove('active');
    this._autocompleteType = null;
  }

  /* ═══════════════════════ SOUNDS ═══════════════════════ */
  playSound(type) {
    if (this.settings?.sound === false) return;
    const sounds = {
      message: [440, 0.1],
      notification: [660, 0.15],
      levelup: [880, 0.3],
      error: [220, 0.2],
      join: [550, 0.08],
      leave: [330, 0.08]
    };
    const [freq, dur] = sounds[type] || [440, 0.1];
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + dur);
    } catch (e) {}
  }

  /* ═══════════════════════ DESKTOP NOTIFICATIONS ═══════════════════════ */
  showDesktopNotification(title, body, tag) {
    if (document.hasFocus()) return;
    if (Notification.permission !== 'granted') return;
    try {
      const n = new Notification(title, {
        body: (body || '').substring(0, 100),
        tag: tag || 'redchat',
        icon: '/uploads/default-avatar.png',
        silent: false
      });
      n.onclick = () => { window.focus(); n.close(); };
      setTimeout(() => n.close(), 5000);
    } catch (e) {}
  }

  /* ═══════════════════════ TOAST ═══════════════════════ */
  toast(message, type = 'info', duration = 3000) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: 'check-circle', error: 'exclamation-circle', warning: 'exclamation-triangle', info: 'info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas fa-${icons[type] || 'info-circle'}"></i>
      <span>${this.escapeHTML(message)}</span>
      <button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
    return toast;
  }

  /* ═══════════════════════ KEYBOARD SHORTCUTS ═══════════════════════ */
  handleEscape() {
    // Close modals, menus, panels in priority order
    const openModal = document.querySelector('.modal-overlay[style*="flex"]');
    if (openModal) { this.closeModal(); return; }
    const activeCtx = document.querySelector('.context-menu.active');
    if (activeCtx) { activeCtx.classList.remove('active'); return; }
    const statusPicker = document.getElementById('statusPicker');
    if (statusPicker?.classList.contains('active')) { statusPicker.classList.remove('active'); statusPicker.style.display = 'none'; return; }
    const searchPanel = document.querySelector('.search-results-panel.active');
    if (searchPanel) { searchPanel.classList.remove('active'); return; }
    if (this.editingMessageId) {
      this.editingMessageId = null;
      this.dom.editBar?.classList.remove('active');
      this.dom.messageInput.value = '';
      return;
    }
    if (this.replyingTo) {
      this.replyingTo = null;
      document.querySelector('.reply-bar')?.classList.remove('active');
      return;
    }
    this.closeMembers();
    this.closeSidebar();
  }

  /* ═══════════════════════ DRAG & DROP ═══════════════════════ */
  setupDragDrop() {
    const app = document.querySelector('.app-container');
    const overlay = this.dom.dragOverlay;
    if (!app || !overlay) return;

    let dragCounter = 0;
    app.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragCounter++;
      overlay.classList.add('active');
    });
    app.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) { overlay.classList.remove('active'); dragCounter = 0; }
    });
    app.addEventListener('dragover', (e) => e.preventDefault());
    app.addEventListener('drop', (e) => {
      e.preventDefault();
      dragCounter = 0;
      overlay.classList.remove('active');
      const files = e.dataTransfer?.files;
      if (files?.length > 0) this.uploadFile(files[0]);
    });
  }

  /* ═══════════════════════ PASTE UPLOAD ═══════════════════════ */
  setupPasteUpload() {
    this.dom.messageInput?.addEventListener('paste', (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) this.uploadFile(file);
          break;
        }
      }
    });
  }

  /* ═══════════════════════ VOICE RECORDING ═══════════════════════ */
  async toggleVoiceRecording() {
    if (this.recording) {
      this.mediaRecorder?.stop();
      this.recording = false;
      document.getElementById('voiceBtn')?.classList.remove('recording');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      const chunks = [];
      
      this.mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
        this.uploadFile(file);
        stream.getTracks().forEach(t => t.stop());
      };
      
      this.mediaRecorder.start();
      this.recording = true;
      document.getElementById('voiceBtn')?.classList.add('recording');
      this.toast('Recording... click again to stop', 'info');
    } catch (e) {
      this.toast('Microphone access denied', 'error');
    }
  }

  /* ═══════════════════════ THEME ═══════════════════════ */
  setTheme(theme) {
    document.body.className = `${theme}-mode`;
    this.settings.theme = theme;
    this.saveLocalSettings();
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',
      theme === 'light' ? '#ffffff' : theme === 'midnight' ? '#0a0e1a' : theme === 'amoled' ? '#000000' : '#1e1f22'
    );
  }

  /* ═══════════════════════ CONFETTI ANIMATION KEYFRAMES ═══════════════════════ */
  injectAnimations() {
    if (document.getElementById('redchat-animations')) return;
    const style = document.createElement('style');
    style.id = 'redchat-animations';
    style.textContent = `
      @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ═══════════════════════ INIT ═══════════════════════ */
  init() {
    this.applySavedTheme();
    this.loadLocalSettings();
    this.loadTodos();
    this.loadFavorites();
    this.loadMuted();
    this.loadDrafts();
    this.loadUserNotes();
    this.loadEmojiRecent();
    this.initIdleDetection();
    this.startConnectionMonitor();
    this.initPerformanceTracking();
    this.injectAnimations();
    this.setupDragDrop();
    this.setupPasteUpload();

    // V5 feature inits — wrapped in try/catch to prevent black screen
    const v5Inits = [
      'loadBlockList', 'initScheduledMessages', 'initNotificationCenter',
      'initExploreTab', 'initMediaGallery', 'initChatStats',
      'initMessageFilters', 'initEmojiAutocomplete', 'initRoomCategories', 'initIdleDetectionV5',
      'initNotificationGrouping', 'initThemeScheduler', 'initInputHistory',
      'initTimestampTooltips', 'initSelectionToolbar', 'initPerformanceMonitor',
      'initRetryManager', 'initSmartReplies', 'initLinkPreviews',
      'initAutoSave', 'initPresenceTracker', 'initSessionAnalytics',
      'checkInviteInUrl'
    ];
    v5Inits.forEach(fn => {
      try {
        if (typeof this[fn] === 'function') this[fn]();
      } catch (e) {
        console.warn(`[RedChat] v5 init '${fn}' failed:`, e.message);
      }
    });

    // Auto-login
    const saved = localStorage.getItem('redchat_token');
    if (saved) {
      this.socket.emit('autoLogin', { username: saved });
    }

    // Listen for visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.saveDraft();
    });

    // Responsive sidebar behavior
    window.addEventListener('resize', this.debounce(() => {
      if (window.innerWidth >= 768) {
        this.closeSidebar();
        document.body.style.overflow = '';
      }
    }, 200));

    console.log('%c🔴 RedChat v5.0 loaded', 'color: #5865f2; font-size: 16px; font-weight: bold');
  }

  /* ═══════════════════════ V5 THREAD SYSTEM ═══════════════════════ */
  openThread(messageId) {
    this.state.activeThread = messageId;
    const msg = this.findMessageById(messageId);
    if (!msg) return;
    const threadPanel = document.getElementById('threadPanel');
    if (!threadPanel) {
      this.createThreadPanel();
    }
    this.loadThreadReplies(messageId);
    document.getElementById('threadPanel')?.classList.add('active');
    this.announce('Thread opened');
  }

  createThreadPanel() {
    const panel = document.createElement('div');
    panel.id = 'threadPanel';
    panel.className = 'thread-panel';
    panel.innerHTML = `
      <div class="thread-header">
        <h3><i class="fas fa-comments"></i> Thread</h3>
        <button class="thread-close" onclick="app.closeThread()"><i class="fas fa-times"></i></button>
      </div>
      <div class="thread-messages" id="threadMessages"></div>
      <div class="thread-input-area">
        <textarea id="threadInput" placeholder="Reply to thread..." rows="1"></textarea>
        <button class="thread-send" id="threadSend"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;
    document.querySelector('.chat-area')?.appendChild(panel);
    const threadInput = document.getElementById('threadInput');
    const threadSend = document.getElementById('threadSend');
    if (threadInput) {
      threadInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendThreadReply();
        }
      });
    }
    if (threadSend) {
      threadSend.addEventListener('click', () => this.sendThreadReply());
    }
  }

  loadThreadReplies(parentId) {
    this.socket.emit('getThreadReplies', { messageId: parentId });
  }

  sendThreadReply() {
    const input = document.getElementById('threadInput');
    if (!input || !input.value.trim()) return;
    this.socket.emit('threadReply', {
      parentId: this.state.activeThread,
      text: input.value.trim(),
      room: this.currentRoom
    });
    input.value = '';
    this.autoResize(input);
  }

  handleThreadReplies(data) {
    const container = document.getElementById('threadMessages');
    if (!container) return;
    container.innerHTML = '';
    if (data.parent) {
      const parentEl = this.createThreadMessage(data.parent, true);
      container.appendChild(parentEl);
      const divider = document.createElement('div');
      divider.className = 'thread-divider';
      divider.innerHTML = `<span>${(data.replies || []).length} replies</span>`;
      container.appendChild(divider);
    }
    (data.replies || []).forEach(reply => {
      container.appendChild(this.createThreadMessage(reply, false));
    });
    container.scrollTop = container.scrollHeight;
  }

  createThreadMessage(msg, isParent) {
    const div = document.createElement('div');
    div.className = `thread-message ${isParent ? 'parent' : 'reply'}`;
    const avatarUrl = this.getAvatarUrl(msg.username);
    div.innerHTML = `
      <img class="thread-msg-avatar" src="${avatarUrl}" alt="${this.escapeHTML(msg.username)}">
      <div class="thread-msg-content">
        <div class="thread-msg-header">
          <span class="thread-msg-author">${this.escapeHTML(msg.username)}</span>
          <span class="thread-msg-time">${this.timeAgo(msg.timestamp)}</span>
        </div>
        <div class="thread-msg-text">${this.formatText(msg.text || '')}</div>
      </div>
    `;
    return div;
  }

  closeThread() {
    this.state.activeThread = null;
    document.getElementById('threadPanel')?.classList.remove('active');
  }

  /* ═══════════════════════ V5 SCHEDULED MESSAGES ═══════════════════════ */
  initScheduledMessages() {
    this.state.scheduledMessages = JSON.parse(localStorage.getItem('redchat_scheduled') || '[]');
    this.scheduledTimer = setInterval(() => this.checkScheduledMessages(), 30000);
  }

  scheduleMessage(text, scheduledTime, room) {
    const scheduled = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      text,
      scheduledTime: new Date(scheduledTime).getTime(),
      room,
      createdAt: Date.now()
    };
    this.state.scheduledMessages.push(scheduled);
    localStorage.setItem('redchat_scheduled', JSON.stringify(this.state.scheduledMessages));
    this.toast(`Message scheduled for ${new Date(scheduledTime).toLocaleString()}`, 'success');
    this.socket.emit('scheduleMessage', {
      ...scheduled,
      message: scheduled.text,
      scheduledAt: scheduled.scheduledTime
    });
    return scheduled;
  }

  checkScheduledMessages() {
    const now = Date.now();
    const due = this.state.scheduledMessages.filter(m => m.scheduledTime <= now);
    due.forEach(msg => {
      if (msg.room === this.currentRoom) {
        this.sendMessage(msg.text);
      } else {
        this.socket.emit('sendScheduledMessage', msg);
      }
      this.state.scheduledMessages = this.state.scheduledMessages.filter(m => m.id !== msg.id);
    });
    if (due.length > 0) {
      localStorage.setItem('redchat_scheduled', JSON.stringify(this.state.scheduledMessages));
    }
  }

  cancelScheduledMessage(id) {
    this.state.scheduledMessages = this.state.scheduledMessages.filter(m => m.id !== id);
    localStorage.setItem('redchat_scheduled', JSON.stringify(this.state.scheduledMessages));
    this.socket.emit('cancelScheduledMessage', { id, messageId: id });
    this.toast('Scheduled message cancelled', 'info');
  }

  renderScheduledMessages() {
    const container = document.getElementById('scheduledList');
    if (!container) return;
    const msgs = this.state.scheduledMessages.sort((a, b) => a.scheduledTime - b.scheduledTime);
    if (msgs.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-clock"></i><p>No scheduled messages</p></div>';
      return;
    }
    container.innerHTML = msgs.map(m => `
      <div class="scheduled-item" data-id="${m.id}">
        <div class="scheduled-info">
          <div class="scheduled-text">${this.escapeHTML(m.text.substring(0, 100))}</div>
          <div class="scheduled-meta">
            <span><i class="fas fa-hashtag"></i> ${this.escapeHTML(m.room || 'Unknown')}</span>
            <span><i class="fas fa-clock"></i> ${new Date(m.scheduledTime).toLocaleString()}</span>
          </div>
        </div>
        <button class="scheduled-cancel" onclick="app.cancelScheduledMessage('${m.id}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
  }

  /* ═══════════════════════ V5 CUSTOM STATUS ═══════════════════════ */
  setCustomStatus(emoji, text, clearAfter = null) {
    this.state.customStatus = { emoji, text, clearAfter };
    this.socket.emit('setStatus', { status: 'online', customStatus: { emoji, text } });
    if (clearAfter) {
      setTimeout(() => this.clearCustomStatus(), clearAfter * 60000);
    }
    this.updateStatusDisplay();
    this.toast('Status updated', 'success');
  }

  clearCustomStatus() {
    this.state.customStatus = null;
    this.socket.emit('setStatus', { status: 'online', customStatus: null });
    this.updateStatusDisplay();
  }

  updateStatusDisplay() {
    const statusEl = this.dom.userStatus;
    if (!statusEl) return;
    if (this.state.customStatus?.text) {
      statusEl.textContent = `${this.state.customStatus.emoji || ''} ${this.state.customStatus.text}`;
    } else {
      statusEl.textContent = this.state.currentStatus || 'Online';
    }
  }

  /* ═══════════════════════ V5 ROOM INVITES ═══════════════════════ */
  generateRoomInvite(room, options = {}) {
    this.socket.emit('createInvite', {
      room,
      maxUses: options.maxUses || 0,
      expiresIn: options.expiresIn || 86400000
    });
  }

  handleInviteCreated(data) {
    const code = data.code;
    const inviteUrl = `${window.location.origin}?invite=${code}`;
    this.showInviteLinkDialog(inviteUrl, code);
  }

  showInviteLinkDialog(url, code) {
    const dialog = document.createElement('div');
    dialog.className = 'invite-dialog';
    dialog.innerHTML = `
      <div class="invite-dialog-content">
        <h3><i class="fas fa-link"></i> Room Invite</h3>
        <div class="invite-link-box">
          <input type="text" value="${url}" readonly id="inviteLinkInput">
          <button class="copy-invite-btn" id="copyInviteBtn"><i class="fas fa-copy"></i></button>
        </div>
        <p class="invite-code">Code: <strong>${code}</strong></p>
        <button class="invite-close-btn" id="closeInviteDialog">Close</button>
      </div>
    `;
    document.body.appendChild(dialog);
    document.getElementById('copyInviteBtn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(url);
      this.toast('Invite link copied!', 'success');
    });
    document.getElementById('closeInviteDialog')?.addEventListener('click', () => {
      dialog.remove();
    });
  }

  checkInviteInUrl() {
    const params = new URLSearchParams(window.location.search);
    const invite = params.get('invite');
    if (invite) {
      this.state.pendingInvite = invite;
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  processPendingInvite() {
    if (this.state.pendingInvite) {
      this.socket.emit('joinViaInvite', { code: this.state.pendingInvite });
      this.state.pendingInvite = null;
    }
  }

  /* ═══════════════════════ V5 BLOCK LIST ═══════════════════════ */
  blockUser(username) {
    if (!this.state.blockedUsers) this.state.blockedUsers = new Set();
    this.state.blockedUsers.add(username);
    this.socket.emit('blockUser', { username, targetUsername: username });
    this.saveBlockList();
    this.toast(`Blocked ${username}`, 'info');
    this.refreshMessages();
  }

  unblockUser(username) {
    if (!this.state.blockedUsers) return;
    this.state.blockedUsers.delete(username);
    this.socket.emit('unblockUser', { username, targetUsername: username });
    this.saveBlockList();
    this.toast(`Unblocked ${username}`, 'info');
    this.refreshMessages();
  }

  isBlocked(username) {
    return this.state.blockedUsers?.has(username) || false;
  }

  saveBlockList() {
    const list = Array.from(this.state.blockedUsers || []);
    localStorage.setItem('redchat_blocked', JSON.stringify(list));
  }

  loadBlockList() {
    try {
      const list = JSON.parse(localStorage.getItem('redchat_blocked') || '[]');
      this.state.blockedUsers = new Set(list);
    } catch { this.state.blockedUsers = new Set(); }
  }

  renderBlockList() {
    const container = document.getElementById('blockListContainer');
    if (!container) return;
    const blocked = Array.from(this.state.blockedUsers || []);
    if (blocked.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-shield-alt"></i><p>No blocked users</p></div>';
      return;
    }
    container.innerHTML = blocked.map(u => `
      <div class="block-item">
        <img class="avatar" src="${this.getAvatarUrl(u)}" alt="${this.escapeHTML(u)}">
        <span class="block-name">${this.escapeHTML(u)}</span>
        <button class="unblock-btn" onclick="app.unblockUser('${this.escapeHTML(u)}')">Unblock</button>
      </div>
    `).join('');
  }

  refreshMessages() {
    if (!this.currentRoom) return;
    const container = this.dom.messagesContainer;
    if (!container) return;
    const msgs = container.querySelectorAll('.message');
    msgs.forEach(msg => {
      const author = msg.querySelector('.msg-author')?.textContent;
      if (author && this.isBlocked(author)) {
        msg.style.display = 'none';
      } else {
        msg.style.display = '';
      }
    });
  }

  /* ═══════════════════════ V5 READ RECEIPTS ═══════════════════════ */
  markAsRead(room) {
    if (!room) return;
    this.socket.emit('markRead', { room });
    if (this.state.unreadCounts) {
      delete this.state.unreadCounts[room];
    }
    this.updateUnreadBadges();
  }

  handleReadReceipt(data) {
    if (!data.room || !data.username) return;
    if (!this.state.readReceipts) this.state.readReceipts = {};
    if (!this.state.readReceipts[data.room]) this.state.readReceipts[data.room] = {};
    this.state.readReceipts[data.room][data.username] = data.timestamp;
    this.updateReadReceiptIndicators(data.room);
  }

  updateReadReceiptIndicators(room) {
    if (room !== this.currentRoom) return;
    const receipts = this.state.readReceipts?.[room] || {};
    const messages = this.dom.messagesContainer?.querySelectorAll('.message');
    if (!messages) return;
    messages.forEach(msg => {
      const ts = parseInt(msg.dataset.timestamp);
      const existingReceipt = msg.querySelector('.read-receipt');
      if (existingReceipt) existingReceipt.remove();
      const readers = Object.entries(receipts)
        .filter(([user, readTs]) => readTs >= ts && user !== this.username)
        .map(([user]) => user);
      if (readers.length > 0) {
        const indicator = document.createElement('div');
        indicator.className = 'read-receipt';
        if (readers.length <= 3) {
          indicator.innerHTML = readers.map(u =>
            `<img class="read-receipt-avatar" src="${this.getAvatarUrl(u)}" title="${this.escapeHTML(u)}">`
          ).join('');
        } else {
          indicator.innerHTML = readers.slice(0, 2).map(u =>
            `<img class="read-receipt-avatar" src="${this.getAvatarUrl(u)}" title="${this.escapeHTML(u)}">`
          ).join('') + `<span class="read-receipt-more">+${readers.length - 2}</span>`;
        }
        msg.querySelector('.msg-content')?.appendChild(indicator);
      }
    });
  }

  updateUnreadBadges() {
    if (!this.state.unreadCounts) this.state.unreadCounts = {};
    document.querySelectorAll('.room-item').forEach(item => {
      const room = item.dataset.room;
      const badge = item.querySelector('.room-badge');
      const count = this.state.unreadCounts[room] || 0;
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      }
    });
    // Update mobile nav badges
    let totalUnread = Object.values(this.state.unreadCounts).reduce((a, b) => a + b, 0);
    const navBadge = document.querySelector('#mobileNavChannels .nav-badge');
    if (navBadge) {
      navBadge.textContent = totalUnread;
      navBadge.style.display = totalUnread > 0 ? 'flex' : 'none';
    }
  }

  /* ═══════════════════════ V5 NOTIFICATION CENTER ═══════════════════════ */
  initNotificationCenter() {
    this.state.notifications = this.state.notifications || [];
    this.state.notifFilter = 'all';
    this.updateNotifBadge();
  }

  addNotificationV5(notif) {
    const notification = {
      id: Date.now().toString(36),
      type: notif.type || 'info',
      title: notif.title || 'Notification',
      body: notif.body || '',
      timestamp: Date.now(),
      read: false,
      action: notif.action || null,
      avatar: notif.avatar || null
    };
    this.state.notifications.unshift(notification);
    if (this.state.notifications.length > 100) {
      this.state.notifications = this.state.notifications.slice(0, 100);
    }
    this.updateNotifBadge();
    this.playSound('notification');
    if (document.getElementById('notifCenterModal')?.classList.contains('active')) {
      this.renderNotifications();
    }
    if (!document.hidden) {
      this.showDesktopNotification(notification.title, notification.body);
    }
  }

  filterNotifications(filter) {
    this.state.notifFilter = filter;
    document.querySelectorAll('#notifCenterModal .filter-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.filter === filter);
    });
    this.renderNotifications();
  }

  markAllNotificationsRead() {
    this.state.notifications.forEach(n => n.read = true);
    this.updateNotifBadge();
    this.renderNotifications();
    this.toast('All notifications marked as read', 'info');
  }

  clearAllNotifications() {
    this.state.notifications = [];
    this.updateNotifBadge();
    this.renderNotifications();
    this.toast('Notifications cleared', 'info');
  }

  /* ═══════════════════════ V5 EXPLORE TAB ═══════════════════════ */
  initExploreTab() {
    this.state.exploreRooms = [];
    this.state.trendingTags = [];
    this.loadExploreData();
  }

  loadExploreData() {
    this.socket.emit('browseRooms', { category: 'all' });
    this.socket.emit('getTrendingTags');
  }

  handleBrowseRooms(data) {
    this.state.exploreRooms = data.rooms || [];
    this.renderExploreRooms();
  }

  handleTrendingTags(data) {
    this.state.trendingTags = data.tags || [];
    this.renderTrendingTags();
  }

  renderExploreRooms() {
    const container = document.getElementById('exploreRoomsList');
    if (!container) return;
    const rooms = this.state.exploreRooms;
    if (rooms.length === 0) {
      container.innerHTML = '<div class="sidebar-empty-state"><i class="fas fa-compass"></i><h4>No rooms found</h4><p>Create one to get started!</p></div>';
      return;
    }
    container.innerHTML = rooms.map(r => `
      <div class="explore-room-card" data-room="${this.escapeHTML(r.name)}" onclick="app.joinRoom('${this.escapeHTML(r.name)}')">
        <div class="explore-room-icon"><i class="fas fa-${r.category === 'gaming' ? 'gamepad' : r.category === 'music' ? 'music' : r.category === 'tech' ? 'code' : 'hashtag'}"></i></div>
        <div class="explore-room-info">
          <div class="explore-room-name">${this.escapeHTML(r.name)}</div>
          <div class="explore-room-members"><i class="fas fa-users"></i> ${r.members || r.userCount || 0} members</div>
        </div>
      </div>
    `).join('');
  }

  renderTrendingTags() {
    const container = document.getElementById('trendingTags');
    if (!container) return;
    if (this.state.trendingTags.length === 0) {
      container.innerHTML = '<span class="trending-tag">#general</span><span class="trending-tag">#random</span><span class="trending-tag">#help</span>';
      return;
    }
    container.innerHTML = this.state.trendingTags.map(tag =>
      `<span class="trending-tag" onclick="app.searchByTag('${this.escapeHTML(tag)}')">#${this.escapeHTML(tag)}</span>`
    ).join('');
  }

  searchByTag(tag) {
    this.switchSidebarTab('explore');
    const search = document.getElementById('exploreSearch');
    if (search) {
      search.value = tag;
      this.filterExploreRooms(tag);
    }
  }

  filterExploreRooms(query) {
    const q = query.toLowerCase();
    const container = document.getElementById('exploreRoomsList');
    if (!container) return;
    const cards = container.querySelectorAll('.explore-room-card');
    cards.forEach(card => {
      const name = card.dataset.room?.toLowerCase() || '';
      card.style.display = name.includes(q) ? '' : 'none';
    });
  }

  /* ═══════════════════════ V5 MEDIA GALLERY ═══════════════════════ */
  initMediaGallery() {
    this.state.mediaCache = new Map();
  }

  loadMediaGalleryV5() {
    this.socket.emit('getMediaGallery', { room: this.currentRoom });
  }

  handleMediaGallery(data) {
    this.state.mediaCache.set(this.currentRoom, data.media || []);
    this.renderMediaGalleryV5(data.media || []);
  }

  renderMediaGalleryV5(media) {
    const container = document.getElementById('galleryGrid');
    if (!container) return;
    if (media.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-images"></i><p>No media shared yet</p></div>';
      return;
    }
    const images = media.filter(m => m.type === 'image');
    const videos = media.filter(m => m.type === 'video');
    const files = media.filter(m => m.type === 'file');
    container.innerHTML = `
      <div class="gallery-section">
        <h4>Images (${images.length})</h4>
        <div class="gallery-grid">
          ${images.map(img => `
            <div class="gallery-thumb" onclick="app.openImageViewer('${img.url}')">
              <img src="${img.url}" alt="media" loading="lazy">
              <div class="gallery-thumb-overlay">
                <span>${this.timeAgo(img.timestamp)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ${videos.length ? `
      <div class="gallery-section">
        <h4>Videos (${videos.length})</h4>
        <div class="gallery-grid">
          ${videos.map(vid => `
            <div class="gallery-thumb video">
              <video src="${vid.url}" preload="metadata"></video>
              <div class="gallery-play-btn"><i class="fas fa-play"></i></div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
      ${files.length ? `
      <div class="gallery-section">
        <h4>Files (${files.length})</h4>
        <div class="gallery-file-list">
          ${files.map(f => `
            <a class="gallery-file-item" href="${f.url}" target="_blank">
              <i class="fas fa-file"></i>
              <span>${this.escapeHTML(f.name || 'file')}</span>
              <span class="file-size">${this.formatFileSize(f.size || 0)}</span>
            </a>
          `).join('')}
        </div>
      </div>` : ''}
    `;
  }

  /* ═══════════════════════ V5 CHAT STATISTICS ═══════════════════════ */
  initChatStats() {
    this.state.sessionStats = {
      messagesSent: 0,
      messagesReceived: 0,
      reactionsGiven: 0,
      filesShared: 0,
      sessionStart: Date.now(),
      roomsVisited: new Set(),
      wordsTyped: 0,
      emojisUsed: 0,
      commandsUsed: 0,
      peakOnlineUsers: 0
    };
  }

  trackStat(stat, value = 1) {
    if (this.state.sessionStats && stat in this.state.sessionStats) {
      if (this.state.sessionStats[stat] instanceof Set) {
        this.state.sessionStats[stat].add(value);
      } else {
        this.state.sessionStats[stat] += value;
      }
    }
  }

  loadChatStatsV5() {
    this.socket.emit('getChatStats', { room: this.currentRoom });
  }

  handleChatStatsResponse(data) {
    this.renderChatStatsV5(data);
  }

  renderChatStatsV5(data) {
    const container = document.getElementById('statsContent');
    if (!container) return;
    const session = this.state.sessionStats;
    const sessionDuration = Math.floor((Date.now() - session.sessionStart) / 60000);
    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card accent">
          <i class="fas fa-chart-line"></i>
          <div class="stat-value">${data.totalMessages || 0}</div>
          <div class="stat-label">Total Messages</div>
        </div>
        <div class="stat-card success">
          <i class="fas fa-users"></i>
          <div class="stat-value">${data.totalUsers || 0}</div>
          <div class="stat-label">Total Users</div>
        </div>
        <div class="stat-card warning">
          <i class="fas fa-door-open"></i>
          <div class="stat-value">${data.totalRooms || 0}</div>
          <div class="stat-label">Active Rooms</div>
        </div>
        <div class="stat-card danger">
          <i class="fas fa-fire"></i>
          <div class="stat-value">${data.messagesPerHour || 0}</div>
          <div class="stat-label">Msgs/Hour</div>
        </div>
      </div>
      <div class="stats-section">
        <h4>Your Session</h4>
        <div class="session-stats">
          <div class="session-stat"><span>Duration</span><span>${sessionDuration} min</span></div>
          <div class="session-stat"><span>Messages Sent</span><span>${session.messagesSent}</span></div>
          <div class="session-stat"><span>Messages Received</span><span>${session.messagesReceived}</span></div>
          <div class="session-stat"><span>Reactions Given</span><span>${session.reactionsGiven}</span></div>
          <div class="session-stat"><span>Files Shared</span><span>${session.filesShared}</span></div>
          <div class="session-stat"><span>Words Typed</span><span>${session.wordsTyped}</span></div>
          <div class="session-stat"><span>Rooms Visited</span><span>${session.roomsVisited.size}</span></div>
        </div>
      </div>
      ${data.topUsers ? `
      <div class="stats-section">
        <h4>Top Users</h4>
        <div class="leaderboard">
          ${data.topUsers.slice(0, 10).map((u, i) => `
            <div class="leaderboard-item">
              <span class="leaderboard-rank">${i + 1}</span>
              <img class="avatar" src="${this.getAvatarUrl(u.username)}" alt="">
              <span class="leaderboard-name">${this.escapeHTML(u.username)}</span>
              <span class="leaderboard-score">${u.messages || u.xp || 0}</span>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
    `;
  }

  /* ═══════════════════════ V5 MESSAGE FILTERING ═══════════════════════ */
  initMessageFilters() {
    this.state.messageFilter = null;
    this.state.messageFilterType = 'all';
  }

  setMessageFilter(type) {
    this.state.messageFilterType = type;
    this.applyMessageFilters();
    document.querySelectorAll('.search-filters .filter-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.filter === type);
    });
  }

  applyMessageFilters() {
    const type = this.state.messageFilterType;
    const container = this.dom.messagesContainer;
    if (!container) return;
    const messages = container.querySelectorAll('.message');
    messages.forEach(msg => {
      if (type === 'all') {
        msg.style.display = '';
        return;
      }
      const hasImage = msg.querySelector('.msg-image');
      const hasFile = msg.querySelector('.msg-file');
      const hasLink = msg.querySelector('a[href]');
      switch (type) {
        case 'images': msg.style.display = hasImage ? '' : 'none'; break;
        case 'files': msg.style.display = hasFile ? '' : 'none'; break;
        case 'links': msg.style.display = hasLink ? '' : 'none'; break;
        case 'mentions': msg.style.display = msg.querySelector('.mention') ? '' : 'none'; break;
        default: msg.style.display = '';
      }
    });
  }

  clearMessageFilters() {
    this.state.messageFilterType = 'all';
    this.applyMessageFilters();
  }

  /* ═══════════════════════ V5 LINK PREVIEW ═══════════════════════ */
  initLinkPreviews() {
    this.state.linkPreviewCache = new Map();
  }

  async fetchLinkPreview(url) {
    if (this.state.linkPreviewCache.has(url)) {
      return this.state.linkPreviewCache.get(url);
    }
    try {
      const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const data = await response.json();
        this.state.linkPreviewCache.set(url, data);
        return data;
      }
    } catch (e) {
      console.debug('Link preview fetch failed:', e);
    }
    return null;
  }

  async renderLinkPreviews(msgElement) {
    const links = msgElement.querySelectorAll('.msg-text a[href]');
    for (const link of links) {
      const url = link.href;
      if (!url.startsWith('http')) continue;
      if (msgElement.querySelector(`.link-preview[data-url="${CSS.escape(url)}"]`)) continue;
      const preview = await this.fetchLinkPreview(url);
      if (preview && preview.title) {
        const previewEl = document.createElement('div');
        previewEl.className = 'link-preview';
        previewEl.dataset.url = url;
        previewEl.innerHTML = `
          <div class="link-preview-color"></div>
          <div class="link-preview-content">
            ${preview.siteName ? `<div class="link-preview-site">${this.escapeHTML(preview.siteName)}</div>` : ''}
            <a class="link-preview-title" href="${url}" target="_blank">${this.escapeHTML(preview.title)}</a>
            ${preview.description ? `<div class="link-preview-desc">${this.escapeHTML(preview.description.substring(0, 200))}</div>` : ''}
          </div>
          ${preview.image ? `<img class="link-preview-image" src="${preview.image}" alt="" loading="lazy">` : ''}
        `;
        msgElement.querySelector('.msg-content')?.appendChild(previewEl);
      }
    }
  }

  /* ═══════════════════════ V5 AUTO DRAFT SAVE ═══════════════════════ */
  initAutoSave() {
    this.state.drafts = this.loadDrafts() || {};
    this.autoSaveInterval = setInterval(() => this.saveDraft(), 5000);
  }

  saveDraftV5() {
    if (!this.currentRoom || !this.dom.messageInput) return;
    const text = this.dom.messageInput.value;
    if (text.trim()) {
      this.state.drafts[this.currentRoom] = {
        text,
        timestamp: Date.now(),
        replyTo: this.state.replyingTo || null
      };
    } else {
      delete this.state.drafts[this.currentRoom];
    }
    this.saveDrafts();
  }

  loadDraftForRoomV5(room) {
    const draft = this.state.drafts?.[room];
    if (draft && this.dom.messageInput) {
      this.dom.messageInput.value = draft.text;
      this.autoResize(this.dom.messageInput);
      if (draft.replyTo) {
        this.state.replyingTo = draft.replyTo;
      }
      this.toast('Draft restored', 'info');
    }
  }

  /* ═══════════════════════ V5 SMART REPLIES ═══════════════════════ */
  initSmartReplies() {
    this.smartReplyPatterns = [
      { match: /\b(hello|hi|hey|sup|yo)\b/i, replies: ['Hey!', 'Hello! 👋', 'Hey, how are you?', 'Hi there!'] },
      { match: /how are you|how's it going|what's up/i, replies: ['I\'m good, thanks!', 'Doing great! You?', 'Not bad! 😊', 'All good here'] },
      { match: /\bthanks?\b|\bthank you\b/i, replies: ['You\'re welcome!', 'No problem! 👍', 'Anytime!', 'Happy to help!'] },
      { match: /\?$/, replies: ['Good question!', 'I think so', 'Not sure about that', 'Let me think...'] },
      { match: /\bgood (morning|evening|night)\b/i, replies: ['Good morning! ☀️', 'Good evening! 🌙', 'Good night! 😴'] },
      { match: /\b(lol|lmao|haha|rofl)\b/i, replies: ['😂', 'Haha!', '🤣', 'lol'] },
      { match: /\b(bye|goodbye|see ya|cya|gtg)\b/i, replies: ['Bye! 👋', 'See you later!', 'Take care!', 'Cya!'] },
      { match: /\b(nice|cool|awesome|great)\b/i, replies: ['Indeed! 🔥', 'Totally!', 'Right?!', '100%'] },
      { match: /\b(agree|true|facts|real)\b/i, replies: ['Exactly!', 'So true!', 'Facts! 💯', 'I know right?'] },
      { match: /\bsorry\b/i, replies: ['No worries!', 'It\'s all good!', 'Don\'t worry about it!', 'All good 👍'] }
    ];
  }

  getSmartReplies(message) {
    if (!message || !this.smartReplyPatterns) return [];
    const replies = new Set();
    for (const pattern of this.smartReplyPatterns) {
      if (pattern.match.test(message)) {
        pattern.replies.forEach(r => replies.add(r));
        if (replies.size >= 4) break;
      }
    }
    return Array.from(replies).slice(0, 4);
  }

  showSmartReplies(message) {
    const replies = this.getSmartReplies(message);
    const container = document.getElementById('smartReplies');
    if (!container || replies.length === 0) {
      container?.classList.remove('active');
      return;
    }
    container.innerHTML = replies.map(r =>
      `<button class="smart-reply-btn" onclick="app.useSmartReply('${this.escapeHTML(r)}')">${this.escapeHTML(r)}</button>`
    ).join('');
    container.classList.add('active');
  }

  useSmartReply(text) {
    if (this.dom.messageInput) {
      this.dom.messageInput.value = text;
      this.sendMessage();
    }
    document.getElementById('smartReplies')?.classList.remove('active');
  }

  /* ═══════════════════════ V5 PRESENCE TRACKER ═══════════════════════ */
  initPresenceTracker() {
    this.state.userPresence = new Map();
    this.state.presenceHistory = [];
    this.presenceUpdateInterval = setInterval(() => {
      this.socket.emit('heartbeat', { status: this.state.currentStatus || 'online' });
    }, 30000);
  }

  updateUserPresence(data) {
    if (!data.username) return;
    this.state.userPresence.set(data.username, {
      status: data.status || 'offline',
      lastSeen: Date.now(),
      customStatus: data.customStatus || null,
      device: data.device || 'desktop'
    });
    this.updatePresenceUI(data.username);
  }

  updatePresenceUI(username) {
    const presence = this.state.userPresence.get(username);
    if (!presence) return;
    document.querySelectorAll(`[data-username="${username}"] .dm-status-dot, [data-username="${username}"] .friend-status-dot, [data-username="${username}"] .member-status-dot`).forEach(dot => {
      dot.className = dot.className.replace(/online|away|dnd|offline/g, '').trim() + ' ' + presence.status;
    });
  }

  getLastSeen(username) {
    const presence = this.state.userPresence.get(username);
    if (!presence) return 'Unknown';
    if (presence.status === 'online') return 'Online now';
    return `Last seen ${this.timeAgo(presence.lastSeen)}`;
  }

  /* ═══════════════════════ V5 CONTENT WARNING ═══════════════════════ */
  addContentWarning(text) {
    if (!text) return;
    this.state.pendingContentWarning = text;
    this.toast(`Content warning set: ${text}`, 'info');
  }

  clearContentWarning() {
    this.state.pendingContentWarning = null;
  }

  wrapWithContentWarning(messageText) {
    if (!this.state.pendingContentWarning) return messageText;
    const cw = this.state.pendingContentWarning;
    this.state.pendingContentWarning = null;
    return `[CW: ${cw}]\n${messageText}`;
  }

  renderContentWarning(element, cwText, content) {
    const wrapper = document.createElement('div');
    wrapper.className = 'content-warning';
    wrapper.innerHTML = `
      <div class="cw-header"><i class="fas fa-exclamation-triangle"></i> Content Warning: ${this.escapeHTML(cwText)}</div>
      <button class="cw-reveal-btn" onclick="this.nextElementSibling.classList.toggle('revealed');this.textContent=this.textContent==='Show'?'Hide':'Show';">Show</button>
      <div class="cw-content">${content}</div>
    `;
    element.appendChild(wrapper);
  }

  /* ═══════════════════════ V5 MESSAGE TRANSLATION ═══════════════════════ */
  async translateMessage(msgElement) {
    const textEl = msgElement.querySelector('.msg-text');
    if (!textEl) return;
    const text = textEl.textContent;
    if (!text.trim()) return;
    const targetLang = navigator.language.split('-')[0] || 'en';
    const originalHTML = textEl.innerHTML;
    textEl.innerHTML += '<span class="translating-indicator"> <i class="fas fa-spinner fa-spin"></i> Translating...</span>';
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 500))}&langpair=auto|${targetLang}`);
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        textEl.innerHTML = originalHTML + `
          <div class="translated-text">
            <div class="translated-header"><i class="fas fa-language"></i> Translated to ${targetLang}</div>
            <div class="translated-content">${this.escapeHTML(data.responseData.translatedText)}</div>
          </div>
        `;
        this.toast('Message translated', 'success');
      } else {
        textEl.innerHTML = originalHTML;
        this.toast('Translation unavailable', 'warning');
      }
    } catch (e) {
      textEl.innerHTML = originalHTML;
      this.toast('Translation failed', 'error');
    }
  }

  /* ═══════════════════════ V5 SESSION ANALYTICS ═══════════════════════ */
  initSessionAnalytics() {
    this.state.analytics = {
      sessionId: Date.now().toString(36),
      startTime: Date.now(),
      events: [],
      pageViews: [],
      interactions: { clicks: 0, keystrokes: 0, scrolls: 0 }
    };
    document.addEventListener('click', () => this.state.analytics.interactions.clicks++);
    document.addEventListener('keydown', () => this.state.analytics.interactions.keystrokes++);
  }

  trackEvent(category, action, label = '', value = 0) {
    if (!this.state.analytics) return;
    this.state.analytics.events.push({
      category, action, label, value,
      timestamp: Date.now()
    });
    if (this.state.analytics.events.length > 1000) {
      this.state.analytics.events = this.state.analytics.events.slice(-500);
    }
  }

  getSessionAnalytics() {
    const a = this.state.analytics;
    if (!a) return null;
    return {
      sessionId: a.sessionId,
      duration: Date.now() - a.startTime,
      totalEvents: a.events.length,
      interactions: a.interactions,
      eventBreakdown: a.events.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + 1;
        return acc;
      }, {})
    };
  }

  /* ═══════════════════════ V5 EMOJI AUTOCOMPLETE ═══════════════════════ */
  initEmojiAutocomplete() {
    this.emojiShortcodes = {
      ':)': '😊', ':(': '😢', ':D': '😄', ':P': '😛', '<3': '❤️',
      ':fire:': '🔥', ':heart:': '❤️', ':thumbsup:': '👍', ':thumbsdown:': '👎',
      ':laugh:': '😂', ':cry:': '😭', ':angry:': '😠', ':shock:': '😱',
      ':wave:': '👋', ':clap:': '👏', ':100:': '💯', ':rocket:': '🚀',
      ':star:': '⭐', ':check:': '✅', ':x:': '❌', ':warning:': '⚠️',
      ':eyes:': '👀', ':think:': '🤔', ':party:': '🎉', ':skull:': '💀',
      ':crown:': '👑', ':gem:': '💎', ':rainbow:': '🌈', ':moon:': '🌙',
      ':sun:': '☀️', ':cloud:': '☁️', ':rain:': '🌧️', ':snow:': '❄️',
      ':lightning:': '⚡', ':tornado:': '🌪️', ':cat:': '🐱', ':dog:': '🐶',
      ':bug:': '🐛', ':butterfly:': '🦋', ':flower:': '🌸', ':tree:': '🌳',
      ':pizza:': '🍕', ':coffee:': '☕', ':beer:': '🍺', ':cake:': '🎂',
      ':music:': '🎵', ':guitar:': '🎸', ':game:': '🎮', ':trophy:': '🏆',
      ':medal:': '🏅', ':gift:': '🎁', ':balloon:': '🎈', ':confetti:': '🎊',
      ':lock:': '🔒', ':key:': '🔑', ':bell:': '🔔', ':pin:': '📌',
      ':book:': '📖', ':pencil:': '✏️', ':bulb:': '💡', ':money:': '💰',
      ':phone:': '📱', ':computer:': '💻', ':email:': '📧', ':clock:': '⏰',
      ':zzz:': '💤', ':poop:': '💩', ':ghost:': '👻', ':alien:': '👽',
      ':robot:': '🤖', ':unicorn:': '🦄', ':mermaid:': '🧜‍♀️', ':ninja:': '🥷'
    };
  }

  processEmojiShortcodes(text) {
    if (!this.emojiShortcodes) return text;
    let result = text;
    for (const [code, emoji] of Object.entries(this.emojiShortcodes)) {
      result = result.split(code).join(emoji);
    }
    return result;
  }

  showEmojiAutocomplete(partial) {
    if (!this.emojiShortcodes) return;
    const matches = Object.entries(this.emojiShortcodes)
      .filter(([code]) => code.startsWith(partial))
      .slice(0, 8);
    if (matches.length === 0) return;
    const dropdown = this.dom.autocompleteDropdown || document.querySelector('.autocomplete-dropdown');
    if (!dropdown) return;
    dropdown.innerHTML = matches.map(([code, emoji], i) => `
      <div class="autocomplete-item ${i === 0 ? 'selected' : ''}" data-value="${emoji}" data-code="${code}">
        <span style="font-size:20px">${emoji}</span>
        <span>${code}</span>
      </div>
    `).join('');
    dropdown.classList.add('active');
    dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('click', () => {
        this.insertEmojiAtCursor(item.dataset.value, item.dataset.code);
        dropdown.classList.remove('active');
      });
    });
  }

  insertEmojiAtCursor(emoji, shortcode) {
    const input = this.dom.messageInput;
    if (!input) return;
    const text = input.value;
    const cursorPos = input.selectionStart;
    const beforeCursor = text.substring(0, cursorPos);
    const afterCursor = text.substring(cursorPos);
    const shortcodeStart = beforeCursor.lastIndexOf(':');
    if (shortcodeStart >= 0) {
      input.value = beforeCursor.substring(0, shortcodeStart) + emoji + afterCursor;
      input.selectionStart = input.selectionEnd = shortcodeStart + emoji.length;
    } else {
      input.value = beforeCursor + emoji + afterCursor;
    }
    input.focus();
  }

  /* ═══════════════════════ V5 ROOM CATEGORIES ═══════════════════════ */
  initRoomCategories() {
    this.state.roomCategories = {
      general: { icon: 'fa-hashtag', label: 'General', color: '#5865f2' },
      gaming: { icon: 'fa-gamepad', label: 'Gaming', color: '#57f287' },
      music: { icon: 'fa-music', label: 'Music', color: '#fee75c' },
      tech: { icon: 'fa-code', label: 'Tech', color: '#5865f2' },
      art: { icon: 'fa-palette', label: 'Art & Design', color: '#eb459e' },
      social: { icon: 'fa-comments', label: 'Social', color: '#ed4245' },
      education: { icon: 'fa-book', label: 'Education', color: '#57f287' },
      sports: { icon: 'fa-futbol', label: 'Sports', color: '#fee75c' }
    };
  }

  getRoomCategoryIcon(category) {
    const cat = this.state.roomCategories?.[category];
    return cat ? `fas ${cat.icon}` : 'fas fa-hashtag';
  }

  getRoomCategoryColor(category) {
    const cat = this.state.roomCategories?.[category];
    return cat ? cat.color : 'var(--text-muted)';
  }

  /* ═══════════════════════ V5 IDLE DETECTION ═══════════════════════ */
  initIdleDetectionV5() {
    this.state.isIdle = false;
    this.state.idleTimeout = 300000; // 5 min
    this.state.lastActivity = Date.now();
    const resetIdle = this.throttle(() => {
      this.state.lastActivity = Date.now();
      if (this.state.isIdle) {
        this.state.isIdle = false;
        this.socket.emit('setStatus', { status: this.state.previousStatus || 'online' });
      }
    }, 1000);
    ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
      document.addEventListener(event, resetIdle, { passive: true });
    });
    this.idleCheckInterval = setInterval(() => {
      if (Date.now() - this.state.lastActivity > this.state.idleTimeout && !this.state.isIdle) {
        this.state.isIdle = true;
        this.state.previousStatus = this.state.currentStatus;
        this.socket.emit('setStatus', { status: 'away' });
      }
    }, 30000);
  }

  /* ═══════════════════════ V5 NOTIFICATION GROUPING ═══════════════════════ */
  initNotificationGrouping() {
    this.state.notifGroups = new Map();
    this.notifGroupTimeout = 5000;
  }

  addGroupedNotification(notif) {
    const key = `${notif.type}_${notif.room || notif.sender || 'general'}`;
    const group = this.state.notifGroups.get(key);
    if (group && Date.now() - group.lastUpdate < this.notifGroupTimeout) {
      group.count++;
      group.lastUpdate = Date.now();
      group.latestBody = notif.body;
      this.state.notifGroups.set(key, group);
      this.updateGroupedNotifDisplay(key, group);
    } else {
      this.state.notifGroups.set(key, {
        type: notif.type,
        title: notif.title,
        latestBody: notif.body,
        count: 1,
        lastUpdate: Date.now(),
        room: notif.room,
        sender: notif.sender
      });
      this.addNotificationV5(notif);
    }
  }

  updateGroupedNotifDisplay(key, group) {
    if (group.count > 1) {
      this.showDesktopNotification(
        group.title,
        `${group.count} new messages ${group.room ? 'in ' + group.room : ''}`
      );
    }
  }

  /* ═══════════════════════ V5 THEME SCHEDULER ═══════════════════════ */
  initThemeScheduler() {
    this.state.themeSchedule = JSON.parse(localStorage.getItem('redchat_theme_schedule') || 'null');
    if (this.state.themeSchedule) {
      this.checkThemeSchedule();
      this.themeScheduleInterval = setInterval(() => this.checkThemeSchedule(), 60000);
    }
  }

  setThemeSchedule(lightStartHour, darkStartHour) {
    this.state.themeSchedule = { lightStart: lightStartHour, darkStart: darkStartHour };
    localStorage.setItem('redchat_theme_schedule', JSON.stringify(this.state.themeSchedule));
    this.checkThemeSchedule();
    this.toast(`Theme schedule: Light at ${lightStartHour}:00, Dark at ${darkStartHour}:00`, 'success');
    if (!this.themeScheduleInterval) {
      this.themeScheduleInterval = setInterval(() => this.checkThemeSchedule(), 60000);
    }
  }

  checkThemeSchedule() {
    if (!this.state.themeSchedule) return;
    const hour = new Date().getHours();
    const { lightStart, darkStart } = this.state.themeSchedule;
    if (hour >= lightStart && hour < darkStart) {
      if (this.state.theme !== 'light') this.setTheme('light');
    } else {
      if (this.state.theme !== 'midnight') this.setTheme('midnight');
    }
  }

  /* ═══════════════════════ V5 USER NOTES ═══════════════════════ */
  setUserNote(username, note) {
    if (!this.state.userNotes) this.state.userNotes = {};
    this.state.userNotes[username] = { text: note, updatedAt: Date.now() };
    this.userNotes[username] = note;
    this.saveUserNotes();
    this.toast('Note saved', 'success');
    this.socket.emit('setUserNote', { target: username, note });
  }

  getUserNote(username) {
    return this.state.userNotes?.[username]?.text || this.userNotes?.[username] || '';
  }

  deleteUserNote(username) {
    if (this.state.userNotes) {
      delete this.state.userNotes[username];
      this.saveUserNotes();
      this.toast('Note deleted', 'info');
    }
  }

  /* ═══════════════════════ V5 ROOM FAVORITES ═══════════════════════ */
  // toggleFavorite defined above — unified version

  renderFavorites() {
    const container = document.getElementById('favoritesList');
    if (!container) return;
    const favs = this.favorites || [];
    if (favs.length === 0) {
      container.innerHTML = '';
      container.closest('.sidebar-section')?.classList.add('empty');
      return;
    }
    container.closest('.sidebar-section')?.classList.remove('empty');
    container.innerHTML = favs.map(room => `
      <div class="room-item favorite ${room === this.currentRoom ? 'active' : ''}" data-room="${this.escapeHTML(room)}" onclick="app.joinRoom('${this.escapeHTML(room)}')">
        <i class="room-icon fas fa-star" style="color: var(--warning)"></i>
        <span class="room-name">${this.escapeHTML(room)}</span>
      </div>
    `).join('');
  }

  isFavorite(room) {
    return (this.favorites || []).includes(room);
  }

  /* ═══════════════════════ V5 MUTE ROOMS ═══════════════════════ */
  // toggleMuteRoom defined above — unified version

  isRoomMuted(room) {
    return (this.mutedRooms || []).includes(room);
  }

  /* ═══════════════════════ V5 INPUT HISTORY ═══════════════════════ */
  initInputHistory() {
    this.state.inputHistory = [];
    this.state.inputHistoryIndex = -1;
  }

  addToInputHistory(text) {
    if (!text.trim()) return;
    this.state.inputHistory = this.state.inputHistory.filter(t => t !== text);
    this.state.inputHistory.unshift(text);
    if (this.state.inputHistory.length > 50) {
      this.state.inputHistory = this.state.inputHistory.slice(0, 50);
    }
    this.state.inputHistoryIndex = -1;
  }

  navigateInputHistory(direction) {
    if (!this.state.inputHistory?.length) return;
    const input = this.dom.messageInput;
    if (!input) return;
    if (direction === 'up') {
      if (this.state.inputHistoryIndex < this.state.inputHistory.length - 1) {
        this.state.inputHistoryIndex++;
      }
    } else {
      if (this.state.inputHistoryIndex > -1) {
        this.state.inputHistoryIndex--;
      }
    }
    if (this.state.inputHistoryIndex === -1) {
      input.value = '';
    } else {
      input.value = this.state.inputHistory[this.state.inputHistoryIndex] || '';
    }
    this.autoResize(input);
  }

  /* ═══════════════════════ V5 TIMESTAMP TOOLTIPS ═══════════════════════ */
  initTimestampTooltips() {
    this.dom.messagesContainer?.addEventListener('mouseover', (e) => {
      const ts = e.target.closest('.msg-timestamp');
      if (ts && ts.dataset.timestamp) {
        const date = new Date(parseInt(ts.dataset.timestamp));
        ts.title = date.toLocaleString(undefined, {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
      }
    });
  }

  /* ═══════════════════════ V5 SELECTION TOOLBAR ═══════════════════════ */
  initSelectionToolbar() {
    document.addEventListener('mouseup', this.debounce(() => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && selection.toString().trim().length > 0) {
        try {
          const range = selection.getRangeAt(0);
          const msgEl = range.startContainer.parentElement?.closest?.('.message');
          if (msgEl) {
            this.showSelectionToolbar(selection.toString(), range);
          }
        } catch(e) { /* selection collapsed */ }
      } else {
        this.hideSelectionToolbar();
      }
    }, 300));
  }

  showSelectionToolbar(text, range) {
    let toolbar = document.getElementById('selectionToolbar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.id = 'selectionToolbar';
      toolbar.className = 'selection-toolbar';
      toolbar.innerHTML = `
        <button onclick="app.quoteSelection()"><i class="fas fa-quote-right"></i> Quote</button>
        <button onclick="app.copySelection()"><i class="fas fa-copy"></i> Copy</button>
        <button onclick="app.searchSelection()"><i class="fas fa-search"></i> Search</button>
      `;
      document.body.appendChild(toolbar);
    }
    this.state.selectedText = text;
    const rect = range.getBoundingClientRect();
    toolbar.style.top = `${rect.top - 40 + window.scrollY}px`;
    toolbar.style.left = `${rect.left + rect.width / 2}px`;
    toolbar.style.transform = 'translateX(-50%)';
    toolbar.classList.add('active');
  }

  hideSelectionToolbar() {
    document.getElementById('selectionToolbar')?.classList.remove('active');
  }

  quoteSelection() {
    if (this.state.selectedText && this.dom.messageInput) {
      this.dom.messageInput.value += `> ${this.state.selectedText}\n`;
      this.dom.messageInput.focus();
      this.autoResize(this.dom.messageInput);
    }
    this.hideSelectionToolbar();
  }

  copySelection() {
    if (this.state.selectedText) {
      navigator.clipboard.writeText(this.state.selectedText);
      this.toast('Copied to clipboard', 'success');
    }
    this.hideSelectionToolbar();
  }

  searchSelection() {
    if (this.state.selectedText) {
      this.openModal('searchModal');
      if (this.dom.searchInput) {
        this.dom.searchInput.value = this.state.selectedText;
        this.handleSearchV5();
      }
    }
    this.hideSelectionToolbar();
  }

  /* ═══════════════════════ V5 PERFORMANCE MONITOR ═══════════════════════ */
  initPerformanceMonitor() {
    this.state.perfMetrics = {
      fps: 0,
      messageRenderTime: 0,
      socketLatency: 0,
      domNodes: 0,
      memoryUsage: 0
    };
    let lastFrameTime = performance.now();
    let frameCount = 0;
    const measureFPS = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastFrameTime >= 1000) {
        this.state.perfMetrics.fps = frameCount;
        frameCount = 0;
        lastFrameTime = now;
      }
      requestAnimationFrame(measureFPS);
    };
    requestAnimationFrame(measureFPS);
    setInterval(() => {
      this.state.perfMetrics.domNodes = document.querySelectorAll('*').length;
      if (performance.memory) {
        this.state.perfMetrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
      }
    }, 5000);
  }

  measureSocketLatency() {
    const start = Date.now();
    this.socket.emit('ping', () => {
      this.state.perfMetrics.socketLatency = Date.now() - start;
    });
  }

  getPerformanceReport() {
    return {
      ...this.state.perfMetrics,
      sessionDuration: Date.now() - (this.state.analytics?.startTime || Date.now()),
      messagesRendered: this.dom.messagesContainer?.children.length || 0,
      activeModals: document.querySelectorAll('.modal.active').length,
      socketConnected: this.socket?.connected || false,
      userAgent: navigator.userAgent
    };
  }

  /* ═══════════════════════ V5 MESSAGE RETRY ═══════════════════════ */
  initRetryManager() {
    this.state.failedMessages = [];
    this.retryInterval = setInterval(() => this.retryFailedMessages(), 10000);
  }

  addFailedMessage(msg) {
    this.state.failedMessages.push({
      ...msg,
      attempts: 0,
      maxAttempts: 3,
      lastAttempt: Date.now()
    });
  }

  retryFailedMessages() {
    if (!this.socket?.connected) return;
    const now = Date.now();
    this.state.failedMessages = this.state.failedMessages.filter(msg => {
      if (msg.attempts >= msg.maxAttempts) {
        this.toast(`Message failed to send after ${msg.maxAttempts} attempts`, 'error');
        return false;
      }
      if (now - msg.lastAttempt > 5000) {
        msg.attempts++;
        msg.lastAttempt = now;
        this.socket.emit('chatMessage', { text: msg.text, room: msg.room });
        return true;
      }
      return true;
    });
  }

  /* ═══════════════════════ V5 WINDOW HELPERS ═══════════════════════ */
  findMessageById(id) {
    return this.dom.messagesContainer?.querySelector(`[data-msg-id="${id}"]`) || null;
  }

  getAvatarUrl(username) {
    if (this.avatars && this.avatars[username]) {
      return this.avatars[username];
    }
    if (this.state.avatars && this.state.avatars[username]) {
      return this.state.avatars[username];
    }
    if (username === this.username && this.userAvatar) {
      return this.userAvatar;
    }
    return this.generateInitialsAvatar(username);
  }

  generateInitialsAvatar(username) {
    const initial = (username || '?')[0].toUpperCase();
    const accent = this.settings?.accent || '#667eea';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="${accent}"/><text x="32" y="32" text-anchor="middle" dominant-baseline="central" fill="white" font-size="28" font-family="sans-serif" font-weight="700">${initial}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  adjustColor(hex, amount) {
    hex = hex.replace('#', '');
    let r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    let g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    let b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  renderRoomList(rooms) {
    const list = rooms || this.state.rooms || [];
    const container = document.getElementById('roomsList');
    if (!container) return;
    const favorites = this.favorites || this.state.favorites || [];
    const muted = this.mutedRooms || this.state.mutedRooms || [];
    const sortedRooms = [...list].sort((a, b) => {
      const aFav = favorites.includes(a.name || a);
      const bFav = favorites.includes(b.name || b);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
    container.innerHTML = sortedRooms.map(r => {
      const name = r.name || r;
      const isFav = favorites.includes(name);
      const isMuted = muted.includes(name);
      const isActive = name === this.currentRoom;
      const unread = this.state.unreadCounts?.[name] || 0;
      return `
        <div class="room-item ${isActive ? 'active' : ''} ${isFav ? 'favorite' : ''} ${isMuted ? 'muted' : ''}" 
             data-room="${this.escapeHTML(name)}" 
             onclick="app.joinRoom('${this.escapeHTML(name)}')"
             oncontextmenu="event.preventDefault();app.showRoomContextMenu(event,'${this.escapeHTML(name)}')">
          <i class="room-icon fas fa-hashtag"></i>
          <span class="room-name">${this.escapeHTML(name)}</span>
          ${unread > 0 ? `<span class="room-badge">${unread}</span>` : ''}
        </div>
      `;
    }).join('');
    this.renderFavorites();
  }

  showRoomContextMenu(e, room) {
    const isFav = this.isFavorite?.(room) || this.favorites?.includes(room);
    const isMuted = this.isRoomMuted?.(room) || this.mutedRooms?.includes(room);
    const isPredefined = ['General', 'Gaming', 'Music', 'Tech', 'Art', 'Random', 'Memes', 'Help'].includes(room);
    const items = [
      { label: isFav ? 'Remove from Favorites' : 'Add to Favorites', icon: isFav ? 'fas fa-star' : 'far fa-star', action: 'favorite', handler: () => this.toggleFavorite(room) },
      { label: isMuted ? 'Unmute Room' : 'Mute Room', icon: isMuted ? 'fas fa-bell' : 'fas fa-bell-slash', action: 'mute', handler: () => this.toggleMuteRoom(room) },
      { label: 'Copy Room Link', icon: 'fas fa-link', action: 'copylink', handler: () => { navigator.clipboard.writeText(`${window.location.origin}?room=${room}`); this.toast('Link copied!', 'success'); } },
    ];
    if (!isPredefined) {
      items.push({ separator: true });
      items.push({ label: 'Invite Members', icon: 'fas fa-user-plus', action: 'invite', handler: () => { this.openRoomInviteDialog(room); } });
      items.push({ label: 'Room Settings', icon: 'fas fa-cog', action: 'settings', handler: () => { this.openRoomSettings(room); } });
      items.push({ separator: true });
      items.push({ label: 'Leave Room', icon: 'fas fa-sign-out-alt', action: 'leave', danger: true, handler: () => {
        this.socket.emit('leaveRoom', { room, roomId: room });
        if (this.currentRoom === room) this.joinRoom('General');
        // Remove from local room lists immediately
        this.rooms = this.rooms.filter(r => r !== room);
        this.customRooms = this.customRooms.filter(r => {
          const name = typeof r === 'string' ? r : r.name;
          return name !== room;
        });
        this.favorites = this.favorites.filter(f => f !== room);
        this.saveFavorites();
        this.renderRooms();
        this.toast(`Left ${room}`, 'info');
        setTimeout(() => this.socket.emit('getRoomList'), 500);
      }});
      items.push({ label: 'Delete Room', icon: 'fas fa-trash', action: 'delete', danger: true, handler: () => {
        if (confirm(`Delete "${room}"? This cannot be undone.`)) {
          this.socket.emit('deleteRoom', { room, roomId: room });
          // Remove locally immediately
          this.rooms = this.rooms.filter(r => r !== room);
          this.customRooms = this.customRooms.filter(r => {
            const name = typeof r === 'string' ? r : r.name;
            return name !== room;
          });
          this.favorites = this.favorites.filter(f => f !== room);
          this.saveFavorites();
          if (this.currentRoom === room) this.joinRoom('General');
          this.renderRooms();
        }
      }});
    }
    this.showContextMenu(e, items);
  }

  openRoomInviteDialog(room) {
    const username = prompt('Enter username to invite:');
    if (username?.trim()) {
      this.socket.emit('inviteToRoom', { roomId: room, usernames: [username.trim()] });
      this.toast(`Invited ${username.trim()} to ${room}`, 'success');
    }
  }

  openRoomSettings(room) {
    const desc = prompt('Enter room description (or leave empty):', '');
    if (desc !== null) {
      this.socket.emit('updateRoom', { roomId: room, description: desc });
      this.toast('Room updated!', 'success');
    }
  }

  /* ═══════════════════════ V5 DM LIST RENDERING ═══════════════════════ */
  renderDMList(dms) {
    const container = document.getElementById('dmSection');
    if (!container) return;
    const list = dms || this.state.dms || [];
    if (list.length === 0) {
      container.innerHTML = '<div class="sidebar-empty-state"><i class="fas fa-envelope"></i><h4>No messages yet</h4><p>Start a conversation!</p></div>';
      return;
    }
    container.innerHTML = list.map(dm => {
      const user = dm.username || dm;
      const lastMsg = dm.lastMessage || '';
      const unread = dm.unread || 0;
      const isOnline = dm.online || false;
      return `
        <div class="dm-item ${dm === this.state.activeDM ? 'active' : ''}" data-username="${this.escapeHTML(user)}" onclick="app.openDM('${this.escapeHTML(user)}')">
          <div class="dm-avatar-wrapper">
            <img class="avatar" src="${this.getAvatarUrl(user)}" alt="${this.escapeHTML(user)}">
            <div class="dm-status-dot ${isOnline ? 'online' : ''}"></div>
          </div>
          <div class="dm-info">
            <div class="dm-name">${this.escapeHTML(user)}</div>
            ${lastMsg ? `<div class="dm-last-msg">${this.escapeHTML(lastMsg.substring(0, 40))}</div>` : ''}
          </div>
          ${unread > 0 ? `<span class="dm-badge">${unread}</span>` : ''}
        </div>
      `;
    }).join('');
  }

  /* ═══════════════════════ V5 FRIEND LIST RENDERING ═══════════════════════ */
  renderFriendList(friends) {
    const container = document.getElementById('friendsList');
    if (!container) return;
    const list = friends || this.state.friends || [];
    if (list.length === 0) {
      container.innerHTML = '<div class="sidebar-empty-state"><i class="fas fa-user-friends"></i><h4>No friends yet</h4><p>Send a friend request!</p></div>';
      return;
    }
    container.innerHTML = list.map(f => {
      const name = f.username || f;
      const online = f.online || false;
      const status = f.customStatus?.text || (online ? 'Online' : 'Offline');
      return `
        <div class="friend-item" data-username="${this.escapeHTML(name)}">
          <div class="friend-avatar-wrapper">
            <img class="avatar" src="${this.getAvatarUrl(name)}" alt="${this.escapeHTML(name)}">
            <div class="friend-status-dot ${online ? 'online' : ''}"></div>
          </div>
          <div class="friend-info">
            <div class="friend-name">${this.escapeHTML(name)}</div>
            <div class="friend-status-text">${this.escapeHTML(status)}</div>
          </div>
          <div class="friend-actions">
            <button class="friend-action-btn" onclick="app.openDM('${this.escapeHTML(name)}')" title="Message">
              <i class="fas fa-comment"></i>
            </button>
            <button class="friend-action-btn" onclick="app.showProfile('${this.escapeHTML(name)}')" title="Profile">
              <i class="fas fa-user"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ═══════════════════════ V5 SIDEBAR TAB SWITCHING ═══════════════════════ */
  switchSidebarTab(tab) {
    document.querySelectorAll('.sidebar-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    const panelMap = { channels: 'sidebarChannels', dms: 'sidebarDMs', friends: 'sidebarFriends', explore: 'sidebarExplore' };
    document.querySelectorAll('.sidebar-panel').forEach(p => {
      p.classList.toggle('active', p.id === panelMap[tab]);
    });
    this.state.activeSidebarTab = tab;
    if (tab === 'explore') this.loadExploreData();
  }

  filterSidebar(query) {
    const q = query.toLowerCase();
    const activePanel = document.querySelector('.sidebar-panel.active');
    if (!activePanel) return;
    const items = activePanel.querySelectorAll('.room-item, .dm-item, .friend-item, .explore-room-card');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? '' : 'none';
    });
  }


  /* ═══════════════════════ V5 MESSAGE CONTEXT MENU ═══════════════════════ */
  showMessageContextMenu(e, msgElementOrData) {
    e.preventDefault?.();
    let msgId, author, text, msgElement;
    // Accept both a DOM element or a data object
    if (msgElementOrData instanceof HTMLElement) {
      msgElement = msgElementOrData;
      msgId = msgElement.dataset.id || msgElement.dataset.msgId;
      author = msgElement.querySelector('.msg-author')?.textContent || msgElement.dataset.user;
      text = msgElement.querySelector('.msg-text')?.textContent;
    } else {
      // data object from bindMessageActions
      msgId = msgElementOrData.id;
      author = msgElementOrData.username;
      text = msgElementOrData.text;
      msgElement = document.querySelector(`.message[data-id="${msgId}"]`);
    }
    const isOwnMsg = author === this.username;
    const isAdmin = this.userRole === 'admin' || this.userRole === 'moderator' || this.state?.role === 'admin' || this.state?.role === 'moderator';
    const items = [
      { label: 'Reply', icon: 'fas fa-reply', action: 'reply', handler: () => this.startReply({ id: msgId, username: author, text }) },
      { label: 'React', icon: 'fas fa-smile', action: 'react', handler: () => this.showReactionPicker(msgElement, msgId) },
      { label: 'Pin Message', icon: 'fas fa-thumbtack', action: 'pin', handler: () => { this.socket.emit('pinMessage', { messageId: msgId, room: this.currentRoom }); this.toast('Pinned!', 'success'); } },
      { label: 'Bookmark', icon: 'fas fa-bookmark', action: 'bookmark', handler: () => { this.socket.emit('bookmark', { messageId: msgId, message: text, username: author, room: this.currentRoom, timestamp: Date.now() }); this.toast('Bookmarked!', 'success'); } },
      { label: 'Copy Text', icon: 'fas fa-copy', action: 'copy', handler: () => { navigator.clipboard.writeText(text || ''); this.toast('Copied!', 'success'); } },
    ];
    if (isOwnMsg || isAdmin) {
      items.push({ separator: true });
      items.push({ label: 'Edit', icon: 'fas fa-pencil', action: 'edit', handler: () => this.startEdit({ id: msgId, username: author, text }) });
      items.push({ label: 'Delete', icon: 'fas fa-trash', action: 'delete', danger: true, handler: () => { if (confirm('Delete this message?')) this.socket.emit('deleteMessage', { id: msgId, room: this.currentRoom }); } });
    }
    if (!isOwnMsg) {
      items.push({ separator: true });
      items.push({ label: 'Report', icon: 'fas fa-flag', action: 'report', danger: true, handler: () => { if (this.state) this.state.reportingMessage = msgId; this.openModal('reportModal'); } });
    }
    this.showContextMenu(e, items);
  }

  setReplyTo(msgId, author, text) {
    this.startReply({ id: msgId, username: author, text: text });
  }

  cancelReply() {
    this.replyingTo = null;
    if (this.state) this.state.replyingTo = null;
    this.dom.replyBar?.classList.remove('active');
    document.querySelector('.reply-bar')?.classList.remove('active');
  }

  startEditMessage(msgId, text) {
    this.editingMessageId = msgId;
    this.state.editingMessage = msgId;
    this.dom.editBar?.classList.add('active');
    if (this.dom.messageInput) {
      this.dom.messageInput.value = text || '';
      this.dom.messageInput.focus();
      this.autoResize(this.dom.messageInput);
    }
  }

  cancelEdit() {
    this.editingMessageId = null;
    if (this.state) this.state.editingMessage = null;
    this.dom.editBar?.classList.remove('active');
    if (this.dom.messageInput) {
      this.dom.messageInput.value = '';
      this.autoResize?.(this.dom.messageInput);
    }
  }

  showReactionPicker(msgElement, msgId) {
    // Remove any existing picker
    document.querySelector('.reaction-picker-popup')?.remove();
    const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡', '🔥', '🎉', '💯', '👀', '🤔', '👏'];
    const picker = document.createElement('div');
    picker.className = 'reaction-picker-popup';
    picker.innerHTML = reactions.map(r =>
      `<button class="reaction-pick-btn" data-emoji="${r}">${r}</button>`
    ).join('');
    const rect = msgElement.getBoundingClientRect();
    picker.style.position = 'fixed';
    picker.style.top = `${rect.top - 50}px`;
    picker.style.left = `${rect.left + 50}px`;
    picker.style.zIndex = '10000';
    document.body.appendChild(picker);
    // Use passed msgId, or fall back to dataset.id
    const resolvedId = msgId || msgElement.dataset.id;
    picker.querySelectorAll('.reaction-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.socket.emit('addReaction', { messageId: resolvedId, emoji: btn.dataset.emoji, room: this.currentRoom });
        picker.remove();
      });
    });
    setTimeout(() => {
      document.addEventListener('click', function close(e) {
        if (!picker.contains(e.target)) {
          picker.remove();
          document.removeEventListener('click', close);
        }
      });
    }, 100);
  }

  /* ═══════════════════════ V5 PROFILE VIEWER ═══════════════════════ */
  showProfileV5(username) {
    this.socket.emit('getProfile', { username });
  }

  handleProfileData(data) {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    const isBlocked = (this.blocked || []).includes(data.username);
    const isFriend = (this.friends || []).includes(data.username) || (this.state.friends || []).some(f => (f.username || f) === data.username);
    const avatarUrl = data.avatar || (this.avatars && this.avatars[data.username]) || '/uploads/default-avatar.png';
    const c1 = data.bannerColor || 'var(--accent)';
    const c2 = data.bannerColor2 || this.adjustColor?.(data.bannerColor || this.state?.settings?.accent || '#667eea', -40) || 'var(--accent-hover)';
    const content = document.getElementById('profileModalBody') || modal.querySelector('.modal-body') || modal;

    // Store last profile data for reactive updates
    this._lastProfileData = data;

    content.innerHTML = `
      <div class="profile-banner" style="background: linear-gradient(135deg, ${c1}, ${c2})">
        <img class="profile-avatar-lg" src="${avatarUrl}" alt="${this.escapeHTML(data.username)}" onclick="app.openImageViewer('${this.escapeHTML(avatarUrl)}')">
        ${data.username === this.username ? '<button class="banner-edit-btn" onclick="app.editBanner()"><i class="fas fa-camera"></i> Edit</button>' : ''}
      </div>
      <div class="profile-body">
        <div class="profile-name-section">
          <h2>${this.escapeHTML(data.displayName || data.username)}</h2>
          <span class="profile-username">@${this.escapeHTML(data.username)}</span>
          ${data.role && data.role !== 'member' ? `<span class="msg-badge ${data.role}">${data.role}</span>` : ''}
        </div>
        ${data.customStatus?.text ? `<div class="profile-custom-status">${data.customStatus.emoji || ''} ${this.escapeHTML(data.customStatus.text)}</div>` : ''}
        ${data.bio ? `<div class="profile-section"><h4>About Me</h4><p>${this.escapeHTML(data.bio)}</p></div>` : ''}
        <div class="profile-section">
          <h4>Info</h4>
          <div class="profile-info-grid">
            <div class="profile-info-item"><i class="fas fa-calendar"></i><span>Joined ${data.joinDate ? new Date(data.joinDate).toLocaleDateString() : 'Unknown'}</span></div>
            <div class="profile-info-item"><i class="fas fa-star"></i><span>Level ${data.level || 1}</span></div>
            <div class="profile-info-item"><i class="fas fa-bolt"></i><span>${(data.xp?.totalXP ?? (typeof data.xp === 'number' ? data.xp : 0))} XP</span></div>
            <div class="profile-info-item"><i class="fas fa-comment"></i><span>${data.messageCount || 0} messages</span></div>
            ${data.location ? `<div class="profile-info-item"><i class="fas fa-map-marker-alt"></i><span>${this.escapeHTML(data.location)}</span></div>` : ''}
          </div>
        </div>
        ${data.achievements?.length ? `
        <div class="profile-section">
          <h4>Achievements</h4>
          <div class="profile-achievements">
            ${data.achievements.map(a => `<div class="achievement-badge" title="${this.escapeHTML(a.name)}"><span>${a.icon || '🏆'}</span></div>`).join('')}
          </div>
        </div>` : ''}
        <div class="profile-actions">
          ${data.username !== this.username ? `
            <button class="profile-action-btn primary" onclick="app.openDM('${this.escapeHTML(data.username)}')"><i class="fas fa-comment"></i> Message</button>
            ${!isFriend ? `<button class="profile-action-btn" onclick="app.socket.emit('sendFriendRequest',{targetUsername:'${this.escapeHTML(data.username)}'})"><i class="fas fa-user-plus"></i> Add Friend</button>` : ''}
            <button class="profile-action-btn ${isBlocked ? 'danger' : ''}" onclick="app.${isBlocked ? 'unblockUser' : 'blockUser'}('${this.escapeHTML(data.username)}')">
              <i class="fas fa-${isBlocked ? 'unlock' : 'ban'}"></i> ${isBlocked ? 'Unblock' : 'Block'}
            </button>
          ` : `
            <button class="profile-action-btn" onclick="app.openModal('settingsModal')"><i class="fas fa-cog"></i> Edit Profile</button>
          `}
        </div>
      </div>
    `;
    this.openModal('profileModal');
  }

  /* ═══════════════════════ V5 ENHANCED MEMBER LIST ═══════════════════════ */
  renderMemberList(users) {
    const container = this.dom.membersList;
    if (!container) return;
    const list = users || this.state.users || [];
    const admins = list.filter(u => u.role === 'admin');
    const mods = list.filter(u => u.role === 'moderator');
    const online = list.filter(u => u.status !== 'offline' && u.role !== 'admin' && u.role !== 'moderator');
    const offline = list.filter(u => u.status === 'offline' && u.role !== 'admin' && u.role !== 'moderator');
    let html = '';
    if (admins.length) {
      html += `<div class="member-category">Admins — ${admins.length}</div>`;
      html += admins.map(u => this.renderMemberItem(u)).join('');
    }
    if (mods.length) {
      html += `<div class="member-category">Moderators — ${mods.length}</div>`;
      html += mods.map(u => this.renderMemberItem(u)).join('');
    }
    if (online.length) {
      html += `<div class="member-category">Online — ${online.length}</div>`;
      html += online.map(u => this.renderMemberItem(u)).join('');
    }
    if (offline.length) {
      html += `<div class="member-category">Offline — ${offline.length}</div>`;
      html += offline.map(u => this.renderMemberItem(u)).join('');
    }
    container.innerHTML = html;
    container.querySelectorAll('.member-item').forEach(item => {
      item.addEventListener('click', () => {
        const username = item.dataset.username;
        if (username) this.showProfile(username);
      });
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const username = item.dataset.username;
        if (username && username !== this.username) {
          this.showContextMenu(e, [
            { label: 'View Profile', icon: 'fas fa-user', action: 'viewProfile', handler: () => this.showProfile(username) },
            { label: 'Message', icon: 'fas fa-comment', action: 'message', handler: () => this.openDM(username) },
            { label: 'Add Friend', icon: 'fas fa-user-plus', action: 'addFriend', handler: () => this.socket.emit('sendFriendRequest', { targetUsername: username }) },
            { label: 'Block', icon: 'fas fa-ban', danger: true, action: 'block', handler: () => this.blockUser(username) }
          ]);
        }
      });
    });
  }

  renderMemberItem(user) {
    const name = user.username || user;
    const isOnline = user.status !== 'offline';
    const avatarUrl = this.getAvatarUrl(name);
    return `
      <div class="member-item" data-username="${this.escapeHTML(name)}">
        <div class="member-avatar-wrapper">
          <img class="avatar" src="${avatarUrl}" alt="${this.escapeHTML(name)}">
          <div class="member-status-dot ${isOnline ? '' : 'offline'}" style="background:${isOnline ? 'var(--success)' : 'var(--text-muted)'}"></div>
        </div>
        <span class="member-name">${this.escapeHTML(name)}</span>
        ${user.role && user.role !== 'member' ? `<div class="member-role-dot ${user.role}"></div>` : ''}
      </div>
    `;
  }

  filterMembers(query) {
    const q = query.toLowerCase();
    const items = this.dom.membersList?.querySelectorAll('.member-item');
    if (!items) return;
    items.forEach(item => {
      const name = item.dataset.username?.toLowerCase() || '';
      item.style.display = name.includes(q) ? '' : 'none';
    });
  }

  /* ═══════════════════════ V5 MESSAGE RENDERING ═══════════════════════ */
  renderMessage(msg) {
    if (this.isBlocked(msg.username)) return;
    const div = document.createElement('div');
    div.className = 'message';
    div.dataset.msgId = msg.id || '';
    div.dataset.timestamp = msg.timestamp || Date.now();
    div.dataset.author = msg.username || '';
    const avatarUrl = this.getAvatarUrl(msg.username);
    const roleClass = msg.role === 'admin' ? 'admin' : msg.role === 'moderator' ? 'moderator' : '';
    const badge = msg.role && msg.role !== 'member' ? `<span class="msg-badge ${roleClass}">${msg.role}</span>` : '';
    const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const edited = msg.edited ? '<span class="edited-marker">(edited)</span>' : '';
    let replyHTML = '';
    if (msg.replyTo) {
      replyHTML = `
        <div class="msg-reply" onclick="app.scrollToMessage('${msg.replyTo.id}')">
          <span class="reply-author">${this.escapeHTML(msg.replyTo.author || '')}</span>
          <span class="reply-text">${this.escapeHTML((msg.replyTo.text || '').substring(0, 80))}</span>
        </div>
      `;
    }
    let contentHTML = '';
    if (msg.text) {
      contentHTML = `<div class="msg-text">${this.formatText(msg.text)} ${edited}</div>`;
    }
    if (msg.file) {
      contentHTML += this.renderFileAttachment(msg.file);
    }
    let reactionsHTML = '';
    if (msg.reactions && Object.keys(msg.reactions).length > 0) {
      reactionsHTML = '<div class="msg-reactions">' +
        Object.entries(msg.reactions).map(([emoji, users]) =>
          `<button class="reaction ${users.includes(this.username) ? 'active' : ''}" onclick="app.socket.emit('addReaction',{messageId:'${msg.id}',emoji:'${emoji}',room:'${this.currentRoom}'})">
            <span>${emoji}</span><span class="reaction-count">${users.length}</span>
          </button>`
        ).join('') + '</div>';
    }
    div.innerHTML = `
      <img class="msg-avatar" src="${avatarUrl}" alt="${this.escapeHTML(msg.username)}" data-avatar-user="${this.escapeHTML(msg.username)}" onclick="app.showProfile('${this.escapeHTML(msg.username)}')">
      <div class="msg-content">
        ${replyHTML}
        <div class="msg-header">
          <span class="msg-author ${roleClass}" onclick="app.showProfile('${this.escapeHTML(msg.username)}')">${this.escapeHTML(msg.username)}</span>
          ${badge}
          <span class="msg-timestamp" data-timestamp="${msg.timestamp}">${time}</span>
        </div>
        ${contentHTML}
        ${reactionsHTML}
      </div>
      <div class="msg-actions">
        <button class="msg-action-btn" title="React" onclick="app.showReactionPicker(this.closest('.message'))"><i class="fas fa-smile"></i></button>
        <button class="msg-action-btn" title="Reply" onclick="app.setReplyTo('${msg.id}','${this.escapeHTML(msg.username)}','${this.escapeHTML((msg.text || '').substring(0, 60).replace(/'/g, "\\'"))}')"><i class="fas fa-reply"></i></button>
        <button class="msg-action-btn" title="Thread" onclick="app.openThread('${msg.id}')"><i class="fas fa-comments"></i></button>
        <button class="msg-action-btn" title="More" onclick="app.showMessageContextMenu(event,this.closest('.message'))"><i class="fas fa-ellipsis-h"></i></button>
      </div>
    `;
    div.addEventListener('contextmenu', (e) => this.showMessageContextMenu(e, div));
    this.dom.messagesContainer?.appendChild(div);
    if (this.isScrolledToBottom()) this.scrollToBottom();
    // Track stats
    if (msg.username !== this.username) {
      this.trackStat('messagesReceived');
      if (!this.isRoomMuted(this.currentRoom)) {
        this.showSmartReplies(msg.text);
      }
    }
    // Link previews
    this.renderLinkPreviews(div).catch(() => {});
  }

  // renderFileAttachment defined above — original is more secure

  scrollToMessage(msgId) {
    const msg = this.findMessageById(msgId);
    if (msg) {
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      msg.classList.add('highlighted-flash');
      setTimeout(() => msg.classList.remove('highlighted-flash'), 2000);
    }
  }

  /* ═══════════════════════ V5 SEND MESSAGE ═══════════════════════ */
  // sendMessage defined above — V5 features merged in

  handleSlashCommand(text) {
    const parts = text.slice(1).split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');
    switch (cmd) {
      case 'shrug':       this.sendMessage((args ? args + ' ' : '') + '¯\\_(ツ)_/¯'); break;
      case 'tableflip':   this.sendMessage(`(╯°□°)╯︵ ┻━┻ ${args}`); break;
      case 'unflip':      this.sendMessage(`┬─┬ ノ( ゜-゜ノ) ${args}`); break;
      case 'lenny':       this.sendMessage(`( ͡° ͜ʖ ͡°) ${args}`); break;
      case 'disapproval': this.sendMessage(`ಠ_ಠ ${args}`); break;
      case 'sparkles':    this.sendMessage(`✨ ${args} ✨`); break;
      case 'spoiler':     this.sendMessage(`||${args}||`); break;
      case 'nick':  this.socket.emit('changeDisplayName', { displayName: args }); this.toast(`Display name changed to ${args}`, 'success'); break;
      case 'clear': if (this.dom.messagesContainer) this.dom.messagesContainer.innerHTML = ''; break;
      case 'dm': {
        const dmParts = args.split(' ');
        if (dmParts.length >= 2) {
          this.openDM(dmParts[0]);
          setTimeout(() => this.sendMessage(dmParts.slice(1).join(' ')), 500);
        } else if (dmParts[0]) {
          this.startDM(dmParts[0]);
        }
        break;
      }
      case 'roll': {
        const max = parseInt(args) || 100;
        const result = Math.floor(Math.random() * max) + 1;
        this.sendMessage(`🎲 rolled **${result}** (1-${max})`);
        break;
      }
      case 'time':  this.toast(new Date().toLocaleTimeString(), 'info'); break;
      case 'help': {
        const helpText = 'Commands: /shrug /tableflip /unflip /lenny /disapproval /sparkles /spoiler <text> /roll [max] /time /help';
        this.toast(helpText, 'info', 8000);
        break;
      }
      default: this.toast(`Unknown command: /${cmd}. Type /help for a list.`, 'warning');
    }
  }

  /* ═══════════════════════ V5 ENHANCED SETTINGS ═══════════════════════ */
  initSettingsTabs() {
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.switchSettingsTab(tab);
      });
    });
  }

  switchSettingsTab(tab) {
    document.querySelectorAll('.settings-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('.settings-tab-content').forEach(c => {
      c.classList.toggle('active', c.id === `settings-${tab}`);
    });
    if (tab === 'privacy') this.renderBlockList();
  }

  applyAccessibilitySettings() {
    const settings = this.state.accessibilitySettings || {};
    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    }
    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    }
    if (settings.fontSize) {
      document.documentElement.style.setProperty('--base-font-size', `${settings.fontSize}px`);
    }
    if (settings.dyslexicFont) {
      document.body.classList.add('dyslexic-font');
    }
  }

  saveAccessibilitySettings(settings) {
    this.state.accessibilitySettings = settings;
    localStorage.setItem('redchat_accessibility', JSON.stringify(settings));
    this.applyAccessibilitySettings();
    this.toast('Accessibility settings saved', 'success');
  }

  /* ═══════════════════════ V5 ADMIN PANEL ENHANCED ═══════════════════════ */
  loadAdminPageV5(page) {
    this.socket.emit('adminAction', { action: page });
    if (page === 'audit') {
      this.socket.emit('getAuditLog', { limit: 100 });
    }
  }

  handleAuditLog(data) {
    const container = document.getElementById('adminContent');
    if (!container) return;
    const logs = data.logs || [];
    container.innerHTML = `
      <h3>Audit Log</h3>
      <div class="audit-filters">
        <select class="audit-filter-select" onchange="app.filterAuditLog(this.value)">
          <option value="all">All Actions</option>
          <option value="message">Messages</option>
          <option value="moderation">Moderation</option>
          <option value="auth">Authentication</option>
          <option value="room">Rooms</option>
        </select>
      </div>
      <div class="audit-list" id="auditList">
        ${logs.map(log => `
          <div class="audit-item" data-type="${log.type || 'general'}">
            <div class="audit-icon ${log.severity || 'info'}"><i class="fas fa-${this.getAuditIcon(log.action)}"></i></div>
            <div class="audit-details">
              <div class="audit-action"><strong>${this.escapeHTML(log.actor || 'System')}</strong> ${this.escapeHTML(log.action || '')}</div>
              ${log.target ? `<div class="audit-target">Target: ${this.escapeHTML(log.target)}</div>` : ''}
              <div class="audit-time">${this.timeAgo(log.timestamp)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  getAuditIcon(action) {
    if (!action) return 'info-circle';
    if (action.includes('ban') || action.includes('kick')) return 'gavel';
    if (action.includes('delete')) return 'trash';
    if (action.includes('login') || action.includes('register')) return 'sign-in-alt';
    if (action.includes('room') || action.includes('create')) return 'door-open';
    if (action.includes('role') || action.includes('promote')) return 'user-shield';
    return 'info-circle';
  }

  filterAuditLog(type) {
    const items = document.querySelectorAll('#auditList .audit-item');
    items.forEach(item => {
      item.style.display = (type === 'all' || item.dataset.type === type) ? '' : 'none';
    });
  }

  /* ═══════════════════════ V5 ENHANCED SEARCH ═══════════════════════ */
  handleSearchV5() {
    const query = this.dom.searchInput?.value?.trim();
    if (!query) return;
    const filter = this.state.messageFilterType || 'all';
    this.socket.emit('searchMessages', { query, room: this.currentRoom, filter });
    this.trackEvent('search', 'search_messages', query);
  }

  handleSearchResults(data) {
    const container = document.getElementById('searchResults') || document.querySelector('.search-results-list');
    if (!container) return;
    const results = data.results || [];
    if (results.length === 0) {
      container.innerHTML = '<div class="search-empty"><i class="fas fa-search"></i><p>No results found</p></div>';
      return;
    }
    container.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="app.scrollToMessage('${r.id}')">
        <img class="avatar" src="${this.getAvatarUrl(r.username)}" alt="">
        <div class="search-result-content">
          <div class="search-result-meta">${this.escapeHTML(r.username)} in #${this.escapeHTML(r.room || '')} — ${this.timeAgo(r.timestamp)}</div>
          <div class="search-result-text">${this.highlightSearch(this.escapeHTML(r.text || ''), this.dom.searchInput?.value)}</div>
        </div>
      </div>
    `).join('');
  }

  highlightSearch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /* ═══════════════════════ V5 ENHANCED TODOS ═══════════════════════ */
  renderTodosV5() {
    const container = document.getElementById('todoList');
    if (!container) return;
    const todos = this.state.todos || [];
    const filter = this.state.todoFilter || 'all';
    const filtered = filter === 'all' ? todos :
      filter === 'active' ? todos.filter(t => !t.completed) :
      filter === 'completed' ? todos.filter(t => t.completed) :
      filter === 'high' ? todos.filter(t => t.priority === 'high') :
      todos;
    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-check-circle"></i><p>No todos. You\'re all caught up!</p></div>';
      return;
    }
    container.innerHTML = filtered.map((todo, idx) => `
      <div class="todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority || 'medium'}" data-index="${idx}">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="app.toggleTodo(${idx})">
        <span class="todo-text">${this.escapeHTML(todo.text)}</span>
        ${todo.priority ? `<span class="todo-priority ${todo.priority}">${todo.priority}</span>` : ''}
        <button class="todo-delete" onclick="app.deleteTodo(${idx})"><i class="fas fa-times"></i></button>
      </div>
    `).join('');
    // Footer stats
    const footer = document.getElementById('todoFooter');
    if (footer) {
      const active = todos.filter(t => !t.completed).length;
      footer.textContent = `${active} item${active !== 1 ? 's' : ''} left`;
    }
  }

  setTodoFilter(filter) {
    this.state.todoFilter = filter;
    document.querySelectorAll('.todo-filters .filter-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.filter === filter);
    });
    this.renderTodosV5();
  }

  addTodoV5(text, priority = 'medium') {
    if (!text.trim()) return;
    if (!this.state.todos) this.state.todos = [];
    this.state.todos.push({
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now()
    });
    this.saveTodos();
    this.renderTodosV5();
    this.toast('Todo added', 'success');
  }

  /* ═══════════════════════ V5 WHEEL OF FORTUNE ═══════════════════════ */
  spinWheelV5() {
    if (this.state.isSpinning) return;
    const inputs = document.querySelectorAll('#wheelOptions .wheel-opt-input');
    const options = Array.from(inputs).map(i => i.value.trim()).filter(Boolean);
    if (options.length < 2) { this.toast('Add at least 2 options', 'error'); return; }
    this.state.isSpinning = true;
    // generate simple id
    const wheelId = 'w' + Date.now();
    this.socket.emit('spinWheel', { room: this.currentRoom, options, wheelId });
    const wheel = document.getElementById('wheelCanvas');
    if (wheel) {
      wheel.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
      wheel.style.transform = `rotate(${1440 + Math.random() * 360}deg)`;
    }
    setTimeout(() => { this.state.isSpinning = false; }, 3500);
  }


  drawWheel(canvas, options) {
    if (!canvas || !options || options.length === 0) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const r = w / 2;
    ctx.clearRect(0, 0, w, w);
    const n = options.length;
    const angle = 2 * Math.PI / n;
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(r, r);
      ctx.arc(r, r, r - 2, i * angle, (i + 1) * angle);
      ctx.closePath();
      ctx.fillStyle = `hsl(${i * 360 / n},70%,60%)`;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(i * angle + angle / 2);
      ctx.textAlign = 'right';
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#222';
      ctx.fillText(options[i], r - 16, 4);
      ctx.restore();
    }
  }

  /* ═══════════════════════ V5 VOICE RECORDING ═══════════════════════ */
  async toggleVoiceRecordingV5() {
    if (this.state.isRecording) {
      this.stopRecording();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.state.mediaRecorder = new MediaRecorder(stream);
      this.state.audioChunks = [];
      this.state.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.state.audioChunks.push(e.data);
      };
      this.state.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.state.audioChunks, { type: 'audio/webm' });
        this.uploadFile(new File([audioBlob], 'voice-message.webm', { type: 'audio/webm' }));
        stream.getTracks().forEach(t => t.stop());
      };
      this.state.mediaRecorder.start();
      this.state.isRecording = true;
      this.dom.voiceBtn?.classList.add('recording');
      this.toast('Recording started...', 'info');
    } catch (e) {
      this.toast('Microphone access denied', 'error');
    }
  }

  stopRecording() {
    const recorder = this.mediaRecorder || this.state?.mediaRecorder;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
    this.isRecording = false;
    if (this.state) this.state.isRecording = false;
    this.dom.voiceBtn?.classList.remove('recording');
  }

  /* ═══════════════════════ V5 FILE UPLOAD ═══════════════════════ */
  async uploadFile(file) {
    if (!file) return;
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      this.toast('File too large (max 25MB)', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      this.toast('Uploading...', 'info');
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        this.socket.emit('chatMessage', {
          room: this.currentRoom,
          text: '',
          file: { url: data.url || data.path, name: file.name, size: file.size, type: file.type }
        });
        this.trackStat('filesShared');
        this.toast('File uploaded!', 'success');
      } else {
        this.toast('Upload failed', 'error');
      }
    } catch (e) {
      this.toast('Upload error: ' + e.message, 'error');
    }
  }

  handleFileUpload(e) {
    const file = e.target?.files?.[0];
    if (file) this.uploadFile(file);
    if (e.target) e.target.value = '';
  }

  /* ═══════════════════════ V5 ROOM MANAGEMENT ═══════════════════════ */
  handleCreateRoom() {
    const nameInput = document.getElementById('newRoomName');
    const descInput = document.getElementById('newRoomDescription');
    const catSelect = document.getElementById('newRoomCategory');
    const privateCheck = document.getElementById('roomPrivateToggle');
    const slowCheck = document.getElementById('roomSlowModeToggle');
    if (!nameInput?.value?.trim()) {
      this.toast('Room name is required', 'warning');
      return;
    }
    const selectedIcon = document.querySelector('#iconSelector .icon-pick.active')?.dataset.icon || 'fa-hashtag';
    const selectedColor = document.querySelector('#colorSelector .color-pick.active')?.dataset.color || '#667eea';
    this.socket.emit('createRoom', {
      name: nameInput.value.trim(),
      description: descInput?.value || '',
      category: catSelect?.value || 'general',
      isPrivate: privateCheck?.checked || false,
      slowMode: slowCheck?.checked ? 5 : 0,
      icon: selectedIcon,
      color: selectedColor
    });
    this.closeModal('createRoomModal');
    this.toast('Room created!', 'success');
  }

  // joinRoom defined above — V5 features merged in

  openDM(username) {
    if (!username) return;
    this.state.activeDM = username;
    this.startDM(username);
  }

  /* ═══════════════════════ V5 GLOBAL ESCAPE HANDLER ═══════════════════════ */
  handleEscapeV5() {
    // Close in priority order
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      this.closeModal(activeModal.id);
      return;
    }
    const imageViewer = document.getElementById('imageViewer');
    if (imageViewer?.classList.contains('active')) {
      this.closeImageViewer();
      return;
    }
    const thread = document.getElementById('threadPanel');
    if (thread?.classList.contains('active')) {
      this.closeThread();
      return;
    }
    if (this.state.editingMessage) {
      this.cancelEdit();
      return;
    }
    if (this.state.replyingTo) {
      this.cancelReply();
      return;
    }
    if (window.innerWidth < 768 && this.dom.sidebar?.classList.contains('open')) {
      this.closeSidebar();
      return;
    }
  }

}

/* ═══════════════════════ BOOTSTRAP ═══════════════════════ */
let app;
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splashScreen');
  try {
    app = new ChatApp();
    window.app = app; // Make real app globally accessible for inline onclick handlers
  } catch (e) {
    console.error('[RedChat] Constructor error:', e);
  }

  setTimeout(() => {
    // Hide splash
    if (splash) {
      splash.style.opacity = '0';
      splash.style.transition = 'opacity 0.3s ease';
      setTimeout(() => { splash.style.display = 'none'; }, 300);
    }

    // Initialize v5 systems
    try {
      if (app) app.init();
    } catch (e) {
      console.error('[RedChat] Init error:', e);
    }

    // Show auth screen
    if (app) {
      app.showAuth();
    } else {
      // Fallback: show auth even if app failed
      const auth = document.getElementById('authScreen');
      if (auth) auth.style.display = 'flex';
    }
  }, 1500);
});

// Global fallback if app failed to initialize
if (!window.app) window.app = { closeModal: () => {}, openModal: () => {}, toast: () => {}, joinRoom: () => {} };

