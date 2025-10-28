import { videos } from '../data/videos.js';
import { createVideoCard } from '../components/videoCard.js';

export function renderSearchResults(urlParams) {
    const query = urlParams.get('q').toLowerCase();
    const searchResults = videos.filter(video => 
        video.title.toLowerCase().includes(query) || 
        video.channelName.toLowerCase().includes(query)
    );

    if (searchResults.length === 0) {
        return `<h2>No results found for "${query}"</h2>`;
    }

    const resultsHTML = searchResults.map(video => createVideoCard(video, 'search')).join('');

    return `
        <h2>Search Results for "${query}"</h2>
        <section class="search-results-list">
            ${resultsHTML}
        </section>
    `;
}
