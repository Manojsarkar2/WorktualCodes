export function renderContact() {
    return `
        <section class="form-container">
            <h1>Contact Us</h1>
            <p class="text-center" style="margin-bottom: 25px; color: var(--light-text-color);">Have a question or need assistance? Fill out the form below and we'll get back to you.</p>
            <form id="contact-form">
                <div class="form-group">
                    <label for="contactName">Your Name</label>
                    <input type="text" id="contactName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="contactEmail">Your Email</label>
                    <input type="email" id="contactEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="contactMessage">Message</label>
                    <textarea id="contactMessage" name="message" rows="6" required></textarea>
                </div>
                <button type="submit" class="primary">Send Message</button>
            </form>
            <div class="text-center" style="margin-top: 40px;">
                <h2>Our Location</h2>
                <p>123 E-Shop Avenue, Suite 100, Tech City, 12345</p>
                <p>Email: support@eshop.com</p>
                <p>Phone: (123) 456-7890</p>
                <div style="height: 200px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-top: 20px; color: var(--light-text-color);">
                    Map Placeholder
                </div>
            </div>
        </section>
    `;
}
