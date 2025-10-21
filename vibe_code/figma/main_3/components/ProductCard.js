import { Button } from './Button.js';

export const ProductCard = ({ id, image, name, price }) => {
    return `
        <div class="product-card">
            <img src="${image}" alt="${name}">
            <div class="product-card-info">
                <div>
                    <h4>${name}</h4>
                    <p class="price">$${price.toFixed(2)}</p>
                </div>
                ${Button({ label: 'Add to Cart', onClick: `window.addToCart(${id}, '${name}', ${price})`, className: 'btn-primary' })}
            </div>
        </div>
    `;
};
