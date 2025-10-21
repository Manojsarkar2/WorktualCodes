import { updateActiveNav } from '../components/Header.js';

export class Router {
    constructor(routes, appContainer, notFoundView) {
        this.routes = routes;
        this.appContainer = appContainer;
        this.notFoundView = notFoundView;
        this.init();
    }

    init() {
        window.addEventListener('popstate', this.onPopState.bind(this));
        window.router = this; // Make router globally accessible for navigation links
    }

    async navigate(path) {
        history.pushState({}, '', path);
        await this.render(path);
    }

    async onPopState() {
        await this.render(window.location.pathname);
    }

    async render(path) {
        const view = this.routes[path] || this.notFoundView;
        if (view && view.render) {
            this.appContainer.innerHTML = ''; // Clear previous content
            await view.render(this.appContainer);
            updateActiveNav(path); // Update active class on nav links
            window.scrollTo(0, 0); // Scroll to top on new page load
        } else {
            console.error('View not found or does not have a render method:', path);
            await this.notFoundView.render(this.appContainer);
        }
    }
}
