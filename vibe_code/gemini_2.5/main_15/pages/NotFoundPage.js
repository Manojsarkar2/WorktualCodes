import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

class NotFoundPage {
    async render() {
        const header = new Header();
        const footer = new Footer();
        return `
            ${await header.render()}
            <main class="container" style="padding: 150px 20px; text-align: center; min-height: 50vh;">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <a href="/" data-link class="btn btn-primary" style="margin-top: 20px;">Go Home</a>
            </main>
            ${await footer.render()}
        `;
    }
    async after_render() {
        new Header().after_render();
    }
}

export default NotFoundPage;
