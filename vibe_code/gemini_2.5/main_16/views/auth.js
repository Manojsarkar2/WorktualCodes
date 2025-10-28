import { loginUser, signupUser, getCurrentUser } from '../script.js';
import { validateForm } from '../components/validation.js';

export const renderAuthPage = (container, type = 'login') => {
    const currentUser = getCurrentUser();

    if (currentUser) {
        container.innerHTML = `
            <div class="auth-container text-center">
                <h2>Welcome, ${currentUser.username}!</h2>
                <p>You are already logged in.</p>
                <button class="btn btn-primary" data-link href="/">Go to Home</button>
            </div>
        `;
        return;
    }

    const isLogin = type === 'login';

    container.innerHTML = `
        <div class="auth-container">
            <h2 id="auth-title">${isLogin ? 'Login' : 'Sign Up'}</h2>
            <form id="auth-form">
                ${!isLogin ? `
                <div class="form-group">
                    <label for="auth-username">Username</label>
                    <input type="text" id="auth-username" name="username" class="form-control" placeholder="Your Username" required aria-required="true"/>
                    <div class="form-text-error" id="username-error"></div>
                </div>
                ` : ''}
                <div class="form-group">
                    <label for="auth-email">Email</label>
                    <input type="email" id="auth-email" name="email" class="form-control" placeholder="your@example.com" required aria-required="true"/>
                    <div class="form-text-error" id="email-error"></div>
                </div>
                <div class="form-group">
                    <label for="auth-password">Password</label>
                    <input type="password" id="auth-password" name="password" class="form-control" placeholder="Password" required aria-required="true"/>
                    <div class="form-text-error" id="password-error"></div>
                </div>
                ${!isLogin ? `
                <div class="form-group">
                    <label for="auth-confirm-password">Confirm Password</label>
                    <input type="password" id="auth-confirm-password" name="confirmPassword" class="form-control" placeholder="Confirm Password" required aria-required="true"/>
                    <div class="form-text-error" id="confirmPassword-error"></div>
                </div>
                ` : ''}
                <button type="submit" class="btn btn-primary w-100">${isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <div class="auth-switch">
                ${isLogin ? `
                    Don't have an account? <a href="/signup" data-link>Sign Up</a>
                ` : `
                    Already have an account? <a href="/login" data-link>Login</a>
                `}
            </div>
        </div>
    `;

    const authForm = container.querySelector('#auth-form');

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            email: authForm.querySelector('#auth-email').value,
            password: authForm.querySelector('#auth-password').value,
        };

        const rules = {
            email: { required: true, email: true },
            password: { required: true, minLength: 6 },
        };

        if (!isLogin) {
            formData.username = authForm.querySelector('#auth-username').value;
            formData.confirmPassword = authForm.querySelector('#auth-confirm-password').value;
            rules.username = { required: true, minLength: 3 };
            rules.confirmPassword = { required: true, matches: 'password' };
        }

        const errors = validateForm(formData, rules);

        // Clear previous errors
        Object.keys(rules).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) errorElement.textContent = '';
        });

        if (Object.keys(errors).length === 0) {
            if (isLogin) {
                loginUser(formData.email, formData.password);
            } else {
                signupUser(formData.username, formData.email, formData.password);
            }
        } else {
            // Display errors
            Object.keys(errors).forEach(field => {
                const errorElement = document.getElementById(`${field}-error`);
                if (errorElement) errorElement.textContent = errors[field];
            });
            window.openModal('Validation Error', 'Please correct the errors in the form.');
        }
    });
};
