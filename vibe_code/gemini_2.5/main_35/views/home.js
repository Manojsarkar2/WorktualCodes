export const renderHome = (container, { products, navigate }) => {
    container.innerHTML = `
        <section class="hero-banner">
            <h1>Welcome to Flipkart</h1>
            <p>Your one-stop shop for electronics, fashion, home essentials, and more!</p>
            <button onclick="window.router.navigate('/products')">Shop Now</button>
        </section>

        <section class="featured-products">
            <h2>Featured Products</h2>
            <div class="product-grid">
                ${products.slice(0, 4).map(product => `
                    <div class="card product-card" onclick="window.router.navigate('/products/${product.id}')">
                        <h3>${product.name}</h3>
                        <p>${product.description.substring(0, 70)}...</p>
                        <p class="price">₹${product.price.toLocaleString('en-IN')}</p>
                        <button onclick="event.stopPropagation(); window.appState.addToCart('${product.id}')">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="window.router.navigate('/products')">View All Products</button>
            </div>
        </section>

        <section class="categories">
            <h2>Shop by Category</h2>
            <div class="category-grid product-grid">
                <div class="card" onclick="window.router.navigate('/products?category=Mobiles')"><h3>Mobiles</h3></div>
                <div class="card" onclick="window.router.navigate('/products?category=Electronics')"><h3>Electronics</h3></div>
                <div class="card" onclick="window.router.navigate('/products?category=Laptops')"><h3>Laptops</h3></div>
                <div class="card" onclick="window.router.navigate('/products?category=Home Appliances')"><h3>Home Appliances</h3></div>
            </div>
        </section>
    `;
};