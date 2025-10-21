export const renderProductsView = async (container) => {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();

        let productsHTML = '<h1>Products</h1><div class="products-grid">';
        products.forEach(product => {
            productsHTML += `<div class="product-card">
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                                <p>Price: $${product.price}</p>
                                <p>Rating: ${product.rating}</p>
                               </div>`;
        });
        productsHTML += '</div>';

        container.innerHTML = productsHTML;
    } catch (error) {
        console.error('Error fetching products:', error);
        container.innerHTML = '<p>Error loading products.</p>';
    }
};