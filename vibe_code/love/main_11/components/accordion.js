export const setupAccordion = (containerId = 'hero-strategy-accordion') => {
    const accordionContainer = document.getElementById(containerId);
    if (!accordionContainer) return;

    const accordionItems = accordionContainer.querySelectorAll('.accordion-item');

    if (accordionItems.length === 0) {
        console.warn(`Accordion components not found for ID: ${containerId}`);
        return;
    }

    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        if (!header || !content) return;

        // Set ARIA attributes
        const id = `${containerId}-item-${index}`;
        header.setAttribute('id', `accordion-header-${id}`);
        header.setAttribute('aria-controls', `accordion-content-${id}`);
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('tabindex', '0'); // Make headers focusable
        content.setAttribute('id', `accordion-content-${id}`);
        content.setAttribute('aria-labelledby', `accordion-header-${id}`);
        content.setAttribute('aria-hidden', 'true');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.accordion-content').setAttribute('aria-hidden', 'true');
                }
            });

            item.classList.toggle('active');
            header.setAttribute('aria-expanded', String(!isActive));
            content.setAttribute('aria-hidden', String(isActive));
        });

        // Keyboard navigation for headers
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextHeader = item.nextElementSibling?.querySelector('.accordion-header');
                if (nextHeader) {
                    nextHeader.focus();
                } else {
                    accordionItems[0].querySelector('.accordion-header').focus(); // Wrap around
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevHeader = item.previousElementSibling?.querySelector('.accordion-header');
                if (prevHeader) {
                    prevHeader.focus();
                } else {
                    accordionItems[accordionItems.length - 1].querySelector('.accordion-header').focus(); // Wrap around
                }
            }
        });
    });
};
