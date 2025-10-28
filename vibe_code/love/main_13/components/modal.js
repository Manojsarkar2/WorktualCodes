let currentModalOverlay = null;

export const renderModal = (contentHTML) => {
    if (currentModalOverlay) {
        closeModal(); // Close any existing modal first
    }

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-labelledby', 'modal-title');

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = contentHTML;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Add active class to trigger CSS transitions
    setTimeout(() => {
        modalOverlay.classList.add('active');
        // Focus on the first focusable element inside the modal
        const focusableElements = modalContent.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }, 10);

    currentModalOverlay = modalOverlay;

    // Close modal on overlay click or close button click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay || e.target.closest('[data-action="close-modal"]')) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', handleEscapeKey);
};

export const closeModal = () => {
    if (currentModalOverlay) {
        currentModalOverlay.classList.remove('active');
        currentModalOverlay.addEventListener('transitionend', () => {
            if (currentModalOverlay && !currentModalOverlay.classList.contains('active')) {
                currentModalOverlay.remove();
                currentModalOverlay = null;
                document.removeEventListener('keydown', handleEscapeKey);
            }
        }, { once: true });
    }
};

const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
};
