import ProductCard from '../components/ProductCard.js';

const Home = {
    render: async ({ products }) => {
        // Get first 4 products for the featured section
        const featuredProducts = products.slice(0, 4);
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1>Artfully Crafted Bouquets</h1>
                    <p>Experience the beauty of fresh, handcrafted floral arrangements for every occasion.</p>
                    <a href="#/shop" class="btn">Shop All Flowers</a>
                </div>
            </section>
            <section class="featured-products container">
                <h2>Featured Arrangements</h2>
                <div class="product-grid">
                    ${featuredProducts.map(product => ProductCard.render(product)).join('\n')}
                </div>
            </section>
        `;
    },
    after_render: ({ updateCart }) => {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                updateCart(productId, 1);
            });
        });
    }
};

export default Home;
