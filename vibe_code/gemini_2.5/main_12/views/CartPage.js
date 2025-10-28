export function render(state) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const allProducts = state.products;

    if (cartItems.length === 0) {
        return `
            <div class="container cart-container">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="#/products" class="cta-button">Start Shopping</a>
            </div>
        `;
    }

    let total = 0;
    const cartHtml = cartItems.map(item => {
        const product = allProducts.find(p => p.id === item.id);
        if (!product) return '';
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="product-image-placeholder" style="width: 80px; height: 80px; font-size: 0.8rem;">Product Image</div>
                <div class="cart-item-info">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <input type="number" class="cart-item-quantity" data-product-id="${product.id}" value="${item.quantity}" min="1">
                    <p style="width: 80px; text-align: right;">$${itemTotal.toFixed(2)}</p>
                    <button class="remove-from-cart-btn" data-product-id="${product.id}" style="margin-left: 1rem; background: none; border: none; color: red; cursor: pointer; font-size: 1.2rem;">&times;</button>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="container cart-container">
            <h2>Your Shopping Cart</h2>
            <div class="cart-items">
                ${cartHtml}
            </div>
            <div class="cart-summary">
                <h2>Total: $${total.toFixed(2)}</h2>
                <button class="cta-button">Proceed to Checkout</button>
            </div>
        </div>
    `;
}