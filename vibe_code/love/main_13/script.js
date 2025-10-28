import { renderNavbar } from './components/navbar.js';
import { renderHomeView } from './views/home.js';
import { renderCategoryView } from './views/category.js';
import { renderCartView } from './views/cart.js';
import { renderContactView } from './views/contact.js';
import { showLoginModal, showSignupModal } from './views/auth.js';
import { products } from './data/products.js';

// Global App State
const appState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: products,
    categories: [...new Set(products.map(p => p.category))]
};

// Save state to localStorage
const saveState = () => {
    localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
    localStorage.setItem('cart', JSON.stringify(appState.cart));
};

// Event delegation for navigation
document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-nav-link]');
    if (target) {
        e.preventDefault();
        const path = target.getAttribute('href');
        navigateTo(path);
    }

    const loginBtn = e.target.closest('[data-action="login"]');
    if (loginBtn) {
        e.preventDefault();
        showLoginModal(appState, updateAppStateAndRender);
    }

    const signupBtn = e.target.closest('[data-action="signup"]');
    if (signupBtn) {
        e.preventDefault();
        showSignupModal(appState, updateAppStateAndRender);
    }

    const logoutBtn = e.target.closest('[data-action="logout"]');
    if (logoutBtn) {
        e.preventDefault();
        appState.currentUser = null;
        saveState();
        updateAppStateAndRender();
        navigateTo('/');
    }

    const addToCartBtn = e.target.closest('[data-action="add-to-cart"]');
    if (addToCartBtn) {
        e.preventDefault();
        const productId = addToCartBtn.dataset.productId;
        addToCart(productId);
    }

    const updateCartBtn = e.target.closest('[data-action="update-cart-item"]');
    if (updateCartBtn) {
        e.preventDefault();
        const productId = updateCartBtn.dataset.productId;
        const quantityInput = document.querySelector(`#cart-quantity-${productId}`);
        const quantity = parseInt(quantityInput.value, 10);
        updateCartItem(productId, quantity);
    }

    const removeCartBtn = e.target.closest('[data-action="remove-from-cart"]');
    if (removeCartBtn) {
        e.preventDefault();
        const productId = removeCartBtn.dataset.productId;
        removeFromCart(productId);
    }

    const checkoutBtn = e.target.closest('[data-action="checkout"]');
    if (checkoutBtn) {
        e.preventDefault();
        checkout();
    }
});

// Cart Logic
const addToCart = (productId) => {
    const product = appState.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = appState.cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        appState.cart.push({ ...product, quantity: 1 });
    }
    saveState();
    updateAppStateAndRender();
    alert(`${product.name} added to cart!`);
};

const updateCartItem = (productId, quantity) => {
    const itemIndex = appState.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (quantity > 0) {
            appState.cart[itemIndex].quantity = quantity;
        } else {
            appState.cart.splice(itemIndex, 1);
        }
        saveState();
        updateAppStateAndRender();
    }
};

const removeFromCart = (productId) => {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    saveState();
    updateAppStateAndRender();
};

const checkout = () => {
    if (appState.cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out!');
        return;
    }
    if (!appState.currentUser) {
        alert('Please log in to proceed with checkout.');
        showLoginModal(appState, updateAppStateAndRender);
        return;
    }
    alert('Proceeding to checkout! (This is a mock checkout)');
    appState.cart = []; // Clear cart after mock checkout
    saveState();
    updateAppStateAndRender();
    navigateTo('/'); // Go to home after checkout
};

// Router
const router = () => {
    const path = window.location.pathname;
    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = ''; // Clear previous content

    if (path === '/') {
        renderHomeView(appRoot, appState.products);
    } else if (path.startsWith('/category/')) {
        const categoryName = path.split('/category/')[1];
        const categoryProducts = appState.products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
        renderCategoryView(appRoot, categoryName, categoryProducts);
    } else if (path === '/cart') {
        renderCartView(appRoot, appState.cart);
    } else if (path === '/contact') {
        renderContactView(appRoot);
    } else {
        appRoot.innerHTML = `<div class="container text-center" style="padding: 50px;"><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p><a href="/" data-nav-link="home">Go to Home</a></div>`;
    }
};

const navigateTo = (path) => {
    history.pushState({}, '', path);
    router();
    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
};

// Function to re-render necessary parts of the UI after state change
const updateAppStateAndRender = () => {
    renderNavbar(document.getElementById('main-header'), appState.currentUser, appState.cart.length, appState.categories, navigateTo);
    router(); // Re-render current page to reflect state changes (e.g., cart count, login status)
};

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    updateAppStateAndRender();
    window.onpopstate = router;
});
