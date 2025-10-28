import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for the Contact page.
 * @returns {string} The HTML string for the Contact page.
 */
export function getContactPageHTML() {
    return `
        <div class="contact-page container">
            <div class="form-card">
                <h1>Contact Us</h1>
                <p>Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.</p>
                <form id="contact-form" aria-labelledby="contact-heading">
                    <div class="form-group">
                        <label for="contact-name">Your Name</label>
                        <input type="text" id="contact-name" name="name" required aria-required="true">
                        <p class="form-error" id="contact-name-error" aria-live="polite"></p>
                    </div>
                    <div class="form-group">
                        <label for="contact-email">Your Email</label>
                        <input type="email" id="contact-email" name="email" required aria-required="true">
                        <p class="form-error" id="contact-email-error" aria-live="polite"></p>
                    </div>
                    <div class="form-group">
                        <label for="contact-subject">Subject</label>
                        <input type="text" id="contact-subject" name="subject" required aria-required="true">
                        <p class="form-error" id="contact-subject-error" aria-live="polite"></p>
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" name="message" rows="6" required aria-required="true"></textarea>
                        <p class="form-error" id="contact-message-error" aria-live="polite"></p>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
                <div id="contact-success-message" class="hidden text-center" role="alert" aria-live="assertive">
                    <p>Thank you for your message! We will get back to you shortly.</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Initializes any interactive components on the Contact page.
 */
export function initContactPage() {
    const contactForm = getElement('#contact-form');
    const nameInput = getElement('#contact-name');
    const emailInput = getElement('#contact-email');
    const subjectInput = getElement('#contact-subject');
    const messageInput = getElement('#contact-message');
    const successMessageDiv = getElement('#contact-success-message');

    const nameError = getElement('#contact-name-error');
    const emailError = getElement('#contact-email-error');
    const subjectError = getElement('#contact-subject-error');
    const messageError = getElement('#contact-message-error');

    if (!contactForm || !nameInput || !emailInput || !subjectInput || !messageInput || !successMessageDiv ||
        !nameError || !emailError || !subjectError || !messageError) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors and success message
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
        successMessageDiv.classList.add('hidden');

        let isValid = true;

        if (!nameInput.value.trim()) {
            nameError.textContent = 'Your name is required.';
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            emailError.textContent = 'Your email is required.';
            isValid = false;
        } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!subjectInput.value.trim()) {
            subjectError.textContent = 'Subject is required.';
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            messageError.textContent = 'Message cannot be empty.';
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            console.log('Contact Form Submitted:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            });

            // Store in localStorage (mocking a backend submission)
            const contactSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            contactSubmissions.push({
                id: Date.now(),
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));

            contactForm.reset();
            successMessageDiv.classList.remove('hidden');

            // Hide success message after a few seconds
            setTimeout(() => {
                successMessageDiv.classList.add('hidden');
            }, 5000);
        }
    });
}