import { renderProductCard } from '../components/productCard.js';

export const renderCategoryView = (container, categoryName, products) => {
    container.innerHTML = `
        <div class="container category-page">
            <h1>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
            ${products.length > 0 ? 
                `<div class="product-grid" id="category-product-grid"></div>` : 
                `<p class="text-center">No products found in this category.</p>`
            }
        </div>
    `;

    const productGrid = container.querySelector('#category-product-grid');
    if (productGrid) {
        products.forEach(product => {
            productGrid.appendChild(renderProductCard(product));
        });
    }
};
