import { renderLoginForm, renderSignupForm } from './forms.js';

const modalRoot = document.getElementById('modal-root');

export const showModal = (type) => {
    modalRoot.innerHTML = `
        <div class="modal-overlay active">
            <div class="modal-content">
                <button class="modal-close-btn" aria-label="Close modal"><i class="fas fa-times"></i></button>
                <div id="modal-form-content"></div>
            </div>
        </div>
    `;

    const modalFormContent = document.getElementById('modal-form-content');
    if (type === 'login') {
        renderLoginForm(modalFormContent);
    } else if (type === 'signup') {
        renderSignupForm(modalFormContent);
    }

    const modalOverlay = modalRoot.querySelector('.modal-overlay');
    const closeModalBtn = modalRoot.querySelector('.modal-close-btn');

    closeModalBtn.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });

    // Handle switching between login/signup forms within the modal
    modalFormContent.addEventListener('click', (e) => {
        if (e.target.id === 'switch-to-signup') {
            e.preventDefault();
            renderSignupForm(modalFormContent);
        }
        if (e.target.id === 'switch-to-login') {
            e.preventDefault();
            renderLoginForm(modalFormContent);
        }
    });
};

export const hideModal = () => {
    const modalOverlay = modalRoot.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        // Give time for transition before removing from DOM
        setTimeout(() => {
            modalRoot.innerHTML = '';
        }, 300);
    }
};
