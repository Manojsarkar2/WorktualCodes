import { state } from '../components/state.js';
import { renderVideoCard } from '../components/videoCard.js';

export const renderHome = () => {
    const videos = state.get('videos');
    if (!videos || videos.length === 0) {
        return `
            <div class="page-section">
                <h2>Home</h2>
                <p>No videos available yet. Please check back later.</p>
            </div>
        `;
    }

    const featuredVideos = videos.slice(0, 4);
    const recommendedVideos = videos.slice(4, 10);

    const featuredVideoCards = featuredVideos.map(video => renderVideoCard(video).outerHTML).join('');
    const recommendedVideoCards = recommendedVideos.map(video => renderVideoCard(video).outerHTML).join('');

    return `
        <div class="home-page">
            <section class="page-section">
                <h2>Featured Videos</h2>
                <div class="video-grid" role="list">
                    ${featuredVideoCards}
                </div>
            </section>

            <section class="page-section">
                <h2>Recommended for You</h2>
                <div class="video-grid" role="list">
                    ${recommendedVideoCards}
                </div>
            </section>

            <section class="page-section">
                <h2>Popular Categories</h2>
                <div class="category-list">
                    <!-- Placeholder for categories -->
                    <button>Programming</button>
                    <button>Tutorials</button>
                    <button>Gaming</button>
                    <button>Music</button>
                    <button>News</button>
                </div>
            </section>
        </div>
    `;
};
