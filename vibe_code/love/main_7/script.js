// script.js

// Data
const productsData = [
    { id: 1, name: 'Cleaning Wipes', price: 1.00 },
    { id: 2, name: 'Chocolate Bar', price: 1.00 },
    { id: 3, name: 'Laundry Detergent', price: 1.00 },
    { id: 4, name: 'Soft Drinks', price: 1.00 },
    { id: 5, name: 'Biscuits', price: 1.00 }
];

let cart = [];

// DOM Elements
const contentDiv = document.getElementById('content');
const navbarDiv = document.getElementById('navbar');
const footerDiv = document.getElementById('footer');
const modalContainer = document.getElementById('modal-container');

// --- Navigation --- 
const navigation = () => {
    const navContent = `
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
        <a href="#cart">Cart (${cart.length})</a>
        <div class="dropdown">
            <span>Account</span>
            <div class="dropdown-content">
                <a href="#login">Login</a>
                <a href="#signup">Signup</a>
            </div>
        </div>
    `;
    navbarDiv.innerHTML = navContent;
};

// --- Footer --- 
const footer = () => {
    footerDiv.innerHTML = `<p>&copy; ${new Date().getFullYear()} Poundland. All rights reserved.</p>`;
};

// --- Home Page --- 
const homePage = () => {
    let homeContent = `
        <section id="home">
            <h1>Welcome to Poundland</h1>
            <p>Amazing value on everyday essentials!</p>
            <div class="featured-products"></div>
        </section>
    `;
    contentDiv.innerHTML = homeContent;
    displayProducts();
};

// --- Products Page --- 
const productsPage = () => {
    let productsContent = `
        <section id="products">
            <h2>Our Products</h2>
            <div class="product-list"></div>
        </section>
    `;
    contentDiv.innerHTML = productsContent;
    renderProducts();
};

const renderProducts = () => {
    const productListDiv = document.querySelector('.product-list');
    productListDiv.innerHTML = '';
    productsData.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>£${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productListDiv.appendChild(productDiv);
    });
};

// --- Contact Page --- 
const contactPage = () => {
    let contactContent = `
        <section id="contact">
            <h2>Contact Us</h2>
            <form id="contact-form">
                <input type="text" id="name" placeholder="Your Name" required>
                <input type="email" id="email" placeholder="Your Email" required>
                <textarea id="message" placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </section>
    `;
    contentDiv.innerHTML = contactContent;

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        console.log('Form submitted:', name, email, message);
        // Store in localStorage (mock)
        localStorage.setItem('contactFormData', JSON.stringify({ name, email, message }));
        alert('Message sent! (Data stored in localStorage)');
    });
};

// --- Cart Page --- 
const cartPage = () => {
    let cartContent = `
        <section id="cart">
            <h2>Shopping Cart</h2>
            <div class="cart-items"></div>
            <p>Total: £<span id="cart-total">0.00</span></p>
            <button onclick="checkout()">Checkout</button>
        </section>
    `;
    contentDiv.innerHTML = cartContent;
    renderCart();
};

const renderCart = () => {
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const product = productsData.find(p => p.id === item.productId);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <p>${product.name} x ${item.quantity} = £${itemTotal.toFixed(2)}</p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });
    document.getElementById('cart-total').innerText = total.toFixed(2);
};

// --- Login Page --- 
const loginPage = () => {
    let loginContent = `
        <section id="login">
            <h2>Login</h2>
            <form id="login-form">
                <input type="email" id="login-email" placeholder="Email" required>
                <input type="password" id="login-password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
        </section>
    `;
    contentDiv.innerHTML = loginContent;

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        // Mock authentication
        if (email === 'test@example.com' && password === 'password') {
            localStorage.setItem('loggedIn', 'true');
            alert('Logged in!');
            // Redirect to home or products page
            window.location.hash = '#home';
        } else {
            alert('Invalid credentials');
        }
    });
};

// --- Signup Page --- 
const signupPage = () => {
    let signupContent = `
        <section id="signup">
            <h2>Signup</h2>
            <form id="signup-form">
                <input type="text" id="signup-name" placeholder="Name" required>
                <input type="email" id="signup-email" placeholder="Email" required>
                <input type="password" id="signup-password" placeholder="Password" required>
                <button type="submit">Signup</button>
            </form>
        </section>
    `;
    contentDiv.innerHTML = signupContent;

    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        // Mock signup
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Signed up! (Data stored in localStorage)');
    });
};

// --- Add to Cart --- 
const addToCart = (productId) => {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId: productId, quantity: 1 });
    }
    renderCart();
    navigation(); // Update cart count in navbar
};

// --- Remove from Cart --- 
const removeFromCart = (productId) => {
    cart = cart.filter(item => item.productId !== productId);
    renderCart();
    navigation(); // Update cart count in navbar
};

// --- Checkout --- 
const checkout = () => {
    alert('Checkout complete! (No actual payment processing)');
    cart = [];
    renderCart();
    navigation(); // Update cart count in navbar
};

// --- Display Products on Home Page --- 
const displayProducts = () => {
    const featuredProductsDiv = document.querySelector('.featured-products');
    featuredProductsDiv.innerHTML = '';
    productsData.slice(0, 3).forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>£${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        featuredProductsDiv.appendChild(productDiv);
    });
};

// --- Router --- 
const router = () => {
    const route = window.location.hash.substring(1);
    switch (route) {
        case 'home':
            homePage();
            break;
        case 'products':
            productsPage();
            break;
        case 'contact':
            contactPage();
            break;
        case 'cart':
            cartPage();
            break;
        case 'login':
            loginPage();
            break;
        case 'signup':
            signupPage();
            break;
        default:
            homePage();
    }
};

// --- Event Listeners --- 
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    navigation();
    footer();
    router();
});