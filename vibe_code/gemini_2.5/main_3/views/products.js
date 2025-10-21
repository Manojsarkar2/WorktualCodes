import { createProductCard } from '../components/productCard.js';
import { getProductsData } from '../script.js';

export const ProductsView = async () => {
    const products = getProductsData();
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const searchQuery = urlParams.get('search') || '';

    let filteredProducts = products;

    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const categories = [...new Set(products.map(p => p.category))];

    return `
        <div class="container">
            <h1 class="section-title">All Products</h1>
            <div class="flex-group" style="margin-bottom: 20px; justify-content: center;">
                <button class="category-filter-btn ${!categoryFilter ? 'active' : ''}" data-category="">All</button>
                ${categories.map(cat => `
                    <button class="category-filter-btn ${categoryFilter === cat ? 'active' : ''}" data-category="${cat}">${cat}</button>
                `).join('')}
            </div>
            <div class="grid-container" id="products-grid">
                ${filteredProducts.length > 0 
                    ? filteredProducts.map(product => createProductCard(product).outerHTML).join('')
                    : '<p class="text-center">No products found matching your criteria.</p>'
                }
            </div>
        </div>
    `;
};

ProductsView.afterRender = () => {
    document.querySelectorAll('.category-filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            const url = new URL(window.location.href);
            if (category) {
                url.searchParams.set('category', category);
            } else {
                url.searchParams.delete('category');
            }
            window.navigateTo(url.pathname + url.search);
        });
    });

    // Handle search query from global search bar
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = searchQuery;
        }
    }
};
