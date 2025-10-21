// components/video_card.js

const VideoCard = (video) => {
    return `
        <div class="video-card">
            <img src="${video.thumbnail}" alt="${video.title}">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <a href="#watch?id=${video.id}">Watch Now</a>
        </div>
    `;
};

export default VideoCard;