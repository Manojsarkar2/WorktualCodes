// script.js

const routes = {
    'home': {
        template: '<h2>Home</h2><p>Welcome to our e-commerce store!</p>'
    },
    'about': {
        template: '<h2>About Us</h2><p>Learn more about our company.</p>'
    },
    'products': {
        template: '<h2>Products</h2><div class="product-grid"></div>',
        onLoad: async () => {
            try {
                const response = await fetch('data/products.json');
                const products = await response.json();
                const productGrid = document.querySelector('.product-grid');
                productGrid.innerHTML = products.map(product => `<div class="product-card"><h3>${product.name}</h3><p>${product.description}</p><p>Price: $${product.price}</p></div>`).join('');
            } catch (error) {
                console.error('Error loading products:', error);
                document.querySelector('.product-grid').innerHTML = '<p>Failed to load products.</p>';
            }
        }
    },
    'contact': {
        template: '<h2>Contact Us</h2><form><label>Name: <input type="text"></label><label>Email: <input type="email"></label><label>Message: <textarea></textarea></label><button>Submit</button></form>'
    },
    'profile': {
        template: '<h2>Profile</h2><p>User profile information.</p>'
    },
    'settings': {
        template: '<h2>Settings</h2><p>App settings and preferences.</p>'
    },
    'login': {
        template: '<h2>Login/Signup</h2><form><label>Username: <input type="text"></label><label>Password: <input type="password"></label><button>Login</button></form>'
    }
};

function renderView(route) {
    const contentDiv = document.getElementById('content');
    if (routes[route]) {
        contentDiv.innerHTML = routes[route].template;
        if (routes[route].onLoad) {
            routes[route].onLoad();
        }
    } else {
        contentDiv.innerHTML = '<h2>404 Not Found</h2>';
    }
}

function handleNavigation(event) {
    event.preventDefault();
    const route = event.target.getAttribute('data-route');
    window.location.hash = route;
    renderView(route);
}

function handleInitialLoad() {
    const route = window.location.hash.substring(1) || 'home';
    renderView(route);
}

// Hamburger menu functionality
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Event listeners for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', handleNavigation);
});

// Initial load
window.addEventListener('load', handleInitialLoad);
window.addEventListener('hashchange', handleInitialLoad);