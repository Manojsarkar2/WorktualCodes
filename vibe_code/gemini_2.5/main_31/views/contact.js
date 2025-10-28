import { validateForm, clearValidationErrors } from '../components/validation.js';

export const renderContact = () => {
    return `
        <section class="container section-padding">
            <h1 class="section-heading">Contact Us</h1>
            <div class="grid-2-cols contact-layout">
                <div class="contact-info">
                    <h2>Get in Touch</h2>
                    <p>We'd love to hear from you! Whether you have a question about a product, need assistance with an order, or just want to share your feedback, our team is ready to help.</p>
                    <p><strong>Email:</strong> <a href="mailto:support@whimsyworldtoys.com">support@whimsyworldtoys.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+1-800-555-0123">1-800-555-0123</a></p>
                    <p><strong>Address:</strong> 123 Imagination Lane, Playville, PW 12345</p>
                    <h3>Business Hours:</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                    <p>Saturday: 10:00 AM - 4:00 PM (EST)</p>
                    <p>Sunday: Closed</p>
                </div>
                <div class="form-container">
                    <h2>Send Us a Message</h2>
                    <form id="contact-form">
                        <div class="form-group">
                            <label for="name">Your Name:</label>
                            <input type="text" id="name" name="name" required aria-required="true">
                            <span id="name-error" class="error-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="email">Your Email:</label>
                            <input type="email" id="email" name="email" required aria-required="true">
                            <span id="email-error" class="error-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject:</label>
                            <input type="text" id="subject" name="subject" required aria-required="true">
                            <span id="subject-error" class="error-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="message">Your Message:</label>
                            <textarea id="message" name="message" rows="5" required aria-required="true"></textarea>
                            <span id="message-error" class="error-message"></span>
                        </div>
                        <button type="submit" class="btn">Send Message</button>
                    </form>
                </div>
            </div>
            <div class="section-padding text-center">
                <h2>Find Us on the Map</h2>
                <div style="height: 300px; background-color: #e0e0e0; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-top: 2em;">
                    <p>Map Placeholder (e.g., Google Maps iframe)</p>
                </div>
            </div>
        </section>
    `;
};

export const setupContactForm = () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearValidationErrors(contactForm);

            const rules = {
                name: { required: true, minLength: 2 },
                email: { required: true, email: true },
                subject: { required: true, minLength: 5 },
                message: { required: true, minLength: 10 }
            };

            if (validateForm(contactForm, rules)) {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());
                console.log('Contact Form Submitted:', data);
                alert('Thank you for your message! We will get back to you shortly.');
                contactForm.reset();
            } else {
                alert('Please correct the errors in the form.');
            }
        });
    }
};
