import { createElement } from '../utils.js';
import { Button } from './Button.js';
import { router } from '../router.js';

export const Header = () => {
    const navItems = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Doctors', href: '#doctors' },
        { name: 'Contact Us', href: '#contact' }
    ];

    const navLinks = navItems.map(item => {
        return createElement('li', {}, createElement('a', { href: item.href, className: 'nav-link' }, item.name));
    });

    const handleBookAppointmentClick = (e) => {
        e.preventDefault();
        router.handleHashScroll('#contact'); // Scroll to contact section
    };

    const headerElement = createElement('header', { className: 'main-header' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'header-content' },
                createElement('div', { className: 'logo' },
                    createElement('a', { href: '#', onclick: (e) => { e.preventDefault(); router.navigate('/'); router.handleHashScroll('#hero'); } }, 'MedCare')
                ),
                createElement('nav', { className: 'main-nav' },
                    createElement('ul', { className: 'nav-list' }, ...navLinks)
                ),
                Button({
                    text: 'Book an Appointment',
                    type: 'primary',
                    onClick: handleBookAppointmentClick
                })
            )
        )
    );

    return headerElement;
};
