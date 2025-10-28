export const initCarousel = (carouselContainer) => {
    if (!carouselContainer) return;

    const slidesContainer = carouselContainer.querySelector('.carousel-slides');
    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const prevBtn = carouselContainer.querySelector('.carousel-nav-btn.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-nav-btn.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    if (totalSlides === 0) return; // No slides to show

    const updateCarousel = () => {
        slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
        // Update ARIA attributes for current slide
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.setAttribute('aria-hidden', 'false');
                slide.setAttribute('tabindex', '0');
            } else {
                slide.setAttribute('aria-hidden', 'true');
                slide.setAttribute('tabindex', '-1');
            }
        });
    };

    const showNextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    };

    const showPrevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);

    // Initialize carousel state
    updateCarousel();

    // Optional: Auto-advance carousel
    // let autoSlideInterval = setInterval(showNextSlide, 5000);
    // carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    // carouselContainer.addEventListener('mouseleave', () => autoSlideInterval = setInterval(showNextSlide, 5000));
};
