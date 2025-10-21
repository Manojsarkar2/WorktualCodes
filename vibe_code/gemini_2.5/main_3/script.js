import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { HomeView } from './views/home.js';
import { ProductsView } from './views/products.js';
import { ProductDetailView } from './views/productDetail.js';
import { DealsView } from './views/deals.js';
import { CustomerServiceView } from './views/customerService.js';
import { ContactView } from './views/contact.js';
import { CartView } from './views/cart.js';
import { LoginView } from './views/login.js';
import { SignupView } from './views/signup.js';
import { getProducts } from './data/products.js';

// Global App State
const appState = {
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: [],
    searchQuery: '',
    currentPage: 'home'
};

// --- State Management Functions ---
const saveState = () => {
    localStorage.setItem('currentUser', JSON.stringify(appState.user));
    localStorage.setItem('cart', JSON.stringify(appState.cart));
};

const updateCartCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'block' : 'none';
    }
};

export const addToCart = (product, quantity = 1) => {
    const existingItemIndex = appState.cart.findIndex(item => item.id === product.id);
    if (existingItemIndex > -1) {
        appState.cart[existingItemIndex].quantity += quantity;
    } else {
        appState.cart.push({ ...product, quantity });
    }
    saveState();
    updateCartCount();
    alert(`${product.name} added to cart!`);
};

export const updateCartItemQuantity = (productId, newQuantity) => {
    const itemIndex = appState.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            appState.cart.splice(itemIndex, 1); // Remove if quantity is 0 or less
        } else {
            appState.cart[itemIndex].quantity = newQuantity;
        }
        saveState();
        updateCartCount();
        renderApp(); // Re-render cart view
    }
};

export const removeFromCart = (productId) => {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    saveState();
    updateCartCount();
    renderApp(); // Re-render cart view
};

export const clearCart = () => {
    appState.cart = [];
    saveState();
    updateCartCount();
    renderApp();
};

export const loginUser = (username, password) => {
    // Mock authentication
    if (username === 'test@example.com' && password === 'password123') {
        appState.user = { username: 'Test User', email: username };
        saveState();
        alert('Login successful!');
        navigateTo('/');
        return true;
    }
    alert('Invalid credentials.');
    return false;
};

export const signupUser = (username, email, password) => {
    // Mock signup
    const users = JSON.parse(localStorage.getItem('mockUsers')) || [];
    if (users.some(u => u.email === email)) {
        alert('User with this email already exists.');
        return false;
    }
    users.push({ username, email, password });
    localStorage.setItem('mockUsers', JSON.stringify(users));
    alert('Signup successful! Please log in.');
    navigateTo('/login');
    return true;
};

export const logoutUser = () => {
    appState.user = null;
    saveState();
    alert('Logged out.');
    navigateTo('/');
};

export const getUser = () => appState.user;
export const getCart = () => appState.cart;
export const getProductsData = () => appState.products;

// --- Router & Renderer ---
const routes = {
    '/': HomeView,
    '/products': ProductsView,
    '/product/:id': ProductDetailView,
    '/deals': DealsView,
    '/customer-service': CustomerServiceView,
    '/contact': ContactView,
    '/cart': CartView,
    '/login': LoginView,
    '/signup': SignupView
};

const renderApp = async () => {
    const appContainer = document.getElementById('app');
    const path = window.location.pathname;
    let view = null;
    let params = {};

    // Match dynamic routes
    const productDetailMatch = path.match(/^\/product\/([^/]+)$/);
    if (productDetailMatch) {
        view = routes['/product/:id'];
        params.id = productDetailMatch[1];
    } else if (routes[path]) {
        view = routes[path];
    } else {
        // Default to home or a 404 view
        view = HomeView;
        window.history.replaceState({}, '', '/');
    }

    if (view) {
        appContainer.innerHTML = await view(params);
        // After rendering, execute any post-render scripts for the view
        if (typeof view.afterRender === 'function') {
            view.afterRender(params);
        }
    }

    updateCartCount(); // Ensure cart count is updated on every render
};

export const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    renderApp();
};

// --- Event Listeners ---
window.addEventListener('popstate', renderApp);

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch products once on load
    appState.products = await getProducts();

    // Render header and footer
    document.getElementById('header').innerHTML = renderNavbar(appState.user, appState.cart.length);
    document.getElementById('footer').innerHTML = renderFooter();

    // Initial render of the app content
    renderApp();

    // Global event delegation for navigation links
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }

        // Handle search submission
        if (e.target.matches('#search-button')) {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput && searchInput.value) {
                appState.searchQuery = searchInput.value;
                navigateTo('/products');
            }
        }

        // Handle hamburger menu toggle
        if (e.target.closest('.hamburger-menu')) {
            document.querySelector('.navbar-links').classList.toggle('active');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelector('.navbar-links').addEventListener('click', (e) => {
        if (e.target.matches('a')) {
            document.querySelector('.navbar-links').classList.remove('active');
        }
    });

    // Lazy load images (simulated)
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
    };

    // Call lazy load after initial render and subsequent renders
    const originalRenderApp = renderApp;
    window.renderApp = async () => {
        await originalRenderApp();
        lazyLoadImages();
    };
    window.renderApp(); // Call the wrapped renderApp

    lazyLoadImages(); // Initial call for images present on first load
});
