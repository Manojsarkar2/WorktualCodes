document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');

    // Load initial content (Home page)
    loadContent('home.html');

    // Theme functionality
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.textContent = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    });

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page + '.html');
        });
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    function loadContent(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
                // Re-attach event listeners for forms if needed
                attachFormListeners();
            })
            .catch(error => {
                contentDiv.innerHTML = `<p>Error loading content: ${error}</p>`;
            });
    }

    function attachFormListeners() {
        // Example: Login form submission
        const loginForm = document.querySelector('#login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const email = loginForm.querySelector('#email').value;
                const password = loginForm.querySelector('#password').value;

                // Mock authentication (store in localStorage)
                localStorage.setItem('user', JSON.stringify({ email: email, isLoggedIn: true }));
                alert('Logged in!');
                loadContent('home.html'); // Redirect to home after login
            });
        }

        // Example: Signup form submission
        const signupForm = document.querySelector('#signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const newEmail = signupForm.querySelector('#new-email').value;
                const newPassword = signupForm.querySelector('#new-password').value;

                // Mock user registration (store in localStorage)
                localStorage.setItem('newUser', JSON.stringify({ email: newEmail, password: newPassword }));
                alert('Signed up!');
                loadContent('login.html'); // Redirect to login after signup
            });
        }

          // Example: Contact form submission
          const contactForm = document.querySelector('#contact-form');
          if (contactForm) {
              contactForm.addEventListener('submit', (event) => {
                  event.preventDefault();
                  const name = contactForm.querySelector('#name').value;
                  const email = contactForm.querySelector('#email').value;
                  const message = contactForm.querySelector('#message').value;
  
                  // Mock contact form submission (store in localStorage)
                  localStorage.setItem('contactFormSubmission', JSON.stringify({ name: name, email: email, message: message }));
                  alert('Message sent!');
                  loadContent('home.html'); // Redirect to home after contact form submission
              });
          }
    }
});