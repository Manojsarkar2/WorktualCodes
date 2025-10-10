document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');
    const authModal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const closeButton = document.querySelector('.close-button');

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        authModal.style.display = 'block';
    });

    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        authModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        authModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == authModal) {
            authModal.style.display = 'none';
        }
    });

    // Check if user is already logged in (example using localStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showLogout();
    } else {
        showLoginSignup(); // Show login and signup links
    }

    function showLogout() {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'inline';
    }

    function showLoginSignup() {
        loginLink.style.display = 'inline';
        signupLink.style.display = 'inline';
        logoutLink.style.display = 'none';
    }

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('isLoggedIn');
        showLoginSignup();
    });
});