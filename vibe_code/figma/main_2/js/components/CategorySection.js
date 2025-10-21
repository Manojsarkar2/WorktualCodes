import { getStore } from '../utils/store.js';

const CategorySection = () => {
    const categories = getStore().categories || [];

    const categoryIcons = categories.map(category => {
        return `
            <div class="category-icon">
                <img src="${category.icon}" alt="${category.label}" width="50">
                <p>${category.label}</p>
            </div>
        `;
    }).join('');

    return `
        <div class="category-section">
            ${categoryIcons}
        </div>
    `;
};

export default CategorySection;