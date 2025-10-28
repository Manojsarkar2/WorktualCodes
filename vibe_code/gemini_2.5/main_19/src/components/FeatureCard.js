import { createElement, sanitizeHTML } from '../utils.js';

export const FeatureCard = ({ icon, title, description, type = 'icon-top' }) => {
    const iconElement = createElement('div', { className: 'feature-card-icon' },
        createElement('i', { className: `fas ${icon}` })
    );

    const titleElement = createElement('h3', { className: 'feature-card-title' }, title);
    const descriptionElement = createElement('p', { className: 'feature-card-description' }, sanitizeHTML(description));

    return createElement('div', { className: `feature-card feature-card-${type}` },
        iconElement,
        createElement('div', { className: 'feature-card-content' },
            titleElement,
            descriptionElement
        )
    );
};
