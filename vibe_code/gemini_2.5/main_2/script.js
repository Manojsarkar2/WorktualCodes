import { renderNavbar } from './components/navbar.js';
import { renderHome } from './views/home.js';
import { renderProducts } from './views/products.js';
import { renderContact } from './views/contact.js';
import { renderCart } from './views/cart.js';
import { showModal, hideModal } from './components/modal.js';
import { renderLoginForm, renderSignupForm, handleLogin, handleSignup } from './components/forms.js';

// --- Global State Management --- //
export const appState = {
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: [], // Will be loaded from data/products.js
    currentPage: window.location.pathname,
    searchQuery: '',
    sortOrder: 'default'
};

// Save cart and user to localStorage whenever they change
const saveState = () => {
    localStorage.setItem('cart', JSON.stringify(appState.cart));
    localStorage.setItem('currentUser', JSON.stringify(appState.user));
    updateCartCount();
};

// --- Router --- //
const routes = {
    '/': renderHome,
    '/products': renderProducts,
    '/contact': renderContact,
    '/cart': renderCart,
    '/login': () => showModal('login'),
    '/signup': () => showModal('signup')
};

const navigateTo = (path) => {
    if (appState.currentPage !== path) {
        history.pushState(null, null, path);
        appState.currentPage = path;
        renderContent();
    }
};

const renderContent = async () => {
    const appRoot = document.getElementById('app-root');
    const loadingSpinner = document.querySelector('.loading-spinner');

    if (loadingSpinner) loadingSpinner.classList.add('active');
    appRoot.innerHTML = ''; // Clear previous content

    const path = window.location.pathname;
    const renderFunction = routes[path] || routes['/']; // Default to home

    try {
        await renderFunction(appRoot); // Pass appRoot for content injection
    } catch (error) {
        console.error('Failed to render page:', error);
        appRoot.innerHTML = '<div class="container"><h1>Page Not Found</h1><p>The page you are looking for does not exist.</p></div>';
    }

    if (loadingSpinner) loadingSpinner.classList.remove('active');
    updateNavbarActiveLink();
};

// --- Navbar & Cart Count Update --- //
const updateCartCount = () => {
    const cartCountElement = document.getElementById('cart-item-count');
    if (cartCountElement) {
        const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
};

const updateNavbarActiveLink = () => {
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === appState.currentPage) {
            link.classList.add('active');
        }
    });
};

// --- Product Management --- //
export const getProducts = async () => {
    if (appState.products.length === 0) {
        // Simulate fetching from a data source
        const { products } = await import('./data/products.js');
        appState.products = products;
    }
    return appState.products;
};

// --- Cart Actions --- //
export const addToCart = (productId) => {
    const product = appState.products.find(p => p.id === productId);
    if (product) {
        const existingItem = appState.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            appState.cart.push({ ...product, quantity: 1 });
        }
        saveState();
        console.log('Cart updated:', appState.cart);
        alert(`${product.name} added to cart!`);
    }
};

export const updateCartItemQuantity = (productId, newQuantity) => {
    const item = appState.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(newQuantity, 10));
        saveState();
        renderCart(document.getElementById('app-root')); // Re-render cart view
    }
};

export const removeFromCart = (productId) => {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    saveState();
    renderCart(document.getElementById('app-root')); // Re-render cart view
};

export const calculateCartTotal = () => {
    return appState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// --- Authentication Actions --- //
export const loginUser = (username, password) => {
    // Mock authentication
    if (username === 'test@example.com' && password === 'password123') {
        appState.user = { username: username, isLoggedIn: true };
        saveState();
        hideModal();
        renderNavbar(document.getElementById('navbar-container')); // Re-render navbar to show user state
        navigateTo('/');
        alert('Login successful!');
        return true;
    }
    alert('Invalid credentials.');
    return false;
};

export const signupUser = (username, email, password) => {
    // Mock signup - in a real app, this would involve a backend
    console.log('Signing up:', { username, email, password });
    // For now, just log in the user after mock signup
    appState.user = { username: username, email: email, isLoggedIn: true };
    saveState();
    hideModal();
    renderNavbar(document.getElementById('navbar-container'));
    navigateTo('/');
    alert('Signup successful! Welcome, ' + username + '!');
    return true;
};

export const logoutUser = () => {
    appState.user = null;
    appState.cart = []; // Clear cart on logout
    saveState();
    renderNavbar(document.getElementById('navbar-container')); // Re-render navbar
    navigateTo('/');
    alert('Logged out successfully!');
};

// --- Event Listeners --- //
const setupGlobalEventListeners = () => {
    document.body.addEventListener('click', (e) => {
        // Handle navigation clicks
        const link = e.target.closest('a[href^="/"]');
        if (link && !link.classList.contains('no-spa')) { // Add 'no-spa' class to links that should cause full reload
            e.preventDefault();
            navigateTo(link.getAttribute('href'));
        }

        // Handle Add to Cart button clicks
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.dataset.productId;
            if (productId) {
                addToCart(productId);
            }
        }

        // Handle Login/Signup modal triggers
        if (e.target.id === 'login-link') {
            e.preventDefault();
            showModal('login');
        }
        if (e.target.id === 'signup-link') {
            e.preventDefault();
            showModal('signup');
        }
        if (e.target.id === 'logout-link') {
            e.preventDefault();
            logoutUser();
        }
    });

    window.addEventListener('popstate', () => {
        appState.currentPage = window.location.pathname;
        renderContent();
    });

    // Handle form submissions for login/signup modals
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'login-form') {
            e.preventDefault();
            handleLogin(e.target);
        }
        if (e.target.id === 'signup-form') {
            e.preventDefault();
            handleSignup(e.target);
        }
        if (e.target.id === 'contact-form') {
            e.preventDefault();
            // Basic client-side validation for contact form
            const form = e.target;
            const name = form.elements['name'].value;
            const email = form.elements['email'].value;
            const message = form.elements['message'].value;
            let isValid = true;

            document.querySelectorAll('.form-error').forEach(el => el.remove());

            if (!name.trim()) {
                isValid = false;
                form.elements['name'].insertAdjacentHTML('afterend', '<p class="form-error">Name is required.</p>');
            }
            if (!email.trim() || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
                isValid = false;
                form.elements['email'].insertAdjacentHTML('afterend', '<p class="form-error">Valid email is required.</p>');
            }
            if (!message.trim()) {
                isValid = false;
                form.elements['message'].insertAdjacentHTML('afterend', '<p class="form-error">Message is required.</p>');
            }

            if (isValid) {
                alert('Contact form submitted successfully! (Mock submission)');
                form.reset();
            } else {
                alert('Please correct the errors in the form.');
            }
        }
    });
};

// --- Initial Load --- //
const initializeApp = async () => {
    await getProducts(); // Load products initially
    renderNavbar(document.getElementById('navbar-container'));
    renderContent();
    setupGlobalEventListeners();
    updateCartCount(); // Ensure cart count is correct on load
};

initializeApp();
