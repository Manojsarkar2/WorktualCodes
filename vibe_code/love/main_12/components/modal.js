export const openModal = (container, contentHTML) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-labelledby', 'modal-title');

    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close-btn" aria-label="Close modal">&times;</button>
            ${contentHTML}
        </div>
    `;

    container.appendChild(modalOverlay);

    // Add event listener to close button
    modalOverlay.querySelector('.modal-close-btn').addEventListener('click', () => closeModal(modalOverlay));

    // Close modal when clicking outside content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });

    // Close modal with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal(modalOverlay);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Animate in
    setTimeout(() => modalOverlay.classList.add('open'), 10);
};

export const closeModal = (modalOverlay) => {
    if (modalOverlay) {
        modalOverlay.classList.remove('open');
        modalOverlay.addEventListener('transitionend', () => {
            modalOverlay.remove();
        }, { once: true });
    }
};
