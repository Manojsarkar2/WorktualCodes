import { appState, updateState } from '../utils/state.js';
import { initRouter } from '../utils/router.js';

export const renderCart = () => {
    const cartItems = appState.cart;
    const router = initRouter();

    if (cartItems.length === 0) {
        return `
            <section class="container section-padding text-center">
                <h1>Your Cart is Empty</h1>
                <p>Looks like you haven't added anything to your cart yet. Start exploring our amazing toys!</p>
                <a href="/products" class="btn" onclick="event.preventDefault(); initRouter().navigate('/products')">Shop Now</a>
            </section>
        `;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return `
        <section class="container section-padding">
            <h1 class="section-heading">Your Shopping Cart</h1>
            <div class="cart-items">
                ${cartItems.map(item => `
                    <div class="cart-item" data-product-id="${item.id}">
                        <div class="item-details">
                            <h3>${item.name}</h3>
                            <p>Price: $${item.price.toFixed(2)}</p>
                            <div class="quantity-controls">
                                <button class="quantity-btn decrease-quantity" aria-label="Decrease quantity">-</button>
                                <input type="number" value="${item.quantity}" min="1" class="item-quantity-input" aria-label="Item quantity">
                                <button class="quantity-btn increase-quantity" aria-label="Increase quantity">+</button>
                            </div>
                            <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button class="remove-item-btn btn" aria-label="Remove item">Remove</button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <h2>Cart Total: $${total.toFixed(2)}</h2>
                <button id="checkout-btn" class="btn">Proceed to Checkout</button>
                <button id="continue-shopping-btn" class="btn" onclick="event.preventDefault(); initRouter().navigate('/products')">Continue Shopping</button>
            </div>
        </section>
    `;
};

export const setupCartPage = () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');

    const updateCartDisplay = () => {
        const newCartHTML = renderCart();
        // Re-render the entire app content to update the cart, or just the cart section
        // For simplicity, we'll re-render the whole cart section
        const appElement = document.getElementById('app');
        appElement.innerHTML = newCartHTML;
        setupCartPage(); // Re-attach event listeners
    };

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.cart-item');
            if (!itemElement) return;

            const productId = itemElement.dataset.productId;
            let currentCart = [...appState.cart];
            const itemIndex = currentCart.findIndex(item => item.id === productId);

            if (itemIndex === -1) return;

            if (e.target.classList.contains('increase-quantity')) {
                currentCart[itemIndex].quantity++;
            } else if (e.target.classList.contains('decrease-quantity')) {
                if (currentCart[itemIndex].quantity > 1) {
                    currentCart[itemIndex].quantity--;
                }
            } else if (e.target.classList.contains('remove-item-btn')) {
                currentCart.splice(itemIndex, 1);
            }

            updateState({ cart: currentCart });
            updateCartDisplay();
        });

        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('item-quantity-input')) {
                const itemElement = e.target.closest('.cart-item');
                if (!itemElement) return;

                const productId = itemElement.dataset.productId;
                let newQuantity = parseInt(e.target.value, 10);

                if (isNaN(newQuantity) || newQuantity < 1) {
                    newQuantity = 1; // Default to 1 if invalid input
                    e.target.value = 1;
                }

                let currentCart = [...appState.cart];
                const itemIndex = currentCart.findIndex(item => item.id === productId);

                if (itemIndex > -1) {
                    currentCart[itemIndex].quantity = newQuantity;
                    updateState({ cart: currentCart });
                    updateCartDisplay();
                }
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (appState.cart.length === 0) {
                alert('Your cart is empty. Please add items before checking out.');
                return;
            }
            if (!appState.isAuthenticated) {
                alert('Please log in to proceed with checkout.');
                initRouter().navigate('/login');
                return;
            }
            alert('Proceeding to checkout! (This is a mock checkout)');
            updateState({ cart: [] }); // Clear cart after mock checkout
            initRouter().navigate('/'); // Go to home after checkout
        });
    }
};
