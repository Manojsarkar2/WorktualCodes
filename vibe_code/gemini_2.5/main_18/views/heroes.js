import { createTabs } from '../components/tabs.js';

export const renderHeroes = (element, gameData, addItemToCart, cartItems) => {
    const allHeroes = gameData.heroes;

    element.innerHTML = `
        <section class="page-section container">
            <h2>Clash of Clans Heroes</h2>
            <p>Heroes are powerful, immortal units that lead your army into battle and defend your village. Upgrade them to unlock their full potential!</p>
            <div class="filter-controls">
                <input type="text" id="hero-search" placeholder="Search heroes...">
                <select id="hero-type-filter">
                    <option value="all">All Types</option>
                    <option value="dark-elixir">Dark Elixir</option>
                    <option value="elixir">Elixir</option>
                </select>
            </div>
            <div id="heroes-list" class="grid-container"></div>
        </section>
    `;

    const heroesListDiv = element.querySelector('#heroes-list');
    const searchInput = element.querySelector('#hero-search');
    const typeFilter = element.querySelector('#hero-type-filter');

    const renderFilteredHeroes = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;

        const filteredHeroes = allHeroes.filter(hero => {
            const matchesSearch = hero.name.toLowerCase().includes(searchTerm) || hero.description.toLowerCase().includes(searchTerm);
            const matchesType = selectedType === 'all' || hero.type.toLowerCase() === selectedType;
            return matchesSearch && matchesType;
        });

        heroesListDiv.innerHTML = filteredHeroes.map(hero => `
            <div class="card">
                <div class="card-image">${hero.name}</div>
                <div class="card-content">
                    <h3>${hero.name}</h3>
                    <p>${hero.description}</p>
                    <p><strong>Type:</strong> ${hero.type}</p>
                    <p><strong>Ability:</strong> ${hero.ability}</p>
                    <div class="card-actions">
                        <span class="price">Level: ${hero.maxLevel}</span>
                        <button class="add-to-cart-btn" data-id="${hero.id}" data-type="hero">
                            ${cartItems.some(item => item.id === hero.id && item.type === 'hero') ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        heroesListDiv.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.onclick = (e) => {
                const heroId = parseInt(e.target.dataset.id);
                const hero = allHeroes.find(h => h.id === heroId);
                if (hero) {
                    addItemToCart({ ...hero, type: 'hero' });
                    e.target.textContent = 'In Wishlist';
                    e.target.disabled = true;
                }
            };
        });
    };

    searchInput.addEventListener('input', renderFilteredHeroes);
    typeFilter.addEventListener('change', renderFilteredHeroes);

    renderFilteredHeroes();
};
