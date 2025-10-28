import { initRouter } from './utils/router.js';
import { Navbar } from './components/navbar.js';
import { Footer } from './components/footer.js';
import { showModal, hideModal } from './components/modal.js';
import { initCarousel } from './components/carousel.js';
import { validateForm } from './components/validation.js';
import { loginUser, signupUser, logoutUser, isAuthenticated, getUser } from './utils/auth.js';
import { appState, updateState } from './utils/state.js';

// Import Views
import { renderHome } from './views/home.js';
import { renderProducts, setupProductPage } from './views/products.js';
import { renderProductDetail, setupProductDetailPage } from './views/productDetail.js';
import { renderAbout } from './views/about.js';
import { renderContact, setupContactForm } from './views/contact.js';
import { renderCart, setupCartPage } from './views/cart.js';
import { renderLogin, setupLoginForm } from './views/login.js';
import { renderSignup, setupSignupForm } from './views/signup.js';

const app = document.getElementById('app');
const navbarContainer = document.getElementById('navbar-container');
const footerContainer = document.getElementById('footer-container');

// --- Core Rendering Function --- //
const render = async (path) => {
    let content = '';
    let pageSetup = () => {}; // Function to run after content is rendered

    // Update navbar active link
    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });

    switch (path) {
        case '/':
            content = renderHome();
            pageSetup = () => {
                initCarousel('featured-carousel', 3);
                // Placeholder for lazy loading if images were present
                // const lazyImages = document.querySelectorAll('.lazy-load');
                // lazyImages.forEach(img => {
                //     if (img.dataset.src) img.src = img.dataset.src;
                // });
            };
            break;
        case '/products':
            content = renderProducts();
            pageSetup = setupProductPage;
            break;
        case '/about':
            content = renderAbout();
            break;
        case '/contact':
            content = renderContact();
            pageSetup = setupContactForm;
            break;
        case '/cart':
            content = renderCart();
            pageSetup = setupCartPage;
            break;
        case '/login':
            if (isAuthenticated()) {
                initRouter().navigate('/'); // Redirect if already logged in
                return;
            }
            content = renderLogin();
            pageSetup = setupLoginForm;
            break;
        case '/signup':
            if (isAuthenticated()) {
                initRouter().navigate('/'); // Redirect if already logged in
                return;
            }
            content = renderSignup();
            pageSetup = setupSignupForm;
            break;
        default:
            // Handle product detail pages dynamically
            if (path.startsWith('/products/')) {
                const productId = path.split('/')[2];
                content = renderProductDetail(productId);
                pageSetup = () => setupProductDetailPage(productId);
            } else {
                content = `
                    <section class="container section-padding text-center">
                        <h1>404 - Page Not Found</h1>
                        <p>Oops! The page you are looking for does not exist.</p>
                        <a href="/" class="btn">Go to Home</a>
                    </section>
                `;
            }
            break;
    }

    app.innerHTML = content;
    pageSetup();

    // Scroll to top on new page load
    window.scrollTo(0, 0);
};

// --- Initial App Setup --- //
document.addEventListener('DOMContentLoaded', () => {
    // Render Navbar and Footer initially
    navbarContainer.innerHTML = Navbar(isAuthenticated(), getUser());
    footerContainer.innerHTML = Footer();

    // Initialize Router
    const router = initRouter(render);

    // Add event listeners for navigation (delegation for SPA links)
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && target.matches('a[href^="/"]:not([target="_blank"])')) {
            const href = target.getAttribute('href');
            if (href) {
                e.preventDefault();
                router.navigate(href);
            }
        }

        // Handle logout button click
        if (e.target.id === 'logout-btn') {
            e.preventDefault();
            logoutUser();
            updateState({ user: null, isAuthenticated: false });
            navbarContainer.innerHTML = Navbar(isAuthenticated(), getUser()); // Re-render navbar
            router.navigate('/');
        }

        // Handle hamburger menu toggle
        if (e.target.closest('.hamburger')) {
            document.querySelector('.navbar-links').classList.toggle('active');
            e.target.closest('.hamburger').classList.toggle('active');
        }
    });

    // Update navbar on auth state change
    window.addEventListener('authStateChange', () => {
        navbarContainer.innerHTML = Navbar(isAuthenticated(), getUser());
    });

    // Initial render based on current URL
    router.handleLocation();
});

// Expose modal functions globally for components to use
window.showModal = showModal;
window.hideModal = hideModal;
window.appState = appState; // Expose appState for debugging/direct access if needed
window.updateAppState = updateState; // Expose updateState for direct access if needed
