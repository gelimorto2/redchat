        // ----- Polyfills for missing V5 frontend events -----
        socket.on('adminAction', function(data) {
            // Frontend requests an admin page
            if (data && data.action === 'audit') {
                var auditLog = loadJSON('audit_log.json') || [];
                socket.emit('auditLogData', { log: auditLog });
            }
        });

        socket.on('createInvite', function(data) {
            // Alias to existing createRoomInvite
            var listeners = socket.listeners('createRoomInvite');
            if (listeners && listeners.length) listeners[0](data);
        });

        socket.on('getFriends', function(data) {
            // Alias to existing getFriendsList
            var listeners = socket.listeners('getFriendsList');
            if (listeners && listeners.length) listeners[0](data);
        });

        socket.on('getMediaGallery', function(data) {
            // Mock empty media gallery response
            var room = data ? data.room : 'General';
            socket.emit('mediaGallery', { room: room, media: [] });
            // Alternatively, socket.emit('mediaData', ...)
        });

        socket.on('getTrendingTags', function(data) {
            socket.emit('trendingTags', { tags: [] });
        });

        socket.on('heartbeat', function(data) {
            // Update user status
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
            // Minimal implementation to ignore or just broadcast
        });

        socket.on('setUserNote', function(data) {
            // Implement simple user notes storage
            var username = socketToUser.get(socket.id);
            if (!username) return;
            var target = data.target;
            var note = data.note;
            var userNotes = loadJSON('user_notes.json') || {};
            if (!userNotes[username]) userNotes[username] = {};
            userNotes[username][target] = note;
            saveJSON('user_notes.json', userNotes);
        });
        
        socket.on('reactionStats', function(data) {
           // just to keep it alive
        });
// ---------------------------------------------------------------- //
