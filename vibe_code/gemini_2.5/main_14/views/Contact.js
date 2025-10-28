const Contact = {
    render: async () => {
        return `
            <div class="container" style="max-width: 700px; margin: 2rem auto;">
                <h1 style="text-align: center;">Get In Touch</h1>
                <p style="text-align: center; margin-bottom: 2rem;">Have a question or a special request? We'd love to hear from you.</p>
                <form id="contact-form">
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
                    <button type="submit" class="btn" style="width: 100%;">Send Message</button>
                </form>
                <div id="form-status" style="text-align: center; margin-top: 1rem;"></div>
            </div>
        `;
    },
    after_render: () => {
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = 'Thank you for your message! We will get back to you shortly.';
            formStatus.style.color = 'green';
            form.reset();
        });
    }
};

export default Contact;
