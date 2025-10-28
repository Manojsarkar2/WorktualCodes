import { $ } from '../utils/dom.js';

export const TeamMemberCard = ({ name, position, image, socials }) => {
    const card = $.create('div', { class: 'team-member-card' });

    const socialLinksHtml = Object.entries(socials).map(([platform, url]) => `
        <a href="${url}" class="social-link" aria-label="${platform}">
            <img src="assets/images/${platform}.svg" alt="${platform} icon">
        </a>
    `).join('');

    card.innerHTML = `
        <img src="${image}" alt="${name}" class="team-member-image">
        <h4>${name}</h4>
        <p>${position}</p>
        <div class="social-links">
            ${socialLinksHtml}
        </div>
    `;

    return card;
};