// components/modal.js

export const showModal = (content) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <span class="close-button" onclick="closeModal()">×</span>
                ${content}
            </div>
        </div>
    `;
};

export const closeModal = () => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
};
