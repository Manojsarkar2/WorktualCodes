import { ProductCard } from '../components/ProductCard.js';

export const ProductsView = (allProducts, onAddToCart) => {
    const productsDiv = document.createElement('div');
    productsDiv.className = 'products-view container';

    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const initialCategory = urlParams.get('category') || 'All';
    const initialSearchTerm = urlParams.get('search') || '';

    let currentProducts = allProducts;

    const renderProducts = (productsToRender) => {
        productGrid.innerHTML = '';
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;">No products found matching your criteria.</p>';
            return;
        }
        productsToRender.forEach(product => {
            productGrid.appendChild(ProductCard(product, onAddToCart));
        });
    };

    const filterAndSortProducts = () => {
        const categoryFilter = categorySelect.value;
        const searchTerm = searchInput.value.toLowerCase();
        const sortBy = sortSelect.value;

        let filtered = allProducts;

        if (categoryFilter !== 'All') {
            filtered = filtered.filter(p => p.category === categoryFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        currentProducts = filtered;
        renderProducts(currentProducts);
    };

    // Sidebar for filters
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <h3>Filters</h3>
        <div class="filter-group">
            <label for="category-filter">Category:</label>
            <select id="category-filter" aria-label="Filter by category">
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Furniture">Home & Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Beauty, Toys & More">Beauty, Toys & More</option>
                <option value="Grocery">Grocery</option>
                <option value="Travel">Travel</option>
                <option value="Two Wheelers">Two Wheelers</option>
            </select>
        </div>
        <!-- Add more filters like price range, brand etc. here -->
    `;
    const categorySelect = sidebar.querySelector('#category-filter');
    categorySelect.value = initialCategory;
    categorySelect.addEventListener('change', filterAndSortProducts);
    productsDiv.appendChild(sidebar);

    // Main products content
    const mainContent = document.createElement('div');
    mainContent.className = 'main-products-content';

    const productHeader = document.createElement('div');
    productHeader.className = 'product-header';
    productHeader.innerHTML = `
        <h2 id="products-page-heading">All Products</h2>
        <div class="search-and-sort">
            <div class="search-bar-inline">
                <input type="text" id="product-search" placeholder="Search products..." value="${initialSearchTerm}" aria-label="Search products on this page">
                <button id="search-button" aria-label="Apply search">🔍</button>
            </div>
            <div class="sort-options">
                <label for="sort-by">Sort By:</label>
                <select id="sort-by" aria-label="Sort products by">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="rating-desc">Rating</option>
                </select>
            </div>
        </div>
    `;
    const searchInput = productHeader.querySelector('#product-search');
    const searchButton = productHeader.querySelector('#search-button');
    const sortSelect = productHeader.querySelector('#sort-by');

    searchInput.addEventListener('input', filterAndSortProducts);
    searchButton.addEventListener('click', filterAndSortProducts);
    sortSelect.addEventListener('change', filterAndSortProducts);

    mainContent.appendChild(productHeader);

    const productGrid = document.createElement('div');
    productGrid.className = 'product-grid';
    productGrid.setAttribute('aria-live', 'polite');
    mainContent.appendChild(productGrid);

    productsDiv.appendChild(mainContent);

    // Initial render
    filterAndSortProducts();

    return productsDiv;
};
