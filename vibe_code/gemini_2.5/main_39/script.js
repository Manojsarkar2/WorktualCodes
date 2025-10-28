document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close nav links when clicking outside on mobile
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Placeholder for any future dynamic content or interactions, e.g., product filters, image sliders
    // For this Figma design, most interactivity is handled by CSS hover effects.

    console.log('Furnics website loaded successfully!');
});
