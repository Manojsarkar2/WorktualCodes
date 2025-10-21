export const validateForm = (formElement, rules) => {
    let isValid = true;
    const errors = {};

    for (const fieldName in rules) {
        const input = formElement.querySelector(`[name="${fieldName}"]`);
        if (!input) continue;

        const fieldRules = rules[fieldName];
        let fieldErrors = [];

        // Required validation
        if (fieldRules.required && !input.value.trim()) {
            fieldErrors.push(`${fieldRules.label || fieldName} is required.`);
        }

        // Min length validation
        if (fieldRules.minLength && input.value.trim().length < fieldRules.minLength) {
            fieldErrors.push(`${fieldRules.label || fieldName} must be at least ${fieldRules.minLength} characters long.`);
        }

        // Max length validation
        if (fieldRules.maxLength && input.value.trim().length > fieldRules.maxLength) {
            fieldErrors.push(`${fieldRules.label || fieldName} must be no more than ${fieldRules.maxLength} characters long.`);
        }

        // Email validation
        if (fieldRules.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value.trim())) {
            fieldErrors.push(`Please enter a valid email address.`);
        }

        // Password confirmation
        if (fieldRules.confirmPassword) {
            const passwordInput = formElement.querySelector(`[name="${fieldRules.confirmPassword}"]`);
            if (passwordInput && input.value !== passwordInput.value) {
                fieldErrors.push(`Passwords do not match.`);
            }
        }

        // Custom regex validation
        if (fieldRules.regex && !fieldRules.regex.pattern.test(input.value.trim())) {
            fieldErrors.push(fieldRules.regex.message || `${fieldRules.label || fieldName} is invalid.`);
        }

        errors[fieldName] = fieldErrors;

        const errorDisplay = formElement.querySelector(`#${fieldName}-error`);
        if (errorDisplay) {
            errorDisplay.textContent = fieldErrors.join(' ');
            errorDisplay.style.display = fieldErrors.length > 0 ? 'block' : 'none';
        }

        if (fieldErrors.length > 0) {
            isValid = false;
        }
    }

    return { isValid, errors };
};
