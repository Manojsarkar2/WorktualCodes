export const renderNavbar = (activePath, toggleTheme) => {
    const getActiveClass = (path) => activePath === path ? 'active' : '';

    return `
        <nav class="navbar">
            <a href="/" class="navbar-brand">Amazon Store</a>
            <div class="navbar-controls">
                <button class="navbar-toggle">&#9776;</button>
            </div>
            <ul class="navbar-links">
                <li><a href="/" class="${getActiveClass('/')}">Home</a></li>
                <li><a href="/products" class="${getActiveClass('/products')}">Products</a></li>
                <li><a href="/cart" class="${getActiveClass('/cart')}">Cart</a></li>
                <li><a href="/contact" class="${getActiveClass('/contact')}">Contact</a></li>
                <li><button class="theme-toggle">Toggle Theme</button></li>
            </ul>
        </nav>
    `;
};
