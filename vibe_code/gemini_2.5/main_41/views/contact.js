export const getContactHTML = () => `
    <section class="page-section">
        <h1>Contact The Arcane Archives</h1>
        <p>We'd love to hear from you! Whether you have a question about our collection, need assistance, or just want to share your favorite fantasy novel, feel free to reach out.</p>

        <h2>Our Location</h2>
        <p><strong>The Arcane Archives</strong><br>
        1337 Eldoria Lane<br>
        Mystic Falls, Fantasia 90210<br>
        Realm of Imagination</p>

        <h2>Get in Touch</h2>
        <p><strong>Email:</strong> <a href="mailto:info@arcanearchives.com">info@arcanearchives.com</a></p>
        <p><strong>Phone:</strong> +1 (555) BOOK-LORE (2665-5673)</p>
        <p><strong>Operating Hours:</strong><br>
        Monday - Friday: 9:00 AM - 7:00 PM (GMT+0)<br>
        Saturday: 10:00 AM - 6:00 PM (GMT+0)<br>
        Sunday: Closed for magical research</p>

        <h2>Send Us a Message</h2>
        <form class="contact-form" onsubmit="alert('Thank you for your message! We will get back to you soon.'); return false;">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject">

            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>

            <button type="submit">Send Message</button>
        </form>

        <h2>Connect With Us</h2>
        <p>Follow us on our enchanted social media channels for updates, new arrivals, and literary discussions:</p>
        <ul>
            <li><a href="https://twitter.com/arcanearchives" target="_blank" rel="noopener noreferrer">Twitter (X)</a></li>
            <li><a href="https://facebook.com/arcanearchives" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com/arcanearchives" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
    </section>
`;