const LOCAL_STORAGE_CART_KEY = 'e-shop-cart';
const LOCAL_STORAGE_USERS_KEY = 'e-shop-users';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'e-shop-current-user';

// Initial state loaded from localStorage
export const state = {
    cart: JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [],
    users: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY)) || [],
    currentUser: JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY)) || null
};

// --- Cart Management --- //

function saveCart() {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(state.cart));
    window.dispatchEvent(new Event('cartUpdated')); // Notify UI of cart change
}

export function addToCart(product) {
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        state.cart.push({ ...product, quantity: product.quantity || 1 });
    }
    saveCart();
}

export function updateCartItemQuantity(productId, quantity) {
    const item = state.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

export function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
}

export function clearCart() {
    state.cart = [];
    saveCart();
}

export function getCartTotal() {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// --- User Management (for mock auth) --- //

function saveUsers() {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(state.users));
}

function saveCurrentUser() {
    localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(state.currentUser));
    window.dispatchEvent(new Event('authUpdated')); // Notify UI of auth change
}

export function addUser(username, password) {
    if (state.users.some(user => user.username === username)) {
        return false; // User already exists
    }
    state.users.push({ username, password }); // In a real app, password would be hashed
    saveUsers();
    return true;
}

export function setCurrentUser(user) {
    state.currentUser = user;
    saveCurrentUser();
}

export function clearCurrentUser() {
    state.currentUser = null;
    saveCurrentUser();
}
