import { createTabs } from '../components/tabs.js';

export const renderBuildings = (element, gameData, addItemToCart, cartItems) => {
    const allBuildings = gameData.buildings;

    element.innerHTML = `
        <section class="page-section container">
            <h2>Clash of Clans Buildings</h2>
            <p>Buildings are essential for your village's economy, defense, and troop training. Strategically place them to create an impenetrable base!</p>
            <div class="filter-controls">
                <input type="text" id="building-search" placeholder="Search buildings...">
                <select id="building-category-filter">
                    <option value="all">All Categories</option>
                    <option value="defense">Defense</option>
                    <option value="resource">Resource</option>
                    <option value="army">Army</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div id="buildings-list" class="grid-container"></div>
        </section>
    `;

    const buildingsListDiv = element.querySelector('#buildings-list');
    const searchInput = element.querySelector('#building-search');
    const categoryFilter = element.querySelector('#building-category-filter');

    const renderFilteredBuildings = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredBuildings = allBuildings.filter(building => {
            const matchesSearch = building.name.toLowerCase().includes(searchTerm) || building.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || building.category.toLowerCase() === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        buildingsListDiv.innerHTML = filteredBuildings.map(building => `
            <div class="card">
                <div class="card-image">${building.name}</div>
                <div class="card-content">
                    <h3>${building.name}</h3>
                    <p>${building.description}</p>
                    <p><strong>Category:</strong> ${building.category}</p>
                    <p><strong>Town Hall Level:</strong> ${building.minThLevel}</p>
                    <div class="card-actions">
                        <span class="price">Max Level: ${building.maxLevel}</span>
                        <button class="add-to-cart-btn" data-id="${building.id}" data-type="building">
                            ${cartItems.some(item => item.id === building.id && item.type === 'building') ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        buildingsListDiv.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.onclick = (e) => {
                const buildingId = parseInt(e.target.dataset.id);
                const building = allBuildings.find(b => b.id === buildingId);
                if (building) {
                    addItemToCart({ ...building, type: 'building' });
                    e.target.textContent = 'In Wishlist';
                    e.target.disabled = true;
                }
            };
        });
    };

    searchInput.addEventListener('input', renderFilteredBuildings);
    categoryFilter.addEventListener('change', renderFilteredBuildings);

    renderFilteredBuildings();
};
