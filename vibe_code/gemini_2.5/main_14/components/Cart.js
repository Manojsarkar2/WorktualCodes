import { updateCartUI } from '../script.js';

const CART_KEY = 'flowerShopCart';

let cart = [];

const saveCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
};

const renderCartItems = () => {
    if (cart.length === 0) {
        return `<p class="empty-cart-message">Your cart is empty.</p>`;
    }

    const itemsHtml = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="remove-from-cart-btn" data-id="${item.id}">&times;</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return `
        <div class="cart-items-list">${itemsHtml}</div>
        <div class="cart-total">Total: $${total.toFixed(2)}</div>
        <button class="btn btn-secondary checkout-btn">Checkout</button>
    `;
};

const handleCartInteraction = (e) => {
    if (e.target.classList.contains('remove-from-cart-btn')) {
        const id = e.target.dataset.id;
        Cart.removeItem(id);
        updateModalContent();
    }

    if (e.target.classList.contains('cart-item-quantity')) {
        const id = e.target.dataset.id;
        const quantity = parseInt(e.target.value, 10);
        Cart.updateQuantity(id, quantity);
        updateModalContent();
    }

    if (e.target.classList.contains('checkout-btn')) {
        alert('Thank you for your order! (This is a demo)');
        Cart.clear();
        Cart.hide();
    }
};

const updateModalContent = () => {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = renderCartItems();
    }
};

export const Cart = {
    init: () => {
        const storedCart = localStorage.getItem(CART_KEY);
        cart = storedCart ? JSON.parse(storedCart) : [];
    },
    getCart: () => cart,
    addItem: (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
    },
    removeItem: (productId) => {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
    },
    updateQuantity: (productId, quantity) => {
        const item = cart.find(item => item.id === productId);
        if (item && quantity > 0) {
            item.quantity = quantity;
        } else if (item) {
            cart = cart.filter(i => i.id !== productId);
        }
        saveCart();
    },
    clear: () => {
        cart = [];
        saveCart();
    },
    show: () => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="modal-overlay active">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Your Cart</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${renderCartItems()}
                    </div>
                </div>
            </div>
        `;

        const overlay = modalContainer.querySelector('.modal-overlay');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('close-modal')) {
                Cart.hide();
            }
        });

        const modalBody = modalContainer.querySelector('.modal-body');
        modalBody.addEventListener('change', handleCartInteraction);
        modalBody.addEventListener('click', handleCartInteraction);
    },
    hide: () => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = '';
    }
};

Cart.init();