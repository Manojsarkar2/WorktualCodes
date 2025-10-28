import { router } from './router.js';

export const renderVideoCard = (video) => {
    const card = document.createElement('div');
    card.classList.add('video-card');
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `Video: ${video.title} by ${video.channel}`);

    card.innerHTML = `
        <a href="/watch/${video.id}" class="video-link">
            <div class="thumbnail-placeholder" data-duration="${video.duration}">
                <span>Video Thumbnail</span>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p class="channel-name">${video.channel}</p>
                <p class="video-meta"><span>${video.views}</span> • <span>${video.uploadDate}</span></p>
            </div>
        </a>
    `;

    card.querySelector('.video-link').addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(`/watch/${video.id}`);
    });

    return card;
};
