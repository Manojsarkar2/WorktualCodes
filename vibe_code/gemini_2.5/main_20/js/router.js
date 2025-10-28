import { $ } from './utils/dom.js';

const router = {
    routes: {},
    appRoot: null,

    init(routesConfig, appRootElement) {
        this.routes = routesConfig;
        this.appRoot = appRootElement;
        window.addEventListener('popstate', this.handleLocation.bind(this));
    },

    navigate(path) {
        if (path.startsWith('#')) {
            // Handle internal anchor links for smooth scrolling
            const targetId = path.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        } else {
            // Handle SPA routing
            if (window.location.pathname !== path) {
                history.pushState({}, '', path);
                this.handleLocation();
            }
        }
    },

    async handleLocation() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['404'];
        
        if (route) {
            // Clear existing content and render the new view
            this.appRoot.innerHTML = '';
            const viewElement = await route();
            this.appRoot.appendChild(viewElement);
        } else {
            // Should ideally be caught by '404' route, but as a fallback
            this.appRoot.innerHTML = '<h1>404 Not Found</h1>';
        }

        // Update active class for navigation links
        // Note: For a single page with hash links, this logic might be more complex
        // if you want to highlight links based on scroll position.
        // For simple path-based routing:
        $$('.nav-list a').forEach(link => {
            // If the link is an internal hash link, we don't apply 'active' based on router path
            if (!link.getAttribute('href').startsWith('#')) {
                if (link.getAttribute('href') === path) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
};

export { router };