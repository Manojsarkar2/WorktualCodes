import { createElement } from '../utils.js';
import { Button } from './Button.js';
import { api } from '../api.js';

export const ContactSection = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            date: form.date.value,
            department: form.department.value,
            message: form.message.value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.department) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const result = await api.submitAppointment(formData);
            alert(result.message);
            form.reset(); // Clear the form
        } catch (error) {
            console.error('Error submitting appointment:', error);
            alert('Failed to book appointment. Please try again.');
        }
    };

    return createElement('section', { id: 'contact', className: 'contact-section section-padding' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'contact-grid' },
                createElement('div', { className: 'contact-form-wrapper' },
                    createElement('div', { className: 'section-header text-left' },
                        createElement('h2', { className: 'section-title' }, 'Book An Appointment'),
                        createElement('p', { className: 'section-subtitle' }, 'Schedule your visit with us. Fill out the form below and our team will get back to you shortly.')
                    ),
                    createElement('form', { className: 'appointment-form', onsubmit: handleSubmit },
                        createElement('div', { className: 'form-group' },
                            createElement('input', { type: 'text', name: 'name', placeholder: 'Your Name', required: true })
                        ),
                        createElement('div', { className: 'form-group' },
                            createElement('input', { type: 'email', name: 'email', placeholder: 'Your Email', required: true })
                        ),
                        createElement('div', { className: 'form-group' },
                            createElement('input', { type: 'tel', name: 'phone', placeholder: 'Your Phone', required: true })
                        ),
                        createElement('div', { className: 'form-group' },
                            createElement('input', { type: 'date', name: 'date', required: true })
                        ),
                        createElement('div', { className: 'form-group' },
                            createElement('select', { name: 'department', required: true },
                                createElement('option', { value: '' }, 'Select Department'),
                                createElement('option', { value: 'Cardiology' }, 'Cardiology'),
                                createElement('option', { value: 'Pediatrics' }, 'Pediatrics'),
                                createElement('option', { value: 'Neurology' }, 'Neurology'),
                                createElement('option', { value: 'General' }, 'General Check-up')
                            )
                        ),
                        createElement('div', { className: 'form-group' },
                            createElement('textarea', { name: 'message', placeholder: 'Your Message (optional)', rows: '5' })
                        ),
                        Button({ text: 'Book an Appointment', type: 'primary', className: 'form-submit-btn' })
                    )
                ),
                createElement('div', { className: 'contact-info-wrapper' },
                    createElement('img', { src: 'src/assets/img/about-us.jpg', alt: 'Contact Us', className: 'contact-image' }),
                    createElement('div', { className: 'contact-details-box' },
                        createElement('h3', {}, 'Get In Touch'),
                        createElement('ul', { className: 'contact-list' },
                            createElement('li', {}, createElement('i', { className: 'fas fa-map-marker-alt' }), ' 123 Health St, Medical City, MC 45678'),
                            createElement('li', {}, createElement('i', { className: 'fas fa-phone' }), ' +1 (555) 123-4567'),
                            createElement('li', {}, createElement('i', { className: 'fas fa-envelope' }), ' info@medcare.com'),
                            createElement('li', {}, createElement('i', { className: 'fas fa-clock' }), ' Mon - Fri: 9:00 AM - 6:00 PM')
                        )
                    )
                )
            )
        )
    );
};
