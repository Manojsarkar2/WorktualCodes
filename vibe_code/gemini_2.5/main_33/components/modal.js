let modalContainer;
let modalContent;

export function createModal(containerElement) {
    modalContainer = containerElement;
    modalContent = modalContainer.querySelector('.modal-content');

    // Add close button to modal content
    const closeBtn = document.createElement('span');
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeModal;
    modalContent.prepend(closeBtn);

    // Close modal when clicking outside content
    modalContainer.querySelector('.modal-backdrop').onclick = closeModal;
}

export function openModal(title, content, onCloseCallback = null) {
    if (!modalContainer || !modalContent) {
        console.error('Modal not initialized. Call createModal first.');
        return;
    }

    modalContent.innerHTML = `
        <span class="modal-close-btn">&times;</span>
        <h2>${title}</h2>
        <div>${content}</div>
    `;
    // Re-attach close button listener as content was overwritten
    modalContent.querySelector('.modal-close-btn').onclick = closeModal;

    modalContainer.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling body when modal is open

    modalContainer.dataset.onCloseCallback = onCloseCallback ? 'true' : 'false';
    if (onCloseCallback) {
        window._modalOnClose = onCloseCallback; // Store callback globally for simplicity
    }
}

export function closeModal() {
    if (!modalContainer) return;

    modalContainer.classList.remove('is-open');
    document.body.style.overflow = ''; // Restore body scrolling

    if (modalContainer.dataset.onCloseCallback === 'true' && window._modalOnClose) {
        window._modalOnClose();
        delete window._modalOnClose;
        modalContainer.dataset.onCloseCallback = 'false';
    }
}
