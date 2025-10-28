export const renderContact = (container) => {
    container.innerHTML = `
        <div class="page-content">
            <h1>Contact Us</h1>
            <p>Have questions or need assistance? Reach out to us!</p>
            
            <div class="contact-info" style="margin-bottom: 30px;">
                <h3>Our Office</h3>
                <p>Flipkart Internet Private Limited,<br> Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br> Outer Ring Road, Devarabeesanahalli Village,<br> Bengaluru, 560103,<br> Karnataka, India</p>
                <p><strong>Phone:</strong> <a href="tel:044-45614700">044-45614700</a></p>
                <p><strong>Email:</strong> <a href="mailto:support@flipkart.com">support@flipkart.com</a></p>
            </div>

            <div class="contact-form">
                <h3>Send us a message</h3>
                <form onsubmit="event.preventDefault(); alert('Message sent! (This is a demo, no actual submission)'); this.reset();">
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
            </div>
        </div>
    `;
};
