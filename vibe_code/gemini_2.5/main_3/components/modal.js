export const createModal = (id, title, contentHtml) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.id = `${id}-modal-overlay`;
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-labelledby', `${id}-modal-title`);

    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close-button" aria-label="Close modal">&times;</button>
            <h2 id="${id}-modal-title">${title}</h2>
            <div class="modal-body">${contentHtml}</div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    const closeButton = modalOverlay.querySelector('.modal-close-button');
    closeButton.addEventListener('click', () => closeModal(id));

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(id);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
            closeModal(id);
        }
    });

    return modalOverlay;
};

export const openModal = (id) => {
    const modalOverlay = document.getElementById(`${id}-modal-overlay`);
    if (modalOverlay) {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
        modalOverlay.querySelector('.modal-content').focus(); // Focus on modal content
    }
};

export const closeModal = (id) => {
    const modalOverlay = document.getElementById(`${id}-modal-overlay`);
    if (modalOverlay) {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    }
};
