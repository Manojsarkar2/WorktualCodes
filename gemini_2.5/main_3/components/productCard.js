import { addToCart } from '../script.js';

export const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('aria-labelledby', `product-title-${product.id}`);
    card.setAttribute('tabindex', '0');

    card.innerHTML = `
        <a href="/product/${product.id}" data-link class="product-card-link">
            <div class="product-card-image" aria-hidden="true">
                <img data-src="${product.image}" alt="${product.name}" loading="lazy" />
            </div>
            <h3 id="product-title-${product.id}" class="product-card-title">${product.name}</h3>
        </a>
        <p class="product-card-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
    `;

    card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent navigation if button is inside a link
        addToCart(product);
    });

    return card;
};
