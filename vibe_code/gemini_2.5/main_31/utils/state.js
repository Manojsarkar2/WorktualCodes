import { isAuthenticated, getUser } from './auth.js';

// Initial state
export let appState = {
    isAuthenticated: isAuthenticated(),
    user: getUser(),
    cart: JSON.parse(localStorage.getItem('whimsy_world_cart')) || [],
    settings: {
        theme: 'light' // Example setting
    }
};

// Function to update state and persist to localStorage
export const updateState = (newState) => {
    appState = { ...appState, ...newState };

    // Persist relevant parts to localStorage
    if (newState.cart !== undefined) {
        localStorage.setItem('whimsy_world_cart', JSON.stringify(appState.cart));
    }
    // User authentication is handled by auth.js, but state reflects it
    // Settings can also be persisted if needed

    console.log('App State Updated:', appState);
};

// Initialize state on load
updateState({});
