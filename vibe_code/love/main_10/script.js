import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { navigateTo, setupRouter } from './utils/router.js';
import { initAuth, checkAuthStatus } from './utils/auth.js';
import { getCartItems, updateCartCount } from './utils/cart.js';
import { showModal, hideModal } from './components/modal.js';
import { getElement } from './utils/dom.js';

// Global state (minimal, for demonstration)
window.appState = {
    user: null,
    cart: getCartItems(),
    products: [] // Will be loaded dynamically
};

/**
 * Initializes the application.
 */
async function initApp() {
    console.log('Initializing Amazon SPA...');

    // 1. Initialize Authentication
    initAuth();
    window.appState.user = checkAuthStatus();

    // 2. Render Navbar and Footer
    renderNavbar(window.appState.user, window.appState.cart.length);
    renderFooter();

    // 3. Set up client-side routing
    setupRouter();

    // 4. Update cart count on initial load
    updateCartCount();

    // 5. Add global event listeners
    addGlobalEventListeners();

    console.log('Amazon SPA initialized.');
}

/**
 * Adds global event listeners for navigation and modals.
 */
function addGlobalEventListeners() {
    // Handle all internal navigation links
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-route]');
        if (link) {
            e.preventDefault();
            navigateTo(link.getAttribute('href'));
        }

        // Close mobile nav if open
        const mobileNavOverlay = getElement('.mobile-nav-overlay');
        if (mobileNavOverlay && mobileNavOverlay.classList.contains('open') && !e.target.closest('.mobile-nav') && !e.target.closest('.hamburger-menu')) {
            mobileNavOverlay.classList.remove('open');
        }
    });

    // Listen for custom events to update UI (e.g., cart, auth)
    document.addEventListener('cartUpdated', (e) => {
        window.appState.cart = e.detail.cart;
        updateCartCount();
        // Re-render cart view if on cart page
        if (window.location.pathname === '/cart') {
            navigateTo('/cart', false); // Re-render without pushing to history
        }
    });

    document.addEventListener('authStatusChanged', (e) => {
        window.appState.user = e.detail.user;
        renderNavbar(window.appState.user, window.appState.cart.length);
        // If user logs out, navigate to home
        if (!e.detail.user && window.location.pathname !== '/') {
            navigateTo('/');
        }
    });

    // Handle modal close from escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Expose navigateTo for external use if needed (e.g., from forms)
window.navigateTo = navigateTo;
window.showModal = showModal;
window.hideModal = hideModal;
