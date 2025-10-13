document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('nav a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    function loadPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
                // Add event listeners for forms after content is loaded
                attachFormListeners(page);
            })
            .catch(error => {
                contentDiv.innerHTML = '<p>Error loading page.</p>';
                console.error('Error loading page:', error);
            });
    }

    function attachFormListeners(page) {
        if (page === 'login.html') {
            const loginForm = contentDiv.querySelector('#loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', handleLoginFormSubmit);
            }
        } else if (page === 'signup.html') {
            const signupForm = contentDiv.querySelector('#signupForm');
            if (signupForm) {
                signupForm.addEventListener('submit', handleSignupFormSubmit);
            }
        } else if (page === 'contact.html') {
            const contactForm = contentDiv.querySelector('#contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', handleContactFormSubmit);
            }
        }
    }

    function handleLoginFormSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Mock authentication (replace with real authentication)
        if (email === 'user@example.com' && password === 'password') {
            alert('Login successful!');
            localStorage.setItem('user', JSON.stringify({ email: email }));
            // Redirect to home or another page after login
            loadPage('home.html');
        } else {
            alert('Invalid credentials.');
        }
    }

    function handleSignupFormSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        // Mock signup (replace with real signup)
        alert('Signup successful! Please login.');
        // Store user data (not secure in real app)
        localStorage.setItem('user', JSON.stringify({ email: email }));
        // Redirect to login page
        loadPage('login.html');
    }

    function handleContactFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Mock submission
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('href');
            loadPage(page);
            navMenu.classList.remove('active'); // Close menu on mobile
        });
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Load default page (Home)
    loadPage('home.html');
});