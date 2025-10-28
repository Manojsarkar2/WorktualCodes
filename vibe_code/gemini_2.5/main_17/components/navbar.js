import * as Router from '../utils/router.js';
import * as Auth from '../utils/auth.js';

/**
 * Renders the HTML for the navigation bar.
 * @param {boolean} isAuthenticated - Whether the user is currently authenticated.
 * @returns {string} The HTML string for the navbar.
 */
export function renderNavbar(isAuthenticated) {
    const authLinks = isAuthenticated
        ? `<li><a href="#/home" id="logout-link">Logout</a></li>`
        : `<li><a href="#/login">Login</a></li>
           <li><a href="#/signup">Sign Up</a></li>`;

    return `
        <nav class="navbar">
            <div class="logo"><a href="#/home">Gourmet Grub</a></div>
            <ul class="nav-links">
                <li><a href="#/home">Home</a></li>
                <li><a href="#/menu">Menu</a></li>
                <li><a href="#/cart">Cart</a></li>
                <li><a href="#/contact">Contact</a></li>
                ${authLinks}
            </ul>
            <div class="hamburger-menu">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </nav>
    `;
}

/**
 * Attaches event listeners to the navbar elements.
 * @param {boolean} isAuthenticated - Whether the user is currently authenticated.
 * @param {Function} onAuthStateChange - Callback to run when auth state changes (e.g., logout).
 */
export function attachNavbarEventListeners(isAuthenticated, onAuthStateChange) {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    // Handle navigation links
    navbarContainer.querySelectorAll('.nav-links a').forEach(link => {
        // Remove previous listeners to prevent duplicates on re-render
        link.removeEventListener('click', handleNavLinkClick);
        link.addEventListener('click', handleNavLinkClick);
    });

    // Handle Logout link
    if (isAuthenticated) {
        const logoutLink = navbarContainer.querySelector('#logout-link');
        if (logoutLink) {
            logoutLink.removeEventListener('click', handleLogoutClick);
            logoutLink.addEventListener('click', (e) => handleLogoutClick(e, onAuthStateChange));
        }
    }

    // Handle hamburger menu toggle
    const hamburger = navbarContainer.querySelector('.hamburger-menu');
    const navLinks = navbarContainer.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.removeEventListener('click', handleHamburgerClick);
        hamburger.addEventListener('click', handleHamburgerClick);
    }

    // Close nav links if open when clicking outside on mobile
    document.removeEventListener('click', handleOutsideNavClick);
    document.addEventListener('click', handleOutsideNavClick);

    function handleNavLinkClick(e) {
        e.preventDefault();
        const path = e.target.getAttribute('href').substring(1); // Remove '#'
        Router.navigateTo(path);
        // Close mobile menu after navigation
        if (navLinks && hamburger && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    function handleLogoutClick(e, callback) {
        e.preventDefault();
        Auth.logout();
        Router.navigateTo('/login'); // Redirect to login after logout
        if (callback) callback();
    }

    function handleHamburgerClick() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    function handleOutsideNavClick(e) {
        if (navLinks && hamburger && navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
}
