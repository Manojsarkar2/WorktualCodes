import { setupNavbar } from './components/navbar.js';
import { setupModal } from './components/modal.js';
import { setupCarousel } from './components/carousel.js';
import { setupTabs } from './components/tabs.js';
import { setupAccordion } from './components/accordion.js';
import { setupFormHandler } from './components/formHandler.js';
import { setupCart, updateCartCount } from './components/cart.js';

import { getHomePageContent } from './views/home.js';
import { getHeroesPageContent } from './views/heroes.js';
import { getTroopsPageContent } from './views/troops.js';
import { getBuildingsPageContent } from './views/buildings.js';
import { getNewsPageContent } from './views/news.js';
import { getShopPageContent } from './views/shop.js';
import { getContactPageContent } from './views/contact.js';

// Global App State
const appState = {
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    shopCategories: [
        { id: 'gems', name: 'Gems' },
        { id: 'gold', name: 'Gold Bundles' },
        { id: 'elixir', name: 'Elixir Bundles' }
    ]
};

// Router Configuration
const routes = {
    '/': getHomePageContent,
    '/home': getHomePageContent,
    '/heroes': getHeroesPageContent,
    '/troops': getTroopsPageContent,
    '/buildings': getBuildingsPageContent,
    '/news': getNewsPageContent,
    '/shop': getShopPageContent,
    '/contact': getContactPageContent,
};

// Function to render content based on route
const renderContent = async (path) => {
    const appContent = document.getElementById('app-content');
    const routeHandler = routes[path] || routes['/']; // Default to home if route not found

    if (routeHandler) {
        appContent.innerHTML = await routeHandler();
        // Re-initialize components after new content is loaded
        initializePageComponents(path);
    } else {
        appContent.innerHTML = `
            <section class="hero-section text-center">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <a href="#/" class="btn btn-primary">Go to Home</a>
            </section>
        `;
    }
    updateActiveNavLink(path);
    window.scrollTo(0, 0); // Scroll to top on route change
};

// Update active navigation link
const updateActiveNavLink = (path) => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const linkRoute = link.getAttribute('data-route');
        if (linkRoute && (path === '/' && linkRoute === 'home' || path === `/${linkRoute}`)) {
            link.classList.add('active');
        }
    });
};

// Initialize components specific to the loaded page
const initializePageComponents = (path) => {
    // Common components that might appear on multiple pages
    setupCarousel();
    setupTabs();
    setupAccordion();

    // Page-specific initializations
    if (path === '/contact') {
        setupFormHandler('contact-form', (data) => {
            console.log('Contact form submitted:', data);
            alert('Thank you for your message! We will get back to you soon.');
            // Optionally clear form or redirect
        });
    }
    if (path === '/shop') {
        // Add to cart buttons need to be re-initialized
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                const productName = event.target.dataset.productName;
                const productPrice = parseFloat(event.target.dataset.productPrice);
                const productCategory = event.target.dataset.productCategory;
                if (productId && productName && !isNaN(productPrice)) {
                    appState.cart = setupCart.addItem({ id: productId, name: productName, price: productPrice, category: productCategory, quantity: 1 });
                    updateCartCount(appState.cart.length);
                    alert(`${productName} added to cart!`);
                }
            });
        });
    }
};

// Handle initial route and hash changes
const handleLocationChange = () => {
    const path = window.location.hash.slice(1) || '/';
    renderContent(path);
};

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Setup Navbar (hamburger, dropdowns)
    setupNavbar(appState.shopCategories);

    // Setup Modals
    setupModal('login-modal', 'login-btn', '.close-button');
    setupModal('signup-modal', 'signup-btn', '.close-button');
    setupModal('cart-modal', 'cart-btn', '.close-button');

    // Setup Login/Signup Forms
    setupFormHandler('login-form', (data) => {
        console.log('Login attempt:', data);
        // Mock authentication
        if (data.username === 'test' && data.password === 'password') {
            appState.user = { username: data.username };
            localStorage.setItem('currentUser', JSON.stringify(appState.user));
            alert('Login successful!');
            document.getElementById('login-modal').style.display = 'none';
            // Update UI for logged-in user
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('signup-btn').textContent = `Welcome, ${appState.user.username}!`;
            document.getElementById('signup-btn').onclick = () => alert('Already logged in!');
        } else {
            alert('Invalid credentials.');
        }
    });

    setupFormHandler('signup-form', (data) => {
        console.log('Signup attempt:', data);
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        // Mock user registration
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.username === data.username || u.email === data.email)) {
            alert('Username or email already exists.');
        } else {
            users.push({ username: data.username, email: data.email, password: data.password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Sign up successful! You can now log in.');
            document.getElementById('signup-modal').style.display = 'none';
            document.getElementById('login-btn').click(); // Open login modal
        }
    });

    // Setup Cart
    setupCart.init(appState.cart, (updatedCart) => {
        appState.cart = updatedCart;
        localStorage.setItem('cart', JSON.stringify(appState.cart));
        updateCartCount(appState.cart.length);
    });
    updateCartCount(appState.cart.length);

    // Initial route load
    handleLocationChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleLocationChange);

    // Check if user is already logged in
    if (appState.user) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('signup-btn').textContent = `Welcome, ${appState.user.username}!`;
        document.getElementById('signup-btn').onclick = () => alert('Already logged in!');
    }
});
