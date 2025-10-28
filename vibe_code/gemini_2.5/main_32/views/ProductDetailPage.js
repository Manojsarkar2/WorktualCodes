import { products } from '../data/products.js';

export const renderProductDetailPage = (productId) => {
    const product = products.find(p => p.id === productId);

    if (!product) {
        return `
            <section class="home-section">
                <h2 class="page-title">Product Not Found</h2>
                <p>The product you are looking for does not exist.</p>
                <p><a href="/products">Back to Products</a></p>
            </section>
        `;
    }

    return `
        <h1 class="page-title">${product.name}</h1>
        <div class="product-detail">
            <div class="product-detail-placeholder">Product ID: ${product.id}</div>
            <div class="product-info">
                <p class="price">$${product.price.toFixed(2)}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Availability:</strong> In Stock</p>
                <p><strong>Shipping:</strong> Free shipping on orders over $50</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
        <section class="home-section" style="margin-top: 2rem;">
            <h2>Customer Reviews</h2>
            <p>No reviews yet. Be the first to review this product!</p>
        </section>
    `;
};
