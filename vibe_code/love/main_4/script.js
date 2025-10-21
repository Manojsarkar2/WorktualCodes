// script.js

// Data
const videos = [
    {
        id: '1',
        title: 'React Tutorial for Beginners',
        thumbnail: 'https://via.placeholder.com/300x200',
        description: 'Learn React in this comprehensive tutorial.'
    },
    {
        id: '2',
        title: 'JavaScript ES6 Features',
        thumbnail: 'https://via.placeholder.com/300x200',
        description: 'Explore the new features of JavaScript ES6.'
    },
    {
        id: '3',
        title: 'Node.js Crash Course',
        thumbnail: 'https://via.placeholder.com/300x200',
        description: 'Get started with Node.js in this crash course.'
    }
];

// Components
const Navbar = () => {
    return `
        <div id="navbar">
            <h1>YouTube</h1>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </div>
    `;
};

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

const HomePage = () => {
    const videoCards = videos.map(video => VideoCard(video)).join('');
    return `
        <div id="home">
            ${videoCards}
        </div>
    `;
};

const ContactPage = () => {
    return `
        <div id="contact">
            <h2>Contact Us</h2>
            <form id="contact-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;
};

const WatchPage = (params) => {
    const videoId = params.id;
    const video = videos.find(v => v.id === videoId);

    if (!video) {
        return `<p>Video not found.</p>`;
    }

    return `
        <div id="watch">
            <h2>${video.title}</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
            <p>${video.description}</p>
        </div>
    `;
};

// Router
const routes = {
    'home': HomePage,
    'contact': ContactPage,
    'watch': WatchPage
};

const router = () => {
    const route = window.location.hash.substring(1) || 'home';
    let params = {};

    if (route.includes('?')) {
        const [path, queryString] = route.split('?');
        params = queryString.split('&').reduce((acc, pair) => {
            const [key, value] = pair.split('=');
            acc[key] = value;
            return acc;
        }, {});

        activeRoute = path;
    } else {
        activeRoute = route;
    }

    const page = routes[activeRoute] ? routes[activeRoute](params) : '<p>404 Not Found</p>';
    document.getElementById('content').innerHTML = page;
};

// Modal
const showModal = (content) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <span class="close-button" onclick="closeModal()">×</span>
                ${content}
            </div>
        </div>
    `;
};

const closeModal = () => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
};

// Event Listeners
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    document.getElementById('navbar').innerHTML = Navbar();
    router();
});

// Form Submission (Mock)
document.addEventListener('submit', function(event) {
    if (event.target.id === 'contact-form') {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        localStorage.setItem('contactFormData', JSON.stringify({ name, email, message }));
        showModal('<p>Thank you for your submission!</p>');
    }
});