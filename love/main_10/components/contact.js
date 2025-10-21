// components/contact.js
function Contact() {
    return `
        <div class="contact">
            <h2>Contact Us</h2>
            <form id="contactForm">
                <label for="name">Name:</label>
                <input type="text" id="contactName" name="name" required>
                <label for="email">Email:</label>
                <input type="email" id="contactEmail" name="email" required>
                <label for="message">Message:</label>
                <textarea id="contactMessage" name="message" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;
}

export default Contact;