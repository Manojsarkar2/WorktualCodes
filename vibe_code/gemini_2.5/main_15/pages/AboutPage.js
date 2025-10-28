import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

class AboutPage {
    async render() {
        const header = new Header();
        const footer = new Footer();
        return `
            ${await header.render()}
            <main class="container" style="padding: 150px 20px; text-align: center; min-height: 50vh;">
                <h1>About Us</h1>
                <p>This is a placeholder page for 'About Us'.</p>
                <a href="/" data-link class="btn btn-primary" style="margin-top: 20px;">Go Home</a>
            </main>
            ${await footer.render()}
        `;
    }
    async after_render() {
        new Header().after_render();
    }
}

export default AboutPage;
