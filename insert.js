        // ----- Polyfills for missing V5 frontend events -----
        socket.on('adminAction', function(data) {
            if (data && data.action === 'audit') {
                var auditLog = loadJSON('audit_log.json') || [];
                socket.emit('auditLogData', { log: auditLog });
            }
        });
        socket.on('createInvite', function(data) {
            var listeners = socket.listeners('createRoomInvite');
            if (listeners && listeners.length) listeners[0](data);
        });
        socket.on('getFriends', function(data) {
            var listeners = socket.listeners('getFriendsList');
            if (listeners && listeners.length) listeners[0](data);
        });
        socket.on('getMediaGallery', function(data) {
            var room = data ? data.room : 'General';
            var media = [];
            if (messageHistory && messageHistory.has(room)) {
                var msgs = messageHistory.get(room);
                media = msgs.filter(function(m) { return m.file || m.type === 'image' || m.type === 'video';});
            }
            socket.emit('mediaGallery', { room: room, media: media });
        });
        socket.on('getTrendingTags', function(data) {
            socket.emit('trendingTags', { tags: [] });
        });
        socket.on('heartbeat', function(data) {
            var username = socketToUser.get(socket.id);
            if (username && data && data.status) {
                var acc = accounts.get(username);
                if (acc) {
                    acc.status = data.status;
                    acc.lastSeen = Date.now();
                }
            }
        });
        socket.on('joinViaInvite', function(data) {
            var listeners = socket.listeners('useRoomInvite');
            if (listeners && listeners.length) listeners[0](data);
        });
        socket.on('logout', function() {
            socket.disconnect(true);
        });
        socket.on('ping', function(callback) {
            if (typeof callback === 'function') callback({ status: 'ok' });
        });
        socket.on('sendScheduledMessage', function(data) {
            var listeners = socket.listeners('scheduleMessage');
            if (listeners && listeners.length) listeners[0](data);
        });
        socket.on('setUserNote', function(data) {
            var username = socketToUser.get(socket.id);
            var target = data.target;
            var note = data.note;
            var userNotes = loadJSON('user_notes.json') || {};
            userNotes[username][target] = note;
            saveJSON('user_notes.json', userNotes);
        });
