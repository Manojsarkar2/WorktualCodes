export function getCartView(cartItems, total) {
    return `
        <div class="container">
            <h1>Your Shopping Cart</h1>
            ${cartItems.length === 0 
                ? '<p>Your cart is empty. <a href="/products" data-link>Start shopping!</a></p>'
                : `
                    <ul class="cart-items">
                        ${cartItems.map(item => `
                            <li class="cart-item">
                                <div class="cart-item-details">
                                    <h4>${item.name}</h4>
                                    <p class="price">$${item.price.toFixed(2)}</p>
                                </div>
                                <div class="cart-item-controls">
                                    <input type="number" min="1" value="${item.quantity}" data-product-id="${item.id}" class="cart-item-quantity">
                                    <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Subtotal: <span>$${total.toFixed(2)}</span></p>
                        <p>Shipping: <span>Free</span></p>
                        <p class="total">Total: <span>$${total.toFixed(2)}</span></p>
                        <button id="checkout-btn">Proceed to Checkout</button>
                    </div>
                `
            }
        </div>
    `;
}
