export const renderCartView = (container, cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0);
    const deliveryCharge = cartItems.length > 0 && totalAmount < 500 ? 40 : 0; // Example: Free delivery over 500
    const finalAmount = totalAmount + deliveryCharge;

    container.innerHTML = `
        <div class="container cart-page">
            <h1>My Cart (${cartItems.length} ${cartItems.length === 1 ? 'Item' : 'Items'})</h1>
            ${cartItems.length === 0 ? 
                `<div class="cart-empty-message">
                    <p>Your cart is empty!</p>
                    <a href="/" data-nav-link="home">Start Shopping</a>
                </div>` : 
                `<div class="cart-items" id="cart-items-list"></div>
                <div class="cart-summary">
                    <h2>PRICE DETAILS</h2>
                    <div><span>Price (${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'})</span><span>₹${totalAmount.toFixed(2)}</span></div>
                    <div><span>Discount</span><span style="color: var(--success-green);">- ₹${totalDiscount.toFixed(2)}</span></div>
                    <div><span>Delivery Charges</span><span>${deliveryCharge === 0 ? '<span style="color: var(--success-green);">FREE</span>' : `₹${deliveryCharge.toFixed(2)}`}</span></div>
                    <div class="total"><span>Total Payable</span><span>₹${finalAmount.toFixed(2)}</span></div>
                    <button class="checkout-btn" data-action="checkout">PLACE ORDER</button>
                </div>`
            }
        </div>
    `;

    const cartItemsList = container.querySelector('#cart-items-list');
    if (cartItemsList) {
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-image-placeholder">Product Image</div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Seller: RetailNet</p>
                    <p class="price">₹${item.price.toFixed(2)} <span class="original-price">₹${item.originalPrice.toFixed(2)}</span> <span class="discount">${((1 - item.price / item.originalPrice) * 100).toFixed(0)}% Off</span></p>
                </div>
                <div class="cart-item-actions">
                    <button data-action="update-cart-item" data-product-id="${item.id}" data-change="decrease">-</button>
                    <input type="number" id="cart-quantity-${item.id}" value="${item.quantity}" min="1" data-product-id="${item.id}">
                    <button data-action="update-cart-item" data-product-id="${item.id}" data-change="increase">+</button>
                    <button data-action="remove-from-cart" data-product-id="${item.id}">REMOVE</button>
                </div>
            `;
            cartItemsList.appendChild(itemElement);
        });

        cartItemsList.addEventListener('click', (e) => {
            const target = e.target;
            if (target.dataset.action === 'update-cart-item') {
                const productId = target.dataset.productId;
                const quantityInput = document.querySelector(`#cart-quantity-${productId}`);
                let currentQuantity = parseInt(quantityInput.value, 10);
                if (target.dataset.change === 'increase') {
                    currentQuantity++;
                } else if (target.dataset.change === 'decrease' && currentQuantity > 1) {
                    currentQuantity--;
                }
                quantityInput.value = currentQuantity;
                // Trigger update in global state via script.js event listener
                const event = new Event('click', { bubbles: true });
                target.dispatchEvent(event);
            }
        });

        cartItemsList.addEventListener('change', (e) => {
            const target = e.target;
            if (target.id.startsWith('cart-quantity-')) {
                const productId = target.dataset.productId;
                // Trigger update in global state via script.js event listener
                const event = new Event('click', { bubbles: true });
                target.dispatchEvent(event);
            }
        });
    }
};
