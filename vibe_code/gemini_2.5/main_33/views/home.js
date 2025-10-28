export function getHomeView() {
    return `
        <div class="container">
            <h1>Welcome to Our Amazon-like Store!</h1>
            <p>Your one-stop shop for everything you need. Explore our wide range of products.</p>

            ${createCarousel('home-carousel', [
                { title: 'Discover New Arrivals', description: 'Fresh products added daily!' },
                { title: 'Limited Time Deals', description: 'Grab them before they are gone!' },
                { title: 'Electronics Galore', description: 'The latest gadgets at your fingertips.' }
            ])}

            <section style="margin-top: 40px;">
                <h2>Featured Categories</h2>
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
                    <div style="background-color: var(--card-bg); padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px var(--shadow); text-align: center; flex: 1; min-width: 250px;">
                        <h3>Electronics</h3>
                        <p>Explore the latest in tech.</p>
                        <a href="/products" data-link>Shop Now</a>
                    </div>
                    <div style="background-color: var(--card-bg); padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px var(--shadow); text-align: center; flex: 1; min-width: 250px;">
                        <h3>Books</h3>
                        <p>Dive into new worlds.</p>
                        <a href="/products" data-link>Shop Now</a>
                    </div>
                    <div style="background-color: var(--card-bg); padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px var(--shadow); text-align: center; flex: 1; min-width: 250px;">
                        <h3>Home & Kitchen</h3>
                        <p>Upgrade your living space.</p>
                        <a href="/products" data-link>Shop Now</a>
                    </div>
                </div>
            </section>

            <section style="margin-top: 40px;">
                <h2>Interactive Elements Demo</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 20px;">
                    <div class="dropdown-container" id="home-dropdown">
                        <button class="dropdown-button">More Options</button>
                        <div class="dropdown-content">
                            <a href="#" onclick="event.preventDefault(); alert('Option 1 clicked!');">Option 1</a>
                            <a href="#" onclick="event.preventDefault(); alert('Option 2 clicked!');">Option 2</a>
                            <a href="#" onclick="event.preventDefault(); alert('Option 3 clicked!');">Option 3</a>
                        </div>
                    </div>
                </div>

                ${createTabs('home-tabs', [
                    { title: 'Description', content: '<p>This is the first tab content, providing a general overview of our services and mission.</p>' },
                    { title: 'Features', content: '<p>Our platform offers client-side routing, dynamic content loading, and a responsive design for all devices.</p>' },
                    { title: 'Benefits', content: '<p>Enjoy a seamless shopping experience, fast navigation, and a user-friendly interface.</p>' }
                ])}

                ${createAccordion('home-accordion', [
                    { header: 'What is this project?', content: '<p>This is a single-page application (SPA) built with vanilla JavaScript, HTML, and CSS, demonstrating modern web development practices without frameworks.</p>' },
                    { header: 'How does routing work?', content: '<p>Client-side routing is implemented using the History API (<code>pushState</code>) to update content dynamically without full page reloads.</p>' },
                    { header: 'Can I add more products?', content: '<p>Yes, product data is loaded from <code>data/products.js</code> and can be easily extended.</p>' }
                ])}

            </section>
        </div>
    `;
}

import { createCarousel } from '../components/carousel.js';
import { createDropdown } from '../components/dropdown.js';
import { createTabs } from '../components/tabs.js';
import { createAccordion } from '../components/accordion.js';
