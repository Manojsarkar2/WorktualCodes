const modalRoot = document.getElementById('modal-root');

export const openModal = (title, message) => {
    modalRoot.innerHTML = `
        <div class="modal-overlay" id="app-modal-overlay">
            <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <button class="modal-close-btn" aria-label="Close modal">&times;</button>
                <h3 id="modal-title">${title}</h3>
                <p>${message}</p>
            </div>
        </div>
    `;

    const modalOverlay = modalRoot.querySelector('#app-modal-overlay');
    const closeBtn = modalRoot.querySelector('.modal-close-btn');

    // Add class to trigger animation
    requestAnimationFrame(() => {
        modalOverlay.classList.add('open');
    });

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Focus on close button for accessibility
    closeBtn.focus();
};

export const closeModal = () => {
    const modalOverlay = modalRoot.querySelector('#app-modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('open');
        // Wait for transition to finish before removing from DOM
        modalOverlay.addEventListener('transitionend', () => {
            modalRoot.innerHTML = '';
        }, { once: true });
    }
};
