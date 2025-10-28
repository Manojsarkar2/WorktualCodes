import * as API from '../utils/api.js';
import * as Cart from '../utils/cart.js';

/**
 * Renders the HTML for the menu page and attaches event listeners.
 * @returns {Promise<string>} The HTML string for the menu page.
 */
export async function renderMenuPage() {
    let products = [];
    try {
        products = await API.fetchProducts();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return `<p class="error-message">Failed to load menu. Please try again later.</p>`;
    }

    const productListHtml = products.map(product => `
        <div class="menu-item" data-product-id="${product.id}">
            <div class="menu-item-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Attach event listeners for 'Add to Cart' buttons after a short delay
    // This ensures the mainContent is updated before attempting to query for buttons.
    setTimeout(() => {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.removeEventListener('click', handleAddToCart);
            button.addEventListener('click', handleAddToCart);
        });
    }, 0);

    return `
        <h1>Our Delicious Menu</h1>
        <p style="text-align: center; max-width: 800px; margin: 0 auto 3rem;">Explore our diverse selection of gourmet dishes, crafted with the freshest ingredients to delight your taste buds.</p>
        <div class="menu-grid">
            ${productListHtml}
        </div>
    `;
}

/**
 * Handles adding a product to the cart.
 * @param {Event} event - The click event from the add to cart button.
 */
async function handleAddToCart(event) {
    const productId = event.target.dataset.productId;
    if (!productId) return;

    try {
        const products = await API.fetchProducts();
        const product = products.find(p => p.id === productId);

        if (product) {
            Cart.addToCart(product, 1);
            alert(`${product.name} added to cart!`);
            // Optionally, update a cart count in the navbar or re-render cart page
            // This might require dispatching a custom event or a more complex state management system.
        } else {
            console.error('Product not found for ID:', productId);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        alert('Could not add item to cart. Please try again.');
    }
}
