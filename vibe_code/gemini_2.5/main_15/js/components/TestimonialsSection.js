import store from '../store.js';

class TestimonialsSection {
    constructor() {
        this.currentIndex = 0;
    }

    after_render() {
        const prevButton = document.querySelector('.testimonials__nav-btn--prev');
        const nextButton = document.querySelector('.testimonials__nav-btn--next');
        const slider = document.querySelector('.testimonials__slider');
        if (!prevButton || !nextButton || !slider) return;

        const totalSlides = store.testimonials.length;

        const updateSlider = () => {
            const offset = -this.currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        };

        prevButton.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : totalSlides - 1;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex < totalSlides - 1) ? this.currentIndex + 1 : 0;
            updateSlider();
        });
    }

    async render() {
        const testimonialCards = store.testimonials.map(testimonial => `
            <div class="testimonial-card">
                <p class="testimonial-card__text">${testimonial.text}</p>
                <div class="testimonial-card__author">
                    <p class="testimonial-card__author-name">${testimonial.authorName}</p>
                    <p class="testimonial-card__author-role">${testimonial.authorRole}</p>
                </div>
            </div>
        `).join('');

        return `
            <section class="testimonials section" id="testimonials">
                <div class="container">
                    <div class="section-header">
                        <div class="section-header__left">
                            <h2 class="section-title">Testimonials</h2>
                            <p class="section-subtitle">Hear from Our Satisfied Clients and Learn How We've Helped Them Grow Their Businesses</p>
                        </div>
                        <div class="team__nav">
                            <button class="team__nav-btn testimonials__nav-btn--prev" aria-label="Previous testimonial">&lt;</button>
                            <button class="team__nav-btn testimonials__nav-btn--next" aria-label="Next testimonial">&gt;</button>
                        </div>
                    </div>
                    <div class="testimonials__slider-wrapper">
                        <div class="testimonials__slider">
                            ${testimonialCards}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

export default new TestimonialsSection();
