import { createElement, sanitizeHTML } from '../utils.js';

export const TestimonialCard = ({ name, designation, image, quote }) => {
    return createElement('div', { className: 'testimonial-card' },
        createElement('div', { className: 'testimonial-quote' },
            createElement('p', {}, sanitizeHTML(quote))
        ),
        createElement('div', { className: 'testimonial-author' },
            createElement('img', { src: image, alt: name, className: 'author-avatar' }),
            createElement('div', { className: 'author-info' },
                createElement('h4', { className: 'author-name' }, name),
                createElement('p', { className: 'author-designation' }, designation)
            )
        )
    );
};
