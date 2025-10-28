import { $ } from '../utils/dom.js';

export const CaseStudyCard = ({ title, description, link, image, type = 'small' }) => {
    const card = $.create('div', { class: `case-study-card ${type === 'large' ? 'full-width' : ''}` });

    if (type === 'large') {
        card.innerHTML = `
            <div class="card-content">
                <h4>${title}</h4>
                <p>${description}</p>
                <a href="${link}" class="arrow-link" data-nav-link>
                    Learn more
                    <img src="assets/images/arrow-right.svg" alt="Learn more arrow">
                </a>
            </div>
            <div class="card-image-container">
                <img src="${image}" alt="${title}" class="card-image">
            </div>
        `;
    } else {
        card.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
            <a href="${link}" class="arrow-link" data-nav-link>
                Learn more
                <img src="assets/images/arrow-right.svg" alt="Learn more arrow">
            </a>
        `;
    }

    return card;
};