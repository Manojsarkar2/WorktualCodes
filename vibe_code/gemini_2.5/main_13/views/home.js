import { videos } from '../data/videos.js';
import { createVideoCard } from '../components/videoCard.js';

export function renderHome() {
    const videoCardsHTML = videos.map(video => createVideoCard(video)).join('');
    return `
        <section class="video-grid">
            ${videoCardsHTML}
        </section>
    `;
}
