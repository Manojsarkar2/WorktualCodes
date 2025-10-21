// components/carousel.js

const createCarousel = () => {
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
        carouselContainer.innerHTML = `
            <div class="carousel">
                <div class="carousel-wrapper">
                    <div class="carousel-item" style="background-color: #f0f0f0;">Item 1</div>
                    <div class="carousel-item" style="background-color: #e0e0e0;">Item 2</div>
                    <div class="carousel-item" style="background-color: #d0d0d0;">Item 3</div>
                </div>
            </div>
        `;

        const carouselWrapper = carouselContainer.querySelector('.carousel-wrapper');
        const carouselItems = carouselContainer.querySelectorAll('.carousel-item');
        let currentIndex = 0;

        const moveCarousel = () => {
            carouselWrapper.style.transform = `translateX(${-currentIndex * 100}%)`;
        };

        // Example of adding navigation buttons
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            moveCarousel();
        });

        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, carouselItems.length - 1);
            moveCarousel();
        });

        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(nextButton);
    }
};

createCarousel();