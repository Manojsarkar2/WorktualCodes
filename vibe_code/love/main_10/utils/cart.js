import { products } from '../data/products.js';
import { updateNavbarCartCount } from '../components/navbar.js';

const CART_STORAGE_KEY = 'amazonCloneCart';

/**
 * Dispatches a custom event to notify about cart changes.
 * @param {Array<Object>} cart - The current cart array.
 */
function dispatchCartUpdated(cart) {
    const event = new CustomEvent('cartUpdated', {
        detail: { cart: cart }
    });
    document.dispatchEvent(event);
}

/**
 * Retrieves cart items from localStorage.
 * @returns {Array<Object>} An array of cart items.
 */
export function getCartItems() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
        return Array.isArray(cart) ? cart : [];
    } catch (e) {
        console.error('Error parsing cart data from localStorage:', e);
        return [];
    }
}

/**
 * Saves cart items to localStorage.
 * @param {Array<Object>} cart - The cart array to save.
 */
function saveCartItems(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    dispatchCartUpdated(cart);
}

/**
 * Adds a product to the cart or updates its quantity if already present.
 * @param {string} productId - The ID of the product to add.
 * @param {number} quantity - The quantity to add (defaults to 1).
 */
export function addToCart(productId, quantity = 1) {
    const cart = getCartItems();
    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    const product = products.find(p => p.id === productId);

    if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
    }

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    saveCartItems(cart);
}

/**
 * Updates the quantity of a specific item in the cart.
 * @param {string} productId - The ID of the product to update.
 * @param {number} newQuantity - The new quantity for the item.
 */
export function updateCartItemQuantity(productId, newQuantity) {
    let cart = getCartItems();
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        saveCartItems(cart);
    }
}

/**
 * Removes an item from the cart.
 * @param {string} productId - The ID of the product to remove.
 */
export function removeCartItem(productId) {
    let cart = getCartItems();
    cart = cart.filter(item => item.productId !== productId);
    saveCartItems(cart);
}

/**
 * Clears all items from the cart.
 */
export function clearCart() {
    saveCartItems([]);
}

/**
 * Updates the cart count displayed in the navbar.
 */
export function updateCartCount() {
    const cart = getCartItems();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateNavbarCartCount(totalItems);
}
