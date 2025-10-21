const routes = {
    '#home': 'views/home.html',
    '#trending': 'views/trending.html',
    '#subscriptions': 'views/subscriptions.html',
    '#library': 'views/library.html',
    '#history': 'views/history.html',
    '#watch': 'views/watch.html'
};

async function loadContent(route) {
    const contentDiv = document.getElementById('content');
    let url = routes[route] || 'views/home.html';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        contentDiv.innerHTML = text;

        if (route === '#home') {
            loadVideos();
        }
    } catch (error) {
        contentDiv.innerHTML = '<p>Failed to load content.</p>';
        console.error('Error loading content:', error);
    }
}

async function loadVideos() {
    try {
        const response = await fetch('data/videos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const videos = await response.json();
        const videoGrid = document.createElement('div');
        videoGrid.className = 'video-grid';

        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';

            videoCard.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-channel">${video.channel}</p>
                    <p class="video-views">${video.views} views</p>
                </div>
            `;

            videoGrid.appendChild(videoCard);
        });

        document.getElementById('content').appendChild(videoGrid);
    } catch (error) {
        console.error('Error loading videos:', error);
        document.getElementById('content').innerHTML = '<p>Failed to load videos.</p>';
    }
}

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

window.addEventListener('hashchange', () => {
    loadContent(window.location.hash);
});

window.addEventListener('load', () => {
    loadContent(window.location.hash);
});