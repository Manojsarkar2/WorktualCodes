import { createElement } from '../utils/helpers.js';
import { TestimonialCard } from './TestimonialCard.js';
import api from '../api.js';

export class TestimonialsSection {
    constructor() {
        this.testimonials = [];
    }

    async render() {
        this.testimonials = await api.getTestimonials();

        const section = createElement('section', { id: 'testimonials', class: 'testimonials-section section-padding text-center' });
        const container = createElement('div', { class: 'container' });

        const headerDiv = createElement('div', { class: 'section-header' });
        const heading = createElement('h2', {}, 'What Our Patients Say');
        const paragraph = createElement('p', {}, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.');
        headerDiv.append(heading, paragraph);

        const cardsGrid = createElement('div', { class: 'grid grid-cols-3 gap-lg' });
        this.testimonials.forEach(testimonial => {
            const card = new TestimonialCard(testimonial);
            cardsGrid.appendChild(card.render());
        });

        container.append(headerDiv, cardsGrid);
        section.appendChild(container);

        return section;
    }
}
