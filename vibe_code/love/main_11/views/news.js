import { newsArticles } from '../data/news.js';

export const getNewsPageContent = async () => {
    const pathSegments = window.location.hash.split('/');
    const articleId = pathSegments[2]; // e.g., #/news/article-id

    if (articleId) {
        const article = newsArticles.find(a => a.id === articleId);
        if (article) {
            return `
                <section class="article-detail-section">
                    <a href="#/news" class="btn btn-secondary mb-2">&larr; Back to News</a>
                    <h1>${article.title}</h1>
                    <p class="text-medium">Published: ${article.date}</p>
                    <div class="article-content">
                        ${article.content}
                    </div>
                </section>
            `;
        } else {
            return `
                <section class="hero-section text-center">
                    <h2>News Article Not Found</h2>
                    <p>The article you are looking for does not exist.</p>
                    <a href="#/news" class="btn btn-primary">Back to News</a>
                </section>
            `;
        }
    } else {
        return `
            <section class="hero-section text-center">
                <h1>Clash of Clans News</h1>
                <p class="lead">Stay up-to-date with the latest updates, events, and community spotlights.</p>
            </section>

            <div class="news-grid">
                ${newsArticles.map(article => `
                    <div class="card news-card">
                        <h3>${article.title}</h3>
                        <p class="text-medium">${article.date}</p>
                        <p>${article.summary}</p>
                        <a href="#/news/${article.id}" class="btn btn-secondary">Read Article</a>
                    </div>
                `).join('')}
            </div>
        `;
    }
};
