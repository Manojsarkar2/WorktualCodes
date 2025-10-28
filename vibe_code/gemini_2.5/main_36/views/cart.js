import { products } from '../data/products.js';

export const Cart = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
        return `
            <div class="card text-center">
                <h1>Your Cart is Empty</h1>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <button onclick="window.router.navigate('/products')">Start Shopping</button>
            </div>
        `;
    }

    let subtotal = 0;
    const itemsWithDetails = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            subtotal += product.price * item.quantity;
            return { ...item, ...product };
        }
        return null;
    }).filter(Boolean); // Remove nulls if product not found

    const shipping = 100; // Example shipping cost
    const total = subtotal + shipping;

    return `
        <h1>Your Shopping Cart</h1>
        <div class="cart-items">
            ${itemsWithDetails.map(item => `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: ₹${item.price.toLocaleString('en-IN')}</p>
                        <p>Total: ₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="window.appState.updateCartItem('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="window.appState.updateCartItem('${item.id}', ${item.quantity + 1})">+</button>
                        <button onclick="window.appState.removeFromCart('${item.id}')" style="background-color: var(--error-color);">Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="cart-summary">
            <h2>Order Summary</h2>
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <span>₹${subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div class="cart-summary-row">
                <span>Shipping:</span>
                <span>₹${shipping.toLocaleString('en-IN')}</span>
            </div>
            <div class="cart-summary-row total">
                <span>Total:</span>
                <span>₹${total.toLocaleString('en-IN')}</span>
            </div>
            <button onclick="window.router.navigate('/checkout')">Proceed to Checkout</button>
        </div>
    `;
};