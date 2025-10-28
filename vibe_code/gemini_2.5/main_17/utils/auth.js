/**
 * Utility functions for user authentication state management.
 * Uses localStorage for storing a mock authentication token.
 */

const AUTH_TOKEN_KEY = 'authToken';
const LOGGED_IN_USER_EMAIL_KEY = 'loggedInUserEmail';

/**
 * Checks if a user is currently authenticated.
 * @returns {boolean} True if an auth token exists, false otherwise.
 */
export function isAuthenticated() {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Retrieves the authentication token.
 * @returns {string|null} The auth token if it exists, otherwise null.
 */
export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Retrieves the email of the logged-in user.
 * @returns {string|null} The user's email if logged in, otherwise null.
 */
export function getLoggedInUserEmail() {
    return localStorage.getItem(LOGGED_IN_USER_EMAIL_KEY);
}

/**
 * Logs out the current user by removing the auth token and user email from localStorage.
 */
export function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(LOGGED_IN_USER_EMAIL_KEY);
    // Dispatch a custom event to notify other parts of the app about auth state change
    document.dispatchEvent(new CustomEvent('auth-state-changed'));
}

// Listen for a custom event from other modules (e.g., login.js) to re-render the app
document.addEventListener('auth-state-changed', () => {
    // In a real SPA, this would trigger a re-render of components sensitive to auth state
    // For this example, the main script.js's Router.onNavigate callback handles re-rendering
    // after auth state changes result in a route change (e.g., login -> home, logout -> login).
    // For cases where auth state changes without a route change (e.g., token refresh), 
    // you'd typically have a more global state management or re-render trigger.
});
