// components/dropdown.js

function createDropdown(options) {
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    dropdown.innerHTML = `
        <button class="dropdown-button">Select an option</button>
        <div class="dropdown-content">
            ${options.map(option => `<a href="#" onclick="selectOption('${option}')">${option}</a>`).join('')}
        </div>
    `;
    return dropdown;
}

function selectOption(option) {
    alert(`Selected: ${option}`);
}

// Export the function to make it accessible
// In a pure-JS environment, you can attach it to the window object
window.createDropdown = createDropdown;
window.selectOption = selectOption;