let cartCount = 0;

export const getCartCount = () => {
    return cartCount;
};

export const updateCartCount = (newCount) => {
    cartCount = newCount;
    // You might want to trigger a re-render of the cart icon here
    // if it's not already part of the main app render cycle.
    // For example, you could dispatch a custom event and listen for it in header.js
    const cartIcon = document.querySelector('.cart-icon .cart-count');
    if (cartIcon) {
        cartIcon.textContent = cartCount;
    }
};
