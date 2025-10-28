import { products } from '../data/products.js';
import { addToCart } from '../utils/cart.js';
import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for a single product detail page.
 * @param {string} productId - The ID of the product to display.
 * @returns {string} The HTML string for the product detail page, or an error message.
 */
export function getProductDetailPageHTML(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        return `
            <div class="container text-center">
                <h1>Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
                <a href="/products" data-route="/products" class="btn btn-primary">Back to Products</a>
            </div>
        `;
    }

    return `
        <div class="product-detail-page container">
            <div class="product-detail-container">
                <div class="product-detail-image-gallery" aria-label="Product image for ${product.name}">
                    <span>${product.imagePlaceholder || 'Product Image'}</span>
                </div>
                <div class="product-detail-info">
                    <h1 id="product-title">${product.name}</h1>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <p class="description">${product.description}</p>
                    <div class="product-detail-actions">
                        <div class="quantity-selector">
                            <button id="decrease-quantity" aria-label="Decrease quantity">-</button>
                            <span id="product-quantity" role="textbox" aria-live="polite" contenteditable="false">1</span>
                            <button id="increase-quantity" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="btn btn-primary btn-success add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
                    </div>
                    <div class="product-meta">
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Product ID:</strong> ${product.id}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Initializes any interactive components on the Product Detail page.
 * @param {string} productId - The ID of the product being displayed.
 */
export function initProductDetailPage(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const quantitySpan = getElement('#product-quantity');
    const decreaseBtn = getElement('#decrease-quantity');
    const increaseBtn = getElement('#increase-quantity');
    const addToCartBtn = getElement('.product-detail-actions .add-to-cart-btn');

    let quantity = 1;

    const updateQuantity = (newQuantity) => {
        quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
        if (quantitySpan) {
            quantitySpan.textContent = quantity;
        }
    };

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => updateQuantity(quantity - 1));
    }
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => updateQuantity(quantity + 1));
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart(productId, quantity);
            alert(`${quantity} x ${product.name} added to cart!`);
            updateQuantity(1); // Reset quantity after adding to cart
        });
    }
}