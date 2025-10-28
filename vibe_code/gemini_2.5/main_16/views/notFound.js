export const renderNotFoundPage = (container) => {
    container.innerHTML = `
        <div class="text-center" style="padding: 80px 20px;">
            <h1 style="font-size: 4rem; color: var(--primary-color);">404</h1>
            <p style="font-size: 1.5rem; margin-bottom: 1.5rem;">Page Not Found</p>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <a href="/" data-link class="btn btn-primary mt-4">Go to Home Page</a>
        </div>
    `;
};
