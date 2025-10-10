// Utility functions
const getElement = (selector) => document.querySelector(selector);
const getAllElements = (selector) => document.querySelectorAll(selector);
const createElement = (tag) => document.createElement(tag);

// App State
const state = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    theme: localStorage.getItem('theme') || 'dark',
    products: [],
    cart: []
};

// Modules
const authModule = {
    login: (email, password) => {
        // Mock login
        if (email === 'test@example.com' && password === 'password') {
            const user = { id: 1, email: email, name: 'Test User' };
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
            updateView();
            return true;
        } else {
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('user');
        state.user = null;
        updateView();
    },
    signup: (email, password, name) => {
        // Mock signup
        const user = { id: Date.now(), email: email, name: name };
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
        updateView();
        return true;
    },
    isLoggedIn: () => !!state.user
};

const themeModule = {
    toggleTheme: () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', state.theme);
        document.body.classList.toggle('light-mode', state.theme === 'light');
    },
    applyTheme: () => {
        document.body.classList.toggle('light-mode', state.theme === 'light');
    }
};

const dataModule = {
    fetchProducts: async () => {
        try {
            const response = await fetch('data/products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            state.products = await response.json();
        } catch (error) {
            console.error('Failed to fetch products:', error);
            state.products = []; // Ensure products is always an array, even on failure
        }
    }
};

const cartModule = {
    addToCart: (productId) => {
        const product = state.products.find(p => p.id === productId);
        if (product) {
            state.cart.push(product);
            console.log('Product added to cart:', product);
            // Update cart display or state as needed
        }
    },
    getCart: () => state.cart
};

// Component Rendering
const renderNavbar = () => {
    const isLoggedIn = authModule.isLoggedIn();
    const navbarHTML = `
        <nav class="navbar">
            <a href="#home" class="navbar-brand">Anime Streaming</a>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#contact">Contact</a></li>
                ${isLoggedIn
            ? `<li><a href="#profile">Profile</a></li>
                       <li><a href="#settings">Settings</a></li>
                       <li><a href="#" id="logout-link">Logout</a></li>`
            : `<li><a href="#login">Login</a></li>
                       <li><a href="#signup">Signup</a></li>`}
                <li>
                    <button id="theme-toggle">Toggle Theme</button>
                </li>
            </ul>
            <div class="menu-toggle">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </nav>
    `;
    getElement('#navbar-container').innerHTML = navbarHTML;

    // Attach event listeners after rendering
    getElement('#theme-toggle').addEventListener('click', themeModule.toggleTheme);
    if (isLoggedIn) {
        getElement('#logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            authModule.logout();
        });
    }

    // Mobile menu toggle
    getElement('.menu-toggle').addEventListener('click', () => {
        getElement('.navbar').classList.toggle('active');
    });
};

const renderFooter = () => {
    getElement('#footer-container').innerHTML = `
        <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} Anime Streaming. All rights reserved.</p>
        </footer>
    `;
};

const renderModal = (content) => {
    const modalHTML = `
        <div class="modal" id="modal">
            <div class="modal-content">
                <span class="close-button" id="close-modal">&times;</span>
                ${content}
            </div>
        </div>
    `;
    getElement('#modal-container').innerHTML = modalHTML;
    const modal = getElement('#modal');
    modal.style.display = 'block';
    getElement('#close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// View Rendering
const renderHomeView = () => {
    getElement('#content').innerHTML = `
        <section class="hero">
            <h1>Welcome to Anime Streaming</h1>
            <p>Your ultimate destination for anime entertainment.</p>
            <button class="btn">Explore Now</button>
        </section>
    `;
};

const renderAboutView = () => {
    getElement('#content').innerHTML = `
        <section class="about">
            <h2>About Us</h2>
            <p>We are a team of anime enthusiasts dedicated to providing you with the best streaming experience.</p>
        </section>
    `;
};

const renderProductsView = () => {
    const productsHTML = state.products.map(product => `
        <div class="product-card">
            <img src="${product.image || 'assets/placeholder.jpg'}" alt="${product.title}">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="btn add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');

    getElement('#content').innerHTML = `
        <section class="products">
            <h2>Our Products</h2>
            <div class="products-grid">
                ${productsHTML}
            </div>
        </section>
    `;

    // Attach event listeners after rendering
    getAllElements('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            cartModule.addToCart(productId);
        });
    });
};

const renderProductDetailsView = (productId) => {
    const product = state.products.find(p => p.id === parseInt(productId));
    if (product) {
        getElement('#content').innerHTML = `
            <section class="product-details">
                <h2>${product.title}</h2>
                <img src="${product.image || 'assets/placeholder.jpg'}" alt="${product.title}">
                <p>${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="btn add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </section>
        `;

        // Attach event listener after rendering
        getElement('.add-to-cart').addEventListener('click', () => {
            cartModule.addToCart(product.id);
        });
    } else {
        getElement('#content').innerHTML = `<p>Product not found.</p>`;
    }
};

const renderProfileView = () => {
    if (authModule.isLoggedIn()) {
        const user = JSON.parse(localStorage.getItem('user'));
        getElement('#content').innerHTML = `
            <section class="profile">
                <h2>Profile</h2>
                <p>Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
            </section>
        `;
    } else {
        navigateTo('#login');
    }
};

const renderSettingsView = () => {
    if (authModule.isLoggedIn()) {
        getElement('#content').innerHTML = `
            <section class="settings">
                <h2>Settings</h2>
                <p>Theme: ${state.theme}</p>
                <button id="change-password" class="btn">Change Password</button>
            </section>
        `;

        getElement('#change-password').addEventListener('click', () => {
            renderModal(`
                <h3>Change Password</h3>
                <form id="change-password-form">
                    <div class="form-group">
                        <label for="old-password">Old Password</label>
                        <input type="password" id="old-password" required>
                    </div>
                    <div class="form-group">
                        <label for="new-password">New Password</label>
                        <input type="password" id="new-password" required>
                    </div>
                    <button type="submit" class="btn">Change Password</button>
                </form>
            `);

            getElement('#change-password-form').addEventListener('submit', (e) => {
                e.preventDefault();
                // Handle password change logic here
                alert('Password change functionality not implemented.');
                getElement('#modal').style.display = 'none';
            });
        });
    } else {
        navigateTo('#login');
    }
};

const renderContactView = () => {
    getElement('#content').innerHTML = `
        <section class="contact">
            <h2>Contact Us</h2>
            <form id="contact-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn">Submit</button>
            </form>
        </section>
    `;

    getElement('#contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Form submission functionality not implemented.');
    });
};

const renderLoginView = () => {
    getElement('#content').innerHTML = `
        <section class="login">
            <h2>Login</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn">Login</button>
            </form>
        </section>
    `;

    getElement('#login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = getElement('#email').value;
        const password = getElement('#password').value;
        if (authModule.login(email, password)) {
            navigateTo('#profile');
        } else {
            alert('Invalid credentials.');
        }
    });
};

const renderSignupView = () => {
    getElement('#content').innerHTML = `
        <section class="signup">
            <h2>Signup</h2>
            <form id="signup-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn">Signup</button>
            </form>
        </section>
    `;

    getElement('#signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = getElement('#name').value;
        const email = getElement('#email').value;
        const password = getElement('#password').value;
        if (authModule.signup(email, password, name)) {
            navigateTo('#profile');
        } else {
            alert('Signup failed.');
        }
    });
};

// Routing
const routes = {
    '#home': renderHomeView,
    '#about': renderAboutView,
    '#products': renderProductsView,
    '#product-details': renderProductDetailsView,
    '#profile': renderProfileView,
    '#settings': renderSettingsView,
    '#contact': renderContactView,
    '#login': renderLoginView,
    '#signup': renderSignupView
};

const navigateTo = (route) => {
    window.location.hash = route;
    updateView();
};

const updateView = () => {
    const route = window.location.hash || '#home';
    const [baseRoute, productId] = route.split('?');

    if (baseRoute === '#product-details' && productId) {
        routes[baseRoute](productId);
    } else if (routes[baseRoute]) {
        routes[baseRoute]();
    } else {
        getElement('#content').innerHTML = `<p>Page not found.</p>`;
    }
};

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
    await dataModule.fetchProducts();
    themeModule.applyTheme();
    renderNavbar();
    renderFooter();
    updateView();

    window.addEventListener('hashchange', updateView);
});
