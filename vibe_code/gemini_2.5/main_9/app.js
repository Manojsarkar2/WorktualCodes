import Router from './router.js';
import { HomeView } from './views/HomeView.js';
import { NotFoundView } from './views/NotFoundView.js';
import store from './store.js';
import { openModal, closeModal } from './components/Modal.js';
import { AppointmentForm } from './components/AppointmentForm.js';

const appRoot = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');

const router = new Router(appRoot);

// Define routes
router.addRoute('/', HomeView);
router.addRoute('/home', HomeView);
router.addRoute('/404', NotFoundView);

// Global event listener for navigation links
document.addEventListener('click', e => {
    const { target } = e;

    // Handle internal navigation links
    if (target.matches('[data-link]')) {
        e.preventDefault();
        router.navigate(target.href);
    }

    // Handle 'Make an Appointment' button click
    if (target.matches('.btn-appointment')) {
        e.preventDefault();
        openAppointmentModal();
    }
});

// Handle popstate for browser back/forward buttons
window.addEventListener('popstate', () => {
    router.render(router.getRoute());
});

// Initial render
router.render(router.getRoute());

// Function to open the appointment modal
function openAppointmentModal() {
    const form = new AppointmentForm({
        onSubmit: async (formData) => {
            console.log('Appointment form submitted:', formData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Appointment request sent successfully! We will contact you shortly.');
            closeModal();
        },
        onCancel: () => {
            closeModal();
        }
    });
    openModal(form.render(), 'Make an Appointment');
}

// Example of store usage (optional, for demonstration)
store.subscribe(() => {
    // console.log('Store updated:', store.getState());
});

// Initial state setup (e.g., fetching user data)
// store.dispatch('SET_USER', { name: 'Guest' });
