const Navbar = {
    render: () => {
        const navbarHTML = `
            <div class="container">
                <h1>WhatsApp</h1>
                <div class="hamburger">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <ul>
                    <li><a href="#/">Home</a></li>
                    <li><a href="#/features">Features</a></li>
                    <li><a href="#/downloads">Downloads</a></li>
                    <li><a href="#/security">Security</a></li>
                    <li><a href="#/privacy">Privacy</a></li>
                    <li><a href="#/faq">FAQ</a></li>
                    <li><a href="#/blog">Blog</a></li>
                    <li><a href="#/contact">Contact</a></li>
                    <li><a href="#/cart">Cart</a></li>
                </ul>
            </div>
        `;
        document.getElementById('navbar').innerHTML = navbarHTML;
    }
};
