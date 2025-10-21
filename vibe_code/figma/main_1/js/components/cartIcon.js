import { getCartCount } from '../store.js';

export const CartIcon = () => {
    const cartCount = getCartCount();
    return `
        <a href="/cart" class="cart-icon">
            <img src="assets/cart.svg" alt="Cart">
            <span class="cart-count">${cartCount}</span>
        </a>
    `;
};