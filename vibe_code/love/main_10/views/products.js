import { products } from '../data/products.js';
import { generateProductCardHTML, initProductCardListeners } from '../components/productCard.js';
import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for the Products page.
 * @param {string} [categoryFilter=''] - Optional category to filter products by.
 * @param {string} [searchQuery=''] - Optional search query to filter products by name/description.
 * @returns {string} The HTML string for the Products page.
 */
export function getProductsPageHTML(categoryFilter = '', searchQuery = '') {
    let filteredProducts = products;

    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(lowerCaseQuery) || 
            product.description.toLowerCase().includes(lowerCaseQuery)
        );
    }

    const productCardsHTML = filteredProducts.length > 0
        ? filteredProducts.map(product => generateProductCardHTML(product)).join('')
        : '<p class="text-center">No products found matching your criteria.</p>';

    const categories = [...new Set(products.map(p => p.category))];
    const categoryFiltersHTML = categories.map(cat => `
        <button class="btn btn-secondary category-filter-btn ${categoryFilter.toLowerCase() === cat.toLowerCase() ? 'active' : ''}" data-category="${cat}">${cat}</button>
    `).join('');

    return `
        <div class="products-page container">
            <h1>All Products</h1>
            <div class="product-filters">
                <div class="search-bar form-group">
                    <input type="text" id="product-search" placeholder="Search products..." value="${searchQuery}" aria-label="Search products">
                    <button class="btn btn-primary" id="search-btn">Search</button>
                </div>
                <div class="category-filters">
                    <button class="btn btn-secondary category-filter-btn ${!categoryFilter ? 'active' : ''}" data-category="">All Categories</button>
                    ${categoryFiltersHTML}
                </div>
            </div>
            <div class="product-grid" id="product-list">
                ${productCardsHTML}
            </div>
        </div>
    `;
}

/**
 * Initializes any interactive components on the Products page.
 * @param {string} [categoryFilter=''] - The current category filter.
 * @param {string} [searchQuery=''] - The current search query.
 */
export function initProductsPage(categoryFilter = '', searchQuery = '') {
    const productListContainer = getElement('#product-list');
    if (productListContainer) {
        initProductCardListeners(productListContainer);
    }

    const productSearchInput = getElement('#product-search');
    const searchButton = getElement('#search-btn');
    const categoryFilterButtons = document.querySelectorAll('.category-filter-btn');

    const applyFilters = () => {
        const currentSearchQuery = productSearchInput ? productSearchInput.value : '';
        const currentCategoryFilter = document.querySelector('.category-filter-btn.active')?.dataset.category || '';
        // Re-render the page with new filters without pushing to history
        window.navigateTo(`/products?category=${encodeURIComponent(currentCategoryFilter)}&search=${encodeURIComponent(currentSearchQuery)}`, false);
    };

    if (searchButton) {
        searchButton.addEventListener('click', applyFilters);
    }

    if (productSearchInput) {
        productSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }

    categoryFilterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            applyFilters();
        });
    });

    // Set initial active state for category buttons
    if (categoryFilter) {
        document.querySelector(`.category-filter-btn[data-category="${categoryFilter}"]`)?.classList.add('active');
    } else {
        document.querySelector(`.category-filter-btn[data-category=""]`)?.classList.add('active');
    }
}