import { validateForm, clearValidationErrors } from '../components/validation.js';
import { loginUser } from '../utils/auth.js';
import { updateState } from '../utils/state.js';
import { initRouter } from '../utils/router.js';

export const renderLogin = () => {
    return `
        <section class="container section-padding">
            <div class="form-container">
                <h1 class="section-heading">Login to Your Account</h1>
                <form id="login-form">
                    <div class="form-group">
                        <label for="login-email">Email:</label>
                        <input type="email" id="login-email" name="email" required aria-required="true">
                        <span id="email-error" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password:</label>
                        <input type="password" id="login-password" name="password" required aria-required="true">
                        <span id="password-error" class="error-message"></span>
                    </div>
                    <button type="submit" class="btn">Login</button>
                </form>
                <p class="text-center" style="margin-top: 1.5em;">Don't have an account? <a href="/signup" onclick="event.preventDefault(); initRouter().navigate('/signup')">Sign Up</a></p>
            </div>
        </section>
    `;
};

export const setupLoginForm = () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearValidationErrors(loginForm);

            const rules = {
                email: { required: true, email: true },
                password: { required: true, minLength: 6 }
            };

            if (validateForm(loginForm, rules)) {
                const email = loginForm.elements['email'].value;
                const password = loginForm.elements['password'].value;

                const success = loginUser(email, password);

                if (success) {
                    updateState({ isAuthenticated: true, user: { username: email.split('@')[0], email: email } });
                    alert('Login successful!');
                    window.dispatchEvent(new Event('authStateChange')); // Notify navbar to update
                    initRouter().navigate('/');
                } else {
                    alert('Login failed. Invalid email or password.');
                    // Optionally display error on form
                    const emailError = document.getElementById('email-error');
                    if (emailError) {
                        emailError.textContent = 'Invalid credentials.';
                        emailError.style.display = 'block';
                    }
                }
            } else {
                alert('Please correct the errors in the form.');
            }
        });
    }
};
