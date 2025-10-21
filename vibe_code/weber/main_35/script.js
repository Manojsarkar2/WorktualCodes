document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Load initial content (Home page)
    loadContent('home.html');

    // Navigation function
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
                // Re-attach event listeners for any interactive elements within the loaded content
                attachEventListeners();
            })
            .catch(error => {
                contentDiv.innerHTML = '<p>Error loading content.</p>';
                console.error('Error loading page:', error);
            });
    }

    // Attach event listeners to dynamically loaded content
    function attachEventListeners() {
        // Example: Attach event listener to a button with id 'myButton'
        const myButton = document.getElementById('myButton');
        if (myButton) {
            myButton.addEventListener('click', () => {
                alert('Button clicked!');
            });
        }

        // Example: Form validation for contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission
                if (validateForm()) {
                    // Form is valid, handle submission (e.g., send data to server)
                    alert('Form submitted successfully!');
                } else {
                    // Form is invalid, display error messages
                    alert('Please fill in all required fields correctly.');
                }
            });
        }
    }

    // Form validation function
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            return false;
        }

        // Basic email validation
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        return true;
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page + '.html');

            // Close the hamburger menu on mobile after clicking a link
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});