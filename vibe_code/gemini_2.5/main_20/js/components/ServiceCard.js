import { $ } from '../utils/dom.js';

export const ServiceCard = ({ title, description, icon, theme = 'dark' }) => {
    const card = $.create('div', { class: `service-card ${theme === 'green' ? 'green-bg' : ''}` });

    card.innerHTML = `
        <div class="service-card-header">
            <h4>${title}</h4>
            <div class="icon"><img src="${icon}" alt="${title} icon"></div>
        </div>
        <p class="text-small">${description}</p>
        <a href="#contact" class="arrow-link" data-nav-link>
            Learn more
            <img src="assets/images/arrow-right.svg" alt="Learn more arrow">
        </a>
    `;

    return card;
};