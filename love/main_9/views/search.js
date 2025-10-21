function renderSearch() {
    return `
        <div class="search">
            <h2>Search Anime</h2>
            <input type="text" id="searchInput" placeholder="Enter anime title">
            <button onclick="performSearch()">Search</button>
            <div id="searchResults"></div>
        </div>
    `;
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const results = animeData.filter(anime => anime.title.toLowerCase().includes(searchTerm));
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        searchResultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    const resultsList = document.createElement('ul');
    results.forEach(anime => {
        const listItem = document.createElement('li');
        listItem.textContent = anime.title;
        resultsList.appendChild(listItem);
    });

    searchResultsDiv.appendChild(resultsList);
}
