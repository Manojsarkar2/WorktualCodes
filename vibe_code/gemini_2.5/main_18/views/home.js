import { createCarousel } from '../components/carousel.js';

export const renderHome = (element) => {
    element.innerHTML = `
        <section class="hero-section">
            <div class="container">
                <h1>Welcome to Clash of Clans</h1>
                <p>Build your village, raise your army, and crush your opponents! Join millions of players worldwide.</p>
                <button class="btn-primary" onclick="Router.navigate('/heroes')">Explore Heroes</button>
            </div>
        </section>

        <section class="page-section container">
            <h2>Latest Updates & Featured Content</h2>
            <div id="home-carousel-container"></div>
        </section>

        <section class="page-section container">
            <h2>About Clash of Clans</h2>
            <div class="grid-container">
                <div class="card">
                    <div class="card-image">Village Building</div>
                    <div class="card-content">
                        <h3>Build Your Ultimate Village</h3>
                        <p>Design and customize your village with powerful defenses, resource collectors, and unique buildings. Protect your loot from enemy raids!</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-image">Epic Battles</div>
                    <div class="card-content">
                        <h3>Lead Your Army to Victory</h3>
                        <p>Train a diverse army of Barbarians, Wizards, Dragons, and more. Strategize your attacks and conquer enemy villages in epic battles.</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-image">Clan Wars</div>
                    <div class="card-content">
                        <h3>Join a Clan, Dominate Wars</h3>
                        <p>Team up with friends and players globally. Participate in thrilling Clan Wars, share troops, and climb the global leaderboards together.</p>
                    </div>
                </div>
            </div>
        </section>
    `;

    const carouselData = [
        { title: 'New Hero: The Royal Champion!', description: 'Unleash the power of the Royal Champion with her Seeking Shield ability.', imageText: 'Royal Champion' },
        { title: 'Spring Update 2023', description: 'Introducing new levels for defenses and troops, plus quality of life improvements.', imageText: 'Spring Update' },
        { title: 'Clan Games Rewards', description: 'Complete challenges with your clanmates to earn amazing rewards and magic items.', imageText: 'Clan Games' }
    ];

    createCarousel(document.getElementById('home-carousel-container'), carouselData);
};
