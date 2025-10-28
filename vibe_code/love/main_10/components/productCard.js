import { navigateTo } from '../utils/router.js';
import { addToCart } from '../utils/cart.js';

/**
 * Generates the HTML for a single product card.
 * @param {Object} product - The product object.
 * @returns {string} The HTML string for the product card.
 */
export function generateProductCardHTML(product) {
    return `
        <div class="product-card" data-product-id="${product.id}" tabindex="0" role="listitem" aria-label="Product: ${product.name}">
            <div class="product-card-image" aria-label="Image for ${product.name}">
                <span>${product.imagePlaceholder || 'Product Image'}</span>
            </div>
            <h3><a href="/products/${product.id}" data-route="/products/${product.id}" aria-label="View details for ${product.name}">${product.name}</a></h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
        </div>
    `;
}

/**
 * Attaches event listeners to product cards within a given container.
 * @param {HTMLElement} container - The DOM element containing the product cards.
 */
export function initProductCardListeners(container) {
    container.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            if (productId) {
                addToCart(productId);
                alert(`${window.appState.products.find(p => p.id === productId)?.name || 'Item'} added to cart!`);
            }
        });
    });

    container.querySelectorAll('.product-card h3 a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.getAttribute('href'));
        });
    });
}