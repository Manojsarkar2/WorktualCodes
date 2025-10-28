let modalOverlay;
let modalContentContainer;

export const createModal = (rootElement) => {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-hidden', 'true');

    modalContentContainer = document.createElement('div');
    modalContentContainer.className = 'modal-content-container'; // A wrapper for content
    modalOverlay.appendChild(modalContentContainer);
    rootElement.appendChild(modalOverlay);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });
};

export const openModal = (rootElement, contentHtml) => {
    if (!modalOverlay || !modalContentContainer) {
        createModal(rootElement);
    }

    modalContentContainer.innerHTML = contentHtml;
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling body

    // Attach close button listener
    const closeBtn = modalContentContainer.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Focus first focusable element in modal for accessibility
    const focusableElements = modalContentContainer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
};

export const closeModal = () => {
    if (modalOverlay) {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore body scrolling
        modalContentContainer.innerHTML = ''; // Clear content
    }
};
