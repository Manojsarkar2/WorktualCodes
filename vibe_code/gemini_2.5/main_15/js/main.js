import Router from './router.js';
import HomePage from './views/HomePage.js';

document.addEventListener('DOMContentLoaded', () => {
    const routes = {
        '/': HomePage,
    };

    const app = document.getElementById('app');
    const router = new Router(routes, app);

    const navigate = () => {
        const path = window.location.hash.slice(1) || '/';
        router.loadRoute(path);
    };

    window.addEventListener('hashchange', navigate);
    navigate(); // Initial load
});
