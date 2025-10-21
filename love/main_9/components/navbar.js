function renderNavbar() {
    const navbarContent = `
        <div id="navbar">
            <h1>Anime Stream</h1>
            <div class="hamburger">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <ul>
                <li><a href="/home" onclick="navigateTo('/home'); return false;">Home</a></li>
                <li><a href="/search" onclick="navigateTo('/search'); return false;">Search</a></li>
                <li><a href="/cart" onclick="navigateTo('/cart'); return false;">Cart</a></li>
                <li><a href="/contact" onclick="navigateTo('/contact'); return false;">Contact</a></li>
                <li><a href="/login" onclick="navigateTo('/login'); return false;">Login</a></li>
                <li><a href="/signup" onclick="navigateTo('/signup'); return false;">Signup</a></li>
            </ul>
        </div>
    `;
    document.getElementById('navbar').innerHTML = navbarContent;

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('navbar-open');
    });
}
