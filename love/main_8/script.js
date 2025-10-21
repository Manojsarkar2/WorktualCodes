// script.js

// --- Utility Functions ---

// Function to load content dynamically
async function loadContent(page) {
    let contentDiv = document.getElementById('content');
    switch (page) {
        case 'home':
            contentDiv.innerHTML = homeContent;
            break;
        case 'contact':
            contentDiv.innerHTML = contactContent;
            // Attach event listener for form submission
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', handleContactSubmit);
            }
            break;
        case 'login':
            contentDiv.innerHTML = loginContent;
            // Attach event listener for login form submission
            const loginForm = document.getElementById('login-form');
            if (loginForm) {
                loginForm.addEventListener('submit', handleLoginSubmit);
            }
            break;
        case 'signup':
            contentDiv.innerHTML = signupContent;
            // Attach event listener for signup form submission
            const signupForm = document.getElementById('signup-form');
            if (signupForm) {
                signupForm.addEventListener('submit', handleSignupSubmit);
            }
            break;
        case 'anime-list':
            contentDiv.innerHTML = animeListContent;
            break;
        case 'cart':
            contentDiv.innerHTML = cartContent;
            break;
        default:
            contentDiv.innerHTML = '<h2>Page Not Found</h2><p>Sorry, the page you are looking for does not exist.</p>';
    }
}

// Function to handle form submissions (mock)
function handleContactSubmit(event) {
    event.preventDefault();
    alert('Contact form submitted (mock).');
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Mock authentication
    if (email === 'user@example.com' && password === 'password') {
        localStorage.setItem('user', JSON.stringify({ email: email }));
        alert('Login successful!');
        loadContent('home'); // Redirect to home after login
    } else {
        alert('Invalid credentials.');
    }
}

function handleSignupSubmit(event) {
    event.preventDefault();
    alert('Signup form submitted (mock).');
}

// --- Navigation ---

// Function to handle navigation
function navigate(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href').substring(1); // Remove the '#' from href
    loadContent(target);
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Load Navbar
    document.getElementById('navbar').innerHTML = navbarContent;

    // Load Home page by default
    loadContent('home');

    // Attach navigation event listeners
    const navLinks = document.querySelectorAll('#navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', navigate);
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#navbar ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Modal functionality (example)
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = modalContent;

    const modal = document.getElementById('myModal');
    const openModalButton = document.getElementById('openModal');
    const closeModalButton = document.querySelector('.close-button');

    if (openModalButton && modal && closeModalButton) {
        openModalButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Example of loading anime list on home page
    if (document.getElementById('content').innerHTML === homeContent) {
        loadContent('anime-list');
    }
});