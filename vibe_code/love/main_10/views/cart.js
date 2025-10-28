import { getCartItems, updateCartItemQuantity, removeCartItem, clearCart } from '../utils/cart.js';
import { products } from '../data/products.js';
import { navigateTo } from '../utils/router.js';
import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for the Cart page.
 * @returns {string} The HTML string for the Cart page.
 */
export function getCartPageHTML() {
    const cartItems = getCartItems();
    let total = 0;

    const cartItemsHTML = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return ''; // Should not happen if data is consistent

        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        return `
            <div class="cart-item" data-product-id="${item.productId}" role="listitem" aria-label="Item: ${product.name}">
                <div class="cart-item-image" aria-label="Image for ${product.name}">
                    <span>${product.imagePlaceholder || 'Product Image'}</span>
                </div>
                <div class="cart-item-details">
                    <h3><a href="/products/${product.id}" data-route="/products/${product.id}">${product.name}</a></h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button class="decrease-quantity" aria-label="Decrease quantity for ${product.name}" data-product-id="${item.productId}">-</button>
                        <span class="item-quantity" role="textbox" aria-live="polite" contenteditable="false">${item.quantity}</span>
                        <button class="increase-quantity" aria-label="Increase quantity for ${product.name}" data-product-id="${item.productId}">+</button>
                    </div>
                    <button class="btn remove-btn" data-product-id="${item.productId}" aria-label="Remove ${product.name} from cart">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="cart-page container">
            <h1>Shopping Cart</h1>
            <div class="cart-page-container">
                ${cartItems.length === 0 ? '<p class="text-center">Your cart is empty. <a href="/products" data-route="/products">Start shopping!</a></p>' : `
                    <div class="cart-items" role="list">
                        ${cartItemsHTML}
                    </div>
                    <div class="cart-summary">
                        <p class="total-price">Subtotal (${cartItems.length} items): <strong>$${total.toFixed(2)}</strong></p>
                        <button class="btn btn-success" id="proceed-to-checkout">Proceed to Checkout</button>
                    </div>
                `}
            </div>
        </div>
    `;
}

/**
 * Initializes any interactive components on the Cart page.
 */
export function initCartPage() {
    const cartContainer = getElement('.cart-page-container');
    if (!cartContainer) return;

    cartContainer.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const currentQuantity = parseInt(e.target.nextElementSibling.textContent);
            if (currentQuantity > 1) {
                updateCartItemQuantity(productId, currentQuantity - 1);
            }
        });
    });

    cartContainer.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const currentQuantity = parseInt(e.target.previousElementSibling.textContent);
            updateCartItemQuantity(productId, currentQuantity + 1);
        });
    });

    cartContainer.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            if (confirm('Are you sure you want to remove this item from your cart?')) {
                removeCartItem(productId);
            }
        });
    });

    const checkoutBtn = getElement('#proceed-to-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // In a real app, this would lead to a checkout flow.
            // For now, simulate checkout and clear cart.
            alert('Proceeding to checkout! (This is a mock checkout)');
            clearCart();
            navigateTo('/products'); // Redirect to products after mock checkout
        });
    }

    // Handle navigation from product links within cart
    cartContainer.querySelectorAll('.cart-item-details a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.getAttribute('href'));
        });
    });
}