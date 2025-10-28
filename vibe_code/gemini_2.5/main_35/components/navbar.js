export const renderNavbar = (container, { currentTheme, toggleTheme, toggleMobileNav, isMobileNavOpen, cartItemCount }) => {
    container.innerHTML = `
        <nav class="navbar">
            <a href="/" class="navbar-brand">Flipkart</a>
            <ul class="navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <div class="navbar-actions">
                <button id="theme-toggle" aria-label="Toggle theme">
                    ${currentTheme === 'dark' ? '☀️' : '🌙'}
                </button>
                <a href="/cart" class="cart-icon" style="color: white; margin-left: 15px; position: relative;">
                    🛒 <span id="cart-count" style="position: absolute; top: -8px; right: -12px; background-color: #ff6161; color: white; border-radius: 50%; padding: 2px 6px; font-size: 0.7em;">${cartItemCount}</span>
                </a>
                <button id="hamburger-menu" class="hamburger-menu" aria-label="Open navigation menu">☰</button>
            </div>
        </nav>
        <ul class="mobile-nav ${isMobileNavOpen ? 'active' : ''}">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/cart">Cart (${cartItemCount})</a></li>
        </ul>
    `;

    container.querySelector('#theme-toggle').onclick = toggleTheme;
    container.querySelector('#hamburger-menu').onclick = toggleMobileNav;
};
