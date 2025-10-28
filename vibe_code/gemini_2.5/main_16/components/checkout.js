export function renderCheckout(cartItems, cartTotal) {
    if (!cartItems || cartItems.length === 0) {
        return `
            <section class="checkout-container">
                <h1 class="text-center">Checkout</h1>
                <p class="text-center">Your cart is empty. <a href="/products" class="nav-link">Start shopping!</a></p>
            </section>
        `;
    }

    return `
        <section class="checkout-container">
            <h1 class="text-center">Checkout</h1>
            <div class="checkout-sections">
                <div class="checkout-form-section">
                    <h2>Shipping Information</h2>
                    <form id="checkout-form">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" id="address" name="address" required>
                        </div>
                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" id="city" name="city" required>
                        </div>
                        <div class="form-group">
                            <label for="zip">Zip Code</label>
                            <input type="text" id="zip" name="zip" required>
                        </div>

                        <h2>Payment Method</h2>
                        <div class="form-group">
                            <label for="paymentMethod">Select Payment</label>
                            <select id="paymentMethod" name="paymentMethod" required>
                                <option value="">-- Select --</option>
                                <option value="creditCard">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="bankTransfer">Bank Transfer</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="checkout-summary-section">
                    <h2>Order Summary</h2>
                    <div class="item-list">
                        ${cartItems.map(item => `
                            <div>
                                <span>${item.name} x ${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="total-price">
                        <span>Total:</span>
                        <span>$${cartTotal.toFixed(2)}</span>
                    </div>
                    <button class="accent place-order-button" id="place-order-button">Place Order</button>
                </div>
            </div>
        </section>
    `;
}
