/* ═══════════════════════════════════════════════════════════════
   RedChat v5.3 — Ultimate Client (Mobile-First Rewrite)
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS / i18n — English, French, Italian
   ═══════════════════════════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    // ── Auth ──
    'auth.welcome_back': 'Welcome Back',
    'auth.sign_in_subtitle': 'Sign in to continue to RedChat',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.enter_username': 'Enter your username',
    'auth.enter_password': 'Enter your password',
    'auth.sign_in': 'Sign In',
    'auth.no_account': "Don't have an account?",
    'auth.create_one': 'Create one',
    'auth.forgot_password': 'Forgot password?',
    'auth.create_account': 'Create Account',
    'auth.join_community': 'Join the community',
    'auth.choose_username': 'Choose a username',
    'auth.email': 'Email',
    'auth.confirm_password': 'Confirm Password',
    'auth.confirm_password_placeholder': 'Confirm your password',
    'auth.create_password': 'Create a password',
    'auth.date_of_birth': 'Date of Birth',
    'auth.gender': 'Gender',
    'auth.prefer_not_say': 'Prefer not to say',
    'auth.male': 'Male',
    'auth.female': 'Female',
    'auth.non_binary': 'Non-binary',
    'auth.other': 'Other',
    'auth.already_have_account': 'Already have an account?',
    'auth.sign_in_link': 'Sign in',
    'auth.reset_password': 'Reset Password',
    'auth.reset_subtitle': 'Enter your username to receive a reset code',
    'auth.send_reset_code': 'Send Reset Code',
    'auth.reset_code': 'Reset Code',
    'auth.enter_code': 'Enter the 6-digit code',
    'auth.new_password': 'New Password',
    'auth.enter_new_password': 'Enter new password',
    'auth.back_to_sign_in': 'Back to Sign In',
    'auth.verify_email': 'Verify Your Email',
    'auth.verify_subtitle': 'Enter the 6-digit code sent to your email',
    'auth.verify': 'Verify',
    'auth.didnt_receive': "Didn't receive code?",
    'auth.resend': 'Resend',
    'auth.skip_for_now': 'Skip for now',
    'auth.username_hint': '2-20 characters, letters, numbers, underscores',
    'auth.email_hint': 'Required — used for account verification & password recovery',
    'auth.dob_hint': 'Required — you must be at least 13 years old',
    'auth.gender_hint': 'Optional — shown on your profile',
    'auth.lightning_fast': 'Lightning Fast',
    'auth.lightning_desc': 'Real-time messaging with zero delay',
    'auth.secure_private': 'Secure & Private',
    'auth.secure_desc': 'End-to-end encrypted conversations',
    'auth.fully_customizable': 'Fully Customizable',
    'auth.customizable_desc': 'Themes, colors, and personalization',
    'auth.community_features': 'Community Features',
    'auth.community_desc': 'Rooms, friends, polls, and more',
    'auth.users': 'Users',
    'auth.rooms': 'Rooms',
    'auth.online': 'Online',
    'auth.tagline': 'The next generation of real-time communication',
    // ── Splash ──
    'splash.contacting': 'Contacting server...',
    // ── Sidebar ──
    'sidebar.channels': 'Channels',
    'sidebar.messages': 'Messages',
    'sidebar.friends': 'Friends',
    'sidebar.explore': 'Explore',
    'sidebar.search_channels': 'Search channels...',
    'sidebar.favorites': 'FAVORITES',
    'sidebar.no_favorites': 'No favorites yet',
    'sidebar.favorite_hint': 'Right-click a channel to favorite it',
    'sidebar.channels_title': 'CHANNELS',
    'sidebar.direct_messages': 'DIRECT MESSAGES',
    'sidebar.no_dms': 'No conversations yet',
    'sidebar.dm_hint': 'Start a DM with the button above',
    'sidebar.all': 'All',
    'sidebar.pending': 'Pending',
    'sidebar.blocked': 'Blocked',
    'sidebar.no_friends': 'No friends yet',
    'sidebar.friend_hint': 'Add friends using the button above',
    'sidebar.search_rooms': 'Search rooms to join...',
    'sidebar.no_rooms': 'No rooms found',
    // ── Header ──
    'header.notifications': 'Notifications',
    'header.threads': 'Threads',
    'header.search': 'Search',
    'header.more': 'More',
    'header.members': 'Members',
    // ── Three-dot menu ──
    'menu.bookmarks': 'Bookmarks',
    'menu.todo': 'Todo List',
    'menu.gallery': 'Media Gallery',
    'menu.stats': 'Channel Stats',
    'menu.xp_shop': 'XP Shop',
    'menu.settings': 'Settings',
    'menu.admin': 'Admin Dashboard',
    'menu.bugreport': 'Report a Bug',
    'menu.export': 'Export Chat',
    'menu.logout': 'Logout',
    'menu.language': 'Language',
    // ── Welcome ──
    'welcome.title': 'Welcome to RedChat!',
    'welcome.subtitle': 'Select a channel or start a conversation',
    'welcome.create_channel': 'Create Channel',
    'welcome.add_friend': 'Add Friend',
    // ── Chat ──
    'chat.new_messages': 'New messages',
    'chat.typing': 'Someone is typing...',
    'chat.replying_to': 'Replying to',
    'chat.editing_message': 'Editing message',
    'chat.pinned_message': 'Pinned message',
    'chat.message_placeholder': 'Type a message...',
    // ── Members ──
    'members.title': 'Members',
    'members.search': 'Search members...',
    // ── Threads ──
    'threads.title': 'Threads',
    'threads.new_thread': 'New Thread',
    'threads.no_threads': 'No threads yet',
    'threads.no_threads_hint': 'Create a thread to start a focused discussion!',
    // ── Mobile nav ──
    'mobile.chat': 'Chat',
    'mobile.channels': 'Channels',
    'mobile.explore': 'Explore',
    'mobile.dms': 'DMs',
    'mobile.friends': 'Friends',
    'mobile.settings': 'Settings',
    // ── Settings ──
    'settings.title': 'Settings',
    'settings.my_profile': 'My Profile',
    'settings.account': 'Account',
    'settings.appearance': 'Appearance',
    'settings.notifications': 'Notifications',
    'settings.accessibility': 'Accessibility',
    'settings.privacy': 'Privacy',
    'settings.profile_picture': 'Profile Picture',
    'settings.change_avatar': 'Change Avatar',
    'settings.avatar_hint': 'JPG, PNG or GIF. Max 5MB.',
    'settings.name_color': 'Name Color',
    'settings.name_color_hint': 'Purchase "Custom Name Color" from the XP Shop to unlock!',
    'settings.choose_color': 'Choose your username color',
    'settings.age': 'Age',
    'settings.age_placeholder': 'Your age',
    'settings.sex_gender': 'Sex / Gender',
    'settings.bio': 'Bio',
    'settings.bio_placeholder': 'Tell people about yourself...',
    'settings.save': 'Save',
    'settings.banner_gradient': 'Banner Gradient',
    'settings.banner_hint': 'Choose two colors for your profile banner gradient.',
    'settings.color_1': 'Color 1',
    'settings.color_2': 'Color 2',
    'settings.apply_banner': 'Apply Banner',
    'settings.personal_note': 'Personal Note',
    'settings.personal_note_hint': 'A private note only you can see on your profile.',
    'settings.personal_note_placeholder': 'Add a personal note...',
    'settings.save_note': 'Save Note',
    'settings.account_settings': 'Account Settings',
    'settings.email': 'Email',
    'settings.add_email': 'Add email for recovery',
    'settings.verified': 'Verified',
    'settings.update_email': 'Update Email',
    'settings.verification_code': 'Verification Code',
    'settings.verification_hint': 'Enter the 6-digit code sent to your email.',
    'settings.change_password': 'Change Password',
    'settings.current_password': 'Current password',
    'settings.new_password': 'New password',
    'settings.export_data': 'Export My Data',
    'settings.export_hint': 'Download your settings, favorites, notes, and preferences.',
    'settings.download_data': 'Download Data',
    'settings.danger_zone': 'Danger Zone',
    'settings.danger_hint': 'Once you delete your account, there is no going back.',
    'settings.delete_account': 'Delete Account',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.midnight': 'Midnight',
    // ── Tour ──
    'tour.welcome_title': 'Welcome to RedChat! 🎉',
    'tour.welcome_desc': "Let's take a quick tour to show you around. It only takes a minute!",
    'tour.sidebar_title': 'Sidebar & Channels',
    'tour.sidebar_desc_mobile': 'Tap the menu button to open the sidebar. From there you can switch between Channels, DMs, Friends, and Explore tabs.',
    'tour.sidebar_desc_desktop': 'This is your sidebar. Switch between Channels, DMs, Friends, and Explore using the tabs at the top. Right-click a channel to favorite it!',
    'tour.chat_title': 'Chat Area',
    'tour.chat_desc': 'This is where all the magic happens. Messages appear here in real-time. You can reply to messages, react with emoji, bookmark them, and more — just hover (or long-press on mobile) any message.',
    'tour.input_title': 'Message Input',
    'tour.input_desc': 'Type your message here. You can use Markdown formatting, attach files with the + button, send voice messages, or use emoji & stickers. Type / for commands!',
    'tour.threads_title': 'Threads',
    'tour.threads_desc_mobile': 'Threads let you have focused side-conversations within a channel. Look for the threads icon to view or create them.',
    'tour.threads_desc_desktop': 'Click the threads icon to see or create thread discussions within the current channel. Great for keeping conversations organized!',
    'tour.friends_title': 'Friends & DMs',
    'tour.friends_desc': "Add friends by username, see who's online, and start private Direct Message conversations. You'll get notified of new DMs with badge counters.",
    'tour.tools_title': 'More Tools',
    'tour.tools_desc': 'Access Bookmarks, Todo List, Media Gallery, Channel Stats, Settings, and more from this dropdown menu.',
    'tour.explore_title': 'Explore Channels',
    'tour.explore_desc': 'Discover new channels created by the community. You can also create your own channel with custom icons, colors, and permissions!',
    'tour.done_title': "You're all set! 🚀",
    'tour.done_desc': "That's the basics! Dive in, send messages, make friends, and explore. There's tons more to discover — custom themes, polls, achievements, and more. Have fun!",
    'tour.lets_go': "Let's Go!",
    'tour.next': 'Next',
    'tour.back': 'Back',
    'tour.finish': 'Finish',
    'tour.lang_title': 'Choose Your Language 🌍',
    'tour.lang_desc': 'Select your preferred language. You can change it later in the three-dot menu.',
    // ── Language picker ──
    'lang.title': 'Choose Language',
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.italian': 'Italiano',
    // ── Common ──
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.search': 'Search',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.reply': 'Reply',
    'common.pin': 'Pin',
    'common.unpin': 'Unpin',
    'common.bookmark': 'Bookmark',
    'common.report': 'Report',
    'common.copy': 'Copy',
    'common.mute': 'Mute',
    'common.unmute': 'Unmute',
    'common.block': 'Block',
    'common.unblock': 'Unblock',
    'common.send': 'Send',
    'common.view_all': 'View all',
    'common.logout_confirm': 'Are you sure you want to logout?',
    'common.logged_out': 'Logged out successfully',
    'tour.complete': 'Tour complete! Enjoy RedChat 🎉',
    // ── RedAI ──
    'sidebar.redai': 'RedAI',
    'redai.welcome_title': "Hi! I'm RedAI",
    'redai.welcome_desc': 'Your AI assistant. Ask me anything, or @RedAI me in any channel!',
    'redai.placeholder': 'Ask RedAI anything...',
    'redai.joke': 'Tell me a joke',
    'redai.coding': 'Help with coding',
    'redai.capabilities': 'What can you do?',
    'redai.translate': 'Translate',
    'redai.cleared': 'RedAI conversation cleared',
    // ── AI Features ──
    'ai.ask_about': 'Ask AI about this',
    'ai.translate_msg': 'Translate',
    'ai.explain': 'Explain',
    'ai.summary': 'Chat Summary',
    'ai.thinking': 'RedAI is thinking...',
    'ai.translating': 'Translating...',
    'ai.summarizing': 'Summarizing chat...',
    'ai.explaining': 'Explaining...',
    'ai.error': 'AI is temporarily unavailable',
    'ai.no_messages': 'No messages to summarize',
    'ai.original': 'Original',
    'ai.translated': 'Translated',
    'ai.show_original': 'Show original',
    'ai.show_translation': 'Show translation',
    'ai.sentiment': 'Mood Analysis',
    'ai.smart_replies': 'Smart Replies',
    'ai.rewrite': 'Rewrite message',
    'ai.rewriting': 'Rewriting...',
    'ai.powered_by': 'Powered by Pollinations AI',
    'ai.tag': 'AI',
    'ai.auto_translate': 'Auto-translate',
    'menu.ai_summarize': 'AI Summarize',
    'menu.ai_chat': 'RedAI Chat',
    // ── Welcome Page ──
    'welcome.quick_start': 'Quick Start',
    'welcome.change_avatar': 'Change Your Avatar',
    'welcome.change_avatar_desc': 'Personalize your profile picture',
    'welcome.settings': 'Settings',
    'welcome.settings_desc': 'Customize your experience',
    'welcome.commands': 'Chat Commands',
    'welcome.commands_desc': 'Learn all available commands',
    'welcome.explore': 'Explore Channels',
    'welcome.explore_desc': 'Discover communities to join',
    'welcome.mobile_app': 'Get Mobile App',
    'welcome.mobile_app_desc': 'Install RedChat on your phone',
    // ── Badges ──
    'badge.select_hint': 'Click to display next to your name',
    'badge.none': 'None',
    'badge.selected': 'Badge updated!',
    // ── Translate ──
    'msg.translate': 'Translate',
    // ── AI Reports ──
    'admin.ai_analyze': 'AI Analyze',
    'admin.ai_analyzing': 'Analyzing...',
    'admin.ai_analysis': 'AI Analysis',
    // ── User Not Found ──
    'user.not_found': 'User not found',
  },
  fr: {
    // ── Auth ──
    'auth.welcome_back': 'Bon retour',
    'auth.sign_in_subtitle': 'Connectez-vous pour continuer sur RedChat',
    'auth.username': "Nom d'utilisateur",
    'auth.password': 'Mot de passe',
    'auth.enter_username': "Entrez votre nom d'utilisateur",
    'auth.enter_password': 'Entrez votre mot de passe',
    'auth.sign_in': 'Se connecter',
    'auth.no_account': "Vous n'avez pas de compte ?",
    'auth.create_one': 'Créer un compte',
    'auth.forgot_password': 'Mot de passe oublié ?',
    'auth.create_account': 'Créer un compte',
    'auth.join_community': 'Rejoindre la communauté',
    'auth.choose_username': "Choisissez un nom d'utilisateur",
    'auth.email': 'E-mail',
    'auth.confirm_password': 'Confirmer le mot de passe',
    'auth.confirm_password_placeholder': 'Confirmez votre mot de passe',
    'auth.create_password': 'Créez un mot de passe',
    'auth.date_of_birth': 'Date de naissance',
    'auth.gender': 'Genre',
    'auth.prefer_not_say': 'Préfère ne pas dire',
    'auth.male': 'Homme',
    'auth.female': 'Femme',
    'auth.non_binary': 'Non-binaire',
    'auth.other': 'Autre',
    'auth.already_have_account': 'Vous avez déjà un compte ?',
    'auth.sign_in_link': 'Se connecter',
    'auth.reset_password': 'Réinitialiser le mot de passe',
    'auth.reset_subtitle': 'Entrez votre nom d\'utilisateur pour recevoir un code',
    'auth.send_reset_code': 'Envoyer le code',
    'auth.reset_code': 'Code de réinitialisation',
    'auth.enter_code': 'Entrez le code à 6 chiffres',
    'auth.new_password': 'Nouveau mot de passe',
    'auth.enter_new_password': 'Entrez le nouveau mot de passe',
    'auth.back_to_sign_in': 'Retour à la connexion',
    'auth.verify_email': 'Vérifiez votre e-mail',
    'auth.verify_subtitle': 'Entrez le code à 6 chiffres envoyé à votre e-mail',
    'auth.verify': 'Vérifier',
    'auth.didnt_receive': "Vous n'avez pas reçu le code ?",
    'auth.resend': 'Renvoyer',
    'auth.skip_for_now': 'Passer pour le moment',
    'auth.username_hint': "2-20 caractères, lettres, chiffres, tirets bas",
    'auth.email_hint': 'Requis — utilisé pour la vérification et la récupération',
    'auth.dob_hint': 'Requis — vous devez avoir au moins 13 ans',
    'auth.gender_hint': 'Optionnel — affiché sur votre profil',
    'auth.lightning_fast': 'Ultra rapide',
    'auth.lightning_desc': 'Messagerie en temps réel sans délai',
    'auth.secure_private': 'Sécurisé et privé',
    'auth.secure_desc': 'Conversations chiffrées de bout en bout',
    'auth.fully_customizable': 'Entièrement personnalisable',
    'auth.customizable_desc': 'Thèmes, couleurs et personnalisation',
    'auth.community_features': 'Fonctionnalités communautaires',
    'auth.community_desc': 'Salons, amis, sondages et plus',
    'auth.users': 'Utilisateurs',
    'auth.rooms': 'Salons',
    'auth.online': 'En ligne',
    'auth.tagline': 'La prochaine génération de communication en temps réel',
    // ── Splash ──
    'splash.contacting': 'Connexion au serveur...',
    // ── Sidebar ──
    'sidebar.channels': 'Salons',
    'sidebar.messages': 'Messages',
    'sidebar.friends': 'Amis',
    'sidebar.explore': 'Explorer',
    'sidebar.search_channels': 'Rechercher des salons...',
    'sidebar.favorites': 'FAVORIS',
    'sidebar.no_favorites': 'Pas encore de favoris',
    'sidebar.favorite_hint': 'Clic droit sur un salon pour le mettre en favori',
    'sidebar.channels_title': 'SALONS',
    'sidebar.direct_messages': 'MESSAGES DIRECTS',
    'sidebar.no_dms': 'Pas encore de conversations',
    'sidebar.dm_hint': 'Démarrez un MP avec le bouton ci-dessus',
    'sidebar.all': 'Tous',
    'sidebar.pending': 'En attente',
    'sidebar.blocked': 'Bloqués',
    'sidebar.no_friends': "Pas encore d'amis",
    'sidebar.friend_hint': 'Ajoutez des amis avec le bouton ci-dessus',
    'sidebar.search_rooms': 'Rechercher des salons à rejoindre...',
    'sidebar.no_rooms': 'Aucun salon trouvé',
    // ── Header ──
    'header.notifications': 'Notifications',
    'header.threads': 'Fils de discussion',
    'header.search': 'Rechercher',
    'header.more': 'Plus',
    'header.members': 'Membres',
    // ── Three-dot menu ──
    'menu.bookmarks': 'Favoris',
    'menu.todo': 'Liste de tâches',
    'menu.gallery': 'Galerie média',
    'menu.stats': 'Statistiques du salon',
    'menu.xp_shop': 'Boutique XP',
    'menu.settings': 'Paramètres',
    'menu.admin': 'Tableau de bord admin',
    'menu.bugreport': 'Signaler un bug',
    'menu.export': 'Exporter le chat',
    'menu.logout': 'Déconnexion',
    'menu.language': 'Langue',
    // ── Welcome ──
    'welcome.title': 'Bienvenue sur RedChat !',
    'welcome.subtitle': 'Sélectionnez un salon ou démarrez une conversation',
    'welcome.create_channel': 'Créer un salon',
    'welcome.add_friend': 'Ajouter un ami',
    // ── Chat ──
    'chat.new_messages': 'Nouveaux messages',
    'chat.typing': 'Quelqu\'un écrit...',
    'chat.replying_to': 'En réponse à',
    'chat.editing_message': 'Modification du message',
    'chat.pinned_message': 'Message épinglé',
    'chat.message_placeholder': 'Écrivez un message...',
    // ── Members ──
    'members.title': 'Membres',
    'members.search': 'Rechercher des membres...',
    // ── Threads ──
    'threads.title': 'Fils de discussion',
    'threads.new_thread': 'Nouveau fil',
    'threads.no_threads': 'Pas encore de fils',
    'threads.no_threads_hint': 'Créez un fil pour démarrer une discussion ciblée !',
    // ── Mobile nav ──
    'mobile.chat': 'Chat',
    'mobile.channels': 'Salons',
    'mobile.explore': 'Explorer',
    'mobile.dms': 'MP',
    'mobile.friends': 'Amis',
    'mobile.settings': 'Paramètres',
    // ── Settings ──
    'settings.title': 'Paramètres',
    'settings.my_profile': 'Mon profil',
    'settings.account': 'Compte',
    'settings.appearance': 'Apparence',
    'settings.notifications': 'Notifications',
    'settings.accessibility': 'Accessibilité',
    'settings.privacy': 'Confidentialité',
    'settings.profile_picture': 'Photo de profil',
    'settings.change_avatar': 'Changer l\'avatar',
    'settings.avatar_hint': 'JPG, PNG ou GIF. Max 5 Mo.',
    'settings.name_color': 'Couleur du nom',
    'settings.name_color_hint': 'Achetez "Couleur de nom personnalisée" dans la boutique XP !',
    'settings.choose_color': 'Choisissez la couleur de votre nom',
    'settings.age': 'Âge',
    'settings.age_placeholder': 'Votre âge',
    'settings.sex_gender': 'Sexe / Genre',
    'settings.bio': 'Bio',
    'settings.bio_placeholder': 'Parlez de vous...',
    'settings.save': 'Enregistrer',
    'settings.banner_gradient': 'Dégradé de bannière',
    'settings.banner_hint': 'Choisissez deux couleurs pour votre bannière.',
    'settings.color_1': 'Couleur 1',
    'settings.color_2': 'Couleur 2',
    'settings.apply_banner': 'Appliquer la bannière',
    'settings.personal_note': 'Note personnelle',
    'settings.personal_note_hint': 'Une note privée visible uniquement par vous.',
    'settings.personal_note_placeholder': 'Ajouter une note personnelle...',
    'settings.save_note': 'Enregistrer la note',
    'settings.account_settings': 'Paramètres du compte',
    'settings.email': 'E-mail',
    'settings.add_email': 'Ajouter un e-mail de récupération',
    'settings.verified': 'Vérifié',
    'settings.update_email': 'Mettre à jour l\'e-mail',
    'settings.verification_code': 'Code de vérification',
    'settings.verification_hint': 'Entrez le code à 6 chiffres envoyé à votre e-mail.',
    'settings.change_password': 'Changer le mot de passe',
    'settings.current_password': 'Mot de passe actuel',
    'settings.new_password': 'Nouveau mot de passe',
    'settings.export_data': 'Exporter mes données',
    'settings.export_hint': 'Téléchargez vos paramètres, favoris et préférences.',
    'settings.download_data': 'Télécharger les données',
    'settings.danger_zone': 'Zone de danger',
    'settings.danger_hint': 'La suppression du compte est irréversible.',
    'settings.delete_account': 'Supprimer le compte',
    'settings.theme': 'Thème',
    'settings.light': 'Clair',
    'settings.dark': 'Sombre',
    'settings.midnight': 'Minuit',
    // ── Tour ──
    'tour.welcome_title': 'Bienvenue sur RedChat ! 🎉',
    'tour.welcome_desc': 'Faisons un rapide tour d\'horizon. Ça ne prend qu\'une minute !',
    'tour.sidebar_title': 'Barre latérale et salons',
    'tour.sidebar_desc_mobile': 'Appuyez sur le bouton menu pour ouvrir la barre latérale. Basculez entre Salons, MP, Amis et Explorer.',
    'tour.sidebar_desc_desktop': 'Voici votre barre latérale. Basculez entre Salons, MP, Amis et Explorer avec les onglets. Clic droit pour mettre en favori !',
    'tour.chat_title': 'Zone de chat',
    'tour.chat_desc': 'C\'est ici que la magie opère. Les messages apparaissent en temps réel. Répondez, réagissez, ajoutez aux favoris — survolez ou appuyez longuement.',
    'tour.input_title': 'Saisie de message',
    'tour.input_desc': 'Tapez votre message ici. Utilisez le Markdown, joignez des fichiers, envoyez des vocaux ou utilisez les emoji et stickers. Tapez / pour les commandes !',
    'tour.threads_title': 'Fils de discussion',
    'tour.threads_desc_mobile': 'Les fils permettent des conversations ciblées dans un salon. Cherchez l\'icône fils pour les voir ou en créer.',
    'tour.threads_desc_desktop': 'Cliquez sur l\'icône fils pour voir ou créer des discussions. Idéal pour organiser les conversations !',
    'tour.friends_title': 'Amis et MP',
    'tour.friends_desc': 'Ajoutez des amis par nom, voyez qui est en ligne et démarrez des conversations privées. Vous serez notifié des nouveaux MP.',
    'tour.tools_title': 'Plus d\'outils',
    'tour.tools_desc': 'Accédez aux Favoris, Tâches, Galerie, Statistiques, Paramètres et plus depuis ce menu.',
    'tour.explore_title': 'Explorer les salons',
    'tour.explore_desc': 'Découvrez les salons créés par la communauté. Créez le vôtre avec des icônes, couleurs et permissions !',
    'tour.done_title': 'Vous êtes prêt ! 🚀',
    'tour.done_desc': 'Voilà les bases ! Plongez, envoyez des messages, faites-vous des amis et explorez. Amusez-vous bien !',
    'tour.lets_go': 'C\'est parti !',
    'tour.next': 'Suivant',
    'tour.back': 'Retour',
    'tour.finish': 'Terminer',
    'tour.lang_title': 'Choisissez votre langue 🌍',
    'tour.lang_desc': 'Sélectionnez votre langue préférée. Vous pourrez la changer plus tard dans le menu trois points.',
    // ── Language picker ──
    'lang.title': 'Choisir la langue',
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.italian': 'Italiano',
    // ── Common ──
    'common.confirm': 'Confirmer',
    'common.cancel': 'Annuler',
    'common.close': 'Fermer',
    'common.search': 'Rechercher',
    'common.save': 'Enregistrer',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.reply': 'Répondre',
    'common.pin': 'Épingler',
    'common.unpin': 'Désépingler',
    'common.bookmark': 'Favori',
    'common.report': 'Signaler',
    'common.copy': 'Copier',
    'common.mute': 'Rendre muet',
    'common.unmute': 'Réactiver le son',
    'common.block': 'Bloquer',
    'common.unblock': 'Débloquer',
    'common.send': 'Envoyer',
    'common.view_all': 'Voir tout',
    'common.logout_confirm': 'Êtes-vous sûr de vouloir vous déconnecter ?',
    'common.logged_out': 'Déconnexion réussie',
    'tour.complete': 'Visite terminée ! Profitez de RedChat 🎉',
    // ── RedAI ──
    'sidebar.redai': 'RedAI',
    'redai.welcome_title': 'Salut ! Je suis RedAI',
    'redai.welcome_desc': 'Votre assistant IA. Posez-moi une question, ou mentionnez @RedAI dans un salon !',
    'redai.placeholder': 'Demandez à RedAI...',
    'redai.joke': 'Raconte une blague',
    'redai.coding': 'Aide au code',
    'redai.capabilities': 'Que peux-tu faire ?',
    'redai.translate': 'Traduire',
    'redai.cleared': 'Conversation RedAI effacée',
    // ── AI Features ──
    'ai.ask_about': 'Demander à l\'IA',
    'ai.translate_msg': 'Traduire',
    'ai.explain': 'Expliquer',
    'ai.summary': 'Résumé du chat',
    'ai.thinking': 'RedAI réfléchit...',
    'ai.translating': 'Traduction en cours...',
    'ai.summarizing': 'Résumé du chat en cours...',
    'ai.explaining': 'Explication en cours...',
    'ai.error': 'L\'IA est temporairement indisponible',
    'ai.no_messages': 'Aucun message à résumer',
    'ai.original': 'Original',
    'ai.translated': 'Traduit',
    'ai.show_original': 'Afficher l\'original',
    'ai.show_translation': 'Afficher la traduction',
    'ai.sentiment': 'Analyse d\'humeur',
    'ai.smart_replies': 'Réponses intelligentes',
    'ai.rewrite': 'Réécrire le message',
    'ai.rewriting': 'Réécriture...',
    'ai.powered_by': 'Propulsé par Pollinations AI',
    'ai.tag': 'IA',
    'ai.auto_translate': 'Traduction auto',
    'menu.ai_summarize': 'Résumé IA',
    'menu.ai_chat': 'RedAI Chat',
    // ── Welcome Page ──
    'welcome.quick_start': 'Démarrage rapide',
    'welcome.change_avatar': 'Changer votre avatar',
    'welcome.change_avatar_desc': 'Personnalisez votre photo de profil',
    'welcome.settings': 'Paramètres',
    'welcome.settings_desc': 'Personnalisez votre expérience',
    'welcome.commands': 'Commandes du chat',
    'welcome.commands_desc': 'Découvrez toutes les commandes',
    'welcome.explore': 'Explorer les salons',
    'welcome.explore_desc': 'Découvrez des communautés à rejoindre',
    'welcome.mobile_app': 'Application mobile',
    'welcome.mobile_app_desc': 'Installez RedChat sur votre téléphone',
    // ── Badges ──
    'badge.select_hint': 'Cliquez pour afficher à côté de votre nom',
    'badge.none': 'Aucun',
    'badge.selected': 'Badge mis à jour !',
    // ── Translate ──
    'msg.translate': 'Traduire',
    // ── AI Reports ──
    'admin.ai_analyze': 'Analyse IA',
    'admin.ai_analyzing': 'Analyse en cours...',
    'admin.ai_analysis': 'Analyse IA',
    // ── User Not Found ──
    'user.not_found': 'Utilisateur introuvable',
  },
  it: {
    // ── Auth ──
    'auth.welcome_back': 'Bentornato',
    'auth.sign_in_subtitle': 'Accedi per continuare su RedChat',
    'auth.username': 'Nome utente',
    'auth.password': 'Password',
    'auth.enter_username': 'Inserisci il tuo nome utente',
    'auth.enter_password': 'Inserisci la tua password',
    'auth.sign_in': 'Accedi',
    'auth.no_account': 'Non hai un account?',
    'auth.create_one': 'Creane uno',
    'auth.forgot_password': 'Password dimenticata?',
    'auth.create_account': 'Crea account',
    'auth.join_community': 'Unisciti alla comunità',
    'auth.choose_username': 'Scegli un nome utente',
    'auth.email': 'E-mail',
    'auth.confirm_password': 'Conferma password',
    'auth.confirm_password_placeholder': 'Conferma la tua password',
    'auth.create_password': 'Crea una password',
    'auth.date_of_birth': 'Data di nascita',
    'auth.gender': 'Genere',
    'auth.prefer_not_say': 'Preferisco non dire',
    'auth.male': 'Maschio',
    'auth.female': 'Femmina',
    'auth.non_binary': 'Non binario',
    'auth.other': 'Altro',
    'auth.already_have_account': 'Hai già un account?',
    'auth.sign_in_link': 'Accedi',
    'auth.reset_password': 'Reimposta password',
    'auth.reset_subtitle': 'Inserisci il tuo nome utente per ricevere un codice',
    'auth.send_reset_code': 'Invia codice',
    'auth.reset_code': 'Codice di reset',
    'auth.enter_code': 'Inserisci il codice a 6 cifre',
    'auth.new_password': 'Nuova password',
    'auth.enter_new_password': 'Inserisci la nuova password',
    'auth.back_to_sign_in': 'Torna al login',
    'auth.verify_email': 'Verifica la tua e-mail',
    'auth.verify_subtitle': 'Inserisci il codice a 6 cifre inviato alla tua e-mail',
    'auth.verify': 'Verifica',
    'auth.didnt_receive': 'Non hai ricevuto il codice?',
    'auth.resend': 'Rinvia',
    'auth.skip_for_now': 'Salta per ora',
    'auth.username_hint': '2-20 caratteri, lettere, numeri, trattini bassi',
    'auth.email_hint': 'Obbligatorio — usato per verifica e recupero account',
    'auth.dob_hint': 'Obbligatorio — devi avere almeno 13 anni',
    'auth.gender_hint': 'Opzionale — mostrato sul tuo profilo',
    'auth.lightning_fast': 'Velocità lampo',
    'auth.lightning_desc': 'Messaggistica in tempo reale senza ritardi',
    'auth.secure_private': 'Sicuro e privato',
    'auth.secure_desc': 'Conversazioni crittografate end-to-end',
    'auth.fully_customizable': 'Completamente personalizzabile',
    'auth.customizable_desc': 'Temi, colori e personalizzazione',
    'auth.community_features': 'Funzionalità community',
    'auth.community_desc': 'Stanze, amici, sondaggi e altro',
    'auth.users': 'Utenti',
    'auth.rooms': 'Stanze',
    'auth.online': 'Online',
    'auth.tagline': 'La nuova generazione della comunicazione in tempo reale',
    // ── Splash ──
    'splash.contacting': 'Connessione al server...',
    // ── Sidebar ──
    'sidebar.channels': 'Canali',
    'sidebar.messages': 'Messaggi',
    'sidebar.friends': 'Amici',
    'sidebar.explore': 'Esplora',
    'sidebar.search_channels': 'Cerca canali...',
    'sidebar.favorites': 'PREFERITI',
    'sidebar.no_favorites': 'Nessun preferito',
    'sidebar.favorite_hint': 'Clic destro su un canale per aggiungerlo ai preferiti',
    'sidebar.channels_title': 'CANALI',
    'sidebar.direct_messages': 'MESSAGGI DIRETTI',
    'sidebar.no_dms': 'Nessuna conversazione',
    'sidebar.dm_hint': 'Inizia un MD con il pulsante sopra',
    'sidebar.all': 'Tutti',
    'sidebar.pending': 'In attesa',
    'sidebar.blocked': 'Bloccati',
    'sidebar.no_friends': 'Nessun amico ancora',
    'sidebar.friend_hint': 'Aggiungi amici con il pulsante sopra',
    'sidebar.search_rooms': 'Cerca stanze da unirsi...',
    'sidebar.no_rooms': 'Nessuna stanza trovata',
    // ── Header ──
    'header.notifications': 'Notifiche',
    'header.threads': 'Thread',
    'header.search': 'Cerca',
    'header.more': 'Altro',
    'header.members': 'Membri',
    // ── Three-dot menu ──
    'menu.bookmarks': 'Segnalibri',
    'menu.todo': 'Lista attività',
    'menu.gallery': 'Galleria media',
    'menu.stats': 'Statistiche canale',
    'menu.xp_shop': 'Negozio XP',
    'menu.settings': 'Impostazioni',
    'menu.admin': 'Pannello admin',
    'menu.bugreport': 'Segnala un bug',
    'menu.export': 'Esporta chat',
    'menu.logout': 'Esci',
    'menu.language': 'Lingua',
    // ── Welcome ──
    'welcome.title': 'Benvenuto su RedChat!',
    'welcome.subtitle': 'Seleziona un canale o inizia una conversazione',
    'welcome.create_channel': 'Crea canale',
    'welcome.add_friend': 'Aggiungi amico',
    // ── Chat ──
    'chat.new_messages': 'Nuovi messaggi',
    'chat.typing': 'Qualcuno sta scrivendo...',
    'chat.replying_to': 'In risposta a',
    'chat.editing_message': 'Modifica messaggio',
    'chat.pinned_message': 'Messaggio fissato',
    'chat.message_placeholder': 'Scrivi un messaggio...',
    // ── Members ──
    'members.title': 'Membri',
    'members.search': 'Cerca membri...',
    // ── Threads ──
    'threads.title': 'Thread',
    'threads.new_thread': 'Nuovo thread',
    'threads.no_threads': 'Nessun thread',
    'threads.no_threads_hint': 'Crea un thread per iniziare una discussione!',
    // ── Mobile nav ──
    'mobile.chat': 'Chat',
    'mobile.channels': 'Canali',
    'mobile.explore': 'Esplora',
    'mobile.dms': 'MD',
    'mobile.friends': 'Amici',
    'mobile.settings': 'Impostazioni',
    // ── Settings ──
    'settings.title': 'Impostazioni',
    'settings.my_profile': 'Il mio profilo',
    'settings.account': 'Account',
    'settings.appearance': 'Aspetto',
    'settings.notifications': 'Notifiche',
    'settings.accessibility': 'Accessibilità',
    'settings.privacy': 'Privacy',
    'settings.profile_picture': 'Foto profilo',
    'settings.change_avatar': 'Cambia avatar',
    'settings.avatar_hint': 'JPG, PNG o GIF. Max 5MB.',
    'settings.name_color': 'Colore del nome',
    'settings.name_color_hint': 'Acquista "Colore nome personalizzato" nel negozio XP!',
    'settings.choose_color': 'Scegli il colore del tuo nome',
    'settings.age': 'Età',
    'settings.age_placeholder': 'La tua età',
    'settings.sex_gender': 'Sesso / Genere',
    'settings.bio': 'Bio',
    'settings.bio_placeholder': 'Racconta qualcosa di te...',
    'settings.save': 'Salva',
    'settings.banner_gradient': 'Gradiente banner',
    'settings.banner_hint': 'Scegli due colori per il gradiente del banner.',
    'settings.color_1': 'Colore 1',
    'settings.color_2': 'Colore 2',
    'settings.apply_banner': 'Applica banner',
    'settings.personal_note': 'Nota personale',
    'settings.personal_note_hint': 'Una nota privata visibile solo a te.',
    'settings.personal_note_placeholder': 'Aggiungi una nota personale...',
    'settings.save_note': 'Salva nota',
    'settings.account_settings': 'Impostazioni account',
    'settings.email': 'E-mail',
    'settings.add_email': 'Aggiungi e-mail di recupero',
    'settings.verified': 'Verificato',
    'settings.update_email': 'Aggiorna e-mail',
    'settings.verification_code': 'Codice di verifica',
    'settings.verification_hint': 'Inserisci il codice a 6 cifre inviato alla tua e-mail.',
    'settings.change_password': 'Cambia password',
    'settings.current_password': 'Password attuale',
    'settings.new_password': 'Nuova password',
    'settings.export_data': 'Esporta i miei dati',
    'settings.export_hint': 'Scarica impostazioni, preferiti e preferenze.',
    'settings.download_data': 'Scarica dati',
    'settings.danger_zone': 'Zona pericolosa',
    'settings.danger_hint': "L'eliminazione dell'account è irreversibile.",
    'settings.delete_account': 'Elimina account',
    'settings.theme': 'Tema',
    'settings.light': 'Chiaro',
    'settings.dark': 'Scuro',
    'settings.midnight': 'Mezzanotte',
    // ── Tour ──
    'tour.welcome_title': 'Benvenuto su RedChat! 🎉',
    'tour.welcome_desc': 'Facciamo un rapido tour per mostrarti tutto. Ci vuole solo un minuto!',
    'tour.sidebar_title': 'Barra laterale e canali',
    'tour.sidebar_desc_mobile': 'Tocca il pulsante menu per aprire la barra laterale. Passa tra Canali, MD, Amici ed Esplora.',
    'tour.sidebar_desc_desktop': 'Ecco la tua barra laterale. Passa tra Canali, MD, Amici ed Esplora con le schede. Clic destro per aggiungere ai preferiti!',
    'tour.chat_title': 'Area chat',
    'tour.chat_desc': 'Qui avviene la magia. I messaggi appaiono in tempo reale. Rispondi, reagisci, aggiungi ai preferiti — passa sopra o premi a lungo.',
    'tour.input_title': 'Input messaggio',
    'tour.input_desc': 'Scrivi il tuo messaggio qui. Usa il Markdown, allega file, invia vocali o usa emoji e sticker. Scrivi / per i comandi!',
    'tour.threads_title': 'Thread',
    'tour.threads_desc_mobile': 'I thread permettono conversazioni focalizzate in un canale. Cerca l\'icona thread per vederli o crearne.',
    'tour.threads_desc_desktop': 'Clicca sull\'icona thread per vedere o creare discussioni. Ottimo per organizzare le conversazioni!',
    'tour.friends_title': 'Amici e MD',
    'tour.friends_desc': 'Aggiungi amici per nome, vedi chi è online e inizia conversazioni private. Riceverai notifiche per i nuovi MD.',
    'tour.tools_title': 'Altri strumenti',
    'tour.tools_desc': 'Accedi a Segnalibri, Attività, Galleria, Statistiche, Impostazioni e altro da questo menu.',
    'tour.explore_title': 'Esplora canali',
    'tour.explore_desc': 'Scopri canali creati dalla comunità. Crea il tuo con icone, colori e permessi personalizzati!',
    'tour.done_title': 'Sei pronto! 🚀',
    'tour.done_desc': 'Ecco le basi! Tuffati, invia messaggi, fai amicizia ed esplora. Divertiti!',
    'tour.lets_go': 'Andiamo!',
    'tour.next': 'Avanti',
    'tour.back': 'Indietro',
    'tour.finish': 'Fine',
    'tour.lang_title': 'Scegli la tua lingua 🌍',
    'tour.lang_desc': 'Seleziona la tua lingua preferita. Puoi cambiarla in seguito nel menu tre punti.',
    // ── Language picker ──
    'lang.title': 'Scegli lingua',
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.italian': 'Italiano',
    // ── Common ──
    'common.confirm': 'Conferma',
    'common.cancel': 'Annulla',
    'common.close': 'Chiudi',
    'common.search': 'Cerca',
    'common.save': 'Salva',
    'common.delete': 'Elimina',
    'common.edit': 'Modifica',
    'common.reply': 'Rispondi',
    'common.pin': 'Fissa',
    'common.unpin': 'Rimuovi fissaggio',
    'common.bookmark': 'Segnalibro',
    'common.report': 'Segnala',
    'common.copy': 'Copia',
    'common.mute': 'Silenzia',
    'common.unmute': 'Riattiva suono',
    'common.block': 'Blocca',
    'common.unblock': 'Sblocca',
    'common.send': 'Invia',
    'common.view_all': 'Vedi tutto',
    'common.logout_confirm': 'Sei sicuro di voler uscire?',
    'common.logged_out': 'Disconnessione riuscita',
    'tour.complete': 'Tour completato! Goditi RedChat 🎉',
    // ── RedAI ──
    'sidebar.redai': 'RedAI',
    'redai.welcome_title': 'Ciao! Sono RedAI',
    'redai.welcome_desc': 'Il tuo assistente IA. Chiedimi qualsiasi cosa, o menziona @RedAI in un canale!',
    'redai.placeholder': 'Chiedi a RedAI...',
    'redai.joke': 'Raccontami una barzelletta',
    'redai.coding': 'Aiuto con il codice',
    'redai.capabilities': 'Cosa puoi fare?',
    'redai.translate': 'Traduci',
    'redai.cleared': 'Conversazione RedAI cancellata',
    // ── AI Features ──
    'ai.ask_about': 'Chiedi all\'IA',
    'ai.translate_msg': 'Traduci',
    'ai.explain': 'Spiega',
    'ai.summary': 'Riepilogo chat',
    'ai.thinking': 'RedAI sta pensando...',
    'ai.translating': 'Traduzione in corso...',
    'ai.summarizing': 'Riepilogo della chat in corso...',
    'ai.explaining': 'Spiegazione in corso...',
    'ai.error': 'L\'IA è temporaneamente non disponibile',
    'ai.no_messages': 'Nessun messaggio da riassumere',
    'ai.original': 'Originale',
    'ai.translated': 'Tradotto',
    'ai.show_original': 'Mostra originale',
    'ai.show_translation': 'Mostra traduzione',
    'ai.sentiment': 'Analisi dell\'umore',
    'ai.smart_replies': 'Risposte intelligenti',
    'ai.rewrite': 'Riscrivi messaggio',
    'ai.rewriting': 'Riscrittura...',
    'ai.powered_by': 'Powered by Pollinations AI',
    'ai.tag': 'IA',
    'ai.auto_translate': 'Traduzione automatica',
    'menu.ai_summarize': 'Riepilogo IA',
    'menu.ai_chat': 'RedAI Chat',
    // ── Welcome Page ──
    'welcome.quick_start': 'Avvio rapido',
    'welcome.change_avatar': 'Cambia il tuo avatar',
    'welcome.change_avatar_desc': 'Personalizza la tua immagine del profilo',
    'welcome.settings': 'Impostazioni',
    'welcome.settings_desc': 'Personalizza la tua esperienza',
    'welcome.commands': 'Comandi chat',
    'welcome.commands_desc': 'Scopri tutti i comandi disponibili',
    'welcome.explore': 'Esplora canali',
    'welcome.explore_desc': 'Scopri comunità da unirsi',
    'welcome.mobile_app': 'App mobile',
    'welcome.mobile_app_desc': 'Installa RedChat sul tuo telefono',
    // ── Badges ──
    'badge.select_hint': 'Clicca per mostrare accanto al tuo nome',
    'badge.none': 'Nessuno',
    'badge.selected': 'Badge aggiornato!',
    // ── Translate ──
    'msg.translate': 'Traduci',
    // ── AI Reports ──
    'admin.ai_analyze': 'Analisi IA',
    'admin.ai_analyzing': 'Analisi in corso...',
    'admin.ai_analysis': 'Analisi IA',
    // ── User Not Found ──
    'user.not_found': 'Utente non trovato',
  },
  // ═══════════════════════ SPANISH ═══════════════════════
  es: {
    'auth.welcome_back': 'Bienvenido de nuevo',
    'auth.sign_in_subtitle': 'Inicia sesión para continuar en RedChat',
    'auth.username': 'Usuario',
    'auth.password': 'Contraseña',
    'auth.enter_username': 'Ingresa tu usuario',
    'auth.enter_password': 'Ingresa tu contraseña',
    'auth.sign_in': 'Iniciar sesión',
    'auth.no_account': '¿No tienes cuenta?',
    'auth.create_one': 'Crear una',
    'auth.create_account': 'Crear cuenta',
    'auth.join_community': 'Únete a la comunidad',
    'auth.email': 'Correo electrónico',
    'auth.confirm_password': 'Confirmar contraseña',
    'auth.date_of_birth': 'Fecha de nacimiento',
    'auth.gender': 'Género',
    'auth.male': 'Masculino',
    'auth.female': 'Femenino',
    'auth.other': 'Otro',
    'auth.already_have_account': '¿Ya tienes cuenta?',
    'auth.sign_in_link': 'Iniciar sesión',
    'msg.type_message': 'Escribe un mensaje...',
    'sidebar.rooms': 'Salas',
    'sidebar.friends': 'Amigos',
    'sidebar.dms': 'Mensajes',
    'settings.title': 'Configuración',
    'settings.theme': 'Tema',
    'settings.dark': 'Oscuro',
    'settings.light': 'Claro',
    'settings.notifications': 'Notificaciones',
    'settings.sounds': 'Sonidos',
    'menu.language': 'Idioma',
    'menu.settings': 'Configuración',
    'menu.logout': 'Cerrar sesión',
    'common.close': 'Cerrar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.copy': 'Copiar',
    'common.send': 'Enviar',
    'common.search': 'Buscar',
    'lang.title': 'Idioma',
    'ai.thinking': 'Pensando...',
    'ai.translating': 'Traduciendo...',
    'ai.explaining': 'Explicando...',
    'ai.translated': 'Traducido',
    'ai.powered_by': 'Impulsado por Pollinations AI',
    'ai.tag': 'IA',
    'ai.auto_translate': 'Traducción automática',
    'ai.ask_about': 'Preguntar a la IA',
    'ai.translate_msg': 'Traducir',
    'ai.explain': 'Explicar',
    'ai.rewrite': 'Reescribir',
    'ai.sentiment': 'Ánimo',
    'ai.smart_replies': 'Respuestas rápidas',
    'ai.error': 'IA no disponible temporalmente',
    'welcome.quick_start': 'Inicio rápido',
    'welcome.commands': 'Comandos del chat',
    'welcome.explore': 'Explorar canales',
    'user.not_found': 'Usuario no encontrado',
    'redai.welcome_title': '¡Hola! Soy RedAI',
    'redai.welcome_desc': 'Tu asistente IA. ¡Pregúntame lo que quieras!',
  },
  // ═══════════════════════ GERMAN ═══════════════════════
  de: {
    'auth.welcome_back': 'Willkommen zurück',
    'auth.sign_in_subtitle': 'Melde dich an, um mit RedChat fortzufahren',
    'auth.username': 'Benutzername',
    'auth.password': 'Passwort',
    'auth.enter_username': 'Benutzername eingeben',
    'auth.enter_password': 'Passwort eingeben',
    'auth.sign_in': 'Anmelden',
    'auth.no_account': 'Kein Konto?',
    'auth.create_one': 'Erstelle eins',
    'auth.create_account': 'Konto erstellen',
    'auth.email': 'E-Mail',
    'auth.confirm_password': 'Passwort bestätigen',
    'auth.date_of_birth': 'Geburtsdatum',
    'auth.gender': 'Geschlecht',
    'auth.male': 'Männlich',
    'auth.female': 'Weiblich',
    'auth.other': 'Andere',
    'auth.already_have_account': 'Bereits ein Konto?',
    'auth.sign_in_link': 'Anmelden',
    'msg.type_message': 'Nachricht schreiben...',
    'sidebar.rooms': 'Räume',
    'sidebar.friends': 'Freunde',
    'sidebar.dms': 'Nachrichten',
    'settings.title': 'Einstellungen',
    'settings.theme': 'Design',
    'settings.dark': 'Dunkel',
    'settings.light': 'Hell',
    'settings.notifications': 'Benachrichtigungen',
    'menu.language': 'Sprache',
    'menu.settings': 'Einstellungen',
    'menu.logout': 'Abmelden',
    'common.close': 'Schließen',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.copy': 'Kopieren',
    'common.send': 'Senden',
    'common.search': 'Suchen',
    'lang.title': 'Sprache',
    'ai.thinking': 'Denkt nach...',
    'ai.translating': 'Übersetzt...',
    'ai.explaining': 'Erklärt...',
    'ai.translated': 'Übersetzt',
    'ai.powered_by': 'Unterstützt von Pollinations AI',
    'ai.tag': 'KI',
    'ai.auto_translate': 'Automatisch übersetzen',
    'ai.ask_about': 'KI fragen',
    'ai.translate_msg': 'Übersetzen',
    'ai.explain': 'Erklären',
    'ai.rewrite': 'Umschreiben',
    'ai.sentiment': 'Stimmung',
    'ai.smart_replies': 'Schnellantworten',
    'ai.error': 'KI vorübergehend nicht verfügbar',
    'welcome.quick_start': 'Schnellstart',
    'welcome.commands': 'Chat-Befehle',
    'welcome.explore': 'Kanäle erkunden',
    'user.not_found': 'Benutzer nicht gefunden',
    'redai.welcome_title': 'Hallo! Ich bin RedAI',
    'redai.welcome_desc': 'Dein KI-Assistent. Frag mich alles!',
  },
  // ═══════════════════════ PORTUGUESE ═══════════════════════
  pt: {
    'auth.welcome_back': 'Bem-vindo de volta',
    'auth.sign_in_subtitle': 'Entre para continuar no RedChat',
    'auth.username': 'Usuário',
    'auth.password': 'Senha',
    'auth.sign_in': 'Entrar',
    'auth.no_account': 'Não tem conta?',
    'auth.create_one': 'Criar uma',
    'auth.create_account': 'Criar conta',
    'auth.email': 'E-mail',
    'msg.type_message': 'Digite uma mensagem...',
    'sidebar.rooms': 'Salas',
    'sidebar.friends': 'Amigos',
    'sidebar.dms': 'Mensagens',
    'settings.title': 'Configurações',
    'menu.language': 'Idioma',
    'menu.logout': 'Sair',
    'common.close': 'Fechar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.send': 'Enviar',
    'common.search': 'Buscar',
    'lang.title': 'Idioma',
    'ai.thinking': 'Pensando...',
    'ai.translated': 'Traduzido',
    'ai.powered_by': 'Fornecido por Pollinations AI',
    'ai.tag': 'IA',
    'ai.auto_translate': 'Tradução automática',
    'ai.error': 'IA temporariamente indisponível',
    'user.not_found': 'Usuário não encontrado',
    'redai.welcome_title': 'Olá! Eu sou o RedAI',
    'redai.welcome_desc': 'Seu assistente IA. Pergunte-me qualquer coisa!',
  },
  // ═══════════════════════ JAPANESE ═══════════════════════
  ja: {
    'auth.welcome_back': 'おかえりなさい',
    'auth.sign_in': 'ログイン',
    'auth.username': 'ユーザー名',
    'auth.password': 'パスワード',
    'auth.create_account': 'アカウント作成',
    'auth.email': 'メールアドレス',
    'msg.type_message': 'メッセージを入力...',
    'sidebar.rooms': 'ルーム',
    'sidebar.friends': '友達',
    'sidebar.dms': 'メッセージ',
    'settings.title': '設定',
    'menu.language': '言語',
    'menu.logout': 'ログアウト',
    'common.close': '閉じる',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.delete': '削除',
    'common.send': '送信',
    'common.search': '検索',
    'lang.title': '言語',
    'ai.thinking': '考え中...',
    'ai.translated': '翻訳済み',
    'ai.powered_by': 'Pollinations AI提供',
    'ai.tag': 'AI',
    'ai.auto_translate': '自動翻訳',
    'ai.error': 'AIは一時的に利用できません',
    'user.not_found': 'ユーザーが見つかりません',
    'redai.welcome_title': 'こんにちは！RedAIです',
    'redai.welcome_desc': 'AIアシスタントです。何でも聞いてください！',
  },
  // ═══════════════════════ KOREAN ═══════════════════════
  ko: {
    'auth.welcome_back': '다시 오신 것을 환영합니다',
    'auth.sign_in': '로그인',
    'auth.username': '사용자 이름',
    'auth.password': '비밀번호',
    'auth.create_account': '계정 만들기',
    'msg.type_message': '메시지를 입력하세요...',
    'sidebar.rooms': '방',
    'sidebar.friends': '친구',
    'sidebar.dms': '메시지',
    'settings.title': '설정',
    'menu.language': '언어',
    'menu.logout': '로그아웃',
    'common.close': '닫기',
    'common.save': '저장',
    'common.send': '보내기',
    'common.search': '검색',
    'lang.title': '언어',
    'ai.thinking': '생각 중...',
    'ai.translated': '번역됨',
    'ai.tag': 'AI',
    'ai.auto_translate': '자동 번역',
    'ai.error': 'AI를 일시적으로 사용할 수 없습니다',
    'user.not_found': '사용자를 찾을 수 없습니다',
    'redai.welcome_title': '안녕하세요! RedAI입니다',
    'redai.welcome_desc': 'AI 어시스턴트입니다. 무엇이든 물어보세요!',
  },
  // ═══════════════════════ RUSSIAN ═══════════════════════
  ru: {
    'auth.welcome_back': 'С возвращением',
    'auth.sign_in': 'Войти',
    'auth.username': 'Имя пользователя',
    'auth.password': 'Пароль',
    'auth.create_account': 'Создать аккаунт',
    'auth.email': 'Электронная почта',
    'msg.type_message': 'Введите сообщение...',
    'sidebar.rooms': 'Комнаты',
    'sidebar.friends': 'Друзья',
    'sidebar.dms': 'Сообщения',
    'settings.title': 'Настройки',
    'menu.language': 'Язык',
    'menu.logout': 'Выйти',
    'common.close': 'Закрыть',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.send': 'Отправить',
    'common.search': 'Поиск',
    'lang.title': 'Язык',
    'ai.thinking': 'Думаю...',
    'ai.translated': 'Переведено',
    'ai.tag': 'ИИ',
    'ai.auto_translate': 'Автоперевод',
    'ai.error': 'ИИ временно недоступен',
    'user.not_found': 'Пользователь не найден',
    'redai.welcome_title': 'Привет! Я RedAI',
    'redai.welcome_desc': 'Ваш ИИ-ассистент. Спрашивайте о чём угодно!',
  },
  // ═══════════════════════ ARABIC ═══════════════════════
  ar: {
    'auth.welcome_back': 'مرحباً بعودتك',
    'auth.sign_in': 'تسجيل الدخول',
    'auth.username': 'اسم المستخدم',
    'auth.password': 'كلمة المرور',
    'auth.create_account': 'إنشاء حساب',
    'msg.type_message': 'اكتب رسالة...',
    'sidebar.rooms': 'الغرف',
    'sidebar.friends': 'الأصدقاء',
    'sidebar.dms': 'الرسائل',
    'settings.title': 'الإعدادات',
    'menu.language': 'اللغة',
    'menu.logout': 'تسجيل الخروج',
    'common.close': 'إغلاق',
    'common.save': 'حفظ',
    'common.send': 'إرسال',
    'common.search': 'بحث',
    'lang.title': 'اللغة',
    'ai.thinking': 'جارٍ التفكير...',
    'ai.translated': 'مترجم',
    'ai.tag': 'ذكاء',
    'ai.auto_translate': 'ترجمة تلقائية',
    'ai.error': 'الذكاء الاصطناعي غير متاح مؤقتاً',
    'user.not_found': 'المستخدم غير موجود',
    'redai.welcome_title': 'مرحباً! أنا RedAI',
    'redai.welcome_desc': 'مساعدك الذكي. اسألني أي شيء!',
  },
  // ═══════════════════════ DUTCH ═══════════════════════
  nl: {
    'auth.welcome_back': 'Welkom terug',
    'auth.sign_in': 'Inloggen',
    'auth.username': 'Gebruikersnaam',
    'auth.password': 'Wachtwoord',
    'auth.create_account': 'Account aanmaken',
    'auth.email': 'E-mail',
    'msg.type_message': 'Typ een bericht...',
    'sidebar.rooms': 'Kamers',
    'sidebar.friends': 'Vrienden',
    'sidebar.dms': 'Berichten',
    'settings.title': 'Instellingen',
    'menu.language': 'Taal',
    'menu.logout': 'Uitloggen',
    'common.close': 'Sluiten',
    'common.save': 'Opslaan',
    'common.cancel': 'Annuleren',
    'common.delete': 'Verwijderen',
    'common.send': 'Versturen',
    'common.search': 'Zoeken',
    'lang.title': 'Taal',
    'ai.thinking': 'Aan het denken...',
    'ai.translated': 'Vertaald',
    'ai.tag': 'AI',
    'ai.auto_translate': 'Automatisch vertalen',
    'ai.error': 'AI tijdelijk niet beschikbaar',
    'user.not_found': 'Gebruiker niet gevonden',
    'redai.welcome_title': 'Hallo! Ik ben RedAI',
    'redai.welcome_desc': 'Je AI-assistent. Vraag me alles!',
  }
};

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
    this.userAccents = {}; // per-user accent colors for initials
    this.myAvatar = null;
    this._aiRequestSeq = 0;
    this._aiAbortController = null;
    this._aiThinking = false;
    this._aiTypingIndicatorEl = null;
    this._redaiTypingEl = null;
    this.stickers = [];
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
    // Pixel canvas state
    this._lastPixelTime = 0;
    this._pixelData = [];
    this._pixelRoomKey = 'global';
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
    this.currentLang = localStorage.getItem('redchat_lang') || 'en';

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
      accent: '#e74c3c',
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

    try {
      this.cacheDOM();
      this.connect();
      this.bindEvents();
      this.applySavedTheme();
      this.initEmojiPicker();
      this.initIdleDetection();
      this.initServiceWorker();
      this.applyTranslations();
      this.startConnectionMonitor();
      this.initPerformanceTracking();
    } catch (e) {
      console.error('[RedChat] Constructor init error:', e);
    }
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
      regDateOfBirth: $('regDateOfBirth'),
      regGender: $('regGender'),
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
      mobileMenuBtn: $('mobileMenuBtn'),
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
      cameraInput: $('cameraInput'),
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
      mobileNavExplore: $('mobileNavExplore'),
      mobileNavDMs: $('mobileNavDMs'),
      mobileNavFriends: $('mobileNavFriends'),
      mobileNavSettings: $('mobileNavSettings'),
      mobileNavDMBadge: $('mobileNavDMBadge'),
      mobileNavRedAI: $('mobileNavRedAI'),
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
    this.updateAuthStats();
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
      Notification.requestPermission().then(p => {
        if (p === 'granted') this.subscribeToPush();
      });
    } else if ('Notification' in window && Notification.permission === 'granted') {
      this.subscribeToPush();
    }
  }

  /* ─── SERVICE WORKER + PUSH ─── */
  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      this._swReady = navigator.serviceWorker.register('/sw.js').then(reg => {
        this._swReg = reg;
        console.log('[SW] Registered');
        return reg;
      }).catch(err => { console.warn('[SW] Registration failed:', err); return null; });
    } else {
      this._swReady = Promise.resolve(null);
    }
  }

  async subscribeToPush() {
    // Wait for service worker registration if not yet ready
    if (!this._swReg && this._swReady) {
      await this._swReady;
    }
    if (!this._swReg || !this.username) return;
    try {
      // Get VAPID public key from server
      const res = await fetch('/api/push/vapidPublicKey');
      const { publicKey } = await res.json();
      const applicationServerKey = this._urlBase64ToUint8Array(publicKey);
      let sub = await this._swReg.pushManager.getSubscription();
      if (!sub) {
        sub = await this._swReg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
      }
      this._pushSub = sub;
      // Send subscription to server
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, subscription: sub.toJSON() })
      });
      console.log('[Push] Subscribed');
    } catch (err) {
      console.warn('[Push] Subscription failed:', err);
    }
  }

  _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
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

  /* ═══════════════════════ i18n / LANGUAGE ═══════════════════════ */
  t(key) {
    const lang = this.currentLang || 'en';
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
  }

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    this.currentLang = lang;
    localStorage.setItem('redchat_lang', lang);
    this.applyTranslations();
    // Also update the tour steps if tour is active
    if (this.tourActive) {
      this.tourSteps = this.getTourSteps();
    }
  }

  applyTranslations() {
    // Update all elements with data-i18n attribute (text content)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val && val !== key) el.textContent = val;
    });
    // Update all elements with data-i18n-placeholder (placeholders)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.t(key);
      if (val && val !== key) el.placeholder = val;
    });
    // Update all elements with data-i18n-title (title attributes)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = this.t(key);
      if (val && val !== key) el.title = val;
    });
    // Update elements with data-i18n-html (innerHTML with icon preservation)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = this.t(key);
      if (val && val !== key) {
        // Preserve leading <i> icon if present
        const icon = el.querySelector('i');
        if (icon) {
          const iconHTML = icon.outerHTML;
          el.innerHTML = iconHTML + ' ' + val;
        } else {
          el.textContent = val;
        }
      }
    });
    // Update the language picker active state
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
    // Update the language indicator in the three-dot menu
    const langIndicator = document.getElementById('currentLangFlag');
    if (langIndicator) {
      const flags = { en: '🇬🇧', fr: '🇫🇷', it: '🇮🇹' };
      langIndicator.textContent = flags[this.currentLang] || '🌍';
    }
  }

  openLanguagePicker() {
    // Create a language selection modal
    let modal = document.getElementById('languageModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'languageModal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal language-modal">
          <div class="modal-header">
            <h2><i class="fas fa-globe"></i> <span data-i18n="lang.title">${this.t('lang.title')}</span></h2>
            <button class="modal-x" data-close="languageModal"><i class="fas fa-xmark"></i></button>
          </div>
          <div class="modal-body">
            <div class="language-picker-grid">
              <button class="lang-option${this.currentLang === 'en' ? ' active' : ''}" data-lang="en">
                <span class="lang-flag">🇬🇧</span>
                <span class="lang-name">English</span>
              </button>
              <button class="lang-option${this.currentLang === 'fr' ? ' active' : ''}" data-lang="fr">
                <span class="lang-flag">🇫🇷</span>
                <span class="lang-name">Français</span>
              </button>
              <button class="lang-option${this.currentLang === 'it' ? ' active' : ''}" data-lang="it">
                <span class="lang-flag">🇮🇹</span>
                <span class="lang-name">Italiano</span>
              </button>
              <button class="lang-option${this.currentLang === 'es' ? ' active' : ''}" data-lang="es">
                <span class="lang-flag">🇪🇸</span>
                <span class="lang-name">Español</span>
              </button>
              <button class="lang-option${this.currentLang === 'de' ? ' active' : ''}" data-lang="de">
                <span class="lang-flag">🇩🇪</span>
                <span class="lang-name">Deutsch</span>
              </button>
              <button class="lang-option${this.currentLang === 'pt' ? ' active' : ''}" data-lang="pt">
                <span class="lang-flag">🇧🇷</span>
                <span class="lang-name">Português</span>
              </button>
              <button class="lang-option${this.currentLang === 'ja' ? ' active' : ''}" data-lang="ja">
                <span class="lang-flag">🇯🇵</span>
                <span class="lang-name">日本語</span>
              </button>
              <button class="lang-option${this.currentLang === 'ko' ? ' active' : ''}" data-lang="ko">
                <span class="lang-flag">🇰🇷</span>
                <span class="lang-name">한국어</span>
              </button>
              <button class="lang-option${this.currentLang === 'ru' ? ' active' : ''}" data-lang="ru">
                <span class="lang-flag">🇷🇺</span>
                <span class="lang-name">Русский</span>
              </button>
              <button class="lang-option${this.currentLang === 'ar' ? ' active' : ''}" data-lang="ar">
                <span class="lang-flag">🇸🇦</span>
                <span class="lang-name">العربية</span>
              </button>
              <button class="lang-option${this.currentLang === 'nl' ? ' active' : ''}" data-lang="nl">
                <span class="lang-flag">🇳🇱</span>
                <span class="lang-name">Nederlands</span>
              </button>
            </div>
            <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border-color);">
              <div id="autoTranslateToggle" class="auto-translate-toggle${this.autoTranslateEnabled ? ' active' : ''}" onclick="app.toggleAutoTranslate()">
                <i class="fas fa-language"></i>
                <span data-i18n="ai.auto_translate">${this.t('ai.auto_translate')}</span>
                <i class="fas fa-toggle-${this.autoTranslateEnabled ? 'on' : 'off'}" style="margin-left:auto;font-size:16px;"></i>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      // Close button
      modal.querySelector('[data-close="languageModal"]').addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
      // Language buttons
      modal.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setLanguage(btn.dataset.lang);
          modal.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.toast(btn.querySelector('.lang-name').textContent + ' ✓', 'success');
          setTimeout(() => { modal.style.display = 'none'; }, 400);
        });
      });
    } else {
      // Update active state
      modal.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
      });
      // Update title
      const titleSpan = modal.querySelector('[data-i18n="lang.title"]');
      if (titleSpan) titleSpan.textContent = this.t('lang.title');
    }
    modal.style.display = 'flex';
  }

  /* ─── SOCKET CONNECTION ─── */
  createSocketFallback() {
    const queuedEvents = [];
    const noop = () => {};
    return {
      __fallback: true,
      __queuedEvents: queuedEvents,
      emit: (event, ...args) => {
        queuedEvents.push([event, args]);
      },
      on: noop,
      once: noop,
      off: noop,
      removeAllListeners: noop,
      disconnect: noop,
      connect: noop
    };
  }

  loadLocalSocketClient() {
    if (typeof window.io === 'function') {
      return Promise.resolve();
    }

    if (this._socketLoaderPromise) {
      return this._socketLoaderPromise;
    }

    this._socketLoaderPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-redchat-socket-client="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Socket.IO client failed to load')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = '/socket.io/socket.io.js';
      script.async = true;
      script.dataset.redchatSocketClient = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Socket.IO client failed to load'));
      document.head.appendChild(script);
    }).finally(() => {
      this._socketLoaderPromise = null;
    });

    return this._socketLoaderPromise;
  }

  connect() {
    const queuedEvents = this.socket && this.socket.__queuedEvents ? [...this.socket.__queuedEvents] : [];

    if (typeof window.io !== 'function') {
      this.socket = this.socket && this.socket.__fallback ? this.socket : this.createSocketFallback();
      this.loadLocalSocketClient()
        .then(() => {
          if (typeof window.io === 'function') {
            this.connect();
          }
        })
        .catch(err => {
          console.warn('[RedChat] Socket.IO client unavailable, using offline fallback:', err);
        });
      return this.socket;
    }

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
        // resync friends/requests and rooms
        this.socket.emit('getFriendRequests');
        this.socket.emit('getFriends');
        this.socket.emit('getRoomList');
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
    this.socket.on('sponsoredAd', data => {
      if (data && data.url) this._openSponsoredAd(data.url);
    });
    this.socket.on('resetCodeSent', (data) => {
      this.pendingResetUser = data.username;
      if(this.dom.resetCodePanel) this.dom.resetCodePanel.style.display = 'block';
    });
    this.socket.on('passwordResetSuccess', (data) => {
      this.toast(data?.message || 'Password changed successfully!', 'success');
      // Only navigate to login if not already logged in
      if (!this.username) this.showAuthPanel('loginPanel');
    });
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
    this.socket.on('roomLeft', data => {
      this.rooms = this.rooms.filter(r => r !== data.roomName && r !== data.roomId);
      this.customRooms = this.customRooms.filter(r => {
        const name = typeof r === 'string' ? r : r.name;
        return name !== data.roomName && name !== data.roomId;
      });
      this.favorites = this.favorites.filter(f => f !== data.roomName && f !== data.roomId);
      this.saveFavorites();
      this.renderRooms();
      this.socket.emit('getRoomList');
    });
    // Typing indicators
    this.socket.on('userTyping', data => {
      if (data.username === this.username) return;
      if (!this._typingUsers) this._typingUsers = {};
      this._typingUsers[data.username] = { style: data.customStyle || null, time: Date.now() };
      this.updateTypingIndicator();
    });
    this.socket.on('userStopTyping', data => {
      if (!this._typingUsers) return;
      delete this._typingUsers[data.username];
      this.updateTypingIndicator();
    });
    this.socket.on('dmTyping', data => {
      if (data.from === this.username) return;
      if (!this._dmTypingUsers) this._dmTypingUsers = {};
      this._dmTypingUsers[data.from] = { style: data.customStyle || null, time: Date.now() };
      this.updateDMTypingIndicator();
    });
    this.socket.on('dmStopTyping', data => {
      if (!this._dmTypingUsers) return;
      delete this._dmTypingUsers[data.from];
      this.updateDMTypingIndicator();
    });
    this.socket.on('clearChat', () => {
      if (this.dom.messagesContainer) this.dom.messagesContainer.innerHTML = '';
      if (this.messageHistory) this.messageHistory[this.currentRoom] = [];
      this.toast('Chat cleared by admin', 'info');
    });
    this.socket.on('messagesPurged', data => {
      // Deduplicate: skip if we already handled this purge event (room+count+purgedBy)
      const purgeKey = `${data.room}:${data.count}:${data.purgedBy}`;
      if (this._lastPurgeKey === purgeKey) return;
      this._lastPurgeKey = purgeKey;
      setTimeout(() => { if (this._lastPurgeKey === purgeKey) this._lastPurgeKey = null; }, 2000);
      // Compare both room ID and display name since server sends room ID
      const matchesRoom = data.room === this.currentRoom ||
        data.room === (this.currentRoom || '').toLowerCase() ||
        (this.allRoomsData || []).some(r => r.id === data.room && r.name === this.currentRoom);
      if (matchesRoom && this.dom.messagesContainer) {
        this.dom.messagesContainer.innerHTML = '';
        this.socket.emit('joinRoom', { room: this.currentRoom });
      }
      this.toast(`${data.count || 0} messages purged`, 'info');
    });
    this.socket.on('presenceUpdate', data => {
      if (!data.username) return;
      if (data.presence === 'online' && !this.onlineUsers.includes(data.username)) {
        this.onlineUsers.push(data.username);
      } else if (data.presence === 'offline') {
        this.onlineUsers = this.onlineUsers.filter(u => u !== data.username);
      }
      this.renderFriends();
      this.renderDMs();
    });
    this.socket.on('userPresenceUpdate', data => {
      if (!data.username) return;
      if (data.status === 'offline') {
        this.onlineUsers = this.onlineUsers.filter(u => u !== data.username);
      } else if (!this.onlineUsers.includes(data.username)) {
        this.onlineUsers.push(data.username);
      }
      this.renderFriends();
      this.renderDMs();
    });
    this.socket.on('messageDeleted', data => this.handleMessageDeleted(data));
    this.socket.on('messageEdited', data => this.handleMessageEdited(data));
    this.socket.on('roomCreated', data => this.handleRoomCreated(data));

    // RedAI live typing indicator in chat
    this.socket.on('aiTyping', data => {
      // Only show AI typing indicator if the event is for the current room
      const aiRoom = (data.room || '').toLowerCase();
      const curRoom = (this.currentRoom || '').toLowerCase();
      if (aiRoom && curRoom && aiRoom !== curRoom) return;
      if (data.status === 'start') {
        this._showAITypingIndicator();
      } else {
        this._hideAITypingIndicator();
      }
    });
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
    this.socket.on('friendsUpdate', data => this.handleFriendsList(data));       // server sends this on login & after acceptFriend
    this.socket.on('friendRequests', data => this.handleFriendRequests(data));
    this.socket.on('friendRequestsUpdate', data => this.handleFriendRequests(data)); // server sends this on login
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
    // Sync server block list into V5 state (server emits 'blockList', not 'blockedList')
    this.socket.on('blockList', data => {
      const blockedArr = data.blocked || [];
      this.blocked = blockedArr;
      this.state.blockedUsers = new Set(blockedArr);
      this.saveBlockList();
      if (document.getElementById('blockListContainer')) this.renderBlockList();
    });
    this.socket.on('userBlocked', data => this.toast(`Blocked ${data.username}`, 'warning'));
    this.socket.on('userUnblocked', data => this.toast(`Unblocked ${data.username}`, 'success'));
    this.socket.on('blockSuccess', data => this.toast(`Blocked ${data.target}`, 'warning'));
    this.socket.on('unblockSuccess', data => this.toast(`Unblocked ${data.target}`, 'success'));

    // Avatar
    this.socket.on('avatarUpdate', data => {
      this.avatars[data.username] = data.avatar;
      if (data.username === this.username && data.avatar) {
        localStorage.setItem(`redchat_avatar:${data.username}`, data.avatar);
      }
      this.updateAvatarsInDOM(data.username, data.avatar);
    });
    this.socket.on('avatarData', data => {
      this.avatars = { ...this.avatars, ...data };
      // Update ALL users' avatars in the DOM (history loads before avatarData arrives)
      for (const [user, url] of Object.entries(data)) {
        if (url) {
          if (user === this.username) {
            localStorage.setItem(`redchat_avatar:${user}`, url);
          }
          this.updateAvatarsInDOM(user, url);
        }
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
    this.socket.on('activePolls', data => {
      const polls = Array.isArray(data) ? data : (data.polls || []);
      // Update existing poll cards with latest vote state; append only if missing from history
      polls.forEach(poll => {
        const existing = poll.id && document.querySelector(`.message[data-id="${poll.id}"] .msg-poll`);
        if (existing) {
          // Poll already rendered from history — just refresh vote state
          this.renderPollContent(existing, poll);
        } else {
          this.handlePollCreated(poll, true);
        }
      });
    });

    // Games
    this.socket.on('gameCreated', data => this.handleGameCreated(data));
    this.socket.on('gameUpdated', data => this.handleGameUpdated(data));
    this.socket.on('gameError', data => this.toast(data.message, 'error'));
    this.socket.on('gameLeaderboard', data => this.renderGameLeaderboard(data));

    // Pixel events
    this._setupPixelSocket();

    // Reactions
    this.socket.on('reactionUpdate', data => this.handleReactionUpdate(data));
    this.socket.on('reactionUpdated', data => this.handleReactionUpdate(data));

    // Room member management
    this.socket.on('roomMembers', data => this.handleRoomMembers(data));
    this.socket.on('roomAbout', data => this.handleRoomAbout(data));
    this.socket.on('roomDescriptionUpdated', data => {
      // Refresh if the about modal is open for this room
      const modal = document.getElementById('roomAboutModal');
      if (modal && modal.style.display !== 'none' && modal.dataset.room === data.room) {
        const desc = document.getElementById('raDescription');
        const inp = document.getElementById('raDescInput');
        if (desc) desc.textContent = data.description || 'No description.';
        if (inp) inp.value = data.description || '';
      }
      this.toast('Room updated!', 'success');
    });
    this.socket.on('kickedFromRoom', data => {
      const roomName = data.roomName || data.room;
      // Remove from local room lists
      this.rooms = this.rooms.filter(r => r !== data.room && r !== roomName);
      this.customRooms = this.customRooms.filter(r => {
        const n = typeof r === 'string' ? r : (r.name || r.id || '');
        return n !== data.room && n !== roomName;
      });
      this.renderRooms();
      // Navigate away if we were in that room
      if (this.currentRoom === data.room || this.currentRoom === roomName) {
        this.joinRoom('General');
      }
      // Show kicked card in chat with live countdown
      const mc = document.getElementById('messages');
      if (mc) {
        const card = document.createElement('div');
        card.className = 'kicked-card';
        const expiresAt = data.banExpiresAt || (Date.now() + 5 * 60 * 1000);
        card.innerHTML = `
          <div class="kicked-card-icon"><i class="fas fa-user-minus"></i></div>
          <div class="kicked-card-body">
            <div class="kicked-card-title">Kicked from <strong>#${this.escapeHTML(roomName)}</strong></div>
            <div class="kicked-card-sub">Removed by <strong>${this.escapeHTML(data.by)}</strong> &mdash; you can rejoin in <span class="kicked-timer"></span></div>
          </div>
        `;
        mc.appendChild(card);
        card.scrollIntoView({ behavior: 'smooth' });
        const timerEl = card.querySelector('.kicked-timer');
        const tick = () => {
          const left = Math.max(0, expiresAt - Date.now());
          const m = Math.floor(left / 60000);
          const s = Math.floor((left % 60000) / 1000);
          if (left <= 0) {
            timerEl.textContent = '';
            card.querySelector('.kicked-card-sub').innerHTML =
              `Removed by <strong>${this.escapeHTML(data.by)}</strong> &mdash; <span class="kicked-ready">you can rejoin now</span>`;
          } else {
            timerEl.textContent = (m > 0 ? m + 'm ' : '') + String(s).padStart(2,'0') + 's';
            setTimeout(tick, 1000);
          }
        };
        tick();
      }
    });

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
    this.socket.on('adminThreads', data => this.renderAdminThreads(data));
    this.socket.on('adminReports', data => this.renderAdminReports(data));
    this.socket.on('reportSuccess', () => { this.toast('Report submitted', 'success'); this.closeModal('reportModal'); });
    this.socket.on('reportSubmitted', () => { this.toast('Report submitted', 'success'); this.closeModal('reportModal'); });
    this.socket.on('adminError', data => this.toast(data.message, 'error'));

    // Bans
    this.socket.on('banned', data => { this.toast(`You have been banned: ${data.reason}`, 'error'); this.showAuth(); location.reload(); });
    this.socket.on('kicked', data => { this.toast(`Kicked: ${data.reason}`, 'warning'); this.showAuth(); });
    this.socket.on('muted', data => this.toast(`Muted for ${data.duration}`, 'warning'));
    this.socket.on('unmuted', () => this.toast('You have been unmuted', 'success'));
    this.socket.on('bannedUsers', data => this.renderBannedUsers(data));
    this.socket.on('userBanned', data => { this.toast(`${data.username} has been banned`, 'success'); this.socket.emit('adminGetBans'); });
    this.socket.on('userUnbanned', data => { this.toast(`${data.username} has been unbanned`, 'success'); this.socket.emit('adminGetBans'); });

    // Stickers — sync server sticker list
    this.socket.on('stickerList', () => {});
    this.socket.on('syncStickers', data => {
      this.stickers = data.stickers || [];
      // Re-render grid whenever the sticker/custom tab is active so data is fresh
      const activeTab = document.querySelector('.picker-tab.active');
      if (activeTab && (activeTab.dataset.category === 'stickers' || activeTab.dataset.category === 'custom')) {
        this.renderStickerGrid();
      }
    });
    this.socket.on('stickerAdded', () => {});

    // Status
    this.socket.on('statusUpdate', data => this.handleStatusUpdate(data));
    this.socket.on('userStatusList', data => this.handleUserStatusList(data));

    // Wheel of Fortune
    this.socket.on('wheelResult', data => this.handleWheelResult(data));
    this.socket.on('sharedWheel', data => this.handleSharedWheel(data));

    // AI Report Analysis
    this.socket.on('aiReportAnalysis', data => this.handleAIReportAnalysis(data));

    // Badge selection confirmation (no toast here — client shows toast on click)

    // Invite user to room
    this.socket.on('roomInvite', data => {
      this.toast(`You've been invited to ${data.roomName || data.room}`, 'info');
      this.addNotification({ type: 'room_invite', user: data.invitedBy || data.by, text: `Invited you to room: ${data.roomName || data.room}`, roomId: data.roomId, time: Date.now() });
    });
    this.socket.on('notification', data => {
      if (data.type === 'room_invite') {
        this.addNotification({ type: 'room_invite', user: data.from, text: data.message, roomId: data.roomId, time: data.timestamp || Date.now() });
      }
    });

    // While you were away
    this.socket.on('whileYouWereAway', data => this.showWhileYouWereAway(data));

    // Profile data
    this.socket.on('profileData', data => this.handleProfileData(data));
    // after reconnect we'll get accent updates from server; ensure avatars update
    this.socket.on('userAccentUpdate', data => {
      if (data && data.username && data.accent) {
        this.userAccents[data.username] = data.accent;
        this.updateAvatarsInDOM(data.username);
      }
      this.onUserAccentUpdate(data);
    });
    this.socket.on('userProfile', data => this.handleProfileData(data));
    this.socket.on('displayNameUpdated', data => {
      this.toast(`Display name changed to: ${data.displayName}`, 'success');
    });
    this.socket.on('searchResults', data => this.handleSearchResults(data));
    this.socket.on('forceRefresh', data => {
      this.toast(data.reason || 'Your permissions have been updated. Refreshing...', 'info');
      setTimeout(() => location.reload(), 1500);
    });
    this.socket.on('nameColorUpdated', data => {
      this.nameColor = data.color || '';
      this.toast('Name color updated!', 'success');
    });
    this.socket.on('bioUpdated', data => this.toast('Bio updated!', 'success'));

    // Room Threads (sub-rooms)
    this.socket.on('roomThreads', data => this.handleRoomThreadsList(data));
    this.socket.on('roomThreadCreated', data => this.handleRoomThreadCreated(data));
    this.socket.on('threadPinned', data => this.handleThreadPinned(data));
    this.socket.on('threadDeleted', data => this.handleThreadDeleted(data));
    this.socket.on('threadLocked', data => this.handleThreadLockedUpdate(data));

    // Chat stats response
    this.socket.on('chatStatsResponse', data => this._handleServerChatStats(data));

    // Email update response
    this.socket.on('emailUpdateSuccess', data => {
      this.toast(data.message || 'Email updated successfully!', 'success');
      const btn = document.getElementById('updateEmailBtn');
      if (btn) { btn.disabled = false; btn.innerHTML = 'Update Email'; }
      // Show verification code input
      const verifySection = document.getElementById('emailVerifyCodeSection');
      if (verifySection) verifySection.style.display = '';
    });

    // Email verification success (from settings)
    this.socket.on('emailVerified', () => {
      this.toast('Email verified successfully!', 'success');
      const verifySection = document.getElementById('emailVerifyCodeSection');
      if (verifySection) verifySection.style.display = 'none';
      const badge = document.getElementById('emailVerifiedBadge');
      if (badge) badge.style.display = '';
    });

    // Admin account deleted
    this.socket.on('accountDeleted', data => this.toast(`Account ${data.username} deleted`, 'success'));

    // Perk purchased
    this.socket.on('perkPurchased', data => {
      this.toast(`Purchased: ${data.name}!`, 'success');
      this.userXP = data.remainingXP;
      if (!this.userPerks) this.userPerks = [];
      if (!this.userPerks.includes(data.perkId)) this.userPerks.push(data.perkId);
      // Apply name glow immediately to all your messages in the DOM
      if (data.perkId === 'custom_name_glow') {
        document.querySelectorAll('.msg-author').forEach(el => {
          if (el.textContent.replace(/\s*🛡️|👑|⭐|💎/g, '').trim() === this.username) {
            el.classList.add('name-glow');
          }
        });
      }
      // Refresh the shop modal if open
      const shopModal = document.getElementById('xpShopModal');
      if (shopModal && shopModal.style.display !== 'none') {
        this.showAchievementsView();
      }
    });

    // Bug reports
    this.socket.on('bugReportsList', data => this.renderAdminBugReports(data));

    // Admin events list
    this.socket.on('adminEventsList', data => this.renderAdminEvents(data));

    // Achievements
    this.socket.on('achievementUnlocked', data => {
      this.toast(`Achievement Unlocked: ${data.name || data.title || ''} ${data.icon || '🏆'}`, 'success');
      if (this.state.achievements) this.state.achievements.push(data);
      // Auto-refresh the XP Shop modal if it's open
      const shopModal = document.getElementById('xpShopModal');
      if (shopModal && shopModal.style.display !== 'none') {
        this.showAchievementsView();
      }
    });

    // Custom Emoji
    this.socket.on('customEmojiAdded', data => { if (!this.customEmojis) this.customEmojis = []; this.customEmojis.push(data); });
    this.socket.on('customEmojiDeleted', data => { if (this.customEmojis) this.customEmojis = this.customEmojis.filter(e => e.id !== data.emojiId); });
    this.socket.on('customEmojiList', data => { this.customEmojis = data.emojis || data || []; });
    this.socket.on('customEmojiCreated', data => this.toast('Custom emoji created!', 'success'));

    // Read receipts (DMs only)
    this.socket.on('readReceipt', data => this.handleReadReceipt(data));

    // Profile updated confirmation — sync local state
    this.socket.on('profileUpdated', data => {
      if (data.profile) {
        if (data.profile.age !== undefined) this.age = data.profile.age || '';
        if (data.profile.gender !== undefined) this.genre = data.profile.gender || '';
        if (data.profile.bio !== undefined) this.bio = data.profile.bio || '';
      }
    });

    // DM conversation deleted (by partner or self)
    this.socket.on('dmConversationDeleted', data => {
      const partner = data.with;
      if (!partner) return;
      delete this.dmHistory[partner];
      delete this.unreadDMs[partner];
      this.dmConversations = (this.dmConversations || []).filter(u => u !== partner);
      if (this.currentDM === partner && this.isDM) {
        this.isDM = false;
        this.currentDM = null;
        if (this.dom.messagesContainer) this.dom.messagesContainer.innerHTML = '';
      }
      this.renderDMs();
      if (data.deletedBy && data.deletedBy !== this.username) {
        this.toast(`${data.deletedBy} deleted your conversation`, 'info');
      }
    });

    // Events / Calendar
    this.socket.on('eventCreated', data => this.handleEventCreated(data));
    this.socket.on('eventUpdated', data => this.handleEventUpdated(data));
    this.socket.on('eventCancelled', data => this.handleEventCancelled(data));
    this.socket.on('eventResponseSaved', data => this.toast('Your RSVP has been saved!', 'success'));

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
    this.socket.on('error', data => {
      this.toast(data.message || 'An error occurred', 'error');
      const emailBtn = document.getElementById('updateEmailBtn');
      if (emailBtn?.disabled) { emailBtn.disabled = false; emailBtn.innerHTML = 'Update Email'; }
      // Reset any spinning perk buy buttons
      document.querySelectorAll('.perk-buy-btn').forEach(btn => {
        if (btn.disabled && btn.querySelector('.fa-spinner')) {
          btn.disabled = false;
          btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Buy';
        }
      });
    });
    this.socket.on('slowMode', data => this.toast(`Slow mode: wait ${data.seconds}s`, 'warning'));
    this.socket.on('authStats', data => this.updateAuthStats(data));

    // Server file change — show refresh banner
    this.socket.on('serverUpdated', data => {
      // Don't show multiple banners
      if (document.getElementById('serverUpdateBanner')) return;
      const banner = document.createElement('div');
      banner.id = 'serverUpdateBanner';
      banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:10px 16px;display:flex;align-items:center;justify-content:center;gap:12px;font-size:14px;font-weight:500;box-shadow:0 2px 12px rgba(0,0,0,.3);animation:slideDown .3s ease;';
      banner.innerHTML = '<i class="fas fa-sync-alt"></i> RedChat has been updated! <button onclick="location.reload()" style="background:#fff;color:#333;border:none;padding:6px 16px;border-radius:6px;font-weight:600;cursor:pointer;font-size:13px;">Refresh Now</button> <button onclick="this.parentElement.remove()" style="background:none;border:none;color:rgba(255,255,255,.8);cursor:pointer;font-size:16px;padding:4px;"><i class="fas fa-times"></i></button>';
      document.body.prepend(banner);
    });

    if (queuedEvents.length) {
      queuedEvents.forEach(([event, args]) => {
        try {
          this.socket.emit(event, ...args);
        } catch (err) {
          console.warn('[RedChat] Failed to replay queued socket event:', event, err);
        }
      });
      if (this.socket.__queuedEvents) {
        this.socket.__queuedEvents.length = 0;
      }
    }
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

    // Verify digit auto-advance + paste support
    if (this.dom.verifyDigits) {
      this.dom.verifyDigits.forEach((digit, i) => {
        digit.addEventListener('input', () => {
          // Only allow digits
          digit.value = digit.value.replace(/[^0-9]/g, '');
          if (digit.value && i < this.dom.verifyDigits.length - 1) {
            this.dom.verifyDigits[i + 1].focus();
          }
        });
        digit.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !digit.value && i > 0) {
            this.dom.verifyDigits[i - 1].focus();
          }
        });
        // Handle paste — distribute digits across all fields
        digit.addEventListener('paste', (e) => {
          e.preventDefault();
          const pasted = (e.clipboardData.getData('text') || '').replace(/[^0-9]/g, '');
          if (!pasted) return;
          for (let j = 0; j < this.dom.verifyDigits.length && j < pasted.length; j++) {
            this.dom.verifyDigits[j].value = pasted[j];
          }
          // Focus last filled or last field
          const focusIdx = Math.min(pasted.length, this.dom.verifyDigits.length) - 1;
          this.dom.verifyDigits[focusIdx].focus();
        });
      });
    }

    // ═══ SIDEBAR (Mobile-first toggling) ═══
    onClick(this.dom.sidebarToggle, this.toggleSidebar);
    onClick(this.dom.mobileMenuBtn, this.toggleSidebar);
    onClick(this.dom.sidebarClose, this.closeSidebar);
    onClick(this.dom.sidebarOverlay, this.closeSidebar);

    // ═══ MOBILE SWIPE GESTURES ═══
    this._initMobileSwipeGestures();

    // ═══ MOBILE KEYBOARD VIEWPORT FIX ═══
    if (window.visualViewport && window.innerWidth < 768) {
      window.visualViewport.addEventListener('resize', () => {
        const inputArea = document.querySelector('.input-area');
        const chatMain = document.querySelector('.chat-main');
        if (inputArea && chatMain) {
          // Adjust for virtual keyboard
          const viewportHeight = window.visualViewport.height;
          const offset = window.innerHeight - viewportHeight;
          if (offset > 50) {
            // Keyboard is open
            inputArea.style.position = 'fixed';
            inputArea.style.bottom = '0';
            inputArea.style.left = '0';
            inputArea.style.right = '0';
            inputArea.style.zIndex = '1000';
            chatMain.style.paddingBottom = inputArea.offsetHeight + 'px';
          } else {
            // Keyboard is closed
            inputArea.style.position = '';
            inputArea.style.bottom = '';
            inputArea.style.left = '';
            inputArea.style.right = '';
            inputArea.style.zIndex = '';
            chatMain.style.paddingBottom = '';
          }
        }
      });
    }

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
    onClick(this.dom.newDMBtn, () => {
      this.openModal('newDMModal');
      const input = document.getElementById('dmSearchInput');
      if (input) {
        input.value = '';
        input.focus();
        // Show friends list immediately on open
        this._showDMFriendsList();
      }
    });

    // ═══ MOBILE BOTTOM NAV ═══
    onClick(this.dom.mobileNavChat, () => {
      this.closeSidebar();
      this.closeMembers();
      this.updateMobileNav('chat');
      // If returning from RedAI, re-join the last room
      if (this.isRedAI && this._preRedAIRoom) {
        this.joinRoom(this._preRedAIRoom);
      }
    });
    onClick(this.dom.mobileNavChannels, () => {
      // Toggle: if sidebar already open on channels, close it
      if (this.dom.sidebar?.classList.contains('open') && this._activeMobileTab === 'channels') {
        this.closeSidebar();
        this.updateMobileNav('chat');
        return;
      }
      this.switchSidebarTab('channels');
      this.openSidebar();
      this.updateMobileNav('channels');
    });
    onClick(this.dom.mobileNavExplore, () => {
      if (this.dom.sidebar?.classList.contains('open') && this._activeMobileTab === 'explore') {
        this.closeSidebar();
        this.updateMobileNav('chat');
        return;
      }
      this.switchSidebarTab('explore');
      this.openSidebar();
      this.updateMobileNav('explore');
    });
    onClick(this.dom.mobileNavDMs, () => {
      if (this.dom.sidebar?.classList.contains('open') && this._activeMobileTab === 'dms') {
        this.closeSidebar();
        this.updateMobileNav('chat');
        return;
      }
      this.switchSidebarTab('dms');
      this.openSidebar();
      this.updateMobileNav('dms');
    });
    onClick(this.dom.mobileNavRedAI, () => {
      this.closeSidebar();
      this.openRedAIChat();
    });
    onClick(this.dom.mobileNavFriends, () => {
      if (this.dom.sidebar?.classList.contains('open') && this._activeMobileTab === 'friends') {
        this.closeSidebar();
        this.updateMobileNav('chat');
        return;
      }
      this.switchSidebarTab('friends');
      this.openSidebar();
      this.updateMobileNav('friends');
    });
    onClick(this.dom.mobileNavSettings, () => {
      this.openModal('settingsModal');
      this.updateMobileNav('settings');
    });

    // ═══ HEADER ═══
    onClick(this.dom.searchBtn, () => this.openModal('searchModal'));
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
      // Hide AI features when on welcome page (no room/DM/RedAI active)
      const isWelcome = !this.currentRoom && !this.isDM && !this.isRedAI;
      this.dom.toolsDropdown?.querySelectorAll('[data-action]').forEach(item => {
        const act = item.dataset.action;
        if (act === 'ai-summarize' || act === 'ai-chat') {
          item.style.display = isWelcome ? 'none' : '';
        }
      });
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
      // Store delayed file input trigger to ensure user-gesture chain works on mobile
      const triggerFileInput = (accept) => {
        if (this.dom.fileInput) {
          this.dom.fileInput.accept = accept;
          // Small delay so context menu fully closes first
          setTimeout(() => this.dom.fileInput?.click(), 50);
        }
      };
      const items = [
        { label: 'Upload File', icon: 'fas fa-file-arrow-up', action: 'file', handler: () => triggerFileInput('.pdf,.txt,.zip,.rar,.doc,.docx,.xls,.xlsx,.csv,.pptx,*/*') },
        { label: 'Upload Image', icon: 'fas fa-image', action: 'image', handler: () => triggerFileInput('image/*') },
        { label: 'Upload Video', icon: 'fas fa-video', action: 'video', handler: () => triggerFileInput('video/*') },
        { label: 'Take Photo', icon: 'fas fa-camera', action: 'camera', handler: () => { setTimeout(() => this.dom.cameraInput?.click(), 50); } },
        { separator: true },
        { label: 'Create Event', icon: 'fas fa-calendar-plus', action: 'event', handler: () => this.showCreateEventDialog() },
        { label: 'Create Poll', icon: 'fas fa-poll', action: 'poll', handler: () => this.showCreatePollDialog() },
        { label: 'Spin the Wheel', icon: 'fas fa-dharmachakra', action: 'wheel', handler: () => this.showWheelDialog() },
        { label: 'Play a Game', icon: 'fas fa-gamepad', action: 'game', handler: () => this.showGameSelectDialog() },
        { separator: true },
        { label: 'Share Location', icon: 'fas fa-location-dot', action: 'location', handler: () => this.shareLocation() },
      ];
      // Position the context menu above the button, clamped to viewport
      const fakeEvent = { preventDefault: () => {}, clientX: rect.left + rect.width / 2, clientY: rect.top - 4, _openAbove: true };
      this.showContextMenu(fakeEvent, items);
    });
    on(this.dom.fileInput, 'change', this.handleFileUpload);
    on(this.dom.cameraInput, 'change', this.handleFileUpload);

    // Sticker picker
    onClick(this.dom.stickerBtn, (e) => {
      e.stopPropagation();
      this.closeContextMenu();
      const picker = this.dom.stickerPicker;
      if (!picker) return;
      // Move to body on first use so it can never be clipped by overflow
      if (picker.parentNode !== document.body) document.body.appendChild(picker);
      picker.classList.toggle('active');
      if (picker.classList.contains('active')) {
        if (!this._emojiInitialized) {
          this.initEmojiPicker();
        }
        // Re-render sticker grid on open if the sticker tab is active
        const activeTab = document.querySelector('.picker-tab.active');
        if (activeTab && (activeTab.dataset.category === 'stickers' || activeTab.dataset.category === 'custom')) {
          this.renderStickerGrid();
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
    onClick(this.dom.voiceBtn, () => { this.closeContextMenu(); this.toggleRecording(); });

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
      this.closeContextMenu();
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
          // Hide invisible option if user doesn't have the perk
          const invisOpt = picker.querySelector('[data-status="invisible"]');
          if (invisOpt) {
            const canInvis = (this.userPerks || []).includes('invisible_mode') || this.userRole === 'admin';
            invisOpt.style.display = canInvis ? '' : 'none';
          }
        }
      }
    });
    onClick(this.dom.userSettingsBtn, () => { this.closeContextMenu(); this.openModal('settingsModal'); });
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

    // DM user search — live search
    const dmSearchInput = document.getElementById('dmSearchInput');
    if (dmSearchInput) {
      dmSearchInput.addEventListener('input', this.debounce(() => {
        const q = dmSearchInput.value.trim();
        if (q.length > 0) {
          this.socket.emit('searchUsers', { query: q });
        } else {
          this._showDMFriendsList();
        }
      }, 250));
    }
    this.socket.on('searchUsersResults', data => this._renderDMSearchResults(data.users || []));

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
    // Bind remove-opt buttons on initial wheel options
    document.querySelectorAll('#wheelOptions .remove-opt').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.wheel-opt-row')?.remove());
    });


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

    // ═══ REDAI ═══
    this.initRedAI();

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
          (() => {
            const isBookmarked = (this.bookmarks || []).some(b => (b.messageId || b.id) === msgId);
            return isBookmarked
              ? { label: 'Unbookmark', icon: 'fas fa-bookmark', action: 'bookmark', handler: () => { this.socket.emit('bookmark', { messageId: msgId, message: msgText, username: msgUser, room: this.currentRoom, timestamp: Date.now() }); this.toast('Bookmark removed', 'info'); } }
              : { label: 'Bookmark', icon: 'far fa-bookmark', action: 'bookmark', handler: () => { this.socket.emit('bookmark', { messageId: msgId, message: msgText, username: msgUser, room: this.currentRoom, timestamp: Date.now() }); this.toast('Bookmarked!', 'success'); } };
          })(),
          { label: 'Copy Text', icon: 'fas fa-copy', action: 'copy', handler: () => { navigator.clipboard.writeText(msgText); this.toast('Copied!', 'success'); } },
          { separator: true },
        ];
        // Hide AI options for non-text content (polls, wheels, stickers, files, images, videos, audio, voice)
        const hasNonTextContent = !!(msgEl.querySelector('.msg-wheel, .msg-poll, .msg-game-invite, .msg-sticker, .msg-file, .file-attachment, .msg-image, .msg-video, .msg-audio, .voice-message-bubble'));
        const hasTextContent = !!(msgText && msgText.trim());
        if (!hasNonTextContent && hasTextContent) {
          items.push(
            { label: this.t('ai.ask_about') || 'Ask AI about this', icon: 'fas fa-robot', action: 'ai-ask', handler: () => this.aiAskAbout(msgText, msgId) },
            { label: this.t('ai.translate_msg') || 'Translate', icon: 'fas fa-language', action: 'ai-translate', handler: () => this.aiTranslateMessage(msgText, msgId) },
            { label: this.t('ai.explain') || 'Explain', icon: 'fas fa-lightbulb', action: 'ai-explain', handler: () => this.aiExplainMessage(msgText, msgId) },
            { label: this.t('ai.rewrite') || 'Rewrite', icon: 'fas fa-wand-magic-sparkles', action: 'ai-rewrite', handler: () => this.aiRewriteMessage(msgText, msgId) },
            { label: this.t('ai.smart_replies') || 'Smart Replies', icon: 'fas fa-reply-all', action: 'ai-smart', handler: () => this.aiSmartReplies(msgText) },
          );
        }
        if (msgUser !== this.username) {
          items.push({ label: 'Report', icon: 'fas fa-flag', action: 'report', danger: true, handler: () => {
            this.openReportModal(msgUser, msgId);
          } });
        }
        if (msgUser === this.username || this.userRole === 'admin' || this.userRole === 'moderator') {
          items.push({ separator: true });
          if (msgUser === this.username) items.push({ label: 'Edit', icon: 'fas fa-pencil', action: 'edit', handler: () => this.startEdit(data) });
          items.push({ label: 'Delete', icon: 'fas fa-trash', action: 'delete', danger: true, handler: () => { if (confirm('Delete this message?')) this.socket.emit('deleteMessage', { id: msgId, room: this.currentRoom }); } });
        }
        this.showContextMenu(e, items);
      }
    });

    // ═══ LONG-PRESS FOR MOBILE CONTEXT MENU ═══
    let longPressTimer = null;
    let longPressMsg = null;
    let longPressFired = false;
    this.dom.chatMessages?.addEventListener('touchstart', (e) => {
      const msg = e.target.closest('.message');
      if (!msg) return;
      longPressMsg = msg;
      longPressFired = false;
      longPressTimer = setTimeout(() => {
        longPressFired = true;
        if (navigator.vibrate) navigator.vibrate(30);
        // Trigger context menu like right-click
        const touch = e.changedTouches?.[0] || e.touches?.[0];
        const fakeEvent = { preventDefault: () => {}, clientX: touch?.clientX || 0, clientY: touch?.clientY || 0 };
        const msgId = msg.dataset.id;
        const msgUser = msg.dataset.user;
        const msgText = msg.dataset.rawText || msg.querySelector('.msg-text')?.textContent || '';
        const data = { id: msgId, username: msgUser, text: msgText };
        // Quick-react emoji row shown directly at top of mobile context menu
        const quickReacts = ['👍', '❤️', '😂', '😮', '😢', '😡', '🔥', '🎉', '💯', '👀'];
        const items = [
          { type: 'quickReact', emojis: quickReacts, msgId: msgId },
          { separator: true },
          { label: 'Reply', icon: 'fas fa-reply', action: 'reply', handler: () => this.startReply(data) },
          { label: 'Copy Text', icon: 'fas fa-copy', action: 'copy', handler: () => { navigator.clipboard.writeText(msgText); this.toast('Copied!', 'success'); } },
          { label: 'Pin', icon: 'fas fa-thumbtack', action: 'pin', handler: () => { this.socket.emit('pinMessage', { messageId: msgId, room: this.currentRoom }); this.toast('Message pinned!', 'success'); } },
          { separator: true },
        ];
        // Hide AI options for non-text content (polls, wheels, stickers, files, images, videos, audio, voice)
        const hasNonTextContent = !!(msg.querySelector('.msg-wheel, .msg-poll, .msg-game-invite, .msg-sticker, .msg-file, .file-attachment, .msg-image, .msg-video, .msg-audio, .voice-message-bubble'));
        const hasTextContent = !!(msgText && msgText.trim());
        if (!hasNonTextContent && hasTextContent) {
          items.push(
            { label: this.t('ai.ask_about') || 'Ask AI about this', icon: 'fas fa-robot', action: 'ai-ask', handler: () => this.aiAskAbout(msgText, msgId) },
            { label: this.t('ai.translate_msg') || 'Translate', icon: 'fas fa-language', action: 'ai-translate', handler: () => this.aiTranslateMessage(msgText, msgId) },
            { label: this.t('ai.explain') || 'Explain', icon: 'fas fa-lightbulb', action: 'ai-explain', handler: () => this.aiExplainMessage(msgText, msgId) },
            { label: this.t('ai.rewrite') || 'Rewrite', icon: 'fas fa-wand-magic-sparkles', action: 'ai-rewrite', handler: () => this.aiRewriteMessage(msgText, msgId) },
          );
        }
        if (msgUser !== this.username) {
          items.push({ label: 'Report', icon: 'fas fa-flag', action: 'report', danger: true, handler: () => this.openReportModal(msgUser, msgId) });
        }
        if (msgUser === this.username || this.userRole === 'admin' || this.userRole === 'moderator') {
          items.push({ separator: true });
          if (msgUser === this.username) items.push({ label: 'Edit', icon: 'fas fa-pencil', action: 'edit', handler: () => this.startEdit(data) });
          items.push({ label: 'Delete', icon: 'fas fa-trash', action: 'delete', danger: true, handler: () => { if (confirm('Delete this message?')) this.socket.emit('deleteMessage', { id: msgId, room: this.currentRoom }); } });
        }
        this.showContextMenu(fakeEvent, items);
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
      if (!e.target.closest('.message') && !e.target.closest('.msg-actions') && !e.target.closest('.context-menu')) {
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
      if (!e.target.closest('#statusPicker') && !e.target.closest('#statusBtn')) {
        this.dom.statusPicker?.classList.remove('active');
        if (this.dom.statusPicker) this.dom.statusPicker.style.display = 'none';
      }
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

    // Mark current theme active (clear all first to avoid double-highlight)
    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
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
    onToggle('showOnlineToggle', 'showOnline');
    onToggle('allowDMsToggle', 'allowDMs');
    onToggle('dmNotifToggle', 'dmNotif');
    onToggle('friendNotifToggle', 'friendNotif');
    onToggle('mentionNotifToggle', 'mentionNotif');
    onToggle('screenReaderToggle', 'screenReader');
    onToggle('highContrastToggle', 'highContrast');
    onToggle('previewToggle', 'preview');
    onToggle('reducedMotionToggle', 'reducedMotion');

    // RedAI settings
    const redaiSaveToggle = document.getElementById('redaiSaveHistoryToggle');
    if (redaiSaveToggle) {
      redaiSaveToggle.checked = this.settings.redaiSaveHistory !== false;
      redaiSaveToggle.addEventListener('change', () => {
        this.settings.redaiSaveHistory = redaiSaveToggle.checked;
        this.saveLocalSettings();
        fetch('/api/ai/sidebar/privacy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, saveHistory: redaiSaveToggle.checked })
        }).catch(() => {});
        this.toast(redaiSaveToggle.checked ? 'RedAI history saving enabled' : 'RedAI history saving disabled — history cleared', 'info');
      });
    }
    onClick('redaiClearHistoryBtn', () => {
      this.clearRedAIChat();
    });
    onClick('redaiExportHistoryBtn', () => {
      const container = document.getElementById('redaiMessages');
      if (!container) return;
      const msgs = [];
      container.querySelectorAll('.redai-msg').forEach(msg => {
        const isUser = msg.classList.contains('redai-msg-user');
        const content = msg.querySelector('.redai-msg-content')?.textContent || '';
        msgs.push(`[${isUser ? 'You' : 'RedAI'}] ${content}`);
      });
      if (msgs.length === 0) { this.toast('No messages to export', 'warning'); return; }
      const blob = new Blob([msgs.join('\n\n')], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `redai-chat-${new Date().toISOString().slice(0,10)}.txt`;
      a.click();
      URL.revokeObjectURL(a.href);
      this.toast('Chat history exported!', 'success');
    });

    // Test notification button
    onClick('testNotifBtn', () => {
      this.toast('This is a test notification!', 'info');
      this.playSound?.('notification');
      if (Notification.permission === 'granted') {
        new Notification('RedChat Test', { body: 'Notifications are working!', icon: '/uploads/default-avatar.png' });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') new Notification('RedChat Test', { body: 'Notifications are working!', icon: '/uploads/default-avatar.png' });
        });
      }
      // Also send a real push notification so it works on mobile
      fetch('/api/push/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username })
      }).then(r => r.json()).then(d => {
        if (d.success) this.toast('Push notification sent to your devices!', 'success');
        else this.toast(d.error || 'No push subscription – enable notifications first.', 'warning');
      }).catch(() => {});
      this.addNotification?.({ type: 'test', text: 'Test notification sent!', time: Date.now() });
    });

    // Avatar change — opens crop/resize modal
    onClick('changeAvatarBtn', () => document.getElementById('avatarInput')?.click());
    document.getElementById('avatarInput')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.openAvatarCrop(file);
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
      const bioMax = (this.userPerks || []).includes('extended_bio') ? 500 : 200;
      const counter = document.getElementById('bioCharCount');
      if (counter) counter.textContent = `${count}/${bioMax}`;
    });

    // Name color picker — requires custom_name_color perk
    const nameColorPicker = document.getElementById('nameColorInput');
    if (nameColorPicker) {
      nameColorPicker.addEventListener('change', () => {
        const hasPerk = (this.userPerks || []).includes('custom_name_color') || this.userRole === 'admin';
        if (!hasPerk) {
          this.toast('Purchase "Custom Name Color" from the XP Shop to use this feature!', 'error');
          return;
        }
        this.socket.emit('updateNameColor', { color: nameColorPicker.value });
        this.nameColor = nameColorPicker.value;
      });
    }

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
    });

    // Save all settings button
    onClick('saveAllSettingsBtn', () => {
      this.saveLocalSettings();
      this.applySavedTheme();
      this.toast('Settings saved!', 'success');
      this.closeModal('settingsModal');
    });

    // Accent color dots
    document.querySelectorAll('.accent-dot')?.forEach(dot => {
      dot.addEventListener('click', () => {
        document.querySelectorAll('.accent-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        const color = dot.dataset.color;
        if (color) {
          this.settings.accent = color;
          this.saveLocalSettings();
          this.applySavedTheme();
          // notify server so other users can see profile/banner updates
          this.socket.emit('updateSettings', { settings: { accent: color } });
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

    // Chat Themes (XP Shop perk) — bind clicks, check perk at runtime
    const chatThemesGrid = document.getElementById('chatThemesGrid');
    if (chatThemesGrid) {
      chatThemesGrid.querySelectorAll('.chat-theme-card').forEach(btn => {
        btn.addEventListener('click', () => {
          const hasPerk = (this.userPerks || []).includes('chat_themes') || this.userRole === 'admin';
          if (!hasPerk) {
            this.toast('Purchase "Chat Themes" from the XP Shop!', 'error');
            return;
          }
          const theme = btn.dataset.chatTheme;
          if (theme === 'none' || document.body.dataset.chatTheme === theme) {
            // Deselect / go back to default
            delete document.body.dataset.chatTheme;
            localStorage.removeItem('redchat_chat_theme');
            chatThemesGrid.querySelectorAll('.chat-theme-card').forEach(b => b.classList.remove('active'));
            if (theme === 'none') btn.classList.add('active');
            this.toast('Theme reset to default', 'success');
          } else {
            document.body.dataset.chatTheme = theme;
            localStorage.setItem('redchat_chat_theme', theme);
            chatThemesGrid.querySelectorAll('.chat-theme-card').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          }
        });
      });
    }

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
      if (!email) { this.toast('Please enter an email address', 'error'); return; }
      const btn = document.getElementById('updateEmailBtn');
      if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...'; }
      this.socket.emit('updateEmail', { email });
    });

    // Verify email code from settings
    onClick('verifyEmailCodeBtn', () => {
      const code = document.getElementById('emailVerifyCodeInput')?.value?.trim();
      if (!code || code.length !== 6) { this.toast('Enter the 6-digit code', 'error'); return; }
      this.socket.emit('verifyEmailFromSettings', { code });
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

    // Debug panel events
    this.bindDebugEvents();

    // Refresh button — reload the currently active admin tab
    document.getElementById('adminRefreshBtn')?.addEventListener('click', () => {
      const activeTab = this.dom.adminModal?.querySelector('.admin-nav-item.active');
      if (activeTab) this.loadAdminPage(activeTab.dataset.tab);
      else this.loadAdminPage('overview');
    });

    // Admin user search — client-side filter on already-loaded list
    document.getElementById('adminUserSearch')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const list = document.getElementById('adminUsersList');
      if (!list) return;
      list.querySelectorAll('.admin-user-item').forEach(item => {
        const name = (item.dataset.user || '').toLowerCase();
        const meta = (item.querySelector('.admin-user-meta')?.textContent || '').toLowerCase();
        item.style.display = (!q || name.includes(q) || meta.includes(q)) ? '' : 'none';
      });
    });

    // Admin room search — client-side filter on already-loaded list
    document.getElementById('adminRoomSearch')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        this._renderAdminRoomItems(this._adminAllRooms || []);
        return;
      }
      const filtered = (this._adminAllRooms || []).filter(r => {
        const name = (typeof r === 'string' ? r : (r.name || '')).toLowerCase();
        const creator = (typeof r === 'object' ? (r.creator || '') : '').toLowerCase();
        return name.includes(q) || creator.includes(q);
      });
      this._renderAdminRoomItems(filtered);
    });

    // Admin thread search — client-side filter on already-loaded list
    document.getElementById('adminThreadSearch')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        this._renderAdminThreadItems(this._adminAllThreads || []);
        return;
      }
      const filtered = (this._adminAllThreads || []).filter(t => {
        return (t.title || '').toLowerCase().includes(q) ||
               (t.room || '').toLowerCase().includes(q) ||
               (t.creator || '').toLowerCase().includes(q);
      });
      this._renderAdminThreadItems(filtered);
    });

    // Report filter tabs
    document.querySelectorAll('#adminReportsPanel .filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#adminReportsPanel .filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this._reportFilter = tab.dataset.filter;
        this.renderAdminReports({ reports: this._allReports || [] });
      });
    });

    // Send announcement
    document.getElementById('sendAnnouncementBtn')?.addEventListener('click', () => {
      const title = document.getElementById('announcementTitle')?.value;
      const message = document.getElementById('announcementMessage')?.value;
      const type = document.getElementById('announcementType')?.value || 'info';
      const duration = parseInt(document.getElementById('announcementDuration')?.value) || 30;
      if (title && message) {
        this.socket.emit('announce', { title, message, type, duration });
        this.toast('Announcement sent!', 'success');
        // Clear form fields after sending
        const titleEl = document.getElementById('announcementTitle');
        const msgEl = document.getElementById('announcementMessage');
        if (titleEl) titleEl.value = '';
        if (msgEl) msgEl.value = '';
      } else {
        this.toast('Title and message are required', 'warning');
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

    // Bug report submit
    document.getElementById('submitBugReport')?.addEventListener('click', () => this.submitBugReport());

    // Bug report filter tabs in admin panel
    document.querySelectorAll('#adminBugReportsPanel .filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#adminBugReportsPanel .filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this._bugReportFilter = tab.dataset.filter;
        this.renderAdminBugReports({ reports: this._allBugReports || [] });
      });
    });
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
    const dateOfBirth = this.dom.regDateOfBirth?.value;
    const gender = this.dom.regGender?.value || '';
    
    if (!username || !password) {
      this.handleAuthError('registerError', 'Please fill in all required fields');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.handleAuthError('registerError', 'A valid email address is required');
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

    if (!dateOfBirth) {
      this.handleAuthError('registerError', 'Date of birth is required');
      return;
    }
    const dob = new Date(dateOfBirth);
    const ageDiff = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 13) {
      this.handleAuthError('registerError', 'You must be at least 13 years old');
      return;
    }
    
    this.socket.emit('register', {
      username: username,
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      gender: gender
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
    // make sure room id is lowercase to match server conventions
    this.currentRoom = (data.room || 'general').toString().toLowerCase();
    this.userRole = data.role || 'member';
    this.userLevel = data.level || 1;
    this.userXP = data.xp || 0;
    this.xpNeeded = data.xpNeeded || 100;
    this.userPerks = data.perks || [];
    const avatarCacheKey = `redchat_avatar:${data.username}`;
    const cachedAvatar = localStorage.getItem(avatarCacheKey) || '';
    this.userAvatar = data.avatar || cachedAvatar || '';
    if (this.userAvatar) {
      this.avatars[data.username] = this.userAvatar;
    }
    this.userBio = data.bio || '';
    this.bio = data.bio || '';
    this.age = data.age || '';
    this.genre = data.gender || '';
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
    this.updateAvatarsInDOM(data.username, this.userAvatar || '');
    // Show admin button if admin
    if (this.dom.adminPanelBtn && data.role === 'admin') this.dom.adminPanelBtn.style.display = '';
    this.showApp();
    // Show What's New on first open after an update
    const APP_VERSION = '5.31';
    const seenVersion = localStorage.getItem('redchat_seen_version');
    if (seenVersion !== APP_VERSION) {
      localStorage.setItem('redchat_seen_version', APP_VERSION);
      setTimeout(() => this.openModal('whatsNewModal'), 1500);
    }
    // Show welcome tour on first login only (check both server flag and localStorage fallback)
    const tourSeen = data.hasSeenTour || localStorage.getItem('redchat_tour_done') === '1';
    if (!tourSeen) {
      setTimeout(() => this.startTour(), 1200);
    }
    // Restore cached DM partner list immediately so the DM section isn't empty before server responds
    this.restoreDMPartners();
    this.renderDMs();
    // Always show welcome page on login
    if (this.dom.welcomeState) this.dom.welcomeState.style.display = '';
    if (this.dom.messagesContainer) this.dom.messagesContainer.style.display = 'none';
    // Clear header room info so it doesn't show a stale room name
    if (this.dom.headerRoomName) this.dom.headerRoomName.textContent = '';
    if (this.dom.headerRoomDesc) { this.dom.headerRoomDesc.textContent = ''; this.dom.headerRoomDesc.style.display = 'none'; }
    if (this.dom.headerRoomIcon) this.dom.headerRoomIcon.innerHTML = '';
    this.socket.emit('getRoomList');
    this.socket.emit('getFriendsList');
    this.socket.emit('getFriendRequests');
    this.socket.emit('requestStickers');
    // Start ping measurement
    this.startPingMeasurement();
    // Restore saved chat theme if user has the perk
    const savedTheme = localStorage.getItem('redchat_chat_theme');
    if (savedTheme && ((this.userPerks || []).includes('chat_themes') || this.userRole === 'admin')) {
      document.body.dataset.chatTheme = savedTheme;
    }
    // Update chat theme UI state
    const chatThemesGrid = document.getElementById('chatThemesGrid');
    const chatThemesHint = document.getElementById('chatThemesHint');
    if (chatThemesGrid) {
      const hasPerk = (this.userPerks || []).includes('chat_themes') || this.userRole === 'admin';
      if (chatThemesHint) chatThemesHint.style.display = hasPerk ? 'none' : '';
      chatThemesGrid.querySelectorAll('.chat-theme-card').forEach(btn => {
        btn.disabled = !hasPerk;
        btn.style.opacity = hasPerk ? '1' : '0.5';
        if (savedTheme === btn.dataset.chatTheme && hasPerk) btn.classList.add('active');
      });
    }
  }

  startPingMeasurement() {
    if (this._pingInterval) clearInterval(this._pingInterval);
    const measure = () => {
      this._pingStart = Date.now();
      this.socket.volatile.emit('pingCheck');
    };
    this.socket.on('pongCheck', () => {
      if (this._pingStart) {
        const latency = Date.now() - this._pingStart;
        const el = document.getElementById('pingValue');
        if (el) {
          el.textContent = latency;
          const pingWrap = document.getElementById('userPanelPing');
          if (pingWrap) {
            pingWrap.classList.remove('ping-good', 'ping-ok', 'ping-bad');
            if (latency < 100) pingWrap.classList.add('ping-good');
            else if (latency < 250) pingWrap.classList.add('ping-ok');
            else pingWrap.classList.add('ping-bad');
          }
        }
      }
    });
    measure();
    this._pingInterval = setInterval(measure, 10000);
  }

  handleRegisterSuccess(data) {
    if (data && data.requiresVerification) {
      this.pendingVerifyUser = data.username;
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
    // Sync bottom nav back to chat when sidebar is dismissed
    // But preserve the RedAI tab highlight if we're in RedAI mode
    if (window.innerWidth < 768) {
      const navTab = this.isRedAI ? 'redai' : 'chat';
      this._activeMobileTab = navTab;
      document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.tab === navTab);
      });
    }
  }

  _initMobileSwipeGestures() {
    let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;
    const minSwipe = 50;
    const maxVertical = 100;
    const edgeZone = 30; // px from left edge to start a swipe-to-open

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (window.innerWidth >= 768) return; // only on mobile
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const dx = touchEndX - touchStartX;
      const dy = Math.abs(touchEndY - touchStartY);
      if (dy > maxVertical) return; // ignore if mostly vertical swipe
      const sidebarOpen = this.dom.sidebar?.classList.contains('open');
      // Swipe right from left edge → open sidebar
      if (dx > minSwipe && touchStartX < edgeZone && !sidebarOpen) {
        this.openSidebar();
      }
      // Swipe left while sidebar open → close sidebar
      if (dx < -minSwipe && sidebarOpen) {
        this.closeSidebar();
      }
    }, { passive: true });
  }

  switchSidebarTab(tab) {
    // RedAI opens in main chat area, not as a sidebar panel
    if (tab === 'redai') {
      this.openRedAIChat();
      return;
    }
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
    if (this.dom.sidebarSearchInput) {
      this.dom.sidebarSearchInput.placeholder = 'Search...';
      this.dom.sidebarSearchInput.value = '';
    }
    // Update header subtitle to reflect current view
    const viewTitles = { channels: '', dms: 'Direct Messages', friends: 'Friends', explore: 'Explore' };
    const viewDesc = document.getElementById('headerRoomDesc');
    if (viewDesc) {
      if (tab !== 'channels') {
        viewDesc.textContent = viewTitles[tab] || '';
        viewDesc.style.display = 'block';
        const roomName = document.getElementById('headerRoomName');
        if (roomName && tab === 'friends') roomName.textContent = 'Friends';
        if (roomName && tab === 'dms') roomName.textContent = 'Direct Messages';
        if (roomName && tab === 'explore') roomName.textContent = 'Explore';
      } else {
        // Restore current room info
        this.updateHeaderRoomInfo(this.currentRoom);
      }
    }
    // Load content accordingly
    if (tab === 'explore') this.renderBrowseRooms();
  }

  updateMobileNav(tab) {
    this._activeMobileTab = tab;
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tab);
    });
    if (tab === 'chat') {
      this.closeSidebar();
      // Don't reset isDM here — if user is in a DM, keep the DM view
    } else if (tab === 'channels') {
      this.switchSidebarTab('channels');
      this.openSidebar();
    } else if (tab === 'explore') {
      this.switchSidebarTab('explore');
      this.openSidebar();
    } else if (tab === 'dms') {
      this.switchSidebarTab('dms');
      this.openSidebar();
    } else if (tab === 'redai') {
      this.closeSidebar();
      this.openRedAIChat();
    } else if (tab === 'friends') {
      this.switchSidebarTab('friends');
      this.openSidebar();
    } else if (tab === 'settings') {
      this.openModal('settingsModal');
    }
  }

  /* ═══════════════════════ ROOM MANAGEMENT ═══════════════════════ */
  handleRoomList(data) {
    this.rooms = data.rooms || [];
    this.customRooms = data.customRooms || [];
    this.allRoomsData = data.allRooms || [];
    this.renderRooms();
    this.renderBrowseRooms();
    this.renderRoomEventsPanel();
  }

  renderRooms() {
    const container = document.getElementById('roomsList');
    if (!container) return;
    const allRooms = [...this.rooms, ...this.customRooms.map(r => typeof r === 'string' ? r : r.name)];
    const uniqueRooms = [...new Set(allRooms)];
    // Exclude favorited rooms from the main list (they appear in the favorites section)
    const mainRooms = uniqueRooms.filter(room => !this.favorites.includes(room));
    container.innerHTML = mainRooms.map(room => {
      const active = !this.isDM && this.currentRoom === room ? 'active' : '';
      const fav = this.favorites.includes(room) ? 'favorite' : '';
      const muted = this.mutedRooms.includes(room) ? 'muted' : '';
      const badge = this.unreadCounts[room] ? `<span class="room-badge">${this.unreadCounts[room]}</span>` : '';
      const unreadDot = this.unreadCounts[room] ? ' has-unread' : '';
      // Look up icon/color from allRoomsData
      const roomData = (this.allRoomsData || []).find(r => r.name === room);
      const icon = roomData?.icon || 'fa-hashtag';
      const iconColor = roomData?.color ? ` style="color:${roomData.color}"` : '';
      const verified = '';
      const nsfwBadge = roomData?.isNSFW ? '<span class="nsfw-badge" title="NSFW">18+</span>' : '';
      const joined = this.rooms.includes(room) || this.customRooms.some(r => (typeof r === 'string' ? r : r.name) === room);
      const checkmark = joined ? '<i class="fas fa-circle-check room-joined-icon"></i>' : '';
      return `<div class="room-item ${active} ${fav} ${muted}${unreadDot}" data-room="${this.escapeHTML(room)}" title="${this.escapeHTML(room)}">
        <i class="fas ${icon} room-icon"${iconColor}></i>
        <span class="room-name">${this.escapeHTML(room)}</span>
        ${checkmark}
        ${verified}
        ${nsfwBadge}
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
    this.renderRoomEventsPanel();
  }

  renderRoomEventsPanel() {
    const panel = document.getElementById('roomEventsPanel');
    if (!panel) return;
    const pixels = Array.isArray(this._pixelData) ? this._pixelData : [];
    const latest = pixels.length > 0 ? pixels[pixels.length - 1] : null;
    const latestTime = latest?.timestamp ? new Date(latest.timestamp).toLocaleString() : 'No activity yet';
    panel.innerHTML = `
      <button id="openCanvasEventsBtn" class="room-events-open" type="button">
        <i class="fas fa-palette"></i>
        <span>Open Canvas</span>
      </button>
      <div class="room-events-summary">
        <div class="room-events-count">${pixels.length} pixel${pixels.length === 1 ? '' : 's'} on the server canvas</div>
      </div>
      <div class="room-events-latest">
        <span class="room-events-label">Latest</span>
        <span class="room-events-value">${latest ? `${this.escapeHTML(latest.author || 'Unknown')} · (${latest.x}, ${latest.y}) · ${this.escapeHTML(latest.color || '')}` : 'No pixel placed yet'}</span>
        <span class="room-events-time">${this.escapeHTML(latestTime)}</span>
      </div>
      <div class="room-events-hint">Tap a blank tile to place a pixel. Tap a filled tile to inspect it.</div>
    `;
    panel.querySelector('#openCanvasEventsBtn')?.addEventListener('click', () => this._openPixelCanvas());
  }

  renderBrowseRooms() {
    const list = document.getElementById('exploreRoomsList');
    const emptyEl = document.getElementById('exploreEmpty');
    if (!list) return;
    // Use allRooms data with memberCount for sorting
    const allData = this.allRoomsData || [];
    // Show public rooms sorted by member count (most popular first)
    // Strictly filter out predefined rooms - they should never appear in explore
    const PREDEFINED_NAMES = new Set(['General', 'Gaming', 'Music', 'Technology', 'Movies & TV', 'Random', 'Memes', 'Art & Design']);
    const browsable = allData
      .filter(r => r.isPublic !== false && !r.isPredefined && r.creator !== 'system' && !PREDEFINED_NAMES.has(r.name))
      .sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
    // Build a fresh joined set from current state
    const joinedNames = new Set([
      ...this.rooms,
      ...this.customRooms.map(r => typeof r === 'string' ? r : r.name)
    ]);
    // Also check allRoomsData joined flag
    allData.forEach(r => { if (r.joined) joinedNames.add(r.name); });
    if (browsable.length === 0) {
      list.innerHTML = '';
      if (emptyEl) emptyEl.style.display = '';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    list.innerHTML = browsable.map(room => {
      const joined = joinedNames.has(room.name) || room.joined;
      const nsfwTag = room.isNSFW ? '<span class="nsfw-badge" title="NSFW">18+</span>' : '';
      return `
      <div class="explore-room-card ${joined ? 'joined' : ''}" data-room="${this.escapeHTML(room.name)}" data-room-id="${this.escapeHTML(room.id || '')}">
        <div class="explore-room-icon" style="background:transparent;color:${room.color || 'var(--accent)'}"><i class="fas ${room.icon || 'fa-hashtag'}"></i></div>
        <div class="explore-room-info">
          <div class="explore-room-name">${this.escapeHTML(room.name)} ${nsfwTag}</div>
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
    const room = (this.allRoomsData || []).find(r => r.name === roomName || r.name?.toLowerCase() === roomName?.toLowerCase());
    if (!room) {
      this.toast(this.t('user.not_found')?.replace('User', 'Room') || 'Room not found', 'error');
      return;
    }
    const joinedNames = new Set([...this.rooms, ...this.customRooms.map(r => typeof r === 'string' ? r : r.name)]);
    const isJoined = joinedNames.has(room.name) || room.joined;
    const content = document.getElementById('profileModalBody') || document.querySelector('#profileModal .modal-body');
    if (!content) return;
    const safeColor = (room.color || '#667eea').replace(/[^#a-fA-F0-9]/g, '');
    const safeIcon = (room.icon || 'fa-hashtag').replace(/[^a-zA-Z0-9-]/g, '');
    content.innerHTML = `
      <div class="profile-banner" style="background: linear-gradient(135deg, ${safeColor || 'var(--accent)'}, ${this.adjustColor?.(safeColor || '#667eea', -40) || 'var(--accent-hover)'})">
        <div class="explore-info-icon"><i class="fas ${safeIcon}"></i></div>
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
            <button class="profile-action-btn primary" onclick="app.switchRoom('${this.escapeHTML(room.name)}');app.closeModal('profileModal');app.closeSidebar()"><i class="fas fa-sign-in-alt"></i> Go to Room</button>
          ` : `
            <button class="profile-action-btn primary" onclick="app.joinRoom('${this.escapeHTML(room.name)}');app.closeModal('profileModal');app.renderBrowseRooms()"><i class="fas fa-plus"></i> Join Room</button>
          `}
        </div>
      </div>
    `;
    this.openModal('profileModal');
  }

  // switch current room without rejoining server, just update UI/history
  switchRoom(room) {
    // normalize same as joinRoom to avoid case mismatches
    if (room) {
      let normalized = room;
      (this.allRoomsData || []).forEach(r => {
        if (r.id === room || (r.name && r.name.toLowerCase() === room.toString().toLowerCase())) {
          normalized = r.name;
        }
      });
      room = normalized;
    }
    // Save draft from the current room/DM before switching
    this.saveDraft();
    this._closePixelCanvas();
    this.currentRoom = room;
    this.isDM = false;
    this.currentDM = null;
    this._pixelRoomKey = this._resolvePixelRoomKey(room);
    // Update current room indicator in header
    const roomNameEl = document.getElementById('currentRoomName');
    if (roomNameEl) {
      const roomData = (this.allRoomsData || []).find(r => r.id === room || r.name === room);
      roomNameEl.textContent = roomData?.name || room;
    }
    // Close mobile sidebars when switching rooms
    this.closeSidebar();
    // Update room item appearance
    document.querySelectorAll('.room-item').forEach(item => {
      item.classList.toggle('active', item.dataset.room === room);
    });

    // Clear messages and load from cache or request from server
    if (this.dom.messagesContainer) this.dom.messagesContainer.innerHTML = '';

    const historyRoom = room.toLowerCase();
    if (this.messageHistory && this.messageHistory[historyRoom]) {
      const messages = this.messageHistory[historyRoom];
      if (Array.isArray(messages)) {
        messages.forEach(message => this.appendMessage({ ...message, fromHistory: true }));
      }
    } else {
      this.socket.emit('requestChatHistory', { room });
    }

    // Clear input and load any saved draft for this room
    if (this.dom.messageInput) {
      this.dom.messageInput.value = '';
      this.dom.messageInput.style.height = 'auto';
    }
    this.loadDraftForRoom(room);
    // Clear reply/edit state
    if (this.state) { this.state.replyingTo = null; this.state.editingMessage = null; }
    this.replyingTo = null;
    this.editingMessageId = null;
    this.dom.replyBar?.classList.remove('active');
    this.dom.editBar?.classList.remove('active');

    // Update placeholder text
    const switchRoomData = (this.allRoomsData || []).find(r => r.id === room || r.name === room);
    if (this.dom.messageInput) this.dom.messageInput.placeholder = `Message ${switchRoomData?.name || room}...`;
    this.renderRoomEventsPanel();
    if (document.getElementById('pixelOverlay')?.style.display === 'flex') {
      this._refreshPixelCanvas();
    }
  }

  joinRoom(room) {
    if (!room) return;

    // normalize room id/name to match our internal keys using allRoomsData
    let normalized = room;
    (this.allRoomsData || []).forEach(r => {
      if (r.id === room || r.name === room || (r.name && r.name.toLowerCase() === room.toString().toLowerCase())) {
        normalized = r.name;
      }
    });
    room = normalized;

    if (room === this.currentRoom && !this.isDM) return;

    // Check if this is an NSFW room and show warning if not yet acknowledged
    const roomData = (this.allRoomsData || []).find(r => r.id === room || r.name === room);
    // Load persisted NSFW acknowledgments
    if (!this._nsfwAcknowledged) {
      try { this._nsfwAcknowledged = new Set(JSON.parse(localStorage.getItem('redchat_nsfw_ack') || '[]')); }
      catch { this._nsfwAcknowledged = new Set(); }
    }
    if (roomData && roomData.isNSFW && !this._nsfwAcknowledged.has(room)) {
      this._pendingNSFWRoom = room;
      const modal = document.getElementById('nsfwWarningModal');
      if (modal) {
        modal.style.display = 'flex';
        const cancelBtn = document.getElementById('nsfwWarningCancel');
        const continueBtn = document.getElementById('nsfwWarningContinue');
        if (cancelBtn) cancelBtn.onclick = () => { modal.style.display = 'none'; this._pendingNSFWRoom = null; };
        if (continueBtn) continueBtn.onclick = () => {
          modal.style.display = 'none';
          if (!this._nsfwAcknowledged) this._nsfwAcknowledged = new Set();
          this._nsfwAcknowledged.add(room);
          try { localStorage.setItem('redchat_nsfw_ack', JSON.stringify([...this._nsfwAcknowledged])); } catch {}
          this.joinRoom(this._pendingNSFWRoom);
          this._pendingNSFWRoom = null;
        };
      }
      return;
    }

    this.saveDraft();
    this.isDM = false;
    this.isRedAI = false;
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
    this._pixelRoomKey = this._resolvePixelRoomKey(room);
    this._pixelData = [];
    this._setPixelSelection(null);
    // Switch sidebar back to channels if we're on the redai tab
    if (this.activeSidebarTab === 'redai' || (this.state && this.state.activeSidebarTab === 'redai')) {
      this.switchSidebarTab('channels');
    }
    // Clear messages container immediately to avoid stale/duplicate messages
    if (this.dom.messagesContainer) this.dom.messagesContainer.innerHTML = '';
    this.socket.emit('joinRoom', { room });
    this.renderRooms();
    this.updateHeaderRoomInfo(room);
    // Clear input before loading draft to prevent stale text from previous room
    if (this.dom.messageInput) {
      this.dom.messageInput.value = '';
      this.dom.messageInput.placeholder = `Message #${room}`;
      this.dom.messageInput.style.height = 'auto';
    }
    this.loadDraftForRoom(room);
    // Update active state BEFORE closing sidebar so the highlight is visible
    document.querySelectorAll('.room-item').forEach(item => {
      item.classList.toggle('active', item.dataset.room === room);
    });
    // Close sidebar on mobile after a brief delay so user sees the highlight
    if (window.innerWidth < 768) {
      setTimeout(() => this.closeSidebar(), 150);
    }
    this.dom.messageInput?.focus();
    if (document.getElementById('pixelOverlay')?.style.display === 'flex') {
      this._refreshPixelCanvas();
    }
  }

  handleRoomJoined(data) {
    this.currentRoom = data.room;
    // Ensure the room is tracked as joined so the checkmark stays
    if (!this.rooms.includes(data.room)) this.rooms.push(data.room);
    this._pixelData = [];
    this._setPixelSelection(null);
    if (this.dom.channelName) this.dom.channelName.textContent = data.room;
    if (data.topic) this.dom.topicBar && (this.dom.topicBar.textContent = data.topic);
    else if (this.dom.topicBar) this.dom.topicBar.textContent = 'Click to add a topic';
    // Save last room for auto-join on next login
    try { localStorage.setItem('redchat_last_room', data.room); } catch {}
    if (this.dom.welcomeState) this.dom.welcomeState.style.display = 'none';
    if (this.dom.messagesContainer) this.dom.messagesContainer.style.display = '';
    // Discard stale buffered system messages from before this room join
    this._pendingSystemMsgs = [];
    // History is already sent by the server as part of joinRoom — no need to request again
    this.socket.emit('getUserList', { room: data.room });
    this.renderRooms();
    // Re-render explore tab if it's currently visible so joined status updates immediately
    this.renderBrowseRooms();
    // Close any open thread view when switching rooms
    this.closeThreadView?.();
    // Clear thread notification dot on room switch
    this.state.threadNotifDot = false;
    this.updateThreadNotifDot?.();
    // Refresh threads list if threads panel is open
    if (this.state.threadsPanelOpen) {
      this.loadRoomThreads();
      this.updateCreateThreadBtnVisibility?.();
    }
  }

  handleRoomCreated(data) {
    const roomName = (data.room && typeof data.room === 'object') ? data.room.name : data.room;
    this.toast(`Room "${roomName}" created!`, 'success');
    this.closeModal('createRoomModal');
    // joinRoom will trigger the server to send updated room lists, no need for extra getRoomList
    this.joinRoom(roomName);
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
    // Update subtitle/description (clear AI Assistant leftover)
    if (this.dom.headerRoomDesc) {
      const desc = roomData?.description || roomData?.topic || '';
      this.dom.headerRoomDesc.textContent = desc;
      this.dom.headerRoomDesc.style.display = desc ? 'block' : 'none';
    }
  }

  // showRoomContextMenu is defined later with full feature set (favorites, mute, admin options, etc.)

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

    // If in RedAI chat mode, route to RedAI
    if (this.isRedAI && rawText) {
      input.value = '';
      this.autoResize?.(input);
      this.sendRedAIChatMessage(rawText);
      return;
    }

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
    // Clear draft for current room/DM so it doesn't reappear on room switch
    var clearDraftKey = this.isDM ? 'dm_' + this.currentDM : 'room_' + this.currentRoom;
    delete this.drafts[clearDraftKey];
    this.saveDrafts();
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
      'help': () => this.toast('Commands: /shrug /tableflip /unflip /lenny /disapproval /sparkles /spoiler /roll /confetti /fireworks /shake /nick /time /ai /ask /image /summarize /translate /help', 'info'),
      'shrug':      () => this.socket.emit('chatMessage', { text: (args ? args + ' ' : '') + '¯\\_(ツ)_/¯', room: this.currentRoom }),
      'tableflip':  () => this.socket.emit('chatMessage', { text: '(╯°□°）╯︵ ┻━┻', room: this.currentRoom }),
      'unflip':     () => this.socket.emit('chatMessage', { text: '┬─┬ ノ( ゜-゜ノ)', room: this.currentRoom }),
      'lenny':      () => this.socket.emit('chatMessage', { text: '( ͡° ͜ʖ ͡°) ' + args, room: this.currentRoom }),
      'disapproval':() => this.socket.emit('chatMessage', { text: 'ಠ_ಠ ' + args, room: this.currentRoom }),
      'sparkles':   () => this.socket.emit('chatMessage', { text: `✨ ${args} ✨`, room: this.currentRoom }),
      'spoiler':    () => this.socket.emit('chatMessage', { text: `||${args}||`, room: this.currentRoom }),
      'confetti': () => {
        if (!(this.userPerks || []).includes('message_effects') && this.userRole !== 'admin') {
          this.toast('Purchase "Message Effects" from the XP Shop!', 'error'); return;
        }
        this.socket.emit('chatMessage', { text: args || '🎊', room: this.currentRoom, _effect: 'confetti' });
      },
      'fireworks': () => {
        if (!(this.userPerks || []).includes('message_effects') && this.userRole !== 'admin') {
          this.toast('Purchase "Message Effects" from the XP Shop!', 'error'); return;
        }
        this.socket.emit('chatMessage', { text: args || '🎆', room: this.currentRoom, _effect: 'fireworks' });
      },
      'shake': () => {
        if (!(this.userPerks || []).includes('message_effects') && this.userRole !== 'admin') {
          this.toast('Purchase "Message Effects" from the XP Shop!', 'error'); return;
        }
        this.socket.emit('chatMessage', { text: args || '💥', room: this.currentRoom, _effect: 'shake' });
      },
      'roll': () => {
        const max = parseInt(args) || 100;
        const result = Math.floor(Math.random() * max) + 1;
        this.socket.emit('chatMessage', { text: `🎲 rolled **${result}** (1-${max})`, room: this.currentRoom });
      },
      'time':  () => this.toast(new Date().toLocaleTimeString(), 'info'),
      'ask': () => {
        if (!args.trim()) { this.toast('Usage: /ask <question>', 'warning'); return; }
        this.socket.emit('chatMessage', { text: '@RedAI ' + args, room: this.currentRoom, userLang: this.currentLang || 'en' });
      },
      'ai': () => {
        if (!args.trim()) { this.toast('Usage: /ai <question>', 'warning'); return; }
        // Send the question as @RedAI mention so the bot responds in the channel
        this.socket.emit('chatMessage', { text: '@RedAI ' + args, room: this.currentRoom, userLang: this.currentLang || 'en' });
      },
      'image': () => {
        const prompt = args.trim() || window.prompt('Describe the image RedAI should generate', '');
        if (!prompt) return;
        this._openPuterImagePopup(prompt);
      },
      'summarize': () => {
        this.aiSummarizeChat();
      },
      'translate': () => {
        if (!args.trim()) { this.toast('Usage: /translate <text>', 'warning'); return; }
        this.aiTranslateMessage(args);
      },
    };

    if (commands[cmd]) { commands[cmd](); return true; }
    else return false; // let handleSlashCommand try
  }

  handleMessage(data) {
    if (this.isDM) return;
    const msgRoom = data.room || data.roomId;
    const currentLower = (this.currentRoom || '').toLowerCase();
    const msgRoomLower = (msgRoom || '').toLowerCase();
    const msgRoomIdLower = (data.roomId || '').toLowerCase();
    if (msgRoomLower !== currentLower && msgRoomIdLower !== currentLower) {
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
      // Auto-send read receipt since we're viewing this DM
      if (data.from !== this.username) {
        this.markAsRead(partner);
      }
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
    // Don't overwrite an active DM view with room history
    if (this.isDM) return;
    // Normalize room name case: server may send 'General', client stores 'general'
    const historyRoom = (data.room || this.currentRoom).toLowerCase();
    const currentRoomLower = (this.currentRoom || '').toLowerCase();
    this.messageHistory[historyRoom] = data.messages || [];
    if (historyRoom !== currentRoomLower) return;
    this.dom.messagesContainer.innerHTML = '';
    // Reset wheel and poll dedup sets so new real-time events aren't accidentally blocked
    this._seenWheelIds = new Set();
    this._seenPollIds = new Set();
    this._seenGameIds = new Set();
    var msgsArr = (data.messages || []);
    msgsArr.forEach(msg => {
      // Track poll/wheel/game IDs from history so live events don't duplicate them
      if (msg.type === 'poll' && (msg.id || msg.poll?.id)) this._seenPollIds.add(msg.id || msg.poll.id);
      if (msg.type === 'wheel' && msg.id) this._seenWheelIds.add(msg.id);
      if (msg.type === 'game' && (msg.id || msg.game?.id)) this._seenGameIds.add(msg.id || msg.game?.id);
      this.appendMessage({ ...msg, fromHistory: true });
    });
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
    // Stale-check: ignore if we've navigated away from this DM
    if (!this.isDM) return;
    if (data.with && data.with !== this.currentDM) return;
    this.dom.messagesContainer.innerHTML = '';
    const msgs = (data.messages || []).map(m => ({ ...m, text: m.text || m.message || '' }));
    this.dmHistory[this.currentDM] = msgs;
    if (msgs.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'dm-beginning-state';
      emptyDiv.innerHTML = `<i class="fas fa-comment-dots"></i><p>This is the beginning of your conversation with <strong>${this.escapeHTML(this.currentDM)}</strong></p><p class="dm-beginning-hint">Say hello! 👋</p>`;
      this.dom.messagesContainer.appendChild(emptyDiv);
    } else {
      msgs.forEach(msg => this.appendMessage({ ...msg, username: msg.from || msg.username }));
    }
    // Restore read receipt indicator from server data
    if (data.readTimestamp) {
      this.state.dmReadTimestamp = data.readTimestamp;
      this.updateDMReadDot();
    } else {
      this.state.dmReadTimestamp = null;
    }
    this.scrollToBottom(false);
  }

  handleDMSync(data) {
    if (!data || !data.conversations) return;
    // Normalise and merge all DM conversations
    Object.keys(data.conversations).forEach(partner => {
      this.dmHistory[partner] = (data.conversations[partner] || []).map(m => ({ ...m, text: m.text || m.message || '' }));
    });
    // Apply server-computed unread counts (only for fresh sessions)
    if (data.unreads) {
      Object.keys(data.unreads).forEach(partner => {
        if (!this.unreadDMs[partner]) this.unreadDMs[partner] = data.unreads[partner];
      });
    }
    // Persist partner list to localStorage for instant display on next page load
    this.saveDMPartners();
    this.renderDMs();
    // Refresh messages if we are currently viewing one of the synced DM conversations
    if (this.isDM && this.currentDM && data.conversations[this.currentDM] && this.dom.messagesContainer) {
      this.dom.messagesContainer.innerHTML = '';
      (this.dmHistory[this.currentDM] || []).forEach(msg =>
        this.appendMessage({ ...msg, username: msg.from || msg.username })
      );
      this.scrollToBottom(false);
    }
  }

  saveDMPartners() {
    if (!this.username) return;
    const partners = Object.keys(this.dmHistory);
    try { localStorage.setItem(`redchat_dm_partners_${this.username}`, JSON.stringify(partners)); } catch(e) {}
  }

  restoreDMPartners() {
    if (!this.username) return;
    try {
      const stored = localStorage.getItem(`redchat_dm_partners_${this.username}`);
      if (!stored) return;
      const partners = JSON.parse(stored);
      if (Array.isArray(partners)) {
        partners.forEach(p => { if (!this.dmHistory[p]) this.dmHistory[p] = []; });
      }
    } catch(e) {}
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
    msg.dataset.timestamp = data.timestamp || '';

    // Hide messages from blocked users
    if (data.username && data.type !== 'system' && this.isBlocked(data.username)) {
      msg.style.display = 'none';
    }

    // Check if same author as last message (compact mode)
    const lastMsg = container.lastElementChild;
    const isCompact = lastMsg?.classList.contains('message') && 
                      lastMsg.dataset.user === data.username &&
                      !data.replyTo;

    if (data.type === 'system') {
      msg.className = 'system-message';
      const lastChild = container.lastElementChild;
      if (lastChild?.classList.contains('system-message')) {
        // Collapse consecutive system messages — update last one, show count
        const count = parseInt(lastChild.dataset.sysCount || '1') + 1;
        lastChild.dataset.sysCount = count;
        const textSpan = lastChild.querySelector('.system-msg-text');
        if (textSpan) textSpan.textContent = this.escapeHTML(data.text);
        let badge = lastChild.querySelector('.system-msg-count');
        if (badge) {
          badge.textContent = `+${count - 1} more`;
        } else {
          badge = document.createElement('span');
          badge.className = 'system-msg-count';
          badge.textContent = `+${count - 1} more`;
          badge.style.cssText = 'margin-left:8px;font-size:11px;opacity:0.6;cursor:pointer;text-decoration:underline;';
          badge.title = 'Click to expand collapsed system messages';
          lastChild.appendChild(badge);
        }
        // Store collapsed messages for expansion
        if (!lastChild._collapsedMsgs) lastChild._collapsedMsgs = [lastChild.querySelector('.system-msg-text')?.textContent || ''];
        lastChild._collapsedMsgs.push(this.escapeHTML(data.text));
        badge.onclick = () => {
          if (lastChild._collapsedMsgs) {
            const expanded = lastChild._collapsedMsgs.map(t => `<div class="system-message" style="margin:2px 0;"><i class="fas fa-info-circle"></i> <span class="system-msg-text">${t}</span></div>`).join('');
            const wrapper = document.createElement('div');
            wrapper.innerHTML = expanded;
            lastChild.replaceWith(...wrapper.children);
          }
        };
        return;
      }
      msg.dataset.sysCount = '1';
      msg.innerHTML = `<i class="fas fa-info-circle"></i> <span class="system-msg-text">${this.escapeHTML(data.text)}</span>`;
      container.appendChild(msg);
      return;
    }

    if (data.type === 'poll' && data.poll) {
      const avatarUrl = data.avatar || this.getAvatarUrl(data.username || data.poll.creator || '');
      const time = data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const creator = data.username || data.poll.creator || 'System';
      msg.innerHTML = `
        <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="" loading="lazy" data-user="${this.escapeHTML(creator)}" data-avatar-user="${this.escapeHTML(creator)}">
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author" data-user="${this.escapeHTML(creator)}">${this.escapeHTML(creator)}</span>
            <span class="msg-badge" style="background:#667eea;color:#fff;font-size:10px;padding:2px 6px;border-radius:4px;margin-left:6px;">POLL</span>
            <span class="msg-timestamp">${time}</span>
          </div>
          <div class="msg-poll" data-poll-id="${this.escapeHTML(data.poll.id || '')}"></div>
        </div>`;
      const pollCreator = data.username || data.poll.creator || 'System';
      msg.innerHTML += `<div class="msg-actions">
        <button class="msg-action-btn" data-action="react" title="React"><i class="fas fa-smile"></i></button>
        <button class="msg-action-btn" data-action="pin" title="Pin"><i class="fas fa-thumbtack"></i></button>
        <button class="msg-action-btn" data-action="bookmark" title="Bookmark"><i class="fas fa-bookmark"></i></button>
        ${pollCreator === this.username || this.userRole === 'admin' || this.userRole === 'moderator' ? '<button class="msg-action-btn danger" data-action="delete" title="Delete"><i class="fas fa-trash"></i></button>' : ''}
        <button class="msg-action-btn" data-action="more" title="More"><i class="fas fa-ellipsis-h"></i></button>
      </div>`;
      container.appendChild(msg);
      const pollContainer = msg.querySelector('.msg-poll');
      if (pollContainer) this.renderPollContent(pollContainer, data.poll);
      this.bindMessageActions(msg, data);
      return;
    }

    if (data.type === 'game' && data.game) {
      const gameCreator = data.username || data.game.creator || 'System';
      const avatarUrl = data.avatar || this.getAvatarUrl(gameCreator);
      const time = data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      msg.innerHTML = `
        <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="" loading="lazy" data-user="${this.escapeHTML(gameCreator)}" data-avatar-user="${this.escapeHTML(gameCreator)}">
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author" data-user="${this.escapeHTML(gameCreator)}">${this.escapeHTML(gameCreator)}</span>
            <span class="msg-badge" style="background:#9b59b6;color:#fff;font-size:10px;padding:2px 6px;border-radius:4px;margin-left:6px;"><i class="fas fa-gamepad"></i> GAME</span>
            <span class="msg-timestamp">${time}</span>
          </div>
          <div class="msg-game-invite" data-game-id="${this.escapeHTML(data.game.id || '')}"></div>
        </div>`;
      container.appendChild(msg);
      const gameContainer = msg.querySelector('.msg-game-invite');
      if (gameContainer) this.renderGameInvite(gameContainer, data.game);
      this.bindMessageActions(msg, data);
      return;
    }

    if (data.type === 'wheel' && data.options) {
      const wheelCreator = data.username || data.creator || '';
      const avatarUrl = data.avatar || this.getAvatarUrl(wheelCreator);
      const time = data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const canvasSize = 200;
      msg.innerHTML = `
        <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="" loading="lazy" data-user="${this.escapeHTML(wheelCreator)}" data-avatar-user="${this.escapeHTML(wheelCreator)}">
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author" data-user="${this.escapeHTML(wheelCreator)}">${this.escapeHTML(wheelCreator)}</span>
            <span class="msg-timestamp">${time}</span>
          </div>
          <div class="msg-wheel" data-result="${this.escapeHTML(data.result || '')}">
            <div class="wheel-msg-wrap">
              <div class="wheel-msg-pointer"></div>
              <canvas class="wheel-msg-canvas" width="${canvasSize}" height="${canvasSize}"></canvas>
            </div>
            <div class="wheel-msg-result" style="display:none;"></div>
          </div>
        </div>
        <div class="msg-actions">
          <button class="msg-action-btn" data-action="react" title="React"><i class="fas fa-smile"></i></button>
          <button class="msg-action-btn" data-action="pin" title="Pin"><i class="fas fa-thumbtack"></i></button>
          <button class="msg-action-btn" data-action="bookmark" title="Bookmark"><i class="fas fa-bookmark"></i></button>
          ${wheelCreator === this.username || this.userRole === 'admin' || this.userRole === 'moderator' ? '<button class="msg-action-btn danger" data-action="delete" title="Delete"><i class="fas fa-trash"></i></button>' : ''}
          <button class="msg-action-btn" data-action="more" title="More"><i class="fas fa-ellipsis-h"></i></button>
        </div>`;
      container.appendChild(msg);
      this.bindMessageActions(msg, data);
      // draw and animate wheel after insertion
      const canvas = msg.querySelector('.wheel-msg-canvas');
      const resultDiv = msg.querySelector('.wheel-msg-result');
      this.drawWheel(canvas, data.options);
      if (data.fromHistory) {
        // Historical wheel: jump to final state immediately without animation or sounds
        if (canvas) canvas.style.transform = `rotate(${data.finalAngle}deg)`;
        if (resultDiv) { resultDiv.textContent = `🏆 Winner: ${data.result}`; resultDiv.style.display = 'block'; }
      } else {
        const spinDur = data.spinDuration || 4000;
        setTimeout(() => {
          if (canvas) {
            canvas.style.transition = `transform ${spinDur}ms cubic-bezier(0.17,0.67,0.12,0.99)`;
            canvas.style.transform = `rotate(${data.finalAngle}deg)`;
          }
          this.playWheelSounds(spinDur);
          setTimeout(() => {
            if (resultDiv) resultDiv.textContent = `🏆 Winner: ${data.result}`;
            if (resultDiv) resultDiv.style.display = 'block';
          }, spinDur);
        }, 50);
      }
      return;
    }

    if (data.type === 'event' && data.event) {
      const ev = data.event;
      const eventCreator = data.username || ev.creator || 'System';
      const avatarUrl = data.avatar || this.getAvatarUrl(eventCreator);
      const time = data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      msg.innerHTML = `
        <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="" loading="lazy" data-user="${this.escapeHTML(eventCreator)}" data-avatar-user="${this.escapeHTML(eventCreator)}">
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author" data-user="${this.escapeHTML(eventCreator)}">${this.escapeHTML(eventCreator)}</span>
            <span class="msg-badge" style="background:${this.escapeHTML(ev.color || '#5865f2')};color:#fff;font-size:10px;padding:2px 6px;border-radius:4px;margin-left:6px;"><i class="fas fa-calendar-alt"></i> EVENT</span>
            <span class="msg-timestamp">${time}</span>
          </div>
          <div class="event-card" data-event-id="${this.escapeHTML(ev.id || '')}"></div>
        </div>
        <div class="msg-actions">
          <button class="msg-action-btn" data-action="react" title="React"><i class="fas fa-smile"></i></button>
          <button class="msg-action-btn" data-action="pin" title="Pin"><i class="fas fa-thumbtack"></i></button>
          <button class="msg-action-btn" data-action="bookmark" title="Bookmark"><i class="fas fa-bookmark"></i></button>
          ${eventCreator === this.username || this.userRole === 'admin' || this.userRole === 'moderator' ? '<button class="msg-action-btn danger" data-action="delete" title="Delete"><i class="fas fa-trash"></i></button>' : ''}
          <button class="msg-action-btn" data-action="more" title="More"><i class="fas fa-ellipsis-h"></i></button>
        </div>`;
      container.appendChild(msg);
      const eventCard = msg.querySelector('.event-card');
      if (eventCard) this.renderEventCardContent(eventCard, ev);
      this.bindMessageActions(msg, data);
      return;
    }

    // ── RedAI follow-up replies: render as small bubble, not a full message ──
    if (data.username === this.username && data._isAIFollowUp && data.replyTo?.id) {
      const originalMsg = container.querySelector(`.message[data-id="${data.replyTo.id}"]`);
      const target = originalMsg || container.lastElementChild;
      if (target) {
        const bubble = document.createElement('div');
        bubble.className = 'ai-followup-bubble';
        bubble.innerHTML = `<span class="ai-followup-bubble-user">${this.escapeHTML(this.username)}:</span> ${this.escapeHTML(data.text || data.message || '')}`;
        const content = target.querySelector('.msg-content');
        if (content) content.appendChild(bubble);
        else target.appendChild(bubble);
        if (!data.fromHistory) bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }
    }

    // ── Check for pending AI follow-up suppression ──
    if (this._pendingAIFollowUps && data.username === this.username) {
      const msgText = (data.text || data.message || '').trim();
      if (this._pendingAIFollowUps.has(msgText)) {
        this._pendingAIFollowUps.delete(msgText);
        // Render as a bubble under the last AI message instead of full message
        const aiMessages = container.querySelectorAll('.message[data-user="RedAI"], .message .msg-author[data-user="RedAI"]');
        const lastAI = aiMessages.length ? aiMessages[aiMessages.length - 1].closest('.message') || aiMessages[aiMessages.length - 1] : container.lastElementChild;
        if (lastAI) {
          const bubble = document.createElement('div');
          bubble.className = 'ai-followup-bubble';
          bubble.innerHTML = `<span class="ai-followup-bubble-user">${this.escapeHTML(this.username)}:</span> ${this.escapeHTML(msgText.replace(/^@RedAI\s*/i, ''))}`;
          const content = lastAI.querySelector('.msg-content');
          if (content) content.appendChild(bubble);
          else lastAI.appendChild(bubble);
          if (!data.fromHistory) bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }
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
    const roleClass = data.role === 'admin' ? 'admin' : data.role === 'moderator' ? 'moderator' : (data.role === 'bot' || data.isAI || data.username === 'RedAI') ? 'bot' : '';
    const roleBadge = data.role === 'admin' ? '<span class="msg-badge admin">ADMIN</span>' : 
                      data.role === 'moderator' ? '<span class="msg-badge moderator">MOD</span>' : '';
    const aiBadge = (data.role === 'bot' || data.isAI || data.username === 'RedAI') ? `<span class="msg-badge ai-badge"><i class="fas fa-robot"></i> ${this.t('ai.tag') || 'AI'}</span>` : '';
    const selectedBadgeHTML = data.selectedBadge ? `<span class="msg-selected-badge" title="${this.escapeHTML(data.selectedBadge.name)}" style="color:${this.escapeHTML(data.selectedBadge.color)}">${data.selectedBadge.icon}</span>` : '';
    const time = data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const editedMark = data.edited ? ' <span class="edited-marker">(edited)</span>' : '';
    let nameStyle = data.nameColor ? `style="color: ${this.escapeHTML(data.nameColor)}; font-weight: 600;"` : (data.role === 'admin' ? 'style="color: #e74c3c; font-weight: 600;"' : '');

    // Name glow effect for perk holders
    const nameGlowClass = data.nameGlow ? ' name-glow' : '';

    // Add effect class if present (skip for history messages to prevent replay)
    if (data.effect && !data.fromHistory) {
      msg.classList.add('msg-effect', 'msg-effect-' + data.effect);
      // Trigger full-screen visual effect
      if (data.effect === 'confetti') {
        setTimeout(() => this.showConfetti(), 50);
      } else if (data.effect === 'fireworks') {
        setTimeout(() => this.showFireworks(), 50);
      } else if (data.effect === 'shake') {
        // Shake the whole messages container briefly
        const container2 = this.dom.messagesContainer;
        if (container2) {
          container2.classList.add('anim-shake');
          setTimeout(() => container2.classList.remove('anim-shake'), 400);
        }
      }
    }

    let replyHTML = '';
    if (data.replyTo) {
      const replyColor = data.replyTo.nameColor ? ` style="color:${data.replyTo.nameColor}"` : '';
      replyHTML = `<div class="msg-reply" data-reply-id="${data.replyTo.id || ''}">
        <span class="reply-author"${replyColor}>@${this.escapeHTML(data.replyTo.username || '')}</span>
        <span class="reply-text">${this.escapeHTML(data.replyTo.text || '').substring(0, 60)}</span>
      </div>`;
    }

    // Normalize flat file fields into a file object for renderFileAttachment
    if (!data.file && data.fileUrl) {
      data.file = { url: data.fileUrl, name: data.fileName, size: data.fileSize, type: data.fileType };
    }

    let contentHTML = '';
    if (data.isCustomSticker && data.stickerUrl) {
      contentHTML = `<img class="msg-sticker" src="${this.escapeHTML(data.stickerUrl)}" alt="sticker" loading="lazy">`;
    } else if (data.file) {
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
        <button class="msg-action-btn" data-action="translate" title="Translate"><i class="fas fa-language"></i></button>
        <button class="msg-action-btn" data-action="pin" title="Pin"><i class="fas fa-thumbtack"></i></button>
        <button class="msg-action-btn" data-action="bookmark" title="Bookmark"><i class="fas fa-bookmark"></i></button>
        ${data.username === this.username ? '<button class="msg-action-btn" data-action="edit" title="Edit"><i class="fas fa-pencil"></i></button>' : ''}
        ${data.username === this.username || this.userRole === 'admin' || this.userRole === 'moderator' ? '<button class="msg-action-btn danger" data-action="delete" title="Delete"><i class="fas fa-trash"></i></button>' : ''}
        <button class="msg-action-btn" data-action="more" title="More"><i class="fas fa-ellipsis-h"></i></button>
      </div>`;
    } else {
      msg.innerHTML = `
        <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="" loading="lazy" data-user="${this.escapeHTML(data.username || '')}" data-avatar-user="${this.escapeHTML(data.username || '')}">
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author ${roleClass}${nameGlowClass}" ${nameStyle} data-user="${this.escapeHTML(data.username || '')}">${this.escapeHTML(data.displayName || data.username || '')}</span>
            ${selectedBadgeHTML}
            ${aiBadge}
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
          <button class="msg-action-btn" data-action="translate" title="Translate"><i class="fas fa-language"></i></button>
          <button class="msg-action-btn" data-action="pin" title="Pin"><i class="fas fa-thumbtack"></i></button>
          <button class="msg-action-btn" data-action="bookmark" title="Bookmark"><i class="fas fa-bookmark"></i></button>
          ${data.username === this.username ? '<button class="msg-action-btn" data-action="edit" title="Edit"><i class="fas fa-pencil"></i></button>' : ''}
          ${data.username === this.username || this.userRole === 'admin' || this.userRole === 'moderator' ? '<button class="msg-action-btn danger" data-action="delete" title="Delete"><i class="fas fa-trash"></i></button>' : ''}
          <button class="msg-action-btn" data-action="more" title="More"><i class="fas fa-ellipsis-h"></i></button>
        </div>`;
    }

    container.appendChild(msg);
    this.bindMessageActions(msg, data);

    // If this is a RedAI message ending with '?', show follow-up input for the user to reply
    if ((data.isAI || data.username === 'RedAI') && !data.fromHistory && !this.isRedAI) {
      const aiText = (data.text || data.message || '').trim();
      if (aiText.endsWith('?')) {
        this._showAIRoomFollowUpInput(msg);
      }
    }

    // Auto-translate if enabled and message is from another user
    if (this.autoTranslateEnabled && data.username && data.username !== this.username && data.username !== 'RedAI' && data.text && data.type !== 'system') {
      this._autoTranslateMessage(msg, data.text);
    }
  }

  /* ═══════════════════════ AUTO-TRANSLATE ═══════════════════════ */
  get autoTranslateEnabled() {
    return localStorage.getItem('redchat_auto_translate') === 'true';
  }
  set autoTranslateEnabled(val) {
    localStorage.setItem('redchat_auto_translate', val ? 'true' : 'false');
  }

  toggleAutoTranslate() {
    this.autoTranslateEnabled = !this.autoTranslateEnabled;
    const btn = document.getElementById('autoTranslateToggle');
    if (btn) {
      btn.classList.toggle('active', this.autoTranslateEnabled);
      const icon = btn.querySelector('.fa-toggle-on, .fa-toggle-off');
      if (icon) {
        icon.className = `fas fa-toggle-${this.autoTranslateEnabled ? 'on' : 'off'}`;
      }
    }
    const langMap = { en: 'English', fr: 'French', it: 'Italian', es: 'Spanish', de: 'German', pt: 'Portuguese', ja: 'Japanese', ko: 'Korean', ru: 'Russian', ar: 'Arabic', nl: 'Dutch' };
    const lang = langMap[this.currentLang] || this.currentLang;
    this.toast(this.autoTranslateEnabled ? `Auto-translate ON → ${lang}` : 'Auto-translate OFF', 'info');
  }

  async _autoTranslateMessage(msgEl, text) {
    if (!text || text.length < 3) return;
    const langMap = { en: 'English', fr: 'French', it: 'Italian', es: 'Spanish', de: 'German', pt: 'Portuguese', ja: 'Japanese', ko: 'Korean', ru: 'Russian', ar: 'Arabic', nl: 'Dutch' };
    const targetLang = langMap[this.currentLang] || 'English';
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang, username: this.username })
      });
      const data = await res.json();
      if (data.translation && data.translation.trim().toLowerCase() !== text.trim().toLowerCase()) {
        this._showInlineTranslation(msgEl, data.translation);
      }
    } catch (e) { /* silent */ }
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

    // Check for voice messages FIRST (before video, since voice uses .webm)
    const isVoice = name.startsWith('voice') || name.includes('voice-message');
    if (isVoice) {
      return `<div class="voice-message-bubble">
        <button class="voice-play-btn" onclick="this.classList.toggle('playing'); const a=this.parentElement.querySelector('audio'); if(a.paused){a.play();this.innerHTML='<i class=\\'fas fa-pause\\'></i>'}else{a.pause();this.innerHTML='<i class=\\'fas fa-play\\'></i>'}"><i class="fas fa-play"></i></button>
        <div class="voice-waveform-bars">${Array.from({length:28}, () => `<div class="voice-bar" style="height:${Math.random()*20+4}px"></div>`).join('')}</div>
        <span class="voice-duration"></span>
        <audio src="${this.escapeHTML(url)}" preload="metadata" onloadedmetadata="const d=this.parentElement.querySelector('.voice-duration');if(d){const s=Math.floor(this.duration);d.textContent=Math.floor(s/60)+':'+(s%60).toString().padStart(2,'0')}" ontimeupdate="const bars=this.parentElement.querySelectorAll('.voice-bar');const pct=this.currentTime/this.duration;bars.forEach((b,i)=>b.classList.toggle('played',i/bars.length<pct))" onended="const btn=this.parentElement.querySelector('.voice-play-btn');if(btn){btn.innerHTML='<i class=\\'fas fa-play\\'></i>';btn.classList.remove('playing')}"></audio>
      </div>`;
    }

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
          case 'bookmark': {
            const isBookmarked = (this.bookmarks || []).some(b => (b.messageId || b.id) === msgId);
            this.socket.emit('bookmark', { messageId: msgId, message: data.message || data.text || '', username: data.username, room: this.currentRoom, timestamp: Date.now() });
            if (isBookmarked) {
              this.toast('Bookmark removed', 'info');
              btn.title = 'Bookmark';
              btn.innerHTML = '<i class="far fa-bookmark"></i>';
            } else {
              this.toast('Bookmarked!', 'success');
              btn.title = 'Unbookmark';
              btn.innerHTML = '<i class="fas fa-bookmark" style="color:var(--accent)"></i>';
            }
            break;
          }
          case 'edit':
            this.startEdit(data);
            break;
          case 'delete':
            if (confirm('Delete this message?')) {
              this.socket.emit('deleteMessage', { id: msgId, room: this.currentRoom });
            }
            break;
          case 'more':
            this.showMessageContextMenu(e, data);
            break;
          case 'translate': {
            const msgText = data.text || data.message || msg.querySelector('.msg-text')?.textContent || '';
            if (msgText) this.aiTranslateMessage(msgText, msgId);
            else this.toast(this.t('msg.translate') || 'No text to translate', 'error');
            break;
          }
        }
      });
    });
    // Avatar/author click → profile
    msg.querySelectorAll('.msg-avatar, .msg-author').forEach(el => {
      el.addEventListener('click', () => this.showProfile(el.dataset.user));
    });
    // Mention click → profile (with user-not-found handling)
    msg.querySelectorAll('.mention').forEach(el => {
      el.addEventListener('click', () => {
        const mentionedUser = el.dataset.user;
        if (!mentionedUser) return;
        if (mentionedUser === 'RedAI') {
          this.switchSidebarTab('redai');
          return;
        }
        // Always try to show profile - server will return error if not found
        this.showProfile(mentionedUser);
      });
    });
    // Image click → viewer
    msg.querySelectorAll('.msg-image').forEach(img => {
      img.addEventListener('click', () => this.openImageViewer(img.src));
    });
    // Spoiler click
    msg.querySelectorAll('.spoiler').forEach(s => {
      s.addEventListener('click', () => s.classList.toggle('revealed'));
    });
    // Room mention click → navigate to room or show join page
    msg.querySelectorAll('.room-mention').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        const room = el.dataset.room;
        if (!room) return;
        // Check if user is already in this room
        const joinedNames = new Set([...(this.rooms || []), ...(this.customRooms || []).map(r => typeof r === 'string' ? r : r.name)]);
        const isJoined = joinedNames.has(room) || joinedNames.has(room.toLowerCase());
        if (isJoined) {
          this.switchRoom(room);
        } else {
          // Show explore room info page (join page)
          this.showExploreRoomInfo(room);
        }
      });
    });
  }

  startReply(data) {
    this.replyingTo = { id: data.id, username: data.username || data.author, text: data.text, nameColor: data.nameColor || '' };
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
        this.socket.emit('addReaction', { messageId: data.messageId, emoji, room: this.currentRoom });
      });
      reactionsContainer.appendChild(span);
    }
  }

  // showMessageContextMenu defined in V5 section below


  /* ═══════════════════════ DM MANAGEMENT ═══════════════════════ */
  startDM(user) {
    if (user === this.username) return;
    // Save draft from current room/DM before switching
    this.saveDraft();
    this.isDM = true;
    this.isRedAI = false;
    this.currentDM = user;
    this.unreadDMs[user] = 0;
    if (this.dom.headerRoomName) this.dom.headerRoomName.textContent = user;
    if (this.dom.headerRoomIcon) this.dom.headerRoomIcon.innerHTML = `<i class="fas fa-user"></i>`;
    if (this.dom.headerRoomDesc) this.dom.headerRoomDesc.style.display = 'none';
    if (this.dom.welcomeState) this.dom.welcomeState.style.display = 'none';
    if (this.dom.messagesContainer) this.dom.messagesContainer.style.display = '';
    // Clear active state from all room items so the old room doesn't stay highlighted
    document.querySelectorAll('.room-item').forEach(item => item.classList.remove('active'));
    // Clear input and load any saved draft for this DM
    if (this.dom.messageInput) {
      this.dom.messageInput.value = '';
      this.dom.messageInput.style.height = 'auto';
      this.dom.messageInput.placeholder = `Message @${user}`;
    }
    // Load DM draft if one exists
    const dmDraftKey = `dm_${user}`;
    const dmDraft = this.drafts[dmDraftKey];
    if (dmDraft && this.dom.messageInput) {
      this.dom.messageInput.value = dmDraft;
      delete this.drafts[dmDraftKey];
      this.saveDrafts();
    }
    // Clear reply/edit state
    if (this.state) { this.state.replyingTo = null; this.state.editingMessage = null; }
    this.replyingTo = null;
    this.editingMessageId = null;
    this.dom.replyBar?.classList.remove('active');
    this.dom.editBar?.classList.remove('active');
    this.socket.emit('getDMHistory', { with: user });
    this.renderDMs();
    if (window.innerWidth < 768) this.closeSidebar();
    this.dom.messageInput?.focus();
    // Auto-send read receipt for this DM
    this.markAsRead(user);
  }

  renderDMs() {
    const list = document.getElementById('dmSection');
    if (!list) return;
    // Merge: DM history partners + all friends (so friends show up even without any messages)
    const historyPartners = Object.keys({ ...this.dmHistory, ...this.unreadDMs });
    const friendPartners = Array.isArray(this.friends) ? this.friends : [];
    const unique = [...new Set([...historyPartners, ...friendPartners])].filter(u => u !== this.username);
    
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
            action: 'delete-dm',
            danger: true,
            handler: () => {
              if (!confirm(`Delete conversation with ${user}? This removes it for both sides.`)) return;
              this.socket.emit('deleteDMConversation', { targetUser: user });
              delete this.dmHistory[user];
              this.dmConversations = (this.dmConversations || []).filter(u => u !== user);
              if (this.currentDM === user) {
                this.isDM = false;
                this.currentDM = null;
              }
              this.renderDMs();
              this.toast('Conversation deleted for you', 'success');
            }
          },
          {
            label: 'Report User',
            icon: 'fas fa-flag',
            action: 'report-user',
            handler: () => {
              this.openReportModal(user);
            }
          }
        ]);
      });
    });
  }

  /* ═══════════════════════ FRIENDS MANAGEMENT ═══════════════════════ */

  _showDMFriendsList() {
    const friends = (this.friends || []).filter(u => u !== this.username);
    if (friends.length === 0) {
      this._renderDMSearchResults([]);
      return;
    }
    const users = friends.map(f => ({
      username: f,
      isFriend: true,
      isOnline: this.onlineUsers.includes(f),
      avatar: (this.avatars && this.avatars[f]) || null
    }));
    // Sort: online first
    users.sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0));
    this._renderDMSearchResults(users);
  }

  _renderDMSearchResults(users) {
    const container = document.getElementById('dmSearchResults');
    if (!container) return;
    if (users.length === 0) {
      container.innerHTML = '<div class="dm-search-empty"><i class="fas fa-users"></i><p>No users found</p></div>';
      return;
    }
    container.innerHTML = users.map(u => {
      const avatar = u.avatar || this.getAvatarUrl(u.username);
      const onlineDot = u.isOnline ? 'online' : '';
      const friendBadge = u.isFriend ? '<span class="dm-search-friend-badge"><i class="fas fa-user-check"></i> Friend</span>' : '';
      return `<div class="dm-search-item" data-user="${this.escapeHTML(u.username)}">
        <div class="dm-avatar-wrapper">
          <img class="avatar" src="${avatar}" alt="">
          <span class="dm-status-dot ${onlineDot}"></span>
        </div>
        <div class="dm-search-info">
          <span class="dm-search-name">${this.escapeHTML(u.username)}</span>
          ${friendBadge}
        </div>
      </div>`;
    }).join('');
    container.querySelectorAll('.dm-search-item').forEach(item => {
      item.addEventListener('click', () => {
        const user = item.dataset.user;
        this.closeModal('newDMModal');
        this.switchSidebarTab('dms');
        this.startDM(user);
      });
    });
  }

  handleFriendsList(data) {
    // Server may send an array of objects {username,online,status,avatar}
    // or an object {friends:[...username strings...]}
    if (Array.isArray(data)) {
      this.friends = data.map(f => (typeof f === 'string' ? f : f.username)).filter(Boolean);
    } else {
      this.friends = (data && data.friends) || [];
    }
    this.renderFriends();
    this.renderDMs(); // refresh DM list to show newly-confirmed friends
  }

  handleFriendRequests(data) {
    this.friendRequests = data || { sent: [], received: [] };
    this.renderFriends();
    // Update tab badge for incoming
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
      const sent = this.friendRequests.sent || [];
      if (received.length === 0 && sent.length === 0) {
        requestsList.innerHTML = '';
        return;
      }
      let html = '';
      if (received.length) {
        html += '<div class="requests-section"><h4>Incoming</h4>' + received.map(req => `
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
      `).join('') + '</div>';
      }
      if (sent.length) {
        html += '<div class="requests-section"><h4>Outgoing</h4>' + sent.map(req => `
        <div class="friend-item pending" data-user="${this.escapeHTML(req)}">
          <div class="friend-avatar-wrapper">
            <img class="avatar" src="${this.getAvatarUrl(req)}" alt="" data-avatar-user="${this.escapeHTML(req)}">
          </div>
          <div class="friend-info">
            <span class="friend-name">${this.escapeHTML(req)}</span>
            <span class="friend-status-text">Request sent</span>
          </div>
        </div>
      `).join('') + '</div>';
      }
      requestsList.innerHTML = html;
      // attach handlers only for incoming
      requestsList.querySelectorAll('.requests-section:first-child .friend-item').forEach(item => {
        item.querySelector('.accept')?.addEventListener('click', () => {
          this.socket.emit('acceptFriend', { username: item.dataset.user, fromUsername: item.dataset.user });
          this.toast('Friend request accepted!', 'success');
          // Optimistically add to friends list while waiting for server
          if (!this.friends.includes(item.dataset.user)) this.friends.push(item.dataset.user);
          this.friendRequests.received = (this.friendRequests.received || []).filter(u => u !== item.dataset.user);
          this.renderFriends();
        });
        item.querySelector('.reject')?.addEventListener('click', () => {
          this.socket.emit('rejectFriend', { username: item.dataset.user });
          this.toast('Friend request rejected', 'info');
        });
      });
    }

    // Re-apply active filter after render
    const activeFilter = document.querySelector('#friendFilters .filter-pill.active');
    if (activeFilter) {
      this.filterFriendsList(activeFilter.dataset.filter);
    }
  }

  filterFriendsList(filter) {
    if (!filter) return;
    const friendsList = document.getElementById('friendsList');
    const requestsList = document.getElementById('friendRequestsList');
    if (filter === 'all') {
      // Show all friends, hide requests
      if (friendsList) friendsList.style.display = '';
      if (requestsList) requestsList.style.display = 'none';
      friendsList?.querySelectorAll('.friend-item').forEach(item => { item.style.display = ''; });
    } else if (filter === 'online') {
      if (friendsList) friendsList.style.display = '';
      if (requestsList) requestsList.style.display = 'none';
      friendsList?.querySelectorAll('.friend-item').forEach(item => {
        const isOnline = this.onlineUsers.includes(item.dataset.user);
        item.style.display = isOnline ? '' : 'none';
      });
    } else if (filter === 'pending') {
      if (friendsList) friendsList.style.display = 'none';
      if (requestsList) requestsList.style.display = '';
    } else if (filter === 'blocked') {
      // Show all blocked users (not just friends) with unblock buttons
      if (requestsList) requestsList.style.display = 'none';
      if (friendsList) {
        friendsList.style.display = '';
        const blockedUsers = Array.from(this.state.blockedUsers || []);
        if (blockedUsers.length === 0) {
          friendsList.innerHTML = '<div class="empty-state" style="padding:2rem;text-align:center;color:var(--text-secondary);"><i class="fas fa-shield-alt" style="font-size:2rem;margin-bottom:0.5rem;display:block;"></i><p>No blocked users</p></div>';
        } else {
          friendsList.innerHTML = blockedUsers.map(u => `
            <div class="friend-item blocked-item" data-user="${this.escapeHTML(u)}">
              <img class="avatar" src="${this.getAvatarUrl(u)}" alt="" style="width:36px;height:36px;border-radius:50%;">
              <span class="friend-name">${this.escapeHTML(u)}</span>
              <button class="unblock-btn" style="margin-left:auto;padding:4px 12px;border:none;border-radius:6px;background:var(--accent);color:#fff;cursor:pointer;font-size:0.85rem;">Unblock</button>
            </div>
          `).join('');
          friendsList.querySelectorAll('.unblock-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const item = btn.closest('.friend-item');
              const user = item?.dataset.user;
              if (user) {
                this.unblockUser(user);
                this.filterFriendsList('blocked'); // Re-render the list
              }
            });
          });
        }
      }
    }
  }

  /* ═══════════════════════ USER LIST ═══════════════════════ */
  handleUserList(data) {
    // Normalize: server sends either { users: [...] } or a raw array of objects/strings
    const raw = Array.isArray(data) ? data : (data.users || []);
    this.onlineUsers = raw.map(u => typeof u === 'string' ? u : u.username);
    // Store full user data for displayName, role, etc.
    this._userListData = {};
    raw.forEach(u => {
      if (typeof u === 'object' && u.username) {
        this._userListData[u.username] = u;
      }
    });
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
      const listData = this._userListData?.[user];
      const role = listData?.role || status?.role || 'member';
      const displayName = listData?.displayName || '';
      const entry = { name: user, displayName, role, status: status?.status || listData?.status || 'online' };
      if (role === 'admin') admins.push(entry);
      else if (role === 'moderator') mods.push(entry);
      else members.push(entry);
    });

    let html = '';
    const renderGroup = (label, list, roleClass) => {
      if (list.length === 0) return '';
      let h = `<div class="member-category">${label} — ${list.length}</div>`;
      list.forEach(u => {
        const shownName = u.displayName || u.name;
        h += `<div class="member-item" data-user="${this.escapeHTML(u.name)}">
          <div class="member-avatar-wrapper">
            <img class="avatar" src="${this.getAvatarUrl(u.name)}" alt="" data-avatar-user="${this.escapeHTML(u.name)}">
            <span class="member-status-dot ${u.status}"></span>
          </div>
          <span class="member-name">${this.escapeHTML(shownName)}</span>
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

  showRoomManagePopup(room) {
    if (!room) return;
    const modal = document.getElementById('roomManageModal');
    if (!modal) return;
    // Set title
    const title = modal.querySelector('#roomManageTitle');
    if (title) title.textContent = room;
    // Store current room for kick actions
    modal.dataset.room = room;
    // Request members from server
    this.socket.emit('getRoomMembers', { room });
    this.openModal('roomManageModal');
  }

  handleRoomMembers(data) {
    const modal = document.getElementById('roomManageModal');
    if (!modal) return;
    const list = document.getElementById('roomMembersList');
    if (!list) return;
    const members = data.members || [];
    const canKick = this.userRole === 'admin' || this.userRole === 'moderator';
    // Check if current user is room creator
    const roomObj = (this.allRoomsData || []).find(r => r.name === data.room || r.id === data.room);
    const isCreator = roomObj?.creator === this.username;
    const showKick = canKick || isCreator;

    if (members.length === 0) {
      list.innerHTML = '<div class="manage-empty">No members found</div>';
      return;
    }

    const groups = { admin: [], moderator: [], member: [] };
    members.forEach(m => { (groups[m.role] || groups.member).push(m); });

    const renderGroup = (label, people) => {
      if (!people.length) return '';
      return `<div class="manage-group-label">${label} — ${people.length}</div>` +
        people.map(m => {
          const isMe = m.username === this.username;
          const avatarUrl = m.avatar ? (m.avatar.startsWith('data:') || m.avatar.startsWith('http') ? m.avatar : `/uploads/avatars/${m.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(m.username)}&background=random&color=fff&size=40`;
          const kickBtn = (showKick && !isMe && m.role !== 'admin')
            ? `<button class="kick-btn" data-user="${this.escapeHTML(m.username)}" title="Remove from room"><i class="fas fa-user-minus"></i></button>`
            : '';
          return `<div class="manage-member-item">
            <img class="manage-avatar" src="${avatarUrl}" alt="${this.escapeHTML(m.username)}">
            <div class="manage-member-info">
              <span class="manage-username">${this.escapeHTML(m.username)}${isMe ? ' <span class="you-tag">(you)</span>' : ''}</span>
              ${m.role !== 'member' ? `<span class="manage-role-tag ${m.role}">${m.role}</span>` : ''}
            </div>
            <div class="manage-member-actions">
              <button class="manage-profile-btn" data-user="${this.escapeHTML(m.username)}" title="View Profile"><i class="fas fa-user"></i></button>
              ${kickBtn}
            </div>
          </div>`;
        }).join('');
    };

    list.innerHTML =
      renderGroup('Admins', groups.admin) +
      renderGroup('Moderators', groups.moderator) +
      renderGroup('Members', groups.member);

    // Bind kick buttons
    list.querySelectorAll('.kick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.user;
        if (!target) return;
        if (!confirm(`Remove ${target} from ${data.room}?`)) return;
        this.socket.emit('kickFromRoom', { targetUsername: target, room: data.room });
        // Remove from UI immediately
        btn.closest('.manage-member-item')?.remove();
        this.toast(`${target} removed from room`, 'info');
      });
    });
    // Bind profile buttons
    list.querySelectorAll('.manage-profile-btn').forEach(btn => {
      btn.addEventListener('click', () => this.showProfile(btn.dataset.user));
    });
  }

  filterMembers(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('.member-item').forEach(item => {
      const name = item.dataset.user.toLowerCase();
      item.style.display = name.includes(q) ? '' : 'none';
    });
  }

  // Typing indicators completely removed — no-ops for safety
  handleTyping() {}
  handleStopTyping() {}
  updateTypingDisplay() {}
  stopTyping() {}
  hideTypingIndicator() {}

  updateActivityBar() {
    const bar = document.getElementById('activityBar');
    const textEl = document.getElementById('activityBarText');
    if (!bar || !textEl) return;
    const activities = [];
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
      nameEl.style.color = this.userRole === 'admin' ? '#e74c3c' : '';
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

  // called when another user changes their accent color
  onUserAccentUpdate(data) {
    if (!data || !data.username || !data.accent) return;
    const profileModal = document.getElementById('profileModal');
    const usernameEl = profileModal?.querySelector('.profile-username');
    const banner = profileModal?.querySelector('.profile-banner');
    if (banner && usernameEl && usernameEl.textContent === `@${data.username}`) {
      banner.style.background = `linear-gradient(135deg, ${data.accent}, ${this.adjustColor(data.accent, -40)})`;
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
    // Name color picker — requires custom_name_color perk
    const nameColorInput = document.getElementById('nameColorInput');
    if (nameColorInput) {
      nameColorInput.value = this.nameColor || '#ffffff';
      const hasPerk = (this.userPerks || []).includes('custom_name_color') || this.userRole === 'admin';
      nameColorInput.disabled = !hasPerk;
      const nameColorHint = document.getElementById('nameColorHint');
      if (nameColorHint) nameColorHint.style.display = hasPerk ? 'none' : '';
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
    // cache accent for this user so initials avatars use it
    if (data.accent) {
      this.userAccents[data.username] = data.accent;
    }
    
    // use initials fallback if no avatar URL provided
    const avatarSrc = data.avatar ? data.avatar : this.generateInitialsAvatar(data.username);
    const avatarEl = modal.querySelector('.profile-avatar');
    if (avatarEl) {
      avatarEl.onerror = () => {
        avatarEl.onerror = null;
        avatarEl.src = this.generateInitialsAvatar(data.username);
      };
      avatarEl.setAttribute('src', avatarSrc);
    }
    // apply accent color banner if provided
    const banner = modal.querySelector('.profile-banner');
    if (banner) {
      const accent = data.accent || this.settings.accent || '#667eea';
      banner.style.background = `linear-gradient(135deg, ${accent}, ${this.adjustColor(accent, -40)})`;
    }
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
      const isFriend = (this.friends || []).includes(data.username);
      const isBlocked = (this.blocked || []).includes(data.username);
      const isSent = (this.friendRequests.sent || []).includes(data.username);
      actionsEl.innerHTML = `
        <button class="btn primary" onclick="app.startDM('${this.escapeHTML(data.username)}'); app.closeModal('profileModal')">
          <i class="fas fa-comment"></i> Message
        </button>
        ${isFriend ? 
          `<button class="btn secondary" onclick="app.socket.emit('removeFriend', { friendUsername: '${this.escapeHTML(data.username)}' }); app.toast('Friend removed', 'info')">
            <i class="fas fa-user-minus"></i> Remove
          </button>` : !isSent ?
          `<button class="btn secondary" onclick="app.socket.emit('friendRequest', { to: '${this.escapeHTML(data.username)}' }); app.friendRequests.sent.push('${this.escapeHTML(data.username)}'); app.renderFriends(); app.toast('Friend request sent!', 'success')">
            <i class="fas fa-user-plus"></i> Add Friend
          </button>` :
          `<button class="btn" disabled>Request Sent</button>`
        }
        <button class="btn ${isBlocked ? 'secondary' : 'danger'}" onclick="app.${isBlocked ? 'unblockUser' : 'blockUser'}('${this.escapeHTML(data.username)}'); app.closeModal('profileModal');">
          <i class="fas fa-ban"></i> ${isBlocked ? 'Unblock' : 'Block'}
        </button>
        <button class="btn danger" onclick="app.closeModal('profileModal');app.openReportModal('${this.escapeHTML(data.username)}');"><i class="fas fa-flag"></i> Report</button>
        ${this.userRole === 'admin' ? `<button class="btn danger" onclick="app.closeModal('profileModal');app.openBanModal('${this.escapeHTML(data.username)}');"><i class="fas fa-gavel"></i> Ban</button>` : ''}
      `;
    } else if (actionsEl) {
      actionsEl.innerHTML = '<button class=\"btn primary\" onclick=\"app.openModal(\'settingsModal\')\"><i class=\"fas fa-cog\"></i> Edit Profile</button>';
    }

    this.openModal('profileModal');
  }

  /* ═══════════════════════ FILE UPLOAD ═══════════════════════ */
  async _parseUploadResponse(res) {
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    if (!text) return {};
    if (contentType.includes('application/json')) {
      try {
        return JSON.parse(text);
      } catch (err) {
        throw new Error('Upload returned invalid JSON');
      }
    }
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error(text.trim() || `Upload failed (${res.status})`);
    }
  }

  sendVoiceMessage(file) {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    this.toast('Sending voice message...', 'info', 3000);
    fetch('/upload', { method: 'POST', body: formData })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text.trim() || 'Upload failed');
        }
        return this._parseUploadResponse(res);
      })
      .then(data => {
        if (data.url) {
          const room = (this.currentRoom || 'general').toString().toLowerCase();
          const payload = {
            text: '',
            fileUrl: data.url,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            room: this.isDM ? null : room,
            to: this.isDM ? this.currentDM : null,
          };
          if (this.isDM) {
            payload.targetUsername = this.currentDM;
            this.socket.emit('directMessage', payload);
          } else {
            this.socket.emit('fileMessage', payload);
          }
          this.toast('Voice message sent!', 'success');
        }
      })
      .catch(e => this.toast('Failed to send voice message', 'error'));
  }

  uploadFile(file) {
    if (!file) return;
    if (this.isRedAI) { this.toast('File uploads are not available in AI chat', 'warning'); return; }
    const maxSize = 500 * 1024 * 1024; // 500MB (matches server limit)
    if (file.size > maxSize) {
      this.toast('File too large (max 500MB)', 'error');
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
      this.dom.messageInput.placeholder = this.isDM && this.currentDM
        ? `Message @${this.currentDM}`
        : `Message #${this.currentRoom || 'General'}`;
    }
  }

  sendPendingUpload(caption) {
    const file = this.pendingUploadFile;
    if (!file) return;
    this.pendingUploadFile = null;
    const bar = document.getElementById('uploadPreview');
    if (bar) bar.style.display = 'none';
    if (this.dom.messageInput) {
      this.dom.messageInput.placeholder = this.isDM && this.currentDM
        ? `Message @${this.currentDM}`
        : `Message #${this.currentRoom || 'General'}`;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.toast('Uploading...', 'info', 10000);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(async res => {
      if (!res.ok) {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          throw new Error(json.error || `Upload failed (${res.status})`);
        } catch (err) {
          if (err.message && !err.message.startsWith('Unexpected')) throw err;
          throw new Error(text.trim() || `Upload failed (${res.status})`);
        }
      }
      return this._parseUploadResponse(res);
    })
    .then(data => {
      if (data.url) {
        const room = (this.currentRoom || 'general').toString().toLowerCase();
        const payload = {
          text: caption || '',
          fileUrl: data.url,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          room: this.isDM ? null : room,
          to: this.isDM ? this.currentDM : null,
          expiresAt: data.expiresAt || null,
          lifetimeHours: data.lifetimeHours || null,
        };
        if (this.isDM) {
          payload.targetUsername = this.currentDM;
          this.socket.emit('directMessage', payload);
        } else {
          this.socket.emit('fileMessage', payload);
        }
        if (data.lifetimeHours && data.lifetimeHours > 0) {
          const hrs = data.lifetimeHours;
          const label = hrs >= 24 ? Math.round(hrs / 24) + ' day(s)' : hrs + ' hour(s)';
          this.toast(`File uploaded! Expires in ${label}`, 'success');
        } else {
          this.toast('File uploaded!', 'success');
        }
      } else {
        this.toast(data.error || 'Upload failed', 'error');
      }
    })
    .catch(e => this.toast(e.message || 'Upload failed', 'error'));
  }

  openAvatarCrop(file) {
    if (!file || !file.type.startsWith('image/')) { this.toast('Please select an image file', 'error'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.openModal('avatarCropModal');
        const canvas = document.getElementById('avatarCropCanvas');
        const slider = document.getElementById('avatarZoomSlider');
        const saveBtn = document.getElementById('avatarCropSaveBtn');
        if (!canvas || !slider || !saveBtn) return;
        const ctx = canvas.getContext('2d');
        const size = 200;
        let scale = 1;
        let offsetX = 0, offsetY = 0;
        let dragging = false, lastX = 0, lastY = 0;

        const draw = () => {
          ctx.clearRect(0, 0, size, size);
          const w = img.width * scale;
          const h = img.height * scale;
          // Center image initially
          const fitScale = size / Math.min(img.width, img.height);
          const drawW = img.width * fitScale * (scale / 100 * 100);
          const drawH = img.height * fitScale * (scale / 100 * 100);
          // Use fit scale as base
          const baseScale = size / Math.min(img.width, img.height);
          const finalW = img.width * baseScale * (scale);
          const finalH = img.height * baseScale * (scale);
          const x = (size - finalW) / 2 + offsetX;
          const y = (size - finalH) / 2 + offsetY;
          ctx.drawImage(img, x, y, finalW, finalH);
        };

        // Reset
        scale = 1;
        offsetX = 0;
        offsetY = 0;
        slider.value = 100;
        draw();

        slider.oninput = () => {
          scale = parseInt(slider.value) / 100;
          draw();
        };

        // Drag to pan (mouse)
        canvas.onmousedown = (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.style.cursor = 'grabbing'; };
        canvas.onmousemove = (e) => { if (!dragging) return; offsetX += e.clientX - lastX; offsetY += e.clientY - lastY; lastX = e.clientX; lastY = e.clientY; draw(); };
        canvas.onmouseup = () => { dragging = false; canvas.style.cursor = 'grab'; };
        canvas.onmouseleave = () => { dragging = false; canvas.style.cursor = 'grab'; };

        // Drag to pan (touch)
        canvas.ontouchstart = (e) => { if (e.touches.length === 1) { dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; } };
        canvas.ontouchmove = (e) => { if (!dragging || e.touches.length !== 1) return; e.preventDefault(); offsetX += e.touches[0].clientX - lastX; offsetY += e.touches[0].clientY - lastY; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; draw(); };
        canvas.ontouchend = () => { dragging = false; };

        // Save button
        saveBtn.onclick = () => {
          canvas.toBlob((blob) => {
            if (!blob) { this.toast('Failed to process image', 'error'); return; }
            const croppedFile = new File([blob], 'avatar.png', { type: 'image/png' });
            this.uploadAvatar(croppedFile);
            this.closeModal('avatarCropModal');
          }, 'image/png', 0.9);
        };
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
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
    .then(async res => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text.trim() || 'Avatar upload failed');
      }
      return this._parseUploadResponse(res);
    })
    .then(data => {
      if (data.url) {
        this.myAvatar = data.url;
        this.userAvatar = data.url;
        this.avatars[this.username] = data.url;
        localStorage.setItem(`redchat_avatar:${this.username}`, data.url);
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

    // Markdown tables: detect lines with | separators
    t = t.replace(/((?:^\|.+\|$\n?){2,})/gm, (tableBlock) => {
      const lines = tableBlock.trim().split('\n').filter(l => l.trim());
      if (lines.length < 2) return tableBlock;
      // Check if second line is a separator (|---|---|)
      const isSep = /^\|[\s\-:]+(\|[\s\-:]+)+\|?$/.test(lines[1].trim());
      let html = '<div class="ai-table-wrap"><table class="ai-table">';
      const startIdx = isSep ? 2 : 0;
      if (isSep && lines[0]) {
        const headers = lines[0].split('|').filter(c => c.trim() !== '');
        html += '<thead><tr>' + headers.map(h => `<th>${h.trim()}</th>`).join('') + '</tr></thead>';
      }
      html += '<tbody>';
      for (let i = startIdx; i < lines.length; i++) {
        const cells = lines[i].split('|').filter(c => c.trim() !== '');
        if (cells.length > 0) {
          html += '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
        }
      }
      html += '</tbody></table></div>';
      return html;
    });

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
    // Headings (### h3, ## h2, # h1)
    t = t.replace(/^### (.+)$/gm, '<h3 class="ai-heading">$1</h3>');
    t = t.replace(/^## (.+)$/gm, '<h2 class="ai-heading">$1</h2>');
    t = t.replace(/^# (.+)$/gm, '<h1 class="ai-heading">$1</h1>');
    // Numbered lists (1. item)
    t = t.replace(/^(\d+)\. (.+)$/gm, '<div class="ai-list-item"><span class="ai-list-num">$1.</span> $2</div>');
    // Bullet lists (- item or * item)
    t = t.replace(/^[\-\*] (.+)$/gm, '<div class="ai-list-item"><span class="ai-list-bullet">•</span> $1</div>');
    // Horizontal rules (--- or ***)
    t = t.replace(/^(\s*[-*]{3,}\s*)$/gm, '<hr class="ai-hr">');
    // Blockquote
    t = t.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
    // Mentions — @everyone and @system get special styling
    t = t.replace(/@(everyone)\b/gi, '<span class="mention mention-everyone" data-user="everyone">@everyone</span>');
    t = t.replace(/@(system)\b/gi, '<span class="mention mention-system" data-user="system">@system</span>');
    t = t.replace(/@(\w+)/g, '<span class="mention" data-user="$1">@$1</span>');
    // Room mentions — style #word and #[room with spaces] patterns as room links
    t = t.replace(/(^|\s)#\[([^\]]+)\]/g, (match, prefix, name) => {
      return `${prefix}<span class="room-mention" data-room="${this.escapeHTML(name)}">#${this.escapeHTML(name)}</span>`;
    });
    t = t.replace(/(^|\s)#([\w][\w-]*)/g, (match, prefix, name) => {
      return `${prefix}<span class="room-mention" data-room="${this.escapeHTML(name)}">#${this.escapeHTML(name)}</span>`;
    });
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
  handlePollCreated(data, silent) {
    // Avoid duplicate: don't add if a poll with this ID is already rendered or tracked
    if (!this._seenPollIds) this._seenPollIds = new Set();
    if (data.id && this._seenPollIds.has(data.id)) {
      // Still refresh vote state if the poll element exists
      const existing = document.querySelector(`.message[data-id="${data.id}"] .msg-poll`);
      if (existing) this.renderPollContent(existing, data);
      return;
    }
    if (data.id && document.querySelector(`.message[data-id="${data.id}"]`)) {
      this._seenPollIds.add(data.id);
      return;
    }
    if (data.id) this._seenPollIds.add(data.id);
    this.appendMessage({
      username: data.creator || 'System',
      text: '',
      type: 'poll',
      poll: data,
      timestamp: data.createdAt || data.timestamp || Date.now(),
      id: data.id
    });
    if (!silent) this.toast('New poll created!', 'info');
  }

  handlePollUpdate(data) {
    // Re-render the poll in messages
    const pollEl = document.querySelector(`.message[data-id="${data.id}"] .msg-poll`);
    if (pollEl) {
      this.renderPollContent(pollEl, data);
    }
    // Also update in-memory history so refreshes show latest votes
    const roomKey = (this.currentRoom || '').toLowerCase();
    const hist = this.messageHistory[roomKey];
    if (hist) {
      const entry = hist.find(m => m.id === data.id && m.type === 'poll');
      if (entry) entry.poll = data;
    }
  }

  renderPollContent(container, poll) {
    const voteCount = (v) => Array.isArray(v) ? v.length : (v || 0);
    const totalVotes = poll.options.reduce((sum, opt) => sum + voteCount(opt.votes), 0);
    const pollId = poll.id;
    const multiLabel = poll.allowMultiple ? '<span class="poll-multi-badge"><i class="fas fa-check-double"></i> Multiple Choice</span>' : '';
    const cooldownLabel = poll.cooldownMinutes ? `<span class="poll-cooldown-badge"><i class="fas fa-clock"></i> ${poll.cooldownMinutes}m cooldown</span>` : '';
    container.innerHTML = `
      <div class="poll-question">${this.escapeHTML(poll.question)}${multiLabel}${cooldownLabel}</div>
      ${poll.options.map((opt, i) => {
        const count = voteCount(opt.votes);
        const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
        const voted = (Array.isArray(opt.votes) ? opt.votes.includes(this.username) : opt.voters?.includes(this.username)) ? 'voted' : '';
        return `<div class="poll-option ${voted}" data-poll="${poll.id}" data-option="${i}" style="cursor:pointer;">
          <div class="poll-bar" style="width: ${pct}%"></div>
          <span class="poll-option-text">${this.escapeHTML(opt.text)}</span>
          <span class="poll-option-pct">${pct}% (${count})</span>
        </div>`;
      }).join('')}
      <div class="poll-votes">${totalVotes} vote${totalVotes !== 1 ? 's' : ''}${!poll.anonymous && totalVotes > 0 ? ` <button class="btn-link poll-view-votes-btn" data-poll-id="${pollId}" style="margin-left:8px;font-size:12px;color:var(--accent);cursor:pointer;background:none;border:none;text-decoration:underline;">View Votes</button>` : ''}</div>
    `;
    container.querySelectorAll('.poll-option').forEach(opt => {
      opt.addEventListener('click', () => {
        this.socket.emit('votePoll', { pollId: opt.dataset.poll, optionId: parseInt(opt.dataset.option), option: parseInt(opt.dataset.option) });
      });
    });
    // View Votes button handler
    const viewVotesBtn = container.querySelector('.poll-view-votes-btn');
    if (viewVotesBtn) {
      viewVotesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._showPollVotesPopup(poll);
      });
    }
  }

  _showPollVotesPopup(poll) {
    // Remove any existing popup
    document.querySelectorAll('.poll-votes-popup-overlay').forEach(el => el.remove());
    const voteCount = (v) => Array.isArray(v) ? v.length : (v || 0);
    const overlay = document.createElement('div');
    overlay.className = 'poll-votes-popup-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';
    const popup = document.createElement('div');
    popup.style.cssText = 'background:var(--bg-primary,#1a1a2e);border-radius:12px;padding:24px;max-width:400px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h3 style="margin:0;color:var(--text-primary,#fff);">Poll Votes</h3>
        <button class="poll-votes-close" style="background:none;border:none;color:var(--text-muted,#888);font-size:18px;cursor:pointer;"><i class="fas fa-xmark"></i></button>
      </div>
      <div style="margin-bottom:8px;color:var(--text-secondary,#ccc);font-size:14px;">${this.escapeHTML(poll.question)}</div>
      ${poll.options.map(opt => {
        const count = voteCount(opt.votes);
        const voters = Array.isArray(opt.votes) ? opt.votes : [];
        return `<div style="margin:12px 0;padding:10px;background:var(--bg-secondary,#222);border-radius:8px;">
          <div style="font-weight:600;color:var(--text-primary,#fff);margin-bottom:6px;">${this.escapeHTML(opt.text)} <span style="color:var(--text-muted,#888);font-weight:400;">(${count})</span></div>
          ${voters.length > 0 ? `<div style="color:var(--text-secondary,#ccc);font-size:13px;">${voters.map(u => this.escapeHTML(u)).join(', ')}</div>` : '<div style="color:var(--text-muted,#666);font-size:13px;font-style:italic;">No votes</div>'}
        </div>`;
      }).join('')}
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    popup.querySelector('.poll-votes-close').addEventListener('click', () => overlay.remove());
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
    // Only show unpin button if current user is admin, mod, or room creator
    const canUnpin = this.userRole === 'admin' || this.userRole === 'moderator' || this._isCurrentRoomCreator();
    list.innerHTML = messages.map(msg => {
      let contentHTML = '';
      if (msg.type === 'poll' && msg.poll) {
        contentHTML = `<div class="pinned-type-badge"><i class="fas fa-chart-bar"></i> Poll</div><div class="pinned-text">${this.escapeHTML(msg.poll.question || 'Poll')}</div>`;
      } else if (msg.type === 'wheel' && msg.options) {
        contentHTML = `<div class="pinned-type-badge"><i class="fas fa-dharmachakra"></i> Wheel</div><div class="pinned-text">🎡 ${this.escapeHTML((msg.options || []).join(', '))}</div>`;
      } else if (msg.type === 'event' && msg.event) {
        contentHTML = `<div class="pinned-type-badge"><i class="fas fa-calendar-alt"></i> Event</div><div class="pinned-text">${this.escapeHTML(msg.event.title || 'Event')}</div>`;
      } else if (msg.isCustomSticker || msg.isSticker) {
        contentHTML = msg.stickerUrl
          ? `<div class="pinned-type-badge"><i class="fas fa-note-sticky"></i> Sticker</div><img class="pinned-sticker" src="${this.escapeHTML(msg.stickerUrl)}" alt="sticker" style="max-width:64px;max-height:64px;border-radius:6px;">`
          : `<div class="pinned-type-badge"><i class="fas fa-note-sticky"></i> Sticker</div>`;
      } else if (msg.type === 'file' || msg.fileUrl) {
        contentHTML = `<div class="pinned-type-badge"><i class="fas fa-file"></i> File</div><div class="pinned-text">${this.escapeHTML(msg.fileName || 'File')}</div>`;
      } else if (msg.type === 'image' || msg.imageUrl) {
        contentHTML = `<div class="pinned-type-badge"><i class="fas fa-image"></i> Image</div><img class="pinned-sticker" src="${this.escapeHTML(msg.imageUrl || msg.fileUrl)}" alt="image" style="max-width:80px;max-height:80px;border-radius:6px;">`;
      } else {
        contentHTML = `<div class="pinned-text">${this.formatText(msg.message || msg.text || '')}</div>`;
      }
      return `
      <div class="pinned-item" data-id="${msg.id}" data-msg-id="${msg.id}">
        <div class="pinned-author">${this.escapeHTML(msg.username)}</div>
        ${contentHTML}
        <div class="pinned-time">${new Date(msg.timestamp).toLocaleString()}</div>
        ${canUnpin ? `<button class="pinned-unpin-btn" title="Unpin" data-msg-id="${msg.id}"><i class="fas fa-thumbtack"></i></button>` : ''}
      </div>
    `;
    }).join('');
    list.querySelectorAll('.pinned-unpin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.socket.emit('unpinMessage', { messageId: btn.dataset.msgId, room: this.currentRoom });
        this.toast('Message unpinned', 'info');
      });
    });
    // Click on pinned item to scroll to message in chat
    list.querySelectorAll('.pinned-item').forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        if (e.target.closest('.pinned-unpin-btn')) return;
        const msgId = item.dataset.msgId || item.dataset.id;
        if (msgId) {
          // Close pinned modal
          this.dom.pinnedModal?.classList.remove('active');
          this.scrollToMessage(msgId);
        }
      });
    });
  }

  _isCurrentRoomCreator() {
    const roomData = (this.allRoomsData || []).find(r => r.id === this.currentRoom || r.name === this.currentRoom);
    return roomData?.creator === this.username;
  }

  updatePinnedBar(messages) {
    const bar = document.getElementById('pinnedBar');
    const text = document.getElementById('pinnedBarText');
    const count = document.getElementById('pinnedBarCount');
    if (!bar || !text) return;
    if (!messages || messages.length === 0) {
      bar.style.display = 'none';
      return;
    }
    const latest = messages[messages.length - 1];
    const content = latest.message || latest.text || '';
    let displayText = '';
    if (latest.type === 'poll' && latest.poll) {
      displayText = `📊 ${latest.username}: Poll - ${latest.poll.question || 'Poll'}`;
    } else if (latest.type === 'wheel' && latest.options) {
      displayText = `🎡 ${latest.username}: Wheel`;
    } else if (latest.type === 'event' && latest.event) {
      displayText = `📅 ${latest.username}: Event - ${latest.event.title || 'Event'}`;
    } else if (latest.isCustomSticker || latest.isSticker) {
      displayText = `${latest.username}: Sticker`;
    } else if (latest.type === 'file' || latest.fileUrl) {
      displayText = `📎 ${latest.username}: ${latest.fileName || 'File'}`;
    } else {
      displayText = `${latest.username}: ${content}`;
    }
    text.textContent = displayText.substring(0, 150);
    if (count) count.textContent = messages.length > 1 ? `${messages.length} pinned` : '';
    bar.style.display = 'flex';
    bar.style.cursor = 'pointer';
    bar.onclick = () => {
      if (latest.id) this.scrollToMessage(latest.id);
    };
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

    // Always append as a highly-visible system message in chat
    this.appendMessage({
      type: 'system',
      text: `📢 ${data.title ? data.title + ': ' : ''}${data.message || ''}`,
      timestamp: Date.now()
    });
    this.scrollToBottom();

    if (banner && textEl) {
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
    }

    this.addNotification({ type: 'announcement', text: `${data.title}: ${data.message}`, time: Date.now() });
    this.toast(`📢 ${data.title}`, 'info', 6000);
  }

  showWhileYouWereAway(data) {
    if (!data) return;
    const container = this.dom.messagesContainer;
    if (!container) return;

    const since = data.since ? new Date(data.since) : null;
    const sinceStr = since ? since.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null;

    const rows = [];

    if (data.missedMessages > 0) {
      const roomParts = Object.entries(data.rooms || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([room, count]) => `<span class="away-tag">#${this.escapeHTML(room)} <strong>${count}</strong></span>`);
      rows.push(`<div class="away-row">
        <i class="fas fa-comment away-row-icon" style="color:#667eea"></i>
        <div class="away-row-body">
          <span class="away-row-label"><strong>${data.missedMessages}</strong> new message${data.missedMessages !== 1 ? 's' : ''}</span>
          ${roomParts.length ? '<div class="away-tags">' + roomParts.join('') + '</div>' : ''}
        </div>
      </div>`);
    }

    if (data.mentions > 0) {
      rows.push(`<div class="away-row">
        <i class="fas fa-at away-row-icon" style="color:#f59e0b"></i>
        <div class="away-row-body">
          <span class="away-row-label">You were mentioned <strong>${data.mentions}</strong> time${data.mentions !== 1 ? 's' : ''}</span>
        </div>
      </div>`);
    }

    if (data.missedDMs > 0) {
      const dmParts = (data.dmFrom || [])
        .slice(0, 4)
        .map(d => `<span class="away-tag away-tag-dm">${this.escapeHTML(d.username)} <strong>${d.count}</strong></span>`);
      rows.push(`<div class="away-row">
        <i class="fas fa-envelope away-row-icon" style="color:#10b981"></i>
        <div class="away-row-body">
          <span class="away-row-label"><strong>${data.missedDMs}</strong> direct message${data.missedDMs !== 1 ? 's' : ''}</span>
          ${dmParts.length ? '<div class="away-tags">' + dmParts.join('') + '</div>' : ''}
        </div>
      </div>`);
    }

    if (data.friendRequests > 0) {
      rows.push(`<div class="away-row">
        <i class="fas fa-user-plus away-row-icon" style="color:#8b5cf6"></i>
        <div class="away-row-body">
          <span class="away-row-label"><strong>${data.friendRequests}</strong> pending friend request${data.friendRequests !== 1 ? 's' : ''}</span>
        </div>
      </div>`);
    }

    if (rows.length === 0) return;

    const card = document.createElement('div');
    card.className = 'away-card';
    card.innerHTML = `
      <div class="away-card-header">
        <div class="away-card-title">
          <i class="fas fa-clock"></i>
          While you were away${sinceStr ? ` <span class="away-since">since ${sinceStr}</span>` : ''}
        </div>
        <button class="away-dismiss" title="Dismiss"><i class="fas fa-times"></i></button>
      </div>
      <div class="away-card-body">${rows.join('')}</div>
    `;
    card.querySelector('.away-dismiss').addEventListener('click', () => card.remove());
    container.appendChild(card);
    container.scrollTop = container.scrollHeight;

    // Also add to notification center
    const summary = [
      data.missedMessages > 0 ? `${data.missedMessages} messages` : '',
      data.mentions > 0 ? `${data.mentions} mentions` : '',
      data.missedDMs > 0 ? `${data.missedDMs} DMs` : '',
      data.friendRequests > 0 ? `${data.friendRequests} friend requests` : ''
    ].filter(Boolean).join(', ');
    this.addNotification({ type: 'system', text: `While you were away: ${summary}`, time: Date.now() });
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
    const lvl = data.newLevel || data.level;
    this.userLevel = lvl;
    this.toast(`🎉 Level Up! You're now level ${lvl}!`, 'success', 5000);
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

  showFireworks() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff922b', '#f06595', '#cc5de8'];
    const burst = (x, y) => {
      for (let i = 0; i < 30; i++) {
        const spark = document.createElement('div');
        const angle = (i / 30) * 360;
        const dist = 60 + Math.random() * 80;
        const color = colors[Math.floor(Math.random() * colors.length)];
        spark.style.cssText = `
          position: fixed; left: ${x}px; top: ${y}px;
          width: 6px; height: 6px; border-radius: 50%;
          background: ${color}; z-index: 99999; pointer-events: none;
          transform: translate(-50%, -50%);
          transition: transform 0.8s cubic-bezier(.1,.6,.2,1), opacity 0.8s ease;
          opacity: 1;
        `;
        document.body.appendChild(spark);
        const rad = (angle * Math.PI) / 180;
        requestAnimationFrame(() => {
          spark.style.transform = `translate(${Math.cos(rad) * dist - 3}px, ${Math.sin(rad) * dist - 3}px)`;
          spark.style.opacity = '0';
        });
        setTimeout(() => spark.remove(), 900);
      }
    };
    // Burst at 2-3 random points
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        burst(
          window.innerWidth * (0.2 + Math.random() * 0.6),
          window.innerHeight * (0.1 + Math.random() * 0.5)
        );
      }, i * 250);
    }
  }

  /* ═══════════════════════ POLL / WHEEL / EVENT DIALOGS ═══════════════════════ */
  showCreatePollDialog() {
    this.openModal('pollModal');
  }

  showWheelDialog() {
    this.openModal('wheelModal');
  }

  showCreateEventDialog() {
    this.openModal('eventModal');
    // Set default start time to 1 hour from now
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0, 0, 0);
    const startInput = document.getElementById('eventStartTime');
    const endInput = document.getElementById('eventEndTime');
    if (startInput) startInput.value = now.toISOString().slice(0, 16);
    const end = new Date(now.getTime() + 60 * 60 * 1000);
    if (endInput) endInput.value = end.toISOString().slice(0, 16);
    // Bind submit
    const submitBtn = document.getElementById('submitEvent');
    if (submitBtn) {
      const newBtn = submitBtn.cloneNode(true);
      submitBtn.replaceWith(newBtn);
      newBtn.addEventListener('click', () => this.submitEvent());
    }
  }

  submitEvent() {
    const title = document.getElementById('eventTitle')?.value?.trim();
    const description = document.getElementById('eventDescription')?.value?.trim() || '';
    const startTime = new Date(document.getElementById('eventStartTime')?.value).getTime();
    const endTime = new Date(document.getElementById('eventEndTime')?.value).getTime();
    const location = document.getElementById('eventLocation')?.value?.trim() || '';
    const maxAttendees = parseInt(document.getElementById('eventMaxAttendees')?.value) || 0;
    const color = document.getElementById('eventColor')?.value || '#5865f2';

    if (!title || title.length < 2) {
      this.toast('Event title must be at least 2 characters', 'error');
      return;
    }
    if (!startTime || startTime <= Date.now()) {
      this.toast('Start time must be in the future', 'error');
      return;
    }

    this.socket.emit('createEvent', {
      title,
      description,
      startTime,
      endTime: endTime || startTime + 3600000,
      location,
      maxAttendees,
      color,
      room: this.currentRoom || 'general'
    });

    this.closeModal('eventModal');
    // Clear form
    const titleEl = document.getElementById('eventTitle');
    const descEl = document.getElementById('eventDescription');
    const locEl = document.getElementById('eventLocation');
    if (titleEl) titleEl.value = '';
    if (descEl) descEl.value = '';
    if (locEl) locEl.value = '';
  }

  handleEventCreated(event) {
    if (!event) return;
    // Render event card in chat
    const msgData = {
      type: 'event',
      event: event,
      username: event.creator,
      timestamp: event.createdAt || Date.now(),
      id: 'event-' + event.id
    };
    this.appendMessage(msgData);
    this.scrollToBottom();
    this.toast(`Event created: ${event.title}`, 'success');
  }

  handleEventUpdated(event) {
    if (!event) return;
    // Update the existing event card in DOM
    const card = document.querySelector(`.event-card[data-event-id="${event.id}"]`);
    if (card) {
      this.renderEventCardContent(card, event);
    }
  }

  handleEventCancelled(data) {
    if (!data) return;
    const card = document.querySelector(`.event-card[data-event-id="${data.eventId}"]`);
    if (card) {
      card.classList.add('cancelled');
      card.innerHTML = `<div class="event-cancelled-banner"><i class="fas fa-ban"></i> This event has been cancelled</div>` + card.innerHTML;
    }
    this.toast('An event has been cancelled', 'warning');
  }

  renderEventCardContent(container, event) {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    const dateStr = startDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    const startTimeStr = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTimeStr = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const attendeeCount = (event.attendees || []).length;
    const interestedCount = (event.interested || []).length;
    const isAttending = (event.attendees || []).includes(this.username);
    const isInterested = (event.interested || []).includes(this.username);
    const spotsLeft = event.maxAttendees > 0 ? event.maxAttendees - attendeeCount : -1;
    const spotsText = spotsLeft >= 0 ? `<span class="event-spots">${spotsLeft} spots left</span>` : '';

    const locationHTML = event.location ? `<div class="event-location"><i class="fas fa-location-dot"></i> ${this.escapeHTML(event.location)}</div>` : '';
    const descHTML = event.description ? `<div class="event-desc">${this.escapeHTML(event.description)}</div>` : '';

    // Attendee avatars (show first 8)
    const attendeeAvatars = (event.attendees || []).slice(0, 8).map(u => {
      const av = this.getAvatarUrl(u);
      return `<img class="event-attendee-avatar" src="${this.escapeHTML(av)}" alt="${this.escapeHTML(u)}" title="${this.escapeHTML(u)}">`;
    }).join('');
    const moreCount = attendeeCount > 8 ? `<span class="event-more-count">+${attendeeCount - 8}</span>` : '';

    container.innerHTML = `
      <div class="event-card-header" style="border-left: 4px solid ${this.escapeHTML(event.color || '#5865f2')};">
        <div class="event-date-badge">
          <span class="event-date-month">${startDate.toLocaleDateString([], { month: 'short' }).toUpperCase()}</span>
          <span class="event-date-day">${startDate.getDate()}</span>
        </div>
        <div class="event-info">
          <div class="event-title">${this.escapeHTML(event.title)}</div>
          <div class="event-time"><i class="fas fa-clock"></i> ${dateStr} &middot; ${startTimeStr} - ${endTimeStr}</div>
          ${locationHTML}
          ${descHTML}
        </div>
      </div>
      <div class="event-card-footer">
        <div class="event-attendees">
          <div class="event-attendee-stack">${attendeeAvatars}${moreCount}</div>
          <span class="event-attendee-count">${attendeeCount} going${interestedCount > 0 ? `, ${interestedCount} interested` : ''}</span>
          ${spotsText}
        </div>
        <div class="event-rsvp-btns">
          <button class="event-rsvp-btn ${isAttending ? 'active going' : ''}" data-response="attending" data-event-id="${this.escapeHTML(event.id)}">
            <i class="fas fa-check"></i> Going
          </button>
          <button class="event-rsvp-btn ${isInterested ? 'active interested' : ''}" data-response="interested" data-event-id="${this.escapeHTML(event.id)}">
            <i class="fas fa-star"></i> Interested
          </button>
          <button class="event-rsvp-btn" data-response="decline" data-event-id="${this.escapeHTML(event.id)}">
            <i class="fas fa-xmark"></i> Can't go
          </button>
        </div>
      </div>
    `;

    // Bind RSVP buttons
    container.querySelectorAll('.event-rsvp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.socket.emit('respondToEvent', { eventId: btn.dataset.eventId, response: btn.dataset.response });
        // Optimistic update
        container.querySelectorAll('.event-rsvp-btn').forEach(b => b.classList.remove('active', 'going', 'interested'));
        if (btn.dataset.response !== 'decline') {
          btn.classList.add('active', btn.dataset.response === 'attending' ? 'going' : 'interested');
        }
      });
    });
  }

  /* ═══════════════════════ WHEEL OF FORTUNE ═══════════════════════ */
  handleWheelResult(data) {
    // Check if this wheel result belongs to our current view
    if (this.isDM) {
      // In DM mode, match on dm_ room key
      var dmKey = (this.currentRoom || '').toLowerCase();
      if (data.room && data.room.toLowerCase() !== dmKey) return;
    } else {
      if (data.room && data.room.toLowerCase() !== (this.currentRoom || '').toLowerCase()) return;
    }
    // Deduplicate: ignore if we already rendered this wheelId
    if (!this._seenWheelIds) this._seenWheelIds = new Set();
    if (data.wheelId && this._seenWheelIds.has(data.wheelId)) return;
    if (data.wheelId) this._seenWheelIds.add(data.wheelId);
    // Create a chat message that will render a spinning wheel graphic
    const msgData = {
      type: 'wheel',
      id: data.wheelId,
      username: data.creator,
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

  /* ═══════════════════════ LOCATION SHARING ═══════════════════════ */
  shareLocation() {
    if (!navigator.geolocation) {
      this.toast('Geolocation is not supported by your browser', 'error');
      return;
    }
    this.toast('Getting your location...', 'info', 2000);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        const text = `📍 Shared location: [${lat}, ${lng}](${mapsUrl})`;
        this.sendMessage(text);
      },
      (error) => {
        const msgs = {
          1: 'Location permission denied',
          2: 'Location unavailable',
          3: 'Location request timed out'
        };
        this.toast(msgs[error.code] || 'Could not get location', 'error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
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

  sendSticker(url) {
    if (!url) return;
    if (this.isRedAI) { this.toast('Stickers are not available in AI chat', 'warning'); return; }
    if (this.currentDM) {
      this.socket.emit('directMessage', { text: '', to: this.currentDM, targetUsername: this.currentDM, isCustomSticker: true, stickerUrl: url });
    } else {
      this.socket.emit('chatMessage', { text: '', room: this.currentRoom, isCustomSticker: true, stickerUrl: url });
    }
    document.getElementById('stickerPicker')?.classList.remove('active');
  }

  renderStickerGrid() {
    const grid = document.getElementById('stickerGrid');
    if (!grid) return;
    grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    grid.style.gap = '8px';
    const stickers = Array.isArray(this.stickers) ? this.stickers : [];
    if (stickers.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--text-muted);"><i class="fas fa-image" style="font-size:24px;margin-bottom:8px;display:block;opacity:.4"></i>No stickers yet.<br>Click <b>Upload Sticker</b> to add one!</div>';
      return;
    }
    grid.innerHTML = stickers.map((s, i) => {
      const url = s.url || s.imageUrl || s;
      const name = s.name || 'sticker';
      if (typeof url !== 'string' || (!url.startsWith('/') && !url.startsWith('http') && !url.startsWith('data:'))) return '';
      return `<div class="custom-sticker-item" data-sticker-url="${this.escapeHTML(url)}" data-idx="${i}" title="${this.escapeHTML(name)}">
        <img src="${this.escapeHTML(url)}" alt="${this.escapeHTML(name)}" loading="lazy">
        <button class="custom-sticker-del" data-idx="${i}" title="Remove">×</button>
      </div>`;
    }).join('');
    grid.querySelectorAll('.custom-sticker-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('custom-sticker-del')) return;
        this.sendSticker(item.dataset.stickerUrl);
      });
    });
    grid.querySelectorAll('.custom-sticker-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx);
        if (!isNaN(idx) && Array.isArray(this.stickers)) {
          this.stickers.splice(idx, 1);
          this.socket.emit('syncCustomStickers', { stickers: this.stickers });
          this.renderStickerGrid();
        }
      });
    });
  }

  renderStickers() {
    this.renderStickerGrid();
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

    const stickerPacks = [];  // removed — sticker tab now shows user's custom stickers

    // Category tabs
    document.querySelectorAll('.picker-tab')?.forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.picker-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        grid.style.gridTemplateColumns = '';
        const cat = tab.dataset.category;
        grid.style.gap = '2px';
        if (cat === 'stickers' || cat === 'custom') {
          this.renderStickerGrid();
        } else if (cat === 'recent') {
          renderCategory(this.emojiRecent || []);
        } else {
          const catMap = { 'smileys': 'Smileys', 'animals': 'Animals', 'food': 'Food', 'activities': 'Gestures', 'travel': 'Hearts', 'objects': 'Objects', 'symbols': 'Symbols', 'flags': 'Symbols' };
          const mapped = catMap[cat] || cat;
          if (emojiCategories[mapped]) renderCategory(emojiCategories[mapped]);
        }
      });
    });

    // Render sticker grid initially (first tab is "My Stickers")
    this.renderStickerGrid();

    // Sticker upload button — uses server /upload endpoint (no base64/localStorage)
    const addStickerBtn = document.getElementById('addCustomStickerBtn');
    const stickerFileInput = document.getElementById('customStickerInput');
    if (addStickerBtn && stickerFileInput) {
      addStickerBtn.addEventListener('click', () => stickerFileInput.click());
      stickerFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        stickerFileInput.value = '';
        if (!file) return;
        if (!file.type.startsWith('image/')) { this.toast('Only image files allowed', 'error'); return; }
        // Compress sticker to ~15KB using canvas
        try {
          const compressed = await this._compressSticker(file, 15 * 1024);
          const formData = new FormData();
          formData.append('file', compressed);
          const res = await fetch('/upload', { method: 'POST', body: formData });
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text.trim() || 'Upload failed');
          }
          const json = await this._parseUploadResponse(res);
          if (!json.url) throw new Error('No URL returned');
          const name = file.name.replace(/\.[^.]+$/, '');
          const stickerData = { url: json.url, name };
          if (!Array.isArray(this.stickers)) this.stickers = [];
          this.stickers.push(stickerData);
          this.socket.emit('syncCustomStickers', { stickers: this.stickers });
          this.toast('Sticker added!', 'success');
          this.renderStickerGrid();
        } catch (err) {
          console.error('[sticker upload]', err);
          this.toast('Failed to upload sticker', 'error');
        }
      });
    }
    // end initEmojiPicker
  }

  // Compress an image file to a target size (e.g. 15KB for stickers)
  _compressSticker(file, targetSize) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // Scale down to max 128x128 for stickers
          const maxDim = 128;
          let w = img.width, h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
            else { w = Math.round(w * maxDim / h); h = maxDim; }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          // Binary search for quality that hits target size
          let lo = 0.1, hi = 0.9, bestBlob = null;
          const tryQuality = (q) => {
            return new Promise(res => {
              canvas.toBlob(blob => res(blob), 'image/webp', q);
            });
          };
          (async () => {
            // Try a few quality levels
            for (let i = 0; i < 6; i++) {
              const mid = (lo + hi) / 2;
              const blob = await tryQuality(mid);
              if (!blob) break;
              bestBlob = blob;
              if (blob.size > targetSize) hi = mid;
              else lo = mid;
            }
            // Final pass at the best quality
            if (!bestBlob) bestBlob = await tryQuality(0.5);
            resolve(new File([bestBlob], 'sticker.webp', { type: 'image/webp' }));
          })();
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  // modal handling moved out of picker
  openModal(id) {
    this.closeContextMenu();
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
      case 'notifCenterModal': this.renderNotifications(); this.markAllNotificationsRead(); break;
      case 'adminModal': this.socket.emit('getAdminStats'); break;
      case 'wheelModal':
        modal.querySelectorAll('.remove-opt').forEach(btn => {
          btn.addEventListener('click', () => btn.closest('.wheel-opt-row')?.remove());
        });
        break;
      // gameSelectModal and gameLeaderboardModal are initialized by their own show methods
      case 'gameLeaderboardModal':
        // ensure tabs are ready when opening
        this._initGameLeaderboardTabs();
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
  closeContextMenu() {
    const menu = document.getElementById('dynamicContextMenu');
    if (menu) menu.classList.remove('active');
  }

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
      if (item.type === 'quickReact') {
        return `<div class="context-quick-react-row">${item.emojis.map(em => `<button class="context-quick-react-btn" data-emoji="${em}" data-msgid="${item.msgId}">${em}</button>`).join('')}</div>`;
      }
      return `<div class="context-menu-item ${item.danger ? 'danger' : ''}" data-action="${item.action || ''}">
        <i class="${item.icon || ''}"></i> ${item.label}
      </div>`;
    }).join('');
    // Position with viewport clamping
    menu.style.top = '0px';
    menu.style.left = '0px';
    menu.style.animation = 'none'; // Disable animation during measurement
    menu.classList.add('active');
    const menuRect = menu.getBoundingClientRect();
    menu.style.animation = ''; // Re-enable animation
    let top = e.clientY;
    let left = e.clientX;
    // If requested to open above (e.g. attach menu), position bottom of menu at click point
    if (e._openAbove) {
      top = e.clientY - menuRect.height;
    }
    if (top + menuRect.height > window.innerHeight - 8) top = window.innerHeight - menuRect.height - 8;
    if (left + menuRect.width > window.innerWidth - 8) left = window.innerWidth - menuRect.width - 8;
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
    // Quick-react emoji buttons in mobile context menu
    menu.querySelectorAll('.context-quick-react-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.socket.emit('addReaction', { messageId: btn.dataset.msgid, emoji: btn.dataset.emoji, room: this.currentRoom });
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
      case 'bugreport':
        this.openModal('bugReportModal');
        break;
      case 'achievements':
        this.showAchievementsView();
        break;
      case 'language':
        this.openLanguagePicker();
        break;
      case 'ai-summarize':
        this.aiSummarizeChat();
        break;
      case 'ai-chat':
        this.switchSidebarTab('redai');
        if (window.innerWidth < 768) this.openSidebar?.();
        break;
      case 'logout':
        this.performLogout();
        break;
    }
  }

  performLogout() {
    if (confirm(this.t('common.logout_confirm'))) {
      this.socket.emit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('redchat_token');
      document.getElementById('chatApp').style.display = 'none';
      document.getElementById('authScreen').style.display = 'flex';
      this.socket.disconnect();
      this.toast(this.t('common.logged_out'), 'info');
      setTimeout(() => location.reload(), 500);
    }
  }

  showAchievementsView() {
    // Request both achievements and shop data
    this.socket.emit('getAchievementDefs');
    this.socket.emit('getShopData');

    let achData = null, shopDataObj = null;
    const tryRender = () => {
      if (!achData || !shopDataObj) return;
      this._renderXPShop(achData, shopDataObj);
    };

    const achHandler = (data) => {
      this.socket.off('achievementDefs', achHandler);
      achData = data;
      tryRender();
    };
    const shopHandler = (data) => {
      this.socket.off('shopData', shopHandler);
      shopDataObj = data;
      tryRender();
    };
    this.socket.on('achievementDefs', achHandler);
    this.socket.on('shopData', shopHandler);
  }

  _renderXPShop(achData, shopData) {
    const all = achData.achievements || [];
    const earned = all.filter(a => a.earned);
    const locked = all.filter(a => !a.earned);
    const pct = achData.totalCount > 0 ? Math.round((achData.earnedCount / achData.totalCount) * 100) : 0;
    const achXP = earned.reduce((s, a) => s + (a.xp || 0), 0);
    const totalXP = shopData.xp || 0;
    const level = shopData.level || 1;
    const perks = shopData.perks || [];

    const renderAchCard = (a) => {
      const earnedDate = a.earnedAt ? new Date(a.earnedAt).toLocaleDateString() : '';
      const progress = a.progress || 0;
      const goal = a.goal || 1;
      const progressPct = Math.min(100, Math.round((progress / goal) * 100));
      return `
        <div class="achievement-card ${a.earned ? 'earned' : 'locked'}">
          <div class="achievement-icon">${a.icon || '🏆'}</div>
          <div class="achievement-info">
            <div class="achievement-name">${this.escapeHTML(a.name)}</div>
            <div class="achievement-desc">${this.escapeHTML(a.description)}</div>
            ${!a.earned && goal > 1 ? `
              <div class="achievement-progress-wrap">
                <div class="achievement-progress-bar">
                  <div class="achievement-progress-fill" style="width:${progressPct}%"></div>
                </div>
                <span class="achievement-progress-text">${progress}/${goal}</span>
              </div>` : ''}
            <div class="achievement-meta">
              <span class="achievement-xp"><i class="fas fa-star"></i> ${a.xp} XP</span>
              ${a.earned ? `<span class="achievement-date"><i class="fas fa-check-circle"></i> ${earnedDate}</span>` : ''}
            </div>
          </div>
          ${a.earned ? '<div class="achievement-check"><i class="fas fa-check"></i></div>' : '<div class="achievement-lock"><i class="fas fa-lock"></i></div>'}
        </div>`;
    };

    const renderPerkCard = (p) => {
      const owned = p.owned;
      const canAfford = totalXP >= p.cost;
      let statusLabel = '';
      if (owned && p.consumable && p.expiresAt) {
        const remaining = Math.max(0, p.expiresAt - Date.now());
        const hours = Math.floor(remaining / 3600000);
        const mins = Math.floor((remaining % 3600000) / 60000);
        statusLabel = `<span class="perk-expires"><i class="fas fa-clock"></i> ${hours}h ${mins}m left</span>`;
      } else if (owned) {
        statusLabel = `<span class="perk-owned-badge"><i class="fas fa-check-circle"></i> Owned</span>`;
      }
      return `
        <div class="perk-card ${owned ? 'owned' : ''} ${!owned && !canAfford ? 'cant-afford' : ''}">
          <div class="perk-icon-wrap">
            <span class="perk-emoji">${p.emoji}</span>
          </div>
          <div class="perk-info">
            <div class="perk-name">${this.escapeHTML(p.name)}</div>
            <div class="perk-desc">${this.escapeHTML(p.description)}</div>
            <div class="perk-meta">
              <span class="perk-cost"><i class="fas fa-star"></i> ${p.cost} XP</span>
              ${p.consumable ? '<span class="perk-tag consumable">Consumable</span>' : ''}
              ${statusLabel}
            </div>
          </div>
          <div class="perk-action">
            ${owned && !p.consumable
              ? '<button class="btn sm" disabled><i class="fas fa-check"></i></button>'
              : `<button class="btn sm accent perk-buy-btn" data-perk="${p.id}" ${!canAfford ? 'disabled title="Not enough XP"' : ''}><i class="fas fa-shopping-cart"></i> Buy</button>`
            }
          </div>
        </div>`;
    };

    const html = `
      <div class="modal-head">
        <h3><i class="fas fa-store" style="color:var(--accent-color);margin-right:8px;"></i>XP Shop</h3>
        <button data-close="xpShopModal" class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="xp-shop-balance">
        <div class="xp-balance-left">
          <div class="xp-balance-amount"><i class="fas fa-star" style="color:#f1c40f"></i> ${totalXP} XP</div>
          <div class="xp-balance-level">Level ${level}</div>
        </div>
        <div class="xp-balance-right">
          <div class="xp-balance-achievements">${achData.earnedCount}/${achData.totalCount} achievements &bull; ${achXP} XP earned</div>
        </div>
      </div>
      <div class="xp-shop-tabs">
        <button class="xp-shop-tab active" data-shop-tab="shop"><i class="fas fa-shopping-bag"></i> Perks</button>
        <button class="xp-shop-tab" data-shop-tab="achievements"><i class="fas fa-trophy"></i> Achievements</button>
      </div>
      <div class="modal-body xp-shop-body">
        <div class="xp-shop-panel active" data-panel="shop">
          ${perks.length > 0 ? (() => {
            const cats = { cosmetic: { label: 'Cosmetic', icon: 'fa-palette', items: [] }, utility: { label: 'Utility', icon: 'fa-wrench', items: [] }, boost: { label: 'Boosts', icon: 'fa-bolt', items: [] } };
            perks.forEach(p => { (cats[p.category] || cats.cosmetic).items.push(p); });
            return Object.values(cats).filter(c => c.items.length > 0).map(c =>
              `<div class="perk-category">
                <h4 class="perk-category-title"><i class="fas ${c.icon}"></i> ${c.label}</h4>
                <div class="perks-grid">${c.items.map(renderPerkCard).join('')}</div>
              </div>`
            ).join('');
          })() : '<div class="empty-state"><i class="fas fa-store"></i><p>No perks available</p></div>'}
        </div>
        <div class="xp-shop-panel" data-panel="achievements">
          <div class="achievements-summary">
            <div class="achievements-progress-ring">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="var(--border-color)" stroke-width="5"/>
                <circle cx="40" cy="40" r="35" fill="none" stroke="#f1c40f" stroke-width="5"
                  stroke-dasharray="${2 * Math.PI * 35}" stroke-dashoffset="${2 * Math.PI * 35 * (1 - pct / 100)}"
                  stroke-linecap="round" transform="rotate(-90 40 40)" style="transition:stroke-dashoffset 0.8s ease"/>
              </svg>
              <span class="achievements-pct">${pct}%</span>
            </div>
            <div class="achievements-summary-text">
              <div class="achievements-summary-title">${achData.earnedCount} / ${achData.totalCount} Achievements</div>
              <div class="achievements-summary-sub">${achXP} XP earned from achievements</div>
            </div>
          </div>
          ${(() => {
            const catMeta = {
              messages: { label: 'Messages', icon: 'fa-comment' },
              social: { label: 'Social', icon: 'fa-users' },
              content: { label: 'Content', icon: 'fa-folder-open' },
              milestones: { label: 'Milestones', icon: 'fa-flag' },
              leveling: { label: 'Leveling', icon: 'fa-chart-line' }
            };
            const catOrder = ['messages', 'social', 'content', 'milestones', 'leveling'];
            const grouped = {};
            all.forEach(a => {
              const cat = a.category || 'other';
              if (!grouped[cat]) grouped[cat] = [];
              grouped[cat].push(a);
            });
            return catOrder.filter(c => grouped[c] && grouped[c].length > 0).map(cat => {
              const items = grouped[cat];
              const meta = catMeta[cat] || { label: cat, icon: 'fa-star' };
              const catEarned = items.filter(a => a.earned).length;
              return `<div class="achievements-section">
                <h4 class="achievements-section-title">
                  <i class="fas ${meta.icon}" style="color:var(--accent)"></i> ${meta.label}
                  <span class="achievements-section-count">${catEarned}/${items.length}</span>
                </h4>
                <div class="achievements-grid">${items.map(renderAchCard).join('')}</div>
              </div>`;
            }).join('');
          })()}
        </div>
      </div>`;

    let modal = document.getElementById('xpShopModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'xpShopModal';
      modal.className = 'modal-overlay';
      modal.style.display = 'none';
      modal.innerHTML = '<div class="modal-dialog lg"></div>';
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal('xpShopModal');
      });
    }
    modal.querySelector('.modal-dialog').innerHTML = html;
    this.openModal('xpShopModal');

    // Close button
    modal.querySelector('[data-close]')?.addEventListener('click', () => this.closeModal('xpShopModal'));

    // Tab switching
    modal.querySelectorAll('.xp-shop-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        modal.querySelectorAll('.xp-shop-tab').forEach(t => t.classList.remove('active'));
        modal.querySelectorAll('.xp-shop-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        modal.querySelector(`.xp-shop-panel[data-panel="${tab.dataset.shopTab}"]`)?.classList.add('active');
      });
    });

    // Buy buttons
    modal.querySelectorAll('.perk-buy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const perkId = btn.dataset.perk;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        this.socket.emit('buyPerk', { perkId });
      });
    });
  }

  loadMediaGallery() {
    const msgs = this.messageHistory[this.currentRoom] || [];
    const images = msgs.filter(m => m.file?.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(m.file.url || m.file.name || ''));
    const isVoiceFile = (m) => { const n = (m.file?.name || ''); return n.startsWith('voice') || n.includes('voice-message'); };
    const videos = msgs.filter(m => m.file?.url && /\.(mp4|webm|mov)$/i.test(m.file.url || m.file.name || '') && !isVoiceFile(m));
    const voiceMessages = msgs.filter(m => m.file?.url && isVoiceFile(m));
    const files = msgs.filter(m => m.file?.url && !/\.(jpg|jpeg|png|gif|webp|mp4|webm|mov)$/i.test(m.file.url || m.file.name || '') && !isVoiceFile(m));
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    if (images.length === 0 && videos.length === 0 && voiceMessages.length === 0 && files.length === 0) {
      galleryGrid.innerHTML = '<div class="empty-state"><i class="fas fa-images"></i><p>No media or files shared yet</p></div>';
      return;
    }
    let html = '';
    if (images.length > 0) {
      html += `<h4 style="grid-column:1/-1;margin:8px 0 4px;color:var(--text-secondary);font-size:13px;"><i class="fas fa-image"></i> Images (${images.length})</h4>`;
      html += images.map(m => `
        <div class="gallery-item">
          <img src="${this.escapeHTML(m.file.url)}" loading="lazy" alt="" onclick="app.openImageViewer('${this.escapeHTML(m.file.url)}')">
          <div class="gallery-info">${this.escapeHTML(m.username)}</div>
          <a class="gallery-save-btn" href="${this.escapeHTML(m.file.url)}" download="${this.escapeHTML(m.file.name || 'image')}" title="Save" onclick="event.stopPropagation();"><i class="fas fa-download"></i></a>
        </div>
      `).join('');
    }
    if (videos.length > 0) {
      html += `<h4 style="grid-column:1/-1;margin:8px 0 4px;color:var(--text-secondary);font-size:13px;"><i class="fas fa-video"></i> Videos (${videos.length})</h4>`;
      html += videos.map(m => `
        <div class="gallery-item gallery-video">
          <video src="${this.escapeHTML(m.file.url)}" preload="metadata"></video>
          <div class="gallery-play-icon"><i class="fas fa-play"></i></div>
          <div class="gallery-info">${this.escapeHTML(m.username)}</div>
          <a class="gallery-save-btn" href="${this.escapeHTML(m.file.url)}" download="${this.escapeHTML(m.file.name || 'video')}" title="Save" onclick="event.stopPropagation();"><i class="fas fa-download"></i></a>
        </div>
      `).join('');
    }
    if (voiceMessages.length > 0) {
      html += `<h4 style="grid-column:1/-1;margin:8px 0 4px;color:var(--text-secondary);font-size:13px;"><i class="fas fa-microphone"></i> Voice Messages (${voiceMessages.length})</h4>`;
      html += voiceMessages.map(m => `
        <div class="gallery-file-item">
          <i class="fas fa-microphone gallery-file-icon" style="color:var(--accent-color)"></i>
          <div class="gallery-file-info">
            <span class="gallery-file-name">${this.escapeHTML(m.file.name || 'Voice Message')}</span>
            <span class="gallery-file-meta">${this.escapeHTML(m.username)}</span>
          </div>
          <audio src="${this.escapeHTML(m.file.url)}" controls preload="metadata" style="height:32px;max-width:180px;"></audio>
          <a class="gallery-save-btn file" href="${this.escapeHTML(m.file.url)}" download="${this.escapeHTML(m.file.name || 'voice')}" title="Download" onclick="event.stopPropagation();"><i class="fas fa-download"></i></a>
        </div>
      `).join('');
    }
    if (files.length > 0) {
      html += `<h4 style="grid-column:1/-1;margin:8px 0 4px;color:var(--text-secondary);font-size:13px;"><i class="fas fa-file"></i> Files (${files.length})</h4>`;
      html += files.map(m => `
        <div class="gallery-file-item">
          <i class="fas fa-file gallery-file-icon"></i>
          <div class="gallery-file-info">
            <span class="gallery-file-name">${this.escapeHTML(m.file.name || 'file')}</span>
            <span class="gallery-file-meta">${this.escapeHTML(m.username)}</span>
          </div>
          <a class="gallery-save-btn file" href="${this.escapeHTML(m.file.url)}" download="${this.escapeHTML(m.file.name || 'file')}" title="Download" onclick="event.stopPropagation();"><i class="fas fa-download"></i></a>
        </div>
      `).join('');
    }
    galleryGrid.innerHTML = html;
  }

  loadChatStats() {
    // Request stats from server to get accurate data
    this._openSponsoredAd('https://omg10.com/4/11061840');
    this.socket.emit('getChatStats', { room: this.currentRoom });
    // Also set up a handler in case the server sends the response
    const container = document.getElementById('statsContent');
    if (container) container.innerHTML = '<div class="empty-state"><i class="fas fa-spinner fa-spin"></i><p>Loading stats...</p></div>';
    // Fall back to local stats after a timeout, in case server doesn't support getChatStats
    this._chatStatsTimeout = setTimeout(() => {
      this._renderLocalChatStats();
    }, 2000);
  }

  _renderLocalChatStats() {
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

  // Handle getChatStats response from server
  _handleServerChatStats(data) {
    if (this._chatStatsTimeout) clearTimeout(this._chatStatsTimeout);
    this.renderChatStatsV5(data);
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

  /* ═══════════════════════ BUG REPORTS ═══════════════════════ */
  submitBugReport() {
    const title = document.getElementById('bugReportTitle')?.value?.trim();
    const category = document.getElementById('bugReportCategory')?.value || 'other';
    const description = document.getElementById('bugReportDescription')?.value?.trim();
    if (!title) { this.toast('Please enter a title', 'error'); return; }
    if (!description) { this.toast('Please describe the bug', 'error'); return; }
    this.socket.emit('submitBugReport', { title, category, description });
    // Clear form
    if (document.getElementById('bugReportTitle')) document.getElementById('bugReportTitle').value = '';
    if (document.getElementById('bugReportDescription')) document.getElementById('bugReportDescription').value = '';
    this.closeModal('bugReportModal');
    const hasPriority = (this.userPerks || []).includes('priority_support');
    this.toast(hasPriority ? '⚡ Priority bug report submitted! Thank you.' : 'Bug report submitted! Thank you.', 'success');
  }

  renderAdminBugReports(data) {
    const list = document.getElementById('bugReportsList');
    if (!list) return;
    const allReports = data.reports || data || [];
    this._allBugReports = allReports;
    const filter = this._bugReportFilter || 'open';
    const reports = filter === 'all' ? allReports : allReports.filter(r => (r.status || 'open') === filter);
    // Update badge
    const badge = document.getElementById('bugReportsCountBadge');
    const openCount = allReports.filter(r => (r.status || 'open') === 'open').length;
    if (badge) { badge.textContent = openCount; badge.style.display = openCount > 0 ? 'inline-flex' : 'none'; }
    if (reports.length === 0) {
      list.innerHTML = `<div class="empty-state"><i class="fas fa-bug"></i><p>No ${filter === 'all' ? '' : filter + ' '}bug reports</p></div>`;
      return;
    }
    list.innerHTML = reports.map(r => {
      const statusClass = r.status === 'resolved' ? 'resolved' : 'pending';
      return `
      <div class="admin-report-item ${statusClass}" data-id="${r.id}">
        <div class="report-header">
          <strong>${this.escapeHTML(r.title || '')}</strong>
          ${r.priority ? '<span class="report-priority" style="background:#e74c3c;color:#fff;padding:2px 8px;border-radius:8px;font-size:0.75rem;margin-left:6px;">⚡ PRIORITY</span>' : ''}
          <span class="report-status">${this.escapeHTML(r.status || 'open')}</span>
          <span class="report-time">${r.timestamp ? new Date(r.timestamp).toLocaleString() : ''}</span>
        </div>
        <div class="report-reason"><strong>Category:</strong> ${this.escapeHTML(r.category || 'other')} | <strong>By:</strong> ${this.escapeHTML(r.reporter || '')}</div>
        <div class="report-details">${this.escapeHTML(r.description || '')}</div>
        <div class="report-actions">
          ${r.status !== 'resolved' ? `<button class="btn small primary" onclick="app.socket.emit('adminResolveBugReport', { id: '${r.id}' }); this.closest('.admin-report-item').classList.add('resolved'); this.remove();">Resolve</button>` : ''}
          <button class="btn small danger" onclick="if(confirm('Delete this bug report?')) { app.socket.emit('adminDeleteBugReport', { id: '${r.id}' }); this.closest('.admin-report-item').remove(); }">Delete</button>
        </div>
      </div>`;
    }).join('');
  }

  renderAdminEvents(data) {
    const list = document.getElementById('adminEventsList');
    if (!list) return;
    const events = data.events || [];
    if (events.length === 0) {
      list.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-alt"></i><p>No events</p></div>';
      return;
    }
    const now = Date.now();
    list.innerHTML = events.map(ev => {
      const isPast = ev.startTime < now;
      const isCancelled = ev.cancelled;
      const statusLabel = isCancelled ? 'Cancelled' : isPast ? 'Past' : 'Upcoming';
      const statusClass = isCancelled ? 'danger' : isPast ? 'resolved' : 'pending';
      const startDate = new Date(ev.startTime).toLocaleString();
      return `
      <div class="admin-report-item ${statusClass}" data-id="${ev.id}">
        <div class="report-header">
          <strong>${this.escapeHTML(ev.title)}</strong>
          <span class="report-status">${statusLabel}</span>
          <span class="report-time">${startDate}</span>
        </div>
        <div class="report-reason"><strong>Room:</strong> ${this.escapeHTML(ev.room)} | <strong>Creator:</strong> ${this.escapeHTML(ev.creator)} | <strong>Attendees:</strong> ${(ev.attendees || []).length} | <strong>Interested:</strong> ${(ev.interested || []).length}</div>
        ${ev.description ? `<div class="report-details">${this.escapeHTML(ev.description)}</div>` : ''}
        <div class="report-actions">
          ${!isCancelled ? `<button class="btn small danger" onclick="if(confirm('Cancel this event?')){app.socket.emit('adminCancelEvent',{eventId:'${ev.id}'});}">Cancel</button>` : ''}
          <button class="btn small danger" onclick="if(confirm('Delete this event permanently?')){app.socket.emit('adminDeleteEvent',{eventId:'${ev.id}'});}">Delete</button>
        </div>
      </div>`;
    }).join('');
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
      case 'events': this.socket.emit('adminGetEvents'); break;
      case 'bugReports': this.socket.emit('adminGetBugReports'); break;
      case 'threads': this.socket.emit('adminGetThreads'); break;
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
    set('statTotalThreads',  data.threads ?? 0);
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
    // Cache full list so search box can re-filter without a server round-trip
    this._adminAllUsers = users;
    // Clear any active search filter when the list is (re)loaded
    const searchInput = document.getElementById('adminUserSearch');
    if (searchInput) searchInput.value = '';
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
          <button class="btn small" onclick="if(confirm('Reset all XP for ${this.escapeHTML(u.username)}?')) app.socket.emit('adminResetXP', { username: '${this.escapeHTML(u.username)}' })" title="Reset XP" style="color:var(--warning);">
            <i class="fas fa-arrow-rotate-left"></i>
          </button>
          <button class="btn small danger" onclick="if(confirm('Ban ${this.escapeHTML(u.username)}?')) app.socket.emit('adminBan', { username: '${this.escapeHTML(u.username)}', reason: prompt('Reason:') || 'No reason' })">
            <i class="fas fa-ban"></i>
          </button>
          <button class="btn small danger" onclick="if(confirm('Permanently DELETE the account ${this.escapeHTML(u.username)}? This cannot be undone!')) app.socket.emit('adminDeleteAccount', { username: '${this.escapeHTML(u.username)}' })" title="Delete Account">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  renderAdminRooms(data) {
    const list = document.getElementById('adminRoomsList');
    if (!list) return;
    const rooms = data.rooms || data || [];
    this._adminAllRooms = rooms;
    const searchInput = document.getElementById('adminRoomSearch');
    if (searchInput) searchInput.value = '';
    this._renderAdminRoomItems(rooms);
  }

  _renderAdminRoomItems(rooms) {
    const list = document.getElementById('adminRoomsList');
    if (!list) return;
    list.innerHTML = rooms.map(r => {
      const name = typeof r === 'string' ? r : r.name;
      const id = typeof r === 'object' ? (r.id || r.name) : r;
      const type = typeof r === 'object' ? (r.type || '') : '';
      const creator = typeof r === 'object' && r.creator ? r.creator : '';
      return `<div class="admin-room-item">
        <i class="fas fa-hashtag"></i>
        <div class="admin-room-info">
          <span>${this.escapeHTML(name)}</span>
          <span class="admin-room-meta">${type === 'default' ? 'Default' : ''}${creator ? ' by ' + this.escapeHTML(creator) : ''}${typeof r === 'object' && r.members ? ' • ' + r.members + ' members' : ''}</span>
        </div>
        ${type !== 'default' ? `<button class="btn small danger" onclick="if(confirm('Delete ${this.escapeHTML(name)}?')) app.socket.emit('adminDeleteRoom', { room: '${this.escapeHTML(id)}', roomId: '${this.escapeHTML(id)}' })">
          <i class="fas fa-trash"></i>
        </button>` : ''}
      </div>`;
    }).join('');
  }

  renderAdminThreads(data) {
    const list = document.getElementById('adminThreadsList');
    if (!list) return;
    const threads = data.threads || data || [];
    this._adminAllThreads = threads;
    const searchInput = document.getElementById('adminThreadSearch');
    if (searchInput) searchInput.value = '';
    this._renderAdminThreadItems(threads);
  }

  _renderAdminThreadItems(threads) {
    const list = document.getElementById('adminThreadsList');
    if (!list) return;
    if (!threads.length) {
      list.innerHTML = '<div class="empty-state"><i class="fas fa-layer-group"></i><p>No threads</p></div>';
      return;
    }
    list.innerHTML = threads.map(t => `
      <div class="admin-room-item">
        <i class="fas fa-layer-group"></i>
        <div class="admin-room-info">
          <span>${this.escapeHTML(t.title || 'Untitled')}</span>
          <span class="admin-room-meta">in #${this.escapeHTML(t.room || '')} • by ${this.escapeHTML(t.creator || '')} • ${t.messageCount || 0} msgs${t.pinned ? ' • 📌 Pinned' : ''}${t.locked ? ' • 🔒 Locked' : ''}</span>
        </div>
        <button class="btn small danger" onclick="if(confirm('Delete this thread?')) app.socket.emit('adminDeleteThread', { threadId: '${this.escapeHTML(t.id)}' })">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');
  }

  renderAdminReports(data) {
    const list = document.getElementById('adminReportsList');
    if (!list) return;
    const allReports = data.reports || data || [];
    this._allReports = allReports;
    const filter = this._reportFilter || 'pending';
    const reports = filter === 'all' ? allReports : allReports.filter(r => (r.status || 'pending') === filter);
    if (reports.length === 0) {
      list.innerHTML = `<div class="empty-state"><i class="fas fa-shield-alt"></i><p>No ${filter === 'all' ? '' : filter + ' '}reports</p></div>`;
      return;
    }
    list.innerHTML = reports.map(r => {
      const reported = r.reportedUser || r.reported || '';
      const statusClass = r.status === 'resolved' ? 'resolved' : (r.status === 'pending' ? 'pending' : '');
      return `
      <div class="admin-report-item ${statusClass}" data-id="${r.id}">
        <div class="report-header">
          <strong>${this.escapeHTML(r.reporter || '')}</strong> reported <strong>${this.escapeHTML(reported)}</strong>
          <span class="report-status">${this.escapeHTML(r.status || 'pending')}</span>
          <span class="report-time">${r.timestamp ? new Date(r.timestamp).toLocaleString() : ''}</span>
        </div>
        <div class="report-reason">${this.escapeHTML(r.reason || '')}</div>
        ${r.details ? `<div class="report-details">${this.escapeHTML(r.details)}</div>` : ''}
        ${r.contextMessages && r.contextMessages.length > 0 ? `
        <div class="report-context">
          <div class="report-context-header"><i class="fas fa-comments"></i> Message Context</div>
          ${r.contextMessages.map(cm => `
            <div class="report-context-msg ${cm.isReported ? 'reported' : ''}">
              <span class="report-context-user">${this.escapeHTML(cm.username || '')}</span>
              <span class="report-context-text">${this.escapeHTML(cm.message || '')}</span>
              <span class="report-context-time">${cm.timestamp ? new Date(cm.timestamp).toLocaleTimeString() : ''}</span>
            </div>
          `).join('')}
        </div>` : ''}
        <div class="report-actions">
          ${r.status !== 'resolved' ? `<button class="btn small primary" onclick="app.socket.emit('adminResolveReport', { id: '${r.id}', reportId: '${r.id}' }); this.closest('.admin-report-item').remove();">Resolve</button>` : ''}
          <button class="btn small danger" onclick="if(confirm('Ban ${this.escapeHTML(reported)}?')) app.socket.emit('adminBan', { username: '${this.escapeHTML(reported)}', reason: '${this.escapeHTML(r.reason)}' })">Ban User</button>
          ${r.status !== 'resolved' ? `<button class="btn small" style="background:var(--accent);color:#fff;" onclick="app.aiAnalyzeReport('${r.id}', this)"><i class="fas fa-robot"></i> AI Analyze</button>` : ''}
        </div>
        <div class="ai-analysis-container" id="aiAnalysis_${r.id}"></div>
      </div>`;
    }).join('');
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

  aiAnalyzeReport(reportId, btn) {
    if (!reportId) return;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    }
    this.socket.emit('aiAnalyzeReport', { reportId });
  }

  handleAIReportAnalysis(data) {
    const container = document.getElementById('aiAnalysis_' + data.reportId);
    if (container) {
      container.innerHTML = `
        <div class="ai-analysis-box">
          <div class="ai-analysis-header"><i class="fas fa-robot"></i> AI Analysis</div>
          <div>${this.escapeHTML(data.analysis || 'No analysis available').replace(/\n/g, '<br>')}</div>
        </div>
      `;
    }
    // Reset the analyze button
    const btn = container?.closest('.admin-report-item')?.querySelector('.btn[onclick*="aiAnalyzeReport"]');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-robot"></i> AI Analyze';
    }
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
    const max = (this.userPerks || []).includes('longer_messages') ? 4000 : 2000;
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
      if (e.key === 'Tab' || (e.key === 'Enter' && (this._autocompleteType === 'mention' || this._autocompleteType === 'room'))) {
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
    // Typing indicator — REMOVED
    // if (!this.isTyping && this.socket) { ... }
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
    // Emit typing indicator
    if (input.value.length > 0) {
      if (!this._typingEmitted) {
        this._typingEmitted = true;
        if (this.isDM) {
          this.socket.emit('dmTyping', { to: this.currentDM });
        } else {
          this.socket.emit('typing', { room: this.currentRoom });
        }
      }
      clearTimeout(this._typingTimeout);
      this._typingTimeout = setTimeout(() => {
        this._typingEmitted = false;
        if (this.isDM) {
          this.socket.emit('dmStopTyping', { to: this.currentDM });
        } else {
          this.socket.emit('stopTyping', { room: this.currentRoom });
        }
      }, 3000);
    } else {
      if (this._typingEmitted) {
        this._typingEmitted = false;
        clearTimeout(this._typingTimeout);
        if (this.isDM) {
          this.socket.emit('dmStopTyping', { to: this.currentDM });
        } else {
          this.socket.emit('stopTyping', { room: this.currentRoom });
        }
      }
    }
    // Slash command & @mention & #room autocomplete
    if (input.value.startsWith('/')) {
      this.showCommandSuggestions(input.value);
      this.updateCommandPreviewBar(input.value);
    } else {
      this.hideCommandPreviewBar();
      const cursorPos = input.selectionStart;
      const beforeCursor = input.value.substring(0, cursorPos);
      const atMatch = beforeCursor.match(/@(\w*)$/);
      const hashMatch = beforeCursor.match(/#\[([^\]]*)$/) || beforeCursor.match(/#([\w-]*)$/);
      if (atMatch) {
        this.showMentionSuggestions(atMatch[1]);
      } else if (hashMatch) {
        this.showRoomSuggestions(hashMatch[1]);
      } else {
        this.hideChatAutocomplete();
      }
    }
  }

  updateTypingIndicator() {
    const bar = document.getElementById('activityBar');
    const text = document.getElementById('activityBarText');
    if (!bar || !text) return;
    if (!this._typingUsers) this._typingUsers = {};
    // Clean stale entries (5s timeout)
    const now = Date.now();
    for (const u in this._typingUsers) {
      if (now - this._typingUsers[u].time > 5000) delete this._typingUsers[u];
    }
    const names = Object.keys(this._typingUsers);
    if (names.length === 0) {
      bar.style.display = 'none';
      return;
    }
    let label;
    if (names.length === 1) {
      const style = this._typingUsers[names[0]].style;
      const dots = style === 'wave' ? '〰️' : style === 'bounce' ? '⚡' : style === 'pulse' ? '💫' : '...';
      label = `<strong>${this.escapeHTML(names[0])}</strong> is typing${dots}`;
    } else if (names.length <= 3) {
      label = names.map(n => `<strong>${this.escapeHTML(n)}</strong>`).join(', ') + ' are typing...';
    } else {
      label = `<strong>${names.length}</strong> people are typing...`;
    }
    text.innerHTML = label;
    bar.style.display = '';
  }

  updateDMTypingIndicator() {
    const bar = document.getElementById('activityBar');
    const text = document.getElementById('activityBarText');
    if (!bar || !text || !this.isDM) return;
    if (!this._dmTypingUsers) this._dmTypingUsers = {};
    const now = Date.now();
    for (const u in this._dmTypingUsers) {
      if (now - this._dmTypingUsers[u].time > 5000) delete this._dmTypingUsers[u];
    }
    const names = Object.keys(this._dmTypingUsers).filter(n => n === this.currentDM);
    if (names.length === 0) {
      bar.style.display = 'none';
      return;
    }
    const style = this._dmTypingUsers[names[0]]?.style;
    const dots = style === 'wave' ? '〰️' : style === 'bounce' ? '⚡' : style === 'pulse' ? '💫' : '...';
    text.innerHTML = `<strong>${this.escapeHTML(names[0])}</strong> is typing${dots}`;
    bar.style.display = '';
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
      // Use supported mime type — mobile may not support audio/webm
      const mimeType = MediaRecorder.isTypeSupported?.('audio/webm') ? 'audio/webm'
        : MediaRecorder.isTypeSupported?.('audio/mp4') ? 'audio/mp4'
        : MediaRecorder.isTypeSupported?.('audio/ogg') ? 'audio/ogg' : '';
      this.mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      this._voiceMimeType = this.mediaRecorder.mimeType || 'audio/webm';
      this.recordedChunks = [];
      this._recordingStream = stream;
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.recordedChunks.push(e.data);
      };
      this.mediaRecorder.onstop = () => {
        const mime = this._voiceMimeType || 'audio/webm';
        const ext = mime.includes('mp4') ? 'mp4' : mime.includes('ogg') ? 'ogg' : 'webm';
        const blob = new Blob(this.recordedChunks, { type: mime });
        const file = new File([blob], `voice-${Date.now()}.${ext}`, { type: mime });
        if (!this._recordingCancelled) this.sendVoiceMessage(file);
        this._recordingCancelled = false;
        stream.getTracks().forEach(t => t.stop());
      };
      this.mediaRecorder.start();
      this.isRecording = true;
      this.dom.voiceBtn?.classList.add('recording');
      this.showRecordingPopup(stream);
    } catch (e) {
      this.toast('Microphone access denied', 'error');
    }
  }

  showRecordingPopup(stream) {
    // Remove existing popup if any
    document.getElementById('voiceRecordModal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'voiceRecordModal';
    modal.className = 'modal-backdrop active';
    modal.innerHTML = `
      <div class="voice-record-dialog">
        <div class="voice-record-header">
          <div class="voice-record-pulse"></div>
          <span>Recording</span>
        </div>
        <canvas id="voiceWaveformCanvas" width="360" height="64"></canvas>
        <div id="voiceRecordTimer" class="voice-record-timer">0:00</div>
        <div class="voice-record-actions">
          <button id="voiceCancelBtn" class="voice-record-btn cancel"><i class="fas fa-trash"></i> Discard</button>
          <button id="voiceSendBtn" class="voice-record-btn send"><i class="fas fa-paper-plane"></i> Send</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Timer
    const timerEl = document.getElementById('voiceRecordTimer');
    const startTime = Date.now();
    this._recordingTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      if (timerEl) timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }, 200);

    // Waveform visualization
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      const canvas = document.getElementById('voiceWaveformCanvas');
      const ctx = canvas?.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      this._recordingAudioCtx = audioCtx;

      const drawWaveform = () => {
        if (!this.isRecording || !document.getElementById('voiceRecordModal')) {
          audioCtx.close();
          return;
        }
        requestAnimationFrame(drawWaveform);
        analyser.getByteFrequencyData(dataArray);
        if (!ctx) return;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary')?.trim() || '#1e1f22';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.85;
          const hue = 0;
          const lightness = 45 + (dataArray[i] / 255) * 20;
          ctx.fillStyle = `hsl(${hue}, 85%, ${lightness}%)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
          x += barWidth;
        }
      };
      drawWaveform();
    } catch (e) { /* waveform visualization not critical */ }

    // Button handlers
    document.getElementById('voiceCancelBtn')?.addEventListener('click', () => {
      this._recordingCancelled = true;
      this.stopRecording();
      this.closeRecordingPopup();
      this.toast('Recording cancelled', 'info');
    });
    document.getElementById('voiceSendBtn')?.addEventListener('click', () => {
      this._recordingCancelled = false;
      this.stopRecording();
      this.closeRecordingPopup();
    });
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this._recordingCancelled = true;
        this.stopRecording();
        this.closeRecordingPopup();
      }
    });
  }

  closeRecordingPopup() {
    clearInterval(this._recordingTimerInterval);
    this._recordingAudioCtx?.close().catch(() => {});
    document.getElementById('voiceRecordModal')?.remove();
  }

  // stopRecording defined in V5 section below

  handleAddFriend() {
    const input = document.getElementById('friendUsernameInput');
    const username = input?.value?.trim();
    if (!username) { this.toast('Enter a username', 'error'); return; }
    this.socket.emit('friendRequest', { to: username });
    // optimistic update
    if (!this.friendRequests.sent) this.friendRequests.sent = [];
    if (!this.friendRequests.sent.includes(username)) {
      this.friendRequests.sent.push(username);
      this.renderFriends();
    }
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
    const room = (this.currentRoom || 'general').toString().toLowerCase();
    const allowMultiple = document.getElementById('pollMultipleToggle')?.checked || false;
    const anonymous = document.getElementById('pollAnonymousToggle')?.checked || false;
    const cooldownMinutes = parseInt(document.getElementById('pollCooldownInput')?.value) || 0;
    this.socket.emit('createPoll', { question, options, room, allowMultiple, anonymous, cooldownMinutes });
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
    const target = this.state?.reportingUser || this.contextMenuTarget || '';
    this.socket.emit('reportUser', {
      reported: target,
      reportedUser: target,
      reason: reason,
      details: details || '',
      room: this.currentRoom,
      messageId: this.state?.reportingMessageId || null
    });
    // Server will emit reportSubmitted/reportSuccess; modal closes via those handlers
  }

  openReportModal(username, messageId) {
    this.state = this.state || {};
    this.state.reportingUser = username;
    this.state.reportingMessageId = messageId || null;
    this.contextMenuTarget = username;
    const nameEl = document.getElementById('reportTargetName');
    if (nameEl) nameEl.textContent = username;
    const desc = document.getElementById('reportDescription');
    if (desc) desc.value = '';
    this.openModal('reportModal');
  }

  openBanModal(username) {
    const nameEl = document.getElementById('banTargetName');
    if (nameEl) nameEl.textContent = username;
    const hidden = document.getElementById('banUsername');
    if (hidden) hidden.value = username;
    const reason = document.getElementById('banReason');
    if (reason) reason.value = '';
    this.openModal('banModal');
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
    const fontSize = Math.max(9, Math.min(13, Math.floor(r * 0.16 - n * 0.3)));
    const textRadius = r * 0.55;
    const maxTextWidth = Math.min(textRadius - 10, Math.max(20, angle * textRadius - 8));
    const truncate = (text, maxW) => {
      if (ctx.measureText(text).width <= maxW) return text;
      let t = text;
      while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1);
      return t + '…';
    };
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
      ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(truncate(options[i], maxTextWidth), textRadius, 0);
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

  showChatCommands() {
    const cmds = this._slashCommands || [
      { cmd: 'help', desc: 'Show available commands', icon: 'fa-circle-question' },
      { cmd: 'ai', desc: 'Ask RedAI a question', icon: 'fa-robot' },
      { cmd: 'ask', desc: 'Ask RedAI a question', icon: 'fa-robot' },
      { cmd: 'image', desc: 'Open the Puter image popup', icon: 'fa-image' },
      { cmd: 'poll', desc: 'Create a poll', icon: 'fa-chart-bar' },
      { cmd: 'roll', desc: 'Roll a random number', icon: 'fa-dice' },
      { cmd: 'flip', desc: 'Flip a coin', icon: 'fa-coins' },
      { cmd: '8ball', desc: 'Ask the magic 8-ball', icon: 'fa-circle-question' },
      { cmd: 'translate', desc: 'Translate text via AI', icon: 'fa-language' },
      { cmd: 'summarize', desc: 'Summarize recent chat', icon: 'fa-compress' },
      { cmd: 'stats', desc: 'Server statistics', icon: 'fa-chart-pie' },
      { cmd: 'shrug', desc: '¯\\_(ツ)_/¯', icon: 'fa-face-smile' },
      { cmd: 'tableflip', desc: '(╯°□°)╯︵ ┻━┻', icon: 'fa-face-angry' },
      { cmd: 'lenny', desc: '( ͡° ͜ʖ ͡°)', icon: 'fa-face-meh' },
      { cmd: 'sparkle', desc: '✨ Wrap text with sparkles', icon: 'fa-star' },
      { cmd: 'me', desc: 'Action message', icon: 'fa-person' },
    ];
    const content = document.getElementById('profileModalBody') || document.querySelector('#profileModal .modal-body');
    if (!content) return;
    content.innerHTML = `
      <div class="profile-banner" style="background: linear-gradient(135deg, var(--accent), var(--accent-hover))">
        <div class="explore-info-icon"><i class="fas fa-terminal"></i></div>
      </div>
      <div class="profile-body">
        <div class="profile-name-section"><h2>Chat Commands</h2><span class="profile-username">Type / in the chat input to use commands</span></div>
        <div class="profile-section">
          <div class="commands-list">
            ${cmds.map(c => `<div class="command-item"><i class="fas ${c.icon}" style="color:var(--accent);width:20px;text-align:center;"></i><strong>/${c.cmd}</strong><span style="color:var(--text-secondary);font-size:13px;">${c.desc}</span></div>`).join('')}
          </div>
        </div>
      </div>
    `;
    this.openModal('profileModal');
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
      { cmd: 'roll',        desc: 'Roll a random number',         icon: 'fa-dice' },
      { cmd: 'flip',        desc: 'Flip a coin',                  icon: 'fa-coins' },
      { cmd: '8ball',       desc: 'Ask the magic 8-ball',         icon: 'fa-circle-question' },
      { cmd: 'shrug',       desc: '¯\\_(ツ)_/¯',               icon: 'fa-face-smile' },
      { cmd: 'tableflip',   desc: '(╯°□°)╯︵ ┻━┻',             icon: 'fa-face-angry' },
      { cmd: 'unflip',      desc: '┬─┬ノ( º _ ºノ)',            icon: 'fa-face-smile' },
      { cmd: 'lenny',       desc: '( ͡° ͜ʖ ͡°)',                 icon: 'fa-face-meh' },
      { cmd: 'sparkle',     desc: '✨ Wrap text with sparkles',  icon: 'fa-star' },
      { cmd: 'me',          desc: 'Action message (*you wave*)',  icon: 'fa-person' },
      { cmd: 'poll',        desc: 'Create a poll',                icon: 'fa-chart-bar' },
      { cmd: 'stats',       desc: 'Server statistics',            icon: 'fa-chart-pie' },
      { cmd: 'help',        desc: 'Show available commands',      icon: 'fa-circle-question' },
      { cmd: 'ai',          desc: 'Ask RedAI a question',         icon: 'fa-robot' },
      { cmd: 'ask',         desc: 'Ask RedAI a question',         icon: 'fa-robot' },
      { cmd: 'summarize',   desc: 'Summarize recent chat',        icon: 'fa-compress' },
      { cmd: 'translate',   desc: 'Translate text via AI',        icon: 'fa-language' },
      { cmd: 'image',       desc: 'Open the Puter image popup',   icon: 'fa-image' },
    ];
    this._slashCommands = slashCommands;
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
        this.updateCommandPreviewBar(input.value);
        input.focus();
      });
    });
  }

  updateCommandPreviewBar(text) {
    const bar = document.getElementById('commandPreviewBar');
    const nameEl = document.getElementById('cmdPreviewName');
    const descEl = document.getElementById('cmdPreviewDesc');
    if (!bar || !nameEl || !descEl) return;
    const cmds = this._slashCommands || [];
    const query = text.slice(1).split(' ')[0].toLowerCase();
    if (!query) { this.hideCommandPreviewBar(); return; }
    const match = cmds.find(c => c.cmd === query);
    if (match) {
      nameEl.textContent = '/' + match.cmd;
      descEl.textContent = '— ' + match.desc;
      bar.style.display = 'flex';
    } else {
      // Partial match: show first matching command
      const partial = cmds.find(c => c.cmd.startsWith(query));
      if (partial) {
        nameEl.textContent = '/' + partial.cmd;
        descEl.textContent = '— ' + partial.desc;
        bar.style.display = 'flex';
      } else {
        this.hideCommandPreviewBar();
      }
    }
  }

  hideCommandPreviewBar() {
    const bar = document.getElementById('commandPreviewBar');
    if (bar) bar.style.display = 'none';
  }

  showMentionSuggestions(query) {
    const dropdown = document.getElementById('chatAutocomplete');
    if (!dropdown) return;
    // Combine all known users: online users, friends, DM partners, and state users
    const onlineList = this.onlineUsers || [];
    const friendsList = Array.isArray(this.friends) ? this.friends : [];
    const dmPartners = Object.keys(this.dmHistory || {});
    const stateUsers = (this.state?.users || []).map(u => u.username || u);
    const allUsersSet = new Set([...onlineList, ...friendsList, ...dmPartners, ...stateUsers]);
    allUsersSet.delete(this.username); // Don't suggest yourself
    // Always include special mentions
    allUsersSet.add('RedAI');
    allUsersSet.add('everyone');
    allUsersSet.add('system');
    const allUsers = Array.from(allUsersSet);
    const q = query.toLowerCase();
    const matches = allUsers
      .filter(u => { const n = u.username || u; return n.toLowerCase().includes(q); })
      .slice(0, 8);
    if (matches.length === 0) { this.hideChatAutocomplete(); return; }
    dropdown.innerHTML = matches.map((u, i) => {
      const name = u.username || u;
      const isBot = name === 'RedAI';
      const isEveryone = name === 'everyone';
      const isSystem = name === 'system';
      const isSpecial = isBot || isEveryone || isSystem;
      const avatar = isSpecial ? null : this.getAvatarUrl(name);
      const specialIcon = isBot ? 'fa-robot' : isEveryone ? 'fa-users' : isSystem ? 'fa-server' : '';
      const specialColor = isBot ? 'var(--accent)' : isEveryone ? '#f1c40f' : isSystem ? '#2ecc71' : '';
      const avatarHTML = isSpecial
        ? `<div style="width:24px;height:24px;border-radius:50%;background:${specialColor};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;color:#fff"><i class="fas ${specialIcon}"></i></div>`
        : `<img class="avatar" src="${avatar}" onerror="this.src='/uploads/default-avatar.png'" style="width:24px;height:24px;border-radius:50%;flex-shrink:0">`;
      const detailText = isBot ? 'AI Assistant' : isEveryone ? 'Notify all users' : isSystem ? 'Server info' : '';
      return `
        <div class="autocomplete-item ${i === 0 ? 'selected' : ''}" data-mention="${this.escapeHTML(name)}">
          ${avatarHTML}
          <span>@${this.escapeHTML(name)}</span>
          ${detailText ? `<span class="autocomplete-detail" style="color:${specialColor}">${detailText}</span>` : ''}
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

  showRoomSuggestions(query) {
    const dropdown = document.getElementById('chatAutocomplete');
    if (!dropdown) return;
    const rooms = this.allRoomsData || [];
    const joinedRooms = [...(this.rooms || []), ...(this.customRooms || []).map(r => typeof r === 'string' ? r : r.name)];
    const allRoomNames = [...new Set([...rooms.map(r => r.name || r), ...joinedRooms])];
    const q = query.toLowerCase();
    const matches = allRoomNames
      .filter(name => name.toLowerCase().includes(q))
      .slice(0, 8);
    if (matches.length === 0) { this.hideChatAutocomplete(); return; }
    dropdown.innerHTML = matches.map((name, i) => {
      const roomData = rooms.find(r => r.name === name);
      const icon = roomData?.icon || 'fa-hashtag';
      return `
        <div class="autocomplete-item ${i === 0 ? 'selected' : ''}" data-room="${this.escapeHTML(name)}">
          <i class="fas ${icon}" style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--accent);flex-shrink:0;font-size:14px"></i>
          <span>#${this.escapeHTML(name)}</span>
        </div>
      `;
    }).join('');
    dropdown.classList.add('active');
    this._autocompleteType = 'room';
    dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('mousedown', (e) => { e.preventDefault(); });
      item.addEventListener('click', () => this.insertRoomMention(item.dataset.room));
    });
  }

  insertRoomMention(roomName) {
    const input = this.dom.messageInput;
    if (!input) return;
    const text = input.value;
    const cursorPos = input.selectionStart;
    const beforeCursor = text.substring(0, cursorPos);
    const afterCursor = text.substring(cursorPos);
    const hashIdx = beforeCursor.lastIndexOf('#');
    if (hashIdx >= 0) {
      const hasSpaces = /\s/.test(roomName);
      const mention = hasSpaces ? `#[${roomName}]` : `#${roomName}`;
      input.value = beforeCursor.substring(0, hashIdx) + mention + ' ' + afterCursor;
      input.selectionStart = input.selectionEnd = hashIdx + mention.length + 1;
    }
    this.hideChatAutocomplete();
    input.focus();
  }

  hideChatAutocomplete() {
    document.getElementById('chatAutocomplete')?.classList.remove('active');
    this._autocompleteType = null;
  }

  /* ═══════════════════════ REDAI MAIN CHAT ═══════════════════════ */

  openRedAIChat() {
    // Save the room we're leaving so commands can be sent there and joining it later works
    if (!this.isRedAI && this.currentRoom) this._preRedAIRoom = this.currentRoom;
    this.isRedAI = true;
    this.isDM = false;
    this.currentDM = null;
    this.currentRoom = null;
    // Update header
    if (this.dom.headerRoomName) this.dom.headerRoomName.textContent = 'RedAI';
    if (this.dom.headerRoomIcon) this.dom.headerRoomIcon.innerHTML = '<i class="fas fa-robot" style="color:#e74c3c"></i>';
    if (this.dom.headerRoomDesc) {
      this.dom.headerRoomDesc.textContent = 'AI Assistant';
      this.dom.headerRoomDesc.style.display = 'block';
    }
    // Hide welcome state, show messages container
    if (this.dom.welcomeState) this.dom.welcomeState.style.display = 'none';
    if (this.dom.messagesContainer) this.dom.messagesContainer.style.display = '';
    // Clear active room highlight
    document.querySelectorAll('.room-item').forEach(item => item.classList.remove('active'));
    // Update input
    if (this.dom.messageInput) {
      this.dom.messageInput.value = '';
      this.dom.messageInput.placeholder = 'Ask RedAI anything...';
      this.dom.messageInput.style.height = 'auto';
    }
    // Clear reply/edit state
    if (this.state) { this.state.replyingTo = null; this.state.editingMessage = null; }
    this.replyingTo = null;
    this.editingMessageId = null;
    this.dom.replyBar?.classList.remove('active');
    this.dom.editBar?.classList.remove('active');
    this._redaiAttachment = null;
    this._updateRedAIAttachmentPreview();
    // Render RedAI chat in main area
    this.renderRedAIMainChat();
    // Mark the RedAI nav item active on mobile (do not call updateMobileNav to avoid recursion)
    this._activeMobileTab = 'redai';
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === 'redai');
    });
    // Focus input
    if (window.innerWidth < 768) this.closeSidebar();
    this.dom.messageInput?.focus();
  }

  renderRedAIMainChat() {
    const container = this.dom.messagesContainer;
    if (!container) return;
    container.innerHTML = '';
    // Add welcome message
    const welcome = document.createElement('div');
    welcome.className = 'redai-main-welcome';
    welcome.innerHTML = `
      ${this._redAIAvatarHTML('redai-main-avatar')}
      <h2>Hi! I'm RedAI</h2>
      <p>Your AI assistant. Ask me anything — coding help, translations, explanations, jokes, and more!</p>
      <div class="redai-main-suggestions">
        <button class="redai-suggestion" onclick="app.sendRedAIChatMessage('Tell me a joke')">🎭 Tell me a joke</button>
        <button class="redai-suggestion" onclick="app.sendRedAIChatMessage('Help me with coding')">💻 Help with coding</button>
        <button class="redai-suggestion" onclick="app.sendRedAIChatMessage('What can you do?')">🤖 What can you do?</button>
        <button class="redai-suggestion" onclick="app.sendRedAIChatMessage('Translate something for me')">🌍 Translate</button>
        <button class="redai-suggestion" onclick="app.sendRedAIChatMessage('/image a neon robot assistant')">🖼️ Generate image</button>
      </div>
    `;
    container.appendChild(welcome);
    // Load saved history and render it
    this._redAIMainLoadToken = (this._redAIMainLoadToken || 0) + 1;
    this._loadRedAIMainHistory(container, this._redAIMainLoadToken);
  }

  _redAIAvatarHTML(extraClass = '') {
    const className = extraClass ? `redai-avatar-badge ${extraClass}` : 'redai-avatar-badge';
    return `
      <div class="${className}">
        <span class="redai-avatar-core"><i class="fas fa-robot"></i></span>
        <span class="redai-avatar-orbit"><i class="fas fa-sparkles"></i></span>
      </div>
    `;
  }

  async _loadRedAIMainHistory(container, loadToken) {
    try {
      const res = await fetch('/api/ai/sidebar/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username })
      });
      const data = await res.json();
      if (loadToken !== this._redAIMainLoadToken) return;
      const messages = this._normalizeRedAIHistory(data.messages || []);
      if (messages.length > 0) {
        // Hide welcome if we have history
        const welcome = container.querySelector('.redai-main-welcome');
        if (welcome) welcome.style.display = 'none';
        messages.forEach(msg => {
          if (msg.role === 'user') {
            this._appendRedAIUserMsg(container, msg.text || msg.rawText || '');
          } else {
            const rawText = msg.rawText || msg.text || '';
            const div = document.createElement('div');
            div.className = 'message redai-chat-msg redai-bot-msg';
            div.dataset.rawText = rawText;
            div.innerHTML = `
              ${this._redAIAvatarHTML('msg-avatar redai-avatar-icon')}
              <div class="msg-content">
                <div class="msg-header">
                  <span class="msg-author bot" style="color:#e74c3c;font-weight:600;">RedAI</span>
                  <span class="msg-badge ai-badge"><i class="fas fa-robot"></i> AI</span>
                  <span class="msg-timestamp">${msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                </div>
                <div class="msg-text">${msg.html || this.formatText(rawText)}</div>
              </div>
            `;
            container.appendChild(div);
          }
        });
        container.scrollTop = container.scrollHeight;
      }
    } catch (e) { /* silent */ }
  }

  _appendRedAIUserMsg(container, text) {
    const div = document.createElement('div');
    div.className = 'message redai-chat-msg';
    div.innerHTML = `
      <img class="msg-avatar" src="${this.getAvatarUrl(this.username)}" alt="${this.escapeHTML(this.username)}">
      <div class="msg-content">
        <div class="msg-header">
          <span class="msg-author">${this.escapeHTML(this.username)}</span>
          <span class="msg-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="msg-text">${this.escapeHTML(text)}</div>
      </div>
    `;
    container.appendChild(div);
  }

  _appendRedAIBotMsg(container, text, isFormatted) {
    const div = document.createElement('div');
    div.className = 'message redai-chat-msg redai-bot-msg';
    div.dataset.rawText = isFormatted ? '' : text;
    div.innerHTML = `
      ${this._redAIAvatarHTML('msg-avatar redai-avatar-icon')}
      <div class="msg-content">
        <div class="msg-header">
          <span class="msg-author bot" style="color:#e74c3c;font-weight:600;">RedAI</span>
          <span class="msg-badge ai-badge"><i class="fas fa-robot"></i> AI</span>
          <span class="msg-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="msg-text">${isFormatted ? text : this.formatText(text)}</div>
      </div>
    `;
    container.appendChild(div);
  }

  _appendRedAIImageMsg(container, prompt, imageElement, options = {}) {
    const div = document.createElement('div');
    const isSidebar = container?.id === 'redaiMessages';
    div.className = isSidebar ? 'redai-msg redai-msg-ai redai-volatile' : 'message redai-chat-msg redai-bot-msg redai-volatile';
    div.dataset.rawText = prompt || '';
    const imageUrl = typeof imageElement === 'string' ? imageElement : (imageElement?.src || '');
    if (isSidebar) {
      div.innerHTML = `
        ${this._redAIAvatarHTML('redai-msg-avatar')}
        <div class="redai-msg-content">
          <div class="redai-generated-image-caption">${this.escapeHTML(options.caption || prompt || 'Generated image')}</div>
          <img class="redai-generated-image" src="${this.escapeHTML(imageUrl)}" alt="${this.escapeHTML(prompt || 'Generated image')}">
        </div>
      `;
    } else {
      div.innerHTML = `
        ${this._redAIAvatarHTML('msg-avatar redai-avatar-icon')}
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-author bot" style="color:#e74c3c;font-weight:600;">RedAI</span>
            <span class="msg-badge ai-badge"><i class="fas fa-wand-magic-sparkles"></i> Image</span>
            <span class="msg-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div class="msg-text">
            <div class="redai-generated-image-caption">${this.escapeHTML(options.caption || prompt || 'Generated image')}</div>
            <img class="redai-generated-image" src="${this.escapeHTML(imageUrl)}" alt="${this.escapeHTML(prompt || 'Generated image')}">
          </div>
        </div>
      `;
    }
    container.appendChild(div);
  }

  _extractPuterChatText(response) {
    if (!response) return '';
    if (typeof response === 'string') return response;
    if (Array.isArray(response)) {
      return response.map(part => part?.text || part?.message?.content || '').join('');
    }
    const message = response.message || response.data?.message || response.response?.message;
    if (typeof message === 'string') return message;
    if (message?.content) {
      if (Array.isArray(message.content)) {
        return message.content.map(part => part?.text || part?.content || '').join('');
      }
      return String(message.content);
    }
    if (response.text) return response.text;
    return '';
  }

  _sanitizeRedAIReply(reply) {
    let text = (reply || '').trim();
    text = text.replace(/\[?\(?(?:ad|sponsored|advertisement|promoted)\)?:?[^\n]*/gi, '').trim();
    text = text.replace(/(?:\n|^)\s*(?:Let me know if|Feel free to ask|Happy to help|Hope (?:this|that) helps?!?)\s*[🤖💡✨😊]*\s*$/gi, '').trim();
    return text;
  }

  _extractRedAIImagePrompt(text) {
    const match = (text || '').match(/^\s*\/(?:image|imagine|draw)\s+([\s\S]+)$/i);
    return match ? match[1].trim() : '';
  }

  _updateRedAIAttachmentPreview() {
    const preview = document.getElementById('redaiAttachmentPreview');
    const attachment = this._redaiAttachment;
    if (!preview) return;
    if (!attachment) {
      preview.style.display = 'none';
      preview.innerHTML = '';
      return;
    }
    const sizeKb = attachment.size ? Math.max(1, Math.round(attachment.size / 1024)) : 0;
    preview.style.display = 'flex';
    preview.innerHTML = `
      <span class="redai-attachment-name"><i class="fas fa-paperclip"></i> ${this.escapeHTML(attachment.name)}</span>
      <span class="redai-attachment-meta">${this.escapeHTML(attachment.type || 'file')}${sizeKb ? ` • ${sizeKb} KB` : ''}</span>
      <button class="redai-attachment-clear" type="button" title="Remove attachment"><i class="fas fa-xmark"></i></button>
    `;
    preview.querySelector('.redai-attachment-clear')?.addEventListener('click', () => {
      this._redaiAttachment = null;
      this._updateRedAIAttachmentPreview();
    });
  }

  async _askPuterRedAI(message, attachment) {
    const puter = window.puter;
    if (!puter?.ai?.chat) throw new Error('Puter AI is unavailable');

    if (attachment && attachment.type && (attachment.type.startsWith('image/') || attachment.type.startsWith('video/'))) {
      const mediaPrompt = message || (attachment.type.startsWith('image/') ? 'Describe this image.' : 'Analyze this video.');
      const response = await puter.ai.chat(mediaPrompt, attachment, false, { model: 'gpt-5.4-nano' });
      return this._extractPuterChatText(response);
    }

    if (attachment) {
      const uploaded = await puter.fs.upload([attachment], 'redai-attachments', { createMissingParents: true, dedupeName: true });
      const uploadedFile = Array.isArray(uploaded) ? uploaded[0] : uploaded;
      try {
        const prompt = message || `Please analyze the attached file ${attachment.name}.`;
        const response = await puter.ai.chat([
          {
            role: 'user',
            content: [
              { type: 'file', puter_path: uploadedFile.path },
              { type: 'text', text: prompt }
            ]
          }
        ], false, { model: 'gpt-5.4-nano' });
        return this._extractPuterChatText(response);
      } finally {
        if (uploadedFile?.path) {
          await puter.fs.delete(uploadedFile.path).catch(() => {});
        }
      }
    }

    const response = await puter.ai.chat(message, { model: 'gpt-5.4-nano' });
    return this._extractPuterChatText(response);
  }

  async _generateRedAIImage(prompt) {
    const puter = window.puter;
    if (!puter?.ai?.txt2img) throw new Error('Puter image generation is unavailable');
    return await puter.ai.txt2img(prompt, true);
  }

  async _openPuterImagePopup(prompt) {
    const imagePrompt = (prompt || '').trim();
    if (!imagePrompt) {
      this.toast('Usage: /image <prompt>', 'warning');
      return false;
    }

    const modal = this.dom.imageModal || document.getElementById('imageModal');
    const image = this.dom.imageModalImg || document.getElementById('imageModalImg');
    if (!modal || !image) return false;

    modal.classList.add('active', 'puter-image-workbench');
    modal.style.display = 'flex';
    image.src = '';
    image.alt = imagePrompt;
    image.style.transform = 'scale(1) rotate(0deg)';

    let status = modal.querySelector('#puterImageStatus');
    if (!status) {
      status = document.createElement('div');
      status.id = 'puterImageStatus';
      status.className = 'puter-image-status';
      modal.insertBefore(status, modal.querySelector('.image-viewer-toolbar') || image);
    }
    status.textContent = 'Generating image...';
    status.style.display = 'flex';

    try {
      const generated = await this._generateRedAIImage(imagePrompt);
      const generatedUrl = typeof generated === 'string' ? generated : (generated?.src || generated?.url || '');
      if (generatedUrl) {
        image.src = generatedUrl;
      }
      status.style.display = 'none';
      return true;
    } catch (err) {
      status.textContent = 'Image generation failed.';
      this.toast(err?.message || 'Image generation failed', 'error');
      return false;
    }
  }

  async sendRedAIChatMessage(text) {
    if (!text || !text.trim()) return;
    const container = this.dom.messagesContainer;
    if (!container) return;
    // Snapshot the RedAI state before async work — if user leaves AI chat during fetch, discard response
    const wasRedAI = this.isRedAI;
    const requestId = ++this._aiRequestSeq;
    const imagePrompt = this._extractRedAIImagePrompt(text);
    if (imagePrompt) {
      await this._openPuterImagePopup(imagePrompt);
      return;
    }
    // Hide welcome
    const welcome = container.querySelector('.redai-main-welcome');
    if (welcome) welcome.style.display = 'none';
    // Add user message
    this._appendRedAIUserMsg(container, text);
    container.scrollTop = container.scrollHeight;
    // Show typing indicator
    this._showAITypingIndicator();
    let reply = '';
    try {
      try {
        this._aiAbortController = new AbortController();
        reply = await this._askPuterRedAI(text, null);
      } catch (puterError) {
        if (requestId !== this._aiRequestSeq || puterError?.name === 'AbortError') return;
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, message: text, context: 'main', userLang: this.currentLang || 'en' }),
          signal: this._aiAbortController?.signal
        });
        const data = await res.json();
        reply = data.reply || data.error || 'No response';
      }
        if (requestId !== this._aiRequestSeq) return;
        this._hideAITypingIndicator();
        if (!this.isRedAI) return;
        reply = this._sanitizeRedAIReply(reply);
        const cmdLines = [];
        reply = reply.replace(/^CMD:\s*(\/.+)$/gm, (match, cmd) => {
          cmdLines.push(cmd.trim());
          return '`' + cmd.trim() + '`';
        });
        let cmdButtonsHTML = '';
        if (cmdLines.length > 0) {
          cmdButtonsHTML = '<div class="redai-cmd-buttons" style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">' +
            cmdLines.map(cmd => `<button class="smart-reply-btn" onclick="app.executeRedAICommand('${cmd.replace(/'/g, "\\'")}')" title="Execute: ${this.escapeHTML(cmd)}"><i class="fas fa-terminal"></i> ${this.escapeHTML(cmd)}</button>`).join('') +
            '</div>';
        }
        if (!this.isRedAI) return;
        await this._streamRedAIBotMsg(container, reply, cmdButtonsHTML);
        if (this.isRedAI && reply.trim().endsWith('?')) {
          this._showAIFollowUpInput(container);
        }
    } catch (err) {
      if (requestId !== this._aiRequestSeq || err?.name === 'AbortError') {
        this._hideAITypingIndicator();
        return;
      }
      this._hideAITypingIndicator();
      if (this.isRedAI) {
        this._appendRedAIBotMsg(container, 'AI is temporarily unavailable. Try again! 🤖');
      }
    }
    if (this.isRedAI) {
      container.scrollTop = container.scrollHeight;
      // Save history
      this._saveRedAIMainHistory(container);
      if (!reply || !reply.trim().endsWith('?')) this.dom.messageInput?.focus();
    }
    this._aiAbortController = null;
  }

  async _streamRedAIBotMsg(container, text, cmdButtonsHTML) {
    // Create the message shell
    const div = document.createElement('div');
    div.className = 'message redai-chat-msg redai-bot-msg';
    div.innerHTML = `
      <div class="msg-avatar redai-avatar-icon"><i class="fas fa-robot"></i></div>
      <div class="msg-content">
        <div class="msg-header">
          <span class="msg-author bot" style="color:#e74c3c;font-weight:600;">RedAI</span>
          <span class="msg-badge ai-badge"><i class="fas fa-robot"></i> AI</span>
          <span class="msg-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="msg-text"></div>
      </div>
    `;
    container.appendChild(div);
    const msgTextEl = div.querySelector('.msg-text');

    // Markdown-heavy replies are better rendered in one pass so the bubble size
    // doesn't jump between the typing animation and the final formatted output.
    if (this._hasStructuredRedAIContent(text)) {
      msgTextEl.innerHTML = this.formatText(text) + (cmdButtonsHTML || '');
      div.dataset.rawText = text;
      container.scrollTop = container.scrollHeight;
      return;
    }

    // Stream words with a typewriter effect
    const words = text.split(/(\s+)/); // keep whitespace tokens
    let accumulated = '';
    const batchSize = 3; // render 3 words at a time for speed
    for (let i = 0; i < words.length; i += batchSize) {
      const batch = words.slice(i, i + batchSize).join('');
      accumulated += batch;
      msgTextEl.innerHTML = `${this.escapeHTML(accumulated)}<span class="ai-cursor">▊</span>`;
      container.scrollTop = container.scrollHeight;
      await new Promise(r => setTimeout(r, 20)); // 20ms per batch
    }
    // Final render with formatting and CMD buttons
    msgTextEl.innerHTML = this.formatText(text) + (cmdButtonsHTML || '');
    // Store raw text for saving history without double-encoding
    div.dataset.rawText = text;
    container.scrollTop = container.scrollHeight;
  }

  _hasStructuredRedAIContent(text) {
    if (!text) return false;
    return /```|^\s*\|.+\|\s*$/m.test(text) || /\n\s*\|.+\|/.test(text) || /\n\s*[-*_]{3,}\s*\n/.test(text);
  }

  _showAIRoomFollowUpInput(msgEl) {
    // Attach a follow-up input bar under an AI message in a room
    const target = msgEl.querySelector('.msg-content') || msgEl;
    target.querySelectorAll('.redai-followup-bar').forEach(el => el.remove());
    // Capture the room at creation time so follow-ups always go to the correct room
    const capturedRoom = this.currentRoom;
    const bar = document.createElement('div');
    bar.className = 'redai-followup-bar';
    bar.innerHTML = `
      <div class="redai-followup-wrap">
        <i class="fas fa-reply redai-followup-icon"></i>
        <input type="text" class="redai-followup-input" placeholder="Reply to RedAI..." autocomplete="off">
        <button class="redai-followup-send" title="Send"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;
    target.appendChild(bar);
    const input = bar.querySelector('.redai-followup-input');
    const sendBtn = bar.querySelector('.redai-followup-send');
    const sendAnswer = () => {
      const text = input.value.trim();
      if (!text) return;
      // Track this message so it renders as a bubble, not a full message
      if (!this._pendingAIFollowUps) this._pendingAIFollowUps = new Set();
      this._pendingAIFollowUps.add('@RedAI ' + text);
      bar.remove();
      // Insert a bubble immediately for responsiveness
      const bubble = document.createElement('div');
      bubble.className = 'ai-followup-bubble';
      bubble.innerHTML = `<span class="ai-followup-bubble-user">${this.escapeHTML(this.username)}:</span> ${this.escapeHTML(text)}`;
      target.appendChild(bubble);
      bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if (capturedRoom) {
        this.socket.emit('chatMessage', { text: '@RedAI ' + text, room: capturedRoom, username: this.username, timestamp: Date.now(), userLang: this.currentLang || 'en' });
      }
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); sendAnswer(); }
      if (e.key === 'Escape') bar.remove();
    });
    sendBtn.addEventListener('click', sendAnswer);
    setTimeout(() => input.focus(), 50);
  }

  _showAIFollowUpInput(container) {
    // Remove any existing follow-up input
    container.querySelectorAll('.redai-followup-bar').forEach(el => el.remove());
    const bar = document.createElement('div');
    bar.className = 'redai-followup-bar';
    bar.innerHTML = `
      <div class="redai-followup-wrap">
        <i class="fas fa-reply redai-followup-icon"></i>
        <input type="text" class="redai-followup-input" placeholder="Type your answer..." autocomplete="off">
        <button class="redai-followup-send" title="Send"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;
    container.appendChild(bar);
    container.scrollTop = container.scrollHeight;
    const input = bar.querySelector('.redai-followup-input');
    const sendBtn = bar.querySelector('.redai-followup-send');
    const sendAnswer = () => {
      const text = input.value.trim();
      if (!text) return;
      bar.remove();
      this.sendRedAIChatMessage(text);
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); sendAnswer(); }
      if (e.key === 'Escape') { bar.remove(); this.dom.messageInput?.focus(); }
    });
    sendBtn.addEventListener('click', sendAnswer);
    setTimeout(() => input.focus(), 50);
  }

  _saveRedAIMainHistory(container) {
    if (!container) return;
    const messages = [];
    let lastSignature = '';
    container.querySelectorAll('.redai-chat-msg').forEach(msg => {
      if (msg.classList.contains('redai-volatile')) return;
      const isUser = !msg.classList.contains('redai-bot-msg');
      const content = msg.querySelector('.msg-text');
      if (content) {
        const rawText = (msg.dataset.rawText || content.textContent || '').trim();
        const signature = `${isUser ? 'user' : 'assistant'}|${rawText}`;
        if (signature === lastSignature) return;
        lastSignature = signature;
        messages.push({
          role: isUser ? 'user' : 'assistant',
          rawText: rawText,
          text: content.textContent,
          html: content.innerHTML,
          timestamp: Date.now()
        });
      }
    });
    fetch('/api/ai/sidebar/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.username, messages })
    }).catch(() => {});
  }

  /* ═══════════════════════ REDAI SIDEBAR CHAT ═══════════════════════ */

  initRedAI() {
    const input = document.getElementById('redaiInput');
    const sendBtn = document.getElementById('redaiSendBtn');
    const clearBtn = document.getElementById('redaiClearBtn');
    const attachBtn = document.getElementById('redaiAttachBtn');
    const imageBtn = document.getElementById('redaiImageBtn');
    const attachmentInput = document.getElementById('redaiAttachmentInput');

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendRedAIMessage();
        }
      });
    }
    if (sendBtn) sendBtn.addEventListener('click', () => this.sendRedAIMessage());
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearRedAIChat());
    if (attachBtn && attachmentInput) {
      attachBtn.addEventListener('click', () => attachmentInput.click());
      attachmentInput.addEventListener('change', () => {
        this._redaiAttachment = attachmentInput.files?.[0] || null;
        this._updateRedAIAttachmentPreview();
      });
    }
    if (imageBtn) {
      imageBtn.addEventListener('click', async () => {
        const current = input?.value.trim() || '';
        const prompt = current || window.prompt('Describe the image RedAI should generate', '');
        if (!prompt) return;
        if (input) input.value = `/image ${prompt}`;
        await this.sendRedAIMessage();
      });
    }
    this._updateRedAIAttachmentPreview();
  }

  sendRedAISuggestion(text) {
    const input = document.getElementById('redaiInput');
    if (input) input.value = text;
    this.sendRedAIMessage();
  }

  async sendRedAIMessage() {
    const input = document.getElementById('redaiInput');
    const container = document.getElementById('redaiMessages');
    if (!input || !container) return;
    const message = input.value.trim();
    const attachment = this._redaiAttachment;
    if (!message && !attachment) return;
    const requestId = ++this._aiRequestSeq;
    const imagePrompt = this._extractRedAIImagePrompt(message);
    if (imagePrompt && !attachment) {
      input.value = '';
      this._redaiAttachment = null;
      this._updateRedAIAttachmentPreview();
      await this._openPuterImagePopup(imagePrompt);
      return;
    }
    input.value = '';
    this._redaiAttachment = null;
    this._updateRedAIAttachmentPreview();

    // Hide welcome if visible
    const welcome = container.querySelector('.redai-welcome');
    if (welcome) welcome.style.display = 'none';

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'redai-msg redai-msg-user';
    userMsg.innerHTML = `<div class="redai-msg-content">${this.escapeHTML(message)}</div>`;
    container.appendChild(userMsg);

    // Add typing indicator with spinner
    const typing = document.createElement('div');
    typing.className = 'redai-msg redai-msg-ai redai-typing';
    typing.innerHTML = `${this._redAIAvatarHTML('redai-msg-avatar')}<div class="redai-msg-content"><div class="ai-typing-dots"><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><span class="ai-typing-label">${this.t('ai.thinking') || 'Thinking...'}</span><button type="button" class="ai-stop-btn redai-stop-btn"><i class="fas fa-stop"></i> Stop thinking</button></div></div>`;
    container.appendChild(typing);
    this._redaiTypingEl = typing;
    typing.querySelector('.redai-stop-btn')?.addEventListener('click', () => this.cancelAIThinking());
    container.scrollTop = container.scrollHeight;

    try {
      if (imagePrompt) {
        const image = await this._generateRedAIImage(imagePrompt);
        if (requestId !== this._aiRequestSeq) return;
        typing.remove();
        if (this._redaiTypingEl === typing) this._redaiTypingEl = null;
        this._appendRedAIImageMsg(container, imagePrompt, image, { caption: 'Generated with Puter' });
      } else {
        let reply = '';
        try {
          this._aiAbortController = new AbortController();
          reply = await this._askPuterRedAI(message, attachment);
        } catch (puterError) {
          if (requestId !== this._aiRequestSeq || puterError?.name === 'AbortError') return;
          const res = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.username, message, context: 'sidebar' }),
            signal: this._aiAbortController?.signal
          });
          const data = await res.json();
          reply = data.reply || data.error || 'No response';
        }
        if (requestId !== this._aiRequestSeq) return;
        typing.remove();
        if (this._redaiTypingEl === typing) this._redaiTypingEl = null;

        // Clean response — strip any ads or promotional content
        reply = this._sanitizeRedAIReply(reply);

        // Extract CMD: lines and convert to clickable command buttons
        const cmdLines = [];
        reply = reply.replace(/^CMD:\s*(\/.+)$/gm, (match, cmd) => {
          cmdLines.push(cmd.trim());
          return '`' + cmd.trim() + '`';
        });

        const aiMsg = document.createElement('div');
        aiMsg.className = 'redai-msg redai-msg-ai';
        let cmdButtonsHTML = '';
        if (cmdLines.length > 0) {
          cmdButtonsHTML = '<div class="redai-cmd-buttons" style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">' +
            cmdLines.map(cmd => `<button class="smart-reply-btn" onclick="app.executeRedAICommand('${cmd.replace(/'/g, "\\'")}')" title="Execute: ${this.escapeHTML(cmd)}"><i class="fas fa-terminal"></i> ${this.escapeHTML(cmd)}</button>`).join('') +
            '</div>';
        }
        aiMsg.innerHTML = `${this._redAIAvatarHTML('redai-msg-avatar')}<div class="redai-msg-content">${this.formatText(reply)}${cmdButtonsHTML}</div>`;
        container.appendChild(aiMsg);
      }
    } catch (err) {
      if (requestId !== this._aiRequestSeq || err?.name === 'AbortError') {
        typing.remove();
        if (this._redaiTypingEl === typing) this._redaiTypingEl = null;
        return;
      }
      typing.remove();
      if (this._redaiTypingEl === typing) this._redaiTypingEl = null;
      const errMsg = document.createElement('div');
      errMsg.className = 'redai-msg redai-msg-ai';
      errMsg.innerHTML = `${this._redAIAvatarHTML('redai-msg-avatar')}<div class="redai-msg-content">${this.t('ai.error') || 'AI is temporarily unavailable. Try again!'} 🤖</div>`;
      container.appendChild(errMsg);
    }

    container.scrollTop = container.scrollHeight;
    input.focus();

    // Save history to server
    this.saveRedAIHistory();
  }

  executeRedAICommand(cmd) {
    if (!cmd || !cmd.startsWith('/')) return;
    // Handle /wheel command — open wheel dialog with pre-filled options
    if (cmd.startsWith('/wheel ')) {
      const options = cmd.replace('/wheel ', '').split('|').map(s => s.trim()).filter(Boolean);
      if (options.length >= 2) {
        this.openModal('wheelModal');
        // Pre-fill wheel options
        setTimeout(() => {
          const container = document.getElementById('wheelOptions');
          if (container) {
            container.innerHTML = '';
            options.forEach(opt => {
              const wrapper = document.createElement('div');
              wrapper.className = 'wheel-opt-row';
              wrapper.innerHTML = `<input type="text" class="wheel-opt-input" value="${this.escapeHTML(opt)}" placeholder="Option"><button class="wheel-opt-del" onclick="this.parentElement.remove()">×</button>`;
              container.appendChild(wrapper);
            });
          }
        }, 100);
        this.toast('Wheel created! Click Spin to start.', 'success');
        return;
      }
    }
    // Send command as a chat message in the current room (or the last room before entering RedAI)
    const targetRoom = this.currentRoom || this._preRedAIRoom;
    if (targetRoom && this.socket) {
      this.socket.emit('chatMessage', {
        room: targetRoom,
        message: cmd,
        text: cmd,
        username: this.username,
        timestamp: Date.now()
      });
      this.toast(`Sent to #${targetRoom}`, 'success');
    } else {
      this.toast('Join a room first to execute commands', 'warning');
    }
  }

  clearRedAIChat() {
    const container = document.getElementById('redaiMessages');
    if (!container) return;
    this._redaiAttachment = null;
    this._updateRedAIAttachmentPreview();
    container.innerHTML = `
      <div class="redai-welcome">
        <div class="redai-avatar"><i class="fas fa-robot"></i></div>
        <h3 data-i18n="redai.welcome_title">Hi! I'm RedAI</h3>
        <p data-i18n="redai.welcome_desc">Your AI assistant. Ask me anything, or @RedAI me in any channel!</p>
        <div class="redai-suggestions">
          <button class="redai-suggestion" onclick="app.sendRedAISuggestion('Tell me a joke')" data-i18n="redai.joke">Tell me a joke</button>
          <button class="redai-suggestion" onclick="app.sendRedAISuggestion('Help me with coding')" data-i18n="redai.coding">Help with coding</button>
          <button class="redai-suggestion" onclick="app.sendRedAISuggestion('What can you do?')" data-i18n="redai.capabilities">What can you do?</button>
          <button class="redai-suggestion" onclick="app.sendRedAISuggestion('Translate something')" data-i18n="redai.translate">Translate</button>
          <button class="redai-suggestion" onclick="app.sendRedAISuggestion('/image a neon robot assistant')">Generate image</button>
        </div>
      </div>`;
    // Re-apply translations
    this.applyLanguage?.();
    // Clear server-side history (both context and saved history)
    fetch('/api/ai/clear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.username })
    }).catch(() => {});
    fetch('/api/ai/sidebar/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.username, messages: [] })
    }).catch(() => {});
    this._redaiHistoryLoaded = false;
    this._redAIMainLoadToken = 0;
    this.toast('RedAI conversation cleared', 'success');
  }

  saveRedAIHistory() {
    const container = document.getElementById('redaiMessages');
    if (!container) return;
    const messages = [];
    container.querySelectorAll('.redai-msg').forEach(msg => {
      if (msg.classList.contains('redai-volatile')) return;
      const isUser = msg.classList.contains('redai-msg-user');
      const content = msg.querySelector('.redai-msg-content');
      if (content) {
        messages.push({
          role: isUser ? 'user' : 'assistant',
          html: content.innerHTML,
          text: content.textContent,
          timestamp: Date.now()
        });
      }
    });
    fetch('/api/ai/sidebar/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.username, messages })
    }).catch(() => {});
  }

  async loadRedAIHistory() {
    if (this._redaiHistoryLoaded) return;
    this._redaiHistoryLoaded = true;
    try {
      const res = await fetch('/api/ai/sidebar/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username })
      });
      const data = await res.json();
      if (data.messages && data.messages.length > 0) {
        const container = document.getElementById('redaiMessages');
        if (!container) return;
        // Hide welcome
        const welcome = container.querySelector('.redai-welcome');
        if (welcome) welcome.style.display = 'none';
        // Only restore if container is empty (just the welcome)
        const existingMsgs = container.querySelectorAll('.redai-msg');
        if (existingMsgs.length > 0) return;
        this._normalizeRedAIHistory(data.messages).forEach(msg => {
          const el = document.createElement('div');
          el.className = `redai-msg redai-msg-${msg.role === 'user' ? 'user' : 'ai'}`;
          if (msg.role === 'user') {
            el.innerHTML = `<div class="redai-msg-content">${msg.html || this.escapeHTML(msg.text)}</div>`;
          } else {
            el.innerHTML = `${this._redAIAvatarHTML('redai-msg-avatar')}<div class="redai-msg-content">${msg.html || this.escapeHTML(msg.text)}</div>`;
          }
          container.appendChild(el);
        });
        container.scrollTop = container.scrollHeight;
      }
    } catch (e) { /* silent */ }
  }

  _normalizeRedAIHistory(messages) {
    if (!Array.isArray(messages) || messages.length === 0) return [];
    const normalized = [];
    let lastSignature = '';
    messages.forEach(msg => {
      const role = msg.role === 'user' ? 'user' : 'assistant';
      const rawText = (msg.rawText || msg.text || '').trim();
      const html = (msg.html || '').trim();
      const signature = `${role}|${rawText || html}`;
      if (signature && signature === lastSignature) return;
      lastSignature = signature;
      normalized.push({ ...msg, role, rawText, html });
    });
    return normalized;
  }

  /* ═══════════════════════ AI HELPER METHODS ═══════════════════════ */

  // Show a spinner overlay on a message element during AI action
  _showMsgSpinner(msgEl, label) {
    if (!msgEl) return null;
    let spinner = msgEl.querySelector('.ai-msg-spinner');
    if (spinner) { spinner.querySelector('.ai-spinner-label').textContent = label || ''; return spinner; }
    spinner = document.createElement('div');
    spinner.className = 'ai-msg-spinner';
    spinner.innerHTML = `<div class="ai-spinner-ring"></div><span class="ai-spinner-label">${this.escapeHTML(label || '')}</span>`;
    msgEl.appendChild(spinner);
    return spinner;
  }
  _removeMsgSpinner(msgEl) {
    if (!msgEl) return;
    const s = msgEl.querySelector('.ai-msg-spinner');
    if (s) s.remove();
  }

  _showAIInlineResponse(msgEl, title, response) {
    // Show AI response inline below the message in the chat
    if (msgEl) {
      // Remove existing inline response if any
      const existing = msgEl.querySelector('.ai-inline-response');
      if (existing) existing.remove();
      const div = document.createElement('div');
      div.className = 'ai-inline-response';
      div.innerHTML = `
        <div class="ai-inline-header">
          <i class="fas fa-robot" style="color:#e74c3c"></i>
          <span style="font-weight:600">${this.escapeHTML(title)}</span>
          <button class="ai-inline-close" onclick="this.closest('.ai-inline-response').remove()" title="Close"><i class="fas fa-times"></i></button>
        </div>
        <div class="ai-inline-text">${this.formatText(response)}</div>
      `;
      const content = msgEl.querySelector('.msg-content');
      if (content) content.appendChild(div);
    } else {
      // Fallback: append as a RedAI message in chat
      const container = this.dom.messagesContainer;
      if (container) {
        const div = document.createElement('div');
        div.className = 'message redai-chat-msg redai-bot-msg';
        div.innerHTML = `
          ${this._redAIAvatarHTML('msg-avatar redai-avatar-icon')}
          <div class="msg-content">
            <div class="msg-header">
              <span class="msg-author bot" style="color:#e74c3c;font-weight:600;">RedAI</span>
              <span class="msg-badge ai-badge"><i class="fas fa-robot"></i> AI</span>
              <span class="msg-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="msg-text"><strong>${this.escapeHTML(title)}:</strong><br>${this.formatText(response)}</div>
          </div>
        `;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
      }
    }
  }

  async aiAskAbout(text, msgId) {
    if (!text || !text.trim()) return;
    // Show styled modal instead of browser prompt
    const userQuestion = await new Promise((resolve) => {
      const modal = document.getElementById('askAIModal');
      const input = document.getElementById('askAIModalInput');
      const desc = document.getElementById('askAIModalDesc');
      const submitBtn = document.getElementById('askAIModalSubmit');
      if (!modal || !input || !submitBtn) { resolve(null); return; }
      // Show a preview of the message being asked about
      desc.textContent = `"${text.trim().substring(0, 120)}${text.length > 120 ? '…' : ''}"`;
      input.value = '';
      this.openModal('askAIModal');
      setTimeout(() => input.focus(), 80);
      const cleanup = () => {
        submitBtn.removeEventListener('click', onSubmit);
        input.removeEventListener('keydown', onKey);
        modal.removeEventListener('click', onOverlay);
        modal.querySelector('.modal-x')?.removeEventListener('click', onClose);
      };
      const onSubmit = () => {
        const q = input.value.trim();
        cleanup();
        this.closeModal('askAIModal');
        resolve(q || null);
      };
      const onKey = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); onSubmit(); }
        if (e.key === 'Escape') { cleanup(); this.closeModal('askAIModal'); resolve(null); }
      };
      const onOverlay = (e) => { if (e.target === modal) { cleanup(); resolve(null); } };
      const onClose = () => { cleanup(); resolve(null); };
      submitBtn.addEventListener('click', onSubmit);
      input.addEventListener('keydown', onKey);
      modal.addEventListener('click', onOverlay);
      modal.querySelector('.modal-x')?.addEventListener('click', onClose);
    });
    if (!userQuestion) return;
    const msgEl = msgId ? document.querySelector(`.message[data-id="${msgId}"]`) : null;
    const spinner = this._showMsgSpinner(msgEl, this.t('ai.thinking') || 'Thinking...');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          message: text.substring(0, 500),
          context: 'context_menu',
          taskInstruction: 'The user is asking about this chat message. Their question is: "' + userQuestion.trim() + '". Answer their question about the message.'
        })
      });
      const data = await res.json();
      this._removeMsgSpinner(msgEl);
      const reply = data.reply || data.error || 'No response';
      this._showAIInlineResponse(msgEl, userQuestion.trim(), reply);
    } catch (err) {
      this._removeMsgSpinner(msgEl);
      this.toast(this.t('ai.error') || 'AI is temporarily unavailable', 'error');
    }
  }

  async aiTranslateMessage(text, msgId) {
    if (!text || !text.trim()) return;
    const langMap = { en: 'English', fr: 'French', it: 'Italian', es: 'Spanish', de: 'German', pt: 'Portuguese', ja: 'Japanese', ko: 'Korean', ru: 'Russian', ar: 'Arabic', nl: 'Dutch' };
    const targetLang = langMap[this.currentLang] || 'English';
    const msgEl = msgId ? document.querySelector(`.message[data-id="${msgId}"]`) : null;
    const spinner = this._showMsgSpinner(msgEl, this.t('ai.translating') || 'Translating...');
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, text: text.substring(0, 1000), targetLang, room: this.currentRoom || '', msgId: msgId || '' })
      });
      const data = await res.json();
      this._removeMsgSpinner(msgEl);
      const translation = data.translation || data.reply || 'No translation';
      // Replace the message text inline
      if (msgEl) {
        const msgTextEl = msgEl.querySelector('.msg-text');
        if (msgTextEl) {
          // Store original text so user can toggle back
          if (!msgEl.dataset.originalText) {
            msgEl.dataset.originalText = msgTextEl.innerHTML;
          }
          msgTextEl.innerHTML = this.formatText(translation);
          // Add a small "show original" link
          const existing = msgEl.querySelector('.ai-show-original');
          if (existing) existing.remove();
          const link = document.createElement('button');
          link.className = 'ai-show-original';
          link.innerHTML = '<i class="fas fa-undo"></i> ' + (this.t('ai.show_original') || 'Show original');
          link.onclick = () => {
            msgTextEl.innerHTML = msgEl.dataset.originalText;
            link.remove();
            delete msgEl.dataset.originalText;
          };
          msgTextEl.appendChild(link);
        }
      }
    } catch (err) {
      this._removeMsgSpinner(msgEl);
      this.toast(this.t('ai.error') || 'AI is temporarily unavailable', 'error');
    }
  }

  async aiExplainMessage(text, msgId) {
    if (!text || !text.trim()) return;
    const msgEl = msgId ? document.querySelector(`.message[data-id="${msgId}"]`) : null;
    const spinner = this._showMsgSpinner(msgEl, this.t('ai.explaining') || 'Explaining...');
    try {
      const res = await fetch('/api/ai/explain-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          text: text.substring(0, 500),
          room: this.currentRoom || '',
          msgId: msgId || ''
        })
      });
      const data = await res.json();
      this._removeMsgSpinner(msgEl);
      const reply = data.reply || data.error || 'No response';
      this._showAIInlineResponse(msgEl, this.t('ai.explain') || 'Explanation', reply);
    } catch (err) {
      this._removeMsgSpinner(msgEl);
      this.toast(this.t('ai.error') || 'AI is temporarily unavailable', 'error');
    }
  }

  async aiRewriteMessage(text, msgId) {
    if (!text || !text.trim()) return;
    const msgEl = msgId ? document.querySelector(`.message[data-id="${msgId}"]`) : null;
    const spinner = this._showMsgSpinner(msgEl, this.t('ai.rewriting') || 'Rewriting...');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          message: text.substring(0, 500),
          context: 'rewrite',
          taskInstruction: 'Rewrite this message to be clearer and more polished. Keep the meaning the same. Output ONLY the rewritten text.'
        })
      });
      const data = await res.json();
      this._removeMsgSpinner(msgEl);
      const reply = data.reply || data.error || 'No response';
      this._showAIInlineResponse(msgEl, this.t('ai.rewrite') || 'Rewrite', reply);
    } catch (err) {
      this._removeMsgSpinner(msgEl);
      this.toast(this.t('ai.error') || 'AI is temporarily unavailable', 'error');
    }
  }

  async aiSentiment(text, msgId) {
    if (!text || !text.trim()) return;
    const msgEl = msgId ? document.querySelector(`.message[data-id="${msgId}"]`) : null;
    const spinner = this._showMsgSpinner(msgEl, this.t('ai.thinking') || 'Analyzing...');
    try {
      const res = await fetch('/api/ai/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, text: text.substring(0, 500) })
      });
      const data = await res.json();
      this._removeMsgSpinner(msgEl);
      if (msgEl) {
        // Show inline mood badge
        let badge = msgEl.querySelector('.ai-mood-badge');
        if (badge) badge.remove();
        badge = document.createElement('span');
        badge.className = 'ai-mood-badge';
        badge.title = `Mood: ${data.label || 'neutral'} (${data.confidence || 0}%)`;
        badge.textContent = data.mood || '🤔';
        const header = msgEl.querySelector('.msg-header');
        if (header) header.appendChild(badge);
      }
    } catch (err) {
      this._removeMsgSpinner(msgEl);
    }
  }

  async aiSmartReplies(text) {
    if (!text || !text.trim()) return;
    try {
      const res = await fetch('/api/ai/smart-replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, context: text.substring(0, 300) })
      });
      const data = await res.json();
      const replies = data.replies || ['👍', 'Got it!', 'Thanks!'];
      this._showSmartReplies(replies);
    } catch (err) {
      // silently fail
    }
  }

  _showSmartReplies(replies) {
    let container = document.getElementById('smartReplies');
    if (!container) {
      container = document.createElement('div');
      container.id = 'smartReplies';
      container.className = 'smart-replies-bar';
      this.dom.messageInput?.parentElement?.insertBefore(container, this.dom.messageInput);
    }
    container.innerHTML = replies.map(r => `<button class="smart-reply-btn" onclick="app.dom.messageInput.value='${this.escapeHTML(r)}';app.sendMessage();document.getElementById('smartReplies').classList.remove('active')">${this.escapeHTML(r)}</button>`).join('');
    container.classList.add('active');
    setTimeout(() => container.classList.remove('active'), 15000);
  }

  async aiSummarizeChat() {
    // Gather last 20 messages from the current chat view
    const msgs = this.dom.messagesContainer?.querySelectorAll('.message .msg-text');
    if (!msgs || msgs.length === 0) {
      this.toast(this.t('ai.no_messages') || 'No messages to summarize', 'warning');
      return;
    }
    const texts = [];
    msgs.forEach(m => {
      const msgEl = m.closest('.message');
      const user = msgEl?.dataset?.user || 'Unknown';
      const text = m.textContent?.trim();
      if (text) texts.push(`${user}: ${text}`);
    });
    const last20 = texts.slice(-20).join('\n');
    this.toast(this.t('ai.summarizing') || 'Summarizing chat...', 'info');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, message: `## TASK: Summarize this chat conversation.\nHighlight key points, topics discussed, and any decisions made.\nUse bullet points for clarity.\n\n${last20.substring(0, 2000)}`, context: 'summarize' })
      });
      const data = await res.json();
      this.showAIResponseModal(this.t('ai.summary') || 'Chat Summary', `${texts.length} messages`, data.reply || data.error || 'No response');
    } catch (err) {
      this.toast(this.t('ai.error') || 'AI is temporarily unavailable', 'error');
    }
  }

  showAIResponseModal(title, original, response) {
    // Create/reuse an AI response modal
    let modal = document.getElementById('aiResponseModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'aiResponseModal';
      modal.className = 'modal-overlay';
      modal.style.display = 'none';
      modal.addEventListener('click', (e) => { if (e.target === modal) { modal.style.display = 'none'; document.body.style.overflow = ''; } });
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
      <div class="modal ai-response-modal">
        <div class="modal-header">
          <h3><i class="fas fa-robot" style="color:var(--accent);margin-right:8px"></i>${this.escapeHTML(title)}</h3>
          <button class="modal-close" onclick="document.getElementById('aiResponseModal').style.display='none';document.body.style.overflow=''"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
          <div class="ai-response-original" style="background:var(--bg-tertiary);padding:10px 14px;border-radius:8px;margin-bottom:12px;font-size:13px;color:var(--text-secondary);border-left:3px solid var(--accent);">
            <div style="font-size:11px;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px;font-weight:600">${this.t('ai.original') || 'Original'}</div>
            ${this.escapeHTML(original).substring(0, 300)}${original.length > 300 ? '...' : ''}
          </div>
          <div class="ai-response-content" style="font-size:14px;line-height:1.6;color:var(--text-primary);">
            ${this.formatText(response)}
          </div>
        </div>
        <div class="modal-footer" style="display:flex;gap:8px;justify-content:space-between;align-items:center;padding:12px 16px;border-top:1px solid var(--border-color);">
          <span class="ai-credit" style="font-size:10px;color:var(--text-muted);"><i class="fas fa-robot"></i> RedAI</span>
          <div style="display:flex;gap:8px;">
            <button class="btn" onclick="navigator.clipboard.writeText(document.querySelector('.ai-response-content')?.textContent||'');app.toast('Copied!','success')"><i class="fas fa-copy"></i> ${this.t('common.copy') || 'Copy'}</button>
            <button class="btn primary" onclick="document.getElementById('aiResponseModal').style.display='none';document.body.style.overflow=''">${this.t('common.close') || 'Close'}</button>
          </div>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  /* ═══════════════════════ AI TYPING INDICATOR ═══════════════════════ */

  _showAITypingIndicator() {
    if (!this.dom.messagesContainer) return;
    // Remove existing if any
    this._hideAITypingIndicator();
    this._aiThinking = true;
    const indicator = document.createElement('div');
    indicator.className = 'message ai-typing-indicator';
    indicator.id = 'aiTypingMsg';
    indicator.innerHTML = `
      <div class="ai-typing-avatar"><i class="fas fa-robot"></i></div>
      <div class="msg-content">
        <div class="msg-header">
          <span class="msg-author bot" style="color:#e74c3c;font-weight:600;">RedAI</span>
          <span class="msg-badge ai-badge"><i class="fas fa-robot"></i> ${this.t('ai.tag') || 'AI'}</span>
          <button type="button" class="ai-stop-btn" id="aiStopThinkingBtn"><i class="fas fa-stop"></i> Stop thinking</button>
        </div>
        <div class="ai-typing-dots">
          <div class="ai-typing-dot"></div>
          <div class="ai-typing-dot"></div>
          <div class="ai-typing-dot"></div>
          <span class="ai-typing-label">${this.t('ai.thinking') || 'RedAI is thinking...'}</span>
        </div>
      </div>
    `;
    this.dom.messagesContainer.appendChild(indicator);
    this._aiTypingIndicatorEl = indicator;
    indicator.querySelector('#aiStopThinkingBtn')?.addEventListener('click', () => this.cancelAIThinking());
    this.scrollToBottom();
  }

  _hideAITypingIndicator() {
    const el = document.getElementById('aiTypingMsg');
    if (el) el.remove();
    if (this._aiTypingIndicatorEl === el) this._aiTypingIndicatorEl = null;
    this._aiThinking = false;
  }

  cancelAIThinking() {
    this._aiRequestSeq += 1;
    this._aiThinking = false;
    if (this._aiAbortController) {
      this._aiAbortController.abort();
      this._aiAbortController = null;
    }
    this._hideAITypingIndicator();
    if (this._redaiTypingEl) {
      this._redaiTypingEl.remove();
      this._redaiTypingEl = null;
    }
    this.toast('Stopped thinking.', 'info');
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
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    try {
      // Use service worker showNotification (works on mobile + background)
      if (this._swReg) {
        this._swReg.showNotification(title, {
          body: (body || '').substring(0, 100),
          tag: tag || 'redchat',
          icon: '/uploads/default-avatar.png',
          silent: false,
          vibrate: [100, 50, 100],
          renotify: true
        });
      } else {
        // Fallback for desktop without SW
        const n = new Notification(title, {
          body: (body || '').substring(0, 100),
          tag: tag || 'redchat',
          icon: '/uploads/default-avatar.png',
          silent: false
        });
        n.onclick = () => { window.focus(); n.close(); };
        setTimeout(() => n.close(), 5000);
      }
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
        this.sendVoiceMessage(file);
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
      'checkInviteInUrl', 'initRoomThreads'
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

    console.log('%c🔴 RedChat v5.3 loaded', 'color: #5865f2; font-size: 16px; font-weight: bold');
  }

  /* ═══════════════════════ ROOM THREADS (SUB-ROOMS) ═══════════════════════ */
  initRoomThreads() {
    this.state.roomThreads = [];
    this.state.activeRoomThread = null;
    this.state.threadsPanelOpen = false;
    this.state.threadNotifDot = false;

    // Threads button in header
    const threadsBtn = document.getElementById('threadsBtn');
    if (threadsBtn) {
      threadsBtn.addEventListener('click', () => this.toggleThreadsPanel());
    }

    // Close threads panel
    const closeBtn = document.getElementById('closeThreadsBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeThreadsPanel());
    }
    // Close pixel overlay
    const pixelClose = document.getElementById('pixelClose');
    if (pixelClose) {
      pixelClose.addEventListener('click', () => this._closePixelCanvas());
    }
    const overlay = document.getElementById('threadsOverlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeThreadsPanel());
    }

    // Create thread button
    const createBtn = document.getElementById('createThreadBtn');
    if (createBtn) {
      createBtn.addEventListener('click', () => this.showCreateThreadDialog());
    }
  }

  toggleThreadsPanel() {
    if (this.state.threadsPanelOpen) {
      this.closeThreadsPanel();
    } else {
      this.openThreadsPanel();
    }
  }

  openThreadsPanel() {
    this.state.threadsPanelOpen = true;
    document.getElementById('threadsSidebar')?.classList.add('open');
    document.getElementById('threadsOverlay')?.classList.add('active');
    // Clear notification dot
    this.state.threadNotifDot = false;
    this.updateThreadNotifDot();
    this.loadRoomThreads();
    this.updateCreateThreadBtnVisibility();
  }

  closeThreadsPanel() {
    this.state.threadsPanelOpen = false;
    this.state.activeRoomThread = null;
    document.getElementById('threadsSidebar')?.classList.remove('open');
    document.getElementById('threadsOverlay')?.classList.remove('active');
    // If we were viewing a thread, go back to main chat
    const threadView = document.getElementById('threadViewPanel');
    if (threadView) threadView.remove();
    // Show chat view again
    const chatView = document.getElementById('chatView');
    if (chatView) chatView.style.display = '';
  }

  updateThreadNotifDot() {
    const btn = document.getElementById('threadsBtn');
    if (!btn) return;
    let dot = btn.querySelector('.thread-notif-dot');
    if (this.state.threadNotifDot) {
      if (!dot) {
        dot = document.createElement('span');
        dot.className = 'thread-notif-dot';
        btn.style.position = 'relative';
        btn.appendChild(dot);
      }
    } else {
      if (dot) dot.remove();
    }
  }

  updateCreateThreadBtnVisibility() {
    const createBtn = document.getElementById('createThreadBtn');
    if (!createBtn) return;
    const roomData = (this.allRoomsData || []).find(r => r.name === this.currentRoom || r.id === this.currentRoom);
    const isPredefined = roomData && roomData.isPredefined;
    const isUserAdmin = this.userRole === 'admin';
    if (isPredefined && !isUserAdmin) {
      createBtn.style.display = 'none';
    } else {
      createBtn.style.display = '';
    }
  }

  loadRoomThreads() {
    if (!this.currentRoom) return;
    this.socket.emit('getRoomThreads', { room: this.currentRoom });
  }

  handleRoomThreadsList(data) {
    this.state.roomThreads = data.threads || [];
    this.renderRoomThreads();
  }

  handleRoomThreadCreated(data) {
    if ((data.room || '').toLowerCase() === (this.currentRoom || '').toLowerCase()) {
      // Add to start of list
      this.state.roomThreads.unshift(data.thread);
      this.renderRoomThreads();
      this.toast('New thread created: ' + data.thread.title, 'success');
      // Show notification dot if threads panel is not open
      if (!this.state.threadsPanelOpen) {
        this.state.threadNotifDot = true;
        this.updateThreadNotifDot();
      }
    }
  }

  handleThreadPinned(data) {
    const thread = this.state.roomThreads.find(t => t.id === data.threadId);
    if (thread) {
      thread.pinned = data.pinned;
      // Re-sort: pinned first
      this.state.roomThreads.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return (b.lastActivity || 0) - (a.lastActivity || 0);
      });
      this.renderRoomThreads();
      // If the thread view is open for this thread, re-render it to update the pin button
      if (this.state.activeRoomThread === data.threadId) {
        this.openRoomThread(data.threadId);
      }
      this.toast(data.pinned ? 'Thread pinned' : 'Thread unpinned', 'info');
    }
  }

  handleThreadDeleted(data) {
    this.state.roomThreads = this.state.roomThreads.filter(t => t.id !== data.threadId);
    this.renderRoomThreads();
    // If we were viewing this thread, close the view
    if (this.state.activeRoomThread === data.threadId) {
      this.state.activeRoomThread = null;
      const threadView = document.getElementById('threadViewPanel');
      if (threadView) threadView.remove();
      const chatView = document.getElementById('chatView');
      if (chatView) chatView.style.display = '';
    }
    this.toast('Thread deleted', 'info');
  }

  handleThreadLockedUpdate(data) {
    const thread = this.state.roomThreads.find(t => t.id === data.threadId);
    if (thread) {
      thread.locked = data.locked;
      this.renderRoomThreads();
      // If viewing this thread, update the input state
      if (this.state.activeRoomThread === data.threadId) {
        const input = document.getElementById('threadViewInput');
        if (input) {
          input.disabled = data.locked;
          input.placeholder = data.locked ? 'This thread is locked' : 'Reply to thread...';
        }
      }
    }
  }

  renderRoomThreads() {
    const container = document.getElementById('threadsList');
    const emptyEl = document.getElementById('threadsEmpty');
    if (!container) return;

    const threads = this.state.roomThreads || [];
    if (threads.length === 0) {
      container.innerHTML = '';
      if (emptyEl) emptyEl.style.display = '';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    // Check if current user is room creator
    const roomData = (this.allRoomsData || []).find(r => r.name === this.currentRoom || r.id === this.currentRoom);
    const isRoomOwner = roomData && roomData.creator === this.username;
    const canManage = isRoomOwner || this.userRole === 'admin' || this.userRole === 'moderator';

    container.innerHTML = threads.map(thread => {
      const pinIcon = thread.pinned ? '<i class="fas fa-thumbtack thread-card-pin" title="Pinned"></i>' : '';
      const lockIcon = thread.locked ? '<i class="fas fa-lock thread-card-lock" title="Locked"></i>' : '';
      const participantCount = (thread.participants || []).length;
      const timeStr = this.timeAgo(thread.lastActivity || thread.createdAt);
      const isOwn = thread.creator === this.username;

      return `
        <div class="thread-card ${thread.pinned ? 'pinned' : ''} ${thread.locked ? 'locked' : ''}" data-thread-id="${thread.id}">
          <div class="thread-card-main" onclick="app.openRoomThread('${thread.id}')">
            <div class="thread-card-title">
              ${pinIcon}${lockIcon}
              <span>${this.escapeHTML(thread.title)}</span>
            </div>
            ${thread.description ? `<div class="thread-card-desc">${this.escapeHTML(thread.description)}</div>` : ''}
            <div class="thread-card-meta">
              <span class="thread-card-author"><i class="fas fa-user"></i> ${this.escapeHTML(thread.creator)}</span>
              <span class="thread-card-stats"><i class="fas fa-comment"></i> ${thread.messageCount || 0}</span>
              <span class="thread-card-stats"><i class="fas fa-users"></i> ${participantCount}</span>
              <span class="thread-card-time">${timeStr}</span>
            </div>
          </div>
          ${canManage || isOwn ? `
            <div class="thread-card-actions">
              ${canManage ? `<button class="thread-action-btn" onclick="event.stopPropagation();app.togglePinThread('${thread.id}')" title="${thread.pinned ? 'Unpin' : 'Pin'}"><i class="fas fa-thumbtack"></i></button>` : ''}
              ${canManage ? `<button class="thread-action-btn" onclick="event.stopPropagation();app.toggleLockThread('${thread.id}')" title="${thread.locked ? 'Unlock' : 'Lock'}"><i class="fas fa-${thread.locked ? 'unlock' : 'lock'}"></i></button>` : ''}
              ${canManage || isOwn ? `<button class="thread-action-btn danger" onclick="event.stopPropagation();app.deleteRoomThread('${thread.id}')" title="Delete"><i class="fas fa-trash"></i></button>` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  showCreateThreadDialog() {
    // Use a modal-like dialog
    const existing = document.getElementById('createThreadDialog');
    if (existing) existing.remove();

    const dialog = document.createElement('div');
    dialog.id = 'createThreadDialog';
    dialog.className = 'modal-overlay active';
    dialog.innerHTML = `
      <div class="modal" style="max-width: 480px;">
        <div class="modal-header">
          <h3><i class="fas fa-layer-group"></i> Create Thread</h3>
          <button class="modal-close" onclick="document.getElementById('createThreadDialog')?.remove()"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="setting-group">
            <label class="setting-label">Thread Title *</label>
            <input type="text" id="newThreadTitle" class="setting-input" placeholder="What do you want to discuss?" maxlength="100" autofocus>
          </div>
          <div class="setting-group">
            <label class="setting-label">Description (optional)</label>
            <textarea id="newThreadDesc" class="setting-input" placeholder="Add more context..." rows="2" maxlength="300" style="resize:vertical;"></textarea>
          </div>
          <div class="setting-group">
            <label class="setting-label">First Message (optional)</label>
            <textarea id="newThreadMessage" class="setting-input" placeholder="Start the conversation..." rows="3" style="resize:vertical;"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" onclick="document.getElementById('createThreadDialog')?.remove()">Cancel</button>
          <button class="btn-primary" id="submitCreateThread"><i class="fas fa-plus"></i> Create Thread</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);

    // Close on overlay click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.remove();
    });

    document.getElementById('submitCreateThread')?.addEventListener('click', () => {
      const title = document.getElementById('newThreadTitle')?.value.trim();
      const desc = document.getElementById('newThreadDesc')?.value.trim();
      const message = document.getElementById('newThreadMessage')?.value.trim();

      if (!title) {
        this.toast('Thread title is required', 'error');
        return;
      }

      this.socket.emit('createRoomThread', {
        room: this.currentRoom,
        title: title,
        description: desc || '',
        message: message || ''
      });

      dialog.remove();
    });

    // Enter key on title submits
    document.getElementById('newThreadTitle')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('submitCreateThread')?.click();
      }
    });
  }

  openRoomThread(threadId) {
    this.state.activeRoomThread = threadId;
    const thread = this.state.roomThreads.find(t => t.id === threadId);
    if (!thread) return;

    // Close the threads sidebar
    document.getElementById('threadsSidebar')?.classList.remove('open');
    document.getElementById('threadsOverlay')?.classList.remove('active');

    // Request full thread data
    this.socket.emit('getThread', { threadId: threadId });
    this.socket.once('threadData', (data) => {
      this.renderThreadView(data.thread);
    });
  }

  renderThreadView(thread) {
    if (!thread) return;

    // Hide main chat view, show thread view
    const chatView = document.getElementById('chatView');
    if (chatView) chatView.style.display = 'none';

    // Remove existing thread view
    const existing = document.getElementById('threadViewPanel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'threadViewPanel';
    panel.className = 'thread-view-panel';

    const roomData = (this.allRoomsData || []).find(r => r.name === this.currentRoom || r.id === this.currentRoom);
    const isRoomOwner = roomData && roomData.creator === this.username;
    const canManage = isRoomOwner || this.userRole === 'admin' || this.userRole === 'moderator';

    panel.innerHTML = `
      <div class="thread-view-header">
        <button class="thread-view-back" onclick="app.closeThreadView()"><i class="fas fa-arrow-left"></i></button>
        <div class="thread-view-info">
          <div class="thread-view-title">
            ${thread.pinned ? '<i class="fas fa-thumbtack" style="color:var(--accent);margin-right:6px;font-size:12px;"></i>' : ''}
            ${thread.locked ? '<i class="fas fa-lock" style="color:var(--text-muted);margin-right:6px;font-size:12px;"></i>' : ''}
            ${this.escapeHTML(thread.title)}
          </div>
          <div class="thread-view-meta">
            Started by ${this.escapeHTML(thread.creator)} · ${this.timeAgo(thread.createdAt)} · ${thread.messageCount || 0} replies
          </div>
        </div>
        <div class="thread-view-actions">
          ${canManage ? `<button class="header-icon-btn" onclick="app.togglePinThread('${thread.id}')" title="${thread.pinned ? 'Unpin' : 'Pin'}"><i class="fas fa-thumbtack"></i></button>` : ''}
          ${canManage ? `<button class="header-icon-btn" onclick="app.toggleLockThread('${thread.id}')" title="${thread.locked ? 'Unlock' : 'Lock'}"><i class="fas fa-lock"></i></button>` : ''}
        </div>
      </div>
      ${thread.description ? `<div class="thread-view-description">${this.escapeHTML(thread.description)}</div>` : ''}
      <div class="thread-view-messages" id="threadViewMessages"></div>
      <div class="thread-view-input-area">
        <textarea id="threadViewInput" placeholder="${thread.locked ? 'This thread is locked' : 'Reply to thread...'}" rows="1" ${thread.locked ? 'disabled' : ''}></textarea>
        <button class="thread-view-send" id="threadViewSend" ${thread.locked ? 'disabled' : ''}><i class="fas fa-paper-plane"></i></button>
      </div>
    `;

    const chatMain = document.querySelector('.chat-main');
    if (chatMain) chatMain.appendChild(panel);

    // Render messages
    const messagesContainer = document.getElementById('threadViewMessages');
    if (messagesContainer && thread.messages) {
      thread.messages.forEach(msg => {
        const msgEl = this.createThreadViewMessage(msg);
        messagesContainer.appendChild(msgEl);
      });
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Bind input events
    const input = document.getElementById('threadViewInput');
    const sendBtn = document.getElementById('threadViewSend');

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendThreadViewReply();
        }
      });
      input.addEventListener('input', () => this.autoResize(input));
    }
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendThreadViewReply());
    }

    // Listen for real-time thread replies
    this._threadReplyHandler = (data) => {
      if (data.threadId === this.state.activeRoomThread && messagesContainer) {
        const msgEl = this.createThreadViewMessage(data.message);
        messagesContainer.appendChild(msgEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        // Update thread message count
        const t = this.state.roomThreads.find(th => th.id === data.threadId);
        if (t && data.thread) {
          t.messageCount = data.thread.messageCount;
          t.lastActivity = data.thread.lastActivity;
          t.participants = data.thread.participants;
        }
      }
    };
    this.socket.on('threadReply', this._threadReplyHandler);
  }

  createThreadViewMessage(msg) {
    const div = document.createElement('div');
    div.className = 'thread-view-msg';
    const avatarUrl = this.getAvatarUrl(msg.username);
    const roleClass = msg.role === 'admin' ? 'admin' : msg.role === 'moderator' ? 'moderator' : '';
    const roleBadge = msg.role === 'admin' ? '<span class="msg-badge admin">ADMIN</span>' :
                      msg.role === 'moderator' ? '<span class="msg-badge moderator">MOD</span>' : '';
    const nameStyle = msg.nameColor ? `style="color: ${this.escapeHTML(msg.nameColor)}; font-weight: 600;"` : (msg.role === 'admin' ? 'style="color: #e74c3c; font-weight: 600;"' : '');
    const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    div.innerHTML = `
      <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="${this.escapeHTML(msg.username)}" loading="lazy" data-avatar-user="${this.escapeHTML(msg.username)}">
      <div class="msg-content">
        <div class="msg-header">
          <span class="msg-author ${roleClass}" ${nameStyle}>${this.escapeHTML(msg.username)}</span>
          ${roleBadge}
          <span class="msg-timestamp">${time}</span>
        </div>
        <div class="msg-text">${this.formatText(msg.message || msg.text || '')}</div>
      </div>
    `;
    return div;
  }

  sendThreadViewReply() {
    const input = document.getElementById('threadViewInput');
    if (!input || !input.value.trim() || input.disabled) return;

    this.socket.emit('replyToThread', {
      threadId: this.state.activeRoomThread,
      message: input.value.trim()
    });

    input.value = '';
    this.autoResize(input);
  }

  closeThreadView() {
    this.state.activeRoomThread = null;
    const threadView = document.getElementById('threadViewPanel');
    if (threadView) threadView.remove();
    const chatView = document.getElementById('chatView');
    if (chatView) chatView.style.display = '';

    // Remove the thread reply listener
    if (this._threadReplyHandler) {
      this.socket.off('threadReply', this._threadReplyHandler);
      this._threadReplyHandler = null;
    }
  }

  togglePinThread(threadId) {
    this.socket.emit('pinThread', { threadId: threadId });
    // Immediate visual feedback
    const btn = document.querySelector(`.thread-action-btn[onclick*="togglePinThread('${threadId}')"]`);
    if (btn) {
      btn.classList.add('active');
      btn.style.color = 'var(--accent)';
      setTimeout(() => { btn.classList.remove('active'); btn.style.color = ''; }, 800);
    }
    // Also handle thread view header pin button
    const headerBtn = document.querySelector(`.header-icon-btn[onclick*="togglePinThread('${threadId}')"]`);
    if (headerBtn) {
      headerBtn.classList.add('active');
      headerBtn.style.color = 'var(--accent)';
      setTimeout(() => { headerBtn.classList.remove('active'); headerBtn.style.color = ''; }, 800);
    }
  }

  toggleLockThread(threadId) {
    this.socket.emit('lockThread', { threadId: threadId });
  }

  deleteRoomThread(threadId) {
    if (confirm('Are you sure you want to delete this thread? This cannot be undone.')) {
      this.socket.emit('deleteThread', { threadId: threadId });
    }
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

  /* ═══════════════════════ V5 READ RECEIPTS (DM only) ═══════════════════════ */
  markAsRead(partner) {
    if (!partner) return;
    this.socket.emit('markRead', { partner });
  }

  handleReadReceipt(data) {
    // data.from = the user who read our messages
    if (!data.from || data.from === this.username) return;
    // Only show in the active DM with that user
    if (!this.isDM || this.currentDM !== data.from) return;
    this.state.dmReadTimestamp = data.timestamp;
    this.updateDMReadDot();
  }

  updateDMReadDot() {
    if (!this.isDM || !this.dom.messagesContainer) return;
    // Remove all existing read dots
    this.dom.messagesContainer.querySelectorAll('.dm-read-dot').forEach(el => el.remove());
    const readTs = this.state.dmReadTimestamp;
    if (!readTs) return;
    // Find the last message from us that was read
    const ownMsgs = [...this.dom.messagesContainer.querySelectorAll('.message')].filter(msg => {
      const author = msg.querySelector('.msg-author')?.textContent?.trim();
      const ts = parseInt(msg.dataset.timestamp);
      return author === this.username && ts <= readTs;
    });
    if (ownMsgs.length > 0) {
      const lastOwn = ownMsgs[ownMsgs.length - 1];
      const dot = document.createElement('div');
      dot.className = 'dm-read-dot';
      dot.innerHTML = '<i class="fas fa-check-double"></i> Read';
      dot.title = 'Read by ' + this.escapeHTML(this.currentDM);
      lastOwn.querySelector('.msg-content')?.appendChild(dot);
    }
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
      container.innerHTML = '<span class="trending-tag">#chat</span><span class="trending-tag">#new</span><span class="trending-tag">#popular</span>';
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
    this._openSponsoredAd('https://omg10.com/4/11061842');
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
    this._openSponsoredAd('https://omg10.com/4/11061840');
    this.socket.emit('getChatStats', { room: this.currentRoom });
  }

  handleChatStatsResponse(data) {
    this.renderChatStatsV5(data);
  }

  renderChatStatsV5(data) {
    const container = document.getElementById('statsContent');
    if (!container) return;
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
    const emptyEl = this.dom.favoritesEmpty || document.getElementById('favoritesEmpty');
    if (favs.length === 0) {
      container.innerHTML = '';
      container.closest('.sidebar-section')?.classList.add('empty');
      if (emptyEl) emptyEl.style.display = '';
      return;
    }
    container.closest('.sidebar-section')?.classList.remove('empty');
    if (emptyEl) emptyEl.style.display = 'none';
    container.innerHTML = favs.map(room => {
      const isActive = !this.isDM && this.currentRoom === room ? 'active' : '';
      return `<div class="room-item favorite ${isActive}" data-room="${this.escapeHTML(room)}">
        <i class="room-icon fas fa-star" style="color: var(--warning)"></i>
        <span class="room-name">${this.escapeHTML(room)}</span>
      </div>`;
    }).join('');
    // Bind click & context menu events
    container.querySelectorAll('.room-item').forEach(item => {
      item.addEventListener('click', () => this.joinRoom(item.dataset.room));
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.showRoomContextMenu(e, item.dataset.room);
      });
    });
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
        <button onmousedown="event.preventDefault()" onclick="app.quoteSelection()"><i class="fas fa-quote-right"></i> Quote</button>
        <button onmousedown="event.preventDefault()" onclick="app.copySelection()"><i class="fas fa-copy"></i> Copy</button>
        <button onmousedown="event.preventDefault()" onclick="app.searchSelection()"><i class="fas fa-search"></i> Search</button>
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
    const text = this.state.selectedText;
    // Clear browser selection first so it doesn't interfere with focus
    window.getSelection()?.removeAllRanges();
    this.hideSelectionToolbar();
    if (text && this.dom.messageInput) {
      this.dom.messageInput.value += `> ${text}\n`;
      this.dom.messageInput.focus();
      this.autoResize(this.dom.messageInput);
    }
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
    return this.dom.messagesContainer?.querySelector(`[data-id="${id}"]`) ||
           this.dom.messagesContainer?.querySelector(`[data-msg-id="${id}"]`) || null;
  }

  getAvatarUrl(username) {
    if (username === 'RedAI') {
      return this.getRedAIAvatarUrl();
    }
    if (this.avatars && this.avatars[username]) {
      return this.avatars[username];
    }
    if (this.state.avatars && this.state.avatars[username]) {
      return this.state.avatars[username];
    }
    if (username === this.username && this.userAvatar) {
      return this.userAvatar;
    }
    // use accent specific to that user if available
    const accent = this.userAccents?.[username] || this.settings.accent || '#667eea';
    return this.generateInitialsAvatar(username, accent);
  }

  getRedAIAvatarUrl() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff7a59"/><stop offset="55%" stop-color="#c0392b"/><stop offset="100%" stop-color="#a61d24"/></linearGradient></defs><rect width="64" height="64" rx="32" fill="url(#g)"/><circle cx="32" cy="32" r="18" fill="rgba(255,255,255,0.18)"/><text x="32" y="37" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="22" font-family="Arial, sans-serif" font-weight="700">AI</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  generateInitialsAvatar(username, accent) {
    const initial = (username || '?')[0].toUpperCase();
    accent = accent || this.settings?.accent || '#667eea';
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
    const isPredefined = (this.allRoomsData || []).some(r => (r.name === room || r.id === room) && r.isPredefined);
    const items = [
      { label: isFav ? 'Remove from Favorites' : 'Add to Favorites', icon: isFav ? 'fas fa-star' : 'far fa-star', action: 'favorite', handler: () => this.toggleFavorite(room) },
      { label: isMuted ? 'Unmute Room' : 'Mute Room', icon: isMuted ? 'fas fa-bell' : 'fas fa-bell-slash', action: 'mute', handler: () => this.toggleMuteRoom(room) },
      { label: 'Copy Room Link', icon: 'fas fa-link', action: 'copylink', handler: () => { navigator.clipboard.writeText(`${window.location.origin}?room=${room}`); this.toast('Link copied!', 'success'); } },
    ];
    if (this.userRole === 'admin' || this.userRole === 'moderator') {
      items.push({ separator: true });
      items.push({ label: 'Clear Chat', icon: 'fas fa-broom', action: 'clear', danger: true, handler: () => {
        if (confirm(`Clear all messages in #${room}? This cannot be undone.`)) {
          this.socket.emit('message', { message: '/clear', room });
        }
      }});
      items.push({ label: 'Delete Past...', icon: 'fas fa-clock-rotate-left', action: 'deletepast', danger: true, handler: () => {
        this.showDeletePastMessagesDialog(room);
      }});
    }
    if (!isPredefined) {
      items.push({ separator: true });
      items.push({ label: 'About Room', icon: 'fas fa-circle-info', action: 'about', handler: () => { this.showRoomAboutPage(room); } });
      items.push({ label: 'Invite Members', icon: 'fas fa-user-plus', action: 'invite', handler: () => { this.openRoomInviteDialog(room); } });
      items.push({ separator: true });
      items.push({ label: 'Leave Room', icon: 'fas fa-sign-out-alt', action: 'leave', danger: true, handler: () => {
        // Emit leave to server first
        this.socket.emit('leaveRoom', { room, roomId: room });
        // Remove from favorites
        this.favorites = this.favorites.filter(f => f !== room);
        this.saveFavorites();
        // Remove from local room lists
        this.rooms = this.rooms.filter(r => r !== room);
        this.customRooms = this.customRooms.filter(r => {
          const name = typeof r === 'string' ? r : r.name;
          return name !== room;
        });
        // Switch room if we're in it
        if (this.currentRoom === room) this.joinRoom('General');
        this.renderRooms();
        this.toast(`Left ${room}`, 'info');
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

  showDeletePastMessagesDialog(room) {
    const options = [
      { label: 'Last 15 minutes', value: 15 * 60 * 1000 },
      { label: 'Last hour', value: 60 * 60 * 1000 },
      { label: 'Last 6 hours', value: 6 * 60 * 60 * 1000 },
      { label: 'Last 24 hours', value: 24 * 60 * 60 * 1000 },
      { label: 'Last 7 days', value: 7 * 24 * 60 * 60 * 1000 },
      { label: 'Last 30 days', value: 30 * 24 * 60 * 60 * 1000 },
    ];
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;';
    const card = document.createElement('div');
    card.style.cssText = 'background:var(--bg-secondary);border-radius:var(--radius-lg);padding:24px;max-width:360px;width:90%;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
    card.innerHTML = `
      <h3 style="margin:0 0 6px;color:var(--text-primary);font-size:16px;">
        <i class="fas fa-clock-rotate-left" style="color:var(--danger);margin-right:8px;"></i>Delete Past Messages
      </h3>
      <p style="margin:0 0 16px;color:var(--text-muted);font-size:13px;">Choose how far back to delete messages in <strong>#${this.escapeHTML(room)}</strong>.</p>
      <div class="delete-past-options" style="display:flex;flex-direction:column;gap:6px;"></div>
      <button class="delete-past-cancel" style="margin-top:14px;width:100%;padding:10px;border:none;border-radius:var(--radius-md);background:var(--bg-tertiary);color:var(--text-secondary);cursor:pointer;font-size:13px;font-weight:600;">Cancel</button>
    `;
    const optContainer = card.querySelector('.delete-past-options');
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.style.cssText = 'padding:10px 14px;border:1px solid var(--border-color);border-radius:var(--radius-md);background:var(--bg-primary);color:var(--text-primary);cursor:pointer;font-size:13px;text-align:left;transition:background 0.15s,border-color 0.15s;';
      btn.textContent = opt.label;
      btn.onmouseenter = () => { btn.style.background = 'var(--bg-modifier-hover)'; btn.style.borderColor = 'var(--danger)'; };
      btn.onmouseleave = () => { btn.style.background = 'var(--bg-primary)'; btn.style.borderColor = 'var(--border-color)'; };
      btn.onclick = () => {
        if (confirm(`Delete all messages from the ${opt.label.toLowerCase()} in #${room}?`)) {
          this.socket.emit('adminDeleteOlderThan', { room, olderThanMs: opt.value });
        }
        overlay.remove();
      };
      optContainer.appendChild(btn);
    });
    card.querySelector('.delete-past-cancel').onclick = () => overlay.remove();
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }

  openRoomInviteDialog(room) {
    // Open a server-wide user search dialog instead of a simple prompt
    const modal = document.getElementById('inviteModal');
    if (!modal) {
      // Fallback to prompt if modal doesn't exist
      const username = prompt('Enter username to invite:');
      if (username?.trim()) {
        this.socket.emit('inviteToRoom', { roomId: room, usernames: [username.trim()] });
        this.toast(`Invited ${username.trim()} to ${room}`, 'success');
      }
      return;
    }
    this._inviteTargetRoom = room;
    // Clear previous state
    const searchInput = document.getElementById('inviteSearch');
    const list = document.getElementById('inviteUsersList');
    if (searchInput) searchInput.value = '';
    if (list) list.innerHTML = '<div class="empty-hint">Type to search for users...</div>';
    this.selectedInvites = new Set();
    this.openModal('inviteModal');
    // Bind search to server-wide user search
    if (searchInput) {
      searchInput.oninput = this.debounce(() => {
        const q = searchInput.value.trim();
        if (q.length < 1) {
          if (list) list.innerHTML = '<div class="empty-hint">Type to search for users...</div>';
          return;
        }
        this.socket.emit('searchUsers', { query: q });
      }, 300);
    }
    // Listen for search results
    this._inviteSearchHandler = (data) => {
      const users = data.users || [];
      if (!list) return;
      if (users.length === 0) {
        list.innerHTML = '<div class="empty-hint">No users found</div>';
        return;
      }
      list.innerHTML = users.map(u => `
        <div class="invite-user-item" data-user="${this.escapeHTML(u.username)}" style="display:flex;align-items:center;gap:10px;padding:8px 10px;cursor:pointer;border-radius:8px;transition:background 0.15s;">
          <img class="avatar" src="${this.escapeHTML(u.avatar || '/uploads/default-avatar.png')}" alt="" style="width:32px;height:32px;border-radius:50%;">
          <span>${this.escapeHTML(u.username)}</span>
          ${u.isOnline ? '<span style="color:var(--green);font-size:11px;">online</span>' : ''}
          <button class="btn small primary" style="margin-left:auto;" onclick="app._inviteSingleUser('${this.escapeHTML(u.username)}')"><i class="fas fa-paper-plane"></i> Invite</button>
        </div>
      `).join('');
    };
    this.socket.off('searchUsersResults', this._inviteSearchHandler);
    this.socket.on('searchUsersResults', this._inviteSearchHandler);
    // Override submit button
    const submitBtn = document.getElementById('submitInvite');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (this.selectedInvites.size === 0) {
          this.toast('Select users to invite', 'error');
          return;
        }
        this.selectedInvites.forEach(user => {
          this.socket.emit('inviteToRoom', { usernames: [user], roomId: this._inviteTargetRoom, room: this._inviteTargetRoom });
        });
        this.toast(`Invited ${this.selectedInvites.size} user(s)`, 'success');
        this.selectedInvites.clear();
        this.closeModal('inviteModal');
      };
    }
  }

  _inviteSingleUser(username) {
    const room = this._inviteTargetRoom || this.currentRoom;
    this.socket.emit('inviteToRoom', { usernames: [username], roomId: room, room: room });
    this.toast(`Invited ${username}`, 'success');
  }

  openRoomSettings(room) {
    // Legacy - now handled by showRoomAboutPage
    this.showRoomAboutPage(room);
  }

  /* ═══════════════════════ ROOM ABOUT PAGE ═══════════════════════ */

  showRoomAboutPage(room) {
    if (!room) return;
    const modal = document.getElementById('roomAboutModal');
    if (!modal) return;
    modal.dataset.room = room;
    // Clear previous state
    const onlineGrp = document.getElementById('raOnlineGroup');
    const offlineGrp = document.getElementById('raOfflineGroup');
    if (onlineGrp) onlineGrp.innerHTML = '<div class="ra-group-label online"><span class="ra-group-dot"></span> Online — <span class="ra-loading">loading…</span></div>';
    if (offlineGrp) offlineGrp.innerHTML = '';
    document.getElementById('raRoomName').textContent = 'Loading…';
    document.getElementById('raDescription').textContent = '';
    // Request full data from server
    this.socket.emit('getRoomAbout', { room });
    this.openModal('roomAboutModal');
  }

  handleRoomAbout(data) {
    const modal = document.getElementById('roomAboutModal');
    if (!modal || modal.style.display === 'none') return;

    const isCreatorOrAdmin = data.isCreator || data.isAdmin;
    const isPredefined = data.isPredefined;

    // Header
    const headerIcon = document.getElementById('raHeaderIcon');
    const roomNameEl = document.getElementById('raRoomName');
    const privacyBadge = document.getElementById('raPrivacyBadge');
    if (headerIcon) {
      headerIcon.style.background = data.color || '#667eea';
      headerIcon.innerHTML = `<i class="fas ${data.icon || 'fa-hashtag'}"></i>`;
    }
    if (roomNameEl) roomNameEl.textContent = data.name || 'Room';
    if (privacyBadge) {
      if (data.isPredefined || !data.isPrivate) {
        privacyBadge.innerHTML = '<i class="fas fa-globe"></i> Public';
        privacyBadge.className = 'ra-privacy-badge public';
      } else {
        privacyBadge.innerHTML = '<i class="fas fa-lock"></i> Private';
        privacyBadge.className = 'ra-privacy-badge';
      }
    }

    // Description
    const descEl = document.getElementById('raDescription');
    if (descEl) descEl.textContent = data.description || 'No description.';
    const editArea = document.getElementById('raEditDescArea');
    const descInput = document.getElementById('raDescInput');
    if (editArea) editArea.style.display = (isCreatorOrAdmin && !isPredefined) ? 'flex' : 'none';
    if (descInput) descInput.value = data.description || '';

    // Save button
    const saveBtn = document.getElementById('raSaveDescBtn');
    if (saveBtn) {
      saveBtn.onclick = () => {
        const newDesc = (descInput?.value || '').trim();
        this.socket.emit('updateRoomDescription', { room: data.roomKey, description: newDesc });
      };
    }

    // Stats
    const memberCountEl = document.getElementById('raMemberCount');
    const onlineCountEl = document.getElementById('raOnlineCount');
    const memberCountBadge = document.getElementById('raMemberCountBadge');
    if (memberCountEl) memberCountEl.textContent = data.memberCount || 0;
    if (onlineCountEl) onlineCountEl.textContent = data.onlineCount || 0;
    if (memberCountBadge) memberCountBadge.textContent = data.memberCount || 0;

    // Creator
    const creatorRow = document.getElementById('raCreatorRow');
    const creatorAvatar = document.getElementById('raCreatorAvatar');
    const creatorName = document.getElementById('raCreatorName');
    if (creatorRow) {
      if (data.creator) {
        creatorRow.style.display = 'flex';
        if (creatorAvatar) creatorAvatar.src = this.getAvatarUrl(data.creator);
        if (creatorName) creatorName.textContent = data.creator;
        creatorRow.onclick = () => this.showProfile(data.creator);
      } else {
        creatorRow.style.display = 'none';
      }
    }

    // Created date
    const dateEl = document.getElementById('raCreatedDate');
    if (dateEl) {
      if (data.createdAt) {
        const d = new Date(data.createdAt);
        dateEl.textContent = d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      } else {
        dateEl.textContent = '—';
      }
    }

    // Danger zone (creator/admin only, non-predefined)
    const dangerZone = document.getElementById('raDangerZone');
    if (dangerZone) dangerZone.style.display = (isCreatorOrAdmin && !isPredefined) ? 'block' : 'none';
    const deleteBtn = document.getElementById('raDeleteRoomBtn');
    if (deleteBtn) {
      deleteBtn.onclick = () => {
        if (confirm(`Delete "${data.name}"? This cannot be undone.`)) {
          this.socket.emit('deleteRoom', { room: data.roomKey, roomId: data.roomKey });
          this.closeModal('roomAboutModal');
          if (this.currentRoom === data.roomKey) this.joinRoom('General');
          this.rooms = this.rooms.filter(r => r !== data.roomKey && r !== data.name);
          this.favorites = this.favorites.filter(f => f !== data.roomKey && f !== data.name);
          this.saveFavorites();
          this.renderRooms();
        }
      };
    }

    // Leave button (non-creator, non-predefined)
    const leaveBtn = document.getElementById('raLeaveRoomBtn');
    if (leaveBtn) {
      const showLeave = !isPredefined && !data.isCreator;
      leaveBtn.style.display = showLeave ? 'flex' : 'none';
      leaveBtn.onclick = () => {
        this.closeModal('roomAboutModal');
        // Emit leave to server first
        this.socket.emit('leaveRoom', { room: data.roomKey, roomId: data.roomKey });
        // Remove from favorites
        this.favorites = this.favorites.filter(f => f !== data.roomKey && f !== data.name);
        this.saveFavorites();
        // Remove from local lists
        this.rooms = this.rooms.filter(r => r !== data.roomKey && r !== data.name);
        this.customRooms = this.customRooms.filter(r => {
          const name = typeof r === 'string' ? r : r.name;
          return name !== data.roomKey && name !== data.name;
        });
        if (this.currentRoom === data.roomKey || this.currentRoom === data.name) this.joinRoom('General');
        this.renderRooms();
        this.toast(`Left ${data.name}`, 'info');
      };
    }

    // Members
    this._raMembers = data.members || [];
    this._raCanKick = isCreatorOrAdmin && !isPredefined;
    this._raRoomKey = data.roomKey;
    this._raRoomName = data.name;
    this.renderRoomAboutMembers(this._raMembers);
  }

  renderRoomAboutMembers(members) {
    const onlineGrp = document.getElementById('raOnlineGroup');
    const offlineGrp = document.getElementById('raOfflineGroup');
    if (!onlineGrp || !offlineGrp) return;

    const online = members.filter(m => m.isOnline);
    const offline = members.filter(m => !m.isOnline);

    const buildRow = (m) => {
      const isMe = m.username === this.username;
      const avatarUrl = this.getAvatarUrl(m.username);
      const roleTag = (m.role && m.role !== 'member')
        ? `<span class="ra-member-role ${m.role}">${m.role}</span>`
        : '';
      const kickBtn = (this._raCanKick && !isMe && m.role !== 'admin')
        ? `<button class="ra-member-btn kick" data-user="${this.escapeHTML(m.username)}" title="Remove from room"><i class="fas fa-user-minus"></i></button>`
        : '';
      const profileBtn = `<button class="ra-member-btn" data-profile="${this.escapeHTML(m.username)}" title="View Profile"><i class="fas fa-user"></i></button>`;
      const statusDot = `<div class="ra-member-dot ${m.isOnline ? 'online' : ''}"></div>`;
      return `<div class="ra-member-row" data-username="${this.escapeHTML(m.username)}">
        <div class="ra-member-avatar-wrap">
          <img class="ra-member-avatar" src="${avatarUrl}" alt="${this.escapeHTML(m.username)}">
          ${statusDot}
        </div>
        <div class="ra-member-info">
          <div class="ra-member-name">${this.escapeHTML(m.username)}${isMe ? ' <span style="opacity:0.5;font-size:11px">(you)</span>' : ''}${roleTag}</div>
          <div class="ra-member-status">${m.status || (m.isOnline ? 'online' : 'offline')}</div>
        </div>
        <div class="ra-member-actions">${profileBtn}${kickBtn}</div>
      </div>`;
    };

    const onlineLabel = online.length
      ? `<div class="ra-group-label online"><span class="ra-group-dot"></span> Online — ${online.length}</div>`
      : '';
    const offlineLabel = offline.length
      ? `<div class="ra-group-label"><span class="ra-group-dot"></span> Offline — ${offline.length}</div>`
      : '';

    onlineGrp.innerHTML = onlineLabel + online.map(buildRow).join('');
    offlineGrp.innerHTML = offlineLabel + offline.map(buildRow).join('');

    // Bind buttons
    [onlineGrp, offlineGrp].forEach(grp => {
      grp.querySelectorAll('.ra-member-btn.kick').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.user;
          if (!target) return;
          if (!confirm(`Remove ${target} from ${this._raRoomName}?`)) return;
          this.socket.emit('kickFromRoom', { targetUsername: target, room: this._raRoomKey });
          btn.closest('.ra-member-row')?.remove();
          this._raMembers = this._raMembers.filter(m => m.username !== target);
          const badge = document.getElementById('raMemberCountBadge');
          const countEl = document.getElementById('raMemberCount');
          const newCount = this._raMembers.length;
          if (badge) badge.textContent = newCount;
          if (countEl) countEl.textContent = newCount;
          this.toast(`${target} removed from room`, 'info');
        });
      });
      grp.querySelectorAll('[data-profile]').forEach(btn => {
        btn.addEventListener('click', () => this.showProfile(btn.dataset.profile));
      });
    });
  }

  filterRoomAboutMembers(query) {
    const q = (query || '').toLowerCase();
    const all = this._raMembers || [];
    const filtered = q ? all.filter(m => m.username.toLowerCase().includes(q)) : all;
    this.renderRoomAboutMembers(filtered);
  }


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
    // RedAI opens in main chat area, not as a sidebar panel
    if (tab === 'redai') {
      this.openRedAIChat();
      return;
    }
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
    const activeSidebar = this.activeSidebarTab || 'channels';
    if (activeSidebar === 'explore') {
      // Delegate to explore room filter
      this.filterExploreRooms(q);
      return;
    }
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
    const items = [
      { label: 'Copy Text', icon: 'fas fa-copy', action: 'copy', handler: () => { navigator.clipboard.writeText(text || ''); this.toast('Copied!', 'success'); } },
      { separator: true },
      { label: this.t('ai.ask_about') || 'Ask AI', icon: 'fas fa-robot', action: 'ai-ask', handler: () => this.aiAskAbout(text, msgId) },
      { label: this.t('ai.translate_msg') || 'Translate', icon: 'fas fa-language', action: 'ai-translate', handler: () => this.aiTranslateMessage(text, msgId) },
      { label: this.t('ai.explain') || 'Explain', icon: 'fas fa-lightbulb', action: 'ai-explain', handler: () => this.aiExplainMessage(text, msgId) },
      { label: this.t('ai.rewrite') || 'Rewrite', icon: 'fas fa-wand-magic-sparkles', action: 'ai-rewrite', handler: () => this.aiRewriteMessage(text, msgId) },
      { label: this.t('ai.sentiment') || 'Mood', icon: 'fas fa-face-smile-beam', action: 'ai-sentiment', handler: () => this.aiSentiment(text, msgId) },
      { label: this.t('ai.smart_replies') || 'Smart Replies', icon: 'fas fa-reply-all', action: 'ai-smart', handler: () => this.aiSmartReplies(text) },
    ];
    if (!isOwnMsg) {
      items.push({ separator: true });
      items.push({ label: 'Report', icon: 'fas fa-flag', action: 'report', danger: true, handler: () => {
        this.openReportModal(author, msgId);
      } });
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
    // Handle user not found
    if (data.error) {
      this.toast(data.error || 'User not found', 'error');
      return;
    }
    const isBlocked = (this.blocked || []).includes(data.username);
    const isFriend = (this.friends || []).includes(data.username) || (this.state.friends || []).some(f => (f.username || f) === data.username);
    const isSent = (this.friendRequests.sent || []).includes(data.username);
    const avatarUrl = data.avatar || (this.avatars && this.avatars[data.username]) || this.generateInitialsAvatar(data.username, data.accent || this.settings.accent || '#667eea');
    const c1 = data.bannerColor || 'var(--accent)';
    const c2 = data.bannerColor2 || this.adjustColor?.(data.bannerColor || this.state?.settings?.accent || '#667eea', -40) || 'var(--accent-hover)';
    const content = document.getElementById('profileModalBody') || modal.querySelector('.modal-body') || modal;

    // Store last profile data for reactive updates
    this._lastProfileData = data;

    content.innerHTML = `
      <div class="profile-banner" style="background: linear-gradient(135deg, ${c1}, ${c2})">
        <img class="profile-avatar-lg" src="${avatarUrl}" alt="${this.escapeHTML(data.username)}" onerror="this.onerror=null;this.src='${this.generateInitialsAvatar(data.username, data.accent || this.settings.accent || '#667eea').replace(/'/g, '&#39;')}'" onclick="app.openImageViewer('${this.escapeHTML(avatarUrl)}')">
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
            ${data.age ? `<div class="profile-info-item"><i class="fas fa-birthday-cake"></i><span>${data.age} years old</span></div>` : ''}
            ${data.gender ? `<div class="profile-info-item"><i class="fas fa-user-tag"></i><span>${this.escapeHTML(data.gender.charAt(0).toUpperCase() + data.gender.slice(1))}</span></div>` : ''}
            <div class="profile-info-item"><i class="fas fa-star"></i><span>Level ${data.level || 1}</span></div>
            <div class="profile-info-item"><i class="fas fa-bolt"></i><span>${(data.xp?.totalXP ?? (typeof data.xp === 'number' ? data.xp : 0))} XP</span></div>
            <div class="profile-info-item"><i class="fas fa-comment"></i><span>${data.stats?.messagesSent || data.messageCount || 0} messages</span></div>
            ${data.location ? `<div class="profile-info-item"><i class="fas fa-map-marker-alt"></i><span>${this.escapeHTML(data.location)}</span></div>` : ''}
          </div>
        </div>
        ${data.badges?.length ? `
        <div class="profile-section">
          <h4>Badges ${data.username === this.username ? `<span style="font-size:11px;color:var(--text-muted);font-weight:400;margin-left:8px;">${this.t('badge.select_hint') || 'Click to display next to your name'}</span>` : ''}</h4>
          <div class="profile-badges" style="display:flex;flex-wrap:wrap;gap:8px;">
            ${data.username === this.username ? `<div class="profile-badge-item badge-select-item ${!data.selectedBadge ? 'badge-selected' : ''}" data-badge-id="" data-badge-color="" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:12px;background:var(--bg-tertiary);border:1px solid ${!data.selectedBadge ? 'var(--accent)' : 'var(--border-color)'};cursor:pointer;transition:transform .15s;" title="${this.t('badge.none') || 'None'}"><span style="font-size:0.85rem;color:var(--text-muted);font-weight:600;">${this.t('badge.none') || 'None'}</span></div>` : ''}
            ${data.badges.map(b => `<div class="profile-badge-item ${data.username === this.username ? 'badge-select-item' : ''} ${data.selectedBadge === b.id ? 'badge-selected' : ''}" data-badge-id="${this.escapeHTML(b.id)}" data-badge-color="${b.color}" data-badge-desc="${this.escapeHTML(b.description || b.name)}" data-badge-name="${this.escapeHTML(b.name)}" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:12px;background:${b.color}22;border:1px solid ${data.selectedBadge === b.id ? 'var(--accent)' : b.color + '44'};cursor:pointer;transition:transform .15s;" title="${data.username === this.username ? this.t('badge.select_hint') || 'Click to display' : 'Click for details'}"><span style="font-size:1.1rem;">${b.icon}</span><span style="font-size:0.85rem;color:${b.color};font-weight:600;">${this.escapeHTML(b.name)}</span></div>`).join('')}
          </div>
        </div>` : ''}
        ${data.achievements?.length ? `
        <div class="profile-section">
          <h4>Achievements</h4>
          <div class="profile-achievements">
            ${data.achievements.map(a => `<div class="achievement-badge" data-ach-name="${this.escapeHTML(a.name)}" data-ach-desc="${this.escapeHTML(a.description || '')}" data-ach-earned="${a.earnedAt ? new Date(a.earnedAt).toLocaleDateString() : ''}" style="cursor:pointer;" title="Click for details"><span>${a.icon || '🏆'}</span></div>`).join('')}
          </div>
        </div>` : ''}
        <div class="profile-actions">
          ${data.username !== this.username ? `
            <button class="profile-action-btn primary" onclick="app.closeModal('profileModal'); app.openDM('${this.escapeHTML(data.username)}'); app.switchSidebarTab('dms');"><i class="fas fa-comment"></i> Message</button>
            ${!isFriend && !isSent ? `<button class="profile-action-btn" id="profileAddFriendBtn" data-target="${this.escapeHTML(data.username)}"><i class="fas fa-user-plus"></i> Add Friend</button>` : isSent ? `<button class="profile-action-btn" disabled>Request Sent</button>` : ''}
            <button class="profile-action-btn ${isBlocked ? 'danger' : ''}" onclick="app.${isBlocked ? 'unblockUser' : 'blockUser'}('${this.escapeHTML(data.username)}')">
              <i class="fas fa-${isBlocked ? 'unlock' : 'ban'}"></i> ${isBlocked ? 'Unblock' : 'Block'}
            </button>
            ${this.userRole === 'admin' ? `<button class="profile-action-btn danger" onclick="app.closeModal('profileModal');app.openBanModal('${this.escapeHTML(data.username)}');"><i class="fas fa-gavel"></i> Ban</button>` : ''}
          ` : `
            <button class="profile-action-btn" onclick="app.openModal('settingsModal')"><i class="fas fa-cog"></i> Edit Profile</button>
          `}
        </div>
      </div>
    `;
    this.openModal('profileModal');

    // Add friend button handler
    const addFriendBtn = content.querySelector('#profileAddFriendBtn');
    if (addFriendBtn) {
      addFriendBtn.addEventListener('click', () => {
        const target = addFriendBtn.dataset.target;
        this.socket.emit('sendFriendRequest', { targetUsername: target });
        if (!this.friendRequests.sent) this.friendRequests.sent = [];
        this.friendRequests.sent.push(target);
        this.renderFriends();
        addFriendBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        addFriendBtn.disabled = true;
        addFriendBtn.style.background = '#2d7a2d';
        this.toast('Friend request sent!', 'success');
      });
    }

    // Add click-for-details on badges (and badge selection for own profile)
    content.querySelectorAll('.profile-badge-item').forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('badge-select-item')) {
          // Select this badge for display
          const badgeId = el.dataset.badgeId || null;
          this.socket.emit('setSelectedBadge', { badgeId: badgeId || null });
          content.querySelectorAll('.badge-select-item').forEach(b => {
            b.classList.remove('badge-selected');
            // Reset border to original color
            const bColor = b.dataset.badgeColor || 'var(--border-color)';
            b.style.borderColor = b.dataset.badgeId ? bColor + '44' : 'var(--border-color)';
          });
          el.classList.add('badge-selected');
          el.style.borderColor = 'var(--accent)';
          this.toast(this.t('badge.selected') || (badgeId ? 'Badge selected!' : 'Badge removed'), 'success');
        } else {
          const name = el.dataset.badgeName;
          const desc = el.dataset.badgeDesc;
          this.toast(`${name}: ${desc}`, 'info', 4000);
        }
      });
    });
    // Add click-for-details on achievements
    content.querySelectorAll('.achievement-badge[data-ach-name]').forEach(el => {
      el.addEventListener('click', () => {
        const name = el.dataset.achName;
        const desc = el.dataset.achDesc;
        const earned = el.dataset.achEarned;
        let msg = name;
        if (desc) msg += ': ' + desc;
        if (earned) msg += ' — Earned ' + earned;
        this.toast(msg, 'info', 4000);
      });
    });
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
            { label: 'Block', icon: 'fas fa-ban', danger: true, action: 'block', handler: () => this.blockUser(username) },
            { label: 'Report', icon: 'fas fa-flag', danger: true, action: 'report', handler: () => this.openReportModal(username, 'user') }
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

  filterRoomManageList(query) {
    const q = (query || '').toLowerCase();
    const items = document.querySelectorAll('#roomMembersList .manage-member-item');
    items.forEach(item => {
      const name = (item.querySelector('.manage-username')?.textContent || '').toLowerCase();
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
    const roleClass = msg.role === 'admin' ? 'admin' : msg.role === 'moderator' ? 'moderator' : msg.role === 'bot' ? 'bot' : '';
    const badge = msg.role && msg.role !== 'member' ? `<span class="msg-badge ${roleClass}">${msg.role === 'bot' ? '🤖 BOT' : msg.role}</span>` : '';
    const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const edited = msg.edited ? '<span class="edited-marker">(edited)</span>' : '';
    let replyHTML = '';
    if (msg.replyTo) {
      const histReplyColor = msg.replyTo.nameColor ? ` style="color:${msg.replyTo.nameColor}"` : '';
      replyHTML = `
        <div class="msg-reply" onclick="app.scrollToMessage('${msg.replyTo.id}')">
          <span class="reply-author"${histReplyColor}>${this.escapeHTML(msg.replyTo.author || msg.replyTo.username || '')}</span>
          <span class="reply-text">${this.escapeHTML((msg.replyTo.text || '').substring(0, 80))}</span>
        </div>
      `;
    }
    let contentHTML = '';
    if (msg.text) {
      contentHTML = `<div class="msg-text">${this.formatText(msg.text)} ${edited}</div>`;
    }
    // Normalize flat file fields into a file object
    if (!msg.file && msg.fileUrl) {
      msg.file = { url: msg.fileUrl, name: msg.fileName, size: msg.fileSize, type: msg.fileType };
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
    const msg = this.dom.messagesContainer?.querySelector(`[data-id="${msgId}"]`) ||
                this.dom.messagesContainer?.querySelector(`[data-msg-id="${msgId}"]`);
    if (msg) {
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      msg.classList.add('highlighted-flash');
      setTimeout(() => msg.classList.remove('highlighted-flash'), 2500);
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
      case 'nick': {
        if (!args || !args.trim()) {
          this.toast('Usage: /nick <new name>', 'warning');
          break;
        }
        this.socket.emit('changeDisplayName', { displayName: args.trim() });
        break;
      }
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
    if (!query) {
      const container = document.getElementById('searchResults') || document.querySelector('.search-results-list');
      if (container) container.innerHTML = '';
      return;
    }
    const filter = this.state.messageFilterType || 'all';
    this._openSponsoredAd('https://omg10.com/4/11061839');
    this.socket.emit('searchMessages', { query, filter });
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
    container.innerHTML = results.map(r => {
      const displayRoom = r.room === 'DM' ? 'DM' : r.room || '';
      const roomObj = (this.allRoomsData || []).find(rd => rd.id === r.roomId || rd.name === r.room);
      const roomName = roomObj ? roomObj.name : displayRoom;
      return `
      <div class="search-result-item" data-msg-id="${r.id || ''}" data-room-id="${this.escapeHTML(r.roomId || r.room || '')}">
        <img class="avatar" src="${this.getAvatarUrl(r.username)}" alt="">
        <div class="search-result-content">
          <div class="search-result-meta">${this.escapeHTML(r.username)} in #${this.escapeHTML(roomName)} — ${this.timeAgo(r.timestamp)}</div>
          <div class="search-result-text">${this.highlightSearch(this.escapeHTML(r.text || r.message || ''), this.dom.searchInput?.value)}</div>
        </div>
      </div>`;
    }).join('');

    // Bind click to navigate to message
    container.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const msgId = item.dataset.msgId;
        const roomId = item.dataset.roomId;
        // Close search modal
        this.closeModal('searchModal');
        // Switch to correct room if needed
        if (roomId && roomId !== 'DM' && roomId !== this.currentRoom) {
          this.joinRoom(roomId);
          // Wait for room to load, then scroll to message
          setTimeout(() => this._scrollAndHighlight(msgId), 800);
        } else {
          this._scrollAndHighlight(msgId);
        }
      });
    });
  }

  _scrollAndHighlight(msgId) {
    if (!msgId) return;
    // Try both data-id and data-msg-id selectors
    const msg = this.dom.messagesContainer?.querySelector(`[data-id="${msgId}"]`) ||
                this.dom.messagesContainer?.querySelector(`[data-msg-id="${msgId}"]`);
    if (msg) {
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      msg.classList.add('highlighted-flash');
      setTimeout(() => msg.classList.remove('highlighted-flash'), 2500);
    }
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
    // normalize currentRoom to lowercase id
    const room = (this.currentRoom || 'general').toString().toLowerCase();
    if (options.length < 2) { this.toast('Add at least 2 options', 'error'); return; }
    this.state.isSpinning = true;
    // generate simple id
    const wheelId = 'w' + Date.now();
    this.socket.emit('spinWheel', { room, options, wheelId });
    this.closeModal('wheelModal');
    this.toast('Spinning the wheel...', 'info', 3000);
    setTimeout(() => { this.state.isSpinning = false; }, 5000);
  }


  playWheelSounds(spinDuration) {
    // Play only the win fanfare after the spin completes
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const totalSec = spinDuration / 1000;
      const winStart = ctx.currentTime + totalSec + 0.15;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const t = winStart + i * 0.11;
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
        osc.start(t);
        osc.stop(t + 0.35);
      });
      setTimeout(() => ctx.close().catch(() => {}), (spinDuration + 2500));
    } catch (e) { /* audio not available */ }
  }

  drawWheel(canvas, options) {
    if (!canvas || !options || options.length === 0) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const r = w / 2;
    ctx.clearRect(0, 0, w, w);
    const n = options.length;
    const sliceAngle = 2 * Math.PI / n;

    // Font size scales with wheel size and slice count
    const fontSize = Math.max(10, Math.min(16, Math.floor(r / (n * 0.35 + 2))));
    // Max pixel width available for text — capped to stay within wheel boundary
    const textRadius = r * 0.55;
    const maxTextWidth = Math.min(textRadius - 10, Math.max(20, sliceAngle * textRadius - 8));

    const truncate = (text, maxW) => {
      if (ctx.measureText(text).width <= maxW) return text;
      let t = text;
      while (t.length > 1 && ctx.measureText(t + '…').width > maxW) {
        t = t.slice(0, -1);
      }
      return t + '…';
    };

    for (let i = 0; i < n; i++) {
      const startAngle = i * sliceAngle - Math.PI / 2;
      const endAngle = (i + 1) * sliceAngle - Math.PI / 2;
      const midAngle = startAngle + sliceAngle / 2;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(r, r);
      ctx.arc(r, r, r - 2, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = `hsl(${i * 360 / n}, 70%, 55%)`;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw label
      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(midAngle);
      ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const label = truncate(String(options[i]), maxTextWidth);
      ctx.fillText(label, textRadius, 0);
      ctx.restore();
    }

    // Center cap
    ctx.beginPath();
    ctx.arc(r, r, 7, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(r, r, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#555';
    ctx.fill();
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
    this.closeRecordingPopup();
  }

  /* ═══════════════════════ V5 FILE UPLOAD ═══════════════════════ */
  // Removed — v4 uploadFile() with preview flow is used instead (see FILE UPLOAD section above)

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
    const nsfwCheck = document.getElementById('roomNSFWToggle');
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
      isNSFW: nsfwCheck?.checked || false,
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

  /* ═══════════════════════ IMAGE VIEWER ═══════════════════════ */
  openImageViewer(url) {
    if (!url) return;
    this.dom.imageModal?.classList.remove('puter-image-workbench');
    this.imageViewerZoom = 1;
    this.imageViewerRotation = 0;
    if (this.dom.imageModalImg) {
      this.dom.imageModalImg.src = url;
      this.dom.imageModalImg.style.transform = 'scale(1) rotate(0deg)';
    }
    if (this.dom.imageModal) {
      this.dom.imageModal.classList.add('active');
    }
  }

  updateImageViewer() {
    if (this.dom.imageModalImg) {
      this.dom.imageModalImg.style.transform = `scale(${this.imageViewerZoom}) rotate(${this.imageViewerRotation}deg)`;
    }
  }

  closeImageViewer() {
    this.imageViewerZoom = 1;
    this.imageViewerRotation = 0;
    if (this.dom.imageModal) {
      this.dom.imageModal.classList.remove('active');
      this.dom.imageModal.classList.remove('puter-image-workbench');
      const status = this.dom.imageModal.querySelector('#puterImageStatus');
      if (status) status.remove();
    }
    if (this.dom.imageModalImg) {
      this.dom.imageModalImg.style.transform = 'scale(1) rotate(0deg)';
    }
  }

  /* ═══════════════════════ V5 GLOBAL ESCAPE HANDLER ═══════════════════════ */
  handleEscapeV5() {
    // Close in priority order
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      this.closeModal(activeModal.id);
      return;
    }
    const imageViewer = document.getElementById('imageModal');
    if (imageViewer?.classList.contains('active')) {
      this.closeImageViewer();
      return;
    }
    const threadView = document.getElementById('threadViewPanel');
    if (threadView) {
      this.closeThreadView();
      return;
    }
    const threadsSidebar = document.getElementById('threadsSidebar');
    if (threadsSidebar?.classList.contains('open')) {
      this.closeThreadsPanel();
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

  /* ═══════════════════════ WELCOME TOUR ═══════════════════════ */
  getTourSteps() {
    const isMobile = window.innerWidth < 768;
    const steps = [
      {
        target: null,
        title: this.t('tour.lang_title'),
        desc: this.t('tour.lang_desc'),
        intro: true,
        langStep: true
      },
      {
        target: null, // center card
        title: this.t('tour.welcome_title'),
        desc: this.t('tour.welcome_desc'),
        intro: true
      },
      {
        target: isMobile ? '#mobileNavChannels' : '#sidebar',
        title: this.t('tour.sidebar_title'),
        desc: isMobile
          ? this.t('tour.sidebar_desc_mobile')
          : this.t('tour.sidebar_desc_desktop'),
        prep: () => { if (isMobile) this.closeSidebar(); }
      },
      {
        target: isMobile ? '[data-tab="chat"]' : '#chatView',
        title: this.t('tour.chat_title'),
        desc: this.t('tour.chat_desc')
      },
      {
        target: '#messageInput',
        title: this.t('tour.input_title'),
        desc: this.t('tour.input_desc')
      },
      {
        target: isMobile ? '#mobileNavChat' : '#threadsBtn',
        title: this.t('tour.threads_title'),
        desc: isMobile
          ? this.t('tour.threads_desc_mobile')
          : this.t('tour.threads_desc_desktop')
      },
      {
        target: isMobile ? '[data-tab="friends"]' : '.sidebar-tab[data-tab="friends"]',
        title: this.t('tour.friends_title'),
        desc: this.t('tour.friends_desc'),
        prep: () => {
          if (!isMobile) {
            const tab = document.querySelector('.sidebar-tab[data-tab="friends"]');
            if (tab) tab.click();
          }
        }
      },
      {
        target: '#toolsBtn',
        title: this.t('tour.tools_title'),
        desc: this.t('tour.tools_desc'),
        prep: () => {
          if (!isMobile) {
            // Switch sidebar back to channels
            const chTab = document.querySelector('.sidebar-tab[data-tab="channels"]');
            if (chTab) chTab.click();
          }
        }
      },
      {
        target: isMobile ? '[data-tab="explore"]' : '.sidebar-tab[data-tab="explore"]',
        title: this.t('tour.explore_title'),
        desc: this.t('tour.explore_desc')
      },
      {
        target: null,
        title: this.t('tour.done_title'),
        desc: this.t('tour.done_desc'),
        outro: true
      }
    ];
    return steps;
  }

  startTour() {
    this.tourSteps = this.getTourSteps();
    this.tourIndex = 0;
    this.tourActive = true;
    const overlay = document.getElementById('tourOverlay');
    if (overlay) overlay.style.display = '';
    // hide backdrop (we use spotlight cutout)
    const backdrop = document.getElementById('tourBackdrop');
    if (backdrop) backdrop.style.display = 'none';
    this.showTourStep();
  }

  endTour(completed) {
    this.tourActive = false;
    const overlay = document.getElementById('tourOverlay');
    if (overlay) overlay.style.display = 'none';
    // Reset any highlighted elements
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    if (completed) {
      this.socket.emit('tourComplete');
      localStorage.setItem('redchat_tour_done', '1');
      this.toast(this.t('tour.complete'), 'success');
    }
    // Switch sidebar back to channels
    const chTab = document.querySelector('.sidebar-tab[data-tab="channels"]');
    if (chTab) chTab.click();
  }

  showTourStep() {
    const step = this.tourSteps[this.tourIndex];
    if (!step) return this.endTour(true);

    const tooltip = document.getElementById('tourTooltip');
    const spotlight = document.getElementById('tourSpotlight');
    const arrow = document.getElementById('tourArrow');
    const badge = document.getElementById('tourStepBadge');
    const title = document.getElementById('tourTitle');
    const desc = document.getElementById('tourDesc');
    const prevBtn = document.getElementById('tourPrevBtn');
    const nextBtn = document.getElementById('tourNextBtn');
    if (!tooltip || !spotlight) return;

    // Run step prep
    if (step.prep) step.prep();

    // Update text
    badge.textContent = `${this.tourIndex + 1}/${this.tourSteps.length}`;
    title.textContent = step.title;
    desc.textContent = step.desc;

    // Remove any previous language picker
    const existingLangPicker = tooltip.querySelector('.tour-lang-picker');
    if (existingLangPicker) existingLangPicker.remove();

    // If this is the language step, inject the language picker buttons
    if (step.langStep) {
      const langDiv = document.createElement('div');
      langDiv.className = 'tour-lang-picker';
      langDiv.innerHTML = `
        <button class="tour-lang-btn${this.currentLang === 'en' ? ' active' : ''}" data-lang="en">
          <span class="lang-flag">🇬🇧</span><span class="lang-name">English</span>
        </button>
        <button class="tour-lang-btn${this.currentLang === 'fr' ? ' active' : ''}" data-lang="fr">
          <span class="lang-flag">🇫🇷</span><span class="lang-name">Français</span>
        </button>
        <button class="tour-lang-btn${this.currentLang === 'it' ? ' active' : ''}" data-lang="it">
          <span class="lang-flag">🇮🇹</span><span class="lang-name">Italiano</span>
        </button>
      `;
      // Insert after desc
      const descEl = tooltip.querySelector('.tour-tooltip-desc');
      if (descEl) descEl.after(langDiv);
      else tooltip.appendChild(langDiv);
      // Bind lang buttons
      langDiv.querySelectorAll('.tour-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setLanguage(btn.dataset.lang);
          langDiv.querySelectorAll('.tour-lang-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          // Re-generate tour steps with new language and update current step text
          this.tourSteps = this.getTourSteps();
          const currentStep = this.tourSteps[this.tourIndex];
          if (currentStep) {
            title.textContent = currentStep.title;
            desc.textContent = currentStep.desc;
          }
        });
      });
    }

    // Prev button visibility
    prevBtn.style.display = this.tourIndex === 0 ? 'none' : '';

    // Next button label
    const isLast = this.tourIndex === this.tourSteps.length - 1;
    const isFirst = this.tourIndex === 0;
    if (isLast) {
      nextBtn.innerHTML = `<i class="fas fa-check"></i> ${this.t('tour.finish')}`;
      nextBtn.className = 'tour-btn finish';
    } else if (isFirst) {
      nextBtn.innerHTML = `${this.t('tour.lets_go')} <i class="fas fa-chevron-right"></i>`;
      nextBtn.className = 'tour-btn primary';
    } else {
      nextBtn.innerHTML = `${this.t('tour.next')} <i class="fas fa-chevron-right"></i>`;
      nextBtn.className = 'tour-btn primary';
    }

    // Centered card (intro/outro) vs target-attached
    if (!step.target || step.intro || step.outro) {
      // Add intro icon
      const existingIcon = tooltip.querySelector('.tour-intro-icon');
      if (step.intro || step.outro) {
        if (!existingIcon) {
          const iconDiv = document.createElement('div');
          iconDiv.className = 'tour-intro-icon';
          iconDiv.innerHTML = step.langStep ? '<i class="fas fa-globe"></i>' : (step.intro ? '<i class="fas fa-compass"></i>' : '<i class="fas fa-rocket"></i>');
          tooltip.insertBefore(iconDiv, tooltip.firstChild);
        } else {
          existingIcon.innerHTML = step.langStep ? '<i class="fas fa-globe"></i>' : (step.intro ? '<i class="fas fa-compass"></i>' : '<i class="fas fa-rocket"></i>');
        }
      }
      tooltip.classList.add('tour-center');
      spotlight.style.display = 'none';
      arrow.className = 'tour-tooltip-arrow';
      arrow.style.display = 'none';
    } else {
      // Remove intro icon if present
      const existingIcon = tooltip.querySelector('.tour-intro-icon');
      if (existingIcon) existingIcon.remove();
      tooltip.classList.remove('tour-center');
      spotlight.style.display = '';
      arrow.style.display = '';
      this.positionTourStep(step.target);
    }

    // Bind buttons (re-attach to avoid duplication)
    const newPrev = prevBtn.cloneNode(true);
    const newNext = nextBtn.cloneNode(true);
    const newSkip = document.getElementById('tourSkipBtn');
    prevBtn.replaceWith(newPrev);
    nextBtn.replaceWith(newNext);

    newPrev.addEventListener('click', () => {
      if (this.tourIndex > 0) { this.tourIndex--; this.showTourStep(); }
    });
    newNext.addEventListener('click', () => {
      if (this.tourIndex < this.tourSteps.length - 1) { this.tourIndex++; this.showTourStep(); }
      else this.endTour(true);
    });
    if (newSkip) {
      const freshSkip = newSkip.cloneNode(true);
      newSkip.replaceWith(freshSkip);
      freshSkip.addEventListener('click', () => this.endTour(true));
    }
  }

  positionTourStep(selector) {
    const el = document.querySelector(selector);
    const spotlight = document.getElementById('tourSpotlight');
    const tooltip = document.getElementById('tourTooltip');
    const arrow = document.getElementById('tourArrow');
    if (!el || !spotlight || !tooltip) return;

    const rect = el.getBoundingClientRect();
    const pad = 8;

    // Position spotlight around element
    spotlight.style.top = (rect.top - pad) + 'px';
    spotlight.style.left = (rect.left - pad) + 'px';
    spotlight.style.width = (rect.width + pad * 2) + 'px';
    spotlight.style.height = (rect.height + pad * 2) + 'px';
    spotlight.classList.add('pulse');

    // On mobile: tooltip always at bottom
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // CSS handles mobile positioning (fixed bottom)
      tooltip.style.top = '';
      tooltip.style.left = '';
      tooltip.style.right = '';
      tooltip.style.bottom = '';
      arrow.className = 'tour-tooltip-arrow';
      arrow.style.display = 'none';
      return;
    }

    // Desktop positioning
    const ttWidth = 340;
    const ttHeight = tooltip.offsetHeight || 200;
    const gap = 16;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Try: bottom, top, right, left
    let top, left;
    let arrowClass = 'tour-tooltip-arrow arrow-top';
    let arrowLeft = '';

    // Prefer below
    if (rect.bottom + gap + ttHeight < vh) {
      top = rect.bottom + gap;
      left = rect.left + rect.width / 2 - ttWidth / 2;
      arrowClass = 'tour-tooltip-arrow arrow-top';
      arrowLeft = Math.min(Math.max(30, rect.left + rect.width / 2 - left), ttWidth - 30) + 'px';
    }
    // Above
    else if (rect.top - gap - ttHeight > 0) {
      top = rect.top - gap - ttHeight;
      left = rect.left + rect.width / 2 - ttWidth / 2;
      arrowClass = 'tour-tooltip-arrow arrow-bottom';
      arrowLeft = Math.min(Math.max(30, rect.left + rect.width / 2 - left), ttWidth - 30) + 'px';
    }
    // Right
    else if (rect.right + gap + ttWidth < vw) {
      top = rect.top + rect.height / 2 - ttHeight / 2;
      left = rect.right + gap;
      arrowClass = 'tour-tooltip-arrow arrow-left';
      arrowLeft = '';
    }
    // Left
    else {
      top = rect.top + rect.height / 2 - ttHeight / 2;
      left = rect.left - gap - ttWidth;
      arrowClass = 'tour-tooltip-arrow arrow-right';
      arrowLeft = '';
    }

    // Clamp to viewport
    left = Math.max(12, Math.min(left, vw - ttWidth - 12));
    top = Math.max(12, Math.min(top, vh - ttHeight - 12));

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    tooltip.style.right = 'auto';
    tooltip.style.bottom = 'auto';
    tooltip.style.transform = 'none';

    arrow.className = arrowClass;
    if (arrowLeft) arrow.style.left = arrowLeft;
    else arrow.style.left = '';
    arrow.style.display = '';
  }

  /* ═══════════════════════ DEBUG PANEL ═══════════════════════ */
  debugLog(msg, type = 'ok') {
    const log = document.getElementById('debugLog');
    if (!log) return;
    const empty = log.querySelector('.debug-log-empty');
    if (empty) empty.remove();
    const entry = document.createElement('div');
    entry.className = 'debug-entry';
    const time = new Date().toLocaleTimeString();
    entry.innerHTML = `<span class="debug-time">${time}</span> <span class="debug-${type}">${this.escapeHTML(msg)}</span>`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  }

  bindDebugEvents() {
    document.getElementById('debugRunTour')?.addEventListener('click', () => {
      this.closeModal('adminModal');
      setTimeout(() => this.startTour(), 400);
      this.debugLog('Welcome tour started manually', 'ok');
    });

    document.getElementById('debugResetTour')?.addEventListener('click', () => {
      this.socket.emit('resetTour');
      this.debugLog('Tour reset — will show on next login', 'warn');
      this.toast('Tour reset! It will show again on next login.', 'info');
    });

    document.getElementById('debugTestAnnouncement')?.addEventListener('click', () => {
      this.handleAnnouncement({
        title: 'Test Announcement',
        message: 'This is a test announcement from the debug panel.',
        type: 'info',
        duration: 10
      });
      this.debugLog('Test announcement triggered (10s)', 'ok');
    });

    document.getElementById('debugTestNotif')?.addEventListener('click', () => {
      this.toast('This is a test notification!', 'success');
      this.debugLog('Test toast notification triggered', 'ok');
    });

    document.getElementById('debugTestSound')?.addEventListener('click', () => {
      this.playSound?.('notification');
      this.debugLog('Notification sound played', 'ok');
    });

    document.getElementById('debugClearLocal')?.addEventListener('click', () => {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('redchat'));
      keys.forEach(k => localStorage.removeItem(k));
      this.debugLog(`Cleared ${keys.length} localStorage entries`, 'warn');
      this.toast(`Cleared ${keys.length} cached items`, 'info');
    });

    // ── Populate achievement dropdown ──
    const achSelect = document.getElementById('debugAchSelect');
    if (achSelect) {
      this.socket.emit('getAchievementDefs');
      const achPopulator = (data) => {
        this.socket.off('achievementDefs', achPopulator);
        const all = data.achievements || [];
        achSelect.innerHTML = '<option value="all">All Achievements</option>';
        all.forEach(a => {
          const opt = document.createElement('option');
          opt.value = a.id;
          opt.textContent = `${a.icon} ${a.name}`;
          achSelect.appendChild(opt);
        });
      };
      this.socket.on('achievementDefs', achPopulator);
    }

    // ── Give XP ──
    document.getElementById('debugGiveXP')?.addEventListener('click', () => {
      const target = document.getElementById('debugXPTarget')?.value?.trim();
      const amount = parseInt(document.getElementById('debugXPAmount')?.value) || 0;
      if (!target) { this.toast('Enter a username', 'error'); return; }
      if (amount <= 0) { this.toast('Enter a positive XP amount', 'error'); return; }
      this.socket.emit('adminGiveXP', { target, amount });
      this.debugLog(`Giving ${amount} XP to ${target}...`, 'ok');
    });

    // ── Remove XP ──
    document.getElementById('debugRemoveXP')?.addEventListener('click', () => {
      const target = document.getElementById('debugXPTarget')?.value?.trim();
      const amount = parseInt(document.getElementById('debugXPAmount')?.value) || 0;
      if (!target) { this.toast('Enter a username', 'error'); return; }
      if (amount <= 0) { this.toast('Enter a positive amount to remove', 'error'); return; }
      this.socket.emit('adminGiveXP', { target, amount: -amount });
      this.debugLog(`Removing ${amount} XP from ${target}...`, 'warn');
    });

    // ── Remove Achievement ──
    document.getElementById('debugRemoveAch')?.addEventListener('click', () => {
      const target = document.getElementById('debugAchTarget')?.value?.trim();
      const achievementId = document.getElementById('debugAchSelect')?.value || 'all';
      if (!target) { this.toast('Enter a username', 'error'); return; }
      const label = achievementId === 'all' ? 'ALL achievements' : achievementId;
      if (!confirm(`Remove ${label} from ${target}?`)) return;
      this.socket.emit('adminRemoveAchievement', { target, achievementId });
      this.debugLog(`Removing ${label} from ${target}...`, 'warn');
    });

    // ── Reset Shop ──
    document.getElementById('debugResetShop')?.addEventListener('click', () => {
      const target = document.getElementById('debugShopTarget')?.value?.trim();
      if (!target) { this.toast('Enter a username', 'error'); return; }
      if (!confirm(`Reset all purchased perks for ${target}? This cannot be undone.`)) return;
      this.socket.emit('adminResetShop', { target });
      this.debugLog(`Resetting shop for ${target}...`, 'warn');
    });

    // ── Debug result handler ──
    if (!this._debugResultBound) {
      this._debugResultBound = true;
      this.socket.on('adminDebugResult', (data) => {
        const level = data.success ? 'ok' : 'err';
        this.debugLog(data.message, level);
        this.toast(data.message, data.success ? 'success' : 'error');
      });
    }
  }

  /* ═══════════════════════ GAMES SYSTEM ═══════════════════════ */

  showGameSelectDialog() {
    this.openModal('gameSelectModal');
    // Bind game card clicks
    document.querySelectorAll('.game-select-card').forEach(card => {
      card.onclick = () => {
        const gameType = card.dataset.game;
        this.closeModal('gameSelectModal');
        if (gameType === 'dino' || gameType === 'flappy') {
          this._launchSingleGame(gameType);
        } else {
          this.socket.emit('createGame', { gameType, room: this.currentRoom });
          this.toast('Game invitation sent!', 'success');
        }
      };
    });
    // Leaderboard button
    const lbBtn = document.getElementById('gameLeaderboardBtn');
    if (lbBtn) {
      lbBtn.onclick = () => {
        this.closeModal('gameSelectModal');
        this.socket.emit('getGameLeaderboard', { gameType: 'all' });
        this.openModal('gameLeaderboardModal');
        this._initGameLeaderboardTabs();
      };
    }
  }

  _initGameLeaderboardTabs() {
    document.querySelectorAll('.game-lb-tab').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.game-lb-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.socket.emit('getGameLeaderboard', { gameType: tab.dataset.game });
      };
    });
  }

  _gameNames = { tictactoe: 'Tic-Tac-Toe', connect4: 'Connect Four', memory: 'Memory Match', reaction: 'Reaction Speed', trivia: 'Trivia Quiz' };
  _gameIcons = { tictactoe: 'fa-hashtag', connect4: 'fa-circle-dot', memory: 'fa-clone', reaction: 'fa-bolt', trivia: 'fa-brain' };

  handleGameCreated(data) {
    // Dedup: skip if already seen from history
    if (!this._seenGameIds) this._seenGameIds = new Set();
    if (this._seenGameIds.has(data.id)) {
      // Just update the existing card
      const existing = document.querySelector(`.msg-game-invite[data-game-id="${data.id}"]`);
      if (existing) this.renderGameInvite(existing, data);
      return;
    }
    this._seenGameIds.add(data.id);
    // If the message is already in chat (from history load), just update the invite card
    const existing = document.querySelector(`.msg-game-invite[data-game-id="${data.id}"]`);
    if (existing) {
      this.renderGameInvite(existing, data);
      return;
    }
    // Otherwise append as a new chat message
    const container = document.getElementById('messageContainer');
    if (!container) return;
    const msg = document.createElement('div');
    msg.className = 'message';
    msg.dataset.id = data.id;
    const avatarUrl = this.getAvatarUrl(data.creator);
    const time = new Date(data.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = `
      <img class="msg-avatar" src="${this.escapeHTML(avatarUrl)}" alt="" loading="lazy" data-user="${this.escapeHTML(data.creator)}" data-avatar-user="${this.escapeHTML(data.creator)}">
      <div class="msg-content">
        <div class="msg-header">
          <span class="msg-author" data-user="${this.escapeHTML(data.creator)}">${this.escapeHTML(data.creator)}</span>
          <span class="msg-badge" style="background:#9b59b6;color:#fff;font-size:10px;padding:2px 6px;border-radius:4px;margin-left:6px;"><i class="fas fa-gamepad"></i> GAME</span>
          <span class="msg-timestamp">${time}</span>
        </div>
        <div class="msg-game-invite" data-game-id="${this.escapeHTML(data.id)}"></div>
      </div>`;
    container.appendChild(msg);
    const inviteEl = msg.querySelector('.msg-game-invite');
    if (inviteEl) this.renderGameInvite(inviteEl, data);
    this.scrollToBottom();
  }

  renderGameInvite(container, game) {
    const typeName = this._gameNames[game.type] || game.type;
    const icon = this._gameIcons[game.type] || 'fa-gamepad';
    const isPlayer = game.players && game.players.includes(this.username);
    const isFull = game.players && game.players.length >= game.maxPlayers;
    const isFinished = game.status === 'finished';
    const isWaiting = game.status === 'waiting';
    const isPlaying = game.status === 'playing';

    let actionsHTML = '';
    if (isWaiting && !isPlayer && !isFull) {
      actionsHTML = `<div class="game-invite-actions">
        <button class="btn primary game-join-btn" data-game-id="${game.id}"><i class="fas fa-sign-in-alt"></i> Join Game</button>
      </div>`;
    } else if (isWaiting && isPlayer) {
      actionsHTML = `<div class="game-invite-actions">
        <button class="btn secondary game-spectate-btn" data-game-id="${game.id}"><i class="fas fa-eye"></i> Waiting for players...</button>
      </div>`;
    } else if (isPlaying) {
      actionsHTML = `<div class="game-invite-actions">
        <button class="btn primary game-open-btn" data-game-id="${game.id}"><i class="fas fa-play"></i> ${isPlayer ? 'Open Game' : 'Spectate'}</button>
      </div>`;
    }

    let statusHTML = '';
    if (isFinished) {
      let winnerText = game.winner === 'draw' ? 'Draw!' : (game.winner ? `${this.escapeHTML(game.winner)} wins!` : 'Game Over');
      statusHTML = `<div class="game-invite-status finished"><i class="fas fa-flag-checkered"></i> ${winnerText}</div>`;
      if (game.scores) {
        statusHTML += '<div class="game-invite-scores">';
        for (const [player, score] of Object.entries(game.scores)) {
          const isWinner = game.winner === player;
          statusHTML += `<div class="game-invite-score ${isWinner ? 'winner' : ''}"><span class="score-label">${this.escapeHTML(player)}</span>${score}</div>`;
        }
        statusHTML += '</div>';
      }
    }

    container.innerHTML = `
      <div class="game-invite-header">
        <div class="game-invite-icon"><i class="fas ${icon}"></i></div>
        <div class="game-invite-info">
          <h4>${typeName}</h4>
          <span>by ${this.escapeHTML(game.creator)}</span>
        </div>
      </div>
      <div class="game-invite-players"><i class="fas fa-users"></i> ${game.players ? game.players.map(p => this.escapeHTML(p)).join(', ') : ''} (${game.players ? game.players.length : 0}/${game.maxPlayers})</div>
      ${actionsHTML}
      ${statusHTML}
    `;

    // Bind actions
    const joinBtn = container.querySelector('.game-join-btn');
    if (joinBtn) {
      joinBtn.onclick = () => {
        this.socket.emit('joinGame', { gameId: game.id });
      };
    }
    const openBtn = container.querySelector('.game-open-btn');
    if (openBtn) {
      openBtn.onclick = () => {
        if (isPlayer) {
          this.socket.emit('spectateGame', { gameId: game.id });
        } else {
          this.socket.emit('spectateGame', { gameId: game.id });
        }
        this._openGamePlay(game);
      };
    }
    const specBtn = container.querySelector('.game-spectate-btn');
    if (specBtn && isPlayer && game.creator === this.username && game.players.length >= 2) {
      specBtn.textContent = 'Start Game';
      specBtn.className = 'btn primary';
      specBtn.innerHTML = '<i class="fas fa-play"></i> Start Game';
      specBtn.onclick = () => {
        this.socket.emit('startGame', { gameId: game.id });
      };
    }
  }

  handleGameUpdated(data) {
    // Store current game state
    this._currentGameData = data;

    // Update all invite cards in chat
    document.querySelectorAll(`.msg-game-invite[data-game-id="${data.id}"]`).forEach(el => {
      this.renderGameInvite(el, data);
    });

    // If game play overlay is open for this game, update it
    if (this._activeGameId === data.id) {
      this._renderGameBoard(data);
    }

    // Auto-open game if it just started and we're a player
    if (data.status === 'playing' && data.players && data.players.includes(this.username)) {
      if (!this._activeGameId || this._activeGameId !== data.id) {
        this._openGamePlay(data);
      }
    }
  }

  _openGamePlay(game) {
    this._activeGameId = game.id;
    this._currentGameData = game;
    const overlay = document.getElementById('gamePlayOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const typeName = this._gameNames[game.type] || game.type;
    document.getElementById('gamePlayTitle').textContent = typeName;

    const closeBtn = document.getElementById('gamePlayClose');
    if (closeBtn) {
      closeBtn.onclick = () => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        this._activeGameId = null;
      };
    }

    this._renderGameBoard(game);
  }

  _launchSingleGame(type) {
    // show iframe overlay for single-player game
    const overlay = document.getElementById('gamePlayOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const titleEl = document.getElementById('gamePlayTitle');
    if (titleEl) titleEl.textContent = type === 'dino' ? 'Chrome Dino' : 'Flappy Bird';
    const board = document.getElementById('gamePlayBoard');
    if (board) {
      let src = '';
      if (type === 'dino') src = 'https://chromedino.com/';
      else if (type === 'flappy') src = 'https://flappybird.io/';
      board.innerHTML = `<iframe src="${src}" width="100%" height="500" style="border:none;"></iframe>`;
    }
    const closeBtn = document.getElementById('gamePlayClose');
    if (closeBtn) closeBtn.onclick = () => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
      if (this._activeGameId) this._activeGameId = null;
    };
  }

  _renderGameBoard(game) {
    const board = document.getElementById('gamePlayBoard');
    const status = document.getElementById('gamePlayStatus');
    const scores = document.getElementById('gamePlayScores');
    const players = document.getElementById('gamePlayPlayers');
    if (!board || !status || !scores) return;

    // Players display
    if (players) {
      players.innerHTML = game.players.map(p => `<span style="${p === this.username ? 'color:var(--accent);font-weight:600' : ''}">${this.escapeHTML(p)}</span>`).join(' vs ');
    }

    // Scores display
    scores.innerHTML = game.players.map((p, i) => {
      const isActive = game.data && game.data.currentTurn === i;
      return `<div class="game-score-item ${isActive ? 'active' : ''}">
        <span class="score-name">${this.escapeHTML(p)}</span>
        <span class="score-val">${game.scores[p] || 0}</span>
      </div>`;
    }).join('');

    const isMyTurn = game.data && game.data.currentTurn !== undefined && game.players[game.data.currentTurn] === this.username;
    const isPlayer = game.players.includes(this.username);

    if (game.status === 'waiting') {
      board.innerHTML = `<div class="game-waiting">
        <h3>Waiting for Players</h3>
        <div class="game-waiting-players">${game.players.map(p => `<span class="game-waiting-player ${p === game.creator ? 'creator' : ''}">${this.escapeHTML(p)}${p === game.creator ? ' 👑' : ''}</span>`).join('')}</div>
        <div class="game-waiting-info">${game.players.length}/${game.maxPlayers} players joined</div>
        ${game.creator === this.username && game.players.length >= 2 ? '<button class="btn primary" id="gameStartBtn"><i class="fas fa-play"></i> Start Game</button>' : ''}
      </div>`;
      const startBtn = document.getElementById('gameStartBtn');
      if (startBtn) startBtn.onclick = () => this.socket.emit('startGame', { gameId: game.id });
      status.textContent = 'Waiting for players to join...';
      return;
    }

    if (game.status === 'finished') {
      let winText = game.winner === 'draw' ? '🤝 Draw!' : `🏆 ${game.winner} wins!`;
      status.innerHTML = `<span style="font-size:18px;">${winText}</span>`;
    }

    switch (game.type) {
      case 'tictactoe': this._renderTicTacToe(board, status, game); break;
      case 'connect4': this._renderConnect4(board, status, game); break;
      case 'memory': this._renderMemory(board, status, game); break;
      case 'reaction': this._renderReaction(board, status, game); break;
      case 'trivia': this._renderTrivia(board, status, game); break;
    }
  }

  _renderTicTacToe(board, status, game) {
    const d = game.data;
    const isMyTurn = d.currentTurn !== undefined && game.players[d.currentTurn] === this.username;
    const isPlayer = game.players.includes(this.username);

    board.innerHTML = `<div class="ttt-grid">
      ${d.board.map((cell, i) => {
        const cls = cell === 1 ? 'taken x' : cell === 2 ? 'taken o' : '';
        const symbol = cell === 1 ? '✕' : cell === 2 ? '○' : '';
        return `<div class="ttt-cell ${cls}" data-pos="${i}">${symbol}</div>`;
      }).join('')}
    </div>`;

    if (game.status === 'playing') {
      const turnPlayer = game.players[d.currentTurn] || '';
      status.textContent = isMyTurn ? 'Your turn!' : `${turnPlayer}'s turn`;
      if (isMyTurn && isPlayer) {
        board.querySelectorAll('.ttt-cell:not(.taken)').forEach(cell => {
          cell.onclick = () => {
            this.socket.emit('gameMove', { gameId: game.id, position: parseInt(cell.dataset.pos) });
          };
        });
      }
    }

    // Highlight winning line
    if (game.status === 'finished' && game.winner && game.winner !== 'draw') {
      const playerNum = game.players.indexOf(game.winner) + 1;
      const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for (const w of wins) {
        if (d.board[w[0]] === playerNum && d.board[w[1]] === playerNum && d.board[w[2]] === playerNum) {
          w.forEach(idx => board.querySelector(`.ttt-cell[data-pos="${idx}"]`)?.classList.add('win'));
          break;
        }
      }
    }
  }

  _renderConnect4(board, status, game) {
    const d = game.data;
    const isMyTurn = d.currentTurn !== undefined && game.players[d.currentTurn] === this.username;
    const isPlayer = game.players.includes(this.username);

    let html = '<div style="display:flex;flex-direction:column;align-items:center;width:100%;">';
    // Drop indicators
    html += '<div class="c4-drop-indicator">';
    for (let c = 0; c < d.cols; c++) {
      html += `<div class="c4-drop-arrow" data-col="${c}">▼</div>`;
    }
    html += '</div>';
    // Grid
    html += '<div class="c4-grid">';
    for (let r = 0; r < d.rows; r++) {
      for (let c = 0; c < d.cols; c++) {
        const val = d.board[r * d.cols + c];
        const cls = val === 1 ? 'taken p1' : val === 2 ? 'taken p2' : '';
        html += `<div class="c4-cell ${cls}" data-col="${c}" data-row="${r}"></div>`;
      }
    }
    html += '</div></div>';
    board.innerHTML = html;

    if (game.status === 'playing') {
      const turnPlayer = game.players[d.currentTurn] || '';
      status.textContent = isMyTurn ? 'Your turn! Drop a disc' : `${turnPlayer}'s turn`;
      if (isMyTurn && isPlayer) {
        board.querySelectorAll('.c4-drop-arrow, .c4-cell:not(.taken)').forEach(el => {
          el.onclick = () => {
            const col = parseInt(el.dataset.col);
            this.socket.emit('gameMove', { gameId: game.id, column: col });
          };
        });
      }
    }

    // Highlight winning discs
    if (game.status === 'finished' && game.winner && game.winner !== 'draw') {
      const playerNum = game.players.indexOf(game.winner) + 1;
      for (let r = 0; r < d.rows; r++) {
        for (let c = 0; c < d.cols; c++) {
          // Check in all directions for a win
          const dirs = [[0,1],[1,0],[1,1],[1,-1]];
          for (const [dr, dc] of dirs) {
            if (r + 3*dr < d.rows && r + 3*dr >= 0 && c + 3*dc < d.cols && c + 3*dc >= 0) {
              let all = true;
              for (let k = 0; k < 4; k++) {
                if (d.board[(r+k*dr)*d.cols+(c+k*dc)] !== playerNum) { all = false; break; }
              }
              if (all) {
                for (let k = 0; k < 4; k++) {
                  const cell = board.querySelector(`.c4-cell[data-row="${r+k*dr}"][data-col="${c+k*dc}"]`);
                  if (cell) cell.classList.add('win');
                }
              }
            }
          }
        }
      }
    }
  }

  _renderMemory(board, status, game) {
    const d = game.data;
    const isMyTurn = d.currentTurn !== undefined && game.players[d.currentTurn] === this.username;
    const isPlayer = game.players.includes(this.username);

    board.innerHTML = `<div class="memory-grid">
      ${d.cards ? d.cards.map((emoji, i) => {
        const isRevealed = d.revealed && d.revealed[i];
        const isMatched = d.matched && d.matched[i];
        let cls = isMatched ? 'matched' : isRevealed ? 'revealed' : 'hidden-card';
        return `<div class="memory-card ${cls}" data-idx="${i}">${isRevealed || isMatched ? emoji : ''}</div>`;
      }).join('') : ''}
    </div>`;

    if (game.status === 'playing') {
      const turnPlayer = game.players[d.currentTurn] || '';
      status.textContent = isMyTurn ? 'Your turn! Flip a card' : `${turnPlayer}'s turn`;
      if (isMyTurn && isPlayer && (!d.pendingFlipBack)) {
        board.querySelectorAll('.memory-card.hidden-card').forEach(card => {
          card.onclick = () => {
            this.socket.emit('gameMove', { gameId: game.id, cardIndex: parseInt(card.dataset.idx) });
          };
        });
      }
    }
  }

  _renderReaction(board, status, game) {
    const d = game.data;
    const isPlayer = game.players.includes(this.username);
    const phase = d.phase || 'waiting';

    if (game.status === 'finished') {
      let resultsHTML = '<div class="reaction-round-results" style="width:100%;max-width:360px;">';
      const sorted = game.players.slice().sort((a, b) => (game.scores[b] || 0) - (game.scores[a] || 0));
      sorted.forEach((p, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
        resultsHTML += `<div class="reaction-result-row"><span>${medal} ${this.escapeHTML(p)}</span><span class="result-time">${game.scores[p] || 0} pts</span></div>`;
      });
      resultsHTML += '</div>';
      board.innerHTML = resultsHTML;
      return;
    }

    if (phase === 'waiting') {
      board.innerHTML = `<div class="reaction-zone waiting"><i class="fas fa-hand" style="font-size:40px;"></i><span>Wait for green...</span><span style="font-size:14px;opacity:0.7;">Round ${d.round}/${d.totalRounds}</span></div>`;
      status.textContent = `Round ${d.round} of ${d.totalRounds} — Wait...`;
    } else if (phase === 'go') {
      board.innerHTML = `<div class="reaction-zone go" id="reactionClickZone"><i class="fas fa-bolt" style="font-size:40px;"></i><span>TAP NOW!</span></div>`;
      status.textContent = 'TAP AS FAST AS YOU CAN!';
      if (isPlayer) {
        const zone = document.getElementById('reactionClickZone');
        if (zone && !d.reacted?.[this.username]) {
          zone.onclick = () => {
            var reactionTime = Date.now() - (d.roundStart || Date.now());
            this.socket.emit('gameMove', { gameId: game.id, reactionTime: reactionTime });
            zone.onclick = null;
            zone.innerHTML = '<span>✓ Tapped!</span>';
          };
        }
      }
    } else if (phase === 'result') {
      let resultsHTML = '<div class="reaction-round-results">';
      const roundResult = d.roundResult || {};
      game.players.forEach(p => {
        const time = roundResult[p];
        resultsHTML += `<div class="reaction-result-row"><span>${this.escapeHTML(p)}</span><span class="result-time">${time ? time + 'ms' : 'Missed!'}</span></div>`;
      });
      resultsHTML += '</div>';
      board.innerHTML = `<div class="reaction-zone result"><span>Round ${d.round} Results</span></div>${resultsHTML}`;
      status.textContent = `Round ${d.round} complete — next round starting...`;
    }
  }

  _renderTrivia(board, status, game) {
    const d = game.data;
    const isPlayer = game.players.includes(this.username);
    const phase = d.phase || 'question';

    if (game.status === 'finished') {
      let resultsHTML = '<div class="reaction-round-results" style="width:100%;max-width:400px;">';
      const sorted = game.players.slice().sort((a, b) => (game.scores[b] || 0) - (game.scores[a] || 0));
      sorted.forEach((p, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
        resultsHTML += `<div class="reaction-result-row"><span>${medal} ${this.escapeHTML(p)}</span><span class="result-time">${game.scores[p] || 0} pts</span></div>`;
      });
      resultsHTML += '</div>';
      board.innerHTML = resultsHTML;
      status.innerHTML = `<span style="font-size:18px;">🏆 ${game.winner === 'draw' ? 'Draw!' : (game.winner + ' wins!')}</span>`;
      return;
    }

    if (phase === 'question' && d.question) {
      const qNum = (d.currentQuestion || 0) + 1;
      const total = d.totalQuestions || 7;
      const hasAnswered = d.playerAnswers && d.playerAnswers[this.username] !== undefined;

      board.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;width:100%;gap:8px;">
        <div class="trivia-counter">Question ${qNum} of ${total}</div>
        <div class="trivia-timer-bar"><div class="trivia-timer-fill" id="triviaTimerFill" style="width:100%"></div></div>
        <div class="trivia-question">${this.escapeHTML(d.question)}</div>
        <div class="trivia-options">
          ${d.options.map((opt, i) => `<div class="trivia-option ${hasAnswered && d.playerAnswers[this.username] === i ? 'selected' : ''}" data-answer="${i}">${this.escapeHTML(opt)}</div>`).join('')}
        </div>
      </div>`;

      // Animate timer
      const fill = document.getElementById('triviaTimerFill');
      if (fill) { setTimeout(() => { fill.style.width = '0%'; fill.style.transition = 'width 15s linear'; }, 50); }

      status.textContent = hasAnswered ? 'Answer submitted! Waiting...' : 'Choose your answer!';

      if (isPlayer && !hasAnswered) {
        board.querySelectorAll('.trivia-option').forEach(opt => {
          opt.onclick = () => {
            board.querySelectorAll('.trivia-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            this.socket.emit('gameMove', { gameId: game.id, answer: parseInt(opt.dataset.answer) });
            status.textContent = 'Answer submitted! Waiting...';
          };
        });
      }
    } else if (phase === 'reveal' && d.question) {
      const correctIdx = d.correctAnswer;
      const myAnswer = d.playerAnswers ? d.playerAnswers[this.username] : undefined;

      board.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;width:100%;gap:8px;">
        <div class="trivia-counter">Question ${(d.currentQuestion || 0) + 1} of ${d.totalQuestions || 7}</div>
        <div class="trivia-question">${this.escapeHTML(d.question)}</div>
        <div class="trivia-options">
          ${d.options.map((opt, i) => {
            let cls = '';
            if (i === correctIdx) cls = 'correct';
            else if (i === myAnswer && i !== correctIdx) cls = 'wrong';
            return `<div class="trivia-option ${cls}" style="cursor:default;">${this.escapeHTML(opt)}</div>`;
          }).join('')}
        </div>
        <div style="margin-top:8px;font-size:13px;color:var(--text-muted);">
          ${Object.entries(d.playerAnswers || {}).map(([p, a]) => 
            `<span style="margin-right:10px;">${this.escapeHTML(p)}: ${a === correctIdx ? '✅' : '❌'}</span>`
          ).join('')}
        </div>
      </div>`;
      status.textContent = 'Next question coming up...';
    }
  }

  renderGameLeaderboard(data) {
    const content = document.getElementById('gameLbContent');
    if (!content) return;

    // Find active tab
    const activeTab = document.querySelector('.game-lb-tab.active');
    const gameType = activeTab ? activeTab.dataset.game : 'tictactoe';
    const entries = data[gameType] || [];

    if (entries.length === 0) {
      content.innerHTML = '<div class="game-lb-empty"><i class="fas fa-trophy" style="font-size:32px;margin-bottom:8px;display:block;"></i>No games played yet</div>';
      return;
    }

    content.innerHTML = entries.map((e, i) => `
      <div class="game-lb-row">
        <div class="game-lb-rank">${i + 1}</div>
        <div class="game-lb-name">${this.escapeHTML(e.username)}</div>
        <div class="game-lb-stats">
          <span class="wins"><i class="fas fa-trophy"></i> ${e.wins}</span>
          <span class="losses"><i class="fas fa-skull"></i> ${e.losses}</span>
          <span><i class="fas fa-handshake"></i> ${e.draws}</span>
          ${e.highScore > 0 ? `<span><i class="fas fa-star"></i> ${e.highScore}</span>` : ''}
        </div>
      </div>
    `).join('');
  }

  /* ═══════════════════════ PIXEL CANVAS ═══════════════════════ */
  _openPixelCanvas() {
    const overlay = document.getElementById('pixelOverlay');
    if (!overlay) return;
    const chatView = document.getElementById('chatView');
    const anchor = document.getElementById('chatMessages');
    if (chatView && overlay.parentElement !== chatView) {
      chatView.insertBefore(overlay, anchor || chatView.firstChild);
    }
    overlay.style.display = 'flex';
    overlay.style.overflow = 'hidden';
    chatView?.classList.add('canvas-mode');
    document.body.style.overflow = 'hidden';
    this._pixelRoomKey = 'global';
    this._pixelCanvasOpen = true;
    this._restorePixelDraft();
    this._requestPixelSnapshot();
    this._updatePixelCooldown();
    this._updatePixelRoomLabel();
    if (!this._pixelSelection || !this._pixelPlacementDraft) {
      this._setPixelSelection(this._pixelSelection || null, false);
    } else {
      this._renderPixelBoard('global', this._pixelData || []);
      this._renderPixelSidebar();
    }
    overlay.onclick = (e) => { if (e.target === overlay) this._closePixelCanvas(); };
  }

  _closePixelCanvas() {
    const overlay = document.getElementById('pixelOverlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    document.getElementById('chatView')?.classList.remove('canvas-mode');
    document.body.style.overflow = '';
    this._pixelCanvasOpen = false;
  }

  _resolvePixelRoomKey(room) {
    return 'global';
  }

  _updatePixelRoomLabel() {
    const label = document.getElementById('pixelRoomLabel');
    if (label) {
      label.textContent = 'Global Canvas';
    }
  }

  _restorePixelDraft() {
    try {
      const saved = sessionStorage.getItem('redchat_pixel_draft');
      if (!saved) return;
      const draft = JSON.parse(saved);
      if (!draft || draft.room !== 'global') return;
      this._pixelPlacementDraft = draft;
      this._pixelSelection = { x: draft.x, y: draft.y };
    } catch (e) {
      this._pixelPlacementDraft = null;
    }
  }

  _persistPixelDraft(draft) {
    this._pixelPlacementDraft = draft;
    try {
      if (draft) sessionStorage.setItem('redchat_pixel_draft', JSON.stringify(draft));
      else sessionStorage.removeItem('redchat_pixel_draft');
    } catch (e) {}
  }

  _requestPixelSnapshot() {
    if (this.socket) {
      this.socket.emit('getPixels', { room: 'global' });
    }
  }

  _getPixelAt(x, y) {
    if (!Array.isArray(this._pixelData)) return null;
    return this._pixelData.find(px => px && px.x === x && px.y === y) || null;
  }

  _setPixelSelection(selection, clearDraft = true) {
    this._pixelSelection = selection;
    if (clearDraft && this._pixelPlacementDraft) {
      const sameTile = selection && this._pixelPlacementDraft.x === selection.x && this._pixelPlacementDraft.y === selection.y;
      if (!sameTile) this._persistPixelDraft(null);
    }
    this._renderPixelBoard('global', this._pixelData || []);
    this._renderPixelSidebar();
  }

  _refreshPixelCanvas() {
    this._requestPixelSnapshot();
  }

  _renderPixelSidebar() {
    const panel = document.getElementById('pixelInfoPanel');
    if (!panel) return;
    const selection = this._pixelSelection;
    const selectedPixel = selection ? this._getPixelAt(selection.x, selection.y) : null;
    const colorValue = document.getElementById('pixelColorPicker')?.value || '#000000';
    const activeDraft = !!(this._pixelPlacementDraft && selection &&
      this._pixelPlacementDraft.x === selection.x &&
      this._pixelPlacementDraft.y === selection.y);

    if (!selection) {
      panel.innerHTML = `
        <div class="pixel-info-heading">Canvas ready</div>
        <div class="pixel-sidebar-empty">
          <i class="fas fa-hand-pointer"></i>
          <p>Select a tile on the board to inspect it or paint it.</p>
        </div>
        <div class="pixel-control-label">Color</div>
        <div class="pixel-control-slot" id="pixelColorSlot"></div>
        <div class="pixel-sidebar-note">Pick a color, then watch the ad to unlock placement or stealing.</div>
        <div class="pixel-control-label">Cooldown</div>
        <div class="pixel-control-slot" id="pixelCooldownSlot"></div>
      `;
      this._attachPixelControls(panel);
      this._updatePixelCooldown();
      return;
    }

    if (selectedPixel && selectedPixel.author) {
      const pixel = selectedPixel || selection;
      const time = pixel.timestamp ? new Date(pixel.timestamp).toLocaleString() : 'Unknown';
      panel.innerHTML = `
        <div class="pixel-info-heading">Pixel info</div>
        <div class="pixel-preview-row">
          <span class="pixel-preview-swatch" style="background:${this.escapeHTML(pixel.color || '#000000')}"></span>
          <div class="pixel-preview-meta">
            <strong>${this.escapeHTML(pixel.color || '#000000')}</strong>
            <span>${this.escapeHTML(pixel.author || 'Unknown')}</span>
          </div>
        </div>
        <div class="pixel-info-row"><span>Coords</span><strong>(${pixel.x}, ${pixel.y})</strong></div>
        <div class="pixel-info-row"><span>Placed</span><strong>${this.escapeHTML(time)}</strong></div>
        <div class="pixel-sidebar-note">Occupied pixels can be stolen by watching an ad, then placing your color on top.</div>
        <div class="pixel-control-label">Color</div>
        <div class="pixel-control-slot" id="pixelColorSlot"></div>
        <button class="pixel-place-btn" id="pixelPlaceActionBtn" type="button">${activeDraft ? 'Steal Pixel' : 'Watch Ad to Steal Pixel'}</button>
        <div class="pixel-control-label">Cooldown</div>
        <div class="pixel-control-slot" id="pixelCooldownSlot"></div>
      `;
      this._attachPixelControls(panel);
      this._updatePixelCooldown();
      const stealBtn = document.getElementById('pixelPlaceActionBtn');
      if (stealBtn) {
        stealBtn.onclick = () => {
          if (activeDraft) this._placeSelectedPixel();
          else this._openPixelPlacementAd();
        };
      }
      return;
    }

    panel.innerHTML = `
      <div class="pixel-info-heading">Place pixel</div>
      <div class="pixel-place-card">
        <div class="pixel-preview-row">
          <span class="pixel-preview-swatch" style="background:${this.escapeHTML(colorValue)}"></span>
          <div class="pixel-preview-meta">
            <strong>${this.escapeHTML(colorValue)}</strong>
            <span>Selected tile</span>
          </div>
        </div>
        <div class="pixel-info-row"><span>Coords</span><strong>(${selection.x}, ${selection.y})</strong></div>
        <div class="pixel-info-row"><span>Status</span><strong>${activeDraft ? 'Ready to place' : 'Watch ad to unlock'}</strong></div>
        <div class="pixel-sidebar-note">Choose a color with the picker in the right rail, then watch the ad to unlock placement.</div>
        <div class="pixel-control-label">Color</div>
        <div class="pixel-control-slot" id="pixelColorSlot"></div>
        <button class="pixel-place-btn" id="pixelPlaceActionBtn" type="button">${activeDraft ? 'Place Pixel' : 'Watch Ad to Place'}</button>
      </div>
      <div class="pixel-control-label">Cooldown</div>
      <div class="pixel-control-slot" id="pixelCooldownSlot"></div>
    `;
    this._attachPixelControls(panel);
    this._updatePixelCooldown();
    const placeBtn = document.getElementById('pixelPlaceActionBtn');
    if (placeBtn) {
      placeBtn.onclick = () => {
        if (activeDraft) this._placeSelectedPixel();
        else this._openPixelPlacementAd();
      };
    }
  }

  _attachPixelControls(panel) {
    const colorHost = panel.querySelector('#pixelColorSlot');
    const cooldownHost = panel.querySelector('#pixelCooldownSlot');
    const colorPicker = document.getElementById('pixelColorPicker');
    const cooldown = document.getElementById('pixelCooldown');
    if (colorHost && colorPicker) colorHost.appendChild(colorPicker);
    if (cooldownHost && cooldown) cooldownHost.appendChild(cooldown);
  }

  _openPixelPlacementAd() {
    if (!this._pixelSelection) {
      this.toast('Select a tile first.', 'error');
      return;
    }
    const picker = document.getElementById('pixelColorPicker');
    const color = picker?.value || '#000000';
    this._persistPixelDraft({
      room: 'global',
      x: this._pixelSelection.x,
      y: this._pixelSelection.y,
      color
    });
    this._openSponsoredAd('https://omg10.com/4/11061842');
    this._renderPixelSidebar();
  }

  _openSponsoredAd(url) {
    if (!url) return;
    const adWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!adWindow) {
      this.toast('Popup blocked the sponsor tab. Allow popups and try again.', 'warning');
    }
  }

  _placeSelectedPixel() {
    const draft = this._pixelPlacementDraft;
    if (!this._pixelSelection) {
      this.toast('Select a tile first.', 'error');
      return;
    }
    if (!draft || draft.x !== this._pixelSelection.x || draft.y !== this._pixelSelection.y) {
      this._openPixelPlacementAd();
      return;
    }
    this.socket.emit('placePixel', {
      room: 'global',
      x: draft.x,
      y: draft.y,
      color: draft.color
    });
    const optimisticPixel = {
      room: 'global',
      x: draft.x,
      y: draft.y,
      color: draft.color,
      author: this.username || 'You',
      timestamp: Date.now()
    };
    if (!Array.isArray(this._pixelData)) this._pixelData = [];
    this._pixelData = this._pixelData.filter(px => px.x !== optimisticPixel.x || px.y !== optimisticPixel.y);
    this._pixelData.push(optimisticPixel);
    this._renderPixelBoard('global', this._pixelData);
    this._renderPixelSidebar();
    this.renderRoomEventsPanel();
    this._persistPixelDraft(null);
    this.toast('Pixel placement submitted.', 'success');
  }

  _renderPixelBoard(room, pixels) {
    const board = document.getElementById('pixelBoard');
    if (!board) return;
    const pixelMap = new Map();
    if (Array.isArray(pixels)) {
      pixels.forEach(px => {
        if (!px || px.x === undefined || px.y === undefined) return;
        pixelMap.set(`${px.x},${px.y}`, px);
      });
    }
    // clear
    board.innerHTML = '';
    // create 50x50 cells if not already
    for (let r = 0; r < 50; r++) {
      for (let c = 0; c < 50; c++) {
        const cell = document.createElement('div');
        cell.className = 'pixel-cell';
        if (this._pixelSelection && this._pixelSelection.x === c && this._pixelSelection.y === r) {
          cell.classList.add('selected');
        }
        cell.dataset.row = r;
        cell.dataset.col = c;
        const pixel = pixelMap.get(`${c},${r}`);
        if (pixel) {
          cell.classList.add('occupied');
          cell.style.background = pixel.color;
          cell.title = `${pixel.author || 'Unknown'} · ${pixel.color || ''}`;
          cell.dataset.author = pixel.author || '';
          cell.dataset.color = pixel.color || '';
          cell.dataset.timestamp = pixel.timestamp || '';
        }
        board.appendChild(cell);
      }
    }
    // click handler
    board.querySelectorAll('.pixel-cell').forEach(cell => {
      cell.onclick = (e) => {
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);
        const occupiedPixel = cell.dataset.author ? {
          author: cell.dataset.author,
          color: cell.dataset.color,
          timestamp: cell.dataset.timestamp,
          x: c,
          y: r
        } : null;
        // if admin & shift-click, delete pixel
        if (e.shiftKey) {
          if (occupiedPixel && Array.isArray(this._pixelData)) {
            const pixelIndex = this._pixelData.findIndex(px => px.x === c && px.y === r);
            if (pixelIndex >= 0) {
              this.socket.emit('deletePixel', { room: this.currentRoom, index: pixelIndex });
            }
          }
          return;
        }
        this._setPixelSelection(occupiedPixel || { x: c, y: r });
      };
    });
  }

  // socket handlers for pixels will be registered in initSocket
  _setupPixelSocket() {
    if (!this._pixelCooldownInterval) {
      this._pixelCooldownInterval = setInterval(() => this._updatePixelCooldown(), 1000);
    }
    this.socket.off('pixelsData');
    this.socket.off('pixelPlaced');
    this.socket.off('pixelDeleted');
    this.socket.off('pixelError');

    this.socket.on('pixelsData', data => this._syncPixelCanvas(data, 'pixelsData'));
    this.socket.on('pixelPlaced', data => this._syncPixelCanvas(data, 'pixelPlaced'));
    this.socket.on('pixelDeleted', data => this._syncPixelCanvas(data, 'pixelDeleted'));
    this.socket.on('pixelError', data => {
      this.toast(data?.message || 'Pixel action failed', 'error');
      this._refreshPixelCanvas();
    });
  }

  _syncPixelCanvas(data, source) {
    const pixels = Array.isArray(data?.pixels) ? data.pixels : [];
    this._pixelRoomKey = 'global';
    this._pixelData = pixels;
    this._renderPixelBoard('global', this._pixelData);
    this._renderPixelSidebar();
    this.renderRoomEventsPanel();
    if (source === 'pixelPlaced' && data?.pixel && data.pixel.author === this.username) {
      this._lastPixelTime = Date.now();
      this._updatePixelCooldown();
    }
  }

  _updatePixelCooldown() {
    const cd = document.getElementById('pixelCooldown');
    if (!cd) return;
    const now = Date.now();
    const diff = 60000 - (now - (this._lastPixelTime || 0));
    if (diff > 0) {
      const sec = Math.ceil(diff / 1000);
      cd.textContent = `Next pixel in ${sec}s`;
    } else {
      cd.textContent = 'Ready now · 60s cooldown';
    }
    this._updatePixelRoomLabel();
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
    // If app exists but init() threw, ensure DOM caching and event bindings run
    if (app) {
      try {
        if (typeof app.cacheDOM === 'function') app.cacheDOM();
        if (typeof app.bindEvents === 'function') app.bindEvents();
      } catch (e) {
        console.error('[RedChat] Fallback bind error:', e);
      }
    }

    // Minimal global fallback handlers for auth UI (ensures buttons work)
    (function addFallbackAuthHandlers() {
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const username = document.getElementById('loginUsername')?.value?.trim();
          const password = document.getElementById('loginPassword')?.value;
          const captcha = document.getElementById('captchaAnswer')?.value;
          if (window.app && app.socket && typeof app.socket.emit === 'function') {
            app.socket.emit('login', { username, password, captchaAnswer: captcha, expectedCaptcha: app.captchaAnswer });
          } else {
            console.warn('[RedChat] Fallback login: no app/socket available');
          }
        });
      }

      const panelMap = {
        showRegister: 'registerPanel',
        showLogin: 'loginPanel',
        showForgotPassword: 'forgotPanel',
        showLoginFromForgot: 'loginPanel',
        skipVerification: 'loginPanel'
      };

      Object.keys(panelMap).forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', () => {
          const panel = panelMap[id];
          if (window.app && typeof app.showAuthPanel === 'function') {
            app.showAuthPanel(panel);
            return;
          }
          // Basic DOM fallback
          ['loginPanel', 'registerPanel', 'forgotPanel', 'verifyPanel'].forEach(p => {
            const el = document.getElementById(p);
            if (el) el.classList.remove('active');
          });
          const target = document.getElementById(panel);
          if (target) target.classList.add('active');
        });
      });
    })();
  }, 1500);
});

// Global fallback if app failed to initialize
if (!window.app) window.app = { closeModal: () => {}, openModal: () => {}, toast: () => {}, joinRoom: () => {} };

