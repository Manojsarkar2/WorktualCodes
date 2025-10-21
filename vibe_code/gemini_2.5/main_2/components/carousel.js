export const renderCarousel = (targetElement, slidesData) => {
    if (!slidesData || slidesData.length === 0) {
        targetElement.innerHTML = '<p style="text-align: center;">No featured deals available.</p>';
        return;
    }

    let currentSlide = 0;

    targetElement.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-slides" style="transform: translateX(0%);"></div>
            <button class="carousel-button prev" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>
            <button class="carousel-button next" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;

    const carouselSlidesContainer = targetElement.querySelector('.carousel-slides');
    slidesData.forEach(slide => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('carousel-slide');
        slideElement.innerHTML = `
            <h2>${slide.name}</h2>
            <p>${slide.description}</p>
            <a href="/products" class="btn-shop" data-nav>Shop Now for $${slide.price.toFixed(2)}</a>
        `;
        carouselSlidesContainer.appendChild(slideElement);
    });

    const updateCarousel = () => {
        carouselSlidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    targetElement.querySelector('.carousel-button.next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slidesData.length;
        updateCarousel();
    });

    targetElement.querySelector('.carousel-button.prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
        updateCarousel();
    });

    // Auto-advance carousel
    let autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slidesData.length;
        updateCarousel();
    }, 5000); // Change slide every 5 seconds

    // Pause on hover
    targetElement.querySelector('.carousel-container').addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    targetElement.querySelector('.carousel-container').addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slidesData.length;
            updateCarousel();
        }, 5000);
    });
};
