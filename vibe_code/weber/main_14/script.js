// Utility Functions
function showModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.style.display = 'block';

    const closeButton = document.querySelector('.close-button');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function getProducts() {
    return fetch('data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Could not load products:', error);
            return []; // Return an empty array to avoid breaking the app
        });
}

// Function to render a view
async function renderView(viewName) {
    let content = '';

    switch (viewName) {
        case 'home':
            content = `<section class="hero floating-gradient">
                            <div class="container">
                                <h1>Welcome to Worktual AI</h1>
                                <p>Empowering your business with cutting-edge AI solutions.</p>
                                <button class="glowing-button">Get Started</button>
                            </div>
                        </section>
                        <section class="container">
                            <h2>Our Services</h2>
                            <p>We offer a range of AI-powered services to help you optimize your business processes, improve decision-making, and drive growth.</p>
                        </section>`;
            break;
        case 'about':
            content = `<section class="container">
                            <h2>About Us</h2>
                            <p>Worktual AI is a leading provider of artificial intelligence solutions for businesses of all sizes. Our mission is to make AI accessible and affordable for everyone.</p>
                            <div class="glassmorphism-card">
                                <h3>Our Team</h3>
                                <p>We have a team of experienced AI experts, data scientists, and software engineers who are passionate about helping our clients succeed.</p>
                            </div>
                        </section>`;
            break;
        case 'products':
            const products = await getProducts();
            if (products.length > 0) {
                content = `<section class="container">
                                <h2>Our Products</h2>
                                <div class="products-grid">
                                    ${products.map(product => `
                                        <div class="product-card">
                                            <img src="${product.image}" alt="${product.name}">
                                            <h3>${product.name}</h3>
                                            <p>${product.description}</p>
                                            <p>Price: $${product.price}</p>
                                            <button class="glowing-button">Add to Cart</button>
                                        </div>`).join('')}
                                </div>
                            </section>`;
            } else {
                content = `<section class="container">
                                <p>Failed to load products.</p>
                            </section>`;
            }
            break;
        case 'pricing':
            content = `<section class="container">
                            <h2>Pricing</h2>
                            <p>Choose the plan that's right for you. We offer a variety of pricing options to fit your needs.</p>
                            <div class="glassmorphism-card">
                                <h3>Basic Plan</h3>
                                <p>Ideal for small businesses and startups.</p>
                                <p>Price: $99/month</p>
                            </div>
                            <div class="glassmorphism-card">
                                <h3>Premium Plan</h3>
                                <p>Ideal for medium-sized businesses and enterprises.</p>
                                <p>Price: $299/month</p>
                            </div>
                        </section>`;
            break;
        case 'contact':
            content = `<section class="container">
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
                        </section>`;
            break;
        case 'profile':
            const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest', email: 'guest@example.com' };
            content = `<section class="container">
                            <h2>Profile</h2>
                            <div class="glassmorphism-card">
                                <img src="assets/profile.jpg" alt="Profile Picture" style="width: 100px; border-radius: 50%;">
                                <p><strong>Username:</strong> ${user.username}</p>
                                <p><strong>Email:</strong> ${user.email}</p>
                            </div>
                        </section>`;
            break;
        case 'settings':
            content = `<section class="container">
                            <h2>Settings</h2>
                            <p>Customize your experience.</p>
                            <button id="reset-settings">Reset Settings</button>
                        </section>`;
            break;
        default:
            content = '<section class="container"><h2>Page Not Found</h2><p>The requested page could not be found.</p></section>';
    }

    document.getElementById('content').innerHTML = content;

    // Re-attach event listeners for forms or buttons that are dynamically loaded
    if (viewName === 'contact') {
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    if (viewName === 'settings') {
        const resetSettingsButton = document.getElementById('reset-settings');
        resetSettingsButton.addEventListener('click', resetSettings);
    }
}

// Event Handlers
function handleNavigation(event) {
    event.preventDefault();
    const hash = event.target.getAttribute('href').substring(1);
    renderView(hash);
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // Store the form data in localStorage
    const formData = {
        name: name,
        email: email,
        message: message
    };
    localStorage.setItem('contactFormData', JSON.stringify(formData));

    alert('Message sent successfully!');
    document.getElementById('contact-form').reset();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

function resetSettings() {
    localStorage.removeItem('dark-mode');
    document.body.classList.remove('dark-mode');
    alert('Settings reset to default.');
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Theme persistence
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Initial view
    renderView('home');

    // Navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
});