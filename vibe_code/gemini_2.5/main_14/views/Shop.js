import ProductCard from '../components/ProductCard.js';

const Shop = {
    render: async ({ products, activeFilter }) => {
        const categories = ['all', 'bouquets', 'arrangements', 'plants'];
        return `
            <section class="shop-header">
                <h1>Our Collection</h1>
                <p>Find the perfect floral expression for any moment.</p>
            </section>
            <div class="container">
                <div class="filters">
                    ${categories.map(cat => `
                        <button class="filter-btn ${activeFilter === cat ? 'active' : ''}" data-category="${cat}">
                            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    `).join('')}
                </div>
                <div class="product-grid">
                    ${products.length > 0 ? products.map(product => ProductCard.render(product)).join('\n') : '<p>No products found in this category.</p>'}
                </div>
            </div>
        `;
    },
    after_render: ({ updateCart, filterProducts }) => {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                updateCart(productId, 1);
            });
        });

        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                filterProducts(category);
            });
        });
    }
};

export default Shop;
