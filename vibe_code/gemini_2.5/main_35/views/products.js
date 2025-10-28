export const renderProducts = (container, { products, navigate, addToCart, currentCategory }) => {
    const filteredProducts = currentCategory 
        ? products.filter(p => p.category === currentCategory) 
        : products;

    container.innerHTML = `
        <h1>${currentCategory ? currentCategory : 'All'} Products</h1>
        <div class="product-grid">
            ${filteredProducts.map(product => `
                <div class="card product-card">
                    <h3 onclick="window.router.navigate('/products/${product.id}')" style="cursor: pointer;">${product.name}</h3>
                    <p>${product.description.substring(0, 70)}...</p>
                    <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
                    <button onclick="window.appState.addToCart('${product.id}')">Add to Cart</button>
                </div>
            `).join('')}
        </div>
        ${filteredProducts.length === 0 ? '<p>No products found in this category.</p>' : ''}
    `;
};