export function render(product) {
    return `
        <div class="product-card">
            <div class="product-image-placeholder">Product Image</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
}