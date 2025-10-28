import { validateForm } from '../components/validation.js';

export const renderContactPage = (container) => {
    container.innerHTML = `
        <h1 class="mb-4 text-center">Contact Us</h1>
        <div class="contact-form-container">
            <p class="text-center">Have questions or feedback? Reach out to us!</p>
            <form id="contact-form">
                <div class="form-group">
                    <label for="contact-name">Name</label>
                    <input type="text" id="contact-name" name="name" class="form-control" placeholder="Your Name" required aria-required="true"/>
                    <div class="form-text-error" id="name-error"></div>
                </div>
                <div class="form-group">
                    <label for="contact-email">Email</label>
                    <input type="email" id="contact-email" name="email" class="form-control" placeholder="your@example.com" required aria-required="true"/>
                    <div class="form-text-error" id="email-error"></div>
                </div>
                <div class="form-group">
                    <label for="contact-subject">Subject</label>
                    <input type="text" id="contact-subject" name="subject" class="form-control" placeholder="Subject" required aria-required="true"/>
                    <div class="form-text-error" id="subject-error"></div>
                </div>
                <div class="form-group">
                    <label for="contact-message">Message</label>
                    <textarea id="contact-message" name="message" class="form-control" rows="5" placeholder="Your Message" required aria-required="true"></textarea>
                    <div class="form-text-error" id="message-error"></div>
                </div>
                <button type="submit" class="btn btn-primary w-100">Send Message</button>
            </form>
        </div>
    `;

    const contactForm = container.querySelector('#contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: contactForm.querySelector('#contact-name').value,
            email: contactForm.querySelector('#contact-email').value,
            subject: contactForm.querySelector('#contact-subject').value,
            message: contactForm.querySelector('#contact-message').value,
        };

        const rules = {
            name: { required: true, minLength: 3 },
            email: { required: true, email: true },
            subject: { required: true, minLength: 5 },
            message: { required: true, minLength: 10 },
        };

        const errors = validateForm(formData, rules);

        // Clear previous errors
        Object.keys(rules).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) errorElement.textContent = '';
        });

        if (Object.keys(errors).length === 0) {
            // Form is valid, simulate submission
            console.log('Contact Form Data:', formData);
            window.openModal('Message Sent!', 'Thank you for contacting us. We will get back to you shortly.');
            contactForm.reset();
        } else {
            // Display errors
            Object.keys(errors).forEach(field => {
                const errorElement = document.getElementById(`${field}-error`);
                if (errorElement) errorElement.textContent = errors[field];
            });
            window.openModal('Validation Error', 'Please correct the errors in the form.');
        }
    });
};
