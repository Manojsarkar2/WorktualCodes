// components/search.js

// Example usage:
// <div id="search-container"></div>
// Search(['apple', 'banana', 'cherry'], (results) => console.log(results), 'search-container');

const Search = (data, onResults, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found.`);
        return;
    }

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.className = 'search-input';

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const results = data.filter(item => item.toLowerCase().includes(searchTerm));
        onResults(results);
        renderResults(results);
    });

    const renderResults = (results) => {
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.textContent = result;
            resultsContainer.appendChild(resultItem);
        });
    };

    container.appendChild(searchInput);
    container.appendChild(resultsContainer);
};

export default Search;