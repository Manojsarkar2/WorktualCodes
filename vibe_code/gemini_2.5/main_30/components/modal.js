let modalOverlay = null;
let modalContent = null;

const createModalElements = () => {
    if (modalOverlay) return; // Modal already exists

    modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-hidden', 'true');

    modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.setAttribute('role', 'document');

    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close modal');
    closeButton.onclick = closeModal;

    modalContent.appendChild(closeButton);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Close modal on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });
};

export const openModal = (contentHtml) => {
    createModalElements();

    // Clear previous content, then add new content after the close button
    while (modalContent.children.length > 1) {
        modalContent.removeChild(modalContent.lastChild);
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHtml;
    Array.from(tempDiv.children).forEach(child => modalContent.appendChild(child));

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling body when modal is open

    // Focus on the close button for accessibility
    modalContent.querySelector('.modal-close-btn').focus();
};

export const closeModal = () => {
    if (modalOverlay) {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore body scrolling
    }
};
