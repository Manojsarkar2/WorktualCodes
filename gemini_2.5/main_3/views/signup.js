import { validateForm } from '../components/formValidator.js';
import { signupUser, navigateTo } from '../script.js';

export const SignupView = async () => {
    return `
        <div class="container">
            <div class="form-container">
                <h2>Create Account</h2>
                <form id="signup-form">
                    <div class="form-group">
                        <label for="signup-username">Your Name:</label>
                        <input type="text" id="signup-username" name="username" required aria-required="true">
                        <div id="username-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <div class="form-group">
                        <label for="signup-email">Email:</label>
                        <input type="email" id="signup-email" name="email" required aria-required="true">
                        <div id="email-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <div class="form-group">
                        <label for="signup-password">Password:</label>
                        <input type="password" id="signup-password" name="password" required aria-required="true">
                        <div id="password-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <div class="form-group">
                        <label for="signup-confirm-password">Re-enter Password:</label>
                        <input type="password" id="signup-confirm-password" name="confirmPassword" required aria-required="true">
                        <div id="confirmPassword-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <button type="submit">Create your Amazon Clone account</button>
                </form>
                <p class="text-center" style="margin-top: 20px;">Already have an account? <a href="/login" data-link>Sign In</a></p>
            </div>
        </div>
    `;
};

SignupView.afterRender = () => {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const rules = {
                username: { required: true, minLength: 3, label: 'Your Name' },
                email: { required: true, email: true, label: 'Email' },
                password: { required: true, minLength: 6, label: 'Password' },
                confirmPassword: { required: true, confirmPassword: 'password', label: 'Confirm Password' }
            };

            const { isValid, errors } = validateForm(signupForm, rules);

            if (isValid) {
                const username = document.getElementById('signup-username').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                signupUser(username, email, password);
            } else {
                console.log('Validation errors:', errors);
            }
        });
    }
};
