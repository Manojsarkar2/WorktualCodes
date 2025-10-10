// Basic authentication simulation (replace with real authentication)

function login(username, password) {
    // Simulate login
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
    window.location.href = '../index.html'; // Redirect to main page
}

function signup(username, password) {
    // Simulate signup
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
    window.location.href = '../index.html'; // Redirect to main page
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    window.location.href = '../index.html'; // Redirect to main page
}

function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }

    // Signup form handling
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('new-username').value;
            const password = document.getElementById('new-password').value;
            signup(username, password);
        });
    }
});