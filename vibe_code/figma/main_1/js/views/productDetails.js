import products from '../../data/products.json' assert { type: 'json' };
import { Button } from '../components/button.js';
import { getURLParams } from '../utils/router.js';

export const ProductDetailsView = () => {
    const params = getURLParams();
    const productId = params.id;
    const product = products.products.find(p => p.id === productId);

    if (!product) {
        return `<p>Product not found</p>`;
    }

    return `
        <div class="product-details-view">
            <div class="product-information">
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p class="price">₹${product.price}</p>
                ${Button({ label: 'Add to Cart' })}
                ${Button({ label: 'Buy Now' })}
            </div>
        </div>
    `;
};