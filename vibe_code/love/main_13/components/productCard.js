export const renderProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `product-title-${product.id}`);

    const discountPercentage = ((1 - product.price / product.originalPrice) * 100).toFixed(0);

    card.innerHTML = `
        <div class="product-card-image-placeholder" aria-label="Product image for ${product.name}">
            <span>Product Image</span>
        </div>
        <h3 id="product-title-${product.id}">${product.name}</h3>
        <p class="price">
            ₹${product.price.toFixed(2)}
            <span class="original-price">₹${product.originalPrice.toFixed(2)}</span>
            <span class="discount">${discountPercentage}% Off</span>
        </p>
        <button data-action="add-to-cart" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
    `;
    return card;
};
