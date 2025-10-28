import { router } from './router.js';
import { store } from './store.js';
import { HomeView } from './views/HomeView.js';
import { render } from './utils.js';

const appRoot = document.getElementById('app');

const renderApp = () => {
    const path = router.getRoute();
    // For this single-page design, we always render the HomeView
    // and internal navigation will handle scrolling to sections.
    // If there were distinct pages (e.g., /about, /services), a switch statement would be here.
    render(appRoot, HomeView());
};

// Initialize router and store
router.init(renderApp);
store.subscribe(renderApp);

// Initial render
renderApp();

// Handle initial scroll if hash is present (for direct links to sections)
window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); // Give time for content to render
    }
});
