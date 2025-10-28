export function getProductsView(products, getProductCardHTML) {
    const categories = [...new Set(products.map(p => p.category))];

    return `
        <div class="container">
            <h1>Our Products</h1>
            <p>Browse our extensive catalog of high-quality items.</p>

            <div class="search-filter-bar">
                <input type="text" id="product-search" placeholder="Search products..." />
                <select id="product-category">
                    <option value="All">All Categories</option>
                    ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
                </select>
            </div>

            <div class="product-grid">
                ${products.length > 0 
                    ? products.map(product => getProductCardHTML(product)).join('')
                    : '<p>No products found matching your criteria.</p>'
                }
            </div>
        </div>
    `;
}
