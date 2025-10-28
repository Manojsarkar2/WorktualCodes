import { createElement } from '../utils/helpers.js';

export class TestimonialCard {
    constructor(testimonial) {
        this.testimonial = testimonial;
    }

    render() {
        const card = createElement('div', { class: 'testimonial-card' });

        const quote = createElement('p', { class: 'quote' }, this.testimonial.quote);
        const avatar = createElement('img', { class: 'avatar', src: this.testimonial.avatar, alt: this.testimonial.name });
        const name = createElement('p', { class: 'name' }, this.testimonial.name);
        const rating = createElement('div', { class: 'rating' });

        for (let i = 0; i < 5; i++) {
            const star = createElement('span', { class: 'star' }, i < this.testimonial.rating ? '★' : '☆');
            rating.appendChild(star);
        }

        card.append(quote, avatar, name, rating);

        return card;
    }
}
