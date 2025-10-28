import { store } from './store.js';
import { qs } from './utils/dom.js';

const routes = {
    '#home': 'hero-section',
    '#about': 'about-us-section',
    '#services': 'services-section',
    '#doctors': 'doctors-section',
    '#blog': 'blog-section', // Assuming blog is a section on home page for this design
    '#contact': 'footer-section' // Contact info is in footer
};

const navigateTo = (hash) => {
    const targetId = routes[hash];
    if (targetId) {
        const targetElement = qs(`#${targetId}`);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            store.setState({ activeNav: hash });
        }
    } else if (hash === '#') {
        // Default to home/top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        store.setState({ activeNav: '#home' });
    }
};

const handleHashChange = () => {
    const hash = window.location.hash || '#home';
    navigateTo(hash);
};

const observeSections = () => {
    const sections = Object.values(routes).map(id => qs(`#${id}`)).filter(Boolean);
    const observerOptions = {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is roughly in the middle of the viewport
        threshold: 0 // Trigger as soon as any part of the section enters/leaves
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const hash = Object.keys(routes).find(key => routes[key] === sectionId);
                if (hash && store.getState().activeNav !== hash) {
                    store.setState({ activeNav: hash });
                    // Optionally update URL hash without scrolling
                    // history.replaceState(null, '', hash);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
};

export const router = {
    init: () => {
        window.addEventListener('hashchange', handleHashChange);
        document.addEventListener('DOMContentLoaded', () => {
            handleHashChange(); // Initial route handling
            observeSections(); // Start observing sections for active nav state
        });

        // Handle clicks on internal navigation links
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target && target.hash && routes[target.hash]) {
                e.preventDefault();
                window.location.hash = target.hash;
            }
        });
    },
    navigateTo: navigateTo
};
