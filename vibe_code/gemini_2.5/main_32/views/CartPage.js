export const renderCartPage = (cartItems) => {
    if (cartItems.length === 0) {
        return `
            <h1 class="page-title">Your Shopping Cart</h1>
            <section class="home-section">
                <p>Your cart is empty. <a href="/products">Start shopping now!</a></p>
            </section>
        `;
    }

    const cartListHTML = cartItems.map(item => `
        <li class="cart-item">
            <div class="cart-item-placeholder">Item ID: ${item.id}</div>
            <div class="cart-item-details">
                <h3><a href="/product/${item.id}">${item.name}</a></h3>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <label for="qty-${item.id}">Qty:</label>
                <input type="number" id="qty-${item.id}" class="quantity-input" data-product-id="${item.id}" value="${item.quantity}" min="1" style="width: 60px;">
                <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
            </div>
        </li>
    `).join('');

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return `
        <h1 class="page-title">Your Shopping Cart</h1>
        <ul class="cart-items">
            ${cartListHTML}
        </ul>
        <div class="cart-total">
            Total: $${total.toFixed(2)}
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
};
