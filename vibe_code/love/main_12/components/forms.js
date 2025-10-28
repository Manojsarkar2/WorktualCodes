import { state } from './state.js';
import { users } from '../data/users.js';
import { closeModal } from './modal.js';

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const getFormValues = (form) => {
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
};

const displayError = (inputElement, message) => {
    const formGroup = inputElement.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
    inputElement.classList.add('input-error');
};

const clearError = (inputElement) => {
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    inputElement.classList.remove('input-error');
};

export const renderLoginForm = (modalContainer) => {
    setTimeout(() => {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const { email, password } = getFormValues(loginForm);
                let isValid = true;

                clearError(loginForm.elements['email']);
                clearError(loginForm.elements['password']);

                if (!email || !validateEmail(email)) {
                    displayError(loginForm.elements['email'], 'Please enter a valid email address.');
                    isValid = false;
                }
                if (!password || password.length < 6) {
                    displayError(loginForm.elements['password'], 'Password must be at least 6 characters.');
                    isValid = false;
                }

                if (isValid) {
                    const user = users.find(u => u.email === email && u.password === password);
                    if (user) {
                        state.loginUser(user);
                        closeModal(modalContainer);
                        alert('Login successful!');
                    } else {
                        displayError(loginForm.elements['email'], 'Invalid email or password.');
                        displayError(loginForm.elements['password'], 'Invalid email or password.');
                    }
                }
            });
        }
    }, 0);

    return `
        <div class="auth-form">
            <h2 id="modal-title">Login</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="login-email">Email:</label>
                    <input type="email" id="login-email" name="email" required aria-label="Email address">
                </div>
                <div class="form-group">
                    <label for="login-password">Password:</label>
                    <input type="password" id="login-password" name="password" required aria-label="Password">
                </div>
                <div class="form-actions">
                    <button type="submit">Login</button>
                    <a href="#" class="switch-form-link switch-to-signup">Don't have an account? Sign Up</a>
                </div>
            </form>
        </div>
    `;
};

export const renderSignupForm = (modalContainer) => {
    setTimeout(() => {
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const { username, email, password, confirmPassword } = getFormValues(signupForm);
                let isValid = true;

                clearError(signupForm.elements['username']);
                clearError(signupForm.elements['email']);
                clearError(signupForm.elements['password']);
                clearError(signupForm.elements['confirmPassword']);

                if (!username || username.length < 3) {
                    displayError(signupForm.elements['username'], 'Username must be at least 3 characters.');
                    isValid = false;
                }
                if (!email || !validateEmail(email)) {
                    displayError(signupForm.elements['email'], 'Please enter a valid email address.');
                    isValid = false;
                }
                if (users.some(u => u.email === email)) {
                    displayError(signupForm.elements['email'], 'Email already registered.');
                    isValid = false;
                }
                if (!password || password.length < 6) {
                    displayError(signupForm.elements['password'], 'Password must be at least 6 characters.');
                    isValid = false;
                }
                if (password !== confirmPassword) {
                    displayError(signupForm.elements['confirmPassword'], 'Passwords do not match.');
                    isValid = false;
                }

                if (isValid) {
                    const newUser = { id: `u${users.length + 1}`, username, email, password };
                    users.push(newUser); // In a real app, this would be an API call
                    state.loginUser(newUser);
                    closeModal(modalContainer);
                    alert('Registration successful! You are now logged in.');
                }
            });
        }
    }, 0);

    return `
        <div class="auth-form">
            <h2 id="modal-title">Sign Up</h2>
            <form id="signup-form">
                <div class="form-group">
                    <label for="signup-username">Username:</label>
                    <input type="text" id="signup-username" name="username" required aria-label="Username">
                </div>
                <div class="form-group">
                    <label for="signup-email">Email:</label>
                    <input type="email" id="signup-email" name="email" required aria-label="Email address">
                </div>
                <div class="form-group">
                    <label for="signup-password">Password:</label>
                    <input type="password" id="signup-password" name="password" required aria-label="Password">
                </div>
                <div class="form-group">
                    <label for="signup-confirm-password">Confirm Password:</label>
                    <input type="password" id="signup-confirm-password" name="confirmPassword" required aria-label="Confirm password">
                </div>
                <div class="form-actions">
                    <button type="submit">Sign Up</button>
                    <a href="#" class="switch-form-link switch-to-login">Already have an account? Login</a>
                </div>
            </form>
        </div>
    `;
};

export const renderContactForm = () => {
    setTimeout(() => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const { name, email, message } = getFormValues(contactForm);
                let isValid = true;

                clearError(contactForm.elements['name']);
                clearError(contactForm.elements['email']);
                clearError(contactForm.elements['message']);

                if (!name || name.length < 2) {
                    displayError(contactForm.elements['name'], 'Name must be at least 2 characters.');
                    isValid = false;
                }
                if (!email || !validateEmail(email)) {
                    displayError(contactForm.elements['email'], 'Please enter a valid email address.');
                    isValid = false;
                }
                if (!message || message.length < 10) {
                    displayError(contactForm.elements['message'], 'Message must be at least 10 characters.');
                    isValid = false;
                }

                if (isValid) {
                    // In a real app, send this data to a backend API
                    console.log('Contact form submitted:', { name, email, message });
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                }
            });
        }
    }, 0);

    return `
        <div class="contact-form">
            <h2>Contact Us</h2>
            <form id="contact-form">
                <div class="form-group">
                    <label for="contact-name">Name:</label>
                    <input type="text" id="contact-name" name="name" required aria-label="Your name">
                </div>
                <div class="form-group">
                    <label for="contact-email">Email:</label>
                    <input type="email" id="contact-email" name="email" required aria-label="Your email address">
                </div>
                <div class="form-group">
                    <label for="contact-message">Message:</label>
                    <textarea id="contact-message" name="message" rows="5" required aria-label="Your message"></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit">Send Message</button>
                </div>
            </form>
        </div>
    `;
};
