import { Icon } from './Icon.js';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-column">
                        <div class="logo">Furni.</div>
                        <p>A fusion of style and comfort, our curated collection brings elegance to every corner of your home.</p>
                        <div class="social-media-icons">
                            <a href="#" class="icon-wrapper">${Icon({ name: 'Facebook' })}</a>
                            <a href="#" class="icon-wrapper">${Icon({ name: 'Instagram' })}</a>
                            <a href="#" class="icon-wrapper">${Icon({ name: 'Twitter' })}</a>
                        </div>
                    </div>
                    <div class="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#" onclick="event.preventDefault(); window.router.navigate('/about');">About Us</a></li>
                            <li><a href="#">Our Services</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Affiliate Program</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Shop</h4>
                        <ul>
                            <li><a href="#" onclick="event.preventDefault(); window.router.navigate('/shop');">Living Room</a></li>
                            <li><a href="#" onclick="event.preventDefault(); window.router.navigate('/shop');">Bedroom</a></li>
                            <li><a href="#" onclick="event.preventDefault(); window.router.navigate('/shop');">Kitchen</a></li>
                            <li><a href="#" onclick="event.preventDefault(); window.router.navigate('/shop');">Bathroom</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">Order Tracking</a></li>
                            <li><a href="#" onclick="event.preventDefault(); window.router.navigate('/contact');">Help & Support</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} Furni. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
};
