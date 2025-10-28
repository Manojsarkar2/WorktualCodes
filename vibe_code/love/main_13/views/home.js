import { renderCarousel } from '../components/carousel.js';
import { renderProductCard } from '../components/productCard.js';

export const renderHomeView = (container, products) => {
    container.innerHTML = `
        <div class="container home-page">
            <section class="carousel-section">
                <h2>Top Offers</h2>
                <div id="home-carousel"></div>
            </section>
            <section class="product-grid-section">
                <h2>Recommended for You</h2>
                <div class="product-grid" id="home-product-grid"></div>
            </section>
        </div>
    `;

    const carouselContainer = container.querySelector('#home-carousel');
    const carouselItems = [
        { title: 'Grand Festive Sale', description: 'Up to 80% off on Electronics' },
        { title: 'Fashion Fiesta', description: 'Min. 60% off on Clothes & Accessories' },
        { title: 'Home & Kitchen Essentials', description: 'Starting from ₹99' }
    ];
    renderCarousel(carouselContainer, carouselItems);

    const productGrid = container.querySelector('#home-product-grid');
    // Display a subset of products on the home page
    const featuredProducts = products.slice(0, 8); 
    featuredProducts.forEach(product => {
        productGrid.appendChild(renderProductCard(product));
    });
};
