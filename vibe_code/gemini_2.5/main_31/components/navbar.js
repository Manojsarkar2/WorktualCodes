import { initRouter } from '../utils/router.js';

export const Navbar = (isAuthenticated, user) => {
    const router = initRouter();
    const userName = user ? user.username : 'Guest';

    return `
        <nav class="navbar">
            <div class="navbar-container">
                <a href="/" class="navbar-brand" onclick="event.preventDefault(); initRouter().navigate('/')">Whimsy World</a>
                <div class="hamburger" id="hamburger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="navbar-links">
                    <li><a href="/" onclick="event.preventDefault(); initRouter().navigate('/')">Home</a></li>
                    <li><a href="/products" onclick="event.preventDefault(); initRouter().navigate('/products')">Products</a></li>
                    <li><a href="/about" onclick="event.preventDefault(); initRouter().navigate('/about')">About Us</a></li>
                    <li><a href="/contact" onclick="event.preventDefault(); initRouter().navigate('/contact')">Contact Us</a></li>
                    <li><a href="/cart" onclick="event.preventDefault(); initRouter().navigate('/cart')">Cart</a></li>
                    ${isAuthenticated ? 
                        `<li><a href="#" id="logout-btn">Logout (${userName})</a></li>` : 
                        `<li><a href="/login" onclick="event.preventDefault(); initRouter().navigate('/login')">Login</a></li>
                         <li><a href="/signup" onclick="event.preventDefault(); initRouter().navigate('/signup')">Sign Up</a></li>`
                    }
                </ul>
            </div>
        </nav>
    `;
};
