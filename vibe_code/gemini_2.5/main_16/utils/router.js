export function navigateTo(path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate')); // Trigger popstate to re-render
}

export function setupRouter(routes, appDiv, updateUI) {
    const router = {
        routes: routes,
        appDiv: appDiv,
        updateUI: updateUI,

        route: function(path) {
            const handler = this.routes[path] || this.routes['404'];
            if (handler) {
                handler();
            } else {
                this.routes['404']();
            }
        }
    };

    return router;
}
