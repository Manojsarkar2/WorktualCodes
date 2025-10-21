// Utility Functions
function loadView(view) {
    fetch(`views/${view}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            // Initialize any view-specific scripts here
            if (view === 'home') {
                loadVideos();
            } else if (view === 'contact') {
                initializeContactForm();
            } else if (view === 'login' || view === 'signup') {
                initializeAuthForm(view);
            }
        })
        .catch(error => console.error('Error loading view:', error));
}

function showModal(content) {
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

// Navigation
function navigate(event) {
    event.preventDefault();
    const hash = event.target.getAttribute('href').substring(1);
    loadView(hash);
}

// Home View Functions
function loadVideos() {
    fetch('data/videos.json')
        .then(response => response.json())
        .then(videos => {
            const videoGrid = document.querySelector('.video-grid');
            videoGrid.innerHTML = videos.map(video => `
                <div class="video-card">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div class="video-info">
                        <h3 class="video-title">${video.title}</h3>
                        <p class="video-channel">${video.channel}</p>
                        <a href="#watch?v=${video.id}" onclick="watchVideo('${video.id}');">Watch Now</a>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error loading videos:', error));
}

function watchVideo(videoId) {
    // Placeholder for video watching functionality
    showModal(`<p>Watching video with ID: ${videoId}</p>`);
}

// Contact View Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        // Basic validation
        if (!name || !email || !message) {
            showModal('<p>Please fill in all fields.</p>');
            return;
        }

        // Store in localStorage (mock submission)
        const submission = {
            name: name,
            email: email,
            message: message
        };
        localStorage.setItem('contactSubmission', JSON.stringify(submission));

        showModal('<p>Thank you for your message!</p>');
        contactForm.reset();
    });
}

// Auth View Functions
function initializeAuthForm(view) {
    const authForm = document.getElementById(view + '-form');
    authForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById(view + '-email').value;
        const password = document.getElementById(view + '-password').value;

        // Basic validation
        if (!email || !password) {
            showModal('<p>Please enter both email and password.</p>');
            return;
        }

        // Mock authentication
        if (view === 'login') {
            // Check against stored user (mock)
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.email === email && user.password === password) {
                    localStorage.setItem('session', JSON.stringify({ email: email }));
                    showModal('<p>Login successful!</p>');
                    loadView('home'); // Redirect to home
                    return;
                }
            }
            showModal('<p>Invalid credentials.</p>');
        } else if (view === 'signup') {
            // Store new user (mock)
            const newUser = {
                email: email,
                password: password
            };
            localStorage.setItem('user', JSON.stringify(newUser));
            showModal('<p>Signup successful! Please login.</p>');
            loadView('login'); // Redirect to login
        }
    });
}

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Initial view load
    if (window.location.hash) {
        loadView(window.location.hash.substring(1));
    } else {
        loadView('home');
    }

    // Attach navigation event listeners
    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        link.addEventListener('click', navigate);
    });
});