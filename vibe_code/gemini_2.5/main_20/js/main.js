import { router } from './router.js';
import { store } from './store.js';
import { HomeView } from './views/HomeView.js';
import { NotFoundView } from './views/NotFoundView.js';
import { $ } from './utils/dom.js';

// Define routes
const routes = {
    '/': HomeView,
    '/home': HomeView,
    '404': NotFoundView
};

// Initialize the router
router.init(routes, $('#app'));

// Global event listeners (e.g., for navigation clicks)
document.addEventListener('click', (e) => {
    const target = e.target.closest('a[data-nav-link]');
    if (target) {
        e.preventDefault();
        router.navigate(target.getAttribute('href'));

        // Close mobile nav if open
        const mobileNav = $('.nav-list');
        if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
        }
    }
});

// Toggle mobile navigation
document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.nav-toggle-button');
    if (toggleBtn) {
        const navList = $('.nav-list');
        navList.classList.toggle('open');
    }
});

// Initial rendering based on current URL
router.handleLocation();

// Example of store subscription (optional for this simple landing page, but demonstrates pattern)
store.subscribe((state, prevState) => {
    // console.log('Store updated:', state, prevState);
    // For example, if a modal state changes:
    // if (state.activeModal !== prevState.activeModal) {
    //     if (state.activeModal) { /* open modal */ } else { /* close modal */ }
    // }
});
