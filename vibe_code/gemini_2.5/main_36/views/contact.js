export const Contact = () => `
    <div class="contact-form-container">
        <h2>Contact Us</h2>
        <p class="text-center mb-20">Have questions or feedback? We'd love to hear from you!</p>
        <form id="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required>

            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="6" required></textarea>

            <button type="submit">Send Message</button>
        </form>

        <div class="contact-info mt-30">
            <h3>Our Office</h3>
            <p>Flipkart Internet Private Limited</p>
            <p>Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
            <p>Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India.</p>
            <p>Email: <a href="mailto:support@flipkart.com">support@flipkart.com</a></p>
            <p>Phone: <a href="tel:+9118002029898">1800 202 9898</a></p>
        </div>
    </div>
`;