import { createElement } from '../utils/helpers.js';

export const TestimonialCard = ({ image, name, quote, rating }) => {
    const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
    return createElement('div', { className: 'testimonial-card' },
        createElement('img', { src: image, alt: name }),
        createElement('p', { className: 'quote' }, quote),
        createElement('h4', { className: 'name' }, name),
        createElement('div', { className: 'rating', 'aria-label': `${rating} out of 5 stars` }, stars)
    );
};
