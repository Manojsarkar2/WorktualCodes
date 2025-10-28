import { addToCart } from '../script.js';
import { products } from '../data/products.js';

export const renderProductDetailPage = (container, params) => {
    const productId = params.id;
    const product = products.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = '<p class="text-center">Product not found.</p>';
        return;
    }

    container.innerHTML = `
        <div class="product-detail-container">
            <div class="product-detail-image-placeholder">Product Image</div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <p class="category">Category: ${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <div class="product-actions">
                    <input type="number" id="quantity-input" class="form-control" value="1" min="1" style="width: 80px; display: inline-block; margin-right: 10px;" aria-label="Quantity"/>
                    <button id="add-to-cart-btn" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    const addToCartBtn = container.querySelector('#add-to-cart-btn');
    const quantityInput = container.querySelector('#quantity-input');

    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value, 10);
        if (quantity > 0) {
            addToCart(product, quantity);
        } else {
            window.openModal('Invalid Quantity', 'Please enter a quantity greater than 0.');
        }
    });
};
