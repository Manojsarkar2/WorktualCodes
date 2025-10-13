// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Function to apply the theme
function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
}

// Function to toggle the theme
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Event listener for the theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);


// Navigation and Routing
const routes = {
    'home': 'home.html',
    'products': 'products.html',
    'contact': 'contact.html',
    'cart': 'cart.html',
    'login': 'login.html',
    'signup': 'signup.html'
};

const contentDiv = document.getElementById('content');

const renderView = async (route) => {
    const filePath = routes[route] || 'home.html';
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }
        const html = await response.text();
        contentDiv.innerHTML = html;

        // Attach event listeners for product cards after content is loaded
        if (route === 'products') {
            attachProductCardListeners();
        } else if (route === 'cart') {
            renderCart();
        }

        if (route === 'login' || route === 'signup') {
            attachFormListeners(route);
        }

    } catch (error) {
        console.error('Error loading page:', error);
        contentDiv.innerHTML = '<p>Error loading page.</p>';
    }
};

const navigate = (route) => {
    history.pushState({ route: route }, '', `#${route}`);
    renderView(route);
};

window.addEventListener('popstate', (event) => {
    const route = event.state ? event.state.route : 'home';
    renderView(route);
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[data-route]');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const route = link.getAttribute('data-route');
            navigate(route);
        });
    });

    // Initial load
    const initialRoute = window.location.hash ? window.location.hash.substring(1) : 'home';
    navigate(initialRoute);

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    updateCartCount();
});

function attachProductCardListeners() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productId = card.dataset.productId;
        const productName = card.querySelector('h3').textContent;
        const productPrice = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
        const buyButton = card.querySelector('.buy-button');

        buyButton.addEventListener('click', () => {
            addToCart(productId, productName, productPrice);
        });
    });
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalElement) {
        console.error('Cart elements not found in the DOM');
        return;
    }

    cartItemsContainer.innerHTML = ''; // Clear existing items

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
            <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(listItem);
    });

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Attach event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeFromCart(productId);
        });
    });
}

function attachFormListeners(route) {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Mock validation and localStorage storage
            if (route === 'login') {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    if (user.email === data.email && user.password === data.password) {
                        alert('Login successful!');
                        localStorage.setItem('session', JSON.stringify({ isLoggedIn: true, email: user.email }));
                        navigate('home');
                    } else {
                        alert('Invalid credentials.');
                    }
                } else {
                    alert('User not found. Please signup.');
                }
            } else if (route === 'signup') {
                localStorage.setItem('user', JSON.stringify(data));
                alert('Signup successful! You can now login.');
                navigate('login');
            }
        });
    }
}

// Modal functionality
function openModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.style.display = 'block';

    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', closeModal);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
