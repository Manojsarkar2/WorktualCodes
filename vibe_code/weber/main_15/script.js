// Theme Toggle
const themeToggleButton = document.createElement('button');
themeToggleButton.classList.add('theme-toggle-button');
themeToggleButton.innerHTML = '&#9728;'; // Sun icon

let currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'light') {
    themeToggleButton.innerHTML = '&#127769;'; // Moon icon
}

themeToggleButton.addEventListener('click', () => {
    currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggleButton.innerHTML = '&#127769;'; // Moon icon
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleButton.innerHTML = '&#9728;'; // Sun icon
    }
});

// Hamburger Menu
const hamburger = document.createElement('button');
hamburger.classList.add('hamburger');
hamburger.innerHTML = `<span class="line"></span><span class="line"></span><span class="line"></span>`;

const navLinks = document.createElement('ul');
navLinks.classList.add('nav-links');

// Navigation Data
const navigationData = [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' },
    { text: 'Products', href: '#products' },
    { text: 'Contact', href: '#contact' }
];

navigationData.forEach(navItem => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = navItem.href;
    a.textContent = navItem.text;
    li.appendChild(a);
    navLinks.appendChild(li);
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Navbar Component
async function renderNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    navbarContainer.innerHTML = `
        <nav class="navbar">
            <a href="#home" class="navbar-logo"><img src="assets/logo.png" alt="AI Solutions Logo"></a>
        </nav>
    `;

    const navbar = navbarContainer.querySelector('.navbar');
    navbar.appendChild(navLinks);
    navbar.appendChild(themeToggleButton);
    navbar.appendChild(hamburger);
}

// Footer Component
async function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    footerContainer.innerHTML = `
        <footer>
            <p>&copy; ${new Date().getFullYear()} AI-Powered Solutions. All rights reserved.</p>
        </footer>
    `;
}

// Modal Component
async function renderModal(content) {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <button class="close-button" onclick="closeModal()">×</button>
                ${content}
            </div>
        </div>
    `;
}

function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
}

// Load Views
async function loadView(viewName) {
    const response = await fetch(`views/${viewName}.html`);
    const viewContent = await response.text();
    return viewContent;
}

// Home View
async function renderHomeView() {
    const homeContent = await loadView('home');
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = homeContent;

    // Example: Load hero image dynamically
    const heroImage = document.createElement('img');
    heroImage.src = 'assets/hero-image.jpg';
    heroImage.alt = 'AI Solutions Hero Image';
    heroImage.classList.add('hero-image');
    mainContent.querySelector('.home').appendChild(heroImage);
}

// About View
async function renderAboutView() {
    const aboutContent = await loadView('about');
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = aboutContent;
}

// Products View
async function renderProductsView() {
    const productsContent = await loadView('products');
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = productsContent;

    // Fetch products data from JSON
    const response = await fetch('data/products.json');
    const productsData = await response.json();

    const productGrid = mainContent.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear existing content

    productsData.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="showProductDetails('${product.id}')">View Details</button>
        `;
        productGrid.appendChild(productCard);
    });
}

async function showProductDetails(productId) {
    const response = await fetch('data/products.json');
    const productsData = await response.json();

    const product = productsData.find(p => p.id === productId);

    if (product) {
        const modalContent = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%;">
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="closeModal()">Close</button>
        `;
        renderModal(modalContent);
    } else {
        renderModal('<p>Product not found.</p>');
    }
}

// Contact View
async function renderContactView() {
    const contactContent = await loadView('contact');
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = contactContent;

    const contactForm = mainContent.querySelector('form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Basic form validation (can be expanded)
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');

        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields.');
            return;
        }

        // Store form data (for demonstration purposes)
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        alert('Form submitted successfully!');
        contactForm.reset();
    });
}

// Router
async function router() {
    const route = window.location.hash.substring(1);

    switch (route) {
        case 'about':
            await renderAboutView();
            break;
        case 'products':
            await renderProductsView();
            break;
        case 'contact':
            await renderContactView();
            break;
        case 'home':
        default:
            await renderHomeView();
            break;
    }
}

// Event Listeners
window.addEventListener('hashchange', router);
window.addEventListener('load', async () => {
    await renderNavbar();
    await renderFooter();
    router(); // Initial route load
});