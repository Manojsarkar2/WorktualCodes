// Utility Functions
const getStoredTheme = () => localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
const setStoredTheme = theme => localStorage.setItem('theme', theme);

const setTheme = theme => {
    document.documentElement.setAttribute('data-theme', theme);
}

// Theme Management
const themeToggle = document.getElementById('theme-toggle');

const currentTheme = getStoredTheme();
setTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setStoredTheme(newTheme);
});

// Navigation & Routing
const routes = {
    '#home': renderHome,
    '#about': renderAbout,
    '#products': renderProducts,
    '#pricing': renderPricing,
    '#contact': renderContact,
    '#profile': renderProfile,
    '#settings': renderSettings,
    '#login': renderLogin,
    '#signup': renderSignup
};

const defaultRoute = '#home';

const contentDiv = document.getElementById('content');

const renderView = (viewContent) => {
    contentDiv.innerHTML = viewContent;
};

function navigate() {
    const route = window.location.hash || defaultRoute;
    const renderFunction = routes[route] || renderHome; // Default to home if route not found
    renderFunction();
}

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modal
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModalButton = document.querySelector('.close-button');

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function showModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

// Components - Example (Product Card)
const createProductCard = (product) => {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
    `;
};

// Data Fetching (Mock)
async function fetchProducts() {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Views
async function renderHome() {
    renderView(`
        <section class="hero">
            <h1>Welcome to Worktual AI</h1>
            <p>The future of AI solutions for your business.</p>
            <img src="assets/hero.jpg" alt="AI Illustration" style="width:100%; max-height: 400px; object-fit: cover;">
            <button onclick="location.href='#products'">Explore Our Products</button>
        </section>
    `);
}

function renderAbout() {
    renderView(`
        <section>
            <h2>About Us</h2>
            <p>Worktual AI is dedicated to providing cutting-edge AI solutions to businesses of all sizes. Our mission is to empower organizations with the tools they need to thrive in the age of artificial intelligence.</p>
            <p>Founded in 2024, we have quickly become a leader in the AI industry, thanks to our team of experienced engineers, data scientists, and business professionals.</p>
        </section>
    `);
}

async function renderProducts() {
    const products = await fetchProducts();
    const productCards = products.map(product => createProductCard(product)).join('');

    renderView(`
        <section class="product-list">
            <h2>Our Products</h2>
            <div class="search-bar">
                <input type="text" id="product-search" placeholder="Search products...">
            </div>
            <div class="product-grid">
                ${productCards}
            </div>
        </section>
    `);

    // Add search functionality after rendering
    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        const filteredProductCards = filteredProducts.map(product => createProductCard(product)).join('');
        document.querySelector('.product-grid').innerHTML = filteredProductCards;
    });
}

function renderPricing() {
    renderView(`
        <section>
            <h2>Pricing</h2>
            <p>Choose the plan that's right for you.</p>
            <ul>
                <li><b>Basic:</b> $99/month</li>
                <li><b>Pro:</b> $199/month</li>
                <li><b>Enterprise:</b> Contact us for custom pricing</li>
            </ul>
        </section>
    `);
}

function renderContact() {
    renderView(`
        <section>
            <h2>Contact Us</h2>
            <form id="contact-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>

                <button type="submit">Submit</button>
            </form>
        </section>
    `);

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Mock submission handling
        console.log('Form submitted:', { name, email, message });
        showModal('<p>Thank you for your message! We will get back to you soon.</p>');
        contactForm.reset();
    });
}

function renderProfile() {
    // Mock user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    renderView(`
        <section>
            <h2>Your Profile</h2>
            <p><strong>Name:</strong> ${user.name || 'Not set'}</p>
            <p><strong>Email:</strong> ${user.email || 'Not set'}</p>
            <button onclick="showModal('<p>Edit profile functionality coming soon!</p>')">Edit Profile</button>
        </section>
    `);
}

function renderSettings() {
    renderView(`
        <section>
            <h2>Settings</h2>
            <p>Customize your experience.</p>
            <button onclick="showModal('<p>Settings options coming soon!</p>')">Change Settings</button>
        </section>
    `);
}

function renderLogin() {
    renderView(`
        <section>
            <h2>Login</h2>
            <form id="login-form">
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" name="login-email" required>

                <label for="login-password">Password:</label>
                <input type="password" id="login-password" name="login-password" required>

                <button type="submit">Login</button>
            </form>
        </section>
    `);

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Mock authentication
        if (email === 'test@example.com' && password === 'password') {
            localStorage.setItem('user', JSON.stringify({ name: 'Test User', email: email }));
            location.hash = '#profile'; // Redirect to profile
        } else {
            alert('Invalid credentials.');
        }
    });
}

function renderSignup() {
    renderView(`
        <section>
            <h2>Sign Up</h2>
            <form id="signup-form">
                <label for="signup-name">Name:</label>
                <input type="text" id="signup-name" name="signup-name" required>

                <label for="signup-email">Email:</label>
                <input type="email" id="signup-email" name="signup-email" required>

                <label for="signup-password">Password:</label>
                <input type="password" id="signup-password" name="signup-password" required>

                <button type="submit">Sign Up</button>
            </form>
        </section>
    `);

    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Mock signup
        localStorage.setItem('user', JSON.stringify({ name: name, email: email }));
        location.hash = '#profile'; // Redirect to profile
    });
}

function addToCart(productId) {
    showModal(`<p>Product ID ${productId} added to cart! (Mock)</p>`);
}
