const Cart = {
    render: async ({ cart }) => {
        if (cart.length === 0) {
            return `
                <div class="container" style="text-align: center;">
                    <h1>Your Cart is Empty</h1>
                    <p>Looks like you haven't added any flowers yet.</p>
                    <a href="#/shop" class="btn" style="margin-top: 1rem;">Continue Shopping</a>
                </div>
            `;
        }

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        return `
            <div class="container">
                <h1>Your Shopping Cart</h1>
                <div class="cart-container">
                    <div class="cart-items">
                        ${cart.map(item => `
                            <div class="cart-item" data-id="${item.id}">
                                <div class="cart-item-img"></div>
                                <div class="cart-item-info">
                                    <h3>${item.name}</h3>
                                    <p>$${(item.price || 0).toFixed(2)}</p>
                                </div>
                                <div class="cart-item-quantity">
                                    <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                                </div>
                                <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cart-summary">
                        <h3>Order Summary</h3>
                        <div class="summary-line">
                            <span>Subtotal</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-line">
                            <span>Estimated Tax</span>
                            <span>$${tax.toFixed(2)}</span>
                        </div>
                        <div class="summary-line" style="font-weight: bold; font-size: 1.2rem;">
                            <span>Total</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                        <button class="btn" style="width: 100%;">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        `;
    },
    after_render: ({ updateCart }) => {
        document.querySelectorAll('.increase-btn').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                updateCart(productId, 1);
            });
        });

        document.querySelectorAll('.decrease-btn').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                updateCart(productId, -1);
            });
        });
    }
};

export default Cart;
