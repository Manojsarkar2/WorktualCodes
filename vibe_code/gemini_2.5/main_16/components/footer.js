export function renderFooter() {
    return `
        <footer>
            <div class="footer-content">
                <ul class="footer-links">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li><a href="/products" class="nav-link">Products</a></li>
                    <li><a href="/contact" class="nav-link">Contact</a></li>
                    <li><a href="#" class="nav-link">Privacy Policy</a></li>
                    <li><a href="#" class="nav-link">Terms of Service</a></li>
                </ul>
                <p>&copy; ${new Date().getFullYear()} E-Shop. All rights reserved.</p>
            </div>
        </footer>
    `;
}
