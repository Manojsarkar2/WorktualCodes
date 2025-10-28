// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let counter = 0;
    const size = carouselImages[0].clientWidth;

    // Set initial position
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // Next button
    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) {
            counter = -1; // Loop back to the start (before first image for smooth transition)
            carouselSlide.style.transition = 'none'; // Disable transition for instant jump
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            setTimeout(() => {
                carouselSlide.style.transition = 'transform 0.5s ease-in-out';
                counter++;
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }, 50);
        } else {
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            counter++;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) {
            counter = carouselImages.length; // Loop back to the end (after last image for smooth transition)
            carouselSlide.style.transition = 'none'; // Disable transition for instant jump
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            setTimeout(() => {
                carouselSlide.style.transition = 'transform 0.5s ease-in-out';
                counter--;
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }, 50);
        } else {
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            counter--;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });

    // Auto-slide functionality (optional)
    let autoSlide = setInterval(() => {
        nextBtn.click();
    }, 5000); // Change image every 5 seconds

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });

    // Adjust carousel on window resize
    window.addEventListener('resize', () => {
        const newSize = carouselImages[0].clientWidth;
        carouselSlide.style.transition = 'none';
        carouselSlide.style.transform = 'translateX(' + (-newSize * counter) + 'px)';
    });

    // Simple dynamic content example (e.g., greeting based on time)
    const loginLink = document.querySelector('.header-nav .nav-link');
    if (loginLink && loginLink.textContent.includes('Login')) {
        const hour = new Date().getHours();
        let greeting = "";
        if (hour < 12) {
            greeting = "Good Morning!";
        } else if (hour < 18) {
            greeting = "Good Afternoon!";
        } else {
            greeting = "Good Evening!";
        }
        // This is a simple example, in a real SPA, this would involve user authentication state.
        // For now, we'll just add a console log.
        console.log(greeting + " Welcome to Flipkart!");
    }

    // Handle dropdown menu for 'More'
    const moreDropdown = document.querySelector('.header-nav .dropdown');
    if (moreDropdown) {
        moreDropdown.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from closing immediately
            moreDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!moreDropdown.contains(e.target)) {
                moreDropdown.classList.remove('active');
            }
        });
    }
});
