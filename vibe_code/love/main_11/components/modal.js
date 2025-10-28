export const setupModal = (modalId, openBtnId, closeBtnClass) => {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = modal ? modal.querySelector(closeBtnClass) : null;

    if (!modal || !openBtn || !closeBtn) {
        console.warn(`Modal components not found for ID: ${modalId}`);
        return;
    }

    const openModal = () => {
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll');
        modal.setAttribute('aria-hidden', 'false');
        modal.focus(); // Focus the modal for accessibility
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
        modal.setAttribute('aria-hidden', 'true');
        openBtn.focus(); // Return focus to the button that opened it
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close with Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Trap focus inside modal (basic implementation)
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && modal.style.display === 'flex') {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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
};
