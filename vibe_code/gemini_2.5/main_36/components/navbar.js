export const Navbar = (theme) => `
    <nav class="navbar">
        <div class="navbar-brand-container">
            <a href="/" class="navbar-brand" data-link>Flipkart</a>
        </div>
        <div class="navbar-controls">
            <button id="theme-toggle" class="navbar-theme-toggle">
                ${theme === 'dark-theme' ? '☀️' : '🌙'}
            </button>
            <div class="navbar-toggle" id="navbar-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <ul class="navbar-nav" id="navbar-nav">
            <li><a href="/" data-link>Home</a></li>
            <li><a href="/products" data-link>Products</a></li>
            <li><a href="/categories" data-link>Categories</a></li>
            <li><a href="/cart" data-link>Cart</a></li>
            <li><a href="/contact" data-link>Contact</a></li>
            <li><a href="/login" data-link>Login</a></li>
        </ul>
    </nav>
`;