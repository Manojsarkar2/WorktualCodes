export const initAccordion = (containerElement) => {
    if (!containerElement) return;

    const accordionHeaders = containerElement.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => toggleAccordion(header));
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(header);
            }
        });
    });

    function toggleAccordion(header) {
        const content = header.nextElementSibling;
        const isActive = header.classList.contains('active');

        header.classList.toggle('active', !isActive);
        header.setAttribute('aria-expanded', !isActive);
        content.classList.toggle('active', !isActive);
        content.setAttribute('aria-hidden', isActive);

        // Set max-height for smooth transition
        if (!isActive) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }
    }
};
