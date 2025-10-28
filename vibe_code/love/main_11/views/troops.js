import { troops } from '../data/troops.js';

export const getTroopsPageContent = async () => {
    return `
        <section class="hero-section text-center">
            <h1>Clash of Clans Troops</h1>
            <p class="lead">Assemble your army from a diverse roster of warriors, each with unique strengths.</p>
        </section>

        <div class="search-filter-container">
            <input type="text" id="troop-search" placeholder="Search troops..." aria-label="Search troops">
            <select id="troop-type-filter" aria-label="Filter by troop type">
                <option value="all">All Types</option>
                <option value="Ground">Ground</option>
                <option value="Air">Air</option>
            </select>
            <select id="troop-target-filter" aria-label="Filter by troop target">
                <option value="all">All Targets</option>
                <option value="Any">Any</option>
                <option value="Defenses">Defenses</option>
                <option value="Resources">Resources</option>
            </select>
        </div>

        <div class="tabs-container" id="troop-tabs">
            <div class="tab-buttons">
                <button class="tab-button active" data-tab="elixir-troops">Elixir Troops</button>
                <button class="tab-button" data-tab="dark-elixir-troops">Dark Elixir Troops</button>
                <button class="tab-button" data-tab="super-troops">Super Troops</button>
            </div>
            <div class="tab-content" id="elixir-troops">
                <div class="troop-grid">
                    ${troops.filter(t => t.trainingCost.includes('Elixir')).map(troop => `
                        <div class="card troop-card">
                            <h3>${troop.name}</h3>
                            <p><strong>Type:</strong> ${troop.type}</p>
                            <p><strong>Target:</strong> ${troop.target}</p>
                            <p><strong>Housing Space:</strong> ${troop.housingSpace}</p>
                            <p><strong>Training Cost:</strong> ${troop.trainingCost}</p>
                            <p>${troop.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="tab-content" id="dark-elixir-troops" style="display:none;">
                <div class="troop-grid">
                    <div class="card troop-card">
                        <h3>Hog Rider</h3>
                        <p><strong>Type:</strong> Ground</p>
                        <p><strong>Target:</strong> Defenses</p>
                        <p><strong>Housing Space:</strong> 5</p>
                        <p><strong>Training Cost:</strong> 70 Dark Elixir</p>
                        <p>Riding a hog, this troop jumps over walls to target defenses directly. Fast and powerful.</p>
                    </div>
                    <div class="card troop-card">
                        <h3>Golem</h3>
                        <p><strong>Type:</strong> Ground</p>
                        <p><strong>Target:</strong> Defenses</p>
                        <p><strong>Housing Space:</strong> 30</p>
                        <p><strong>Training Cost:</strong> 450 Dark Elixir</p>
                        <p>A massive tank that splits into smaller Golemites upon destruction. Soaks up huge amounts of damage.</p>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="super-troops" style="display:none;">
                <div class="troop-grid">
                    <div class="card troop-card">
                        <h3>Super Barbarian</h3>
                        <p><strong>Type:</strong> Ground</p>
                        <p><strong>Target:</strong> Any</p>
                        <p><strong>Housing Space:</strong> 5</p>
                        <p><strong>Training Cost:</strong> 25,000 Dark Elixir</p>
                        <p>A bigger, stronger Barbarian with a temporary rage ability upon deployment.</p>
                    </div>
                    <div class="card troop-card">
                        <h3>Super Archer</h3>
                        <p><strong>Type:</strong> Ground & Air</p>
                        <p><strong>Target:</strong> Any</p>
                        <p><strong>Housing Space:</strong> 12</p>
                        <p><strong>Training Cost:</strong> 25,000 Dark Elixir</p>
                        <p>Fires powerful, piercing arrows that can hit multiple targets in a line.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};
