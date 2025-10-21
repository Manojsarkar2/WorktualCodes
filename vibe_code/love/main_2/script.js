const routes = {
    '/': 'views/home.html',
    '/contact': 'views/contact.html',
    '/watch': 'views/watch.html'
};

const videosData = [
    {
        id: '1',
        title: 'React Tutorial for Beginners',
        channel: 'Programming with Mosh',
        videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0'
    },
    {
        id: '2',
        title: 'Vue.js Crash Course',
        channel: 'Traversy Media',
        videoUrl: 'https://www.youtube.com/embed/4deVCNj5c60'
    },
    {
        id: '3',
        title: 'Angular Full Course',
        channel: 'Academind',
        videoUrl: 'https://www.youtube.com/embed/k5E2AVpwsko'
    }
];

function loadRoute(route) {
    fetch(route)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            if (route === 'views/home.html') {
                renderVideos();
            }
            if (route === 'views/watch.html') {
                const videoId = localStorage.getItem('videoId');
                renderWatch(videoId);
            }
        })
        .catch(error => console.error('Error loading route:', error));
}

function navigate(route) {
    window.history.pushState({}, route, route);
    loadRoute(routes[route]);
}

function renderVideos() {
    const homeElement = document.getElementById('content');
    homeElement.innerHTML = '<div id="home"></div>';
    const homeDiv = document.getElementById('home');
    videosData.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
            <img src="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg" alt="${video.title}">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-channel">${video.channel}</p>
                <button onclick='watchVideo("${video.id}")'>Watch Now</button>
            </div>
        `;
        homeDiv.appendChild(videoCard);
    });
}

function renderWatch(videoId) {
    const watchElement = document.getElementById('content');
    const video = videosData.find(v => v.id === videoId);
    if (video) {
        watchElement.innerHTML = `
            <div id="watch">
                <h2>${video.title}</h2>
                <iframe width="80%" height="500" src="${video.videoUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
    } else {
        watchElement.innerHTML = '<p>Video not found</p>';
    }
}

function watchVideo(videoId) {
    localStorage.setItem('videoId', videoId);
    navigate('/watch');
}

window.onpopstate = () => {
    const route = window.location.pathname;
    loadRoute(routes[route] || routes['/']);
};

document.addEventListener('DOMContentLoaded', () => {
    // Load Navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('#navbar ul');

            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Add navigation event listeners after navbar is loaded
            document.querySelectorAll('#navbar a').forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const route = link.getAttribute('href');
                    navigate(route);
                    navMenu.classList.remove('active'); // Close menu on navigation
                });
            });
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Initial route load
    const initialRoute = window.location.pathname;
    loadRoute(routes[initialRoute] || routes['/']);
});