export const renderNavbar = (navigateTo) => {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
        <a href="/" onclick="event.preventDefault(); navigateTo('/');">Home</a>
        <ul>
            <li><a href="/about" onclick="event.preventDefault(); navigateTo('/about');">About</a></li>
            <li><a href="/products" onclick="event.preventDefault(); navigateTo('/products');">Products</a></li>
            <li><a href="/contact" onclick="event.preventDefault(); navigateTo('/contact');">Contact</a></li>
            <li><a href="/login" onclick="event.preventDefault(); navigateTo('/login');">Login</a></li>
            <li><a href="/signup" onclick="event.preventDefault(); navigateTo('/signup');">Sign Up</a></li>
        </ul>
    `;

    // Make navigateTo available globally
    window.navigateTo = navigateTo;
};