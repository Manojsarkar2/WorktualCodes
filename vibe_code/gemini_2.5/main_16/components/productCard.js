import { addToCart } from '../script.js';

export const renderProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-card-image-placeholder">Product Image</div>
        <div class="product-card-body">
            <h3 class="product-card-title">${product.name}</h3>
            <p class="product-card-category">${product.category}</p>
            <p class="product-card-price">$${product.price.toFixed(2)}</p>
            <a href="/product/${product.id}" data-link class="btn btn-outline-primary">View Details</a>
            <button class="btn btn-primary add-to-cart-btn mt-2" data-product-id="${product.id}">Add to Cart</button>
        </div>
    `;

    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent navigating to product detail
        addToCart(product);
    });

    return card;
};
