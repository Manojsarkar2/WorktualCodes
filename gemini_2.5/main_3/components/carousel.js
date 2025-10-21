export const createCarousel = (containerId, slidesData) => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Carousel container with ID '${containerId}' not found.`);
        return;
    }

    let currentSlide = 0;
    const totalSlides = slidesData.length;

    const carouselHTML = `
        <div class="carousel-slides">
            ${slidesData.map(slide => `
                <div class="carousel-slide" style="background-color: ${slide.bgColor || '#333'};">
                    <div class="carousel-slide-content">
                        <h2>${slide.title}</h2>
                        <p>${slide.description}</p>
                        ${slide.link ? `<button onclick="window.navigateTo('${slide.link}')">Shop Now</button>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        <button class="carousel-button prev" aria-label="Previous slide">&lt;</button>
        <button class="carousel-button next" aria-label="Next slide">&gt;</button>
        <div class="carousel-dots">
            ${slidesData.map((_, index) => `<span class="carousel-dot" data-slide-index="${index}"></span>`).join('')}
        </div>
    `;

    container.innerHTML = carouselHTML;

    const slidesWrapper = container.querySelector('.carousel-slides');
    const dots = container.querySelectorAll('.carousel-dot');

    const updateCarousel = () => {
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    container.querySelector('.carousel-button.next').addEventListener('click', nextSlide);
    container.querySelector('.carousel-button.prev').addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentSlide = parseInt(e.target.dataset.slideIndex);
            updateCarousel();
        });
    });

    let autoSlideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds

    // Pause auto-slide on hover
    container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    container.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    updateCarousel(); // Initial update
};
