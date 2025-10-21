import { loginUser, signupUser } from '../script.js';

export const renderLoginForm = (targetElement) => {
    targetElement.innerHTML = `
        <h2>Sign In</h2>
        <form id="login-form">
            <div class="form-group">
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" name="email" required aria-required="true">
            </div>
            <div class="form-group">
                <label for="login-password">Password:</label>
                <input type="password" id="login-password" name="password" required aria-required="true">
            </div>
            <button type="submit">Sign In</button>
            <p class="switch-form-link">New to Amazon-like? <a href="#" id="switch-to-signup">Create an account</a></p>
        </form>
    `;
};

export const renderSignupForm = (targetElement) => {
    targetElement.innerHTML = `
        <h2>Create Account</h2>
        <form id="signup-form">
            <div class="form-group">
                <label for="signup-username">Your Name:</label>
                <input type="text" id="signup-username" name="username" required aria-required="true">
            </div>
            <div class="form-group">
                <label for="signup-email">Email:</label>
                <input type="email" id="signup-email" name="email" required aria-required="true">
            </div>
            <div class="form-group">
                <label for="signup-password">Password:</label>
                <input type="password" id="signup-password" name="password" required aria-required="true" minlength="6">
                <small>Passwords must be at least 6 characters.</small>
            </div>
            <div class="form-group">
                <label for="signup-password-confirm">Re-enter password:</label>
                <input type="password" id="signup-password-confirm" name="passwordConfirm" required aria-required="true">
            </div>
            <button type="submit">Create your Amazon-like account</button>
            <p class="switch-form-link">Already have an account? <a href="#" id="switch-to-login">Sign In</a></p>
        </form>
    `;
};

export const handleLogin = (form) => {
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;

    // Basic client-side validation
    let isValid = true;
    document.querySelectorAll('.form-error').forEach(el => el.remove());

    if (!email.trim() || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
        isValid = false;
        form.elements['email'].insertAdjacentHTML('afterend', '<p class="form-error">Please enter a valid email address.</p>');
    }
    if (!password.trim()) {
        isValid = false;
        form.elements['password'].insertAdjacentHTML('afterend', '<p class="form-error">Password is required.</p>');
    }

    if (isValid) {
        loginUser(email, password);
    } else {
        alert('Please correct the errors in the form.');
    }
};

export const handleSignup = (form) => {
    const username = form.elements['username'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const passwordConfirm = form.elements['passwordConfirm'].value;

    // Basic client-side validation
    let isValid = true;
    document.querySelectorAll('.form-error').forEach(el => el.remove());

    if (!username.trim()) {
        isValid = false;
        form.elements['username'].insertAdjacentHTML('afterend', '<p class="form-error">Name is required.</p>');
    }
    if (!email.trim() || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
        isValid = false;
        form.elements['email'].insertAdjacentHTML('afterend', '<p class="form-error">Please enter a valid email address.</p>');
    }
    if (password.length < 6) {
        isValid = false;
        form.elements['password'].insertAdjacentHTML('afterend', '<p class="form-error">Password must be at least 6 characters.</p>');
    }
    if (password !== passwordConfirm) {
        isValid = false;
        form.elements['passwordConfirm'].insertAdjacentHTML('afterend', '<p class="form-error">Passwords do not match.</p>');
    }

    if (isValid) {
        signupUser(username, email, password);
    } else {
        alert('Please correct the errors in the form.');
    }
};
