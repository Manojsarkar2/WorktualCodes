import { products, categories } from '../data/products.js';

export const ProductList = (params) => {
    const categoryFilter = params.get('category');
    const filteredProducts = categoryFilter
        ? products.filter(p => p.category === categoryFilter)
        : products;

    return `
        <h1 class="mb-20">${categoryFilter ? categoryFilter : 'All'} Products</h1>
        <div class="category-filter mb-20">
            <h3>Filter by Category:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                <button onclick="window.router.navigate('/products')" class="${!categoryFilter ? 'active' : ''}">All</button>
                ${categories.map(cat => `
                    <button onclick="window.router.navigate('/products?category=${encodeURIComponent(cat.name)}')" class="${categoryFilter === cat.name ? 'active' : ''}">${cat.name}</button>
                `).join('')}
            </div>
        </div>
        <div class="product-grid">
            ${filteredProducts.length > 0 ? filteredProducts.map(product => `
                <a href="/product/${product.id}" class="product-card" data-link>
                    <div class="product-card-content">
                        <h3>${product.name}</h3>
                        <p>${product.description.substring(0, 80)}...</p>
                        <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
                        <button onclick="event.preventDefault(); window.appState.addToCart('${product.id}')">Add to Cart</button>
                    </div>
                </a>
            `).join('') : '<p class="text-center">No products found in this category.</p>'}
        </div>
    `;
};