import { validateForm, clearValidationErrors } from '../components/validation.js';
import { signupUser } from '../utils/auth.js';
import { updateState } from '../utils/state.js';
import { initRouter } from '../utils/router.js';

export const renderSignup = () => {
    return `
        <section class="container section-padding">
            <div class="form-container">
                <h1 class="section-heading">Create Your Whimsy World Account</h1>
                <form id="signup-form">
                    <div class="form-group">
                        <label for="signup-username">Username:</label>
                        <input type="text" id="signup-username" name="username" required aria-required="true">
                        <span id="username-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="signup-email">Email:</label>
                        <input type="email" id="signup-email" name="email" required aria-required="true">
                        <span id="email-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="signup-password">Password:</label>
                        <input type="password" id="signup-password" name="password" required aria-required="true">
                        <span id="password-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="signup-confirm-password">Confirm Password:</label>
                        <input type="password" id="signup-confirm-password" name="confirmPassword" required aria-required="true">
                        <span id="confirmPassword-error" class="error-message"></span>
                    </div>
                    <button type="submit" class="btn">Sign Up</button>
                </form>
                <p class="text-center" style="margin-top: 1.5em;">Already have an account? <a href="/login" onclick="event.preventDefault(); initRouter().navigate('/login')">Login</a></p>
            </div>
        </section>
    `;
};

export const setupSignupForm = () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearValidationErrors(signupForm);

            const rules = {
                username: { required: true, minLength: 3 },
                email: { required: true, email: true },
                password: { required: true, minLength: 6 },
                confirmPassword: { required: true, confirmPassword: { field: 'password' } }
            };

            if (validateForm(signupForm, rules)) {
                const username = signupForm.elements['username'].value;
                const email = signupForm.elements['email'].value;
                const password = signupForm.elements['password'].value;

                const success = signupUser(username, email, password);

                if (success) {
                    updateState({ isAuthenticated: true, user: { username: username, email: email } });
                    alert('Account created successfully! You are now logged in.');
                    window.dispatchEvent(new Event('authStateChange')); // Notify navbar to update
                    initRouter().navigate('/');
                } else {
                    alert('Signup failed. An account with this email might already exist.');
                    const emailError = document.getElementById('email-error');
                    if (emailError) {
                        emailError.textContent = 'Email already registered.';
                        emailError.style.display = 'block';
                    }
                }
            } else {
                alert('Please correct the errors in the form.');
            }
        });
    }
};
