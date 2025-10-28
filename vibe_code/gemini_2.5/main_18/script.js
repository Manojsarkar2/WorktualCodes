import { renderNavbar } from './components/navbar.js';
import { createModal, openModal, closeModal } from './components/modal.js';
import { renderHome } from './views/home.js';
import { renderHeroes } from './views/heroes.js';
import { renderTroops } from './views/troops.js';
import { renderBuildings } from './views/buildings.js';
import { renderContact } from './views/contact.js';
import { renderLoginForm, renderSignupForm } from './views/auth.js';
import { gameData } from './data/gameData.js';

// --- State Management --- //
const appState = {
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [], // For wishlist/favorites
    currentPage: window.location.pathname,
};

const saveState = () => {
    localStorage.setItem('currentUser', JSON.stringify(appState.user));
    localStorage.setItem('cart', JSON.stringify(appState.cart));
};

// --- Authentication Module --- //
const Auth = {
    login: (username, password) => {
        // Mock login: A simple check, in a real app this would be an API call
        if (username === 'user' && password === 'password') {
            appState.user = { username: username, email: `${username}@example.com` };
            saveState();
            alert('Login successful!');
            closeModal();
            updateUI();
            return true;
        }
        alert('Invalid credentials.');
        return false;
    },
    signup: (username, email, password) => {
        // Mock signup: Just creates a user, no actual persistence beyond session
        if (username && email && password) {
            appState.user = { username: username, email: email };
            saveState();
            alert('Signup successful! You are now logged in.');
            closeModal();
            updateUI();
            return true;
        }
        alert('Please fill all fields.');
        return false;
    },
    logout: () => {
        appState.user = null;
        saveState();
        alert('Logged out.');
        updateUI();
        Router.navigate('/'); // Redirect to home after logout
    },
    isLoggedIn: () => !!appState.user,
    getCurrentUser: () => appState.user,
};

// --- Cart/Wishlist Module --- //
const Cart = {
    addItem: (item) => {
        const existingItem = appState.cart.find(i => i.id === item.id && i.type === item.type);
        if (!existingItem) {
            appState.cart.push({ ...item, quantity: 1 });
            saveState();
            updateCartCount();
            alert(`${item.name} added to wishlist!`);
        } else {
            alert(`${item.name} is already in your wishlist.`);
        }
    },
    removeItem: (itemId, itemType) => {
        appState.cart = appState.cart.filter(item => !(item.id === itemId && item.type === itemType));
        saveState();
        updateCartCount();
        alert('Item removed from wishlist.');
    },
    getCartItems: () => appState.cart,
    getCartCount: () => appState.cart.length,
};

// --- UI Update Functions --- //
const updateCartCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = Cart.getCartCount();
        cartCountElement.style.display = Cart.getCartCount() > 0 ? 'flex' : 'none';
    }
};

const updateUI = () => {
    renderNavbar(document.getElementById('navbar-container'), Auth.isLoggedIn(), Auth.getCurrentUser(), Cart.getCartCount());
    updateCartCount();
    attachNavbarEventListeners();
};

// --- Router Module --- //
const Router = {
    routes: {
        '/': renderHome,
        '/heroes': renderHeroes,
        '/troops': renderTroops,
        '/buildings': renderBuildings,
        '/contact': renderContact,
        // Add other routes as needed
    },
    navigate: (path) => {
        if (appState.currentPage !== path) {
            window.history.pushState({}, '', path);
            appState.currentPage = path;
            Router.handleLocation();
        }
    },
    handleLocation: async () => {
        const path = window.location.pathname;
        const appDiv = document.getElementById('app');
        appDiv.innerHTML = ''; // Clear existing content

        const renderFunction = Router.routes[path] || Router.routes['/']; // Default to home
        if (renderFunction) {
            await renderFunction(appDiv, gameData, Cart.addItem, Cart.getCartItems());
        } else {
            appDiv.innerHTML = `
                <section class="page-section container">
                    <h2>404 - Page Not Found</h2>
                    <p>The page you are looking for does not exist.</p>
                    <button onclick="Router.navigate('/')">Go to Home</button>
                </section>
            `;
        }
        // Update active link in navbar
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },
};

// --- Event Listeners --- //
const attachNavbarEventListeners = () => {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    // Navigation links
    navbarContainer.querySelectorAll('.nav-links a').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            Router.navigate(e.target.getAttribute('href'));
            // Close mobile menu if open
            const navLinks = navbarContainer.querySelector('.nav-links');
            const hamburger = navbarContainer.querySelector('.hamburger-menu');
            if (navLinks && hamburger && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
            }
        };
    });

    // Hamburger menu toggle
    const hamburger = navbarContainer.querySelector('.hamburger-menu');
    if (hamburger) {
        hamburger.onclick = () => {
            const navLinks = navbarContainer.querySelector('.nav-links');
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('open');
        };
    }

    // Auth buttons
    const loginBtn = navbarContainer.querySelector('#login-btn');
    const signupBtn = navbarContainer.querySelector('#signup-btn');
    const logoutBtn = navbarContainer.querySelector('#logout-btn');

    if (loginBtn) {
        loginBtn.onclick = () => openAuthModal('login');
    }
    if (signupBtn) {
        signupBtn.onclick = () => openAuthModal('signup');
    }
    if (logoutBtn) {
        logoutBtn.onclick = Auth.logout;
    }

    // Cart icon
    const cartIcon = navbarContainer.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.onclick = () => {
            // For a real app, this would open a cart page/modal.
            // For now, let's just show an alert with wishlist items.
            const items = Cart.getCartItems();
            if (items.length > 0) {
                const itemNames = items.map(item => item.name).join(', ');
                alert(`Your Wishlist: ${itemNames}`);
            } else {
                alert('Your wishlist is empty. Add some heroes or troops!');
            }
        };
    }
};

const openAuthModal = (type) => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    let formHtml = '';
    if (type === 'login') {
        formHtml = renderLoginForm();
    } else if (type === 'signup') {
        formHtml = renderSignupForm();
    }

    openModal(modalRoot, `
        <div class="modal-content">
            <button class="modal-close-btn" aria-label="Close modal">&times;</button>
            <h2>${type === 'login' ? 'Login' : 'Sign Up'}</h2>
            ${formHtml}
        </div>
    `);

    // Attach form submission listeners after modal content is rendered
    const form = modalRoot.querySelector('form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const username = formData.get('username');
            const password = formData.get('password');
            const email = formData.get('email'); // Only for signup

            if (type === 'login') {
                Auth.login(username, password);
            } else if (type === 'signup') {
                Auth.signup(username, email, password);
            }
        };
    }

    // Attach switch form link listener
    const switchFormLink = modalRoot.querySelector('.switch-form');
    if (switchFormLink) {
        switchFormLink.onclick = (e) => {
            e.preventDefault();
            closeModal();
            openAuthModal(type === 'login' ? 'signup' : 'login');
        };
    }
};

// --- Initial Setup --- //
document.addEventListener('DOMContentLoaded', () => {
    createModal(document.getElementById('modal-root')); // Initialize modal structure
    updateUI(); // Render navbar and update cart count
    Router.handleLocation(); // Handle initial route
});

window.onpopstate = Router.handleLocation; // Handle browser back/forward buttons

// Expose Router globally for direct calls from HTML (e.g., 404 page button)
window.Router = Router;
