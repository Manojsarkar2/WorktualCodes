/**
 * Client-side routing utilities for a Single Page Application (SPA).
 * Uses window.location.hash for simple routing, or history.pushState for cleaner URLs.
 * For this simple vanilla SPA, we'll use window.location.hash to avoid server configuration issues on basic file serving.
 */

const NAVIGATION_EVENT = new CustomEvent('spa-navigate');

/**
 * Gets the current route path from the URL hash.
 * @returns {string} The current route path (e.g., '/home', '/menu'). Defaults to '/home'.
 */
export function getRoute() {
    const hash = window.location.hash;
    return hash ? hash.substring(1) : '/home'; // Remove '#' prefix, default to /home
}

/**
 * Navigates to a new route without a full page reload.
 * Updates the URL hash and dispatches a custom navigation event.
 * @param {string} path - The path to navigate to (e.g., '/home', '/menu').
 */
export function navigateTo(path) {
    if (window.location.hash.substring(1) === path) {
        // If already on the same path, just dispatch the event to re-render if needed
        document.dispatchEvent(NAVIGATION_EVENT);
        return;
    }
    window.location.hash = path;
    // The 'hashchange' event naturally triggers for window.location.hash changes,
    // so explicitly dispatching here might be redundant if the main app listens to 'hashchange'.
    // However, it provides a consistent event for programmatic navigation.
    document.dispatchEvent(NAVIGATION_EVENT);
}

/**
 * Registers a callback function to be called when navigation occurs.
 * This uses a custom event to decouple the navigation logic from rendering.
 * @param {Function} callback - The function to call on navigation.
 */
export function onNavigate(callback) {
    // Listen for both hashchange (for browser back/forward) and custom event (for programmatic navigation)
    window.addEventListener('hashchange', callback);
    document.addEventListener(NAVIGATION_EVENT.type, callback);
}
