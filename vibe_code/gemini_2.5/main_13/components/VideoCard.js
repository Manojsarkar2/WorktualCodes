export default function renderVideoCard(video) {
    return `
        <div class="video-card" data-video-id="${video.id}">
            <div class="video-thumbnail"></div>
            <div class="video-details">
                <div class="channel-avatar"></div>
                <div class="video-meta">
                    <h3>${video.title}</h3>
                    <p>${video.channelName}</p>
                    <p>${video.views.toLocaleString()} views &bull; ${video.uploadDate}</p>
                </div>
            </div>
        </div>
    `;
}