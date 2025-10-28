export function renderHeader(activePath, currentUser, cartItemCount) {
    const isLoggedIn = !!currentUser;
    const cartCountDisplay = cartItemCount > 0 ? `<span class="cart-count">${cartItemCount}</span>` : '';

    return `
        <header>
            <nav class="navbar">
                <div class="logo"><a href="/" class="nav-link">E-Shop</a></div>
                <div class="hamburger-menu">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                <ul class="nav-links">
                    <li><a href="/" class="nav-link ${activePath === '/' ? 'active' : ''}">Home</a></li>
                    <li><a href="/products" class="nav-link ${activePath === '/products' ? 'active' : ''}">Products</a></li>
                    <li><a href="/cart" class="nav-link ${activePath === '/cart' ? 'active' : ''}">Cart ${cartCountDisplay}</a></li>
                    <li><a href="/contact" class="nav-link ${activePath === '/contact' ? 'active' : ''}">Contact</a></li>
                    ${isLoggedIn
                        ? `<li><a href="#" id="logout-button" class="nav-link">Logout (${currentUser.username})</a></li>`
                        : `<li><a href="/login" class="nav-link ${activePath === '/login' ? 'active' : ''}">Login</a></li>
                           <li><a href="/signup" class="nav-link ${activePath === '/signup' ? 'active' : ''}">Sign Up</a></li>`
                    }
                </ul>
            </nav>
        </header>
    `;
}
