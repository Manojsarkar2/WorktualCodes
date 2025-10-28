export function getProductCardHTML(product) {
    return `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        </div>
    `;
}
