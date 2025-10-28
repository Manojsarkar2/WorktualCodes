import { createElement } from '../utils/helpers.js';

export const ServiceCard = ({ icon, title, description }) => {
    return createElement('div', { className: 'service-card' },
        createElement('img', { src: icon, alt: `${title} icon` }),
        createElement('h3', {}, title),
        createElement('p', {}, description),
        createElement('a', { href: '#services', className: 'read-more-link' }, 'Read More')
    );
};
