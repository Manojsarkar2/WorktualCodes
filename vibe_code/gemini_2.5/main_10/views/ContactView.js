import { ContactForm } from '../components/Forms.js';

export const ContactView = (onSubmit) => {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact-view container';
    contactDiv.setAttribute('aria-labelledby', 'contact-page-heading');

    contactDiv.innerHTML = `
        <h2 id="contact-page-heading">Contact Us</h2>
        <p class="text-center" style="margin-bottom: 25px; color: var(--text-light);">Have a question or feedback? We'd love to hear from you!</p>
        <div id="contact-form-container"></div>
        <div class="contact-info" style="margin-top: 40px; text-align: center; color: var(--text-dark);">
            <h3>Our Contact Details</h3>
            <p>Email: <a href="mailto:support@flipkartclone.com">support@flipkartclone.com</a></p>
            <p>Phone: <a href="tel:+9118002029898">1800 202 9898</a> (Toll-Free)</p>
            <p>Address: Flipkart Internet Private Limited, Bengaluru, Karnataka, India</p>
        </div>
    `;

    const formContainer = contactDiv.querySelector('#contact-form-container');
    formContainer.appendChild(ContactForm(onSubmit));

    return contactDiv;
};
