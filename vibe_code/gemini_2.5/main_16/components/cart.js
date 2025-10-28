export function renderCart(cartItems, cartTotal) {
    if (!cartItems || cartItems.length === 0) {
        return `
            <section class="cart-container">
                <h1 class="text-center">Your Cart</h1>
                <p class="text-center">Your cart is empty. <a href="/products" class="nav-link">Start shopping!</a></p>
            </section>
        `;
    }

    return `
        <section class="cart-container">
            <h1 class="text-center">Your Shopping Cart</h1>
            <div class="cart-items">
                ${cartItems.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">Item Image</div>
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>Price: $${item.price.toFixed(2)}</p>
                        </div>
                        <div class="cart-item-actions">
                            <label for="quantity-${item.id}" class="hidden">Quantity</label>
                            <input type="number" id="quantity-${item.id}" class="item-quantity-input" value="${item.quantity}" min="1" data-item-id="${item.id}">
                            <button class="primary update-quantity-btn" data-item-id="${item.id}">Update</button>
                            <button class="secondary remove-item-btn" data-item-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <h2>Cart Summary</h2>
                <p>Subtotal: <span>$${cartTotal.toFixed(2)}</span></p>
                <p>Shipping: <span>Free</span></p>
                <p><strong>Total: <span>$${cartTotal.toFixed(2)}</span></strong></p>
                <button class="accent checkout-button" id="checkout-button">Proceed to Checkout</button>
            </div>
        </section>
    `;
}
