import { setupRouter, navigateTo } from './utils/router.js';
import { state, addToCart, updateCartItemQuantity, removeFromCart, clearCart, getCartTotal } from './utils/state.js';
import { login, signup, logout, getCurrentUser } from './utils/auth.js';

// Import Components
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './components/home.js';
import { renderProducts } from './components/products.js';
import { renderProductDetail } from './components/productDetail.js';
import { renderCart } from './components/cart.js';
import { renderCheckout } from './components/checkout.js';
import { renderContact } from './components/contact.js';
import { renderLogin } from './components/login.js';
import { renderSignup } from './components/signup.js';

const appDiv = document.getElementById('app');
const headerContainer = document.getElementById('header-container');
const footerContainer = document.getElementById('footer-container');

// Global App State (for reactivity, though simple here)
const appState = {
    currentUser: getCurrentUser(),
    cart: state.cart,
    activePath: window.location.pathname
};

// Function to update the entire UI based on appState
function updateUI() {
    headerContainer.innerHTML = renderHeader(appState.activePath, appState.currentUser, appState.cart.length);
    footerContainer.innerHTML = renderFooter();
    attachGlobalEventListeners();
    renderCurrentPage();
}

// Function to render the current page based on the URL
function renderCurrentPage() {
    const path = window.location.pathname;
    appState.activePath = path;

    // Specific rendering logic for product details
    if (path.startsWith('/products/')) {
        const productId = path.split('/')[2];
        appDiv.innerHTML = renderProductDetail(productId);
        attachProductDetailEventListeners(productId);
    } else {
        // Use the router for other paths
        router.route(path);
    }
}

// Attach global event listeners (e.g., for navigation, hamburger menu)
function attachGlobalEventListeners() {
    // Clear previous listeners to prevent duplicates
    headerContainer.removeEventListener('click', handleHeaderClick);
    headerContainer.addEventListener('click', handleHeaderClick);

    // Handle cart updates from state.js
    window.removeEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Handle auth updates from auth.js
    window.removeEventListener('authUpdated', handleAuthUpdate);
    window.addEventListener('authUpdated', handleAuthUpdate);
}

function handleHeaderClick(event) {
    const target = event.target;

    // Navigation links
    if (target.matches('.nav-link')) {
        event.preventDefault();
        navigateTo(target.getAttribute('href'));
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }

    // Hamburger menu toggle
    if (target.closest('.hamburger-menu')) {
        document.querySelector('.nav-links').classList.toggle('active');
    }

    // Logout button
    if (target.matches('#logout-button')) {
        event.preventDefault();
        logout();
        navigateTo('/');
    }
}

function handleCartUpdate() {
    appState.cart = state.cart;
    // Re-render header to update cart count
    headerContainer.innerHTML = renderHeader(appState.activePath, appState.currentUser, appState.cart.length);
    // If on cart page, re-render cart content
    if (appState.activePath === '/cart') {
        appDiv.innerHTML = renderCart(appState.cart, getCartTotal());
        attachCartEventListeners();
    }
}

function handleAuthUpdate() {
    appState.currentUser = getCurrentUser();
    // Re-render header to update login/logout links
    headerContainer.innerHTML = renderHeader(appState.activePath, appState.currentUser, appState.cart.length);
    attachGlobalEventListeners(); // Re-attach listeners for new header elements
}

// Event listeners for specific pages/components
function attachHomeEventListeners() {
    const featuredProductsContainer = appDiv.querySelector('.featured-products-grid');
    if (featuredProductsContainer) {
        featuredProductsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const productId = event.target.dataset.productId;
                const productName = event.target.dataset.productName;
                const productPrice = parseFloat(event.target.dataset.productPrice);
                addToCart({ id: productId, name: productName, price: productPrice, quantity: 1 });
                alert(`${productName} added to cart!`);
            }
            if (event.target.closest('.product-card')) {
                const productId = event.target.closest('.product-card').dataset.productId;
                navigateTo(`/products/${productId}`);
            }
        });
    }
}

function attachProductsEventListeners() {
    const productsGrid = appDiv.querySelector('.product-grid');
    if (productsGrid) {
        productsGrid.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const productId = event.target.dataset.productId;
                const productName = event.target.dataset.productName;
                const productPrice = parseFloat(event.target.dataset.productPrice);
                addToCart({ id: productId, name: productName, price: productPrice, quantity: 1 });
                alert(`${productName} added to cart!`);
            }
            if (event.target.closest('.product-card')) {
                const productId = event.target.closest('.product-card').dataset.productId;
                navigateTo(`/products/${productId}`);
            }
        });
    }
}

function attachProductDetailEventListeners(productId) {
    const addToCartBtn = appDiv.querySelector('#add-to-cart-detail-btn');
    const quantityInput = appDiv.querySelector('#product-quantity');

    if (addToCartBtn && quantityInput) {
        addToCartBtn.addEventListener('click', () => {
            const product = JSON.parse(addToCartBtn.dataset.product);
            const quantity = parseInt(quantityInput.value, 10);
            if (quantity > 0) {
                addToCart({ ...product, quantity: quantity });
                alert(`${quantity} x ${product.name} added to cart!`);
            } else {
                alert('Please enter a valid quantity.');
            }
        });
    }
}

function attachCartEventListeners() {
    const cartItemsContainer = appDiv.querySelector('.cart-items');
    const checkoutButton = appDiv.querySelector('#checkout-button');

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            const target = event.target;
            const itemId = target.dataset.itemId;

            if (target.classList.contains('remove-item-btn')) {
                removeFromCart(itemId);
            } else if (target.classList.contains('update-quantity-btn')) {
                const quantityInput = target.closest('.cart-item-actions').querySelector('.item-quantity-input');
                const newQuantity = parseInt(quantityInput.value, 10);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                    updateCartItemQuantity(itemId, newQuantity);
                } else {
                    alert('Quantity must be a positive number.');
                    quantityInput.value = state.cart.find(item => item.id === itemId).quantity; // Reset to current quantity
                }
            }
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            navigateTo('/checkout');
        });
    }
}

function attachCheckoutEventListeners() {
    const checkoutForm = appDiv.querySelector('#checkout-form');
    const placeOrderBtn = appDiv.querySelector('#place-order-button');

    if (checkoutForm && placeOrderBtn) {
        checkoutForm.addEventListener('submit', (event) => event.preventDefault()); // Prevent default form submission
        placeOrderBtn.addEventListener('click', () => {
            // Basic validation
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const zip = document.getElementById('zip').value;
            const payment = document.getElementById('paymentMethod').value;

            if (!name || !email || !address || !city || !zip || !payment) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate order placement
            alert('Order placed successfully! Thank you for your purchase.');
            clearCart();
            navigateTo('/');
        });
    }
}

function attachContactEventListeners() {
    const contactForm = appDiv.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
        });
    }
}

function attachLoginEventListeners() {
    const loginForm = appDiv.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            if (!username || !password) {
                alert('Please enter both username and password.');
                return;
            }

            const success = await login(username, password);
            if (success) {
                alert('Logged in successfully!');
                navigateTo('/');
            } else {
                alert('Invalid username or password.');
            }
        });
    }
}

function attachSignupEventListeners() {
    const signupForm = appDiv.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('signupUsername').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!username || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            const success = await signup(username, password);
            if (success) {
                alert('Account created successfully! Please log in.');
                navigateTo('/login');
            } else {
                alert('Username already exists.');
            }
        });
    }
}

// Define routes and their rendering functions
const routes = {
    '/': () => {
        appDiv.innerHTML = renderHome();
        attachHomeEventListeners();
    },
    '/products': () => {
        appDiv.innerHTML = renderProducts();
        attachProductsEventListeners();
    },
    '/cart': () => {
        appDiv.innerHTML = renderCart(appState.cart, getCartTotal());
        attachCartEventListeners();
    },
    '/checkout': () => {
        if (appState.cart.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            navigateTo('/cart');
            return;
        }
        appDiv.innerHTML = renderCheckout(appState.cart, getCartTotal());
        attachCheckoutEventListeners();
    },
    '/contact': () => {
        appDiv.innerHTML = renderContact();
        attachContactEventListeners();
    },
    '/login': () => {
        appDiv.innerHTML = renderLogin();
        attachLoginEventListeners();
    },
    '/signup': () => {
        appDiv.innerHTML = renderSignup();
        attachSignupEventListeners();
    },
    // Fallback for 404
    '404': () => {
        appDiv.innerHTML = `
            <section class="text-center" style="padding: 100px 0;">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <button class="primary" onclick="window.history.pushState({}, '', '/'); app.init();">Go to Home</button>
            </section>
        `;
    }
};

// Initialize router
const router = setupRouter(routes, appDiv, updateUI);

// Initial render
updateUI();

// Listen for browser back/forward buttons
window.addEventListener('popstate', () => {
    updateUI();
});

// Expose app functions globally for inline event handlers if necessary (e.g., 404 button)
window.app = {
    init: updateUI,
    navigateTo: navigateTo
};
