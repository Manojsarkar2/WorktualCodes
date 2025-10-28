import { createTabs } from '../components/tabs.js';

export const renderTroops = (element, gameData, addItemToCart, cartItems) => {
    const allTroops = gameData.troops;

    element.innerHTML = `
        <section class="page-section container">
            <h2>Clash of Clans Troops</h2>
            <p>Troops are the backbone of your army, each with unique strengths and weaknesses. Train them in the Barracks and Dark Barracks!</p>
            <div class="filter-controls">
                <input type="text" id="troop-search" placeholder="Search troops...">
                <select id="troop-type-filter">
                    <option value="all">All Types</option>
                    <option value="elixir">Elixir</option>
                    <option value="dark-elixir">Dark Elixir</option>
                    <option value="super-troop">Super Troop</option>
                </select>
            </div>
            <div id="troops-list" class="grid-container"></div>
        </section>
    `;

    const troopsListDiv = element.querySelector('#troops-list');
    const searchInput = element.querySelector('#troop-search');
    const typeFilter = element.querySelector('#troop-type-filter');

    const renderFilteredTroops = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;

        const filteredTroops = allTroops.filter(troop => {
            const matchesSearch = troop.name.toLowerCase().includes(searchTerm) || troop.description.toLowerCase().includes(searchTerm);
            const matchesType = selectedType === 'all' || troop.type.toLowerCase() === selectedType;
            return matchesSearch && matchesType;
        });

        troopsListDiv.innerHTML = filteredTroops.map(troop => `
            <div class="card">
                <div class="card-image">${troop.name}</div>
                <div class="card-content">
                    <h3>${troop.name}</h3>
                    <p>${troop.description}</p>
                    <p><strong>Type:</strong> ${troop.type}</p>
                    <p><strong>Housing Space:</strong> ${troop.housingSpace}</p>
                    <div class="card-actions">
                        <span class="price">Level: ${troop.maxLevel}</span>
                        <button class="add-to-cart-btn" data-id="${troop.id}" data-type="troop">
                            ${cartItems.some(item => item.id === troop.id && item.type === 'troop') ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        troopsListDiv.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.onclick = (e) => {
                const troopId = parseInt(e.target.dataset.id);
                const troop = allTroops.find(t => t.id === troopId);
                if (troop) {
                    addItemToCart({ ...troop, type: 'troop' });
                    e.target.textContent = 'In Wishlist';
                    e.target.disabled = true;
                }
            };
        });
    };

    searchInput.addEventListener('input', renderFilteredTroops);
    typeFilter.addEventListener('change', renderFilteredTroops);

    renderFilteredTroops();
};
