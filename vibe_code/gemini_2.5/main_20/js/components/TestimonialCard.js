import { $ } from '../utils/dom.js';

export const TestimonialCard = ({ quote, author, position, avatar }) => {
    const card = $.create('div', { class: 'testimonial-card' });

    card.innerHTML = `
        <p class="quote">${quote}</p>
        <div class="testimonial-author-info">
            <img src="${avatar}" alt="${author}'s avatar" class="testimonial-avatar">
            <div class="testimonial-author-details">
                <h5>${author}</h5>
                <p>${position}</p>
            </div>
        </div>
    `;

    return card;
};