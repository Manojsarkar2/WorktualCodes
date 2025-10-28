import { videos } from '../data/videos.js';
import { createVideoCard } from '../components/videoCard.js';

export function renderVideoPage(urlParams) {
    const videoId = urlParams.get('id');
    const video = videos.find(v => v.id === videoId);

    if (!video) {
        return `<h2>Video not found!</h2>`;
    }

    const relatedVideos = videos.filter(v => v.id !== videoId).slice(0, 10);
    const relatedVideosHTML = relatedVideos.map(v => createVideoCard(v, 'sidebar')).join('');

    const commentsHTML = video.comments.map(comment => `
        <div class="comment">
            <img src="${comment.avatar}" alt="User Avatar">
            <div class="comment-body">
                <p><strong>${comment.user}</strong> <span>2 weeks ago</span></p>
                <p>${comment.text}</p>
            </div>
        </div>
    `).join('');

    return `
        <div class="video-watch-layout">
            <div class="video-main-content">
                <div class="video-player-container">
                    <p>Mock Video Player for "${video.title}"</p>
                </div>
                <div class="video-info">
                    <h1>${video.title}</h1>
                    <div class="video-actions">
                        <div class="channel-info">
                            <img src="${video.channelAvatar}" alt="${video.channelName}">
                            <div>
                                <p>${video.channelName}</p>
                                <p>1.2M subscribers</p>
                            </div>
                            <button class="subscribe-btn" id="subscribe-btn">Subscribe</button>
                        </div>
                        <div class="action-buttons">
                            <button>👍 123K</button>
                            <button>👎</button>
                            <button>🔗 Share</button>
                        </div>
                    </div>
                </div>
                <div class="video-description">
                    <strong>${video.views} views &bull; ${video.timestamp}</strong>
                    <p>${video.description}</p>
                </div>
                <div class="comments-section">
                    <h2>${video.comments.length} Comments</h2>
                    <form class="comment-form" id="comment-form-main">
                        <img src="https://i.pravatar.cc/40?u=currentuser" alt="User Avatar">
                        <div class="comment-input-container">
                            <input type="text" class="comment-input" placeholder="Add a comment...">
                            <div class="comment-form-actions">
                                <button type="button" class="cancel">Cancel</button>
                                <button type="submit" class="submit" id="submit-comment" disabled>Comment</button>
                            </div>
                        </div>
                    </form>
                    <div class="comment-list">
                        ${commentsHTML}
                    </div>
                </div>
            </div>
            <aside class="video-sidebar">
                <h3>Up next</h3>
                ${relatedVideosHTML}
            </aside>
        </div>
    `;
}
