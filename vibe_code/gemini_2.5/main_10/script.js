import { Navbar } from './components/Navbar.js';
import { Carousel } from './components/Carousel.js';
import { ProductCard } from './components/ProductCard.js';
import { Modal } from './components/Modal.js';
import { CartSidebar } from './components/CartSidebar.js';
import { LoginForm, SignupForm, ContactForm } from './components/Forms.js';

import { HomeView } from './views/HomeView.js';
import { ProductsView } from './views/ProductsView.js';
import { CategoriesView } from './views/CategoriesView.js';
import { OffersView } from './views/OffersView.js';
import { ContactView } from './views/ContactView.js';
import { AuthView } from './views/AuthView.js';

import { products } from './data/products.js';

// Global App State
const appState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: products,
    currentPath: window.location.hash.slice(1) || '/',
    modal: null, // To hold the current modal instance
    cartSidebar: null // To hold the current cart sidebar instance
};

// --- State Management Functions ---
const saveState = () => {
    localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
    localStorage.setItem('cart', JSON.stringify(appState.cart));
};

const updateCart = (product, quantityChange) => {
    const existingItemIndex = appState.cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        appState.cart[existingItemIndex].quantity += quantityChange;
        if (appState.cart[existingItemIndex].quantity <= 0) {
            appState.cart.splice(existingItemIndex, 1);
        }
    } else if (quantityChange > 0) {
        appState.cart.push({ ...product, quantity: quantityChange });
    }
    saveState();
    renderCartSidebar();
    updateNavbarCartCount();
};

const updateCurrentUser = (user) => {
    appState.currentUser = user;
    saveState();
    renderNavbar(); // Re-render navbar to update login/logout state
};

// --- Router --- 
const router = async () => {
    const path = window.location.hash.slice(1) || '/';
    appState.currentPath = path;
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear previous content

    // Close any open modals or sidebars on route change
    if (appState.modal) appState.modal.close();
    if (appState.cartSidebar) appState.cartSidebar.close();

    switch (path) {
        case '/':
        case 'home':
            mainContent.appendChild(HomeView(appState.products, handleAddToCart));
            Carousel.init('.hero-carousel');
            Carousel.init('.product-section .carousel');
            break;
        case 'products':
            mainContent.appendChild(ProductsView(appState.products, handleAddToCart));
            break;
        case 'categories':
            mainContent.appendChild(CategoriesView(appState.products, handleAddToCart));
            break;
        case 'offers':
            mainContent.appendChild(OffersView(appState.products, handleAddToCart));
            break;
        case 'contact':
            mainContent.appendChild(ContactView(handleContactSubmit));
            break;
        case 'login':
            mainContent.appendChild(AuthView('login', handleAuthSubmit, updateCurrentUser));
            break;
        case 'signup':
            mainContent.appendChild(AuthView('signup', handleAuthSubmit, updateCurrentUser));
            break;
        case 'cart':
            // For direct link to cart, open sidebar
            if (appState.cartSidebar) {
                appState.cartSidebar.open();
            } else {
                renderCartSidebar(); // Ensure it's rendered if not already
                appState.cartSidebar.open();
            }
            break;
        default:
            mainContent.innerHTML = `<div class="container text-center" style="padding: 50px;"><h2>404 - Page Not Found</h2><p>The page you are looking for does not exist.</p><p><a href="#/">Go to Home</a></p></div>`;
            break;
    }
    window.scrollTo(0, 0); // Scroll to top on route change
};

// --- Event Handlers ---
const handleAddToCart = (productId) => {
    const product = appState.products.find(p => p.id === productId);
    if (product) {
        updateCart(product, 1);
        alert(`${product.name} added to cart!`);
    }
};

const handleAuthSubmit = (type, formData) => {
    // In a real app, this would involve API calls.
    // Here, we simulate success and store user data.
    console.log(`${type} submitted:`, formData);

    if (type === 'login') {
        // Mock login: check if user exists in localStorage (from signup)
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = storedUsers.find(u => u.email === formData.email && u.password === formData.password);
        if (user) {
            updateCurrentUser({ email: user.email, name: user.name });
            alert('Login successful!');
            window.location.hash = '/'; // Redirect to home
            return true;
        } else {
            alert('Invalid credentials or user not found.');
            return false;
        }
    } else if (type === 'signup') {
        // Mock signup: store user in a list of registered users
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        if (storedUsers.some(u => u.email === formData.email)) {
            alert('User with this email already exists.');
            return false;
        }
        storedUsers.push({ id: Date.now(), ...formData });
        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
        updateCurrentUser({ email: formData.email, name: formData.name });
        alert('Signup successful! You are now logged in.');
        window.location.hash = '/'; // Redirect to home
        return true;
    }
    return false;
};

const handleContactSubmit = (formData) => {
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // In a real app, send data to a backend API
    window.location.hash = '/'; // Redirect to home after submission
};

const handleLogout = () => {
    updateCurrentUser(null);
    alert('Logged out successfully.');
    window.location.hash = '/';
};

const openLoginModal = () => {
    if (!appState.modal) {
        appState.modal = new Modal('modal-root');
    }
    appState.modal.open('Login', LoginForm(handleAuthSubmit, updateCurrentUser, appState.modal));
};

const openSignupModal = () => {
    if (!appState.modal) {
        appState.modal = new Modal('modal-root');
    }
    appState.modal.open('Sign Up', SignupForm(handleAuthSubmit, updateCurrentUser, appState.modal));
};

const openCartSidebar = () => {
    if (!appState.cartSidebar) {
        renderCartSidebar(); // Ensure it's rendered if not already
    }
    appState.cartSidebar.open();
};

const updateNavbarCartCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems > 0 ? totalItems : '';
        cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
};

// --- Render Functions ---
const renderNavbar = () => {
    const navbarContainer = document.getElementById('navbar-container');
    navbarContainer.innerHTML = ''; // Clear previous navbar
    navbarContainer.appendChild(Navbar(
        appState.currentUser,
        handleLogout,
        openLoginModal,
        openSignupModal,
        openCartSidebar,
        appState.cart.reduce((sum, item) => sum + item.quantity, 0)
    ));
    updateNavbarCartCount(); // Ensure count is updated after render
};

const renderCartSidebar = () => {
    const cartSidebarRoot = document.getElementById('cart-sidebar-root');
    if (!appState.cartSidebar) {
        appState.cartSidebar = new CartSidebar(cartSidebarRoot, appState.cart, updateCart);
    } else {
        appState.cartSidebar.updateCartItems(appState.cart);
    }
};

// --- Initial Setup ---
const init = () => {
    renderNavbar();
    renderCartSidebar(); // Render sidebar initially but keep it closed
    router(); // Initial route load

    window.addEventListener('hashchange', router);

    // Global event listener for 'add-to-cart' custom event
    document.addEventListener('add-to-cart', (event) => {
        handleAddToCart(event.detail.productId);
    });

    // Global event listener for 'open-login-modal' custom event
    document.addEventListener('open-login-modal', openLoginModal);

    // Global event listener for 'open-signup-modal' custom event
    document.addEventListener('open-signup-modal', openSignupModal);

    // Global event listener for 'open-cart-sidebar' custom event
    document.addEventListener('open-cart-sidebar', openCartSidebar);
};

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);
