export function render() {
    return `
        <div class="container">
            <form id="contact-form" class="contact-form">
                <h2>Contact Us</h2>
                <p>Have a question? Fill out the form below and we'll get back to you.</p>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="6" required></textarea>
                </div>
                <button type="submit" class="cta-button">Send Message</button>
            </form>
        </div>
    `;
}