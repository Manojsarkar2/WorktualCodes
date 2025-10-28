import { createElement } from '../utils/helpers.js';

export const DoctorCard = ({ image, name, specialization, socialLinks }) => {
    return createElement('div', { className: 'doctor-card' },
        createElement('img', { src: image, alt: name }),
        createElement('h3', {}, name),
        createElement('p', {}, specialization),
        createElement('div', { className: 'doctor-social-links' },
            socialLinks.facebook ? createElement('a', { href: socialLinks.facebook, target: '_blank', 'aria-label': `${name} on Facebook` }, 'FB') : '', // Placeholder for actual icons
            socialLinks.twitter ? createElement('a', { href: socialLinks.twitter, target: '_blank', 'aria-label': `${name} on Twitter` }, 'TW') : '',
            socialLinks.linkedin ? createElement('a', { href: socialLinks.linkedin, target: '_blank', 'aria-label': `${name} on LinkedIn` }, 'IN') : ''
        )
    );
};
