// script.js

const routes = {
    'home': 'home.html',
    'about': 'about.html',
    'profile': 'profile.html',
    'settings': 'settings.html',
    'contact': 'contact.html',
    'anime_list': 'anime_list.html',
    'login': 'login.html',
    'signup': 'signup.html'
};

let user = JSON.parse(localStorage.getItem('user')) || null;
let theme = localStorage.getItem('theme') || 'dark';

function loadContent(route) {
    fetch(routes[route])
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
            // Re-attach event listeners or re-initialize components if needed
            if (route === 'anime_list') {
                initializeAnimeList();
            } else if (route === 'login') {
                initializeLoginForm();
            } else if (route === 'signup') {
                initializeSignupForm();
            }
            // Example: Initialize forms or other dynamic content
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('content').innerHTML = '<p>Failed to load content.</p>';
        });
}

function navigate(route) {
    if (routes[route]) {
        history.pushState({ route: route }, '', '#' + route);
        loadContent(route);
    }
}

window.addEventListener('popstate', (event) => {
    const route = event.state ? event.state.route : 'home';
    loadContent(route);
});


// Theme Toggle
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('light-mode');
    } else {
        setTheme('dark');
    }
}

// Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Theme Toggle
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light-mode');
    }

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
    });

    // Initial content load
    const initialRoute = window.location.hash ? window.location.hash.substring(1) : 'home';
    navigate(initialRoute);

    // Navigation event listeners
    document.querySelectorAll('a[data-route]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const route = link.getAttribute('data-route');
            navigate(route);
            navLinks.classList.remove('active'); // Close menu on navigation
        });
    });
});

// Modal Functionality
function openModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.style.display = 'block';

    const closeButton = document.querySelector('.close-button');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Example Usage (You can call this from your loaded content)
function showAnimeDetails(animeName) {
    const details = `<p>Details for ${animeName}...</p>`;
    openModal(details);
}

// Anime List Functionality
function initializeAnimeList() {
    const searchInput = document.getElementById('anime-search');
    const animeListContainer = document.getElementById('anime-list-container');
    const animeData = [
        { name: 'Attack on Titan', genre: 'Action', rating: 4.8 },
        { name: 'Naruto Shippuden', genre: 'Adventure', rating: 4.7 },
        { name: 'One Piece', genre: 'Adventure', rating: 4.6 },
        { name: 'Death Note', genre: 'Mystery', rating: 4.9 },
        { name: 'Fullmetal Alchemist: Brotherhood', genre: 'Action', rating: 4.9 }
    ];

    function renderAnimeList(anime) {
        animeListContainer.innerHTML = '';
        anime.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('anime-card');
            card.innerHTML = `<h3>${item.name}</h3><p>Genre: ${item.genre}</p><p>Rating: ${item.rating}</p>`;
            animeListContainer.appendChild(card);
        });
    }

    function filterAnime(searchTerm) {
        const filteredAnime = animeData.filter(anime =>
            anime.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderAnimeList(filteredAnime);
    }

    searchInput.addEventListener('input', (e) => {
        filterAnime(e.target.value);
    });

    renderAnimeList(animeData);
}

// Login Form Functionality
function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Mock authentication
        if (email === 'test@example.com' && password === 'password') {
            user = { email: email, username: 'TestUser' };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Login successful!');
            navigate('profile'); // Redirect to profile
        } else {
            alert('Invalid credentials.');
        }
    });
}

// Signup Form Functionality
function initializeSignupForm() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Store user data (in localStorage for this example)
        const newUser = { email: email, password: password };
        localStorage.setItem('newUser', JSON.stringify(newUser));

        alert('Signup successful! You can now login.');
        navigate('login'); // Redirect to login
    });
}
