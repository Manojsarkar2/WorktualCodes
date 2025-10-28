import { products } from '../data/products.js';

export function renderHome() {
    const featuredProducts = products.slice(0, 3); // Get first 3 products as featured

    return `
        <section class="hero-section">
            <h1>Discover Your Next Favorite Item</h1>
            <p>Explore our curated collection of high-quality products, from electronics to home essentials. Shop with confidence and convenience.</p>
            <button class="primary nav-link" onclick="window.app.navigateTo('/products')">Shop Now</button>
        </section>

        <section class="featured-products">
            <h2>Featured Products</h2>
            <div class="product-grid featured-products-grid">
                ${featuredProducts.map(product => `
                    <div class="product-card" data-product-id="${product.id}">
                        <h3>${product.name}</h3>
                        <p class="description">${product.description.substring(0, 100)}...</p>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <button class="accent add-to-cart-btn" 
                                data-product-id="${product.id}" 
                                data-product-name="${product.name}" 
                                data-product-price="${product.price}">
                            Add to Cart
                        </button>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="text-center" style="padding: 60px 0;">
            <h2>Why Choose E-Shop?</h2>
            <div style="display: flex; justify-content: center; gap: 30px; margin-top: 30px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 250px; max-width: 300px; padding: 20px; background-color: var(--white); border-radius: 8px; box-shadow: 0 2px 4px var(--shadow-light);">
                    <h3>Fast Shipping</h3>
                    <p>Get your orders delivered quickly and efficiently right to your doorstep.</p>
                </div>
                <div style="flex: 1; min-width: 250px; max-width: 300px; padding: 20px; background-color: var(--white); border-radius: 8px; box-shadow: 0 2px 4px var(--shadow-light);">
                    <h3>Quality Products</h3>
                    <p>We handpick every item to ensure the highest quality and customer satisfaction.</p>
                </div>
                <div style="flex: 1; min-width: 250px; max-width: 300px; padding: 20px; background-color: var(--white); border-radius: 8px; box-shadow: 0 2px 4px var(--shadow-light);">
                    <h3>Secure Payments</h3>
                    <p>Shop with peace of mind using our secure and encrypted payment gateways.</p>
                </div>
            </div>
        </section>
    `;
}
