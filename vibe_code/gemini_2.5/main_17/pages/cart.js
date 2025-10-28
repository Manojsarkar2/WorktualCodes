import * as Cart from '../utils/cart.js';
import * as Router from '../utils/router.js';

/**
 * Renders the HTML for the cart page and attaches event listeners.
 * @returns {string} The HTML string for the cart page.
 */
export function renderCartPage() {
    const cart = Cart.getCart();

    if (cart.length === 0) {
        return `
            <h1>Your Shopping Cart</h1>
            <p class="empty-cart-message">Your cart is currently empty. <a href="#/menu">Start browsing our menu!</a></p>
        `;
    }

    const cartItemsHtml = cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-product-id="${item.id}">
                <button class="btn remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join('');

    const total = Cart.getCartTotal();

    // Attach event listeners after a short delay to ensure content is in DOM
    setTimeout(() => {
        // Quantity update listeners
        document.querySelectorAll('.cart-quantity-input').forEach(input => {
            input.removeEventListener('change', handleQuantityChange);
            input.addEventListener('change', handleQuantityChange);
        });

        // Remove item listeners
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.removeEventListener('click', handleRemoveFromCart);
            button.addEventListener('click', handleRemoveFromCart);
        });

        // Checkout button listener
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.removeEventListener('click', handleCheckout);
            checkoutBtn.addEventListener('click', handleCheckout);
        }
    }, 0);

    return `
        <h1>Your Shopping Cart</h1>
        <div class="cart-items">
            ${cartItemsHtml}
        </div>
        <div class="cart-summary">
            <p>Subtotal: <strong>$${total.toFixed(2)}</strong></p>
            <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
        </div>
    `;
}

/**
 * Handles changes in item quantity in the cart.
 * @param {Event} event - The change event from the quantity input.
 */
function handleQuantityChange(event) {
    const productId = event.target.dataset.productId;
    const newQuantity = parseInt(event.target.value, 10);

    if (productId && !isNaN(newQuantity) && newQuantity > 0) {
        Cart.updateCartItem(productId, newQuantity);
        Router.navigateTo('/cart'); // Re-render cart to update totals and display changes
    } else if (newQuantity <= 0) {
        // If quantity drops to 0, consider removing the item or reset to 1
        Cart.removeFromCart(productId);
        Router.navigateTo('/cart');
    }
}

/**
 * Handles removing an item from the cart.
 * @param {Event} event - The click event from the remove button.
 */
function handleRemoveFromCart(event) {
    const productId = event.target.dataset.productId;
    if (productId) {
        Cart.removeFromCart(productId);
        Router.navigateTo('/cart'); // Re-render cart
    }
}

/**
 * Handles the checkout process.
 */
function handleCheckout() {
    const cart = Cart.getCart();
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    // Simulate a checkout process
    alert(`Proceeding to checkout with a total of $${Cart.getCartTotal().toFixed(2)}. (This is a mock checkout.)`);
    Cart.clearCart();
    Router.navigateTo('/home'); // Redirect to home or a confirmation page
    alert('Thank you for your order! Your cart has been cleared.');
}
