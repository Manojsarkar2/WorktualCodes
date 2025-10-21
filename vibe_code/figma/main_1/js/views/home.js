import { CategoryItem } from '../components/categoryItem.js';
import { ImageSlider } from '../components/imageSlider.js';
import { ProductCard } from '../components/productCard.js';
import categories from '../../data/categories.json' assert { type: 'json' };
import products from '../../data/products.json' assert { type: 'json' };

export const HomeView = () => {
    return `
        <div class="home-view">
            <div class="category-menu">
                ${categories.categories.map(category => CategoryItem({ category })).join('')}
            </div>
            ${ImageSlider()}
            <h2>Deals of the Day</h2>
            <div class="grid">
                ${products.products.slice(0, 6).map(product => ProductCard(product)).join('')}
            </div>
        </div>
    `;
};