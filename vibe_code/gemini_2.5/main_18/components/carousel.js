export const createCarousel = (element, slidesData) => {
    if (!slidesData || slidesData.length === 0) {
        element.innerHTML = '<p>No carousel content available.</p>';
        return;
    }

    element.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-slides"></div>
            <button class="carousel-nav-btn prev" aria-label="Previous slide">&lt;</button>
            <button class="carousel-nav-btn next" aria-label="Next slide">&gt;</button>
            <div class="carousel-dots"></div>
        </div>
    `;

    const slidesContainer = element.querySelector('.carousel-slides');
    const prevBtn = element.querySelector('.carousel-nav-btn.prev');
    const nextBtn = element.querySelector('.carousel-nav-btn.next');
    const dotsContainer = element.querySelector('.carousel-dots');

    slidesData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'carousel-slide';
        slideElement.setAttribute('role', 'group');
        slideElement.setAttribute('aria-label', `Slide ${index + 1} of ${slidesData.length}`);
        slideElement.innerHTML = `
            <div class="carousel-slide-content">
                <h3>${slide.title}</h3>
                <p>${slide.description}</p>
                <div class="card-image" style="height: 150px; width: 100%; max-width: 400px; margin: 20px auto; background-color: var(--color-primary-dark); border: 1px solid var(--color-border);">${slide.imageText}</div>
            </div>
        `;
        slidesContainer.appendChild(slideElement);

        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    let currentIndex = 0;
    const slides = element.querySelectorAll('.carousel-slide');
    const dots = element.querySelectorAll('.carousel-dot');

    const updateCarousel = () => {
        slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
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
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index);
            updateCarousel();
        });
    });

    updateCarousel(); // Initial render

    // Optional: Auto-advance carousel
    let autoAdvanceInterval;
    const startAutoAdvance = () => {
        autoAdvanceInterval = setInterval(() => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    };

    const stopAutoAdvance = () => {
        clearInterval(autoAdvanceInterval);
    };

    // Pause on hover
    const carouselContainer = element.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
    carouselContainer.addEventListener('mouseleave', startAutoAdvance);

    startAutoAdvance();
};
