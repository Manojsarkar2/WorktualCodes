export async function renderCart() {
    // Mock cart data (replace with actual cart logic)
    const cartItems = [
        { id: 101, name: 'Geeks T-Shirt', price: 25.00, quantity: 2 },
        { id: 102, name: 'Geeks Mug', price: 15.00, quantity: 1 }
    ];

    const cartItemsHTML = cartItems.map(item => `
        <li class="cart-item">
            <span>${item.name} (${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
        </li>
    `).join('');

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

    return `
        <section id="cart">
            <h2>Shopping Cart</h2>
            <ul id="cart-items">
                ${cartItemsHTML}
            </ul>
            <div id="cart-total">Total: $${total}</div>
            <button>Checkout</button>
        </section>
    `;
}