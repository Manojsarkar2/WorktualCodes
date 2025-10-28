class Footer {
    async render() {
        const logoSvg = `<img src="./assets/images/logo-footer.svg" alt="Positivus logo">`;
        const linkedinIcon = `<img src="./assets/images/linkedin.svg" alt="LinkedIn">`;

        return `
            <footer class="footer">
                <div class="container footer-container">
                    <div class="footer-top">
                        <a href="/" data-link class="logo">
                            ${logoSvg}
                            <span>Positivus</span>
                        </a>
                        <nav class="footer-nav">
                            <div class="footer-nav-col">
                                <h4>Navigation</h4>
                                <ul>
                                    <li><a href="/about" data-link>About us</a></li>
                                    <li><a href="/services" data-link>Services</a></li>
                                    <li><a href="/use-cases" data-link>Use Cases</a></li>
                                    <li><a href="/pricing" data-link>Pricing</a></li>
                                    <li><a href="/blog" data-link>Blog</a></li>
                                </ul>
                            </div>
                        </nav>
                        <div class="footer-contact">
                            <h4>Contact us:</h4>
                            <p>Email: info@positivus.com</p>
                            <p>Phone: 555-567-8901</p>
                            <p>Address: 1234 Main St, Anytown, USA</p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2023 Positivus. All Rights Reserved.</p>
                        <div class="footer-social">
                            <a href="#" target="_blank" rel="noopener noreferrer">${linkedinIcon}</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

export default Footer;
