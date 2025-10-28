import * as Validation from '../utils/validation.js';

/**
 * Renders the HTML for the contact page and attaches event listeners.
 * @returns {string} The HTML string for the contact page.
 */
export function renderContactPage() {
    // Attach event listeners after a short delay to ensure content is in DOM
    setTimeout(() => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.removeEventListener('submit', handleContactFormSubmit);
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }
    }, 0);

    return `
        <h1>Contact Us</h1>
        <p style="text-align: center; max-width: 800px; margin: 0 auto 3rem;">Have questions or feedback? We'd love to hear from you. Reach out to us using the form below or through our contact information.</p>

        <div class="contact-info">
            <div class="contact-info-item">
                <h3>Location</h3>
                <p>123 Foodie Street, Culinary City, FC 45678</p>
            </div>
            <div class="contact-info-item">
                <h3>Phone</h3>
                <p><a href="tel:+1234567890">+1 (234) 567-890</a></p>
            </div>
            <div class="contact-info-item">
                <h3>Email</h3>
                <p><a href="mailto:info@gourmetgrub.com">info@gourmetgrub.com</a></p>
            </div>
        </div>

        <div class="contact-form-container">
            <h2>Send Us a Message</h2>
            <form id="contact-form">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required aria-required="true">
                    <div id="name-error" class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required aria-required="true">
                    <div id="email-error" class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" required aria-required="true">
                    <div id="subject-error" class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="6" required aria-required="true"></textarea>
                    <div id="message-error" class="form-error"></div>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        </div>
    `;
}

/**
 * Handles the submission of the contact form.
 * @param {Event} event - The submit event.
 */
function handleContactFormSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    let isValid = true;

    // Validate Name
    if (!Validation.validateRequired(nameInput.value)) {
        document.getElementById('name-error').textContent = 'Name is required.';
        isValid = false;
    } else {
        document.getElementById('name-error').textContent = '';
    }

    // Validate Email
    if (!Validation.validateEmail(emailInput.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        document.getElementById('email-error').textContent = '';
    }

    // Validate Subject
    if (!Validation.validateRequired(subjectInput.value)) {
        document.getElementById('subject-error').textContent = 'Subject is required.';
        isValid = false;
    } else {
        document.getElementById('subject-error').textContent = '';
    }

    // Validate Message
    if (!Validation.validateRequired(messageInput.value)) {
        document.getElementById('message-error').textContent = 'Message is required.';
        isValid = false;
    } else {
        document.getElementById('message-error').textContent = '';
    }

    if (isValid) {
        // Simulate form submission
        console.log('Contact Form Data:', {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        });
        alert('Your message has been sent successfully! We will get back to you shortly.');
        // Clear the form
        event.target.reset();
    } else {
        alert('Please correct the errors in the form.');
    }
}
