import { store } from './store.js';

export const router = {
    routes: [],
    currentPath: '/',

    init(renderCallback) {
        window.addEventListener('popstate', () => {
            this.currentPath = window.location.pathname;
            store.dispatch('ROUTE_CHANGE', this.currentPath);
            renderCallback();
            this.handleHashScroll();
        });

        document.body.addEventListener('click', e => {
            const anchor = e.target.closest('a');
            if (anchor && anchor.origin === window.location.origin) {
                const path = anchor.getAttribute('href');
                if (path && path.startsWith('/')) {
                    e.preventDefault();
                    this.navigate(path);
                } else if (path && path.startsWith('#')) {
                    // Internal anchor link, prevent default history push for now, just scroll
                    e.preventDefault();
                    this.handleHashScroll(path);
                }
            }
        });

        this.currentPath = window.location.pathname;
        store.dispatch('ROUTE_CHANGE', this.currentPath);
    },

    navigate(path) {
        if (this.currentPath === path) return; // Prevent unnecessary navigation
        window.history.pushState({}, '', path);
        this.currentPath = path;
        store.dispatch('ROUTE_CHANGE', this.currentPath);
    },

    getRoute() {
        return this.currentPath;
    },

    // For handling #anchor links for smooth scrolling to sections
    handleHashScroll(hash = window.location.hash) {
        if (hash) {
            const id = hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
};
