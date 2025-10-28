export const setupFormHandler = (formId, onSubmitCallback) => {
    const form = document.getElementById(formId);
    if (!form) {
        console.warn(`Form with ID '${formId}' not found.`);
        return;
    }

    const validateField = (input) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (!errorElement) return true; // No error element, no validation message to show

        let isValid = true;
        let errorMessage = '';

        if (input.required && input.value.trim() === '') {
            isValid = false;
            errorMessage = 'This field is required.';
        } else if (input.type === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (input.id === 'signup-password' && input.value.length < 6) {
            isValid = false;
            errorMessage = 'Password must be at least 6 characters long.';
        } else if (input.id === 'signup-confirm-password') {
            const passwordInput = form.querySelector('#signup-password');
            if (passwordInput && input.value !== passwordInput.value) {
                isValid = false;
                errorMessage = 'Passwords do not match.';
            }
        }

        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.setAttribute('aria-invalid', 'true');
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.setAttribute('aria-invalid', 'false');
        }
        return isValid;
    };

    const validateForm = () => {
        let isFormValid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = {};
            new FormData(form).forEach((value, key) => {
                formData[key] = value;
            });
            onSubmitCallback(formData);
            form.reset(); // Clear form after successful submission
        } else {
            console.log('Form has validation errors.');
        }
    });

    // Real-time validation on input blur
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            // Clear error message as user types, re-validate on blur
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                input.setAttribute('aria-invalid', 'false');
            }
        });
    });
};
