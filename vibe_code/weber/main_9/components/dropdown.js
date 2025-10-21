// components/dropdown.js
export const createDropdown = (options) => {
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const button = document.createElement('button');
    button.classList.add('dropdown-button');
    button.textContent = 'Select an option';
    dropdown.appendChild(button);

    const menu = document.createElement('div');
    menu.classList.add('dropdown-menu');
    menu.style.display = 'none'; // Initially hidden

    options.forEach(option => {
        const item = document.createElement('a');
        item.classList.add('dropdown-item');
        item.textContent = option.label;
        item.href = option.value;
        menu.appendChild(item);
    });

    dropdown.appendChild(menu);

    button.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });

    return dropdown;
};