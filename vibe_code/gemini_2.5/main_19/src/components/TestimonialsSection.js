import { createElement } from '../utils.js';
import { TestimonialCard } from './TestimonialCard.js';
import { api } from '../api.js';

export const TestimonialsSection = async () => {
    const testimonialsData = await api.getTestimonials();

    const testimonialCards = testimonialsData.map(testimonial => TestimonialCard(testimonial));

    return createElement('section', { id: 'testimonials', className: 'testimonials-section section-padding' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'section-header' },
                createElement('h2', { className: 'section-title' }, 'What Our Patients Say'),
                createElement('p', { className: 'section-subtitle' }, 'Hear from our satisfied patients about their positive experiences and the exceptional care they received at MedCare.')
            ),
            createElement('div', { className: 'testimonial-grid' }, ...testimonialCards)
        )
    );
};
