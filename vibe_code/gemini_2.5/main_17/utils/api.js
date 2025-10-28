/**
 * Mocks API calls for data and authentication.
 * Uses localStorage for persistence.
 */

const STORAGE_KEY_USERS = 'mock_users';
const STORAGE_KEY_PRODUCTS = 'mock_products';

// Initialize mock products if not already in localStorage
async function _initMockProducts() {
    if (!localStorage.getItem(STORAGE_KEY_PRODUCTS)) {
        // Fetch from data/products.json to initialize if localStorage is empty
        try {
            const response = await fetch('./data/products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
        } catch (error) {
            console.error('Failed to load initial products from data/products.json:', error);
            // Fallback to an empty array or a hardcoded default if fetch fails
            localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify([]));
        }
    }
}

// Immediately initialize products when this module is loaded
_initMockProducts();

/**
 * Simulates fetching products from an API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 */
export async function fetchProducts() {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    const products = JSON.parse(localStorage.getItem(STORAGE_KEY_PRODUCTS) || '[]');
    return products;
}

/**
 * Simulates user login.
 * Stores a mock token in localStorage on successful login.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<boolean>} A promise that resolves to true if login is successful, false otherwise.
 */
export async function loginUser(email, password) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = `mock-jwt-${user.id}-${Date.now()}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('loggedInUserEmail', user.email); // Store user info
        return true;
    }
    return false;
}

/**
 * Simulates user signup.
 * Stores new user data in localStorage.
 * @param {Object} userData - User data including name, email, and password.
 * @returns {Promise<boolean>} A promise that resolves to true if signup is successful, false otherwise.
 */
export async function signupUser(userData) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    let users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');

    // Check if user with this email already exists
    if (users.some(u => u.email === userData.email)) {
        return false; // User already exists
    }

    const newUser = { ...userData, id: `user-${Date.now()}` };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    return true;
}
