export const renderContact = (element) => {
    element.innerHTML = `
        <section class="page-section container">
            <h2>Contact Us</h2>
            <p>Have questions, feedback, or suggestions? Feel free to reach out to us using the form below.</p>
            <form id="contact-form" class="contact-form">
                <div class="form-group">
                    <label for="name">Your Name:</label>
                    <input type="text" id="name" name="name" required aria-required="true">
                    <div class="error-message" id="name-error"></div>
                </div>
                <div class="form-group">
                    <label for="email">Your Email:</label>
                    <input type="email" id="email" name="email" required aria-required="true">
                    <div class="error-message" id="email-error"></div>
                </div>
                <div class="form-group">
                    <label for="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" required aria-required="true">
                    <div class="error-message" id="subject-error"></div>
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="6" required aria-required="true"></textarea>
                    <div class="error-message" id="message-error"></div>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </section>
    `;

    const form = element.querySelector('#contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateContactForm(form)) {
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        }
    });
};

const validateContactForm = (form) => {
    let isValid = true;

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const subjectInput = form.querySelector('#subject');
    const messageInput = form.querySelector('#message');

    const nameError = form.querySelector('#name-error');
    const emailError = form.querySelector('#email-error');
    const subjectError = form.querySelector('#subject-error');
    const messageError = form.querySelector('#message-error');

    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';

    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    }

    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailInput.value)) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
    }

    if (subjectInput.value.trim() === '') {
        subjectError.textContent = 'Subject is required.';
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        isValid = false;
    }

    return isValid;
};
