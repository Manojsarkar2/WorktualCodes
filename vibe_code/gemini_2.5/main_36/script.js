import { Navbar } from './components/navbar.js';
import { Footer } from './components/footer.js';
import { Home } from './views/home.js';
import { Contact } from './views/contact.js';
import { ProductList } from './views/productlist.js';
import { ProductDetail } from './views/productdetail.js';
import { Cart } from './views/cart.js';
import { Categories } from './views/categories.js';
import { Login } from './views/login.js';
import { Signup } from './views/signup.js';
import { Checkout } from './views/checkout.js';

// Global application state
const appState = {
    theme: localStorage.getItem('theme') || 'light-theme',
    cart: JSON.parse(localStorage.getItem('cart')) || [], // [{ productId: '1', quantity: 2 }]
    user: null // For future login functionality
};

// Save state to localStorage
const saveState = () => {
    localStorage.setItem('theme', appState.theme);
    localStorage.setItem('cart', JSON.stringify(appState.cart));
};

// Render function to update the UI
const render = async () => {
    document.body.className = appState.theme;

    const navbarContainer = document.getElementById('navbar-container');
    const content = document.getElementById('content');
    const footerContainer = document.getElementById('footer-container');

    // Render Navbar
    navbarContainer.innerHTML = Navbar(appState.theme);
    attachNavbarEventListeners();

    // Render Footer
    footerContainer.innerHTML = Footer();

    // Determine which view to render based on the current URL
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    let viewContent = '';

    if (path === '/') {
        viewContent = Home();
    } else if (path === '/products') {
        viewContent = ProductList(params);
    } else if (path.startsWith('/product/')) {
        const productId = path.split('/')[2];
        viewContent = ProductDetail(productId);
    } else if (path === '/cart') {
        viewContent = Cart(appState.cart);
    } else if (path === '/contact') {
        viewContent = Contact();
    } else if (path === '/categories') {
        viewContent = Categories();
    } else if (path === '/login') {
        viewContent = Login();
    } else if (path === '/signup') {
        viewContent = Signup();
    } else if (path === '/checkout') {
        viewContent = Checkout();
    }
    else {
        viewContent = `
            <div class="card text-center">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <button onclick="window.router.navigate('/')">Go to Home</button>
            </div>
        `;
    }

    content.innerHTML = viewContent;
    attachFormEventListeners(); // Attach event listeners for forms on the current page
};

// Client-side router
const navigate = (path) => {
    if (window.location.pathname !== path) {
        history.pushState(null, null, path);
        render();
    }
};

// Attach event listeners for navigation links
const attachLinkEventListeners = () => {
    document.body.addEventListener('click', e => {
        const target = e.target.closest('[data-link]');
        if (target) {
            e.preventDefault();
            navigate(target.href);
        }
    });
};

// Attach event listeners for Navbar specific elements
const attachNavbarEventListeners = () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = () => {
            appState.theme = appState.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
            saveState();
            render(); // Re-render to update theme icon and body class
        };
    }

    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarNav = document.getElementById('navbar-nav');
    if (navbarToggle && navbarNav) {
        navbarToggle.onclick = () => {
            navbarNav.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        };
        // Close nav when a link is clicked
        navbarNav.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                navbarNav.classList.remove('active');
                navbarToggle.classList.remove('active');
            };
        });
    }
};

// Attach event listeners for forms (e.g., contact, login, signup, checkout)
const attachFormEventListeners = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            alert('Contact form submitted! (This is a demo, no actual submission)');
            contactForm.reset();
        };
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            alert('Login attempted! (This is a demo)');
            // In a real app, you'd send data to a server
            loginForm.reset();
            navigate('/'); // Redirect to home after login attempt
        };
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.onsubmit = (e) => {
            e.preventDefault();
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            alert('Signup attempted! (This is a demo)');
            signupForm.reset();
            navigate('/login'); // Redirect to login after signup attempt
        };
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.onsubmit = (e) => {
            e.preventDefault();
            alert('Order Placed! (This is a demo, no actual payment)');
            appState.cart = []; // Clear cart after checkout
            saveState();
            checkoutForm.reset();
            navigate('/'); // Redirect to home after checkout
        };
    }
};

// Cart management functions
const addToCart = (productId) => {
    const existingItem = appState.cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        appState.cart.push({ productId, quantity: 1 });
    }
    saveState();
    alert('Product added to cart!');
    render(); // Re-render to update cart icon/count if implemented
};

const removeFromCart = (productId) => {
    appState.cart = appState.cart.filter(item => item.productId !== productId);
    saveState();
    render();
};

const updateCartItem = (productId, newQuantity) => {
    const item = appState.cart.find(item => item.productId === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveState();
            render();
        }
    }
};

// Expose global functions for inline event handlers (e.g., in views)
window.router = { navigate };
window.appState = {
    addToCart,
    removeFromCart,
    updateCartItem,
    getCart: () => appState.cart // For potential future use
};

// Initial render and event listeners
window.addEventListener('popstate', render); // Handle browser back/forward buttons
window.addEventListener('DOMContentLoaded', () => {
    render();
    attachLinkEventListeners();
});