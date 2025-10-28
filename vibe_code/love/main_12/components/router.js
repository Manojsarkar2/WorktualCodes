import { state } from './state.js';

// Import views dynamically
const views = {
    '/': () => import('../views/home.js').then(module => module.renderHome()),
    '/explore': () => import('../views/explore.js').then(module => module.renderExplore()),
    '/subscriptions': () => import('../views/subscriptions.js').then(module => module.renderSubscriptions()),
    '/library': () => import('../views/library.js').then(module => module.renderLibrary()),
    '/contact': () => import('../views/contact.js').then(module => module.renderContact()),
    '/watch/:id': (id) => import('../views/videoDetail.js').then(module => module.renderVideoDetail(id))
};

class Router {
    constructor() {
        this.appContent = null;
    }

    init(contentElement) {
        this.appContent = contentElement;
        window.addEventListener('popstate', () => this.handleRouting());
        document.body.addEventListener('click', e => {
            const link = e.target.closest('a[href^="/"]:not([target="_blank"])');
            if (link && link.origin === window.location.origin) {
                e.preventDefault();
                this.navigate(link.pathname);
            }
        });
        this.handleRouting(); // Initial route handling
    }

    navigate(path) {
        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
            this.handleRouting();
        }
    }

    async handleRouting() {
        const path = window.location.pathname;
        let content = '<h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p>';

        // Check for exact matches first
        if (views[path]) {
            content = await views[path]();
        } else {
            // Check for dynamic routes like /watch/:id
            const videoMatch = path.match(/^\/watch\/([^/]+)$/);
            if (videoMatch && views['/watch/:id']) {
                const videoId = videoMatch[1];
                content = await views['/watch/:id'](videoId);
            }
        }

        if (this.appContent) {
            this.appContent.innerHTML = content;
            window.scrollTo(0, 0); // Scroll to top on new page load
        }
    }
}

export const router = new Router();
