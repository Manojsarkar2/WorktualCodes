import { createElement } from '../utils/helpers.js';
import api from '../api.js';

export class AppointmentForm {
    constructor({ onSubmit, onCancel }) {
        this.onSubmit = onSubmit;
        this.onCancel = onCancel;
        this.formElement = null;
    }

    render() {
        this.formElement = createElement('form', { class: 'appointment-form' });

        const nameGroup = createElement('div', { class: 'form-group' });
        nameGroup.append(
            createElement('label', { for: 'name' }, 'Your Name'),
            createElement('input', { type: 'text', id: 'name', name: 'name', required: '' })
        );

        const emailGroup = createElement('div', { class: 'form-group' });
        emailGroup.append(
            createElement('label', { for: 'email' }, 'Your Email'),
            createElement('input', { type: 'email', id: 'email', name: 'email', required: '' })
        );

        const phoneGroup = createElement('div', { class: 'form-group' });
        phoneGroup.append(
            createElement('label', { for: 'phone' }, 'Phone Number'),
            createElement('input', { type: 'tel', id: 'phone', name: 'phone' })
        );

        const doctorGroup = createElement('div', { class: 'form-group' });
        const doctorSelect = createElement('select', { id: 'doctor', name: 'doctor' });
        doctorSelect.append(
            createElement('option', { value: '' }, 'Select Doctor (Optional)'),
            createElement('option', { value: 'dr-emily-white' }, 'Dr. Emily White (Cardiologist)'),
            createElement('option', { value: 'dr-john-davis' }, 'Dr. John Davis (Neurologist)'),
            createElement('option', { value: 'dr-sarah-chen' }, 'Dr. Sarah Chen (Pediatrician)')
        );
        doctorGroup.append(
            createElement('label', { for: 'doctor' }, 'Preferred Doctor'),
            doctorSelect
        );

        const dateGroup = createElement('div', { class: 'form-group' });
        dateGroup.append(
            createElement('label', { for: 'date' }, 'Preferred Date'),
            createElement('input', { type: 'date', id: 'date', name: 'date', required: '' })
        );

        const messageGroup = createElement('div', { class: 'form-group' });
        messageGroup.append(
            createElement('label', { for: 'message' }, 'Your Message (Optional)'),
            createElement('textarea', { id: 'message', name: 'message', rows: '4' })
        );

        const actionsDiv = createElement('div', { class: 'form-actions' });
        const cancelButton = createElement('button', { type: 'button', class: 'btn btn-outline' }, 'Cancel');
        const submitButton = createElement('button', { type: 'submit', class: 'btn btn-primary' }, 'Submit Appointment');

        cancelButton.addEventListener('click', this.onCancel);
        this.formElement.addEventListener('submit', this.handleSubmit);

        actionsDiv.append(cancelButton, submitButton);

        this.formElement.append(
            nameGroup,
            emailGroup,
            phoneGroup,
            doctorGroup,
            dateGroup,
            messageGroup,
            actionsDiv
        );

        return this.formElement;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(this.formElement);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!data.name || !data.email || !data.date) {
            alert('Please fill in all required fields (Name, Email, Date).');
            return;
        }

        // Email format validation (simple regex)
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            // Disable submit button during submission
            const submitBtn = this.formElement.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            await this.onSubmit(data);
        } catch (error) {
            console.error('Appointment submission failed:', error);
            alert(`Error: ${error.message || 'Failed to submit appointment.'}`);
        } finally {
            // Re-enable submit button
            const submitBtn = this.formElement.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Appointment';
        }
    };
}
