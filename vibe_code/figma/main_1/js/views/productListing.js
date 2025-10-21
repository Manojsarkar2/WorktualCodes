import { ProductCard } from '../components/productCard.js';
import { Dropdown } from '../components/dropdown.js';
import { Checkbox } from '../components/checkbox.js';
import products from '../../data/products.json' assert { type: 'json' };

export const ProductListingView = () => {
    const priceOptions = [
        { value: 'low', label: 'Low to High' },
        { value: 'high', label: 'High to Low' }
    ];

    const brandOptions = [
        { value: 'brand1', label: 'Brand 1' },
        { value: 'brand2', label: 'Brand 2' }
    ];

    return `
        <div class="product-listing-view">
            <div class="filter-bar">
                ${Dropdown({ label: 'Price', options: priceOptions })}
                ${Checkbox({ label: 'Brand 1' })}
                ${Checkbox({ label: 'Brand 2' })}
            </div>
            <div class="grid">
                ${products.products.map(product => ProductCard(product)).join('')}
            </div>
        </div>
    `;
};