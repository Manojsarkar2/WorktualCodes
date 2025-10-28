import { ProductCard } from '../components/productCard.js';
import { products } from '../data/products.js';

export const renderHome = () => {
    const featuredProducts = products.slice(0, 6); // Get first 6 products for featured carousel

    return `
        <section class="hero">
            <div class="hero-content">
                <h1>Welcome to Whimsy World Toys!</h1>
                <p>Unleash Imagination, Discover Joy. Explore our enchanting collection of toys for every age and adventure.</p>
                <a href="/products" class="btn" onclick="event.preventDefault(); initRouter().navigate('/products')">Shop Now</a>
            </div>
        </section>

        <section class="container section-padding">
            <h2 class="section-heading">Featured Toys</h2>
            <div id="featured-carousel" class="carousel-container">
                <div class="carousel-track">
                    ${featuredProducts.map(product => `
                        <div class="carousel-item">
                            ${ProductCard(product)}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="container section-padding">
            <h2 class="section-heading">Explore Our Categories</h2>
            <div class="grid-3-cols">
                <div class="product-card">
                    <h3>Action Figures</h3>
                    <p class="description">Heroes, villains, and everything in between. Collect them all!</p>
                    <button class="btn" onclick="event.preventDefault(); initRouter().navigate('/products?category=action-figures')">View Category</button>
                </div>
                <div class="product-card">
                    <h3>Building Blocks</h3>
                    <p class="description">Unleash creativity with endless building possibilities.</p>
                    <button class="btn" onclick="event.preventDefault(); initRouter().navigate('/products?category=building-blocks')">View Category</button>
                </div>
                <div class="product-card">
                    <h3>Dolls & Plush</h3>
                    <p class="description">Cuddly companions and imaginative friends for every child.</p>
                    <button class="btn" onclick="event.preventDefault(); initRouter().navigate('/products?category=dolls-plush')">View Category</button>
                </div>
                <div class="product-card">
                    <h3>Board Games</h3>
                    <p class="description">Family fun and strategic challenges for all ages.</p>
                    <button class="btn" onclick="event.preventDefault(); initRouter().navigate('/products?category=board-games')">View Category</button>
                </div>
                <div class="product-card">
                    <h3>Outdoor Play</h3>
                    <p class="description">Adventure awaits! Get active with our outdoor toy selection.</p>
                    <button class="btn" onclick="event.preventDefault(); initRouter().navigate('/products?category=outdoor-play')">View Category</button>
                </div>
                <div class="product-card">
                    <h3>Educational Toys</h3>
                    <p class="description">Learn and grow through play with our smart toy range.</p>
                    <button class="btn" onclick="event.preventDefault(); initRouter().navigate('/products?category=educational-toys')">View Category</button>
                </div>
            </div>
        </section>

        <section class="container section-padding text-center">
            <h2 class="section-heading">Why Shop With Us?</h2>
            <div class="grid-3-cols">
                <div>
                    <h3>Quality Assured</h3>
                    <p>We hand-pick only the safest and most durable toys for your peace of mind.</p>
                </div>
                <div>
                    <h3>Fast Shipping</h3>
                    <p>Get your favorite toys delivered quickly right to your doorstep.</p>
                </div>
                <div>
                    <h3>Customer Support</h3>
                    <p>Our friendly team is always here to help with any questions or concerns.</p>
                </div>
            </div>
        </section>
    `;
};
