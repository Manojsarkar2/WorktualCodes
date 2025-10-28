class Contact {
    async render() {
        return `
            <section class="contact-section" id="contact">
                <div class="container contact-container">
                    <div class="contact-content">
                        <div class="section-header" style="flex-direction: column; align-items: flex-start; text-align: left;">
                            <h2>Contact Us</h2>
                            <p>Connect with Us: Let's Discuss Your Digital Marketing Needs</p>
                        </div>
                    </div>
                    <div class="contact-form-wrapper">
                        <form class="contact-form" id="contact-form">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Email" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" placeholder="Message" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }

    after_render() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                console.log('Form submitted:', data);
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            });
        }
    }
}
export default Contact;
