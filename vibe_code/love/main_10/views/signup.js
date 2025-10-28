import { signup } from '../utils/auth.js';
import { navigateTo } from '../utils/router.js';
import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for the Signup page.
 * @returns {string} The HTML string for the Signup page.
 */
export function getSignupPageHTML() {
    return `
        <div class="signup-page container">
            <div class="form-card">
                <h1>Create Account</h1>
                <form id="signup-form" aria-labelledby="signup-heading">
                    <div class="form-group">
                        <label for="signup-name">Your name</label>
                        <input type="text" id="signup-name" name="name" required aria-required="true">
                        <p class="form-error" id="name-error" aria-live="polite"></p>
                    </div>
                    <div class="form-group">
                        <label for="signup-email">Email</label>
                        <input type="email" id="signup-email" name="email" required aria-required="true">
                        <p class="form-error" id="email-error" aria-live="polite"></p>
                    </div>
                    <div class="form-group">
                        <label for="signup-password">Password</label>
                        <input type="password" id="signup-password" name="password" placeholder="At least 6 characters" required aria-required="true">
                        <p class="form-error" id="password-error" aria-live="polite"></p>
                    </div>
                    <div class="form-group">
                        <label for="signup-password-confirm">Re-enter password</label>
                        <input type="password" id="signup-password-confirm" name="passwordConfirm" required aria-required="true">
                        <p class="form-error" id="password-confirm-error" aria-live="polite"></p>
                    </div>
                    <button type="submit" class="btn btn-primary">Continue</button>
                </form>
                <p class="terms-text">By creating an account, you agree to Amazon Clone's <a href="#" data-route="/conditions-of-use">Conditions of Use</a> and <a href="#" data-route="/privacy-notice">Privacy Notice</a>.</p>
                <p class="separator"><span>Already have an account?</span></p>
                <a href="/login" data-route="/login" class="btn btn-secondary signin-btn">Sign in</a>
            </div>
        </div>
    `;
}

/**
 * Initializes any interactive components on the Signup page.
 */
export function initSignupPage() {
    const signupForm = getElement('#signup-form');
    const nameInput = getElement('#signup-name');
    const emailInput = getElement('#signup-email');
    const passwordInput = getElement('#signup-password');
    const passwordConfirmInput = getElement('#signup-password-confirm');

    const nameError = getElement('#name-error');
    const emailError = getElement('#email-error');
    const passwordError = getElement('#password-error');
    const passwordConfirmError = getElement('#password-confirm-error');

    if (!signupForm || !nameInput || !emailInput || !passwordInput || !passwordConfirmInput || 
        !nameError || !emailError || !passwordError || !passwordConfirmError) return;

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Clear previous errors
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        passwordConfirmError.textContent = '';

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const passwordConfirm = passwordConfirmInput.value.trim();
        let isValid = true;

        if (!name) {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

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

        if (!passwordConfirm) {
            passwordConfirmError.textContent = 'Please re-enter your password.';
            isValid = false;
        } else if (password !== passwordConfirm) {
            passwordConfirmError.textContent = 'Passwords do not match.';
            isValid = false;
        }

        if (isValid) {
            const success = await signup(name, email, password);
            if (success) {
                alert('Account created successfully! Please sign in.');
                navigateTo('/login'); // Redirect to login after successful signup
            } else {
                emailError.textContent = 'An account with this email already exists.';
            }
        }
    });
}