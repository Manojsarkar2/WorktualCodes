export default function renderVideoPlayer(video) {
    return `
        <div class="video-player-container"></div>
        <div class="video-info">
            <h1>${video.title}</h1>
            <div class="video-actions">
                <div class="channel-info">
                    <div class="channel-avatar"></div>
                    <div class="channel-details">
                        <strong>${video.channelName}</strong>
                        <p>1.2M subscribers</p>
                    </div>
                    <button class="subscribe-btn">Subscribe</button>
                </div>
                <div class="action-buttons">
                    <button>&#128077; ${video.views.toLocaleString()}</button>
                    <button>&#128078;</button>
                    <button>Share</button>
                </div>
            </div>
            <div class="video-description">
                <strong>${video.views.toLocaleString()} views &bull; ${video.uploadDate}</strong>
                <p>${video.description}</p>
            </div>
        </div>
    `;
}