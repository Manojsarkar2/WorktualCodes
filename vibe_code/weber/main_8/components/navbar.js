export const renderNavbar = () => {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
        </ul>
    `;
};