let currentCart = [];
let cartUpdateCallback = () => {};

const saveCart = () => {
    cartUpdateCallback(currentCart);
};

const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    if (!cartItemsContainer || !cartTotalElement || !cartEmptyMessage) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (currentCart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartTotalElement.textContent = '$0.00';
        document.getElementById('checkout-btn').disabled = true;
        return;
    }

    cartEmptyMessage.style.display = 'none';
    document.getElementById('checkout-btn').disabled = false;

    currentCart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <input type="number" value="${item.quantity}" min="1" data-item-id="${item.id}" aria-label="Quantity for ${item.name}">
                <button class="btn btn-red remove-from-cart-btn" data-item-id="${item.id}" aria-label="Remove ${item.name} from cart">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;

    // Add event listeners for quantity change and remove buttons
    cartItemsContainer.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', (event) => {
            const itemId = event.target.dataset.itemId;
            const newQuantity = parseInt(event.target.value, 10);
            if (!isNaN(newQuantity) && newQuantity > 0) {
                updateItemQuantity(itemId, newQuantity);
            } else {
                event.target.value = currentCart.find(item => item.id === itemId)?.quantity || 1;
            }
        });
    });

    cartItemsContainer.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = event.target.dataset.itemId;
            removeItem(itemId);
        });
    });
};

const addItem = (product) => {
    const existingItem = currentCart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        currentCart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCartItems();
    return currentCart; // Return updated cart for external state management
};

const removeItem = (itemId) => {
    currentCart = currentCart.filter(item => item.id !== itemId);
    saveCart();
    renderCartItems();
};

const updateItemQuantity = (itemId, quantity) => {
    const item = currentCart.find(item => item.id === itemId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        renderCartItems();
    }
};

const clearCart = () => {
    currentCart = [];
    saveCart();
    renderCartItems();
};

const updateCartCount = (count) => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'block' : 'none';
    }
};

const setupCart = {
    init: (initialCart, onUpdate) => {
        currentCart = initialCart;
        cartUpdateCallback = onUpdate;
        renderCartItems();

        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (currentCart.length > 0) {
                    alert('Proceeding to checkout! (This is a mock checkout)');
                    console.log('Checkout items:', currentCart);
                    clearCart();
                    document.getElementById('cart-modal').style.display = 'none';
                } else {
                    alert('Your cart is empty!');
                }
            });
        }
    },
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    getCart: () => currentCart,
};

export { setupCart, updateCartCount };
