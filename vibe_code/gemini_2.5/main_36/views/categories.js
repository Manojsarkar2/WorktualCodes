import { categories } from '../data/products.js';

export const Categories = () => `
    <h1>Product Categories</h1>
    <div class="category-grid">
        ${categories.map(category => `
            <a href="/products?category=${encodeURIComponent(category.name)}" class="category-item card" data-link>
                <h3>${category.name}</h3>
                <p>${category.description}</p>
            </a>
        `).join('')}
    </div>
`;