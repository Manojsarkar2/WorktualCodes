// components/accordion.js
export const createAccordion = (items) => {
    const accordion = document.createElement('div');
    accordion.classList.add('accordion');

    items.forEach(item => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        const header = document.createElement('div');
        header.classList.add('accordion-header');
        header.textContent = item.title;
        accordionItem.appendChild(header);

        const content = document.createElement('div');
        content.classList.add('accordion-content');
        content.textContent = item.content;
        accordionItem.appendChild(content);

        // Initially hide the content
        content.style.display = 'none';

        header.addEventListener('click', () => {
            // Toggle the content display
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });

        accordion.appendChild(accordionItem);
    });

    return accordion;
};