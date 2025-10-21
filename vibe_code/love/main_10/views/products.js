import productsData from '../data/products.json' assert { type: 'json' };

export async function renderProducts() {
    const productsHTML = productsData.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');

    return `
        <section id="products">
            <h2>Our Products</h2>
            <div id="products-list">
                ${productsHTML}
            </div>
        </section>
    `;
}