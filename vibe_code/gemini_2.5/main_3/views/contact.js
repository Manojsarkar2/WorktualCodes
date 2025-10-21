import { validateForm } from '../components/formValidator.js';

export const ContactView = async () => {
    return `
        <div class="container">
            <div class="form-container">
                <h2>Contact Us</h2>
                <p class="text-center" style="margin-bottom: 20px;">Have a question or need assistance? Fill out the form below.</p>
                <form id="contact-form">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required aria-required="true">
                        <div id="name-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required aria-required="true">
                        <div id="email-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" required aria-required="true">
                        <div id="subject-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <div class="form-group">
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" rows="5" required aria-required="true"></textarea>
                        <div id="message-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    `;
};

ContactView.afterRender = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const rules = {
                name: { required: true, label: 'Name' },
                email: { required: true, email: true, label: 'Email' },
                subject: { required: true, label: 'Subject' },
                message: { required: true, minLength: 10, label: 'Message' }
            };

            const { isValid, errors } = validateForm(contactForm, rules);

            if (isValid) {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());
                console.log('Contact Form Data:', data);
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                // In a real app, you would send this data to a server
            } else {
                console.log('Validation errors:', errors);
            }
        });
    }
};
