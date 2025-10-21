// State Management
const state = {
    theme: localStorage.getItem('theme') || 'light',
    user: JSON.parse(localStorage.getItem('user')) || null,
    products: [],
    cart: []
};

// DOM Elements
const contentDiv = document.getElementById('content');
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModalButton = document.querySelector('.close-button');

// Utility Functions
const updateTheme = (theme) => {
    state.theme = theme;
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
};

const showModal = (content) => {
    modalBody.innerHTML = content;
    modal.style.display = 'block';
};

const hideModal = () => {
    modal.style.display = 'none';
};

const fetchProducts = async () => {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        state.products = await response.json();
    } catch (error) {
        console.error('Could not fetch products:', error);
        state.products = []; // Ensure products is always an array, even on failure
    }
};

// Render Functions
const renderHomeView = () => {
    contentDiv.innerHTML = `
        <section class="hero">
            <h1>Welcome to Worktual AI</h1>
            <p>Your partner in AI solutions.</p>
            <button onclick="navigateTo('#products')">Explore Products</button>
        </section>
    `;
};

const renderAboutView = () => {
    contentDiv.innerHTML = `
        <section>
            <h2>About Us</h2>
            <p>Worktual AI is dedicated to providing innovative AI solutions for businesses of all sizes.</p>
        </section>
    `;
};

const renderProductsView = () => {
    let productCards = state.products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button onclick="showProductDetails('${product.id}')">View Details</button>
        </div>
    `).join('');

    contentDiv.innerHTML = `
        <section>
            <h2>Our Products</h2>
            <div class="product-grid">
                ${productCards}
            </div>
        </section>
    `;
};

const renderContactView = () => {
    contentDiv.innerHTML = `
        <section>
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
        </section>
    `;

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Basic validation
        if (contactForm.checkValidity()) {
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            console.log('Form submitted:', formValues);
            showModal('<p>Thank you for your message!</p>');
            contactForm.reset();
        } else {
            alert('Please fill out all required fields.');
        }
    });
};

const renderProfileView = () => {
    if (!state.user) {
        contentDiv.innerHTML = `<p>Please <a href="#login" onclick="navigateTo('#login')">login</a> to view your profile.</p>`;
        return;
    }

    contentDiv.innerHTML = `
        <section>
            <h2>Your Profile</h2>
            <p>Username: ${state.user.username}</p>
            <p>Email: ${state.user.email}</p>
            <button onclick="logout()">Logout</button>
        </section>
    `;
};

const renderSettingsView = () => {
    contentDiv.innerHTML = `
        <section>
            <h2>Settings</h2>
            <p>Theme: ${state.theme}</p>
            <button id="reset-settings">Reset Settings</button>
        </section>
    `;

    document.getElementById('reset-settings').addEventListener('click', () => {
        localStorage.clear();
        updateTheme('light');
        state.user = null;
        navigateTo('#home');
    });
};

const renderLoginView = () => {
    contentDiv.innerHTML = `
        <section>
            <h2>Login</h2>
            <form id="login-form">
                <label for="login-username">Username:</label>
                <input type="text" id="login-username" name="username" required>

                <label for="login-password">Password:</label>
                <input type="password" id="login-password" name="password" required>

                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#signup" onclick="navigateTo('#signup')">Sign up</a></p>
        </section>
    `;

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const formValues = Object.fromEntries(formData.entries());

        // Mock authentication
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.username === formValues.username && storedUser.password === formValues.password) {
            state.user = storedUser;
            localStorage.setItem('user', JSON.stringify(storedUser));
            navigateTo('#profile');
        } else {
            alert('Invalid credentials.');
        }
    });
};

const renderSignupView = () => {
    contentDiv.innerHTML = `
        <section>
            <h2>Sign Up</h2>
            <form id="signup-form">
                <label for="signup-username">Username:</label>
                <input type="text" id="signup-username" name="username" required>

                <label for="signup-email">Email:</label>
                <input type="email" id="signup-email" name="email" required>

                <label for="signup-password">Password:</label>
                <input type="password" id="signup-password" name="password" required>

                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="#login" onclick="navigateTo('#login')">Login</a></p>
        </section>
    `;

    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(signupForm);
        const formValues = Object.fromEntries(formData.entries());

        localStorage.setItem('user', JSON.stringify(formValues));
        state.user = formValues;
        navigateTo('#profile');
    });
};

const renderProductDetailsView = (productId) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) {
        contentDiv.innerHTML = `<p>Product not found.</p>`;
        return;
    }

    contentDiv.innerHTML = `
        <section>
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        </section>
    `;
};

// Route Handling
const routes = {
    '#home': renderHomeView,
    '#about': renderAboutView,
    '#products': renderProductsView,
    '#contact': renderContactView,
    '#profile': renderProfileView,
    '#settings': renderSettingsView,
    '#login': renderLoginView,
    '#signup': renderSignupView
};

const navigateTo = (route) => {
    if (routes[route]) {
        routes[route]();
    } else if (route.startsWith('#product/')) {
        const productId = route.split('/')[1];
        renderProductDetailsView(productId);
    } else {
        contentDiv.innerHTML = `<p>Page not found.</p>`;
    }
    window.location.hash = route;
};

// Event Listeners
themeToggle.addEventListener('click', () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

closeModalButton.addEventListener('click', hideModal);

window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
});

// Global Functions (for onclick)
window.showProductDetails = (productId) => {
    navigateTo(`#product/${productId}`);
};

window.addToCart = (productId) => {
    const product = state.products.find(p => p.id === productId);
    if (product) {
        state.cart.push(product);
        showModal(`<p>${product.name} added to cart!</p>`);
    }
};

window.logout = () => {
    state.user = null;
    localStorage.removeItem('user');
    navigateTo('#home');
};

// Initialization
const init = async () => {
    updateTheme(state.theme);
    await fetchProducts();
    if (window.location.hash) {
        navigateTo(window.location.hash);
    } else {
        navigateTo('#home');
    }
};

init();