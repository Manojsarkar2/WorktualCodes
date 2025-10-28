export const renderCartItem = (item, updateQuantityCallback, removeCallback) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.setAttribute('data-product-id', item.id);

    itemElement.innerHTML = `
        <div class="cart-item-image-placeholder">Item</div>
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p class="price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-actions">
            <button class="btn btn-secondary btn-sm decrease-quantity" aria-label="Decrease quantity">-</button>
            <input type="number" class="form-control item-quantity" value="${item.quantity}" min="1" aria-label="Product quantity"/>
            <button class="btn btn-secondary btn-sm increase-quantity" aria-label="Increase quantity">+</button>
            <button class="btn btn-danger btn-sm remove-item" aria-label="Remove item">&times;</button>
        </div>
    `;

    const quantityInput = itemElement.querySelector('.item-quantity');
    const decreaseBtn = itemElement.querySelector('.decrease-quantity');
    const increaseBtn = itemElement.querySelector('.increase-quantity');
    const removeBtn = itemElement.querySelector('.remove-item');

    quantityInput.addEventListener('change', (e) => {
        updateQuantityCallback(item.id, e.target.value);
    });

    decreaseBtn.addEventListener('click', () => {
        quantityInput.value = Math.max(1, parseInt(quantityInput.value, 10) - 1);
        updateQuantityCallback(item.id, quantityInput.value);
    });

    increaseBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value, 10) + 1;
        updateQuantityCallback(item.id, quantityInput.value);
    });

    removeBtn.addEventListener('click', () => {
        removeCallback(item.id);
    });

    return itemElement;
};
