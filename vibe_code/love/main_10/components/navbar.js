import { navigateTo } from '../utils/router.js';
import { logout } from '../utils/auth.js';
import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for the navigation bar.
 * @param {object|null} user - The current logged-in user object or null.
 * @param {number} cartItemCount - The number of items in the cart.
 * @returns {string} The HTML string for the navbar.
 */
function generateNavbarHTML(user, cartItemCount) {
    const authLinks = user
        ? `
            <li><a href="#" data-route="/account">Hello, ${user.username}</a></li>
            <li><a href="#" id="logout-btn">Sign Out</a></li>
          `
        : `
            <li><a href="/login" data-route="/login">Sign In</a></li>
            <li><a href="/signup" data-route="/signup">Sign Up</a></li>
          `;

    return `
        <nav class="navbar" aria-label="Main navigation">
            <div class="navbar-content container">
                <div class="navbar-logo">
                    <a href="/" data-route="/">Amazon Clone</a>
                </div>
                <ul class="navbar-nav">
                    <li><a href="/" data-route="/">Home</a></li>
                    <li><a href="/products" data-route="/products">Products</a></li>
                    <li><a href="/contact" data-route="/contact">Contact</a></li>
                    ${authLinks}
                </ul>
                <div class="navbar-actions">
                    <a href="/cart" data-route="/cart" class="cart-icon" aria-label="View shopping cart">
                        🛒 <span class="cart-count" aria-live="polite">${cartItemCount}</span>
                    </a>
                    <div class="hamburger-menu" role="button" aria-label="Open navigation menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
        <div class="mobile-nav-overlay" aria-hidden="true">
            <div class="mobile-nav">
                <button class="close-btn" aria-label="Close navigation menu">&times;</button>
                <ul>
                    <li><a href="/" data-route="/">Home</a></li>
                    <li><a href="/products" data-route="/products">Products</a></li>
                    <li><a href="/contact" data-route="/contact">Contact</a></li>
                    ${authLinks}
                    <li><a href="/cart" data-route="/cart">Shopping Cart (${cartItemCount})</a></li>
                </ul>
            </div>
        </div>
    `;
}

/**
 * Renders the navigation bar into the DOM.
 * @param {object|null} user - The current logged-in user object or null.
 * @param {number} cartItemCount - The number of items in the cart.
 */
export function renderNavbar(user, cartItemCount) {
    const navbarContainer = getElement('#navbar-container');
    if (!navbarContainer) return;

    navbarContainer.innerHTML = generateNavbarHTML(user, cartItemCount);

    // Add event listeners for dynamic elements
    const logoutBtn = getElement('#logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    const hamburgerMenu = getElement('.hamburger-menu');
    const mobileNavOverlay = getElement('.mobile-nav-overlay');
    const closeBtn = getElement('.mobile-nav .close-btn');

    if (hamburgerMenu && mobileNavOverlay && closeBtn) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.add('open');
            hamburgerMenu.setAttribute('aria-expanded', 'true');
            mobileNavOverlay.setAttribute('aria-hidden', 'false');
        });

        closeBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
        });

        // Close mobile nav when clicking outside the menu itself
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove('open');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
                mobileNavOverlay.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Update active link styling
    const currentPath = window.location.pathname;
    document.querySelectorAll('.navbar-nav a, .mobile-nav ul li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

/**
 * Updates the cart item count displayed in the navbar.
 * @param {number} count - The new cart item count.
 */
export function updateNavbarCartCount(count) {
    const cartCountSpan = getElement('.cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = count;
    }
    const mobileCartLink = getElement('.mobile-nav ul li a[href="/cart"]');
    if (mobileCartLink) {
        mobileCartLink.textContent = `Shopping Cart (${count})`;
    }
}