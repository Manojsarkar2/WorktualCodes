import { products } from '../data/products.js';
import { appState, updateState } from '../utils/state.js';

export const renderProductDetail = (productId) => {
    const product = products.find(p => p.id === productId);

    if (!product) {
        return `
            <section class="container section-padding text-center">
                <h1>Product Not Found</h1>
                <p>The toy you are looking for does not exist.</p>
                <a href="/products" class="btn" onclick="event.preventDefault(); initRouter().navigate('/products')">Back to Products</a>
            </section>
        `;
    }

    return `
        <section class="container section-padding product-detail-page">
            <div class="grid-2-cols product-detail-content">
                <div class="product-image-placeholder">
                    <p>Placeholder for ${product.name}</p>
                    <p>Imagine a vibrant image of this toy!</p>
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="product-category">Category: <span>${product.category.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span></p>
                    <p class="product-description">${product.longDescription || product.description}</p>
                    <p class="product-price">Price: <span>$${product.price.toFixed(2)}</span></p>
                    <div class="product-actions">
                        <input type="number" id="quantity-input" value="1" min="1" max="10" aria-label="Quantity">
                        <button id="add-to-cart-btn" class="btn">Add to Cart</button>
                    </div>
                    <div class="product-meta">
                        <h3>Key Features:</h3>
                        <ul>
                            <li>Age Recommendation: ${product.ageRange}</li>
                            <li>Material: ${product.material}</li>
                            <li>Brand: ${product.brand}</li>
                            <li>Availability: ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="product-tabs">
                <div class="tabs-header">
                    <button class="tab-button active" data-tab="description">Description</button>
                    <button class="tab-button" data-tab="reviews">Reviews</button>
                    <button class="tab-button" data-tab="shipping">Shipping</button>
                </div>
                <div class="tabs-content">
                    <div id="tab-description" class="tab-pane active">
                        <h3>About the ${product.name}</h3>
                        <p>${product.longDescription || product.description}</p>
                        <p>This toy is designed to spark creativity and provide hours of fun. Made with child-safe materials, it's perfect for imaginative play and development.</p>
                    </div>
                    <div id="tab-reviews" class="tab-pane">
                        <h3>Customer Reviews</h3>
                        <p>No reviews yet. Be the first to review this product!</p>
                        <!-- Example review structure -->
                        <!--
                        <div class="review-item">
                            <h4>Great Toy!</h4>
                            <p>"My child absolutely loves this toy. Highly recommend!" - Happy Parent</p>
                            <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                        </div>
                        -->
                    </div>
                    <div id="tab-shipping" class="tab-pane">
                        <h3>Shipping Information</h3>
                        <p>We offer standard and express shipping options. Standard shipping usually takes 3-5 business days. Express shipping takes 1-2 business days.</p>
                        <p>Free standard shipping on orders over $75!</p>
                    </div>
                </div>
            </div>
        </section>
    `;
};

export const setupProductDetailPage = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Add to Cart functionality
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const quantityInput = document.getElementById('quantity-input');

    if (addToCartBtn && quantityInput) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value, 10);
            if (isNaN(quantity) || quantity < 1) {
                alert('Please enter a valid quantity.');
                return;
            }

            const currentCart = appState.cart;
            const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                currentCart[existingItemIndex].quantity += quantity;
            } else {
                currentCart.push({ ...product, quantity });
            }

            updateState({ cart: currentCart });
            alert(`${quantity} x ${product.name} added to cart!`);
            console.log('Current Cart:', appState.cart);
        });
    }

    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const targetTabId = `tab-${button.dataset.tab}`;
            document.getElementById(targetTabId).classList.add('active');
        });
    });
};
