class StateManager {
    constructor() {
        this.state = {
            currentUser: null,
            theme: 'dark', // 'dark' or 'light'
            videos: [],
            // Add other global state properties here
        };
        this.listeners = {}; // { 'propertyName': [callback1, callback2] }
    }

    // Load initial state from localStorage
    loadInitialState() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.state.currentUser = JSON.parse(storedUser);
        }
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            this.state.theme = storedTheme;
        }
        // In a real app, videos would be fetched from an API
        // For this demo, we'll import them directly
        import('../data/videos.js').then(module => {
            this.set('videos', module.videos);
        });
    }

    // Get a state property
    get(key) {
        return this.state[key];
    }

    // Set a state property and notify listeners
    set(key, value) {
        if (this.state[key] !== value) {
            this.state[key] = value;
            this.notify(key);
            // Persist certain state to localStorage
            if (key === 'currentUser') {
                if (value) {
                    localStorage.setItem('currentUser', JSON.stringify(value));
                } else {
                    localStorage.removeItem('currentUser');
                }
            } else if (key === 'theme') {
                localStorage.setItem('theme', value);
            }
        }
    }

    // Subscribe to state changes for a specific property
    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    }

    // Notify all listeners for a specific property
    notify(key) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(this.state[key]));
        }
    }

    // User authentication methods
    loginUser(user) {
        this.set('currentUser', user);
    }

    logoutUser() {
        this.set('currentUser', null);
    }

    isLoggedIn() {
        return this.state.currentUser !== null;
    }

    // Theme management
    toggleTheme() {
        const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.set('theme', newTheme);
        document.body.classList.toggle('light-theme', newTheme === 'light');
    }
}

export const state = new StateManager();
