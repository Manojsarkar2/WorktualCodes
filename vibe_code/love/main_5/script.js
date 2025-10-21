const routes = {
    '/': 'views/home.html',
    '/contact': 'views/contact.html',
    '/features': 'views/features.html',
    '/pricing': 'views/pricing.html'
};

const loadRoute = (route) => {
    fetch(route)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('Failed to load route:', error);
            document.getElementById('content').innerHTML = '<p>Failed to load page.</p>';
        });
};

const navigate = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    loadRoute(routes[path]);
};

window.onpopstate = () => {
    loadRoute(routes[window.location.pathname]);
};

document.addEventListener('DOMContentLoaded', () => {
    // Initial load
    loadRoute(routes['/']);

    // Navigation setup
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const path = link.getAttribute('href');
            navigate(path);
        });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close the menu when a link is clicked (optional)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Form submission handling (example for contact form)
    document.getElementById('content').addEventListener('submit', function(event) {
        if (event.target.tagName === 'FORM') {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            // Process the form data (e.g., send it to a server)
            console.log('Form Data:', Object.fromEntries(formData));
            // Optionally, reset the form
            form.reset();
            alert('Form submitted successfully!');
        }
    });
});

// Load Navbar and Footer
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('navbar-container').innerHTML = Navbar();
    document.getElementById('footer-container').innerHTML = Footer();
});