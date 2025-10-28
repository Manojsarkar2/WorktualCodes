import * as Auth from '../utils/auth.js';
import * as API from '../utils/api.js';
import * as Validation from '../utils/validation.js';
import * as Router from '../utils/router.js';

/**
 * Renders the HTML for the signup page and attaches event listeners.
 * @returns {string} The HTML string for the signup page.
 */
export function renderSignupPage() {
    // Attach event listeners after a short delay to ensure content is in DOM
    setTimeout(() => {
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.removeEventListener('submit', handleSignupFormSubmit);
            signupForm.addEventListener('submit', handleSignupFormSubmit);
        }
    }, 0);

    return `
        <div class="auth-container">
            <h2>Create Your Account</h2>
            <form id="signup-form">
                <div class="form-group">
                    <label for="signup-name">Name:</label>
                    <input type="text" id="signup-name" name="name" required aria-required="true">
                    <div id="signup-name-error" class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="signup-email">Email:</label>
                    <input type="email" id="signup-email" name="email" required aria-required="true">
                    <div id="signup-email-error" class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="signup-password">Password:</label>
                    <input type="password" id="signup-password" name="password" required aria-required="true" minlength="6">
                    <div id="signup-password-error" class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="signup-confirm-password">Confirm Password:</label>
                    <input type="password" id="signup-confirm-password" name="confirmPassword" required aria-required="true">
                    <div id="signup-confirm-password-error" class="form-error"></div>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
            <p class="auth-switch">Already have an account? <a href="#/login">Login</a></p>
        </div>
    `;
}

/**
 * Handles the submission of the signup form.
 * @param {Event} event - The submit event.
 */
async function handleSignupFormSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');

    let isValid = true;

    // Validate Name
    if (!Validation.validateRequired(nameInput.value)) {
        document.getElementById('signup-name-error').textContent = 'Name is required.';
        isValid = false;
    } else {
        document.getElementById('signup-name-error').textContent = '';
    }

    // Validate Email
    if (!Validation.validateEmail(emailInput.value)) {
        document.getElementById('signup-email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        document.getElementById('signup-email-error').textContent = '';
    }

    // Validate Password
    if (!Validation.validatePassword(passwordInput.value)) {
        document.getElementById('signup-password-error').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    } else {
        document.getElementById('signup-password-error').textContent = '';
    }

    // Validate Confirm Password
    if (passwordInput.value !== confirmPasswordInput.value) {
        document.getElementById('signup-confirm-password-error').textContent = 'Passwords do not match.';
        isValid = false;
    } else {
        document.getElementById('signup-confirm-password-error').textContent = '';
    }

    if (isValid) {
        try {
            const success = await API.signupUser({
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            });

            if (success) {
                alert('Account created successfully! Please log in.');
                Router.navigateTo('/login'); // Redirect to login page
            } else {
                alert('Signup failed. Email might already be registered.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup. Please try again.');
        }
    } else {
        alert('Please correct the errors in the form.');
    }
}
