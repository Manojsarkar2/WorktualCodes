import { state } from '../components/state.js';
import { renderVideoCard } from '../components/videoCard.js';

export const renderVideoDetail = (videoId) => {
    const videos = state.get('videos');
    const video = videos.find(v => v.id === videoId);

    if (!video) {
        return `
            <div class="page-section">
                <h1>Video Not Found</h1>
                <p>The video you are looking for does not exist.</p>
            </div>
        `;
    }

    // Filter out the current video from related videos
    const relatedVideos = videos.filter(v => v.id !== videoId).slice(0, 5);
    const relatedVideoCards = relatedVideos.map(v => renderVideoCard(v).outerHTML).join('');

    return `
        <div class="video-detail-page">
            <div class="video-player-container">
                <div class="video-placeholder" aria-label="Video player for ${video.title}">
                    ▶️ Video Player Placeholder
                </div>
            </div>

            <div class="video-detail-info">
                <h1>${video.title}</h1>
                <div class="video-detail-meta">
                    <div class="views-date">
                        <span>${video.views}</span> • <span>${video.uploadDate}</span>
                    </div>
                    <div class="actions">
                        <button aria-label="Like video">👍 Like</button>
                        <button aria-label="Dislike video">👎 Dislike</button>
                        <button aria-label="Share video">🔗 Share</button>
                        <button aria-label="Add to watch later">➕ Watch Later</button>
                    </div>
                </div>

                <div class="video-description">
                    <div class="channel-info">
                        <div class="channel-avatar">${video.channelAvatar}</div>
                        <div>
                            <p class="channel-name">${video.channel}</p>
                            <button class="subscribe-btn" aria-label="Subscribe to ${video.channel}">Subscribe</button>
                        </div>
                    </div>
                    <p>${video.description}</p>
                </div>
            </div>

            <div class="related-videos">
                <h2>Up Next</h2>
                <div class="video-list" role="list">
                    ${relatedVideoCards}
                </div>
            </div>

            <div class="comments-section">
                <h2>Comments (0)</h2>
                <p>No comments yet. Be the first to comment!</p>
                <!-- A real app would have a comment form and list here -->
            </div>
        </div>
    `;
};
