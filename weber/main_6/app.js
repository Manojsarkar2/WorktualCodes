import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomeView } from './views/home.js';
import { renderAboutView } from './views/about.js';
import { renderProductsView } from './views/products.js';
import { renderProductDetailsView } from './views/productDetails.js';
import { renderProfileView } from './views/profile.js';
import { renderSettingsView } from './views/settings.js';
import { renderContactView } from './views/contact.js';
import { renderLoginView } from './views/login.js';
import { renderSignupView } from './views/signup.js';

const routes = {
    '/': renderHomeView,
    '/about': renderAboutView,
    '/products': renderProductsView,
    '/product-details': renderProductDetailsView,
    '/profile': renderProfileView,
    '/settings': renderSettingsView,
    '/contact': renderContactView,
    '/login': renderLoginView,
    '/signup': renderSignupView
};

function router() {
    const path = window.location.hash.substring(1) || '/';
    const view = routes[path] || renderHomeView; // Default to home
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content
    view(contentDiv);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    renderNavbar(document.getElementById('navbar'));
    renderFooter(document.getElementById('footer'));
    router(); // Initial route
});