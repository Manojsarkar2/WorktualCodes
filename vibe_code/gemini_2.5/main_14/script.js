import Home from './views/Home.js';
import Shop from './views/Shop.js';
import OurStory from './views/OurStory.js';
import Contact from './views/Contact.js';
import Cart from './views/Cart.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

// --- State Management ---
const state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: [],
    filteredProducts: [],
    activeFilter: 'all',
};

const fetchProducts = async () => {
    try {
        const res = await fetch('data/products.json');
        if (!res.ok) throw new Error('Could not fetch products!');
        state.products = await res.json();
        state.filteredProducts = state.products;
    } catch (error) {
        console.error('Fetch Error:', error);
        document.getElementById('app').innerHTML = `<p>Error loading products. Please try again later.</p>`;
    }
};

const updateCart = (productId, quantity) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = state.cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += quantity;
        if (cartItem.quantity <= 0) {
            state.cart = state.cart.filter(item => item.id !== productId);
        }
    } else if (quantity > 0) {
        state.cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(state.cart));
    renderApp(); // Re-render to update UI, especially cart count
};

const filterProducts = (category) => {
    state.activeFilter = category;
    if (category === 'all') {
        state.filteredProducts = state.products;
    } else {
        state.filteredProducts = state.products.filter(p => p.category === category);
    }
    renderApp();
};

// --- Router ---
const routes = {
    '/': Home,
    '/shop': Shop,
    '/our-story': OurStory,
    '/contact': Contact,
    '/cart': Cart,
};

const router = async () => {
    const path = location.hash.slice(1).toLowerCase() || '/';
    const view = routes[path] || Home; // Fallback to Home for 404

    const app = document.getElementById('app');
    if (!app) return;

    // Render the view and pass state and actions
    app.innerHTML = await view.render({ 
        products: state.filteredProducts, 
        cart: state.cart, 
        activeFilter: state.activeFilter 
    });
    view.after_render({ updateCart, filterProducts });

    updateActiveLink();
};

const updateActiveLink = () => {
    const path = location.hash.slice(1).toLowerCase() || '/';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === path) {
            link.classList.add('active');
        }
    });
};

// --- Main App Rendering ---
const renderApp = () => {
    const root = document.getElementById('root');
    const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Persist the main content area during re-renders
    const currentMainContent = document.getElementById('app')?.innerHTML || '';

    root.innerHTML = `
        ${Navbar.render({ cartItemCount })}
        <main id="app"></main>
        ${Footer.render()}
    `;

    document.getElementById('app').innerHTML = currentMainContent;

    // Re-attach static component event listeners
    Navbar.after_render();
    router(); // Call router to render the correct page content
};

// --- Event Listeners ---
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('root');
    root.innerHTML = `<h1>Loading...</h1>`;
    await fetchProducts();
    renderApp();
});
