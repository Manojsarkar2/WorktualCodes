export class CartSidebar {
    constructor(rootElement, initialCart, updateCartCallback) {
        this.root = rootElement;
        this.cart = initialCart;
        this.updateCartCallback = updateCartCallback;

        this.overlay = document.createElement('div');
        this.overlay.className = 'cart-sidebar-overlay';
        this.overlay.setAttribute('aria-hidden', 'true');

        this.sidebar = document.createElement('aside');
        this.sidebar.className = 'cart-sidebar';
        this.sidebar.setAttribute('role', 'dialog');
        this.sidebar.setAttribute('aria-modal', 'true');
        this.sidebar.setAttribute('aria-label', 'Shopping Cart');
        this.sidebar.setAttribute('tabindex', '-1');

        this.render();
        this.root.appendChild(this.overlay);
        this.root.appendChild(this.sidebar);

        this.overlay.addEventListener('click', () => this.close());
        this.boundKeyHandler = this.handleKeyDown.bind(this);
    }

    render() {
        this.sidebar.innerHTML = ''; // Clear existing content

        const header = document.createElement('div');
        header.className = 'cart-header';
        header.innerHTML = `
            <h2>My Cart</h2>
            <button class="cart-close-button" aria-label="Close cart">&times;</button>
        `;
        header.querySelector('.cart-close-button').addEventListener('click', () => this.close());
        this.sidebar.appendChild(header);

        this.itemsContainer = document.createElement('div');
        this.itemsContainer.className = 'cart-items';
        this.sidebar.appendChild(this.itemsContainer);

        this.renderCartItems();

        const summary = document.createElement('div');
        summary.className = 'cart-summary';
        const totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        summary.innerHTML = `
            <div class="total-price">
                <span>Total:</span>
                <span>₹${totalPrice.toLocaleString()}</span>
            </div>
            <button class="primary checkout-button">Proceed to Checkout</button>
        `;
        summary.querySelector('.checkout-button').addEventListener('click', () => {
            alert('Proceeding to checkout! (This is a mock checkout)');
            this.close();
            // In a real app, navigate to checkout page: window.location.hash = '#checkout';
        });
        this.sidebar.appendChild(summary);

        if (this.cart.length === 0) {
            this.itemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty!</p>';
            summary.querySelector('.checkout-button').disabled = true;
        }
    }

    renderCartItem(item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.setAttribute('aria-label', `Item: ${item.name}`);

        itemDiv.innerHTML = `
            <div class="cart-item-image-placeholder">📦</div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="price">₹${item.price.toLocaleString()}</p>
                <div class="cart-item-actions">
                    <button class="decrement-quantity" aria-label="Decrease quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="increment-quantity" aria-label="Increase quantity">+</button>
                    <button class="remove-item-button" aria-label="Remove item">Remove</button>
                </div>
            </div>
        `;

        itemDiv.querySelector('.decrement-quantity').addEventListener('click', () => this.updateCartCallback(item, -1));
        itemDiv.querySelector('.increment-quantity').addEventListener('click', () => this.updateCartCallback(item, 1));
        itemDiv.querySelector('.remove-item-button').addEventListener('click', () => this.updateCartCallback(item, -item.quantity));

        return itemDiv;
    }

    renderCartItems() {
        this.itemsContainer.innerHTML = '';
        this.cart.forEach(item => {
            this.itemsContainer.appendChild(this.renderCartItem(item));
        });
    }

    updateCartItems(newCart) {
        this.cart = newCart;
        this.render(); // Re-render the entire sidebar to reflect changes
    }

    open() {
        this.overlay.classList.add('active');
        this.sidebar.classList.add('active');
        this.overlay.setAttribute('aria-hidden', 'false');
        this.sidebar.focus();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', this.boundKeyHandler);
    }

    close() {
        this.overlay.classList.remove('active');
        this.sidebar.classList.remove('active');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', this.boundKeyHandler);
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.close();
        }
        // Optional: Trap focus within the sidebar
        if (event.key === 'Tab') {
            const focusableElements = this.sidebar.querySelectorAll(
                'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusable || document.activeElement === this.sidebar) {
                    lastFocusable.focus();
                    event.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    event.preventDefault();
                }
            }
        }
    }
}
