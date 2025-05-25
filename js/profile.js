// Profile Page JavaScript
/*document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Load user data
    loadUserProfile();
    
    // Tab functionality
    initTabs();
    
    // Form handling
    initFormHandlers();
    
    // Logout functionality
    initLogout();
});

function checkLoginStatus() {
    const userData = getUserData();
    if (!userData) {
        // Redirect to sign in if not logged in
        window.location.href = 'signin.html';
        return;
    }
}

function getUserData() {
    // In a real application, this would check session/token
    // For demo purposes, using sessionStorage
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

function loadUserProfile() {
    const userData = getUserData();
    if (!userData) return;
    
    // Update profile information
    document.getElementById('profile-name').textContent = userData.name || 'User';
    document.getElementById('profile-email').textContent = userData.email || 'user@example.com';
    
    // Load form data
    if (userData.name) document.getElementById('edit-name').value = userData.name;
    if (userData.dob) document.getElementById('edit-dob').value = userData.dob;
    if (userData.gender) {
        const genderRadio = document.getElementById(`edit-${userData.gender}`);
        if (genderRadio) genderRadio.checked = true;
    }
    
    // Load game statistics (demo data)
    loadGameStats();
    
    // Load preferences
    loadPreferences();
}

function loadGameStats() {
    // In a real app, this would fetch from database
    const stats = {
        gamesPlayed: Math.floor(Math.random() * 50) + 10,
        gamesWon: Math.floor(Math.random() * 30) + 5,
        bestTime: generateRandomTime()
    };
    
    document.getElementById('games-played').textContent = stats.gamesPlayed;
    document.getElementById('games-won').textContent = stats.gamesWon;
    document.getElementById('best-time').textContent = stats.bestTime;
    
    // Update progress bars based on stats
    updateProgressBars(stats);
}

function generateRandomTime() {
    const minutes = Math.floor(Math.random() * 15) + 3;
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBars(stats) {
    // Calculate win percentage for different difficulties (demo calculation)
    const totalGames = stats.gamesPlayed;
    const easyWins = Math.floor(totalGames * 0.4);
    const mediumWins = Math.floor(totalGames * 0.3);
    const hardWins = Math.floor(totalGames * 0.2);
    
    const easyPercentage = totalGames > 0 ? Math.round((easyWins / (totalGames * 0.5)) * 100) : 0;
    const mediumPercentage = totalGames > 0 ? Math.round((mediumWins / (totalGames * 0.35)) * 100) : 0;
    const hardPercentage = totalGames > 0 ? Math.round((hardWins / (totalGames * 0.15)) * 100) : 0;
    
    // Update progress bars
    const progressBars = document.querySelectorAll('.difficulty-item');
    if (progressBars[0]) {
        progressBars[0].querySelector('.progress-fill').style.width = Math.min(easyPercentage, 100) + '%';
        progressBars[0].querySelector('span:last-child').textContent = Math.min(easyPercentage, 100) + '%';
    }
    if (progressBars[1]) {
        progressBars[1].querySelector('.progress-fill').style.width = Math.min(mediumPercentage, 100) + '%';
        progressBars[1].querySelector('span:last-child').textContent = Math.min(mediumPercentage, 100) + '%';
    }
    if (progressBars[2]) {
        progressBars[2].querySelector('.progress-fill').style.width = Math.min(hardPercentage, 100) + '%';
        progressBars[2].querySelector('span:last-child').textContent = Math.min(hardPercentage, 100) + '%';
    }
}

function loadPreferences() {
    // Load saved preferences from localStorage
    const preferences = {
        soundEffects: localStorage.getItem('soundEffects') !== 'false',
        autoPencil: localStorage.getItem('autoPencil') !== 'false',
        highlightErrors: localStorage.getItem('highlightErrors') === 'true'
    };
    
    document.getElementById('sound-effects').checked = preferences.soundEffects;
    document.getElementById('auto-pencil').checked = preferences.autoPencil;
    document.getElementById('highlight-errors').checked = preferences.highlightErrors;
    
    // Add change listeners
    document.getElementById('sound-effects').addEventListener('change', function() {
        localStorage.setItem('soundEffects', this.checked);
    });
    
    document.getElementById('auto-pencil').addEventListener('change', function() {
        localStorage.setItem('autoPencil', this.checked);
    });
    
    document.getElementById('highlight-errors').addEventListener('change', function() {
        localStorage.setItem('highlightErrors', this.checked);
    });
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function initFormHandlers() {
    const profileForm = document.getElementById('profile-form');
    
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const userData = getUserData();
        
        // Update user data
        const updatedData = {
            ...userData,
            name: formData.get('name'),
            dob: formData.get('dob'),
            gender: formData.get('gender')
        };
        
        // Save updated data
        sessionStorage.setItem('currentUser', JSON.stringify(updatedData));
        
        // Update display
        document.getElementById('profile-name').textContent = updatedData.name;
        
        // Show success message
        showNotification('Profile updated successfully!', 'success');
    });
    
    // Avatar change functionality
    const avatarElement = document.querySelector('.profile-avatar');
    avatarElement.addEventListener('click', function() {
        // In a real app, this would open file picker
        showNotification('Avatar change functionality would be implemented here', 'info');
    });
}

function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear user data
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        
        // Show logout message
        showNotification('Logged out successfully!', 'success');
        
        // Redirect to home page after short delay
        setTimeout(() => {
            window.location.href = 'HOME.html';
        }, 1500);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);*/
// Profile page functionality
/*class ProfileManager {
    constructor() {
        this.currentUser = AuthSystem.getCurrentUser();
        this.init();
    }

    init() {
        // Check if user is logged in
        if (!this.currentUser) {
            // Redirect to sign in page
            window.location.href = 'signin.html';
            return;
        }

        this.populateProfileData();
        this.setupEventListeners();
        this.setupTabs();
    }

    populateProfileData() {
        const user = this.currentUser.user;

        // Update profile header
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-email').textContent = user.email;
        
        // Update stats
        document.getElementById('games-played').textContent = user.gamesPlayed || 0;
        document.getElementById('games-won').textContent = user.gamesWon || 0;
        document.getElementById('best-time').textContent = user.bestTime || '--:--';

        // Update profile image with initials
        const profileImage = document.getElementById('profile-image');
        const initials = AuthSystem.getInitials(user.name);
        profileImage.src = `https://via.placeholder.com/120/4A90E2/ffffff?text=${initials}`;
        profileImage.alt = `${user.name} Profile Avatar`;

        // Populate form fields
        document.getElementById('edit-name').value = user.name || '';
        document.getElementById('edit-dob').value = user.dob || '';
        
        // Set gender radio button
        if (user.gender) {
            const genderRadio = document.getElementById(`edit-${user.gender}`);
            if (genderRadio) {
                genderRadio.checked = true;
            }
        }

        // Set preferences
        if (user.preferences) {
            document.getElementById('sound-effects').checked = user.preferences.soundEffects;
            document.getElementById('auto-pencil').checked = user.preferences.autoPencil;
            document.getElementById('highlight-errors').checked = user.preferences.highlightErrors;
        }

        // Generate recent games
        this.generateRecentGames();
    }

    generateRecentGames() {
        const recentGamesContainer = document.getElementById('recent-games');
        const games = [
            { difficulty: 'Easy', time: '04:32', date: '2025-05-24', status: 'Won' },
            { difficulty: 'Medium', time: '08:15', date: '2025-05-23', status: 'Won' },
            { difficulty: 'Hard', time: '15:42', date: '2025-05-22', status: 'Lost' },
            { difficulty: 'Medium', time: '06:28', date: '2025-05-21', status: 'Won' },
            { difficulty: 'Easy', time: '03:45', date: '2025-05-20', status: 'Won' }
        ];

        recentGamesContainer.innerHTML = games.map(game => `
            <div class="recent-game ${game.status.toLowerCase()}">
                <div class="game-info">
                    <span class="game-difficulty">${game.difficulty}</span>
                    <span class="game-status">${game.status}</span>
                </div>
                <div class="game-details">
                    <span class="game-time">${game.time}</span>
                    <span class="game-date">${game.date}</span>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Profile form submission
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', this.handleProfileUpdate.bind(this));
        }

        // Avatar change
        const profileAvatar = document.querySelector('.profile-avatar');
        if (profileAvatar) {
            profileAvatar.addEventListener('click', this.handleAvatarChange.bind(this));
        }

        // Preference changes
        document.querySelectorAll('.preference-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', this.handlePreferenceChange.bind(this));
        });
    }

    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    handleProfileUpdate(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const updatedData = {
            name: formData.get('name'),
            dob: formData.get('dob'),
            gender: formData.get('gender')
        };

        // Update current user data
        Object.assign(this.currentUser.user, updatedData);
        
        // Update profile display
        document.getElementById('profile-name').textContent = updatedData.name;
        
        // Update profile image with new initials if name changed
        const profileImage = document.getElementById('profile-image');
        const initials = AuthSystem.getInitials(updatedData.name);
        profileImage.src = `https://via.placeholder.com/120/4A90E2/ffffff?text=${initials}`;

        // Show success message
        this.showMessage('Profile updated successfully!', 'success');
    }

    handleAvatarChange() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('profile-image').src = e.target.result;
                    this.showMessage('Profile picture updated!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
        
        fileInput.click();
    }

    handlePreferenceChange(e) {
        const preference = e.target.id;
        const value = e.target.checked;
        
        // Update user preferences
        if (!this.currentUser.user.preferences) {
            this.currentUser.user.preferences = {};
        }
        
        // Convert checkbox id to camelCase
        const prefKey = preference.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        this.currentUser.user.preferences[prefKey] = value;
        
        this.showMessage(`${e.target.nextElementSibling.textContent} ${value ? 'enabled' : 'disabled'}`, 'success');
    }

    showMessage(message, type) {
        // Create or update message element
        let messageEl = document.querySelector('.profile-message');
        
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'profile-message';
            const container = document.querySelector('.profile-container');
            container.insertBefore(messageEl, container.firstChild);
        }
        
        messageEl.textContent = message;
        messageEl.className = `profile-message ${type}-message`;
        messageEl.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
}

// Initialize profile manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
});

// Add profile-specific styles
const profileStyles = document.createElement('style');
profileStyles.textContent = `
    .profile-message {
        padding: 15px;
        margin: 20px 0;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
    }

    .success-message {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .error-message {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .recent-game {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin: 8px 0;
        border-radius: 6px;
        background: #f8f9fa;
        border-left: 4px solid #ddd;
    }

    .recent-game.won {
        border-left-color: #28a745;
        background: #f8fff9;
    }

    .recent-game.lost {
        border-left-color: #dc3545;
        background: #fff8f8;
    }

    .game-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .game-difficulty {
        font-weight: 600;
        font-size: 14px;
    }

    .game-status {
        font-size: 12px;
        color: #666;
    }

    .game-details {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 4px;
    }

    .game-time {
        font-weight: 600;
        color: #4A90E2;
    }

    .game-date {
        font-size: 12px;
        color: #666;
    }

    .profile-avatar {
        cursor: pointer;
        position: relative;
        transition: transform 0.3s ease;
    }

    .profile-avatar:hover {
        transform: scale(1.05);
    }

    .avatar-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 50%;
        font-size: 12px;
    }

    .profile-avatar:hover .avatar-overlay {
        opacity: 1;
    }
`;

document.head.appendChild(profileStyles);*/
// User data structure
let userData = {
    name: '',
    email: '',
    joinDate: '',
    totalGames: 0,
    gamesWon: 0,
    winRate: 0,
    gamesHistory: [],
    performanceData: {
        easy: { played: 0, won: 0 },
        medium: { played: 0, won: 0 },
        hard: { played: 0, won: 0 }
    },
    activities: []
};

// Initialize page when loaded
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    initializeCharts(); // Assuming you have an initializeCharts function defined elsewhere
    updateUI();
});

// Load user data from localStorage or set defaults for new users
function loadUserData() {
    const savedData = localStorage.getItem('gridMasterUser');
    const urlParams = new URLSearchParams(window.location.search);
    const newUserName = urlParams.get('name');
    const newUserEmail = urlParams.get('email');

    if (newUserName && newUserEmail) {
        // Scenario 1: New user just signed up and redirected with name/email in URL
        userData.name = newUserName;
        userData.email = newUserEmail;
        userData.joinDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
        userData.totalGames = 0;
        userData.gamesWon = 0;
        userData.winRate = 0;
        userData.gamesHistory = [];
        userData.performanceData = {
            easy: { played: 0, won: 0 },
            medium: { played: 0, won: 0 },
            hard: { played: 0, won: 0 }
        };
        userData.activities = []; // Clear previous activities if any

        // Add welcome activity
        userData.activities.push({
            icon: '🎉',
            message: `Welcome to Grid Master, ${userData.name}!`,
            time: 'Just now'
        });

        saveUserData(); // Save this brand new user data immediately
        // Important: Remove URL parameters to prevent re-initialization on refresh
        // This makes sure subsequent refreshes load from localStorage
        window.history.replaceState({}, document.title, window.location.pathname);

    } else if (savedData) {
        // Scenario 2: Returning user, data found in localStorage
        userData = JSON.parse(savedData);
    } else {
        // Scenario 3: No saved data, and no new user data in URL (e.g., first direct visit or localStorage cleared)
        // You might want to redirect to a signup/login page here.
        // For demonstration, setting a generic guest profile.
        userData.email = 'guest@gridmaster.com';
        userData.name = 'Guest Player';
        userData.joinDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
        userData.totalGames = 0;
        userData.gamesWon = 0;
        userData.winRate = 0;
        userData.gamesHistory = [];
        userData.performanceData = {
            easy: { played: 0, won: 0 },
            medium: { played: 0, won: 0 },
            hard: { played: 0, won: 0 }
        };
        userData.activities = [];

        // Add welcome activity for guest
        userData.activities.push({
            icon: '👋',
            message: 'Welcome, Guest! Sign up to save your progress.',
            time: 'Just now'
        });
        saveUserData(); // Save guest data for subsequent direct visits
    }
}

// ... (rest of your JavaScript code remains the same) ...

// Extract name from email for new users
function extractNameFromEmail(email) {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('gridMasterUser', JSON.stringify(userData));
}

// Update UI with user data
function updateUI() {
    // Update profile info
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-email').textContent = userData.email;
    document.getElementById('join-date').textContent = userData.joinDate;

    // Update initials
    const initials = userData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    document.getElementById('user-initials').textContent = initials;

    // Update stats
    document.getElementById('total-games').textContent = userData.totalGames;
    document.getElementById('games-won').textContent = userData.gamesWon;
    document.getElementById('win-rate').textContent = userData.winRate + '%';

    // Update form fields
    document.getElementById('username').value = userData.name;
    document.getElementById('email').value = userData.email;

    // Update activity list
    updateActivityList();
}

// Update activity list
function updateActivityList() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';

    userData.activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <span class="activity-icon">${activity.icon}</span>
            <div class="activity-details">
                <p>${activity.message}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

// Generate sample data for new users
function generateSampleData() {
    return [
        { date: 'Day 1', games: 0 },
        { date: 'Day 2', games: 0 },
        { date: 'Day 3', games: 0 },
        { date: 'Day 4', games: 0 },
        { date: 'Day 5', games: 0 }
    ];
}

// Add new game result (called from game pages)
function addGameResult(difficulty, won) {
    userData.totalGames++;
    if (won) {
        userData.gamesWon++;
        userData.performanceData[difficulty].won++;
    }
    userData.performanceData[difficulty].played++;

    // Update win rate
    userData.winRate = userData.totalGames === 0 ? 0 : Math.round((userData.gamesWon / userData.totalGames) * 100);

    // Add activity
    const activityMessage = won ?
        `Won a ${difficulty} game! 🎉` :
        `Played a ${difficulty} game`;

    userData.activities.unshift({
        icon: won ? '🏆' : '🎯',
        message: activityMessage,
        time: 'Just now'
    });

    // Keep only last 10 activities
    if (userData.activities.length > 10) {
        userData.activities = userData.activities.slice(0, 10);
    }

    // Update games history
    const today = new Date().toLocaleDateString();
    const existingEntry = userData.gamesHistory.find(entry => entry.date === today);

    if (existingEntry) {
        existingEntry.games++;
    } else {
        userData.gamesHistory.push({ date: today, games: 1 });
    }

    // Keep only last 30 days
    if (userData.gamesHistory.length > 30) {
        userData.gamesHistory = userData.gamesHistory.slice(-30);
    }

    saveUserData();
    updateUI();
    initializeCharts(); // Refresh charts
}

// Edit field functionality
function editField(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;

    if (field.readOnly) {
        field.readOnly = false;
        field.focus();
        button.textContent = 'Save';
        field.style.borderColor = '#ff4444';
    } else {
        field.readOnly = true;
        button.textContent = 'Edit';
        field.style.borderColor = '#ddd';

        // Update user data
        if (fieldId === 'username') {
            userData.name = field.value;
            document.getElementById('user-name').textContent = userData.name;

            // Update initials
            const initials = userData.name.split(' ').map(n => n[0]).join('').toUpperCase();
            document.getElementById('user-initials').textContent = initials;
        } else if (fieldId === 'email') {
            userData.email = field.value;
            document.getElementById('user-email').textContent = userData.email;
        }

        saveUserData();

        // Add activity
        userData.activities.unshift({
            icon: '✏️',
            message: `Updated ${fieldId}`,
            time: 'Just now'
        });

        if (userData.activities.length > 10) {
            userData.activities = userData.activities.slice(0, 10);
        }

        saveUserData();
        updateActivityList();
    }
}

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session data but keep user profile data in localStorage
        sessionStorage.clear(); // This clears session-specific data, not localStorage

        // Add logout activity
        userData.activities.unshift({
            icon: '👋',
            message: 'Logged out',
            time: 'Just now'
        });

        if (userData.activities.length > 10) {
            userData.activities = userData.activities.slice(0, 10);
        }

        saveUserData(); // Save activities before redirecting

        // Redirect to home page (or login/signup page)
        window.location.href = 'index.html';
    }
}

// Function to be called from other pages when user completes a game
window.updateUserProgress = addGameResult;

// Export functions for use in other files
window.GridMasterUser = {
    addGameResult: addGameResult,
    getUserData: () => userData,
    saveUserData: saveUserData
};