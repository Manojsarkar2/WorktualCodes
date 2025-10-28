import { products } from '../data/products.js';

export function renderProducts() {
    return `
        <section class="products-page">
            <h1 class="text-center">Our Products</h1>
            <div class="product-grid">
                ${products.map(product => `
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
    `;
}
