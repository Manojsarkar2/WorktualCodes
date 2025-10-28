import { products } from '../data/products.js';

export const renderProductsPage = () => {
    const productListHTML = products.map(product => `
        <div class="product-card">
            <div class="product-card-placeholder">Product ID: ${product.id}</div>
            <h3><a href="/product/${product.id}">${product.name}</a></h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');

    return `
        <h1 class="page-title">Our Products</h1>
        <div class="home-product-grid">
            ${productListHTML}
        </div>
    `;
};
