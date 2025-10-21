// components/videos.js
async function Videos() {
    const videosData = await fetchJsonData('data/videos.json');
    if (!videosData) {
        return '<p>Failed to load videos.</p>';
    }

    let videosHTML = '<div class="container"><h2>Videos</h2><div class="videos-list">';
    videosData.forEach(video => {
        videosHTML += `
            <div class="video-item">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <a href="${video.link}" target="_blank">Watch Video</a>
            </div>
        `;
    });
    videosHTML += '</div></div>';
    return videosHTML;
}

export default Videos;