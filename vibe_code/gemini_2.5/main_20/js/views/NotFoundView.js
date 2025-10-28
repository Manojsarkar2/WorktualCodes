import { $ } from '../utils/dom.js';

export const NotFoundView = () => {
    const view = $.create('div', { class: 'not-found-view container' });
    view.innerHTML = `
        <h1 style="text-align: center; margin-top: 100px; color: var(--color-primary-dark);">404 - Page Not Found</h1>
        <p style="text-align: center; margin-top: 20px; color: var(--color-text-grey);">The page you are looking for does not exist.</p>
        <p style="text-align: center; margin-top: 30px;"><a href="/" data-nav-link style="color: var(--color-primary-green); text-decoration: none;">Go to Home</a></p>
    `;
    return view;
};