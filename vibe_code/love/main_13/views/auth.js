import { renderModal, closeModal } from '../components/modal.js';

const mockUsers = [
    { email: 'user@example.com', password: 'password123', name: 'Test User' }
];

export const showLoginModal = (appState, updateAppStateAndRender) => {
    const modalContent = `
        <div class="modal-header">
            <h2>Login</h2>
            <button class="close-button" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <form id="login-form">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" name="email" required>

                <label for="login-password">Password</label>
                <input type="password" id="login-password" name="password" required>

                <p class="error-message" id="login-error-message"></p>
                <button type="submit">Login</button>
            </form>
            <p>New to Flipkart? <a href="#" data-action="show-signup">Create an account</a></p>
        </div>
    `;

    renderModal(modalContent);

    const loginForm = document.getElementById('login-form');
    const loginErrorMessage = document.getElementById('login-error-message');
    const showSignupLink = document.querySelector('[data-action="show-signup"]');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginErrorMessage.textContent = '';

        const email = loginForm.elements['email'].value.trim();
        const password = loginForm.elements['password'].value.trim();

        if (!email || !password) {
            loginErrorMessage.textContent = 'Please enter both email and password.';
            return;
        }

        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
            appState.currentUser = { email: user.email, name: user.name };
            localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
            closeModal();
            updateAppStateAndRender();
            alert(`Welcome back, ${user.name}!`);
        } else {
            loginErrorMessage.textContent = 'Invalid email or password.';
        }
    });

    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        showSignupModal(appState, updateAppStateAndRender);
    });
};

export const showSignupModal = (appState, updateAppStateAndRender) => {
    const modalContent = `
        <div class="modal-header">
            <h2>Sign Up</h2>
            <button class="close-button" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <form id="signup-form">
                <label for="signup-name">Your Name</label>
                <input type="text" id="signup-name" name="name" required>

                <label for="signup-email">Email</label>
                <input type="email" id="signup-email" name="email" required>

                <label for="signup-password">Password</label>
                <input type="password" id="signup-password" name="password" required minlength="6">

                <p class="error-message" id="signup-error-message"></p>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="#" data-action="show-login">Login here</a></p>
        </div>
    `;

    renderModal(modalContent);

    const signupForm = document.getElementById('signup-form');
    const signupErrorMessage = document.getElementById('signup-error-message');
    const showLoginLink = document.querySelector('[data-action="show-login"]');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        signupErrorMessage.textContent = '';

        const name = signupForm.elements['name'].value.trim();
        const email = signupForm.elements['email'].value.trim();
        const password = signupForm.elements['password'].value.trim();

        if (!name || !email || !password) {
            signupErrorMessage.textContent = 'All fields are required.';
            return;
        }

        if (password.length < 6) {
            signupErrorMessage.textContent = 'Password must be at least 6 characters long.';
            return;
        }

        if (mockUsers.some(u => u.email === email)) {
            signupErrorMessage.textContent = 'An account with this email already exists.';
            return;
        }

        // Simulate user registration
        const newUser = { name, email, password };
        mockUsers.push(newUser);
        appState.currentUser = { email: newUser.email, name: newUser.name };
        localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
        closeModal();
        updateAppStateAndRender();
        alert(`Account created successfully! Welcome, ${newUser.name}!`);
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
        showLoginModal(appState, updateAppStateAndRender);
    });
};
