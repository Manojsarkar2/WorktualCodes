export function createDropdown(id) {
    // The HTML structure is already in home.js, this function is just a placeholder
    // for consistency if we wanted dynamic dropdown content generation.
    // For this demo, it's assumed the dropdown HTML is static in the view.
    return ''; 
}

export function initDropdown(id) {
    const dropdownContainer = document.getElementById(id);
    if (!dropdownContainer) return;

    const dropdownButton = dropdownContainer.querySelector('.dropdown-button');
    const dropdownContent = dropdownContainer.querySelector('.dropdown-content');

    dropdownButton.onclick = () => {
        dropdownContainer.classList.toggle('is-open');
    };

    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', (event) => {
        if (!dropdownContainer.contains(event.target)) {
            dropdownContainer.classList.remove('is-open');
        }
    });
}
