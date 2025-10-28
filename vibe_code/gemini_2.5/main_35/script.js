import { products } from './data/products.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './views/home.js';
import { renderProducts } from './views/products.js';
import { renderProductDetail } from './views/productDetail.js';
import { renderCart } from './views/cart.js';
import { renderContact } from './views/contact.js';
import { renderAbout } from './views/about.js';

const appDiv = document.getElementById('app');
const navbarContainer = document.getElementById('navbar-container');
const footerContainer = document.getElementById('footer-container');

let cart = JSON.parse(localStorage.getItem('flipkartCart')) || [];
let currentTheme = localStorage.getItem('flipkartTheme') || 'light';
let isMobileNavOpen = false;

// --- State Management & Utilities ---
const saveCart = () => {
    localStorage.setItem('flipkartCart', JSON.stringify(cart));
    updateNavbar();
};

const updateTheme = (theme) => {
    document.body.className = ''; // Clear existing classes
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('flipkartTheme', theme);
    currentTheme = theme;
    updateNavbar(); // Re-render navbar to update theme icon
};

const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
};

const toggleMobileNav = () => {
    isMobileNavOpen = !isMobileNavOpen;
    updateNavbar(); // Re-render navbar to update mobile nav state
};

const updateNavbar = () => {
    renderNavbar(navbarContainer, {
        currentTheme,
        toggleTheme,
        toggleMobileNav,
        isMobileNavOpen,
        cartItemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    });
};

const addToCart = (productId) => {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    saveCart();
    alert('Product added to cart!');
};

const updateCartItemQuantity = (productId, quantity) => {
    const itemIndex = cart.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        } else {
            cart[itemIndex].quantity = quantity;
        }
        saveCart();
        handleRoute(); // Re-render cart page
    }
};

const removeCartItem = (productId) => {
    cart = cart.filter(item => item.productId !== productId);
    saveCart();
    handleRoute(); // Re-render cart page
};

// Expose global functions for inline event handlers (less ideal but common in vanilla SPAs)
window.appState = {
    addToCart,
    updateCartItemQuantity,
    removeCartItem
};

// --- Routing ---
const routes = {
    '/': renderHome,
    '/products': renderProducts,
    '/products/:id': renderProductDetail,
    '/cart': renderCart,
    '/contact': renderContact,
    '/about': renderAbout
};

const navigate = (path) => {
    if (window.location.pathname !== path) {
        history.pushState(null, '', path);
    }
    handleRoute();
};

const handleRoute = () => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    let match = null;
    let routeHandler = null;
    let params = {};
    let currentCategory = searchParams.get('category');

    // Try to match exact path first
    if (routes[path]) {
        routeHandler = routes[path];
    } else {
        // Then try to match dynamic routes
        for (const routePath in routes) {
            if (routePath.includes(':')) {
                const regex = new RegExp(`^${routePath.replace(/:(\w+)/g, '(?<$1>[^/]+)')}$`);
                match = path.match(regex);
                if (match) {
                    routeHandler = routes[routePath];
                    params = match.groups;
                    break;
                }
            }
        }
    }

    if (routeHandler) {
        appDiv.innerHTML = ''; // Clear previous content
        let data = {
            products,
            cart,
            navigate,
            addToCart,
            updateCartItemQuantity,
            removeCartItem,
            currentCategory // For products page
        };

        if (path.startsWith('/products/') && params.id) {
            data.product = products.find(p => p.id === params.id);
            document.title = data.product ? `Flipkart - ${data.product.name}` : 'Flipkart - Product Not Found';
        } else if (path === '/products' && currentCategory) {
            document.title = `Flipkart - ${currentCategory} Products`;
        } else {
            document.title = `Flipkart - ${path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(1).slice(1)}`;
        }
        
        routeHandler(appDiv, data);
    } else {
        appDiv.innerHTML = `
            <div class="page-content" style="text-align: center;">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <button onclick="window.router.navigate('/')">Go to Home</button>
            </div>
        `;
        document.title = 'Flipkart - 404 Not Found';
    }

    // Close mobile nav after navigation
    if (isMobileNavOpen) {
        toggleMobileNav();
    }
};

// Expose navigate globally for anchor tags
window.router = { navigate };

// --- Event Listeners ---
window.addEventListener('popstate', handleRoute);

document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.matches('a[href^="/"]')) {
        const href = target.getAttribute('href');
        // Prevent full page reload for internal links
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            e.preventDefault();
            navigate(href);
        }
    }
});

// --- Initial Setup ---
const init = () => {
    updateTheme(currentTheme); // Apply initial theme
    updateNavbar(); // Render initial navbar
    renderFooter(footerContainer); // Render footer once
    handleRoute(); // Handle initial route
};

document.addEventListener('DOMContentLoaded', init);