export function createCarousel(id, slidesData) {
    return `
        <div id="${id}" class="carousel-container">
            <div class="carousel-slides">
                ${slidesData.map(slide => `
                    <div class="carousel-slide">
                        <h2>${slide.title}</h2>
                        <p>${slide.description}</p>
                    </div>
                `).join('')}
            </div>
            <button class="carousel-btn prev">&lt;</button>
            <button class="carousel-btn next">&gt;</button>
        </div>
    `;
}

export function initCarousel(id) {
    const carouselContainer = document.getElementById(id);
    if (!carouselContainer) return;

    const slides = carouselContainer.querySelector('.carousel-slides');
    const prevBtn = carouselContainer.querySelector('.carousel-btn.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-btn.next');
    const slideCount = slides.children.length;
    let currentIndex = 0;

    function updateCarousel() {
        slides.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    };

    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    };

    // Auto-advance (optional)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % slideCount;
    //     updateCarousel();
    // }, 5000);
}
