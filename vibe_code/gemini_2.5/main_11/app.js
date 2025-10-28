import { router } from './router.js';
import { store } from './store.js';
import { HomeView } from './views/Home.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { Modal } from './components/Modal.js';
import * as api from './api.js';
import { qs } from './utils/dom.js';

const appRoot = qs('#app-root');

const renderApp = () => {
    appRoot.innerHTML = ''; // Clear previous content

    // Render Navbar
    const navbarElement = Navbar();
    appRoot.appendChild(navbarElement);

    // Render main content (HomeView for this single-page app)
    const mainContent = document.createElement('main');
    mainContent.id = 'main-content';
    mainContent.appendChild(HomeView());
    appRoot.appendChild(mainContent);

    // Render Footer
    const footerElement = Footer();
    appRoot.appendChild(footerElement);

    // Render Modal (initially hidden)
    const appointmentModal = Modal({
        title: 'Book an Appointment',
        content: `
            <form id="appointment-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone">

                <label for="date">Preferred Date:</label>
                <input type="date" id="date" name="date" required>

                <label for="time">Preferred Time:</label>
                <input type="time" id="time" name="time" required>

                <label for="message">Message (optional):</label>
                <textarea id="message" name="message" rows="4"></textarea>

                <button type="submit" class="btn btn-primary">Submit Appointment</button>
            </form>
        `,
        onClose: () => store.setState({ isModalOpen: false })
    });
    appRoot.appendChild(appointmentModal);

    // Handle appointment form submission
    const appointmentForm = qs('#appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const result = await api.submitAppointment(data);
                alert(result.message);
                if (result.success) {
                    store.setState({ isModalOpen: false });
                    appointmentForm.reset();
                }
            } catch (error) {
                console.error('Appointment submission failed:', error);
                alert('Failed to book appointment. Please try again.');
            }
        });
    }

    // Initialize router after content is rendered
    router.init();
};

// Subscribe to modal state changes
store.subscribe('isModalOpen', (isModalOpen) => {
    const modalOverlay = qs('.modal-overlay');
    if (modalOverlay) {
        if (isModalOpen) {
            modalOverlay.classList.add('is-open');
            qs('.modal-content', modalOverlay).focus(); // Focus modal for accessibility
        } else {
            modalOverlay.classList.remove('is-open');
        }
    }
});

// Initial render
document.addEventListener('DOMContentLoaded', renderApp);

// Global event listener for 'Appointment' buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-appointment')) {
        store.setState({ isModalOpen: true });
    }
});
