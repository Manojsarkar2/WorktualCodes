class Router {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.routes = {};
        this.currentPath = window.location.pathname;
    }

    addRoute(path, viewComponent) {
        this.routes[path] = viewComponent;
    }

    navigate(path) {
        if (this.currentPath === path) return; // Prevent navigating to same path
        window.history.pushState(null, null, path);
        this.currentPath = path;
        this.render(this.getRoute());
    }

    getRoute() {
        const path = window.location.pathname;
        return this.routes[path] || this.routes['/404'];
    }

    async render(ViewComponent) {
        if (!ViewComponent) {
            console.error('No view component found for the current route.');
            return;
        }
        try {
            const view = new ViewComponent();
            const content = await view.render();
            this.rootElement.innerHTML = ''; // Clear previous content
            this.rootElement.appendChild(content);
            this.updateNavLinks();
            window.scrollTo(0, 0); // Scroll to top on new page render
        } catch (error) {
            console.error('Error rendering view:', error);
            // Optionally render a generic error view
            const errorView = new this.routes['/404']();
            this.rootElement.innerHTML = '';
            this.rootElement.appendChild(await errorView.render());
        }
    }

    updateNavLinks() {
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.pathname === this.currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

export default Router;
