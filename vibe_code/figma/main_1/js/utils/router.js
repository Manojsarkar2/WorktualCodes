export class Router {
    constructor(routes) {
        this.routes = routes;
        this.onRouteChangeCallbacks = [];
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute(); // Initial route handling
    }

    getCurrentView() {
        const path = window.location.pathname;
        const routeHandler = this.routes[path] || this.findDynamicRoute(path);
        return routeHandler ? routeHandler() : '<p>404 Not Found</p>';
    }

    findDynamicRoute(path) {
        for (const route in this.routes) {
            if (route.includes(':')) {
                const routeRegex = new RegExp('^' + route.replace(/\/:[^/]+/g, '/([^/]+)') + '$');
                if (routeRegex.test(path)) {
                    return this.routes[route];
                }
            }
        }
        return null;
    }

    handleRoute() {
        this.onRouteChangeCallbacks.forEach(callback => callback());
    }

    onRouteChange(callback) {
        this.onRouteChangeCallbacks.push(callback);
    }

    navigateTo(path) {
        window.history.pushState(null, null, path);
        this.handleRoute();
    }
}

export const getURLParams = () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const params = {};

    if (parts.length > 2 && parts[1] === 'product') {
        params.id = parts[2];
    }

    return params;
};

// Intercept link clicks for SPA navigation
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        if (href.startsWith('/')) {
            const router = new Router({}); // Create a new instance.  Could be improved.
            router.navigateTo(href);
        }
    }
});