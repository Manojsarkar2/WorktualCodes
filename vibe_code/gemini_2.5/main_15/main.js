import Router from './router/Router.js';
import routes from './router/routes.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (!app) {
        console.error("App root not found!");
        return;
    }
    new Router(routes, app);
});
