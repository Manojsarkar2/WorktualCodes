export const validateForm = (formData, rules) => {
    const errors = {};

    for (const field in rules) {
        const value = formData[field];
        const fieldRules = rules[field];

        if (fieldRules.required && (!value || value.trim() === '')) {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        }

        if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${fieldRules.minLength} characters long.`;
        }

        if (fieldRules.email && value && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
            errors[field] = 'Please enter a valid email address.';
        }

        if (fieldRules.matches && value && formData[fieldRules.matches] !== value) {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} does not match ${fieldRules.matches}.`;
        }

        // Add more validation rules as needed (e.g., maxLength, pattern, number, etc.)
    }

    return errors;
};
