import { state } from './state.js';
import { router } from './router.js';
import { renderSearchBar } from './searchBar.js';

export const renderHeader = () => {
    const currentUser = state.get('currentUser');
    const currentTheme = state.get('theme');

    const userControls = currentUser ? `
        <div class="dropdown">
            <button class="user-menu-btn" aria-label="User menu" aria-haspopup="true" aria-expanded="false">
                ${currentUser.username.charAt(0).toUpperCase()}
            </button>
            <div class="dropdown-content">
                <a href="/library">My Library</a>
                <button class="logout-btn">Logout</button>
            </div>
        </div>
    ` : `
        <button class="login-btn">Login</button>
        <button class="signup-btn">Sign Up</button>
    `;

    return `
        <div class="header">
            <div class="logo">
                <a href="/" aria-label="YouTube Home">
                    ▶️<span>YouTube</span>
                </a>
            </div>
            ${renderSearchBar()}
            <div class="nav-right">
                <button class="theme-toggle-btn" aria-label="Toggle theme" data-theme="${currentTheme}">
                    ${currentTheme === 'dark' ? '☀️' : '🌙'}
                </button>
                ${userControls}
                <button class="hamburger-menu" aria-label="Open navigation menu">
                    ☰
                </button>
            </div>
        </div>
    `;
};
