import { Router } from './utils/router.js';
import { HomeView } from './views/HomeView.js';
import { ShopView } from './views/ShopView.js';
import { AboutView } from './views/AboutView.js';
import { ContactView } from './views/ContactView.js';
import { NotFoundView } from './views/NotFoundView.js';
import { store } from './utils/store.js';

const appDiv = document.getElementById('app');

const routes = {
    '/': HomeView,
    '/shop': ShopView,
    '/about': AboutView,
    '/contact': ContactView,
};

const router = new Router(routes, appDiv, NotFoundView);

// Initialize global state (e.g., cart)
store.setState({ cart: [] });

// Initial render based on current URL
router.navigate(window.location.pathname);

// Example of subscribing to state changes
store.subscribe(() => {
    // console.log('Global state updated:', store.getState());
    // You might want to re-render parts of the UI that depend on global state here
    // For example, update a cart count in the header
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const cart = store.getState().cart;
        cartCountElement.textContent = cart.length > 0 ? cart.length : '';
        cartCountElement.style.display = cart.length > 0 ? 'flex' : 'none';
    }
});

// Add a simple 'add to cart' functionality for demonstration
// This would typically be inside a ProductCard component or a product detail page
window.addToCart = (productId, productName, price) => {
    const currentCart = store.getState().cart;
    const newItem = { id: productId, name: productName, price: price, quantity: 1 };
    const existingItemIndex = currentCart.findIndex(item => item.id === productId);

    let updatedCart;
    if (existingItemIndex > -1) {
        updatedCart = currentCart.map((item, index) => 
            index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        updatedCart = [...currentCart, newItem];
    }
    
    store.setState({ cart: updatedCart });
    alert(`${productName} added to cart! Current items: ${store.getState().cart.length}`);
};

// Example of handling form submission (Newsletter)
window.handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing with: ${emailInput.value}`);
        emailInput.value = ''; // Clear the input
    } else {
        alert('Please enter a valid email address.');
    }
};
