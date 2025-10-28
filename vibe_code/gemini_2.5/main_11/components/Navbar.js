import { createElement } from '../utils/helpers.js';
import { Button } from './Button.js';
import { store } from '../store.js';

export const Navbar = () => {
    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Doctors', href: '#doctors' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' }
    ];

    const navElement = createElement('nav', { className: 'navbar' },
        createElement('div', { className: 'container' },
            createElement('a', { href: '#home', className: 'navbar-logo' }, 'Medical Center Logo'),
            createElement('ul', { className: 'navbar-nav' },
                ...navLinks.map(link =>
                    createElement('li', {}, createElement('a', { href: link.href }, link.label))
                )
            ),
            Button({ label: 'Appointment', className: 'btn-primary btn-appointment' })
        )
    );

    // Update active class based on store state
    store.subscribe('activeNav', (activeNav) => {
        navElement.querySelectorAll('.navbar-nav a').forEach(link => {
            if (link.getAttribute('href') === activeNav) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    return navElement;
};
