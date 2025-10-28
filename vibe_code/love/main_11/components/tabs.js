export const setupTabs = (containerId = 'shop-tabs') => {
    const tabsContainer = document.getElementById(containerId);
    if (!tabsContainer) return;

    const tabButtons = tabsContainer.querySelectorAll('.tab-button');
    const tabContents = tabsContainer.querySelectorAll('.tab-content');

    if (tabButtons.length === 0 || tabContents.length === 0) {
        console.warn(`Tabs components not fully found for ID: ${containerId}`);
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tab;

            // Deactivate all buttons and hide all content
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
            });
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.setAttribute('aria-hidden', 'true');
            });

            // Activate clicked button and show target content
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            button.setAttribute('tabindex', '0');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.style.display = 'block';
                targetContent.setAttribute('aria-hidden', 'false');
            }
        });

        // Initialize ARIA attributes
        if (button.classList.contains('active')) {
            button.setAttribute('aria-selected', 'true');
            button.setAttribute('tabindex', '0');
        } else {
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
        }
    });

    // Initialize content ARIA attributes
    tabContents.forEach(content => {
        if (content.style.display === 'none') {
            content.setAttribute('aria-hidden', 'true');
        } else {
            content.setAttribute('aria-hidden', 'false');
        }
    });

    // Keyboard navigation for tab buttons
    tabsContainer.addEventListener('keydown', (e) => {
        const activeTab = tabsContainer.querySelector('.tab-button.active');
        if (!activeTab) return;

        let nextTab = null;
        if (e.key === 'ArrowRight') {
            nextTab = activeTab.nextElementSibling;
            if (!nextTab || !nextTab.classList.contains('tab-button')) {
                nextTab = tabButtons[0]; // Wrap around
            }
        } else if (e.key === 'ArrowLeft') {
            nextTab = activeTab.previousElementSibling;
            if (!nextTab || !nextTab.classList.contains('tab-button')) {
                nextTab = tabButtons[tabButtons.length - 1]; // Wrap around
            }
        }

        if (nextTab) {
            e.preventDefault();
            nextTab.focus();
            nextTab.click(); // Activate the tab
        }
    });
};
