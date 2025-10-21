function renderAnimeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = parseInt(urlParams.get('id'));
    const anime = animeData.find(a => a.id === animeId);

    if (!anime) {
        return '<p>Anime not found.</p>';
    }

    return `
        <div class="anime-details">
            <h2>${anime.title}</h2>
            <p>Genre: ${anime.genre}</p>
            <p>${anime.description}</p>
            <button onclick="addToCart(${anime.id})">Add to Cart</button>
        </div>
    `;
}
