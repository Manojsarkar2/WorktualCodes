export const renderProductDetail = (container, { product, navigate, addToCart }) => {
    if (!product) {
        container.innerHTML = `
            <div class="page-content">
                <h1>Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
                <button onclick="window.router.navigate('/products')">Back to Products</button>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="product-detail-container">
            <div class="product-detail-image">
                <p style="font-size: 8em; text-align: center;">📦</p> <!-- Placeholder for image -->
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
                <p class="description">${product.description}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <button onclick="window.appState.addToCart('${product.id}')">Add to Cart</button>
            </div>
        </div>
    `;
};
