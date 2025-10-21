// components/navbar.js

function createNavbar() {
    const navbar = document.createElement('header');
    navbar.id = 'navbar';
    navbar.innerHTML = `
        <h1>LearnSphere</h1>
        <nav>
            <a href="#home" onclick="showPage('home')">Home</a>
            <a href="#courses" onclick="showPage('courses')">Courses</a>
            <a href="#contact" onclick="showPage('contact')">Contact</a>
            <a href="#login" onclick="showPage('login')">Login</a>
            <a href="#signup" onclick="showPage('signup')">Sign Up</a>
            <a href="#cart" onclick="showPage('cart')">Cart</a>
        </nav>
    `;
    return navbar;
}

// Export the function to make it accessible
// In a pure-JS environment, you can attach it to the window object
window.createNavbar = createNavbar;