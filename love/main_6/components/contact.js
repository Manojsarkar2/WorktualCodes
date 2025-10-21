const Contact = {
    render: () => {
        return `
            <div class="container" id="contact">
                <h2>Contact Us</h2>
                <form id="contact-form">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        `;
    },
    afterRender: () => {
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Store in localStorage (for demonstration purposes)
            const contactData = {
                name: name,
                email: email,
                message: message
            };
            localStorage.setItem('contactFormData', JSON.stringify(contactData));

            alert('Message sent! (Data stored in localStorage)');
            document.getElementById('contact-form').reset();
        });
    }
};
