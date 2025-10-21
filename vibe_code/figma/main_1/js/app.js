import { render } from './utils/dom.js';
import { Header } from './components/header.js';
import { HomeView } from './views/home.js';
import { ProductListingView } from './views/productListing.js';
import { ProductDetailsView } from './views/productDetails.js';
import { Router } from './utils/router.js';
import { updateCartCount } from './store.js';

const routes = {
    '/': HomeView,
    '/products': ProductListingView,
    '/product/:id': ProductDetailsView
};

const router = new Router(routes);

const App = () => {
    const header = Header();
    const currentView = router.getCurrentView();

    return `
        ${header}
        <main class="container">
            ${currentView}
        </main>
        <footer class="footer">
            <p>&copy; 2024 Flipkart</p>
        </footer>
    `;
};

const renderApp = () => {
    render(App(), document.getElementById('app'));
};

router.onRouteChange(renderApp);
renderApp();

// Example usage of updateCartCount
updateCartCount(5); // Set initial cart count
