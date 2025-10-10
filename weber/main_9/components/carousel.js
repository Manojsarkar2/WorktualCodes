// components/carousel.js
export const createCarousel = (images) => {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('carousel-images');

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = 'Carousel Image';
        imageContainer.appendChild(imgElement);
    });

    carousel.appendChild(imageContainer);

    // Navigation buttons (optional)
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.classList.add('carousel-button', 'prev');
    carousel.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('carousel-button', 'next');
    carousel.appendChild(nextButton);

    // Basic styling (you'll need to add more CSS)
    imageContainer.style.display = 'flex';
    imageContainer.style.overflowX = 'hidden';

    let currentIndex = 0;
    const updateCarousel = () => {
        imageContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    return carousel;
};