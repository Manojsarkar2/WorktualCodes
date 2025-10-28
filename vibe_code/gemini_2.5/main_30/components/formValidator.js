export const isRequired = (message = 'This field is required.') => (value) => {
    return value && value.trim() !== '' ? null : message;
};

export const isEmail = (message = 'Please enter a valid email address.') => (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value) ? null : message;
};

export const minLength = (min, message) => (value) => {
    return value && value.length >= min ? null : (message || `Must be at least ${min} characters long.`);
};

export const isDateInFuture = (message = 'Date must be in the future.') => (value) => {
    if (!value) return null; // Handled by isRequired
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
    return selectedDate >= today ? null : message;
};

export const isTimeValid = (message = 'Please enter a valid time (HH:MM).') => (value) => {
    if (!value) return null; // Handled by isRequired
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(value) ? null : message;
};

/**
 * Validates a form based on provided rules.
 * @param {HTMLFormElement} formElement The form element to validate.
 * @param {Object} rules An object where keys are input names and values are arrays of validation functions.
 * @param {Object} formData An object containing form data (e.g., from new FormData(form)).
 * @returns {boolean} True if the form is valid, false otherwise.
 */
export const validateForm = (formElement, rules, formData) => {
    let isValid = true;

    for (const fieldName in rules) {
        const input = formElement.elements[fieldName];
        if (!input) continue;

        const value = formData[fieldName];
        const errorDiv = document.getElementById(`${input.id}-error`);
        const fieldRules = rules[fieldName];

        let fieldErrors = [];
        for (const rule of fieldRules) {
            const error = rule(value);
            if (error) {
                fieldErrors.push(error);
                break; // Stop on first error for this field
            }
        }

        if (errorDiv) {
            if (fieldErrors.length > 0) {
                errorDiv.textContent = fieldErrors[0];
                input.classList.add('invalid');
                input.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                errorDiv.textContent = '';
                input.classList.remove('invalid');
                input.setAttribute('aria-invalid', 'false');
            }
        }
    }
    return isValid;
};
