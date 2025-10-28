class ContactSection {
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

    async render() {
        return `
            <section class="contact section" id="contact">
                <div class="container">
                    <div class="contact__info">
                        <h2 class="section-title">Contact Us</h2>
                        <p class="section-subtitle">Connect with Us: Let's Discuss Your Digital Marketing Needs</p>
                    </div>
                    <div class="contact__form-container">
                        <form id="contact-form" class="contact__form">
                            <div class="form-group">
                                <input type="radio" id="say-hi" name="reason" value="say-hi" checked>
                                <label for="say-hi">Say Hi</label>
                                <input type="radio" id="get-quote" name="reason" value="get-quote">
                                <label for="get-quote">Get a Quote</label>
                            </div>
                            <div class="form-group">
                                <label for="name" class="sr-only">Name</label>
                                <input type="text" id="name" name="name" placeholder="Name" required>
                            </div>
                            <div class="form-group">
                                <label for="email" class="sr-only">Email</label>
                                <input type="email" id="email" name="email" placeholder="Email" required>
                            </div>
                            <div class="form-group">
                                <label for="message" class="sr-only">Message</label>
                                <textarea id="message" name="message" placeholder="Message" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-green">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
}

export default new ContactSection();
