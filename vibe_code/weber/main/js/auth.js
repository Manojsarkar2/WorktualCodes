document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const signupEmailInput = document.getElementById('signup-email');
    const signupPasswordInput = document.getElementById('signup-password');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');
    const authModal = document.getElementById('auth-modal');

    loginButton.addEventListener('click', function() {
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;

        // Basic validation
        if (!email || !password) {
            loginError.textContent = 'Please enter both email and password.';
            return;
        }

        // Simulate login (replace with actual authentication logic)
        if (email === 'test@example.com' && password === 'password') {
            loginError.textContent = '';
            localStorage.setItem('isLoggedIn', 'true');
            authModal.style.display = 'none';
            showLogout();
        } else {
            loginError.textContent = 'Invalid email or password.';
        }
    });

    signupButton.addEventListener('click', function() {
        const email = signupEmailInput.value;
        const password = signupPasswordInput.value;

        // Basic validation
        if (!email || !password) {
            signupError.textContent = 'Please enter both email and password.';
            return;
        }

        // Simulate signup (replace with actual signup logic)
        signupError.textContent = '';
        alert('Signup successful! Please login.');
        authModal.style.display = 'none';
    });

    function showLogout() {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'inline';
    }
});