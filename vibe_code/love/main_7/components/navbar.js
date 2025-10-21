// components/navbar.js

const createNavbar = () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.innerHTML = `
            <nav>
                <a href="#home">Home</a>
                <a href="#products">Products</a>
                <a href="#contact">Contact</a>
                <a href="#cart">Cart</a>
                <div class="dropdown">
                    <span>Account</span>
                    <div class="dropdown-content">
                        <a href="#login">Login</a>
                        <a href="#signup">Signup</a>
                    </div>
                </div>
            </nav>
        `;
    }
};

createNavbar();