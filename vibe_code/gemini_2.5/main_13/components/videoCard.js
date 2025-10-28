export function createVideoCard(video, type = 'grid') {
    // Different layouts can be handled here if needed, e.g., 'grid', 'list', 'sidebar'
    return `
        <article class="video-card" data-video-id="${video.id}">
            <a href="/video?id=${video.id}" data-link>
                <div class="video-card__thumbnail-container">
                    <img src="${video.thumbnailUrl}" alt="${video.title}" class="video-card__thumbnail" loading="lazy">
                    <span class="video-card__duration">${video.duration}</span>
                </div>
                <div class="video-card__details">
                    <img src="${video.channelAvatar}" alt="${video.channelName}" class="video-card__channel-avatar">
                    <div class="video-card__meta">
                        <h3 class="video-card__title">${video.title}</h3>
                        <p class="video-card__channel-name">${video.channelName}</p>
                        <p class="video-card__stats">${video.views} views &bull; ${video.timestamp}</p>
                    </div>
                </div>
            </a>
        </article>
    `;
}
