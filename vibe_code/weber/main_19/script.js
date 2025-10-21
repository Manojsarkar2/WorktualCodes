// State Management
const appState = {
    theme: localStorage.getItem('theme') || 'light',
    user: JSON.parse(localStorage.getItem('user')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    partners: [
        { id: 1, name: 'Alice Johnson', age: 32, location: 'New York', interests: ['hiking', 'reading'] },
        { id: 2, name: 'Bob Smith', age: 28, location: 'Los Angeles', interests: ['movies', 'travel'] },
        { id: 3, name: 'Charlie Brown', age: 35, location: 'Chicago', interests: ['cooking', 'music'] },
        { id: 4, name: 'Diana Miller', age: 29, location: 'Houston', interests: ['sports', 'art'] },
        { id: 5, name: 'Ethan Davis', age: 31, location: 'Phoenix', interests: ['gaming', 'photography'] },
        { id: 6, name: 'Fiona Wilson', age: 27, location: 'Philadelphia', interests: ['dancing', 'writing'] },
        { id: 7, name: 'George Moore', age: 33, location: 'San Antonio', interests: ['yoga', 'gardening'] },
        { id: 8, name: 'Hannah Taylor', age: 26, location: 'San Diego', interests: ['swimming', 'painting'] },
        { id: 9, name: 'Isaac Clark', age: 34, location: 'Dallas', interests: ['cycling', 'sculpting'] },
        { id: 10, name: 'Julia White', age: 30, location: 'San Jose', interests: ['running', 'pottery'] }
    ],
    products: [
        { id: 1, name: 'Elegant Diamond Ring', price: 1200.00, description: 'A timeless symbol of commitment.' },
        { id: 2, name: 'Classic Pearl Necklace', price: 450.00, description: 'Perfect for any special occasion.' },
        { id: 3, name: 'Stylish Cufflinks Set', price: 180.00, description: 'Add a touch of sophistication to your attire.' },
        { id: 4, name: 'Heart-Shaped Pendant', price: 320.00, description: 'A beautiful expression of love.' },
        { id: 5, name: 'Luxury Watch', price: 850.00, description: 'A statement of style and precision.' },
        { id: 6, name: 'Designer Handbag', price: 600.00, description: 'The perfect accessory for any outfit.' },
        { id: 7, name: 'Silk Scarf', price: 90.00, description: 'Add a pop of color and elegance.' },
        { id: 8, name: 'Leather Wallet', price: 120.00, description: 'A practical and stylish essential.' },
        { id: 9, name: 'Sunglasses', price: 150.00, description: 'Protect your eyes in style.' },
        { id: 10, name: 'Perfume Set', price: 250.00, description: 'A captivating fragrance for any occasion.' },
        { id: 11, name: 'Gold Bracelet', price: 550.00, description: 'A timeless piece of jewelry.' },
        { id: 12, name: 'Silver Earrings', price: 220.00, description: 'Elegant and versatile.' },
        { id: 13, name: 'Tie Clip', price: 75.00, description: 'A subtle touch of class.' },
        { id: 14, name: 'Pocket Square', price: 45.00, description: 'Add flair to your suit.' },
        { id: 15, name: 'Bow Tie', price: 60.00, description: 'A classic and stylish accessory.' },
        { id: 16, name: 'Belt', price: 80.00, description: 'A must-have for any wardrobe.' },
        { id: 17, name: 'Gloves', price: 100.00, description: 'Keep your hands warm in style.' },
        { id: 18, name: 'Hat', price: 70.00, description: 'Add a touch of personality to your look.' },
        { id: 19, name: 'Socks', price: 30.00, description: 'Comfortable and stylish.' },
        { id: 20, name: 'Shoes', price: 200.00, description: 'The perfect finishing touch to any outfit.' },
        { id: 21, name: 'Diamond Stud Earrings', price: 900.00, description: 'Classic and elegant for any occasion.' },
        { id: 22, name: 'Sapphire Ring', price: 750.00, description: 'A stunning blue gemstone ring.' },
        { id: 23, name: 'Emerald Pendant', price: 600.00, description: 'A vibrant green pendant necklace.' },
        { id: 24, name: 'Ruby Bracelet', price: 800.00, description: 'A passionate red bracelet.' },
        { id: 25, name: 'Amethyst Earrings', price: 450.00, description: 'A beautiful purple gemstone earring.' },
        { id: 26, name: 'Topaz Necklace', price: 500.00, description: 'A radiant blue topaz necklace.' },
        { id: 27, name: 'Garnet Ring', price: 550.00, description: 'A deep red garnet ring.' },
        { id: 28, name: 'Peridot Pendant', price: 400.00, description: 'A bright green peridot pendant.' },
        { id: 29, name: 'Aquamarine Earrings', price: 480.00, description: 'A serene blue aquamarine earring.' },
        { id: 30, name: 'Citrine Bracelet', price: 520.00, description: 'A sunny yellow citrine bracelet.' }
    ],
    searchTerm: ''
};

// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem('theme', appState.theme);
    localStorage.setItem('user', JSON.stringify(appState.user));
    localStorage.setItem('cart', JSON.stringify(appState.cart));
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
    appState.theme = theme;
    document.documentElement.className = theme === 'dark' ? 'dark-mode' : '';
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    updateLocalStorage();
}

themeToggle.addEventListener('click', () => {
    setTheme(appState.theme === 'light' ? 'dark' : 'light');
});

// Apply initial theme
setTheme(appState.theme);

// Navigation
const contentDiv = document.getElementById('content');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navLinksList = document.querySelector('.nav-links');

function loadContent(route) {
    fetch(`${route}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            contentDiv.innerHTML = html;
            // Re-attach event listeners for dynamic content
            if (route === 'partners') {
                attachPartnerEventListeners();
            }
            if (route === 'cart') {
                renderCart();
            }
            if (route === 'profile') {
                renderProfile();
            }
            if (route === 'home') {
                renderHome();
            }
            if (route === 'login') {
                attachLoginListeners();
            }
            if (route === 'signup') {
                attachSignupListeners();
            }
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            contentDiv.innerHTML = '<p>Error loading content.</p>';
        });
}

// Initial content load (Home page)
loadContent('home');

// Event listener for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const route = link.getAttribute('data-route');
        loadContent(route);

        // Close hamburger menu after clicking a link (mobile view)
        if (navLinksList.classList.contains('show')) {
            navLinksList.classList.remove('show');
        }
    });
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLinksList.classList.toggle('show');
});

// Modal
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModalButton = document.querySelector('.close-button');

function openModal(content) {
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

closeModalButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Partners Page
function renderPartners() {
    const partnersHtml = `
        <div class="partner-grid">
            ${appState.partners.map(partner => `
                <div class="partner-card">
                    <h3>${partner.name}</h3>
                    <p>Age: ${partner.age}</p>
                    <p>Location: ${partner.location}</p>
                    <p>Interests: ${partner.interests.join(', ')}</p>
                    <button data-partner-id="${partner.id}">View Profile</button>
                </div>
            `).join('')}
        </div>
    `;
    contentDiv.innerHTML = partnersHtml;
    attachPartnerEventListeners();
}

function attachPartnerEventListeners() {
    const partnerButtons = document.querySelectorAll('.partner-card button');
    partnerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const partnerId = parseInt(button.getAttribute('data-partner-id'));
            const partner = appState.partners.find(p => p.id === partnerId);
            if (partner) {
                openModal(`
                    <h2>${partner.name}</h2>
                    <p>Age: ${partner.age}</p>
                    <p>Location: ${partner.location}</p>
                    <p>Interests: ${partner.interests.join(', ')}</p>
                    <button onclick="closeModal()">Close</button>
                `);
            }
        });
    });
}

// Cart Page
function renderCart() {
    let cartItemsHtml = '<ul class="cart-items">';
    let total = 0;

    if (appState.cart.length === 0) {
        cartItemsHtml += '<li>Your cart is empty.</li>';
    } else {
        appState.cart.forEach(item => {
            total += item.price * item.quantity;
            cartItemsHtml += `
                <li class="cart-item">
                    <span>${item.name} (${item.quantity})</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button data-product-id="${item.id}" class="remove-from-cart">Remove</button>
                </li>
            `;
        });
    }

    cartItemsHtml += '</ul>';
    cartItemsHtml += `<div class="cart-total">Total: $${total.toFixed(2)}</div>`;
    cartItemsHtml += '<button onclick="checkout()">Checkout</button>';

    contentDiv.innerHTML = cartItemsHtml;

    // Attach event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            removeFromCart(productId);
        });
    });
}

function addToCart(productId) {
    const product = appState.products.find(p => p.id === productId);
    if (product) {
        const existingItem = appState.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            appState.cart.push({ ...product, quantity: 1 });
        }
        updateLocalStorage();
        renderCart(); // Re-render the cart to update the display
    }
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    updateLocalStorage();
    renderCart(); // Re-render the cart to update the display
}

function checkout() {
    if (appState.cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    // Mock checkout process
    alert('Thank you for your purchase!');
    appState.cart = []; // Clear the cart
    updateLocalStorage();
    renderCart(); // Re-render the cart to update the display
}

// Profile Page
function renderProfile() {
    if (!appState.user) {
        contentDiv.innerHTML = '<p>Please <a href="#login" data-route="login">login</a> to view your profile.</p>';
        return;
    }

    const profileHtml = `
        <div class="profile-info">
            <h2>Welcome, ${appState.user.firstName} ${appState.user.lastName}!</h2>
            <div class="profile-details">
                <p>Email: ${appState.user.email}</p>
                <p>Location: ${appState.user.location || 'Not specified'}</p>
            </div>
            <button onclick="logout()">Logout</button>
        </div>
    `;
    contentDiv.innerHTML = profileHtml;
}

function logout() {
    appState.user = null;
    updateLocalStorage();
    loadContent('home'); // Redirect to home page after logout
}

// Home Page
function renderHome() {
    const homeHtml = `
        <div class="home-content">
            <h1>Find Your Perfect Match</h1>
            <p>Welcome to MatchMade, the premier online dating platform designed to help you find meaningful connections.</p>
            <p>Join our community and start your journey towards finding love today!</p>

            <section class="featured-products">
                <h2>Featured Products</h2>
                <div class="product-grid">
                    ${appState.products.slice(0, 6).map(product => `
                        <div class="product-card">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Price: $${product.price.toFixed(2)}</p>
                            <button data-product-id="${product.id}" class="add-to-cart">Add to Cart</button>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `;
    contentDiv.innerHTML = homeHtml;

    // Attach event listeners to add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
}

// Login Page
function attachLoginListeners() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;

            // Mock authentication
            if (email === 'test@example.com' && password === 'password') {
                appState.user = { firstName: 'Test', lastName: 'User', email: email };
                updateLocalStorage();
                loadContent('profile'); // Redirect to profile page after login
            } else {
                alert('Invalid credentials.');
            }
        });
    }
}

// Signup Page
function attachSignupListeners() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const firstName = signupForm.querySelector('#firstName').value;
            const lastName = signupForm.querySelector('#lastName').value;
            const email = signupForm.querySelector('#email').value;
            const password = signupForm.querySelector('#password').value;

            // Mock signup
            appState.user = { firstName: firstName, lastName: lastName, email: email };
            updateLocalStorage();
            loadContent('profile'); // Redirect to profile page after signup
        });
    }
}
