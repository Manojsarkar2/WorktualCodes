import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { router } from './components/router.js';
import { state } from './components/state.js';
import { initThemeToggle } from './components/themeToggle.js';
import { openModal, closeModal } from './components/modal.js';
import { renderLoginForm, renderSignupForm } from './components/forms.js';

const appRoot = document.getElementById('root');
const appHeader = document.getElementById('app-header');
const appContent = document.getElementById('app-content');
const appFooter = document.getElementById('app-footer');
const modalContainer = document.getElementById('modal-container');

// Initialize the application
const initApp = () => {
    // Load initial state (theme, user) from localStorage
    state.loadInitialState();

    // Apply theme immediately
    document.body.classList.toggle('light-theme', state.get('theme') === 'light');

    // Render header and footer
    appHeader.innerHTML = renderHeader();
    appFooter.innerHTML = renderFooter();

    // Initialize theme toggle functionality
    initThemeToggle();

    // Initialize routing
    router.init(appContent);

    // Event delegation for login/signup buttons in header
    appHeader.addEventListener('click', (e) => {
        if (e.target.closest('.login-btn')) {
            openModal(modalContainer, renderLoginForm(modalContainer));
        } else if (e.target.closest('.signup-btn')) {
            openModal(modalContainer, renderSignupForm(modalContainer));
        } else if (e.target.closest('.logout-btn')) {
            state.logoutUser();
            appHeader.innerHTML = renderHeader(); // Re-render header to update auth state
            router.navigate('/'); // Redirect to home after logout
        }
    });

    // Event delegation for switching between login/signup forms within modal
    modalContainer.addEventListener('click', (e) => {
        if (e.target.closest('.switch-to-signup')) {
            e.preventDefault();
            openModal(modalContainer, renderSignupForm(modalContainer));
        } else if (e.target.closest('.switch-to-login')) {
            e.preventDefault();
            openModal(modalContainer, renderLoginForm(modalContainer));
        }
    });

    // Listen for state changes (e.g., user login/logout) to update header
    state.subscribe('currentUser', () => {
        appHeader.innerHTML = renderHeader();
    });
};

// Run the app initialization when the DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
