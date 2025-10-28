import { showModal } from '../components/modal.js';

const USER_STORAGE_KEY = 'amazonCloneUser';
const MOCK_USERS_KEY = 'amazonCloneMockUsers';

/**
 * Initializes mock user data if not present.
 */
function initializeMockUsers() {
    if (!localStorage.getItem(MOCK_USERS_KEY)) {
        const mockUsers = [
            { username: 'testuser', email: 'test@example.com', password: 'password123' }
        ];
        localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(mockUsers));
    }
}

/**
 * Dispatches a custom event to notify about authentication status changes.
 * @param {object|null} user - The user object or null if logged out.
 */
function dispatchAuthStatusChanged(user) {
    const event = new CustomEvent('authStatusChanged', {
        detail: { user: user }
    });
    document.dispatchEvent(event);
}

/**
 * Checks if a user is currently logged in.
 * @returns {object|null} The user object if logged in, otherwise null.
 */
export function checkAuthStatus() {
    try {
        const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
        return user;
    } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
        return null;
    }
}

/**
 * Logs in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<boolean>} True if login is successful, false otherwise.
 */
export async function login(email, password) {
    initializeMockUsers();
    const mockUsers = JSON.parse(localStorage.getItem(MOCK_USERS_KEY));
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
        const loggedInUser = { username: user.username, email: user.email };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
        dispatchAuthStatusChanged(loggedInUser);
        return true;
    }
    return false;
}

/**
 * Signs up a new user.
 * @param {string} username - The new user's username.
 * @param {string} email - The new user's email.
 * @param {string} password - The new user's password.
 * @returns {Promise<boolean>} True if signup is successful, false if email already exists.
 */
export async function signup(username, email, password) {
    initializeMockUsers();
    const mockUsers = JSON.parse(localStorage.getItem(MOCK_USERS_KEY));

    if (mockUsers.some(u => u.email === email)) {
        return false; // Email already exists
    }

    const newUser = { username, email, password };
    mockUsers.push(newUser);
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(mockUsers));
    return true;
}

/**
 * Logs out the current user.
 */
export function logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    dispatchAuthStatusChanged(null);
    showModal('Logged Out', '<p>You have been successfully logged out.</p>');
}

/**
 * Initializes authentication module (e.g., checks for existing session).
 */
export function initAuth() {
    initializeMockUsers();
    const user = checkAuthStatus();
    if (user) {
        console.log('User already logged in:', user.username);
        dispatchAuthStatusChanged(user);
    }
}