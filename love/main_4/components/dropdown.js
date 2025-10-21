// components/dropdown.js

// Example usage:
// <div id="dropdown-container"></div>
// Dropdown(['Option 1', 'Option 2', 'Option 3'], (selected) => console.log(selected), 'dropdown-container');

const Dropdown = (options, onSelect, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found.`);
        return;
    }

    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';

    const button = document.createElement('button');
    button.className = 'dropdown-button';
    button.textContent = 'Select an option';
    dropdown.appendChild(button);

    const menu = document.createElement('div');
    menu.className = 'dropdown-menu';
    menu.style.display = 'none';

    options.forEach(option => {
        const item = document.createElement('a');
        item.href = '#';
        item.textContent = option;
        item.addEventListener('click', (e) => {
            e.preventDefault();
            onSelect(option);
            button.textContent = option;
            menu.style.display = 'none';
        });
        menu.appendChild(item);
    });

    dropdown.appendChild(menu);

    button.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });

    container.appendChild(dropdown);
};

export default Dropdown;