export const renderContactView = (container) => {
    container.innerHTML = `
        <div class="container contact-page">
            <h1>Contact Us</h1>
            <div class="contact-form-container">
                <p>Have a question or feedback? We'd love to hear from you!</p>
                <form class="contact-form" id="contact-form">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Your Email</label>
                    <input type="email" id="email" name="email" required>

                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required>

                    <label for="message">Message</label>
                    <textarea id="message" name="message" required></textarea>

                    <button type="submit">Send Message</button>
                    <p id="contact-form-message" class="form-message"></p>
                </form>
            </div>
        </div>
    `;

    const contactForm = container.querySelector('#contact-form');
    const formMessage = container.querySelector('#contact-form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        const name = contactForm.elements.name.value.trim();
        const email = contactForm.elements.email.value.trim();
        const subject = contactForm.elements.subject.value.trim();
        const message = contactForm.elements.message.value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'All fields are required.';
            formMessage.classList.add('error');
            return;
        }

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.classList.add('error');
            return;
        }

        // Simulate sending data
        console.log('Contact Form Submitted:', { name, email, subject, message });
        formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        formMessage.classList.add('success');
        contactForm.reset();
    });
};
