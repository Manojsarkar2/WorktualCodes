import { renderView } from './utils/router.js';
import { updateStore } from './utils/store.js';
import Home from './views/Home.js';
import Categories from './views/Categories.js';
import Notifications from './views/Notifications.js';
import Account from './views/Account.js';

const routes = {
    '/': Home,
    '/categories': Categories,
    '/notifications': Notifications,
    '/account': Account
};

const navigateTo = (path) => {
    history.pushState(null, null, path);
    renderView(routes, path);
};

window.addEventListener('popstate', () => {
    renderView(routes, window.location.pathname);
});

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderView(routes, window.location.pathname);

    // Example of updating the store (replace with actual data fetching)
    import('./api/mock_api.js').then(api => {
        api.getProducts().then(products => {
            updateStore('products', products);
        });
        api.getCategories().then(categories => {
            updateStore('categories', categories);
        });
    });

    // Make navigateTo globally accessible
    window.navigateTo = navigateTo;
});