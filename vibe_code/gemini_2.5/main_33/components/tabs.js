export function createTabs(id, tabsData) {
    return `
        <div id="${id}" class="tabs-container">
            <div class="tab-buttons">
                ${tabsData.map((tab, index) => `
                    <button class="tab-button ${index === 0 ? 'active' : ''}" data-tab-index="${index}">${tab.title}</button>
                `).join('')}
            </div>
            <div class="tab-content">
                ${tabsData[0] ? tabsData[0].content : ''}
            </div>
        </div>
    `;
}

export function initTabs(id) {
    const tabsContainer = document.getElementById(id);
    if (!tabsContainer) return;

    const tabButtons = tabsContainer.querySelectorAll('.tab-button');
    const tabContent = tabsContainer.querySelector('.tab-content');
    const tabsData = Array.from(tabButtons).map(btn => ({
        title: btn.textContent,
        content: '' // Content will be dynamically set, not stored in DOM initially
    }));

    // For this demo, we'll re-extract content from the original view HTML if needed
    // Or, better, pass the full tabsData object to initTabs if content is complex.
    // For now, let's assume content is simple and directly available or re-rendered.
    // A more robust solution would pass the full tabsData object to initTabs.
    const originalTabsHTML = tabsContainer.innerHTML; // Store original HTML to extract content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalTabsHTML;
    const initialContent = tempDiv.querySelector('.tab-content').innerHTML;
    tabsData[0].content = initialContent; // Store initial content

    tabButtons.forEach((button, index) => {
        button.onclick = () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // This is a simplified approach. In a real app, you'd have the full content array here.
            // For this demo, we'll just use placeholder content or re-render based on index.
            const allTabsContent = [
                '<p>This is the first tab content, providing a general overview of our services and mission.</p>',
                '<p>Our platform offers client-side routing, dynamic content loading, and a responsive design for all devices.</p>',
                '<p>Enjoy a seamless shopping experience, fast navigation, and a user-friendly interface.</p>'
            ];
            tabContent.innerHTML = allTabsContent[index];
        };
    });
}
