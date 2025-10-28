export function getNavbarHTML(theme) {
    const themeButtonText = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    return `
        <nav class="navbar">
            <div class="logo"><a href="/" data-link>Amazon-like</a></div>
            <ul class="nav-links">
                <li><a href="/" data-link>Home</a></li>
                <li><a href="/products" data-link>Products</a></li>
                <li><a href="/cart" data-link>Cart</a></li>
                <li><a href="/contact" data-link>Contact</a></li>
                <li><a href="/about" data-link>About Us</a></li>
            </ul>
            <div class="nav-controls">
                <button id="theme-toggle-btn" class="theme-toggle-btn">${themeButtonText}</button>
                <div class="hamburger-menu" id="hamburger-menu">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
        </nav>
    `;
}
