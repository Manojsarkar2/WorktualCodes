export const renderLoginForm = () => `
    <form id="login-form">
        <div class="form-group">
            <label for="login-username">Username:</label>
            <input type="text" id="login-username" name="username" required aria-required="true">
            <div class="error-message" id="login-username-error"></div>
        </div>
        <div class="form-group">
            <label for="login-password">Password:</label>
            <input type="password" id="login-password" name="password" required aria-required="true">
            <div class="error-message" id="login-password-error"></div>
        </div>
        <div class="form-actions">
            <button type="submit">Login</button>
            <button type="button" class="switch-form">Don't have an account? Sign Up</button>
        </div>
    </form>
`;

export const renderSignupForm = () => `
    <form id="signup-form">
        <div class="form-group">
            <label for="signup-username">Username:</label>
            <input type="text" id="signup-username" name="username" required aria-required="true">
            <div class="error-message" id="signup-username-error"></div>
        </div>
        <div class="form-group">
            <label for="signup-email">Email:</label>
            <input type="email" id="signup-email" name="email" required aria-required="true">
            <div class="error-message" id="signup-email-error"></div>
        </div>
        <div class="form-group">
            <label for="signup-password">Password:</label>
            <input type="password" id="signup-password" name="password" required aria-required="true">
            <div class="error-message" id="signup-password-error"></div>
        </div>
        <div class="form-group">
            <label for="signup-confirm-password">Confirm Password:</label>
            <input type="password" id="signup-confirm-password" name="confirmPassword" required aria-required="true">
            <div class="error-message" id="signup-confirm-password-error"></div>
        </div>
        <div class="form-actions">
            <button type="submit">Sign Up</button>
            <button type="button" class="switch-form">Already have an account? Login</button>
        </div>
    </form>
`;

// Client-side validation for auth forms (called from script.js after form is in DOM)
export const validateAuthForm = (form, type) => {
    let isValid = true;

    const usernameInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const emailInput = form.querySelector('input[name="email"]');
    const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');

    const usernameError = form.querySelector(`#${type}-username-error`);
    const passwordError = form.querySelector(`#${type}-password-error`);
    const emailError = form.querySelector(`#${type}-email-error`);
    const confirmPasswordError = form.querySelector(`#${type}-confirm-password-error`);

    // Clear previous errors
    if (usernameError) usernameError.textContent = '';
    if (passwordError) passwordError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (confirmPasswordError) confirmPasswordError.textContent = '';

    if (usernameInput && usernameInput.value.trim() === '') {
        usernameError.textContent = 'Username is required.';
        isValid = false;
    }

    if (passwordInput && passwordInput.value.trim() === '') {
        passwordError.textContent = 'Password is required.';
        isValid = false;
    } else if (passwordInput && passwordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        isValid = false;
    }

    if (type === 'signup') {
        if (emailInput && emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (emailInput && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailInput.value)) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        }

        if (confirmPasswordInput && confirmPasswordInput.value.trim() === '') {
            confirmPasswordError.textContent = 'Confirm password is required.';
            isValid = false;
        } else if (passwordInput && confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            isValid = false;
        }
    }

    return isValid;
};
