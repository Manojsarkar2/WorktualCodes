import { render as renderProductCard } from '../components/ProductCard.js';

export function render(state) {
    const featuredProducts = state.products.slice(0, 4);

    return `
        <div class="container">
            <section class="hero">
                <h1>Welcome to ShopSphere</h1>
                <p>Your one-stop shop for everything you need. Inspired by the best.</p>
                <a href="#/products" class="cta-button">Shop Now</a>
            </section>
            <section class="featured-products">
                <h2>Featured Products</h2>
                <div class="product-grid">
                    ${featuredProducts.map(product => renderProductCard(product)).join('')}
                </div>
            </section>
        </div>
    `;
}