export const renderCarousel = (container, items) => {
    if (!items || items.length === 0) {
        container.innerHTML = '<p class="text-center">No items for carousel.</p>';
        return;
    }

    let currentIndex = 0;

    container.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-slides" id="carousel-slides"></div>
            <button class="carousel-nav-btn prev" aria-label="Previous slide">&#10094;</button>
            <button class="carousel-nav-btn next" aria-label="Next slide">&#10095;</button>
        </div>
    `;

    const slidesContainer = container.querySelector('#carousel-slides');
    const prevBtn = container.querySelector('.carousel-nav-btn.prev');
    const nextBtn = container.querySelector('.carousel-nav-btn.next');

    items.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <div>
                <h2>${item.name}</h2>
                <p>${item.description.substring(0, 100)}...</p>
                <a href="/product/${item.id}" data-link class="btn btn-primary mt-3">View Product</a>
            </div>
        `;
        slidesContainer.appendChild(slide);
    });

    const updateCarousel = () => {
        slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
    };

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Auto-advance carousel
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }, 5000);

    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    container.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, 5000);
    });

    updateCarousel(); // Initial display
};
