import { ProductCard } from '../components/productCard.js';
import { products } from '../data/products.js';
import { initRouter } from '../utils/router.js';

export const renderProducts = () => {
    return `
        <section class="container section-padding">
            <h1 class="section-heading">Our Toy Collection</h1>
            <div class="products-filter-bar">
                <input type="text" id="product-search" placeholder="Search toys..." aria-label="Search products">
                <select id="product-category-filter" aria-label="Filter by category">
                    <option value="all">All Categories</option>
                    <option value="action-figures">Action Figures</option>
                    <option value="building-blocks">Building Blocks</option>
                    <option value="dolls-plush">Dolls & Plush</option>
                    <option value="board-games">Board Games</option>
                    <option value="outdoor-play">Outdoor Play</option>
                    <option value="educational-toys">Educational Toys</option>
                    <option value="puzzles">Puzzles</option>
                    <option value="vehicles">Vehicles</option>
                </select>
                <select id="product-sort" aria-label="Sort products">
                    <option value="default">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                </select>
            </div>
            <div id="product-list" class="grid-3-cols">
                <!-- Products will be rendered here by JavaScript -->
            </div>
            <p id="no-products-message" style="display: none; text-align: center; margin-top: 2em;">No products found matching your criteria.</p>
        </section>
    `;
};

export const setupProductPage = () => {
    const productListDiv = document.getElementById('product-list');
    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('product-category-filter');
    const sortSelect = document.getElementById('product-sort');
    const noProductsMessage = document.getElementById('no-products-message');
    const router = initRouter();

    let currentProducts = [...products];

    const renderProductList = (filteredAndSortedProducts) => {
        if (filteredAndSortedProducts.length === 0) {
            productListDiv.innerHTML = '';
            noProductsMessage.style.display = 'block';
        } else {
            productListDiv.innerHTML = filteredAndSortedProducts.map(product => ProductCard(product)).join('');
            noProductsMessage.style.display = 'none';
        }
    };

    const applyFiltersAndSort = () => {
        let filtered = [...products];

        // Apply search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Apply sorting
        const sortBy = sortSelect.value;
        if (sortBy === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'name-desc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        currentProducts = filtered;
        renderProductList(currentProducts);
    };

    // Event Listeners
    searchInput.addEventListener('input', applyFiltersAndSort);
    categoryFilter.addEventListener('change', applyFiltersAndSort);
    sortSelect.addEventListener('change', applyFiltersAndSort);

    // Initial render based on URL query params (e.g., from category links on home page)
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category');
    const initialSearch = urlParams.get('search');

    if (initialCategory) {
        categoryFilter.value = initialCategory;
    }
    if (initialSearch) {
        searchInput.value = initialSearch;
    }

    applyFiltersAndSort();
};
