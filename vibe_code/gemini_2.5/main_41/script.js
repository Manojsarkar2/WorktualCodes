import { getNavbarHTML } from './components/navbar.js';
import { getFooterHTML } from './components/footer.js';
import { getHomeHTML } from './views/home.js';
import { getBooksHTML } from './views/books.js';
import { getAuthorsHTML } from './views/authors.js';
import { getGenresHTML } from './views/genres.js';
import { getContactHTML } from './views/contact.js';

const app = document.getElementById('app');
const headerContainer = document.getElementById('header-container');
const footerContainer = document.getElementById('footer-container');

// Define routes and their corresponding content functions
const routes = {
    '/': getHomeHTML,
    '/home': getHomeHTML, // Alias for home
    '/books': getBooksHTML,
    '/authors': getAuthorsHTML,
    '/genres': getGenresHTML,
    '/contact': getContactHTML,
    404: () => `<section class="page-section"><h1>404: Page Not Found</h1><p>The realm you seek is shrouded in mist. Perhaps try a different path?</p><p><a href="/" data-link>Return to the Arcane Archives</a></p></section>`
};

// Function to update the main content based on the current path
const handleLocation = async () => {
    const path = window.location.pathname;
    const routeContent = routes[path] || routes[404];
    app.innerHTML = routeContent();

    // Update active link in navbar
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });

    // Close hamburger menu if open
    const navMenu = document.querySelector('.navbar-nav');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu && hamburger && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active'); // Optional: for hamburger icon animation
    }
};

// Function to handle navigation clicks
const route = (event) => {
    event.preventDefault();
    const target = event.target.closest('[data-link]');
    if (target && target.href) {
        window.history.pushState({}, "", target.href);
        handleLocation();
    }
};

// Initialize components and add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inject Navbar
    headerContainer.innerHTML = getNavbarHTML();

    // Inject Footer
    footerContainer.innerHTML = getFooterHTML();

    // Add event listener for navigation clicks (delegation)
    document.body.addEventListener('click', route);

    // Add event listener for hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active'); // Optional: for hamburger icon animation
        });
    }

    // Handle initial load
    handleLocation();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', handleLocation);
