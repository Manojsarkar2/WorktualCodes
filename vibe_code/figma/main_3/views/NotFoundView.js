import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { Button } from '../components/Button.js';

export const NotFoundView = {
    render: (container) => {
        container.innerHTML = `
            ${Header()}
            <main class="container section-padding text-center" style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <h1 style="font-size: 6rem; color: var(--color-accent);">404</h1>
                <h2>Page Not Found</h2>
                <p style="margin-bottom: var(--spacing-xl);">Oops! The page you are looking for does not exist.</p>
                ${Button({ label: 'Go to Home', link: '/' })}
            </main>
            ${Footer()}
        `;
    }
};
