export const ProductCard = (product) => {
    return `
        <div class="product-card">
            <a href="/product/${product.id}">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="price">₹${product.price}</p>
            </a>
        </div>
    `;
};