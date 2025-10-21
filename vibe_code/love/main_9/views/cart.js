function renderCart() {
    let cartItemsHTML = '';
    if (cart.length === 0) {
        cartItemsHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItemsHTML = '<ul id="cart-items">' + cart.map(item => `
            <li>
                ${item.title} - Genre: ${item.genre}
                <button class="remove-from-cart" data-anime-id="${item.id}">Remove</button>
            </li>
        `).join('') + '</ul>';
    }

    return `
        <div class="cart">
            <h2>Shopping Cart</h2>
            ${cartItemsHTML}
            <p>Total Items: ${cart.length}</p>
            <button>Checkout</button>
        </div>
    `;
}
