import { products, categories } from '../data/products.js';

export const Home = () => {
    const featuredProducts = products.slice(0, 4); // Get first 4 products

    return `
        <section class="hero-section">
            <h1>Welcome to Flipkart!</h1>
            <p>Your one-stop shop for electronics, fashion, home essentials, and more.</p>
            <button onclick="window.router.navigate('/products')">Shop Now</button>
        </section>

        <section class="mb-20">
            <h2>Top Categories</h2>
            <div class="category-grid">
                ${categories.map(category => `
                    <a href="/products?category=${encodeURIComponent(category.name)}" class="category-item card" data-link>
                        <h3>${category.name}</h3>
                        <p>${category.description}</p>
                    </a>
                `).join('')}
            </div>
        </section>

        <section>
            <h2>Featured Products</h2>
            <div class="product-grid">
                ${featuredProducts.map(product => `
                    <a href="/product/${product.id}" class="product-card" data-link>
                        <div class="product-card-content">
                            <h3>${product.name}</h3>
                            <p>${product.description.substring(0, 80)}...</p>
                            <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
                            <button onclick="event.preventDefault(); window.appState.addToCart('${product.id}')">Add to Cart</button>
                        </div>
                    </a>
                `).join('')}
            </div>
        </section>
    `;
};