import { Header, updateActiveNav } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

export const AboutView = {
    render: (container) => {
        updateActiveNav('/about');
        container.innerHTML = `
            ${Header()}
            <main class="container section-padding">
                <h1 class="text-center">About Furni.</h1>
                <p class="text-center" style="margin-bottom: var(--spacing-xl);">We are passionate about bringing modern elegance to your home.</p>
                <div style="max-width: 800px; margin: 0 auto; line-height: 1.8;">
                    <p>At Furni., we believe that your home should be a reflection of your unique style and personality. Founded in 2023, our mission has been to curate a collection of high-quality, modern interior decor that combines aesthetic appeal with functional design.</p>
                    <p>Our team meticulously selects each piece, ensuring it meets our standards for craftsmanship, sustainability, and timeless beauty. From minimalist furniture to statement accessories, we offer a diverse range of products to help you create spaces that inspire and comfort.</p>
                    <p>We are committed to providing an exceptional shopping experience, from easy navigation on our website to reliable delivery and dedicated customer support. Join the Furni. family and transform your living spaces into havens of modern design.</p>
                </div>
            </main>
            ${Footer()}
        `;
    }
};
