import { createElement } from '../utils.js';

export const Footer = () => {
    return createElement('footer', { className: 'main-footer' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'footer-grid' },
                createElement('div', { className: 'footer-col' },
                    createElement('h3', { className: 'footer-logo' }, 'MedCare'),
                    createElement('p', {}, 'Leading the way in medical excellence, MedCare is dedicated to providing top-tier healthcare services with compassion and innovation.'),
                    createElement('div', { className: 'social-icons' },
                        createElement('a', { href: '#', className: 'social-icon' }, createElement('i', { className: 'fab fa-facebook-f' })),
                        createElement('a', { href: '#', className: 'social-icon' }, createElement('i', { className: 'fab fa-twitter' })),
                        createElement('a', { href: '#', className: 'social-icon' }, createElement('i', { className: 'fab fa-instagram' })),
                        createElement('a', { href: '#', className: 'social-icon' }, createElement('i', { className: 'fab fa-linkedin-in' }))
                    )
                ),
                createElement('div', { className: 'footer-col' },
                    createElement('h4', {}, 'Quick Links'),
                    createElement('ul', {}, 
                        createElement('li', {}, createElement('a', { href: '#about' }, 'About Us')),
                        createElement('li', {}, createElement('a', { href: '#services' }, 'Our Services')),
                        createElement('li', {}, createElement('a', { href: '#doctors' }, 'Our Doctors')),
                        createElement('li', {}, createElement('a', { href: '#contact' }, 'Appointment'))
                    )
                ),
                createElement('div', { className: 'footer-col' },
                    createElement('h4', {}, 'Contact Info'),
                    createElement('ul', {}, 
                        createElement('li', {}, createElement('i', { className: 'fas fa-map-marker-alt' }), ' 123 Health St, Medical City, MC 45678'),
                        createElement('li', {}, createElement('i', { className: 'fas fa-phone' }), ' +1 (555) 123-4567'),
                        createElement('li', {}, createElement('i', { className: 'fas fa-envelope' }), ' info@medcare.com'),
                        createElement('li', {}, createElement('i', { className: 'fas fa-clock' }), ' Mon - Fri: 9:00 AM - 6:00 PM')
                    )
                )
            ),
            createElement('div', { className: 'footer-bottom' },
                createElement('p', {}, '© 2023 MedCare. All rights reserved.')
            )
        )
    );
};
