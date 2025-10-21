// App State
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
const setDocumentTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
};

const saveState = () => {
    localStorage.setItem('theme', state.theme);
    localStorage.setItem('user', JSON.stringify(state.user));
};

const showModal = (content) => {
    modalBody.innerHTML = content;
    modal.style.display = 'block';
};

const hideModal = () => {
    modal.style.display = 'none';
};

const loadProducts = async () => {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        state.products = await response.json();
    } catch (error) {
        console.error('Failed to load products:', error);
        contentDiv.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
};

// Event Listeners
themeToggle.addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    setDocumentTheme(state.theme);
    saveState();
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

closeModalButton.addEventListener('click', hideModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

// Navigation
const navigate = (route) => {
    switch (route) {
        case 'home':
            renderHomeView();
            break;
        case 'products':
            renderProductsView();
            break;
        case 'product-details':
            renderProductDetailsView();
            break;
        case 'about':
            renderAboutView();
            break;
        case 'contact':
            renderContactView();
            break;
        case 'profile':
            renderProfileView();
            break;
        case 'settings':
            renderSettingsView();
            break;
        case 'login':
            renderLoginView();
            break;
        case 'signup':
            renderSignupView();
            break;
        case 'cart':
            renderCartView();
            break;
        default:
            contentDiv.innerHTML = '<h2>404 Not Found</h2>';
    }
    navLinks.classList.remove('active'); // Close nav on mobile after navigation
};

window.addEventListener('hashchange', () => {
    const route = window.location.hash.substring(1); // Remove the '#' character
    navigate(route);
});

// View Rendering Functions
const renderHomeView = () => {
    contentDiv.innerHTML = `
        <section class="hero">
            <h1>Welcome to E-Shop</h1>
            <p>Your one-stop shop for everything you need.</p>
            <button class="glowing-button">Shop Now</button>
        </section>
        <section class="featured-products">
            <h2>Featured Products</h2>
            <div class="product-grid">
                <!-- Placeholder for featured products -->
            </div>
        </section>
    `;
};

const renderProductsView = () => {
    let productsHTML = '<div class="product-grid">';
    state.products.forEach(product => {
        productsHTML += `
            <div class="glassmorphism-card product-item">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button class="glowing-button" data-product-id="${product.id}">View Details</button>
            </div>
        `;
    });
    productsHTML += '</div>';
    contentDiv.innerHTML = `
        <h2>Products</h2>
        ${productsHTML}
    `;

    // Attach event listeners to the view details buttons
    document.querySelectorAll('.product-item .glowing-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            window.location.hash = `product-details?id=${productId}`;
        });
    });
};

const getProductIdFromHash = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(hash.indexOf('?') + 1));
    return params.get('id');
};

const renderProductDetailsView = () => {
    const productId = getProductIdFromHash();
    const product = state.products.find(p => p.id === productId);

    if (!product) {
        contentDiv.innerHTML = '<h2>Product Not Found</h2>';
        return;
    }

    contentDiv.innerHTML = `
        <div class="glassmorphism-card">
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="glowing-button">Add to Cart</button>
        </div>
    `;
};

const renderAboutView = () => {
    contentDiv.innerHTML = `
        <div class="glassmorphism-card">
            <h2>About Us</h2>
            <p>Learn more about our company and mission.</p>
        </div>
    `;
};

const renderContactView = () => {
    contentDiv.innerHTML = `
        <div class="glassmorphism-card">
            <h2>Contact Us</h2>
            <form id="contact-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br><br>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>

                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea><br><br>

                <button type="submit" class="glowing-button">Submit</button>
            </form>
        </div>
    `;

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Store form data (in localStorage for demo purposes)
        const formData = {
            name: name,
            email: email,
            message: message
        };
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        alert('Form submitted!');
        contactForm.reset();
    });
};

const renderProfileView = () => {
    if (!state.user) {
        showModal('<p>Please login to view your profile.</p><button class="glowing-button" onclick="window.location.hash=\'login\'">Login</button>');
        return;
    }

    contentDiv.innerHTML = `
        <div class="glassmorphism-card">
            <h2>Profile</h2>
            <p>Welcome, ${state.user.username}!</p>
            <button class="glowing-button" onclick="logout()">Logout</button>
        </div>
    `;
};

const renderSettingsView = () => {
    contentDiv.innerHTML = `
        <div class="glassmorphism-card">
            <h2>Settings</h2>
            <p>Customize your experience.</p>
        </div>
    `;
};

const renderLoginView = () => {
    contentDiv.innerHTML = `
        <div class="glassmorphism-card">
            <h2>Login</h2>
            <form id="login-form">
                <label for="login-username">Username:</label>
                <input type="text" id="login-username" name="username" required><br><br>

                <label for="login-password">Password:</label>
                <input type="password" id="login-password" name="password" required><br><br>

                <button type="submit" class="glowing-button">Login</button>
            </form>
        </div>
    `;

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Mock authentication
        if (username === 'user' && password === 'password') {
            state.user = { username: username };
            saveState();
            window.location.hash = 'profile';
        } else {
            alert('Invalid credentials.');
        }
    });
};

const renderSignupView = () => {
    contentDiv.innerHTML = `
        <div class="glassmorphism-card">
            <h2>Sign Up</h2>
            <form id="signup-form">
                <label for="signup-username">Username:</label>
                <input type="text" id="signup-username" name="username" required><br><br>

                <label for="signup-password">Password:</label>
                <input type="password" id="signup-password" name="password" required><br><br>

                <button type="submit" class="glowing-button">Sign Up</button>
            </form>
        </div>
    `;

    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        // Store user data (in localStorage for demo purposes)
        const userData = {
            username: username,
            password: password // In real app, hash the password!
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        alert('Signed up successfully!');
        window.location.hash = 'login';
    });
};

const renderCartView = () => {
    contentDiv.innerHTML = `
        <div class="glassmorphism-card">
            <h2>Shopping Cart</h2>
            <p>Your selected items.</p>
        </div>
    `;
};

// Logout function
const logout = () => {
    state.user = null;
    localStorage.removeItem('user');
    window.location.hash = 'home';
};

// Initialization
const init = () => {
    setDocumentTheme(state.theme);
    loadProducts();
    const initialRoute = window.location.hash.substring(1) || 'home';
    navigate(initialRoute);
};

init();