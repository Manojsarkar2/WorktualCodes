import { ProductCard } from '../components/ProductCard.js';

export const CategoriesView = (products, onAddToCart) => {
    const categoriesDiv = document.createElement('div');
    categoriesDiv.className = 'categories-view container';
    categoriesDiv.innerHTML = `
        <h2 class="text-center" style="color: var(--primary-blue); margin-bottom: 30px;">Shop by Categories</h2>
    `;

    const uniqueCategories = [...new Set(products.map(p => p.category))];

    uniqueCategories.forEach(category => {
        const categorySection = document.createElement('section');
        categorySection.className = 'product-section';
        categorySection.setAttribute('aria-labelledby', `category-heading-${category.replace(/\s/g, '-')}`);
        categorySection.innerHTML = `<h2 id="category-heading-${category.replace(/\s/g, '-')}">${category}</h2><div class="product-grid"></div>`;

        const categoryGrid = categorySection.querySelector('.product-grid');
        products.filter(p => p.category === category).slice(0, 8).forEach(product => {
            categoryGrid.appendChild(ProductCard(product, onAddToCart));
        });

        // Add a 'View All' link for each category
        const viewAllLink = document.createElement('p');
        viewAllLink.className = 'text-center';
        viewAllLink.style.marginTop = '20px';
        viewAllLink.innerHTML = `<a href="#products?category=${category}" class="primary" style="padding: 10px 20px; background-color: var(--primary-blue); color: var(--white); border-radius: 2px;">View All ${category}</a>`;
        categorySection.appendChild(viewAllLink);

        categoriesDiv.appendChild(categorySection);
    });

    return categoriesDiv;
};
