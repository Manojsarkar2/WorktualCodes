import { appState, updateCartItemQuantity, removeFromCart, calculateCartTotal } from '../script.js';

export const renderCart = (targetElement) => {
    targetElement.innerHTML = `
        <div class="cart-page container">
            <h1>Your Shopping Cart</h1>
            <div class="cart-items" id="cart-items-list"></div>
            <div class="cart-summary" id="cart-summary-details"></div>
        </div>
    `;

    const cartItemsList = document.getElementById('cart-items-list');
    const cartSummaryDetails = document.getElementById('cart-summary-details');

    if (appState.cart.length === 0) {
        cartItemsList.innerHTML = '<p style="text-align: center;">Your cart is empty. <a href="/products" data-nav style="color: #007185;">Start shopping!</a></p>';
        cartSummaryDetails.innerHTML = '';
        return;
    }

    cartItemsList.innerHTML = appState.cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image-placeholder">Product Image</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <label for="qty-${item.id}" class="hidden">Quantity</label>
                <input type="number" id="qty-${item.id}" value="${item.quantity}" min="1" class="cart-item-quantity" aria-label="Quantity for ${item.name}">
                <button class="remove-btn" data-product-id="${item.id}" aria-label="Remove ${item.name} from cart">Remove</button>
            </div>
        </div>
    `).join('');

    const subtotal = calculateCartTotal();
    const shipping = 5.00; // Mock shipping cost
    const total = subtotal + shipping;

    cartSummaryDetails.innerHTML = `
        <h2>Order Summary</h2>
        <p>Subtotal: <span>$${subtotal.toFixed(2)}</span></p>
        <p>Shipping: <span>$${shipping.toFixed(2)}</span></p>
        <p class="total">Order Total: <span>$${total.toFixed(2)}</span></p>
        <button class="checkout-btn" aria-label="Proceed to checkout">Proceed to Checkout</button>
    `;

    // Add event listeners for quantity changes and remove buttons
    cartItemsList.querySelectorAll('.cart-item-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = e.target.closest('.cart-item').dataset.productId;
            updateCartItemQuantity(productId, e.target.value);
        });
    });

    cartItemsList.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            removeFromCart(productId);
        });
    });

    cartSummaryDetails.querySelector('.checkout-btn').addEventListener('click', () => {
        alert('Proceeding to checkout! (This is a mock checkout.)');
        // In a real app, this would navigate to a checkout page or initiate payment process
    });
};
