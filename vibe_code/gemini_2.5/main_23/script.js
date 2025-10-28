document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active'); // Toggles hamburger icon animation
        document.body.classList.toggle('no-scroll'); // Optional: prevent body scrolling when menu is open
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevButton = document.querySelector('.slider-nav .prev');
    const nextButton = document.querySelector('.slider-nav .next');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    let currentIndex = 0;

    if (testimonialSlider && testimonialCards.length > 0) {
        function updateSlider() {
            const cardWidthWithGap = testimonialSlider.scrollWidth / testimonialCards.length; // Approximate width including gap
            testimonialSlider.scrollTo({
                left: currentIndex * cardWidthWithGap,
                behavior: 'smooth'
            });
        }

        nextButton.addEventListener('click', () => {
            if (currentIndex < testimonialCards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = testimonialCards.length - 1; // Loop to end
            }
            updateSlider();
        });

        // Optional: Auto-slide
        // setInterval(() => {
        //     nextButton.click();
        // }, 5000); // Change slide every 5 seconds
    }

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add 'active' class to nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for header height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});