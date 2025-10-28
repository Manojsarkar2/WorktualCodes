import { validateForm, isRequired, isEmail } from '../components/formValidator.js';
import { openModal } from '../components/modal.js';

export const renderContactPage = () => {
    return `
        <section class="section">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Please fill out the form below or use our contact details to get in touch.</p>

            <div class="grid-container" style="grid-template-columns: 1fr 1fr; gap: 40px;">
                <div class="contact-info">
                    <h2>Our Details</h2>
                    <p><strong>Address:</strong> 123 Health Lane, Wellness City, HC 10001</p>
                    <p><strong>Phone:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@medicareclinic.com">info@medicareclinic.com</a></p>
                    <p><strong>Hours:</strong> Mon-Fri: 9:00 AM - 5:00 PM</p>
                    <p>Sat: 10:00 AM - 2:00 PM</p>
                    <p>Sun: Closed</p>
                </div>
                <div class="contact-form-container">
                    <h2>Send Us a Message</h2>
                    <form id="contact-form" class="form-container">
                        <div class="form-group">
                            <label for="contactName">Your Name:</label>
                            <input type="text" id="contactName" name="name" required aria-required="true">
                            <div class="form-error" id="contactName-error"></div>
                        </div>

                        <div class="form-group">
                            <label for="contactEmail">Your Email:</label>
                            <input type="email" id="contactEmail" name="email" required aria-required="true">
                            <div class="form-error" id="contactEmail-error"></div>
                        </div>

                        <div class="form-group">
                            <label for="contactSubject">Subject:</label>
                            <input type="text" id="contactSubject" name="subject" required aria-required="true">
                            <div class="form-error" id="contactSubject-error"></div>
                        </div>

                        <div class="form-group">
                            <label for="contactMessage">Message:</label>
                            <textarea id="contactMessage" name="message" rows="6" required aria-required="true"></textarea>
                            <div class="form-error" id="contactMessage-error"></div>
                        </div>

                        <button type="submit" class="btn-submit">Send Message</button>
                    </form>
                </div>
            </div>
            <div style="margin-top: 40px; text-align: center;">
                <h2>Find Us on the Map</h2>
                <p><em>(Map placeholder - In a real application, this would be an embedded map like Google Maps)</em></p>
                <div style="width: 100%; height: 300px; background-color: #e0e0e0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666; font-style: italic;">
                    [Map Location of MediCare Clinic]
                </div>
            </div>
        </section>
    `;
};

export const setupContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const validationRules = {
        name: [isRequired('Your Name is required.')],
        email: [isRequired('Email is required.'), isEmail('Please enter a valid email address.')],
        subject: [isRequired('Subject is required.')],
        message: [isRequired('Message is required.')]
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const isValid = validateForm(form, validationRules, data);

        if (isValid) {
            console.log('Contact Form Data:', data);
            // In a real app, this would send data to a server.
            // For now, store mock data in localStorage.
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({ ...data, id: Date.now(), timestamp: new Date().toISOString() });
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            openModal(`
                <h2>Message Sent!</h2>
                <p>Thank you, <strong>${data.name}</strong>. Your message has been successfully sent.</p>
                <p>We will get back to you at <strong>${data.email}</strong> as soon as possible.</p>
            `);

            form.reset(); // Clear the form
        } else {
            console.log('Form validation failed.');
        }
    });

    // Add real-time validation feedback on input blur
    Object.keys(validationRules).forEach(fieldName => {
        const input = form.elements[fieldName];
        if (input) {
            input.addEventListener('blur', () => {
                const value = input.value;
                const errorDiv = document.getElementById(`${input.id}-error`);
                const errors = validationRules[fieldName].map(rule => rule(value)).filter(Boolean);
                if (errors.length > 0) {
                    errorDiv.textContent = errors[0];
                    input.classList.add('invalid');
                } else {
                    errorDiv.textContent = '';
                    input.classList.remove('invalid');
                }
            });
        }
    });
};
