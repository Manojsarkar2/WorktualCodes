import { state } from '../components/state.js';
import { renderVideoCard } from '../components/videoCard.js';

export const renderLibrary = () => {
    const currentUser = state.get('currentUser');
    const videos = state.get('videos');

    if (!currentUser) {
        return `
            <div class="page-section">
                <h2>Library</h2>
                <p>Please <a href="#" class="login-btn">log in</a> to view your library.</p>
            </div>
        `;
    }

    // For a real app, these would be user-specific data
    const watchHistory = videos.slice(0, 5); // Mock history
    const watchLater = videos.slice(5, 8); // Mock watch later
    const playlists = [
        { id: 'p1', name: 'My Favorites', videos: videos.slice(0, 3) },
        { id: 'p2', name: 'Learn JS', videos: videos.slice(3, 6) }
    ];

    const historyCards = watchHistory.map(video => renderVideoCard(video).outerHTML).join('');
    const watchLaterCards = watchLater.map(video => renderVideoCard(video).outerHTML).join('');

    const playlistSections = playlists.map(playlist => `
        <div class="playlist-item">
            <h3>${playlist.name} (${playlist.videos.length} videos)</h3>
            <div class="video-grid" role="list">
                ${playlist.videos.map(video => renderVideoCard(video).outerHTML).join('')}
            </div>
        </div>
    `).join('');

    return `
        <div class="library-page">
            <section class="page-section">
                <h2>History</h2>
                ${watchHistory.length > 0 ? `
                    <div class="video-grid" role="list">
                        ${historyCards}
                    </div>
                ` : `<p>Your watch history is empty.</p>`}
            </section>

            <section class="page-section">
                <h2>Watch Later</h2>
                ${watchLater.length > 0 ? `
                    <div class="video-grid" role="list">
                        ${watchLaterCards}
                    </div>
                ` : `<p>Your Watch Later list is empty.</p>`}
            </section>

            <section class="page-section">
                <h2>Playlists</h2>
                ${playlists.length > 0 ? `
                    <div class="playlists-container">
                        ${playlistSections}
                    </div>
                ` : `<p>You haven't created any playlists yet.</p>`}
            </section>
        </div>
    `;
};
