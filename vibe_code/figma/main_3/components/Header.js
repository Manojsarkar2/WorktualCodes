import { Icon } from './Icon.js';
import { store } from '../utils/store.js';

export const Header = () => {
    const cart = store.getState().cart || [];
    const cartCount = cart.length;

    return `
        <header class="header">
            <div class="container header-content">
                <a href="/" class="logo" onclick="event.preventDefault(); window.router.navigate('/');">Furni.</a>
                <nav class="nav-links">
                    <a href="/" onclick="event.preventDefault(); window.router.navigate('/');" class="nav-link" data-path="/">Home</a>
                    <a href="/shop" onclick="event.preventDefault(); window.router.navigate('/shop');" class="nav-link" data-path="/shop">Shop</a>
                    <a href="/about" onclick="event.preventDefault(); window.router.navigate('/about');" class="nav-link" data-path="/about">About</a>
                    <a href="/contact" onclick="event.preventDefault(); window.router.navigate('/contact');" class="nav-link" data-path="/contact">Contact</a>
                </nav>
                <div class="icon-group">
                    <a href="#" class="icon-wrapper">${Icon({ name: 'Search' })}</a>
                    <a href="#" class="icon-wrapper">
                        ${Icon({ name: 'Cart' })}
                        <span class="cart-count" style="display: ${cartCount > 0 ? 'flex' : 'none'};">${cartCount > 0 ? cartCount : ''}</span>
                    </a>
                    <a href="#" class="icon-wrapper">${Icon({ name: 'User' })}</a>
                </div>
            </div>
        </header>
    `;
};

// Function to update active navigation link
export const updateActiveNav = (path) => {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.path === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Subscribe to store changes to update cart count in header
store.subscribe(() => {
    const cart = store.getState().cart || [];
    const cartCount = cart.length;
    const cartCountElement = document.querySelector('.header .cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount > 0 ? cartCount : '';
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
    }
});
