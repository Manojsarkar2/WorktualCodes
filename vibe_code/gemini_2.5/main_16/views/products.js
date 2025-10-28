import { renderProductCard } from '../components/productCard.js';
import { products } from '../data/products.js';

export const renderProductsPage = (container) => {
    container.innerHTML = `
        <h1 class="mb-4">All Products</h1>
        <div class="product-filters mb-4">
            <input type="text" id="product-search" class="form-control" placeholder="Search products..." />
        </div>
        <div class="product-grid" id="products-list"></div>
    `;

    const productsListContainer = container.querySelector('#products-list');
    const searchInput = container.querySelector('#product-search');

    const displayProducts = (filteredProducts) => {
        productsListContainer.innerHTML = '';
        if (filteredProducts.length === 0) {
            productsListContainer.innerHTML = '<p class="text-center">No products found matching your criteria.</p>';
            return;
        }
        filteredProducts.forEach(product => {
            productsListContainer.appendChild(renderProductCard(product));
        });
    };

    // Initial display
    displayProducts(products);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
    });
};
