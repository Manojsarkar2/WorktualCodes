import { getHomePageHTML, initHomePage } from '../views/home.js';
import { getProductsPageHTML, initProductsPage } from '../views/products.js';
import { getProductDetailPageHTML, initProductDetailPage } from '../views/productDetail.js';
import { getCartPageHTML, initCartPage } from '../views/cart.js';
import { getLoginPageHTML, initLoginPage } from '../views/login.js';
import { getSignupPageHTML, initSignupPage } from '../views/signup.js';
import { getContactPageHTML, initContactPage } from '../views/contact.js';
import { getElement } from './dom.js';

const routes = {
    '/': { render: getHomePageHTML, init: initHomePage, title: 'Amazon Clone - Home' },
    '/products': { render: getProductsPageHTML, init: initProductsPage, title: 'Amazon Clone - Products' },
    '/products/:id': { render: getProductDetailPageHTML, init: initProductDetailPage, title: 'Amazon Clone - Product Detail' },
    '/cart': { render: getCartPageHTML, init: initCartPage, title: 'Amazon Clone - Cart' },
    '/login': { render: getLoginPageHTML, init: initLoginPage, title: 'Amazon Clone - Sign In' },
    '/signup': { render: getSignupPageHTML, init: initSignupPage, title: 'Amazon Clone - Create Account' },
    '/contact': { render: getContactPageHTML, init: initContactPage, title: 'Amazon Clone - Contact Us' }
    // Add more routes as needed
};

/**
 * Renders the content for the given path.
 * @param {string} path - The current URL path.
 * @param {object} params - URL parameters (e.g., product ID).
 * @param {object} queryParams - URL query parameters.
 */
async function renderContent(path, params = {}, queryParams = {}) {
    const appContent = getElement('#app-content');
    if (!appContent) return;

    let routeFound = false;
    for (const routePath in routes) {
        const routeRegex = new RegExp(`^${routePath.replace(/\//g, '\\/').replace(/:([a-zA-Z0-9_]+)/g, '([a-zA-Z0-9_]+)')}$`);
        const match = path.match(routeRegex);

        if (match) {
            routeFound = true;
            const route = routes[routePath];
            const paramNames = (routePath.match(/:([a-zA-Z0-9_]+)/g) || []).map(p => p.substring(1));
            const currentParams = {};
            paramNames.forEach((name, index) => {
                currentParams[name] = match[index + 1];
            });

            // Clear previous content and set new content
            appContent.innerHTML = '';
            appContent.innerHTML = route.render(currentParams.id, queryParams.category, queryParams.search);

            // Initialize view-specific scripts
            if (route.init) {
                route.init(currentParams.id, queryParams.category, queryParams.search);
            }

            document.title = route.title || 'Amazon Clone';
            break;
        }
    }

    if (!routeFound) {
        appContent.innerHTML = `
            <div class="container text-center">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <a href="/" data-route="/" class="btn btn-primary">Go to Home</a>
            </div>
        `;
        document.title = '404 - Page Not Found';
    }

    // Update active class on navbar links
    document.querySelectorAll('.navbar-nav a, .mobile-nav ul li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
}

/**
 * Navigates to a new URL without a full page reload.
 * @param {string} url - The URL to navigate to.
 * @param {boolean} [addToHistory=true] - Whether to add the URL to browser history.
 */
export function navigateTo(url, addToHistory = true) {
    if (addToHistory) {
        history.pushState(null, '', url);
    }
    const [path, queryString] = url.split('?');
    const queryParams = {};
    if (queryString) {
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            queryParams[key] = decodeURIComponent(value);
        });
    }
    renderContent(path, {}, queryParams);
}

/**
 * Sets up the client-side router.
 */
export function setupRouter() {
    window.addEventListener('popstate', () => {
        const [path, queryString] = window.location.pathname.split('?');
        const queryParams = {};
        if (queryString) {
            queryString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                queryParams[key] = decodeURIComponent(value);
            });
        }
        renderContent(window.location.pathname, {}, queryParams);
    });

    // Initial render
    navigateTo(window.location.pathname + window.location.search, false);
}