document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Function to load content dynamically
    const loadContent = (page) => {
        let pageContent = '';

        switch (page) {
            case 'home':
                pageContent = `<div id="home-page">
                                    <h1>Welcome to TempMail</h1>
                                    <p>Get a free temporary email address that expires after a certain time. Use it for registrations, and avoid spam in your real inbox.</p>
                                    <input type="text" id="emailAddress" placeholder="Your temporary email will appear here" readonly>
                                    <button id="generateEmail">Generate Email</button>
                                    <button id="copyEmail">Copy Email</button>
                                    <div id="inbox"></div>
                                </div>`;
                break;
            case 'contact':
                pageContent = `<div id="contact-page">
                                    <h2>Contact Us</h2>
                                    <form id="contactForm">
                                        <label for="name">Name:</label>
                                        <input type="text" id="name" name="name" required>

                                        <label for="email">Email:</label>
                                        <input type="email" id="email" name="email" required>

                                        <label for="message">Message:</label>
                                        <textarea id="message" name="message" rows="4" required></textarea>

                                        <button type="submit">Send Message</button>
                                    </form>
                                </div>`;
                break;
            case 'faq':
                pageContent = `<div id="faq-page">
                                    <h2>Frequently Asked Questions</h2>
                                    <div class="faq-item">
                                        <div class="faq-question">What is TempMail?</div>
                                        <div class="faq-answer">TempMail is a free service that allows you to create a temporary email address.</div>
                                    </div>
                                    <div class="faq-item">
                                        <div class="faq-question">How long does the email address last?</div>
                                        <div class="faq-answer">The email address lasts for a certain period, after which it expires.</div>
                                    </div>
                                </div>`;
                break;
            default:
                pageContent = '<h1>Page Not Found</h1><p>The requested page does not exist.</p>';
        }

        contentDiv.innerHTML = pageContent;

        // Add event listeners for FAQ items
        if (page === 'faq') {
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                item.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            });
        }

        if (page === 'home') {
            const generateEmailButton = document.getElementById('generateEmail');
            const copyEmailButton = document.getElementById('copyEmail');
            const emailAddressInput = document.getElementById('emailAddress');
            const inboxDiv = document.getElementById('inbox');

            generateEmailButton.addEventListener('click', () => {
                // Generate a random email address
                const randomString = Math.random().toString(36).substring(2, 15);
                const tempEmail = `tempmail_${randomString}@example.com`;
                emailAddressInput.value = tempEmail;

                // Simulate receiving emails (replace with actual API calls)
                setTimeout(() => {
                    const emailDiv = document.createElement('div');
                    emailDiv.innerHTML = `<p><strong>Subject:</strong> Welcome!</p><p>From: service@example.com</p><p>Thank you for using TempMail!</p>`;
                    inboxDiv.appendChild(emailDiv);
                }, 3000);
            });

            copyEmailButton.addEventListener('click', () => {
                emailAddressInput.select();
                document.execCommand('copy');
                alert('Email address copied!');
            });
        }

        if (page === 'contact') {
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                // Basic form validation
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                if (!name || !email || !message) {
                    alert('Please fill in all fields.');
                    return;
                }

                // Store form data in localStorage
                const formData = {
                    name: name,
                    email: email,
                    message: message
                };
                localStorage.setItem('contactFormData', JSON.stringify(formData));

                alert('Message sent! (Data stored in localStorage)');
                contactForm.reset();
            });
        }
    };

    // Initial content load (Home page)
    loadContent('home');

    // Navigation event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page);

            // Hide the mobile menu after clicking a link
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});