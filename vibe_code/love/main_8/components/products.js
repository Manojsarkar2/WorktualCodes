function Products() {
    const productsSection = document.createElement('section');
    productsSection.innerHTML = `
        <h2>Our Products</h2>
        <div id="product-list"></div>
    `;
    return productsSection;
}