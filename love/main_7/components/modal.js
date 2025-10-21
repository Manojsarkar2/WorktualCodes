// components/modal.js

const createModal = () => {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
        modalContainer.innerHTML = `
            <div class="modal">
                <span class="close-button">×</span>
                <h2>Modal Title</h2>
                <p>This is the modal content.</p>
            </div>
        `;

        // Example of how to open and close the modal
        const openModalButton = document.getElementById('open-modal');
        const closeModalButton = document.querySelector('.close-button');

        if (openModalButton) {
            openModalButton.addEventListener('click', () => {
                modalContainer.style.display = 'flex';
            });
        }

        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => {
                modalContainer.style.display = 'none';
            });
        }

        modalContainer.addEventListener('click', (event) => {
            if (event.target === modalContainer) {
                modalContainer.style.display = 'none';
            }
        });
    }
};

createModal();