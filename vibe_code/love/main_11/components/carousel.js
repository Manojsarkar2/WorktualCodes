export const setupCarousel = (containerId = 'home-carousel') => {
    const carouselContainer = document.getElementById(containerId);
    if (!carouselContainer) return;

    const slidesContainer = carouselContainer.querySelector('.carousel-slides');
    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const prevBtn = carouselContainer.querySelector('.carousel-nav .prev');
    const nextBtn = carouselContainer.querySelector('.carousel-nav .next');
    const dotsContainer = carouselContainer.querySelector('.carousel-dots');

    if (!slidesContainer || slides.length === 0 || !prevBtn || !nextBtn || !dotsContainer) {
        console.warn(`Carousel components not fully found for ID: ${containerId}`);
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    const updateCarousel = () => {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    };

    const createDots = () => {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    };

    const updateDots = () => {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    };

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Keyboard navigation for accessibility
    carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    createDots();
    updateCarousel(); // Initial display

    // Optional: Auto-play
    // let autoPlayInterval = setInterval(() => nextBtn.click(), 5000);
    // carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    // carouselContainer.addEventListener('mouseleave', () => autoPlayInterval = setInterval(() => nextBtn.click(), 5000));
};
