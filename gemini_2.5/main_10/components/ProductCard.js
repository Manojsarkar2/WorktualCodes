export const ProductCard = (product, onAddToCart) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `product-title-${product.id}`);

    const imagePlaceholder = document.createElement('div');
    imagePlaceholder.className = 'product-image-placeholder';
    imagePlaceholder.innerHTML = '🖼️'; // Placeholder icon
    imagePlaceholder.setAttribute('aria-label', `Image for ${product.name}`);

    const title = document.createElement('h3');
    title.id = `product-title-${product.id}`;
    title.textContent = product.name;

    const priceInfo = document.createElement('div');
    priceInfo.className = 'price-info';

    const currentPrice = document.createElement('span');
    currentPrice.className = 'price';
    currentPrice.textContent = `₹${product.price.toLocaleString()}`;

    const originalPrice = document.createElement('span');
    originalPrice.className = 'original-price';
    originalPrice.textContent = `₹${product.originalPrice.toLocaleString()}`;

    const discount = document.createElement('span');
    discount.className = 'discount';
    const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    discount.textContent = `${discountPercentage}% Off`;

    priceInfo.appendChild(currentPrice);
    priceInfo.appendChild(originalPrice);
    priceInfo.appendChild(discount);

    const rating = document.createElement('div');
    rating.className = 'rating';
    rating.setAttribute('aria-label', `Rating: ${product.rating} out of 5 stars`);
    rating.innerHTML = '⭐'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating)) + ` (${product.reviews} Reviews)`;

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'primary';
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.setAttribute('aria-label', `Add ${product.name} to cart`);
    addToCartButton.addEventListener('click', () => {
        // Dispatch a custom event for adding to cart
        const event = new CustomEvent('add-to-cart', {
            detail: { productId: product.id }
        });
        document.dispatchEvent(event);
    });

    card.appendChild(imagePlaceholder);
    card.appendChild(title);
    card.appendChild(priceInfo);
    card.appendChild(rating);
    card.appendChild(addToCartButton);

    return card;
};
