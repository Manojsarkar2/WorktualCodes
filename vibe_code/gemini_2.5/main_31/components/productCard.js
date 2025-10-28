import { initRouter } from '../utils/router.js';

export const ProductCard = (product) => {
    const router = initRouter();
    return `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn" onclick="event.preventDefault(); initRouter().navigate('/products/${product.id}')">View Details</button>
        </div>
    `;
};
