import { renderHome } from './views/home.js';
import { renderAbout } from './views/about.js';
import { renderProducts } from './views/products.js';
import { renderProductDetails } from './views/product_details.js';
import { renderProfile } from './views/profile.js';
import { renderSettings } from './views/settings.js';
import { renderContact } from './views/contact.js';
import { renderLogin } from './views/login.js';
import { renderSignup } from './views/signup.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

const routes = {
    '/': renderHome,
    '/about': renderAbout,
    '/products': renderProducts,
    '/product-details': renderProductDetails,
    '/profile': renderProfile,
    '/settings': renderSettings,
    '/contact': renderContact,
    '/login': renderLogin,
    '/signup': renderSignup
};

const app = document.getElementById('content');

const navigate = (path) => {
    window.history.pushState(
        {},
        path,
        window.location.origin + path
    );
    renderView(path);
};

const renderView = (path) => {
    const view = routes[path] || renderHome; // Default to home
    app.innerHTML = '';
    view(app);
};

window.addEventListener('popstate', () => {
    renderView(window.location.pathname);
});

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    renderView(window.location.pathname);

    // Example navigation event listener (replace with your actual navigation)
    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const path = event.target.getAttribute('href');
            navigate(path);
        }
    });
});