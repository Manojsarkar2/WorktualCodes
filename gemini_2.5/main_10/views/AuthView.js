import { LoginForm, SignupForm } from '../components/Forms.js';

export const AuthView = (mode, onSubmit, updateCurrentUser) => {
    const authDiv = document.createElement('div');
    authDiv.className = 'auth-view container';
    authDiv.setAttribute('aria-labelledby', 'auth-page-heading');

    const renderForm = (currentMode) => {
        authDiv.innerHTML = ''; // Clear previous content
        const heading = document.createElement('h2');
        heading.id = 'auth-page-heading';
        heading.textContent = currentMode === 'login' ? 'Login to Flipkart' : 'Sign Up for Flipkart';
        authDiv.appendChild(heading);

        let formElement;
        if (currentMode === 'login') {
            formElement = LoginForm(onSubmit, updateCurrentUser, null); // Pass null for modalInstance as it's a page view
        } else {
            formElement = SignupForm(onSubmit, updateCurrentUser, null); // Pass null for modalInstance as it's a page view
        }
        authDiv.appendChild(formElement);
    };

    renderForm(mode);

    // Listen for custom events to switch forms if triggered from other parts of the app
    document.addEventListener('open-login-modal', () => renderForm('login'));
    document.addEventListener('open-signup-modal', () => renderForm('signup'));

    return authDiv;
};
