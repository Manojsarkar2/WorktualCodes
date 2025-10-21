import { appState, logoutUser } from '../script.js';

export const renderNavbar = (targetElement) => {
    const totalCartItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const isLoggedIn = appState.user && appState.user.isLoggedIn;
    const username = appState.user ? appState.user.username.split('@')[0] : 'Guest';

    targetElement.innerHTML = `
        <nav class="navbar container">
            <a href="/" class="navbar-brand" data-nav>Amazon-like</a>
            <div class="navbar-search">
                <input type="text" placeholder="Search products...">
                <button aria-label="Search"><i class="fas fa-search"></i></button>
            </div>
            <div class="navbar-links" id="navbar-links">
                <ul>
                    <li><a href="/" data-nav>Home</a></li>
                    <li><a href="/products" data-nav>Products</a></li>
                    <li><a href="/contact" data-nav>Contact</a></li>
                    ${isLoggedIn ? `
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Hello, ${username} <i class="fas fa-caret-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="#" id="logout-link">Sign Out</a></li>
                                <!-- Add more user-specific links here -->
                            </ul>
                        </li>
                    ` : `
                        <li><a href="/login" id="login-link" data-nav>Sign In</a></li>
                        <li><a href="/signup" id="signup-link" data-nav>Sign Up</a></li>
                    `}
                </ul>
            </div>
            <a href="/cart" class="navbar-cart" data-nav aria-label="View your shopping cart">
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-item-count">${totalCartItems}</span>
            </a>
            <div class="hamburger-menu" id="hamburger-menu" aria-label="Toggle navigation menu" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </div>
        </nav>
    `;

    // Event listeners for hamburger menu
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('navbar-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Dropdown logic
    const dropdownToggle = targetElement.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdownMenu = dropdownToggle.nextElementSibling;
            dropdownMenu.classList.toggle('active');
            dropdownToggle.setAttribute('aria-expanded', dropdownMenu.classList.contains('active'));
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (e) => {
            if (!dropdownToggle.contains(e.target) && !dropdownToggle.nextElementSibling.contains(e.target)) {
                dropdownToggle.nextElementSibling.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
};
