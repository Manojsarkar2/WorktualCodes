import { products } from '../data/products.js';

export const ProductDetail = (productId) => {
    const product = products.find(p => p.id === productId);

    if (!product) {
        return `
            <div class="card text-center">
                <h1>Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
                <button onclick="window.router.navigate('/products')">Back to Products</button>
            </div>
        `;
    }

    return `
        <div class="product-detail-container">
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <div class="price">₹${product.price.toLocaleString('en-IN')}</div>
                <p class="description">${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Details:</strong> ${product.details}</p>
                <button onclick="window.appState.addToCart('${product.id}')">Add to Cart</button>
            </div>
        </div>
    `;
};