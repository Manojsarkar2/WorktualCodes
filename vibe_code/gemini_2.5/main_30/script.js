import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage } from './views/home.js';
import { renderServicesPage } from './views/services.js';
import { renderDoctorsPage } from './views/doctors.js';
import { renderAppointmentsPage } from './views/appointments.js';
import { renderContactPage } from './views/contact.js';

const appDiv = document.getElementById('app');
const contentDiv = document.getElementById('content');
const navbarContainer = document.getElementById('navbar-container');
const footerContainer = document.getElementById('footer-container');

// --- Routing Logic ---
const routes = {
    '/': renderHomePage,
    '/services': renderServicesPage,
    '/doctors': renderDoctorsPage,
    '/appointments': renderAppointmentsPage,
    '/contact': renderContactPage
};

const navigateTo = (url) => {
    history.pushState(null, null, url);
    renderContent();
};

const renderContent = async () => {
    const path = window.location.pathname;
    const renderFunction = routes[path] || routes['/']; // Default to home page

    if (renderFunction) {
        contentDiv.innerHTML = await renderFunction();
        // After rendering, activate any component-specific JS
        // For example, if a page has a carousel or accordion, initialize it here
        if (path === '/') {
            // Home page might have a carousel
            const carouselElement = contentDiv.querySelector('.carousel-container');
            if (carouselElement) {
                const { initCarousel } = await import('./components/carousel.js');
                initCarousel(carouselElement);
            }
        }
        if (path === '/services') {
            // Services page might have accordions
            const accordionContainer = contentDiv.querySelector('.accordion-container');
            if (accordionContainer) {
                const { initAccordion } = await import('./components/accordion.js');
                initAccordion(accordionContainer);
            }
        }
        if (path === '/doctors') {
            // Doctors page might have search/filter logic
            const { setupDoctorSearch } = await import('./views/doctors.js');
            setupDoctorSearch();
        }
        if (path === '/appointments') {
            // Appointments page has a form and modal
            const { setupAppointmentForm } = await import('./views/appointments.js');
            setupAppointmentForm();
        }
        if (path === '/contact') {
            // Contact page has a form
            const { setupContactForm } = await import('./views/contact.js');
            setupContactForm();
        }

        // Update active link in navbar
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', async () => {
    // Render Navbar and Footer first
    navbarContainer.innerHTML = renderNavbar();
    footerContainer.innerHTML = renderFooter();

    // Attach navigation event listener to the app container
    appDiv.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && target.matches('a[href^="/"]') && !target.matches('a[target="_blank"]')) {
            e.preventDefault();
            navigateTo(target.href);
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Handle hamburger menu toggle
    navbarContainer.addEventListener('click', (e) => {
        if (e.target.closest('.hamburger')) {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        }
    });

    // Initial render
    renderContent();
});

window.addEventListener('popstate', renderContent);
