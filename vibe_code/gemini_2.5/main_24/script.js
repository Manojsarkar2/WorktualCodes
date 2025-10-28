document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Close nav when clicking a link (for mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });

    // Accordion functionality for Why Us section
    document.querySelectorAll('.accordion-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });

    // Generic Slider / Carousel functionality
    const setupSlider = (sliderSelector, dotSelector, prevArrowSelector, nextArrowSelector) => {
        const slider = document.querySelector(sliderSelector);
        if (!slider) return;

        const cards = Array.from(slider.children);
        const dots = document.querySelectorAll(dotSelector);
        const prevArrow = document.querySelector(prevArrowSelector);
        const nextArrow = document.querySelector(nextArrowSelector);
        let currentIndex = 0;

        const updateSlider = () => {
            // Calculate scroll position. Add gap for accurate scrolling.
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(slider).gap);
            slider.scrollTo({
                left: currentIndex * (cardWidth + gap),
                behavior: 'smooth'
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const goToNext = () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        };

        const goToPrev = () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        };

        nextArrow.addEventListener('click', goToNext);
        prevArrow.addEventListener('click', goToPrev);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Initialize slider position and dots
        updateSlider();

        // Optional: Update dots if user scrolls manually
        slider.addEventListener('scroll', () => {
            const scrollLeft = slider.scrollLeft;
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(slider).gap);
            // Adjust calculation for potential fractional scrolls and gaps
            currentIndex = Math.round(scrollLeft / (cardWidth + gap));
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        });
    };

    // Setup Case Studies Slider
    setupSlider('.case-studies-slider', '.case-studies-section .slider-dots .dot', '.case-studies-section .slider-arrow-left', '.case-studies-section .slider-arrow-right');

    // Setup Testimonials Slider
    setupSlider('.testimonials-slider', '.testimonials-section .slider-dots .dot', '.testimonials-section .slider-arrow-left', '.testimonials-section .slider-arrow-right');

    // Handle newsletter form submission (placeholder)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            alert(`Subscribed with: ${emailInput.value}`);
            emailInput.value = '';
        });
    }
});
