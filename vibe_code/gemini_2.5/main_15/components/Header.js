class Header {
    async render() {
        const logoSvg = `<img src="./assets/images/logo.svg" alt="Positivus logo">`;
        const menuIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="black"/></svg>`;

        return `
            <header class="header">
                <div class="container header-container">
                    <a href="/" data-link class="logo">
                        ${logoSvg}
                        <span>Positivus</span>
                    </a>
                    <nav class="nav-menu">
                        <a href="/about" data-link>About us</a>
                        <a href="/services" data-link>Services</a>
                        <a href="/use-cases" data-link>Use Cases</a>
                        <a href="/pricing" data-link>Pricing</a>
                        <a href="/blog" data-link>Blog</a>
                    </nav>
                    <a href="/contact" data-link class="btn btn-outline request-quote-btn">Request a quote</a>
                    <button class="menu-toggle" aria-label="Open navigation menu">
                        ${menuIcon}
                    </button>
                </div>
            </header>
        `;
    }

    after_render() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }
}

export default Header;
