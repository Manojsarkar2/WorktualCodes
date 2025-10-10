// components/modal.js
export const createModal = (content) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            ${content}
        </div>
    `;
    return modal;
};

export const showModal = (modal) => {
    document.body.appendChild(modal);
    document.body.classList.add('modal-open'); // Prevent scrolling

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        closeModal(modal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
};

export const closeModal = (modal) => {
    document.body.removeChild(modal);
    document.body.classList.remove('modal-open');
};