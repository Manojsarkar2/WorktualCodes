// components/tabs.js
export const createTabs = (tabsData) => {
    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs');

    const tabList = document.createElement('ul');
    tabList.classList.add('tab-list');

    const tabContentContainer = document.createElement('div');
    tabContentContainer.classList.add('tab-content');

    tabsData.forEach((tab, index) => {
        const tabItem = document.createElement('li');
        tabItem.classList.add('tab-item');
        tabItem.textContent = tab.label;
        tabList.appendChild(tabItem);

        const tabContent = document.createElement('div');
        tabContent.classList.add('tab-panel');
        tabContent.setAttribute('data-tab', tab.label);
        tabContent.textContent = tab.content;
        tabContentContainer.appendChild(tabContent);

        if (index === 0) {
            tabContent.classList.add('active');
            tabItem.classList.add('active');
        }

        tabItem.addEventListener('click', () => {
            // Deactivate all tabs and content
            document.querySelectorAll('.tab-item').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

            // Activate the clicked tab and content
            tabItem.classList.add('active');
            tabContent.classList.add('active');
        });
    });

    tabsContainer.appendChild(tabList);
    tabsContainer.appendChild(tabContentContainer);
    return tabsContainer;
};