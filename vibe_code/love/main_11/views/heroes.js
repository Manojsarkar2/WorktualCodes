import { heroes } from '../data/heroes.js';

export const getHeroesPageContent = async () => {
    return `
        <section class="hero-section text-center">
            <h1>Meet the Heroes of Clash of Clans</h1>
            <p class="lead">Powerful leaders with unique abilities to turn the tide of battle.</p>
        </section>

        <div class="search-filter-container">
            <input type="text" id="hero-search" placeholder="Search heroes..." aria-label="Search heroes">
            <select id="hero-type-filter" aria-label="Filter by hero type">
                <option value="all">All Types</option>
                <option value="Melee">Melee</option>
                <option value="Ranged">Ranged</option>
                <option value="Support">Support</option>
            </select>
        </div>

        <div class="hero-grid" id="heroes-list">
            ${heroes.map(hero => `
                <div class="card hero-card">
                    <h3>${hero.name}</h3>
                    <p><strong>Type:</strong> ${hero.type}</p>
                    <p><strong>Ability:</strong> ${hero.ability}</p>
                    <p><strong>Max Levels:</strong> ${hero.levels}</p>
                    <p>${hero.description}</p>
                </div>
            `).join('')}
        </div>

        <section class="accordion-section">
            <h2>Hero Strategy Tips</h2>
            <div class="accordion-container" id="hero-strategy-accordion">
                <div class="accordion-item">
                    <div class="accordion-header">Barbarian King Strategy <span class="icon">&#9660;</span></div>
                    <div class="accordion-content">
                        <p>The Barbarian King is excellent for tanking damage and clearing outer buildings. Use his Iron Fist ability strategically to break through walls or to finish off key defenses. Pair him with healers for sustained pushes.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <div class="accordion-header">Archer Queen Strategy <span class="icon">&#9660;</span></div>
                    <div class="accordion-content">
                        <p>The Archer Queen is a powerful damage dealer, especially when protected. Use her Royal Cloak ability to avoid damage from powerful defenses or to take out the Town Hall without retaliation. She excels at funneling and sniping.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <div class="accordion-header">Grand Warden Strategy <span class="icon">&#9660;</span></div>
                    <div class="accordion-content">
                        <p>The Grand Warden is crucial for protecting your main army. Use his Eternal Tome ability to make your troops invulnerable during critical moments, like passing through heavy splash damage. His Life Aura provides continuous healing.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
};
