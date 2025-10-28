import { getElement } from '../utils/dom.js';

let currentModalContent = null;

/**
 * Generates and displays a modal with the given content.
 * @param {string} title - The title of the modal.
 * @param {string} contentHTML - The HTML content to display inside the modal.
 * @param {function} [onCloseCallback] - Optional callback function when the modal is closed.
 */
export function showModal(title, contentHTML, onCloseCallback = null) {
    const modalRoot = getElement('#modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
        <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div class="modal-content">
                <button class="modal-close-btn" aria-label="Close modal">&times;</button>
                <h2 id="modal-title">${title}</h2>
                <div class="modal-body">${contentHTML}</div>
            </div>
        </div>
    `;

    const modalOverlay = modalRoot.querySelector('.modal-overlay');
    const closeBtn = modalRoot.querySelector('.modal-close-btn');

    if (modalOverlay && closeBtn) {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background

        const closeHandler = () => {
            hideModal();
            if (onCloseCallback) {
                onCloseCallback();
            }
        };

        closeBtn.addEventListener('click', closeHandler);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeHandler();
            }
        });

        currentModalContent = modalRoot.querySelector('.modal-body');
    }
}

/**
 * Hides the currently open modal.
 */
export function hideModal() {
    const modalRoot = getElement('#modal-root');
    if (!modalRoot) return;

    const modalOverlay = modalRoot.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
        // Clear content after transition for accessibility/cleanup
        modalOverlay.addEventListener('transitionend', () => {
            if (!modalOverlay.classList.contains('open')) {
                modalRoot.innerHTML = '';
                currentModalContent = null;
            }
        }, { once: true });
    }
}

/**
 * Gets the content element of the currently open modal.
 * Useful for attaching event listeners to dynamically loaded modal content.
 * @returns {HTMLElement|null} The modal body element or null if no modal is open.
 */
export function getModalContentElement() {
    return currentModalContent;
}