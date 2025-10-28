import HomePage from '../pages/HomePage.js';
import AboutPage from '../pages/AboutPage.js';
import ServicesPage from '../pages/ServicesPage.js';
import CaseStudiesPage from '../pages/CaseStudiesPage.js';
import ContactPage from '../pages/ContactPage.js';
import NotFoundPage from '../pages/NotFoundPage.js';

const routes = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/services', component: ServicesPage },
    { path: '/use-cases', component: CaseStudiesPage },
    { path: '/pricing', component: AboutPage }, // Re-using for simplicity
    { path: '/blog', component: AboutPage }, // Re-using for simplicity
    { path: '/contact', component: ContactPage },
    { path: '/404', component: NotFoundPage },
];

export default routes;
