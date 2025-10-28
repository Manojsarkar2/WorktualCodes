export function createAccordion(id, itemsData) {
    return `
        <div id="${id}" class="accordion-container">
            ${itemsData.map((item, index) => `
                <div class="accordion-item">
                    <div class="accordion-header ${index === 0 ? 'active' : ''}" data-accordion-index="${index}">
                        <span>${item.header}</span>
                        <span class="icon">&#9660;</span>
                    </div>
                    <div class="accordion-content ${index === 0 ? 'is-open' : ''}">
                        ${item.content}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

export function initAccordion(id) {
    const accordionContainer = document.getElementById(id);
    if (!accordionContainer) return;

    const accordionHeaders = accordionContainer.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.onclick = () => {
            const currentContent = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Close all other accordions
            accordionHeaders.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('is-open');
                    h.nextElementSibling.style.maxHeight = null;
                    h.nextElementSibling.style.padding = '0 20px';
                }
            });

            // Toggle current accordion
            if (isActive) {
                header.classList.remove('active');
                currentContent.classList.remove('is-open');
                currentContent.style.maxHeight = null;
                currentContent.style.padding = '0 20px';
            } else {
                header.classList.add('active');
                currentContent.classList.add('is-open');
                currentContent.style.maxHeight = currentContent.scrollHeight + 'px'; // Set max-height to scrollHeight
                currentContent.style.padding = '15px 20px';
            }
        };
    });

    // Set initial max-height for the open accordion
    const initialOpenHeader = accordionContainer.querySelector('.accordion-header.active');
    if (initialOpenHeader) {
        const initialOpenContent = initialOpenHeader.nextElementSibling;
        initialOpenContent.style.maxHeight = initialOpenContent.scrollHeight + 'px';
        initialOpenContent.style.padding = '15px 20px';
    }
}
