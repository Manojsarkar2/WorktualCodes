import { login } from '../utils/auth.js';
import { navigateTo } from '../utils/router.js';
import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for the Login page.
 * @returns {string} The HTML string for the Login page.
 */
export function getLoginPageHTML() {
    return `
        <div class="login-page container">
            <div class="form-card">
                <h1>Sign In</h1>
                <form id="login-form" aria-labelledby="login-heading">
                    <div class="form-group">
                        <label for="login-email">Email or mobile phone number</label>
                        <input type="email" id="login-email" name="email" required aria-required="true">
                        <p class="form-error" id="email-error" aria-live="polite"></p>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" name="password" required aria-required="true">
                        <p class="form-error" id="password-error" aria-live="polite"></p>
                    </div>
                    <button type="submit" class="btn btn-primary">Continue</button>
                </form>
                <p class="separator"><span>New to Amazon Clone?</span></p>
                <a href="/signup" data-route="/signup" class="btn btn-secondary create-account-btn">Create your Amazon Clone account</a>
            </div>
        </div>
    `;
}

/**
 * Initializes any interactive components on the Login page.
 */
export function initLoginPage() {
    const loginForm = getElement('#login-form');
    const emailInput = getElement('#login-email');
    const passwordInput = getElement('#login-password');
    const emailError = getElement('#email-error');
    const passwordError = getElement('#password-error');

    if (!loginForm || !emailInput || !passwordInput || !emailError || !passwordError) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        emailError.textContent = '';
        passwordError.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        if (!email) {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!password) {
            passwordError.textContent = 'Password is required.';
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters.';
            isValid = false;
        }

        if (isValid) {
            const success = await login(email, password);
            if (success) {
                navigateTo('/'); // Redirect to home on successful login
            } else {
                passwordError.textContent = 'Invalid email or password.';
            }
        }
    });
}