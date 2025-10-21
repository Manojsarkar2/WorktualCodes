import { addToCart, getProductsData, navigateTo } from '../script.js';

export const ProductDetailView = async (params) => {
    const productId = params.id;
    const products = getProductsData();
    const product = products.find(p => p.id === productId);

    if (!product) {
        return `
            <div class="container text-center" style="margin-top: 50px;">
                <h1 class="section-title">Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
                <button onclick="window.navigateTo('/products')">Back to Products</button>
            </div>
        `;
    }

    return `
        <div class="container product-detail-container">
            <div class="product-detail-image-wrapper" aria-hidden="true">
                <img data-src="${product.image}" alt="${product.name}" loading="lazy" />
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Rating:</strong> ${product.rating} / 5</p>
                <div style="margin-top: 20px;">
                    <label for="quantity">Quantity:</label>
                    <input type="number" id="product-quantity" value="1" min="1" max="10" style="width: 80px; margin-left: 10px;">
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}" style="margin-top: 20px;">Add to Cart</button>
            </div>
        </div>
    `;
};

ProductDetailView.afterRender = (params) => {
    const productId = params.id;
    const products = getProductsData();
    const product = products.find(p => p.id === productId);

    if (product) {
        document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            const quantityInput = document.getElementById('product-quantity');
            const quantity = parseInt(quantityInput.value, 10);
            addToCart(product, quantity);
        });
    }
};
