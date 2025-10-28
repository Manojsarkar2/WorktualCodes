import { createElement } from '../utils/helpers.js';
import { qs } from '../utils/dom.js';

export const Modal = ({ title, content, onClose }) => {
    const modalOverlay = createElement('div', { className: 'modal-overlay', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-title' });

    const modalContent = createElement('div', { className: 'modal-content', tabIndex: '-1' },
        createElement('div', { className: 'modal-header' },
            createElement('h3', { id: 'modal-title' }, title),
            createElement('button', { className: 'modal-close-btn', 'aria-label': 'Close modal' }, '×')
        ),
        createElement('div', { className: 'modal-body' }, content)
    );

    modalOverlay.appendChild(modalContent);

    const closeButton = qs('.modal-close-btn', modalContent);
    closeButton.addEventListener('click', onClose);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            onClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
            onClose();
        }
        if (e.key === 'Tab' && modalOverlay.classList.contains('is-open')) {
            // Trap focus within the modal
            const focusableElements = modalContent.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });

    return modalOverlay;
};
