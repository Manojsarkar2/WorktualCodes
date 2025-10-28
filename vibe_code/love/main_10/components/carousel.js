import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for a carousel component.
 * @param {Array<Object>} slides - An array of slide objects, each with `title`, `description`, and `background` (for CSS).
 * @param {string} id - Unique ID for the carousel.
 * @returns {string} The HTML string for the carousel.
 */
export function generateCarouselHTML(slides, id = 'hero-carousel') {
    if (!slides || slides.length === 0) return '';

    const slideElements = slides.map((slide, index) => `
        <div class="carousel-slide" style="background-image: url('${slide.background}');" data-index="${index}">
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.description}</p>
                ${slide.link ? `<a href="${slide.link}" data-route="${slide.link}" class="btn btn-primary">${slide.linkText || 'Shop Now'}</a>` : ''}
            </div>
        </div>
    `).join('');

    return `
        <div id="${id}" class="carousel" aria-roledescription="carousel" aria-label="Image Carousel">
            <div class="carousel-slides" role="group" aria-live="polite" aria-atomic="true">
                ${slideElements}
            </div>
            <button class="carousel-nav-btn carousel-prev" aria-label="Previous slide">&lt;</button>
            <button class="carousel-nav-btn carousel-next" aria-label="Next slide">&gt;</button>
        </div>
    `;
}

/**
 * Initializes the carousel functionality.
 * @param {string} id - The ID of the carousel element.
 */
export function initCarousel(id = 'hero-carousel') {
    const carousel = getElement(`#${id}`);
    if (!carousel) return;

    const slidesContainer = carousel.querySelector('.carousel-slides');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (!slidesContainer || slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    const updateCarousel = () => {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.setAttribute('aria-hidden', 'true');
            }
        });
    };

    const goToNextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    };

    const goToPrevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Auto-advance carousel
    let autoSlideInterval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds

    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(goToNextSlide, 5000);
    });

    updateCarousel(); // Initial render
}