import { validateForm } from '../components/formValidator.js';
import { loginUser, navigateTo } from '../script.js';

export const LoginView = async () => {
    return `
        <div class="container">
            <div class="form-container">
                <h2>Sign In</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label for="login-email">Email:</label>
                        <input type="email" id="login-email" name="email" required aria-required="true">
                        <div id="email-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password:</label>
                        <input type="password" id="login-password" name="password" required aria-required="true">
                        <div id="password-error" class="error-message" aria-live="polite"></div>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p class="text-center" style="margin-top: 20px;">New to Amazon Clone? <a href="/signup" data-link>Create an account</a></p>
            </div>
        </div>
    `;
};

LoginView.afterRender = () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const rules = {
                email: { required: true, email: true, label: 'Email' },
                password: { required: true, minLength: 6, label: 'Password' }
            };

            const { isValid, errors } = validateForm(loginForm, rules);

            if (isValid) {
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                loginUser(email, password);
            } else {
                console.log('Validation errors:', errors);
            }
        });
    }
};
