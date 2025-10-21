// components/modal.js

function createModal() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'modal';
    modalDiv.classList.add('modal');
    modalDiv.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p id="modal-message"></p>
        </div>
    `;
    return modalDiv;
}

// Export the function to make it accessible
// In a pure-JS environment, you can attach it to the window object
window.createModal = createModal;