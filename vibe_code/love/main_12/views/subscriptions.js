import { state } from '../components/state.js';
import { renderVideoCard } from '../components/videoCard.js';

export const renderSubscriptions = () => {
    const currentUser = state.get('currentUser');
    const videos = state.get('videos');

    if (!currentUser) {
        return `
            <div class="page-section">
                <h2>Subscriptions</h2>
                <p>Please <a href="#" class="login-btn">log in</a> to view your subscriptions.</p>
            </div>
        `;
    }

    // For a real app, this would fetch videos from subscribed channels
    // For this demo, we'll just show a subset of all videos as 'subscribed content'
    const subscribedContent = videos.slice(0, 8);
    const subscribedVideoCards = subscribedContent.map(video => renderVideoCard(video).outerHTML).join('');

    return `
        <div class="subscriptions-page">
            <section class="page-section">
                <h2>Latest from your Subscriptions</h2>
                ${subscribedContent.length > 0 ? `
                    <div class="video-grid" role="list">
                        ${subscribedVideoCards}
                    </div>
                ` : `
                    <p>You haven't subscribed to any channels yet, or there are no new videos.</p>
                    <p>Explore some <a href="/explore">trending videos</a> to get started!</p>
                `}
            </section>

            <section class="page-section">
                <h2>Your Channels</h2>
                <div class="channel-list">
                    <!-- Placeholder for subscribed channels -->
                    <div class="channel-item">
                        <div class="channel-avatar">WS</div>
                        <span>WebDev Simplified</span>
                    </div>
                    <div class="channel-item">
                        <div class="channel-avatar">FS</div>
                        <span>Fireship</span>
                    </div>
                    <div class="channel-item">
                        <div class="channel-avatar">TM</div>
                        <span>Traversy Media</span>
                    </div>
                </div>
            </section>
        </div>
    `;
};
