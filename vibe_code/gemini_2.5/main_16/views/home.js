import { renderCarousel } from '../components/carousel.js';
import { renderProductCard } from '../components/productCard.js';
import { products } from '../data/products.js';

export const renderHomePage = (container) => {
    container.innerHTML = `
        <section class="hero-section">
            <h1>Discover Your Next Favorite Product</h1>
            <p>Explore our curated collection of high-quality items, designed to elevate your everyday.</p>
            <a href="/products" data-link class="btn btn-success">Shop Now</a>
        </section>
        <section class="carousel-section mb-4">
            <h2>Featured Products</h2>
            <div id="home-carousel-container"></div>
        </section>
        <section class="product-listing-section">
            <h2>New Arrivals</h2>
            <div class="product-grid" id="new-arrivals-grid"></div>
        </section>
    `;

    // Render Carousel with a subset of products
    const carouselContainer = container.querySelector('#home-carousel-container');
    const featuredProducts = products.slice(0, 3); // Take first 3 for carousel
    renderCarousel(carouselContainer, featuredProducts);

    // Render New Arrivals (e.g., first 6 products)
    const newArrivalsGrid = container.querySelector('#new-arrivals-grid');
    products.slice(0, 6).forEach(product => {
        newArrivalsGrid.appendChild(renderProductCard(product));
    });
};
