// components/carousel.js

function createCarousel(images) {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    carousel.innerHTML = `
        <div class="carousel-inner">
            ${images.map(image => `<img src="${image}" alt="Carousel Image">`).join('')}
        </div>
        <button class="carousel-control prev" onclick="prevSlide()">&#10094;</button>
        <button class="carousel-control next" onclick="nextSlide()">&#10095;</button>
    `;
    return carousel;
}

function prevSlide() {
    alert('Previous slide');
}

function nextSlide() {
    alert('Next slide');
}

// Export the function to make it accessible
// In a pure-JS environment, you can attach it to the window object
window.createCarousel = createCarousel;
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;