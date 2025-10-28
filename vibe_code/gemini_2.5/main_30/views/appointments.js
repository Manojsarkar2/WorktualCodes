import { getDoctors, getServices } from '../data/mockData.js';
import { openModal } from '../components/modal.js';
import { validateForm, isRequired, isEmail, isDateInFuture, isTimeValid } from '../components/formValidator.js';

export const renderAppointmentsPage = () => {
    const doctors = getDoctors();
    const services = getServices();

    // Pre-fill doctor if coming from doctors page
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedDoctor = urlParams.get('doctor');

    return `
        <section class="section">
            <h1>Book Your Appointment</h1>
            <p>Please fill out the form below to schedule your appointment with MediCare Clinic. Our team will confirm your booking shortly.</p>

            <form id="appointment-form" class="form-container">
                <div class="form-group">
                    <label for="patientName">Full Name:</label>
                    <input type="text" id="patientName" name="patientName" required aria-required="true">
                    <div class="form-error" id="patientName-error"></div>
                </div>

                <div class="form-group">
                    <label for="patientEmail">Email:</label>
                    <input type="email" id="patientEmail" name="patientEmail" required aria-required="true">
                    <div class="form-error" id="patientEmail-error"></div>
                </div>

                <div class="form-group">
                    <label for="patientPhone">Phone Number:</label>
                    <input type="text" id="patientPhone" name="patientPhone" required aria-required="true" pattern="^[0-9]{10,15}$" title="Please enter a valid phone number (10-15 digits)">
                    <div class="form-error" id="patientPhone-error"></div>
                </div>

                <div class="form-group">
                    <label for="doctorSelect">Preferred Doctor:</label>
                    <select id="doctorSelect" name="doctor" aria-label="Select a doctor">
                        <option value="">Any Doctor</option>
                        ${doctors.map(doc => `<option value="${doc.name}" ${preselectedDoctor === doc.name ? 'selected' : ''}>${doc.name} (${doc.specialty})</option>`).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label for="serviceSelect">Service Needed:</label>
                    <select id="serviceSelect" name="service" required aria-required="true" aria-label="Select a service">
                        <option value="">Select a Service</option>
                        ${services.map(service => `<option value="${service.name}">${service.name}</option>`).join('')}
                    </select>
                    <div class="form-error" id="serviceSelect-error"></div>
                </div>

                <div class="form-group">
                    <label for="appointmentDate">Appointment Date:</label>
                    <input type="date" id="appointmentDate" name="appointmentDate" required aria-required="true">
                    <div class="form-error" id="appointmentDate-error"></div>
                </div>

                <div class="form-group">
                    <label for="appointmentTime">Appointment Time:</label>
                    <input type="time" id="appointmentTime" name="appointmentTime" required aria-required="true">
                    <div class="form-error" id="appointmentTime-error"></div>
                </div>

                <div class="form-group">
                    <label for="notes">Additional Notes (Optional):</label>
                    <textarea id="notes" name="notes" rows="4"></textarea>
                </div>

                <button type="submit" class="btn-submit">Confirm Appointment</button>
            </form>
        </section>
    `;
};

export const setupAppointmentForm = () => {
    const form = document.getElementById('appointment-form');
    if (!form) return;

    const validationRules = {
        patientName: [isRequired('Full Name is required.')],
        patientEmail: [isRequired('Email is required.'), isEmail('Please enter a valid email address.')],
        patientPhone: [isRequired('Phone number is required.'), (value) => /^[0-9]{10,15}$/.test(value) ? null : 'Please enter a valid phone number (10-15 digits).'],
        serviceSelect: [isRequired('Please select a service.')],
        appointmentDate: [isRequired('Appointment date is required.'), isDateInFuture('Appointment date must be in the future.')],
        appointmentTime: [isRequired('Appointment time is required.'), isTimeValid('Please enter a valid time (e.g., 09:00).')]
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const isValid = validateForm(form, validationRules, data);

        if (isValid) {
            console.log('Appointment Data:', data);
            // Store mock data in localStorage
            const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            appointments.push({ ...data, id: Date.now(), status: 'Pending' });
            localStorage.setItem('appointments', JSON.stringify(appointments));

            // Open confirmation modal
            openModal(`
                <h2>Appointment Confirmed!</h2>
                <p>Thank you, <strong>${data.patientName}</strong>. Your appointment for <strong>${data.service}</strong> with ${data.doctor || 'Any Doctor'} on <strong>${data.appointmentDate} at ${data.appointmentTime}</strong> has been successfully submitted.</p>
                <p>A confirmation email will be sent to <strong>${data.patientEmail}</strong> shortly.</p>
                <p>We look forward to seeing you!</p>
            `);

            form.reset(); // Clear the form
        } else {
            console.log('Form validation failed.');
        }
    });

    // Add real-time validation feedback on input blur
    Object.keys(validationRules).forEach(fieldName => {
        const input = form.elements[fieldName];
        if (input) {
            input.addEventListener('blur', () => {
                const value = input.value;
                const errorDiv = document.getElementById(`${fieldName}-error`);
                const errors = validationRules[fieldName].map(rule => rule(value)).filter(Boolean);
                if (errors.length > 0) {
                    errorDiv.textContent = errors[0];
                    input.classList.add('invalid');
                } else {
                    errorDiv.textContent = '';
                    input.classList.remove('invalid');
                }
            });
        }
    });
};
