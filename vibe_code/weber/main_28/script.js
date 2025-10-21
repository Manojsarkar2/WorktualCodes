const contentDiv = document.getElementById('content');
const navLinks = document.querySelectorAll('nav a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const cartCountSpan = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart') || '[]');
updateCartCount();

// Theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.dataset.theme || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

function setTheme(theme) {
    body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    document.documentElement.setAttribute('data-theme', theme);
}

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = link.dataset.page;
        loadContent(page);
    });
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Load initial content
loadContent('home');

async function loadContent(page) {
    let content = '';

    switch (page) {
        case 'home':
            content = `
                <section class="hero">
                    <h1>Welcome to Anime Haven</h1>
                    <p>Your ultimate destination for all things anime!</p>
                </section>
                <section class="featured-products">
                    <h2>Featured Anime</h2>
                    <div class="products-grid">
                        ${generateProductCards(getFeaturedProducts())}
                    </div>
                </section>
            `;
            break;
        case 'products':
            content = `
                <h2>All Anime</h2>
                <div class="products-grid">
                    ${generateProductCards(getAllProducts())}
                </div>
            `;
            break;
        case 'contact':
            content = `
                <h2>Contact Us</h2>
                <form id="contact-form">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="4" required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            `;
            break;
        case 'login':
            content = `
                <h2>Login</h2>
                <form id="login-form">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>

                    <button type="submit">Login</button>
                </form>
            `;
            break;
        case 'signup':
            content = `
                <h2>Sign Up</h2>
                <form id="signup-form">
                    <label for="new-username">Username:</label>
                    <input type="text" id="new-username" name="new-username" required>

                    <label for="new-email">Email:</label>
                    <input type="email" id="new-email" name="new-email" required>

                    <label for="new-password">Password:</label>
                    <input type="password" id="new-password" name="new-password" required>

                    <button type="submit">Sign Up</button>
                </form>
            `;
            break;
        case 'cart':
            content = `
                <h2>Shopping Cart</h2>
                <div id="cart-items">
                    ${generateCartItems()}
                </div>
                <p>Total: $<span id="cart-total">${calculateTotal()}</span></p>
                <button id="checkout-button">Checkout</button>
            `;
            break;
        default:
            content = '<h2>Page Not Found</h2><p>Sorry, the page you are looking for does not exist.</p>';
    }

    contentDiv.innerHTML = content;

    // Re-attach event listeners for forms
    if (page === 'contact') {
        document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    } else if (page === 'login') {
        document.getElementById('login-form').addEventListener('submit', handleLoginForm);
    } else if (page === 'signup') {
        document.getElementById('signup-form').addEventListener('submit', handleSignupForm);
    }

    if (page === 'cart') {
        document.getElementById('checkout-button').addEventListener('click', handleCheckout);
    }

    navMenu.classList.remove('active'); // Close the menu after navigation
}

// Form Handlers
function handleContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Store in localStorage (for demo purposes)
    const contactData = {
        name: name,
        email: email,
        message: message,
    };
    localStorage.setItem('contactData', JSON.stringify(contactData));

    alert('Message sent! (Data stored in localStorage)');
}

function handleLoginForm(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock authentication (replace with real authentication)
    if (username === 'user' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        alert('Login successful!');
        loadContent('home'); // Redirect to home
    } else {
        alert('Invalid username or password.');
    }
}

function handleSignupForm(event) {
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;

    // Basic validation
    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Store in localStorage (for demo purposes)
    const userData = {
        username: username,
        email: email,
        password: password,
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Sign up successful! (Data stored in localStorage)');
}

// Product Data (Mock)
function getFeaturedProducts() {
    return [
        { id: 1, name: 'Attack on Titan - Eren Yeager Figure', price: 89.99 },
        { id: 2, name: 'One Piece - Luffy Gear 4 Statue', price: 129.99 },
        { id: 3, name: 'Naruto Shippuden - Naruto Uzumaki Sage Mode', price: 99.99 },
    ];
}

function getAllProducts() {
    return [
        { id: 4, name: 'Demon Slayer - Tanjiro Kamado Nendoroid', price: 59.99 },
        { id: 5, name: 'My Hero Academia - Izuku Midoriya Figma', price: 79.99 },
        { id: 6, name: 'Hunter x Hunter - Gon Freecss Action Figure', price: 69.99 },
        { id: 7, name: 'Fullmetal Alchemist - Edward Elric Collectible', price: 109.99 },
        { id: 8, name: 'Tokyo Ghoul - Ken Kaneki Mask', price: 39.99 },
        { id: 9, name: 'Sword Art Online - Kirito and Asuna Set', price: 149.99 },
    ];
}

function generateProductCards(products) {
    return products.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: id, name: name, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (document.getElementById('cart-items')) {
        document.getElementById('cart-items').innerHTML = generateCartItems();
        document.getElementById('cart-total').textContent = calculateTotal();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    document.getElementById('cart-items').innerHTML = generateCartItems();
    document.getElementById('cart-total').textContent = calculateTotal();
}

function updateCartCount() {
    let count = 0;
    cart.forEach(item => count += item.quantity);
    cartCountSpan.textContent = count;
}

function generateCartItems() {
    if (cart.length === 0) {
        return '<p>Your cart is empty.</p>';
    }

    return cart.map(item => `
        <div class="cart-item">
            <span>${item.name} (${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

function calculateTotal() {
    let total = 0;
    cart.forEach(item => total += item.price * item.quantity);
    return total.toFixed(2);
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    // Mock checkout process
    alert('Checkout successful! Total: $' + calculateTotal());
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    loadContent('home'); // Redirect to home
}

// Modal
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function openModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}
