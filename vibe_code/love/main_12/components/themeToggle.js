import { state } from './state.js';

export const initThemeToggle = () => {
    const themeToggleButton = document.querySelector('.theme-toggle-btn');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            state.toggleTheme();
            // Update button icon based on new theme
            const currentTheme = state.get('theme');
            themeToggleButton.setAttribute('data-theme', currentTheme);
            themeToggleButton.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
            themeToggleButton.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`);
        });
    }
};
