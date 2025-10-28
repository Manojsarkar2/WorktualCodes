import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderHomePage } from './views/HomePage.js';
import { renderProductsPage } from './views/ProductsPage.js';
import { renderProductDetailPage } from './views/ProductDetailPage.js';
import { renderCartPage } from './views/CartPage.js';
import { renderContactPage } from './views/ContactPage.js';
import { products } from './data/products.js';

const app = document.getElementById('app');
const navbarContainer = document.getElementById('navbar-container');
const footerContainer = document.getElementById('footer-container');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentTheme = localStorage.getItem('theme') || 'light-mode';

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const applyTheme = (theme) => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    currentTheme = theme;
};

const toggleTheme = () => {
    const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
    applyTheme(newTheme);
    updateNavbar(); // Re-render navbar to reflect theme toggle state if needed
};

const updateNavbar = () => {
    const currentPath = window.location.pathname;
    navbarContainer.innerHTML = renderNavbar(currentPath, toggleTheme);
    const themeToggleButton = navbarContainer.querySelector('.theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.textContent = currentTheme === 'light-mode' ? 'Dark Mode' : 'Light Mode';
        themeToggleButton.onclick = toggleTheme;
    }
    const navbarToggle = navbarContainer.querySelector('.navbar-toggle');
    const navbarLinks = navbarContainer.querySelector('.navbar-links');
    if (navbarToggle && navbarLinks) {
        navbarToggle.onclick = () => {
            navbarLinks.classList.toggle('active');
        };
    }
};

const updateFooter = () => {
    footerContainer.innerHTML = renderFooter();
};

const navigateTo = (path) => {
    history.pushState(null, null, path);
    router();
};

const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart();
    alert(`${product.name} added to cart!`);
    updateNavbar(); // Update cart count in navbar if implemented
};

const updateCartItemQuantity = (productId, newQuantity) => {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        saveCart();
        navigateTo('/cart'); // Re-render cart page
    }
};

const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    navigateTo('/cart'); // Re-render cart page
};

const router = () => {
    const path = window.location.pathname;
    app.innerHTML = ''; // Clear previous content

    updateNavbar(); // Ensure navbar is always up-to-date

    if (path === '/') {
        app.innerHTML = renderHomePage();
    } else if (path === '/products') {
        app.innerHTML = renderProductsPage();
        // Attach event listeners for 'Add to Cart' buttons on the products page
        app.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.onclick = (e) => {
                const productId = e.target.dataset.productId;
                addToCart(productId);
            };
        });
    } else if (path.startsWith('/product/')) {
        const productId = path.split('/')[2];
        app.innerHTML = renderProductDetailPage(productId);
        const addToCartButton = app.querySelector('.add-to-cart-btn');
        if (addToCartButton) {
            addToCartButton.onclick = () => addToCart(productId);
        }
    } else if (path === '/cart') {
        app.innerHTML = renderCartPage(cart);
        // Attach event listeners for cart actions
        app.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.onclick = (e) => {
                const productId = e.target.dataset.productId;
                removeFromCart(productId);
            };
        });
        app.querySelectorAll('.quantity-input').forEach(input => {
            input.onchange = (e) => {
                const productId = e.target.dataset.productId;
                const newQuantity = parseInt(e.target.value, 10);
                updateCartItemQuantity(productId, newQuantity);
            };
        });
    } else if (path === '/contact') {
        app.innerHTML = renderContactPage();
        // Attach event listener for contact form submission (placeholder)
        const contactForm = app.querySelector('.contact-form');
        if (contactForm) {
            contactForm.onsubmit = (e) => {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            };
        }
    } else {
        app.innerHTML = `
            <section class="home-section">
                <h2 class="page-title">404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <p><a href="/">Go to Home</a></p>
            </section>
        `;
    }
};

// Event listener for navigation clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="/"]:not([target="_blank"])')) {
        e.preventDefault();
        navigateTo(e.target.href);
    }
});

// Handle browser's back/forward buttons
window.addEventListener('popstate', router);

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    updateNavbar();
    updateFooter();
    router();
});
