document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutLink = document.getElementById('logout-link');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');

    // Check if user is already logged in
    if (localStorage.getItem('user')) {
        showLogout();
    } else {
        showLoginSignup();
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            localStorage.setItem('user', JSON.stringify({ email: email }));
            alert('Signup successful!');
            showLogout();
            window.location.href = '../index.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Basic validation (in real app, validate against a server)
            if (localStorage.getItem('user')) {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user.email === email) { // In real app, check password too
                    alert('Login successful!');
                    showLogout();
                    window.location.href = '../index.html';
                    return;
                }
            }

            alert('Invalid credentials');
        });
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('user');
            showLoginSignup();
            window.location.href = '../index.html';
        });
    }

    function showLogout() {
        if (logoutLink && loginLink && signupLink) {
            logoutLink.style.display = 'inline';
            loginLink.style.display = 'none';
            signupLink.style.display = 'none';
        }
    }

    function showLoginSignup() {
        if (logoutLink && loginLink && signupLink) {
            logoutLink.style.display = 'none';
            loginLink.style.display = 'inline';
            signupLink.style.display = 'inline';
        }
    }
});