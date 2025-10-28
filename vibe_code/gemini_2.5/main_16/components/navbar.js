import { getCurrentUser, logoutUser } from '../script.js';

export const renderNavbar = (container) => {
    const user = getCurrentUser();
    const cartCount = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).reduce((sum, item) => sum + item.quantity, 0) : 0;

    container.innerHTML = `
        <nav class="navbar">
            <a href="/" data-link class="navbar-brand">E-Shop</a>
            <button class="hamburger" aria-label="Toggle navigation">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
            <ul class="navbar-nav" id="main-nav">
                <li class="nav-item"><a href="/" data-link class="nav-link">Home</a></li>
                <li class="nav-item"><a href="/products" data-link class="nav-link">Products</a></li>
                <li class="nav-item"><a href="/contact" data-link class="nav-link">Contact</a></li>
                <li class="nav-item">
                    <a href="/cart" data-link class="nav-link">
                        Cart (<span id="cart-count">${cartCount}</span>)
                    </a>
                </li>
                <li class="nav-item" id="auth-nav-item">
                    ${user ? 
                        `<a href="#" class="nav-link" id="logout-link">Logout (${user.username})</a>` :
                        `<a href="/login" data-link class="nav-link">Login</a>`
                    }
                </li>
            </ul>
        </nav>
    `;

    const hamburger = container.querySelector('.hamburger');
    const mainNav = container.querySelector('#main-nav');
    const logoutLink = container.querySelector('#logout-link');

    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
            // Re-render navbar to reflect logout state
            renderNavbar(container);
        });
    }

    // Close mobile nav when a link is clicked
    mainNav.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            mainNav.classList.remove('active');
        }
    });
};
