// Helper for form validation
const validateForm = (formData, rules) => {
    const errors = {};
    for (const field in rules) {
        const value = formData[field];
        const fieldRules = rules[field];

        if (fieldRules.required && !value) {
            errors[field] = `${fieldRules.label || field} is required.`;
        }
        if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
            errors[field] = `${fieldRules.label || field} must be at least ${fieldRules.minLength} characters.`;
        }
        if (fieldRules.email && value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            errors[field] = `Invalid email address.`;
        }
        if (fieldRules.match && value && value !== formData[fieldRules.match.field]) {
            errors[field] = `${fieldRules.label || field} does not match ${fieldRules.match.label}.`;
        }
    }
    return errors;
};

export const LoginForm = (onSubmit, updateCurrentUser, modalInstance) => {
    const form = document.createElement('form');
    form.className = 'auth-form login-form';
    form.setAttribute('aria-label', 'Login Form');

    form.innerHTML = `
        <div class="form-group">
            <label for="login-email">Email:</label>
            <input type="email" id="login-email" name="email" required aria-required="true">
            <p class="error-message" id="login-email-error" aria-live="polite"></p>
        </div>
        <div class="form-group">
            <label for="login-password">Password:</label>
            <input type="password" id="login-password" name="password" required aria-required="true">
            <p class="error-message" id="login-password-error" aria-live="polite"></p>
        </div>
        <button type="submit" class="primary">Login</button>
        <p class="toggle-auth-mode">New to Flipkart? <a href="#signup" id="open-signup-link">Create an account</a></p>
    `;

    const emailInput = form.querySelector('#login-email');
    const passwordInput = form.querySelector('#login-password');
    const emailError = form.querySelector('#login-email-error');
    const passwordError = form.querySelector('#login-password-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        emailError.textContent = '';
        passwordError.textContent = '';

        const formData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        const validationRules = {
            email: { required: true, email: true, label: 'Email' },
            password: { required: true, minLength: 6, label: 'Password' }
        };

        const errors = validateForm(formData, validationRules);

        if (Object.keys(errors).length > 0) {
            if (errors.email) emailError.textContent = errors.email;
            if (errors.password) passwordError.textContent = errors.password;
            return;
        }

        const success = onSubmit('login', formData);
        if (success && modalInstance) {
            modalInstance.close();
        }
    });

    form.querySelector('#open-signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        if (modalInstance) modalInstance.close();
        document.dispatchEvent(new CustomEvent('open-signup-modal'));
    });

    return form;
};

export const SignupForm = (onSubmit, updateCurrentUser, modalInstance) => {
    const form = document.createElement('form');
    form.className = 'auth-form signup-form';
    form.setAttribute('aria-label', 'Sign Up Form');

    form.innerHTML = `
        <div class="form-group">
            <label for="signup-name">Name:</label>
            <input type="text" id="signup-name" name="name" required aria-required="true">
            <p class="error-message" id="signup-name-error" aria-live="polite"></p>
        </div>
        <div class="form-group">
            <label for="signup-email">Email:</label>
            <input type="email" id="signup-email" name="email" required aria-required="true">
            <p class="error-message" id="signup-email-error" aria-live="polite"></p>
        </div>
        <div class="form-group">
            <label for="signup-password">Password:</label>
            <input type="password" id="signup-password" name="password" required aria-required="true">
            <p class="error-message" id="signup-password-error" aria-live="polite"></p>
        </div>
        <div class="form-group">
            <label for="signup-confirm-password">Confirm Password:</label>
            <input type="password" id="signup-confirm-password" name="confirmPassword" required aria-required="true">
            <p class="error-message" id="signup-confirm-password-error" aria-live="polite"></p>
        </div>
        <button type="submit" class="primary">Sign Up</button>
        <p class="toggle-auth-mode">Already have an account? <a href="#login" id="open-login-link">Login here</a></p>
    `;

    const nameInput = form.querySelector('#signup-name');
    const emailInput = form.querySelector('#signup-email');
    const passwordInput = form.querySelector('#signup-password');
    const confirmPasswordInput = form.querySelector('#signup-confirm-password');

    const nameError = form.querySelector('#signup-name-error');
    const emailError = form.querySelector('#signup-email-error');
    const passwordError = form.querySelector('#signup-password-error');
    const confirmPasswordError = form.querySelector('#signup-confirm-password-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim(),
            confirmPassword: confirmPasswordInput.value.trim()
        };

        const validationRules = {
            name: { required: true, label: 'Name' },
            email: { required: true, email: true, label: 'Email' },
            password: { required: true, minLength: 6, label: 'Password' },
            confirmPassword: { required: true, match: { field: 'password', label: 'Password' }, label: 'Confirm Password' }
        };

        const errors = validateForm(formData, validationRules);

        if (Object.keys(errors).length > 0) {
            if (errors.name) nameError.textContent = errors.name;
            if (errors.email) emailError.textContent = errors.email;
            if (errors.password) passwordError.textContent = errors.password;
            if (errors.confirmPassword) confirmPasswordError.textContent = errors.confirmPassword;
            return;
        }

        const success = onSubmit('signup', formData);
        if (success && modalInstance) {
            modalInstance.close();
        }
    });

    form.querySelector('#open-login-link').addEventListener('click', (e) => {
        e.preventDefault();
        if (modalInstance) modalInstance.close();
        document.dispatchEvent(new CustomEvent('open-login-modal'));
    });

    return form;
};

export const ContactForm = (onSubmit) => {
    const form = document.createElement('form');
    form.className = 'contact-form';
    form.setAttribute('aria-label', 'Contact Us Form');

    form.innerHTML = `
        <div class="form-group">
            <label for="contact-name">Name:</label>
            <input type="text" id="contact-name" name="name" required aria-required="true">
            <p class="error-message" id="contact-name-error" aria-live="polite"></p>
        </div>
        <div class="form-group">
            <label for="contact-email">Email:</label>
            <input type="email" id="contact-email" name="email" required aria-required="true">
            <p class="error-message" id="contact-email-error" aria-live="polite"></p>
        </div>
        <div class="form-group">
            <label for="contact-subject">Subject:</label>
            <input type="text" id="contact-subject" name="subject" required aria-required="true">
            <p class="error-message" id="contact-subject-error" aria-live="polite"></p>
        </div>
        <div class="form-group">
            <label for="contact-message">Message:</label>
            <textarea id="contact-message" name="message" rows="5" required aria-required="true"></textarea>
            <p class="error-message" id="contact-message-error" aria-live="polite"></p>
        </div>
        <button type="submit" class="primary">Send Message</button>
    `;

    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const subjectInput = form.querySelector('#contact-subject');
    const messageInput = form.querySelector('#contact-message');

    const nameError = form.querySelector('#contact-name-error');
    const emailError = form.querySelector('#contact-email-error');
    const subjectError = form.querySelector('#contact-subject-error');
    const messageError = form.querySelector('#contact-message-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        const validationRules = {
            name: { required: true, label: 'Name' },
            email: { required: true, email: true, label: 'Email' },
            subject: { required: true, label: 'Subject' },
            message: { required: true, minLength: 10, label: 'Message' }
        };

        const errors = validateForm(formData, validationRules);

        if (Object.keys(errors).length > 0) {
            if (errors.name) nameError.textContent = errors.name;
            if (errors.email) emailError.textContent = errors.email;
            if (errors.subject) subjectError.textContent = errors.subject;
            if (errors.message) messageError.textContent = errors.message;
            return;
        }

        onSubmit(formData);
        form.reset();
    });

    return form;
};
