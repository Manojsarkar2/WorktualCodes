function Navbar() {
    return `
        <nav class="navbar">
            <div class="navbar-brand">WhatsApp</div>
            <ul class="nav-links">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/features" class="nav-link">Features</a></li>
                <li><a href="/pricing" class="nav-link">Pricing</a></li>
                <li><a href="/contact" class="nav-link">Contact</a></li>
            </ul>
            <div class="hamburger">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </nav>
    `;
}