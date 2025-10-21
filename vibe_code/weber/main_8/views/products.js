export const renderProducts = async (app) => {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const products = await response.json();

        let productListHTML = '<h1>Products</h1>';
        productListHTML += '<ul>';
        products.forEach(product => {
            productListHTML += `
                <li>
                    <img src="${product.image}" alt="${product.name}" width="100">
                    <h3>${product.name}</h3>
                    <p>By ${product.author}</p>
                    <p>$${product.price}</p>
                    <button>View Details</button>
                </li>
            `;
        });
        productListHTML += '</ul>';
        app.innerHTML = productListHTML;

    } catch (error) {
        console.error('Error fetching products:', error);
        app.innerHTML = '<p>Error loading products.</p>';
    }
};