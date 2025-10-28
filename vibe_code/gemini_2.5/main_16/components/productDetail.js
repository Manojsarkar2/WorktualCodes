import { products } from '../data/products.js';

export function renderProductDetail(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        return `
            <section class="text-center" style="padding: 100px 0;">
                <h1>Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
                <button class="primary nav-link" onclick="window.app.navigateTo('/products')">Back to Products</button>
            </section>
        `;
    }

    return `
        <section class="product-detail-container">
            <div class="product-detail-image">
                <span>Product Image Placeholder</span>
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <p class="category">Category: ${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                
                <div class="quantity-selector">
                    <label for="product-quantity">Quantity:</label>
                    <input type="number" id="product-quantity" value="1" min="1" max="10">
                </div>
                <button class="accent" id="add-to-cart-detail-btn" 
                        data-product='${JSON.stringify({ id: product.id, name: product.name, price: product.price })}'>
                    Add to Cart
                </button>
                <button class="primary nav-link" onclick="window.app.navigateTo('/products')" style="margin-left: 10px;">Continue Shopping</button>
            </div>
        </section>
    `;
}
