export function getContactView() {
    return `
        <div class="container">
            <h1>Contact Us</h1>
            <p>Have questions or feedback? We'd love to hear from you!</p>
            <div style="background-color: var(--card-bg); padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px var(--shadow); margin-top: 30px;">
                <h2>Get in Touch</h2>
                <p><strong>Email:</strong> support@amazonlike.com</p>
                <p><strong>Phone:</strong> +1 (800) 123-4567</p>
                <p><strong>Address:</strong> 123 E-commerce Lane, Online City, OL 98765</p>

                <h3 style="margin-top: 25px;">Send us a Message</h3>
                <form style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
                    <input type="text" placeholder="Your Name" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; background-color: var(--bg-color); color: var(--text-color);">
                    <input type="email" placeholder="Your Email" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; background-color: var(--bg-color); color: var(--text-color);">
                    <textarea placeholder="Your Message" rows="5" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; background-color: var(--bg-color); color: var(--text-color);"></textarea>
                    <button type="submit" onclick="event.preventDefault(); alert('Message sent! (This is a demo, no actual sending)');">Send Message</button>
                </form>
            </div>
        </div>
    `;
}
