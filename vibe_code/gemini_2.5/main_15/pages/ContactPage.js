import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Contact from '../components/Contact.js';

class ContactPage {
    async render() {
        const header = new Header();
        const contact = new Contact();
        const footer = new Footer();
        return `
            ${await header.render()}
            <main style="padding-top: 80px;">
                ${await contact.render()}
            </main>
            ${await footer.render()}
        `;
    }
    async after_render() {
        new Header().after_render();
        new Contact().after_render();
    }
}

export default ContactPage;
