// components/carousel.js

// Example usage:
// <div id="carousel-container"></div>
// Carousel(['image1.jpg', 'image2.jpg', 'image3.jpg'], 'carousel-container');

const Carousel = (images, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found.`);
        return;
    }

    let currentIndex = 0;

    const carousel = document.createElement('div');
    carousel.className = 'carousel';

    const image = document.createElement('img');
    image.src = images[currentIndex];
    image.alt = 'Carousel Image';
    image.className = 'carousel-image';
    carousel.appendChild(image);

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.className = 'carousel-button carousel-prev';
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        image.src = images[currentIndex];
    });
    carousel.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.className = 'carousel-button carousel-next';
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        image.src = images[currentIndex];
    });
    carousel.appendChild(nextButton);

    container.appendChild(carousel);
};

export default Carousel;