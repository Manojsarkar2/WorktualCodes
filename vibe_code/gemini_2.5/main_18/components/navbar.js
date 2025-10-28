export const renderNavbar = (element, isLoggedIn, currentUser, cartCount) => {
    element.innerHTML = `
        <nav class="navbar">
            <div class="container">
                <a href="/" class="navbar-brand">Clash of Clans</a>
                <div class="hamburger-menu" aria-label="Toggle navigation menu" role="button" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="nav-links">
                    <li><a href="/" aria-current="page">Home</a></li>
                    <li><a href="/heroes">Heroes</a></li>
                    <li><a href="/troops">Troops</a></li>
                    <li><a href="/buildings">Buildings</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                <div class="nav-actions">
                    <div class="cart-icon" role="button" aria-label="View wishlist">
                        <i class="fas fa-heart"></i>
                        <span id="cart-count" class="cart-count" style="display: ${cartCount > 0 ? 'flex' : 'none'};">${cartCount}</span>
                    </div>
                    ${isLoggedIn ? 
                        `<span class="user-greeting">Hello, ${currentUser.username}!</span>
                         <button id="logout-btn">Logout</button>` 
                        : 
                        `<button id="login-btn">Login</button>
                         <button id="signup-btn">Sign Up</button>`
                    }
                </div>
            </div>
        </nav>
    `;

    // Set aria-expanded for hamburger menu based on initial state
    const hamburger = element.querySelector('.hamburger-menu');
    const navLinks = element.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    }
};
