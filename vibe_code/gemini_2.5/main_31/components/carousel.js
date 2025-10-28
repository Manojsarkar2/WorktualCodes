export const initCarousel = (containerId, itemsToShow = 3) => {
    const carouselContainer = document.getElementById(containerId);
    if (!carouselContainer) return;

    const carouselTrack = carouselContainer.querySelector('.carousel-track');
    const carouselItems = carouselTrack.querySelectorAll('.carousel-item');
    if (carouselItems.length === 0) return;

    let currentIndex = 0;
    const totalItems = carouselItems.length;

    // Create navigation buttons if they don't exist
    let prevBtn = carouselContainer.querySelector('.carousel-button.prev');
    let nextBtn = carouselContainer.querySelector('.carousel-button.next');

    if (!prevBtn) {
        prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-button prev';
        prevBtn.innerHTML = '&lt;';
        carouselContainer.appendChild(prevBtn);
    }
    if (!nextBtn) {
        nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-button next';
        nextBtn.innerHTML = '&gt;';
        carouselContainer.appendChild(nextBtn);
    }

    const updateCarousel = () => {
        const itemWidth = carouselTrack.children[0].offsetWidth;
        const offset = -currentIndex * itemWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalItems - itemsToShow;
    };

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - itemsToShow) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Adjust itemsToShow based on screen size for responsiveness
    const adjustItemsToShow = () => {
        if (window.innerWidth <= 480) {
            carouselItems.forEach(item => item.style.minWidth = '100%');
            itemsToShow = 1;
        } else if (window.innerWidth <= 768) {
            carouselItems.forEach(item => item.style.minWidth = '50%');
            itemsToShow = 2;
        } else {
            carouselItems.forEach(item => item.style.minWidth = '33.33%');
            itemsToShow = 3;
        }
        currentIndex = 0; // Reset index on resize
        updateCarousel();
    };

    window.addEventListener('resize', adjustItemsToShow);

    // Initial setup
    adjustItemsToShow();
};
