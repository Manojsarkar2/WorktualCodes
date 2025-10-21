export const renderContact = (targetElement) => {
    targetElement.innerHTML = `
        <div class="contact-page container">
            <div class="contact-form-container">
                <h1>Contact Us</h1>
                <p>Have a question or feedback? We'd love to hear from you!</p>
                <form id="contact-form">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required aria-required="true">
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required aria-required="true">
                    </div>
                    <div class="form-group">
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" rows="6" required aria-required="true"></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    `;
};
