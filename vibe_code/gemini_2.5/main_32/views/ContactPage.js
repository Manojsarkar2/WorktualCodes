export const renderContactPage = () => {
    return `
        <h1 class="page-title">Contact Us</h1>
        <section class="contact-form">
            <h2>Send us a message</h2>
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="subject">Subject:</label>
                <input type="text" id="subject" name="subject">

                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Submit Message</button>
            </form>
        </section>
        <section class="contact-info">
            <h2>Our Information</h2>
            <p><strong>Address:</strong> 123 E-commerce Street, Online City, OC 12345</p>
            <p><strong>Phone:</strong> +1 (800) 123-4567</p>
            <p><strong>Email:</strong> support@amazonlikestore.com</p>
            <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (PST)</p>
        </section>
    `;
};
