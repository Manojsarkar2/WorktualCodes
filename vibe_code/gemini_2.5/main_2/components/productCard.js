export const renderProductCard = (product) => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.setAttribute('data-product-id', product.id);

    card.innerHTML = `
        <div class="product-card-image-placeholder" data-src="placeholder-image-for-${product.id}.jpg">
            Product Image
        </div>
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
    `;

    return card;
};
