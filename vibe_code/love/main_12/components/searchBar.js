import { router } from './router.js';

export const renderSearchBar = () => {
    // In a real app, this would handle actual search queries
    // For this demo, it's a placeholder.
    setTimeout(() => {
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchForm.elements['search-input'].value;
                if (query) {
                    // Simulate search results page or filter current view
                    console.log('Search query:', query);
                    // router.navigate(`/search?q=${encodeURIComponent(query)}`);
                    alert(`Searching for: "${query}" (Search functionality is for demo purposes)`);
                }
            });
        }
    }, 0);

    return `
        <form id="search-form" class="search-bar" role="search">
            <input type="text" id="search-input" name="q" placeholder="Search" aria-label="Search YouTube">
            <button type="submit" aria-label="Search">🔍</button>
        </form>
    `;
};
