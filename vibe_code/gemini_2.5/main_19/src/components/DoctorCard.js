import { createElement } from '../utils.js';

export const DoctorCard = ({ name, specialty, image, social }) => {
    const socialLinks = social ? Object.keys(social).map(platform => {
        let iconClass = '';
        if (platform === 'facebook') iconClass = 'fab fa-facebook-f';
        else if (platform === 'twitter') iconClass = 'fab fa-twitter';
        else if (platform === 'instagram') iconClass = 'fab fa-instagram';
        return createElement('a', { href: social[platform], target: '_blank', rel: 'noopener noreferrer', className: 'social-icon' }, createElement('i', { className: iconClass }));
    }) : [];

    return createElement('div', { className: 'doctor-card' },
        createElement('div', { className: 'doctor-image' },
            createElement('img', { src: image, alt: name })
        ),
        createElement('div', { className: 'doctor-info' },
            createElement('h3', { className: 'doctor-name' }, name),
            createElement('p', { className: 'doctor-specialty' }, specialty),
            socialLinks.length > 0 ? createElement('div', { className: 'doctor-social' }, ...socialLinks) : null
        )
    );
};
