// Helper function to load content
async function loadContent(page) {
    try {
        const response = await fetch(`${page}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        document.getElementById('content').innerHTML = text;

        // Initialize components based on the loaded page
        if (page === 'products') {
            initializeProducts();
        } else if (page === 'cart') {
            renderCart();
        } else if (page === 'login' || page === 'signup') {
            initializeForms(page);
        }
    } catch (error) {
        console.error('Failed to load page:', error);
        document.getElementById('content').innerHTML = '<p>Failed to load content.</p>';
    }
}

// Function to handle routing
function handleRoute(hash) {
    const page = hash.substring(1) || 'home'; // Remove the '#' and default to 'home'
    loadContent(page);
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

// Initialize dark mode based on localStorage
function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close the hamburger menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});

// Product-related functions
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function renderCart() {
    const cartItemsElement = document.querySelector('.cart-items');
    if (!cartItemsElement) return;

    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsElement.appendChild(li);
        total += item.price;
    });

    const totalElement = document.createElement('li');
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartItemsElement.appendChild(totalElement);

    // Add checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.onclick = () => alert('Checkout functionality not implemented.');
    cartItemsElement.appendChild(checkoutButton);
}


function initializeProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    const products = [
        { id: 1, name: 'Samsung Galaxy S21', price: 799 },
        { id: 2, name: 'iPhone 13', price: 899 },
        { id: 3, name: 'Google Pixel 6', price: 699 },
        { id: 4, name: 'OnePlus 9 Pro', price: 749 },
        { id: 5, name: 'Xiaomi 11T Pro', price: 649 },
        { id: 6, name: 'Oppo Find X3 Pro', price: 849 },
        { id: 7, name: 'Vivo X70 Pro+', price: 799 },
        { id: 8, name: 'Realme GT Master Edition', price: 399 },
        { id: 9, name: 'Motorola Edge 20 Pro', price: 699 },
        { id: 10, name: 'Nokia XR20', price: 499 },
        { id: 11, name: 'Sony Xperia 1 III', price: 1199 },
        { id: 12, name: 'Asus ROG Phone 5', price: 999 },
        { id: 13, name: 'LG Velvet', price: 599 },
        { id: 14, name: 'Huawei P40 Pro', price: 799 },
        { id: 15, name: 'Honor Magic3 Pro', price: 899 },
        { id: 16, name: 'Samsung Galaxy Watch 4', price: 349 },
        { id: 17, name: 'Apple Watch Series 7', price: 399 },
        { id: 18, name: 'Fitbit Sense', price: 299 },
        { id: 19, name: 'Garmin Venu 2', price: 349 },
        { id: 20, name: 'Xiaomi Mi Band 6', price: 49 },
        { id: 21, name: 'Samsung 55" 4K TV', price: 699 },
        { id: 22, name: 'LG 65" OLED TV', price: 1799 },
        { id: 23, name: 'Sony 50" LED TV', price: 599 },
        { id: 24, name: 'TCL 75" QLED TV', price: 1299 },
        { id: 25, name: 'Hisense 43" Smart TV', price: 349 },
        { id: 26, name: 'Dell XPS 13', price: 1199 },
        { id: 27, name: 'MacBook Air M1', price: 999 },
        { id: 28, name: 'HP Spectre x360', price: 1299 },
        { id: 29, name: 'Lenovo ThinkPad X1 Carbon', price: 1499 },
        { id: 30, name: 'Microsoft Surface Laptop 4', price: 1099 }
    ];

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick='addToCart({ id: ${product.id}, name: "${product.name}", price: ${product.price} })'>Add to Cart</button>
            <button onclick='buyNow({ id: ${product.id}, name: "${product.name}", price: ${product.price} })'>Buy Now</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function buyNow(product) {
    // Implement buy now functionality here
    alert(`Buy Now clicked for ${product.name}!`);
}

// Form validation and submission
function initializeForms(page) {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        // Basic client-side validation
        if (!userData.username || !userData.password) {
            alert('Please fill in all fields.');
            return;
        }

        // Store user data in localStorage (for mock purposes)
        localStorage.setItem('user', JSON.stringify(userData));
        alert(`${page === 'login' ? 'Login' : 'Signup'} successful!`);

        // Redirect to home page after successful login/signup
        window.location.hash = '#home';
    });
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initial load
    handleRoute(window.location.hash);

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        handleRoute(window.location.hash);
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleDarkMode);

    // Initialize dark mode
    initializeDarkMode();

    // Initialize cart count
    updateCartCount();

    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        // Implement search filtering logic here
        console.log('Search term:', searchTerm);
    });
});
