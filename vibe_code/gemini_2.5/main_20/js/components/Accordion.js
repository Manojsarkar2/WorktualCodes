import { $ } from '../utils/dom.js';

export const Accordion = ({ question, answer }) => {
    const accordionItem = $.create('div', { class: 'accordion-item' });

    const header = $.create('div', { class: 'accordion-header', tabindex: '0', role: 'button', 'aria-expanded': 'false' });
    header.innerHTML = `
        <h4>${question}</h4>
        <img src="assets/images/plus-icon.svg" alt="Toggle icon" class="icon">
    `;

    const content = $.create('div', { class: 'accordion-content' });
    content.innerHTML = `<p>${answer}</p>`;

    accordionItem.appendChild(header);
    accordionItem.appendChild(content);

    header.addEventListener('click', () => {
        const isOpen = accordionItem.classList.toggle('open');
        header.setAttribute('aria-expanded', isOpen);
    });

    header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            header.click();
        }
    });

    return accordionItem;
};
