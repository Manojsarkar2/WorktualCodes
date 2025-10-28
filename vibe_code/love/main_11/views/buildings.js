import { buildings } from '../data/buildings.js';

export const getBuildingsPageContent = async () => {
    return `
        <section class="hero-section text-center">
            <h1>Clash of Clans Buildings</h1>
            <p class="lead">From resource generators to formidable defenses, build your ultimate village.</p>
        </section>

        <div class="search-filter-container">
            <input type="text" id="building-search" placeholder="Search buildings..." aria-label="Search buildings">
            <select id="building-type-filter" aria-label="Filter by building type">
                <option value="all">All Types</option>
                <option value="Resource">Resource</option>
                <option value="Defense">Defense</option>
                <option value="Army">Army</option>
                <option value="Core">Core</option>
            </select>
        </div>

        <div class="building-grid" id="buildings-list">
            ${buildings.map(building => `
                <div class="card building-card">
                    <h3>${building.name}</h3>
                    <p><strong>Type:</strong> ${building.type}</p>
                    <p><strong>Max Level:</strong> ${building.maxLevel}</p>
                    <p>${building.description}</p>
                </div>
            `).join('')}
        </div>
    `;
};
