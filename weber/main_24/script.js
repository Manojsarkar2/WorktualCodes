document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const content = document.getElementById('content');
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const contactForm = document.getElementById('contact-form');

    // Function to load content based on the data-page attribute
    function loadContent(pageId) {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        // Show the selected section
        const selectedSection = document.getElementById(pageId);
        if (selectedSection) {
            selectedSection.classList.remove('hidden');
            selectedSection.classList.add('active');
        }
    }

    // Navigation handling
    navLinks.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const pageId = event.target.getAttribute('data-page');
            loadContent(pageId);

            // Close the mobile menu after clicking a link
            if (hamburger.style.display !== 'none') {
                navLinks.classList.remove('active');
            }
        }
    });

    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Theme Toggle
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    // Check local storage for theme preference on load
    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode();
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Contact Form Submission
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Store data in localStorage
        const formData = {
            name: name,
            email: email,
            message: message
        };
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        alert('Form submitted successfully!');
        contactForm.reset();
    });

    // Load default content (Home)
    loadContent('home');
});