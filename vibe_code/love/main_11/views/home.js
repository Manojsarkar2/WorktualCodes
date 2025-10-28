import { newsArticles } from '../data/news.js';

export const getHomePageContent = async () => {
    const latestNews = newsArticles.slice(0, 3); // Get top 3 news articles

    return `
        <section class="hero-section text-center">
            <h1>Welcome to the World of Clash of Clans!</h1>
            <p class="lead">Build your village, raise an army, and clash with millions of players worldwide!</p>
            <a href="#" class="btn btn-primary btn-large">Play Now!</a>
        </section>

        <section class="carousel-section">
            <h2>Latest Updates & Events</h2>
            <div class="carousel-container" id="home-carousel">
                <div class="carousel-slides">
                    <div class="carousel-slide">
                        <h3>Winter Update 2023</h3>
                        <p>New Hero Equipment, balance changes, and more! Dive into the latest content.</p>
                        <a href="#/news" class="btn btn-secondary">Read More</a>
                    </div>
                    <div class="carousel-slide">
                        <h3>Clash World Championship</h3>
                        <p>Relive the epic finals and see who became the 2023 champions!</p>
                        <a href="#/news" class="btn btn-secondary">Watch Replays</a>
                    </div>
                    <div class="carousel-slide">
                        <h3>Clan Games are Live!</h3>
                        <p>Team up with your clanmates to earn amazing rewards. Don't miss out!</p>
                        <a href="#" class="btn btn-secondary">Join Clan Games</a>
                    </div>
                </div>
                <div class="carousel-nav">
                    <button class="prev" aria-label="Previous slide">&#10094;</button>
                    <button class="next" aria-label="Next slide">&#10095;</button>
                </div>
                <div class="carousel-dots"></div>
            </div>
        </section>

        <section class="news-preview-section">
            <h2>Recent News</h2>
            <div class="news-grid">
                ${latestNews.map(article => `
                    <div class="card news-card">
                        <h3>${article.title}</h3>
                        <p class="text-medium">${article.date}</p>
                        <p>${article.summary}</p>
                        <a href="#/news/${article.id}" class="btn btn-secondary">Read Article</a>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="cta-section text-center">
            <h2>Join the Clash!</h2>
            <p>Download Clash of Clans today and start your epic journey!</p>
            <div class="cta-buttons">
                <a href="#" class="btn btn-primary btn-large">Download on App Store</a>
                <a href="#" class="btn btn-secondary btn-large">Get on Google Play</a>
            </div>
        </section>
    `;
};
