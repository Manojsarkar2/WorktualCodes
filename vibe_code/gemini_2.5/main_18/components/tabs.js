export const createTabs = (element, tabsData) => {
    if (!tabsData || tabsData.length === 0) {
        element.innerHTML = '<p>No tabs content available.</p>';
        return;
    }

    const tabNavHtml = tabsData.map((tab, index) => `
        <button class="tab-button ${index === 0 ? 'active' : ''}" data-tab="${tab.id}" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}" aria-controls="panel-${tab.id}" id="tab-${tab.id}">
            ${tab.label}
        </button>
    `).join('');

    const tabContentHtml = tabsData.map((tab, index) => `
        <div class="tab-content ${index === 0 ? 'active' : ''}" id="panel-${tab.id}" role="tabpanel" aria-labelledby="tab-${tab.id}" ${index !== 0 ? 'hidden' : ''}>
            ${tab.content}
        </div>
    `).join('');

    element.innerHTML = `
        <div class="tabs-container">
            <div class="tabs-nav" role="tablist">${tabNavHtml}</div>
            <div class="tabs-panels">${tabContentHtml}</div>
        </div>
    `;

    const tabButtons = element.querySelectorAll('.tab-button');
    const tabContents = element.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tab;

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.setAttribute('hidden', 'true');
            });

            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            element.querySelector(`#panel-${targetTabId}`).classList.add('active');
            element.querySelector(`#panel-${targetTabId}`).removeAttribute('hidden');
        });
    });
};
