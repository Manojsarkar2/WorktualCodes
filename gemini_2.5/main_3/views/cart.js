import { getCart, updateCartItemQuantity, removeFromCart, clearCart, navigateTo } from '../script.js';

export const CartView = async () => {
    const cartItems = getCart();

    if (cartItems.length === 0) {
        return `
            <div class="container text-center" style="margin-top: 50px;">
                <h1 class="section-title">Your Cart is Empty</h1>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <button onclick="window.navigateTo('/products')" style="margin-top: 20px;">Start Shopping</button>
            </div>
        `;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 5.00; // Mock shipping cost
    const total = subtotal + shipping;

    return `
        <div class="container">
            <h1 class="section-title">Shopping Cart</h1>
            <div class="cart-items" id="cart-items-list">
                ${cartItems.map(item => `
                    <div class="cart-item" data-product-id="${item.id}">
                        <div class="cart-item-image" aria-hidden="true">
                            <img data-src="${item.image}" alt="${item.name}" loading="lazy" />
                        </div>
                        <div class="cart-item-details">
                            <h3><a href="/product/${item.id}" data-link>${item.name}</a></h3>
                            <p>Category: ${item.category}</p>
                            <div class="cart-item-quantity">
                                <label for="quantity-${item.id}" class="sr-only">Quantity for ${item.name}</label>
                                <button class="quantity-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity of ${item.name}">-</button>
                                <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" max="10" data-id="${item.id}" aria-live="polite">
                                <button class="quantity-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity of ${item.name}">+</button>
                                <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove ${item.name} from cart">Remove</button>
                            </div>
                        </div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>

            <div class="cart-summary">
                <h2>Order Summary</h2>
                <p>Subtotal: <span>$${subtotal.toFixed(2)}</span></p>
                <p>Shipping: <span>$${shipping.toFixed(2)}</span></p>
                <p class="total">Total: <span>$${total.toFixed(2)}</span></p>
                <button id="checkout-button">Proceed to Checkout</button>
                <button id="clear-cart-button" style="background-color: #D32F2F; margin-top: 10px;">Clear Cart</button>
            </div>
        </div>
    `;
};

CartView.afterRender = () => {
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const input = document.getElementById(`quantity-${productId}`);
            let newQuantity = parseInt(input.value, 10);

            if (e.target.dataset.action === 'increase') {
                newQuantity++;
            } else if (e.target.dataset.action === 'decrease') {
                newQuantity--;
            }
            updateCartItemQuantity(productId, newQuantity);
        });
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });

    document.getElementById('checkout-button').addEventListener('click', () => {
        alert('Checkout functionality not fully implemented in this demo. Your order has been placed (mock).');
        clearCart();
        navigateTo('/');
    });

    document.getElementById('clear-cart-button').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    });

    document.querySelectorAll('.cart-item-quantity input[type="number"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = e.target.dataset.id;
            let newQuantity = parseInt(e.target.value, 10);
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1; // Default to 1 if invalid
                e.target.value = 1;
            }
            updateCartItemQuantity(productId, newQuantity);
        });
    });
};
