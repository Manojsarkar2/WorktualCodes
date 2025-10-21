const Cart = {
    render: () => {
        // Mock cart items
        const cartItems = [
            { id: 1, name: 'WhatsApp Subscription', price: 4.99 },
            { id: 2, name: 'Premium Stickers Pack', price: 2.99 }
        ];

        let total = 0;
        cartItems.forEach(item => total += item.price);

        let cartItemsHTML = cartItems.map(item => `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toFixed(2)}</span>
            </div>
        `).join('');

        return `
            <div class="container" id="cart">
                <h2>Shopping Cart</h2>
                <div id="cart-items">
                    ${cartItemsHTML}
                </div>
                <div id="cart-total">Total: $${total.toFixed(2)}</div>
                <button id="checkout-button">Checkout</button>
            </div>
        `;
    },
    afterRender: () => {
        document.getElementById('checkout-button').addEventListener('click', () => {
            alert('Checkout successful! (No actual payment processing)');
        });
    }
};
