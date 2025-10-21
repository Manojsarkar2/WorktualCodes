function renderHome() {
    return `
        <div class="home">
            <h2>Welcome to Anime Stream</h2>
            <p>Discover and watch your favorite anime.</p>
            ${renderAnimeList()}
        </div>
    `;
}
