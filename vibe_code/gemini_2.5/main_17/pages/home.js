import * as Router from '../utils/router.js';

/**
 * Renders the HTML for the home page.
 * @returns {string} The HTML string for the home page.
 */
export function renderHomePage() {
    return `
        <section class="hero-section">
            <h1>Welcome to Gourmet Grub</h1>
            <p>Experience culinary excellence with our freshly prepared dishes, crafted with passion and the finest ingredients.</p>
            <div class="cta-buttons">
                <a href="#/menu" id="view-menu-btn" class="btn btn-primary">View Our Menu</a>
                <a href="#/contact" class="btn btn-secondary">Contact Us</a>
            </div>
        </section>

        <section class="about-section">
            <h2>Our Story</h2>
            <p>Gourmet Grub started with a simple vision: to bring delicious, high-quality food to your table with convenience. We believe in fresh, local ingredients and traditional cooking methods to create unforgettable meals that nourish the body and soul.</p>
            <p>Our chefs are passionate about food and constantly innovate to offer a diverse menu that caters to all tastes and dietary preferences. From hearty burgers to refreshing salads and decadent desserts, there's something for everyone to savor.</p>
        </section>

        <section class="features-section">
            <h2>Why Choose Us?</h2>
            <div class="features-grid">
                <div class="feature-item">
                    <h3>Fresh Ingredients</h3>
                    <p>We source only the freshest, high-quality ingredients from trusted local suppliers to ensure exceptional taste.</p>
                </div>
                <div class="feature-item">
                    <h3>Diverse Menu</h3>
                    <p>Explore a wide array of dishes, from classic comfort food to innovative culinary creations, satisfying every craving.</p>
                </div>
                <div class="feature-item">
                    <h3>Fast & Reliable</h3>
                    <p>Enjoy quick preparation and reliable service, whether you're dining in or ordering for pickup/delivery.</p>
                </div>
                <div class="feature-item">
                    <h3>Passionate Chefs</h3>
                    <p>Our experienced chefs craft each dish with dedication and expertise, ensuring a delightful dining experience.</p>
                </div>
            </div>
        </section>
    `;
}
