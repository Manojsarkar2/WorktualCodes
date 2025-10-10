import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomeView } from './views/home.js';
import { renderAboutView } from './views/about.js';
import { renderProductsView } from './views/products.js';
import { renderProductDetailsView } from './views/product_details.js';
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

const navigateTo = (route) => {
    history.pushState(null, null, route);
    renderView();
};

const renderView = () => {
    const path = window.location.pathname;
    const renderFunction = routes[path] || renderHomeView; // Default to home
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content
    renderFunction(contentDiv);
};

window.addEventListener('popstate', renderView);

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar(navigateTo);
    renderFooter();
    renderView();
});