export const renderCarousel = (container, items) => {
    if (!items || items.length === 0) {
        container.innerHTML = '<p class="text-center">No carousel items to display.</p>';
        return;
    }

    let currentIndex = 0;

    const updateCarousel = () => {
        const inner = container.querySelector('.carousel-inner');
        if (inner) {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            container.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    };

    container.innerHTML = `
        <div class="carousel">
            <div class="carousel-inner">
                ${items.map(item => `
                    <div class="carousel-item">
                        <div>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="carousel-control prev" aria-label="Previous slide">&lt;</button>
            <button class="carousel-control next" aria-label="Next slide">&gt;</button>
            <div class="carousel-dots">
                ${items.map((_, index) => `<span class="carousel-dot" data-index="${index}" aria-label="Go to slide ${index + 1}"></span>`).join('')}
            </div>
        </div>
    `;

    container.querySelector('.carousel-control.next').addEventListener('click', nextSlide);
    container.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);
    container.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index, 10);
            updateCarousel();
        });
    });

    updateCarousel(); // Initial update

    // Auto-advance carousel
    let autoSlideInterval = setInterval(nextSlide, 5000);
    container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    container.addEventListener('mouseleave', () => autoSlideInterval = setInterval(nextSlide, 5000));
};
