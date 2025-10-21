import { appState, getProducts } from '../script.js';
import { renderProductCard } from '../components/productCard.js';

export const renderProducts = async (targetElement) => {
    const allProducts = await getProducts();

    targetElement.innerHTML = `
        <div class="products-page container">
            <div class="products-header">
                <h1>All Products</h1>
                <div class="filter-sort-controls">
                    <input type="text" id="search-input" placeholder="Search products..." value="${appState.searchQuery}">
                    <select id="sort-select">
                        <option value="default" ${appState.sortOrder === 'default' ? 'selected' : ''}>Sort by</option>
                        <option value="price-asc" ${appState.sortOrder === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                        <option value="price-desc" ${appState.sortOrder === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                        <option value="name-asc" ${appState.sortOrder === 'name-asc' ? 'selected' : ''}>Name: A-Z</option>
                        <option value="name-desc" ${appState.sortOrder === 'name-desc' ? 'selected' : ''}>Name: Z-A</option>
                    </select>
                </div>
            </div>
            <div id="product-listing" class="product-grid"></div>
        </div>
    `;

    const productListingElement = document.getElementById('product-listing');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');

    const filterAndSortProducts = () => {
        let filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(appState.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(appState.searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(appState.searchQuery.toLowerCase())
        );

        switch (appState.sortOrder) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // No specific sort, maybe by ID or original order
                break;
        }

        productListingElement.innerHTML = '';
        if (filteredProducts.length === 0) {
            productListingElement.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No products found matching your criteria.</p>';
        } else {
            filteredProducts.forEach(product => {
                productListingElement.appendChild(renderProductCard(product));
            });
        }

        // Lazy load images (placeholders in this case)
        const lazyLoadPlaceholders = document.querySelectorAll('.product-card-image-placeholder');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('lazy-loaded'); // Simulate loading
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        lazyLoadPlaceholders.forEach(placeholder => observer.observe(placeholder));
    };

    searchInput.addEventListener('input', (e) => {
        appState.searchQuery = e.target.value;
        filterAndSortProducts();
    });

    sortSelect.addEventListener('change', (e) => {
        appState.sortOrder = e.target.value;
        filterAndSortProducts();
    });

    filterAndSortProducts(); // Initial render
};
