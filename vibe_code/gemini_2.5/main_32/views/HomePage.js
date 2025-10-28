export const renderHomePage = () => {
    return `
        <h1 class="page-title">Welcome to Our Amazon-like Store!</h1>
        <section class="home-section">
            <h2>Discover Amazing Deals</h2>
            <p>Explore a wide range of products from electronics to home essentials. We bring you the best quality at unbeatable prices.</p>
            <p>Shop now and experience seamless online shopping with fast delivery and excellent customer service.</p>
            <p><a href="/products">Browse All Products</a></p>
        </section>
        <section class="home-section">
            <h2>Featured Categories</h2>
            <div class="home-product-grid">
                <div class="product-card">
                    <div class="product-card-placeholder">Electronics</div>
                    <h3>Electronics</h3>
                    <p>Latest gadgets and tech.</p>
                    <a href="/products" class="add-to-cart-btn" style="background-color: #007185; color: white;">Shop Now</a>
                </div>
                <div class="product-card">
                    <div class="product-card-placeholder">Home & Kitchen</div>
                    <h3>Home & Kitchen</h3>
                    <p>Essentials for your home.</p>
                    <a href="/products" class="add-to-cart-btn" style="background-color: #007185; color: white;">Shop Now</a>
                </div>
                <div class="product-card">
                    <div class="product-card-placeholder">Books</div>
                    <h3>Books</h3>
                    <p>Read your next favorite story.</p>
                    <a href="/products" class="add-to-cart-btn" style="background-color: #007185; color: white;">Shop Now</a>
                </div>
            </div>
        </section>
    `;
};
