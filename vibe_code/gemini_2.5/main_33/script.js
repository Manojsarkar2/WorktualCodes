import { getNavbarHTML } from './components/navbar.js';
import { getFooterHTML } from './components/footer.js';
import { getProductCardHTML } from './components/productCard.js';
import { createModal, openModal, closeModal } from './components/modal.js';
import { createCarousel, initCarousel } from './components/carousel.js';
import { createDropdown, initDropdown } from './components/dropdown.js';
import { createTabs, initTabs } from './components/tabs.js';
import { createAccordion, initAccordion } from './components/accordion.js';

import { getHomeView } from './views/home.js';
import { getProductsView } from './views/products.js';
import { getCartView } from './views/cart.js';
import { getContactView } from './views/contact.js';
import { getAboutView } from './views/about.js';

import { products as allProducts } from './data/products.js';

// Global State
const appState = {
    cart: [],
    theme: localStorage.getItem('theme') || 'light',
    currentPath: window.location.pathname,
    products: allProducts,
    filteredProducts: allProducts,
    searchTerm: '',
    selectedCategory: 'All'
};

// DOM Elements
const appContent = document.getElementById('app-content');
const appNavbar = document.getElementById('app-navbar');
const appFooter = document.getElementById('app-footer');
const appModalContainer = document.getElementById('app-modal-container');

// --- Theme Management ---
function applyTheme() {
    document.body.className = `theme-${appState.theme}`;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.textContent = appState.theme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
}

function toggleTheme() {
    appState.theme = appState.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', appState.theme);
    applyTheme();
}

// --- Cart Management ---
function addToCart(productId) {
    const product = appState.products.find(p => p.id === productId);
    if (product) {
        const cartItem = appState.cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            appState.cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartItemQuantity(productId, quantity) {
    const cartItem = appState.cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = parseInt(quantity, 10);
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        }
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function getCartTotal() {
    return appState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartDisplay() {
    if (appState.currentPath === '/cart') {
        renderView(getCartView(appState.cart, getCartTotal()));
    }
    // Update cart count in navbar if implemented
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'app-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 3000);
}

// --- Product Filtering & Search ---
function filterProducts() {
    let filtered = appState.products;

    if (appState.searchTerm) {
        const lowerCaseSearchTerm = appState.searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    if (appState.selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === appState.selectedCategory);
    }

    appState.filteredProducts = filtered;
    if (appState.currentPath === '/products') {
        renderView(getProductsView(appState.filteredProducts, getProductCardHTML));
        attachProductEventListeners();
    }
}

function handleSearchInput(event) {
    appState.searchTerm = event.target.value;
    filterProducts();
}

function handleCategoryChange(event) {
    appState.selectedCategory = event.target.value;
    filterProducts();
}

// --- Routing ---
const routes = {
    '/': getHomeView,
    '/products': () => getProductsView(appState.filteredProducts, getProductCardHTML),
    '/cart': () => getCartView(appState.cart, getCartTotal()),
    '/contact': getContactView,
    '/about': getAboutView
};

function renderView(htmlContent) {
    appContent.innerHTML = htmlContent;
    // Re-attach event listeners after content is rendered
    attachGlobalEventListeners();
    attachViewSpecificEventListeners();
}

function handleLocation() {
    const path = window.location.pathname;
    appState.currentPath = path;
    const viewFunction = routes[path] || routes['/']; // Default to home
    renderView(viewFunction());
}

function navigate(path) {
    if (window.location.pathname !== path) {
        window.history.pushState({}, path, path);
        handleLocation();
    }
}

// --- Event Listeners ---
function attachGlobalEventListeners() {
    // Navbar links
    document.querySelectorAll('[data-link]').forEach(link => {
        link.onclick = (event) => {
            event.preventDefault();
            navigate(link.getAttribute('href'));
            // Close hamburger menu if open
            const navLinks = document.querySelector('.navbar .nav-links');
            if (navLinks && navLinks.classList.contains('is-open')) {
                navLinks.classList.remove('is-open');
            }
        };
    });

    // Theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.onclick = toggleTheme;
    }

    // Hamburger menu
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.navbar .nav-links');
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.onclick = () => {
            navLinks.classList.toggle('is-open');
        };
    }
}

function attachViewSpecificEventListeners() {
    // Products page specific listeners
    if (appState.currentPath === '/products') {
        attachProductEventListeners();
        const searchInput = document.getElementById('product-search');
        if (searchInput) searchInput.oninput = handleSearchInput;

        const categorySelect = document.getElementById('product-category');
        if (categorySelect) categorySelect.onchange = handleCategoryChange;

        // Initialize carousel on home/products if present
        const carouselElement = document.getElementById('home-carousel');
        if (carouselElement) {
            initCarousel('home-carousel');
        }
    }

    // Cart page specific listeners
    if (appState.currentPath === '/cart') {
        document.querySelectorAll('.cart-item-quantity').forEach(input => {
            input.onchange = (event) => {
                const productId = event.target.dataset.productId;
                updateCartItemQuantity(productId, event.target.value);
            };
        });
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.onclick = (event) => {
                const productId = event.target.dataset.productId;
                removeFromCart(productId);
            };
        });
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.onclick = () => {
                openModal('Checkout', 'Thank you for your purchase! Your order has been placed.', () => {
                    appState.cart = []; // Clear cart after checkout
                    updateCartDisplay();
                    navigate('/');
                });
            };
        }
    }

    // Home page specific interactive components
    if (appState.currentPath === '/') {
        // Initialize carousel
        const carouselElement = document.getElementById('home-carousel');
        if (carouselElement) {
            initCarousel('home-carousel');
        }

        // Initialize dropdown
        const dropdownElement = document.getElementById('home-dropdown');
        if (dropdownElement) {
            initDropdown('home-dropdown');
        }

        // Initialize tabs
        const tabsElement = document.getElementById('home-tabs');
        if (tabsElement) {
            initTabs('home-tabs');
        }

        // Initialize accordion
        const accordionElement = document.getElementById('home-accordion');
        if (accordionElement) {
            initAccordion('home-accordion');
        }
    }
}

function attachProductEventListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.onclick = (event) => {
            const productId = event.target.dataset.productId;
            addToCart(productId);
        };
    });
}

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Render Navbar and Footer once
    appNavbar.innerHTML = getNavbarHTML(appState.theme);
    appFooter.innerHTML = getFooterHTML();

    // Apply initial theme
    applyTheme();

    // Create and append modal structure (handled by modal.js)
    createModal(appModalContainer);

    // Handle initial route
    handleLocation();

    // Listen for browser back/forward buttons
    window.onpopstate = handleLocation;
});

// Expose for debugging or global access if needed (not strictly SPA best practice but for vanilla JS demo)
window.appState = appState;
window.navigate = navigate;
window.openModal = openModal;
window.closeModal = closeModal;
