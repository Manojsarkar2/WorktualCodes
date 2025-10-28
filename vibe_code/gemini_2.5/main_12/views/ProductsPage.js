import { render as renderProductCard } from '../components/ProductCard.js';

export function render(state, params) {
    const allProducts = state.products;
    const searchTerm = params.get('q') || '';
    const category = params.get('category') || 'all';
    const page = parseInt(params.get('page') || '1', 10);
    const itemsPerPage = 8;

    // Filtering
    let filteredProducts = allProducts;
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const categories = ['all', ...new Set(allProducts.map(p => p.category))];

    const paginationHtml = `
        <div class="pagination">
            <button ${page <= 1 ? 'disabled' : ''} onclick="location.hash='#/products?page=${page - 1}'">Previous</button>
            <span>Page ${page} of ${totalPages}</span>
            <button ${page >= totalPages ? 'disabled' : ''} onclick="location.hash='#/products?page=${page + 1}'">Next</button>
        </div>
    `;

    return `
        <div class="container">
            <div class="products-header">
                <h1>Our Products</h1>
                <div class="filters">
                    <input type="search" id="search-box" placeholder="Search products..." value="${searchTerm}" onchange="location.hash='#/products?q=' + this.value">
                    <select id="category-filter" onchange="location.hash='#/products?category=' + this.value">
                        ${categories.map(cat => `<option value="${cat}" ${category === cat ? 'selected' : ''}>${cat === 'all' ? 'All Categories' : cat}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="product-grid">
                ${paginatedProducts.length > 0 ? paginatedProducts.map(product => renderProductCard(product)).join('') : '<p>No products found.</p>'}
            </div>
            ${totalPages > 1 ? paginationHtml : ''}
        </div>
    `;
}