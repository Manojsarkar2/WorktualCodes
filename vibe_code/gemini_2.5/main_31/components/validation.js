export const validateForm = (formElement, rules) => {
    let isValid = true;
    const errors = {};

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
        const input = formElement.querySelector(`[name="${fieldName}"]`);
        if (!input) continue;

        const value = input.value.trim();
        let fieldErrors = [];

        // Required validation
        if (fieldRules.required && !value) {
            fieldErrors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`);
        }

        // Min length validation
        if (fieldRules.minLength && value.length < fieldRules.minLength) {
            fieldErrors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${fieldRules.minLength} characters long.`);
        }

        // Max length validation
        if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
            fieldErrors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be no more than ${fieldRules.maxLength} characters long.`);
        }

        // Email validation
        if (fieldRules.email && value && !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
            fieldErrors.push(`Please enter a valid email address.`);
        }

        // Password confirmation
        if (fieldRules.confirmPassword && fieldRules.confirmPassword.field) {
            const passwordInput = formElement.querySelector(`[name="${fieldRules.confirmPassword.field}"]`);
            if (passwordInput && value !== passwordInput.value.trim()) {
                fieldErrors.push(`Passwords do not match.`);
            }
        }

        // Custom regex validation
        if (fieldRules.pattern && value && !fieldRules.pattern.regex.test(value)) {
            fieldErrors.push(fieldRules.pattern.message || `Invalid ${fieldName}.`);
        }

        // Display errors
        const errorElement = formElement.querySelector(`#${fieldName}-error`);
        if (errorElement) {
            if (fieldErrors.length > 0) {
                errorElement.textContent = fieldErrors.join(' ');
                errorElement.style.display = 'block';
                input.classList.add('input-error'); // Optional: add error class to input
                isValid = false;
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                input.classList.remove('input-error');
            }
        }

        if (fieldErrors.length > 0) {
            errors[fieldName] = fieldErrors;
        }
    }

    return isValid;
};

export const clearValidationErrors = (formElement) => {
    formElement.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    formElement.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
    });
};
