const Navbar = {
    render: ({ cartItemCount }) => {
        return `
            <header class="navbar">
                <nav class="nav-container">
                    <div class="nav-logo">
                        <a href="#/">Bloom & Petal</a>
                    </div>
                    <ul class="nav-links">
                        <li><a href="#/">Home</a></li>
                        <li><a href="#/shop">Shop</a></li>
                        <li><a href="#/our-story">Our Story</a></li>
                        <li><a href="#/contact">Contact</a></li>
                    </ul>
                    <div class="nav-icons">
                        <a href="#/cart" class="cart-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${cartItemCount > 0 ? `<span class="cart-count">${cartItemCount}</span>` : ''}
                        </a>
                        <div class="hamburger">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                    </div>
                </nav>
            </header>
        `;
    },
    after_render: () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
};

export default Navbar;
