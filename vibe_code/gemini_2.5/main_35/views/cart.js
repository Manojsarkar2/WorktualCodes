export const renderCart = (container, { cart, products, navigate, updateCartItemQuantity, removeCartItem }) => {
    const cartItems = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return product ? { ...product, quantity: item.quantity } : null;
    }).filter(Boolean);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 40 : 0; // Simple shipping logic
    const total = subtotal + shipping;

    container.innerHTML = `
        <div class="cart-container">
            <h1>Your Shopping Cart</h1>
            ${cartItems.length === 0 ? `
                <div class="page-content" style="text-align: center;">
                    <p>Your cart is empty. Start shopping now!</p>
                    <button onclick="window.router.navigate('/products')">Browse Products</button>
                </div>
            ` : `
                <div class="cart-items">
                    ${cartItems.map(item => `
                        <div class="cart-item">
                            <p style="font-size: 3em;">📦</p> <!-- Placeholder for image -->
                            <div class="cart-item-details">
                                <h3><a href="/products/${item.id}" onclick="event.preventDefault(); window.router.navigate('/products/${item.id}')">${item.name}</a></h3>
                                <p class="price">₹${item.price.toLocaleString('en-IN')}</p>
                            </div>
                            <div class="cart-item-actions">
                                <label for="quantity-${item.id}">Qty:</label>
                                <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" 
                                    onchange="window.appState.updateCartItemQuantity('${item.id}', parseInt(this.value))" 
                                    style="width: 60px; padding: 5px; border-radius: 4px; border: 1px solid var(--border-color-light); background-color: var(--bg-color-light); color: var(--text-color-light);">
                                <button onclick="window.appState.removeCartItem('${item.id}')">Remove</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary">
                    <h2>Order Summary</h2>
                    <p>Subtotal: <span>₹${subtotal.toLocaleString('en-IN')}</span></p>
                    <p>Shipping: <span>₹${shipping.toLocaleString('en-IN')}</span></p>
                    <p class="total">Total: <span>₹${total.toLocaleString('en-IN')}</span></p>
                    <button class="checkout-button" onclick="alert('Checkout functionality not implemented in this demo.')">Proceed to Checkout</button>
                </div>
            `}
        </div>
    `;
};
