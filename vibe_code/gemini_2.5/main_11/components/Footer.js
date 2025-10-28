import { createElement } from '../utils/helpers.js';

export const Footer = () => {
    const navLinksGroup = [
        { label: 'About Us', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Doctors', href: '#doctors' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' }
    ];

    return createElement('footer', { className: 'footer' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'footer-section' },
                createElement('a', { href: '#home', className: 'footer-logo' }, 'Medical Center Logo'),
                createElement('p', {}, 'Providing exceptional healthcare with compassion and expertise.')
            ),
            createElement('div', { className: 'footer-section' },
                createElement('h4', {}, 'Quick Links'),
                createElement('ul', {}, 
                    ...navLinksGroup.map(link =>
                        createElement('li', {}, createElement('a', { href: link.href }, link.label))
                    )
                )
            ),
            createElement('div', { className: 'footer-section footer-contact' },
                createElement('h4', {}, 'Contact Info'),
                createElement('p', {}, '123 Health St, Medical City, MC 12345'),
                createElement('p', {}, 'Phone: (123) 456-7890'),
                createElement('p', {}, 'Email: info@medicalcenter.com')
            ),
            createElement('div', { className: 'footer-section' },
                createElement('h4', {}, 'Follow Us'),
                createElement('div', { className: 'footer-social-icons' },
                    createElement('a', { href: '#', target: '_blank', 'aria-label': 'Facebook' }, 'FB'), // Placeholder for actual icons
                    createElement('a', { href: '#', target: '_blank', 'aria-label': 'Twitter' }, 'TW'),
                    createElement('a', { href: '#', target: '_blank', 'aria-label': 'Instagram' }, 'IG'),
                    createElement('a', { href: '#', target: '_blank', 'aria-label': 'LinkedIn' }, 'IN')
                )
            )
        ),
        createElement('div', { className: 'footer-bottom' },
            createElement('p', {}, '© 2023 All rights reserved.')
        )
    );
};
