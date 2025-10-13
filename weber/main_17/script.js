const contentDiv = document.getElementById('content');
const themeToggle = document.getElementById('theme-toggle');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModalButton = document.querySelector('.close-button');
const searchInput = document.getElementById('search-input');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

let products = [
    { id: 1, name: 'Artisan Burger', description: 'Juicy beef patty with gourmet toppings.', price: '$12.99' },
    { id: 2, name: 'Spicy Margarita', description: 'Tequila, lime, and a hint of chili.', price: '$8.99' },
    { id: 3, name: 'Vegan Pizza', description: 'Plant-based cheese and fresh vegetables.', price: '$15.99' },
    { id: 4, name: 'Iced Coffee', description: 'Freshly brewed coffee served over ice.', price: '$4.99' },
    { id: 5, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center.', price: '$7.99' }
];

// Function to fetch content from HTML files
async function fetchContent(page) {
    try {
        const response = await fetch(`${page}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Could not fetch page:', error);
        return '<p>Failed to load content.</p>';
    }
}

// Function to render the view
async function renderView(page) {
    let content = await fetchContent(page);

    // Add product listing to the menu page
    if (page === 'menu') {
        content += renderProducts();
    }

    contentDiv.innerHTML = content;

    // Attach event listeners for forms after content is loaded
    if (page === 'login' || page === 'signup') {
        attachFormListeners(page);
    }

    if (page === 'contact') {
        attachContactFormListener();
    }

    // Re-attach event listeners for any dynamically loaded content
    attachEventListeners();
}

// Function to render product listings
function renderProducts() {
    let productHTML = '<div class="product-grid">';
    products.forEach(product => {
        productHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price}</p>
            </div>`;
    });
    productHTML += '</div>';
    return productHTML;
}

// Function to attach event listeners to forms
function attachFormListeners(page) {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            handleFormSubmit(form, page);
        });
    }
}

// Function to handle form submission
function handleFormSubmit(form, page) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Mock validation and localStorage storage
    if (page === 'signup') {
        if (data.password !== data.confirmPassword) {
            displayErrorMessage('Passwords do not match.');
            return;
        }
        localStorage.setItem('user', JSON.stringify(data));
        showMessage('Signup successful!');
    } else if (page === 'login') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.email === data.email && user.password === data.password) {
                showMessage('Login successful!');
                // Redirect to profile or another page after successful login
                window.location.hash = '#profile';
                renderView('profile');
                return;
            } else {
                displayErrorMessage('Invalid credentials.');
                return;
            }
        } else {
            displayErrorMessage('User not found. Please signup.');
            return;
        }
    }
}

// Function to attach event listener to contact form
function attachContactFormListener() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            handleContactFormSubmit(form);
        });
    }
}

// Function to handle contact form submission
function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Mock submission handling
    console.log('Contact form data:', data);
    showMessage('Message sent successfully!');
    form.reset();
}

// Function to display error messages
function displayErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.firstChild);
}

// Function to show a modal message
function showMessage(message) {
    modalBody.textContent = message;
    modal.style.display = 'block';
}

// Function to attach global event listeners
function attachEventListeners() {
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
    });

    // Close modal functionality
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Search functionality
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        // Implement search filtering logic here
        console.log('Search term:', searchTerm);
    });

    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Function to handle routing
function handleRouteChange() {
    const page = window.location.hash.substring(1) || 'home';
    renderView(page);
}

// Initialization function
function init() {
    // Load theme from localStorage
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Initial page load
    handleRouteChange();

    // Attach event listeners to navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            window.location.hash = `#${page}`;
            renderView(page);
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    });

    // Attach global event listeners
    attachEventListeners();

    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);
}

// Call init when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);