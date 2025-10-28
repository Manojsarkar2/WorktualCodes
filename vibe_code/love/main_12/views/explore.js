import { state } from '../components/state.js';
import { renderVideoCard } from '../components/videoCard.js';

export const renderExplore = () => {
    const videos = state.get('videos');
    if (!videos || videos.length === 0) {
        return `
            <div class="page-section">
                <h2>Explore</h2>
                <p>No videos available for exploration.</p>
            </div>
        `;
    }

    const trendingVideos = videos.slice(0, 6);
    const newUploads = videos.slice(6, 10);

    const trendingVideoCards = trendingVideos.map(video => renderVideoCard(video).outerHTML).join('');
    const newUploadsVideoCards = newUploads.map(video => renderVideoCard(video).outerHTML).join('');

    return `
        <div class="explore-page">
            <section class="page-section">
                <h2>Trending</h2>
                <div class="video-grid" role="list">
                    ${trendingVideoCards}
                </div>
            </section>

            <section class="page-section">
                <h2>New Uploads</h2>
                <div class="video-grid" role="list">
                    ${newUploadsVideoCards}
                </div>
            </section>

            <section class="page-section">
                <h2>Browse Channels</h2>
                <div class="channel-categories">
                    <!-- Placeholder for channel categories -->
                    <button>Tech</button>
                    <button>Science</button>
                    <button>Education</button>
                    <button>Entertainment</button>
                </div>
            </section>
        </div>
    `;
};
