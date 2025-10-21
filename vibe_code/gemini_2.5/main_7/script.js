document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-button');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Toggle mobile navigation menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only close if it's a mobile menu link AND the menu is active
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }

            // Smooth scroll to section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault(); // Prevent default hash jump
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('.header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });
                // Update URL hash without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // Simple client-side routing based on hash
    const navigateToSection = () => {
        const hash = window.location.hash.substring(1);
        const sections = document.querySelectorAll('main section');
        let found = false;

        sections.forEach(section => {
            if (section.id === hash) {
                // Scroll to section if it exists
                window.scrollTo({
                    top: section.offsetTop - document.querySelector('.header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });
                found = true;
            }
        });

        // If no hash or hash not found, scroll to hero section
        if (!found && hash === '') {
            window.scrollTo({
                top: document.getElementById('hero').offsetTop - document.querySelector('.header').offsetHeight,
                behavior: 'smooth'
            });
        }
    };

    // Initial navigation on page load
    navigateToSection();

    // Listen for hash changes (e.g., back/forward buttons)
    window.addEventListener('hashchange', navigateToSection);

    // Contact Form Submission (Mock)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => (data[key] = value));

            console.log('Form Data Submitted:', data);

            // Store data in localStorage (mocking persistence)
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            submissions.push({ ...data, timestamp: new Date().toISOString() });
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            // Display success message
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#d4edda';
            formMessage.style.color = '#155724';
            formMessage.style.borderColor = '#c3e6cb';

            // Clear form fields
            contactForm.reset();

            // Hide message after a few seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});
