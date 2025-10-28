import { createElement } from '../utils/helpers.js';
import store from '../store.js';

let modalOverlay = null;
let modalContent = null;
let modalTitleElement = null;
let modalBodyElement = null;
let closeButton = null;

function initializeModal() {
    if (modalOverlay) return; // Already initialized

    modalOverlay = createElement('div', { class: 'modal-overlay', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-title' });
    modalContent = createElement('div', { class: 'modal-content' });
    closeButton = createElement('button', { class: 'modal-close-btn', 'aria-label': 'Close modal' }, '×');
    modalTitleElement = createElement('h3', { id: 'modal-title' });
    modalBodyElement = createElement('div', { class: 'modal-body' });

    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    modalContent.append(closeButton, modalTitleElement, modalBodyElement);
    modalOverlay.appendChild(modalContent);
    document.getElementById('modal-root').appendChild(modalOverlay);

    // Trap focus inside the modal
    modalOverlay.addEventListener('keydown', handleTabKey);
}

function handleTabKey(e) {
    if (e.key === 'Tab') {
        const focusableElements = modalContent.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
    if (e.key === 'Escape') {
        closeModal();
    }
}

export function openModal(content, title = 'Modal Title') {
    initializeModal();

    modalTitleElement.textContent = title;
    modalBodyElement.innerHTML = '';
    modalBodyElement.appendChild(content);

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
    store.dispatch('OPEN_MODAL');

    // Focus the first focusable element in the modal
    setTimeout(() => {
        const firstFocusableElement = modalContent.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        } else {
            closeButton.focus(); // Fallback to close button
        }
    }, 100);
}

export function closeModal() {
    if (!modalOverlay) return;

    modalOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Restore scrolling
    store.dispatch('CLOSE_MODAL');

    // Restore focus to the element that opened the modal (if tracked)
    // For simplicity, we don't track it here, but a real app would.
}
