const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

export const showModal = (contentHTML) => {
    modalContent.innerHTML = `
        <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        ${contentHTML}
    `;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background

    // Add event listener for close button
    const closeBtn = modalContent.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideModal);
    }

    // Close modal on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            hideModal();
        }
    }, { once: true }); // Use once: true to prevent multiple listeners
};

export const hideModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    modalContent.innerHTML = ''; // Clear content
};
