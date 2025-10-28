export const Contact = () => {
  const view = `
    <section class="contact-page">
      <h1 class="page-title">Contact Us</h1>
      <p>Have a question or feedback? Fill out the form below to get in touch with us.</p>
      <form id="contact-form" class="contact-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" required>
          <div class="error-message"></div>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" required>
          <div class="error-message"></div>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="6" required></textarea>
          <div class="error-message"></div>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
      </form>
      <div id="form-success-message" class="success-message" style="display: none;">
        Thank you for your message! We'll get back to you soon.
      </div>
    </section>
  `;
  return view;
};