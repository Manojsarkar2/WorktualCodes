/**
 * Utility functions for managing the shopping cart.
 * Uses localStorage for persistence.
 */

const CART_STORAGE_KEY = 'shoppingCart';

/**
 * Retrieves the current cart from localStorage.
 * @returns {Array<Object>} An array of cart items.
 */
export function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return [];
    }
}

/**
 * Saves the given cart to localStorage.
 * @param {Array<Object>} cart - The cart array to save.
 */
export function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Adds a product to the cart or updates its quantity if it already exists.
 * @param {Object} product - The product object to add.
 * @param {number} quantity - The quantity to add.
 */
export function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
    document.dispatchEvent(new CustomEvent('cart-updated')); // Notify other components
}

/**
 * Updates the quantity of a specific item in the cart.
 * @param {string} productId - The ID of the product to update.
 * @param {number} newQuantity - The new quantity for the product.
 */
export function updateCartItem(productId, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Remove if quantity is zero or less
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
    }
    saveCart(cart);
    document.dispatchEvent(new CustomEvent('cart-updated')); // Notify other components
}

/**
 * Removes an item from the cart.
 * @param {string} productId - The ID of the product to remove.
 */
export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    document.dispatchEvent(new CustomEvent('cart-updated')); // Notify other components
}

/**
 * Clears all items from the cart.
 */
export function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    document.dispatchEvent(new CustomEvent('cart-updated')); // Notify other components
}

/**
 * Calculates the total price of all items in the cart.
 * @returns {number} The total price.
 */
export function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Gets the total number of items (units) in the cart.
 * @returns {number} The total quantity of items.
 */
export function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}
