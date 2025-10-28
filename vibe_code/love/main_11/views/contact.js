export const getContactPageContent = async () => {
    return `
        <section class="hero-section text-center">
            <h1>Contact Us</h1>
            <p class="lead">Have questions or feedback? We'd love to hear from you!</p>
        </section>

        <section class="contact-form-section">
            <div class="modal-content" style="position: static; margin: 2rem auto; animation: none;">
                <h2>Send us a Message</h2>
                <form id="contact-form">
                    <div class="form-group">
                        <label for="contact-name">Your Name:</label>
                        <input type="text" id="contact-name" name="name" required aria-required="true">
                        <div class="error-message" id="contact-name-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="contact-email">Your Email:</label>
                        <input type="email" id="contact-email" name="email" required aria-required="true">
                        <div class="error-message" id="contact-email-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="contact-subject">Subject:</label>
                        <input type="text" id="contact-subject" name="subject" required aria-required="true">
                        <div class="error-message" id="contact-subject-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Message:</label>
                        <textarea id="contact-message" name="message" required aria-required="true"></textarea>
                        <div class="error-message" id="contact-message-error"></div>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        </section>

        <section class="contact-info-section text-center">
            <h2>Other Ways to Connect</h2>
            <p><strong>Email:</strong> support@clashofclansfan.com</p>
            <p><strong>Community Forums:</strong> <a href="#">Visit our Forums</a></p>
            <p><strong>Social Media:</strong> Follow us on <a href="#">Facebook</a>, <a href="#">Twitter</a>, <a href="#">YouTube</a></p>
        </section>
    `;
};
