import { renderHome } from './views/home.js';
import { renderVideoPage } from './views/video.js';
import { renderSearchResults } from './views/search.js';

const appRoot = document.getElementById('app-root');

// Simple client-side router
const routes = {
    '/': renderHome,
    '/video': renderVideoPage,
    '/search': renderSearchResults,
    // Add other routes for explore, subscriptions etc. that can just show a placeholder
    '/explore': () => `<h2>Explore Page</h2>`,
    '/subscriptions': () => `<h2>Subscriptions Page</h2>`,
    '/history': () => `<h2>History Page</h2>`,
    '/watch-later': () => `<h2>Watch Later Page</h2>`,
    '/liked': () => `<h2>Liked Videos Page</h2>`,
};

const router = async () => {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);

    // Find the matching route
    const render = routes[path] || (() => `<h2>404 - Page Not Found</h2>`);

    // Render the view
    appRoot.innerHTML = await render(urlParams);

    // After rendering, attach event listeners for the new content
    bindEventListeners(path, urlParams);
    updateActiveNavLink();
};

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

// Handle browser back/forward
window.addEventListener('popstate', router);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    // Intercept clicks on data-link elements
    document.body.addEventListener('click', e => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.href);
        }
    });

    // Handle search form submission
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', e => {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        if (query) {
            navigateTo(`/search?q=${encodeURIComponent(query)}`);
        }
    });

    // Sidebar toggle
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    router();
});

function updateActiveNavLink() {
    const links = document.querySelectorAll('.sidebar__link');
    links.forEach(link => {
        if (link.pathname === window.location.pathname) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Function to bind event listeners specific to a view
function bindEventListeners(path, params) {
    if (path === '/video') {
        bindVideoPageListeners(params.get('id'));
    }
}

function bindVideoPageListeners(videoId) {
    // Mock subscribe button functionality
    const subscribeBtn = document.getElementById('subscribe-btn');
    subscribeBtn.addEventListener('click', () => {
        subscribeBtn.classList.toggle('subscribed');
        if (subscribeBtn.classList.contains('subscribed')) {
            subscribeBtn.textContent = 'Subscribed';
        } else {
            subscribeBtn.textContent = 'Subscribe';
        }
    });

    // Mock comment form functionality
    const commentInput = document.querySelector('.comment-input');
    const commentFormActions = document.querySelector('.comment-form-actions');
    const submitCommentBtn = document.getElementById('submit-comment');

    commentInput.addEventListener('focus', () => {
        commentFormActions.classList.add('active');
    });

    commentInput.addEventListener('input', () => {
        submitCommentBtn.disabled = commentInput.value.trim() === '';
    });

    document.getElementById('comment-form-main').addEventListener('submit', e => {
        e.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentList = document.querySelector('.comment-list');
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `
                <img src="https://i.pravatar.cc/40?u=newuser" alt="User Avatar">
                <div class="comment-body">
                    <p><strong>You</strong> <span>just now</span></p>
                    <p>${commentText}</p>
                </div>
            `;
            commentList.prepend(newComment);
            commentInput.value = '';
            submitCommentBtn.disabled = true;
        }
    });
}
