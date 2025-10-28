import { getCartItems, updateCartItemQuantity, removeFromCart, clearCart } from '../script.js';
import { renderCartItem } from '../components/cartItem.js';

export const renderCartPage = (container) => {
    const cartItems = getCartItems();

    container.innerHTML = `
        <h1 class="mb-4">Your Shopping Cart</h1>
        <div class="cart-container">
            <div id="cart-items-list"></div>
            <div id="cart-summary" class="cart-summary"></div>
            <div class="cart-actions mt-4 text-right">
                <button id="clear-cart-btn" class="btn btn-secondary">Clear Cart</button>
                <button id="checkout-btn" class="btn btn-success">Proceed to Checkout</button>
            </div>
        </div>
    `;

    const cartItemsList = container.querySelector('#cart-items-list');
    const cartSummary = container.querySelector('#cart-summary');
    const clearCartBtn = container.querySelector('#clear-cart-btn');
    const checkoutBtn = container.querySelector('#checkout-btn');

    if (cartItems.length === 0) {
        cartItemsList.innerHTML = '<p class="cart-empty-message">Your cart is empty. <a href="/products" data-link>Start shopping!</a></p>';
        cartSummary.innerHTML = '';
        clearCartBtn.style.display = 'none';
        checkoutBtn.style.display = 'none';
        return;
    }

    cartItems.forEach(item => {
        cartItemsList.appendChild(renderCartItem(item, updateCartItemQuantity, removeFromCart));
    });

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSummary.innerHTML = `<p>Total: <strong>$${total.toFixed(2)}</strong></p>`;

    clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    });

    checkoutBtn.addEventListener('click', () => {
        window.openModal('Checkout', 'Thank you for your purchase! This is a mock checkout. Your order has been placed.');
        clearCart();
    });
};
