import * as Auth from '../utils/auth.js';
import * as API from '../utils/api.js';
import * as Validation from '../utils/validation.js';
import * as Router from '../utils/router.js';

/**
 * Renders the HTML for the login page and attaches event listeners.
 * @returns {string} The HTML string for the login page.
 */
export function renderLoginPage() {
    // Attach event listeners after a short delay to ensure content is in DOM
    setTimeout(() => {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.removeEventListener('submit', handleLoginFormSubmit);
            loginForm.addEventListener('submit', handleLoginFormSubmit);
        }
    }, 0);

    return `
        <div class="auth-container">
            <h2>Login to Your Account</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="login-email">Email:</label>
                    <input type="email" id="login-email" name="email" required aria-required="true">
                    <div id="login-email-error" class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="login-password">Password:</label>
                    <input type="password" id="login-password" name="password" required aria-required="true">
                    <div id="login-password-error" class="form-error"></div>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <p class="auth-switch">Don't have an account? <a href="#/signup">Sign Up</a></p>
        </div>
    `;
}

/**
 * Handles the submission of the login form.
 * @param {Event} event - The submit event.
 */
async function handleLoginFormSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    let isValid = true;

    // Validate Email
    if (!Validation.validateEmail(emailInput.value)) {
        document.getElementById('login-email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        document.getElementById('login-email-error').textContent = '';
    }

    // Validate Password
    if (!Validation.validateRequired(passwordInput.value)) {
        document.getElementById('login-password-error').textContent = 'Password is required.';
        isValid = false;
    } else {
        document.getElementById('login-password-error').textContent = '';
    }

    if (isValid) {
        try {
            const success = await API.loginUser(emailInput.value, passwordInput.value);
            if (success) {
                alert('Login successful!');
                Router.navigateTo('/home'); // Redirect to home page
                // Re-render app to update navbar (auth state)
                document.dispatchEvent(new CustomEvent('auth-state-changed'));
            } else {
                alert('Login failed. Invalid credentials or user not found.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    } else {
        alert('Please correct the errors in the form.');
    }
}
