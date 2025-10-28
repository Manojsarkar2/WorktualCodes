const ProductCard = {
    render: (product) => {
        return `
            <div class="product-card">
                <div class="product-image">
                    <span>Floral Image</span>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">$${(product.price || 0).toFixed(2)}</p>
                    <p>${product.description}</p>
                    <button class="btn add-to-cart-btn" data-id="${product.id}" style="margin-top: 1rem;">Add to Cart</button>
                </div>
            </div>
        `;
    }
};

export default ProductCard;
