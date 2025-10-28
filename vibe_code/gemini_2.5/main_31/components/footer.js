import { initRouter } from '../utils/router.js';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return `
        <footer class="footer">
            <div class="footer-container">
                <h3>Whimsy World Toys</h3>
                <p>Bringing joy and imagination to children everywhere.</p>
                <ul class="footer-links">
                    <li><a href="/" onclick="event.preventDefault(); initRouter().navigate('/')">Home</a></li>
                    <li><a href="/products" onclick="event.preventDefault(); initRouter().navigate('/products')">Products</a></li>
                    <li><a href="/about" onclick="event.preventDefault(); initRouter().navigate('/about')">About Us</a></li>
                    <li><a href="/contact" onclick="event.preventDefault(); initRouter().navigate('/contact')">Contact Us</a></li>
                    <li><a href="#privacy" onclick="event.preventDefault(); alert('Privacy Policy content would go here.')">Privacy Policy</a></li>
                    <li><a href="#terms" onclick="event.preventDefault(); alert('Terms of Service content would go here.')">Terms of Service</a></li>
                </ul>
                <p>&copy; ${currentYear} Whimsy World Toys. All rights reserved.</p>
                <div class="social-icons">
                    <a href="#facebook" aria-label="Facebook" onclick="event.preventDefault(); alert('Facebook link')">FB</a>
                    <a href="#twitter" aria-label="Twitter" onclick="event.preventDefault(); alert('Twitter link')">TW</a>
                    <a href="#instagram" aria-label="Instagram" onclick="event.preventDefault(); alert('Instagram link')">IG</a>
                </div>
            </div>
        </footer>
    `;
};
