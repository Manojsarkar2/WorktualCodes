import { appState, getProducts } from '../script.js';
import { renderCarousel } from '../components/carousel.js';
import { renderProductCard } from '../components/productCard.js';

export const renderHome = async (targetElement) => {
    const products = await getProducts();

    targetElement.innerHTML = `
        <div class="home-page">
            <div class="hero-section container">
                <h1>Welcome to Your Amazon-like Store</h1>
                <p>Discover millions of products, from electronics to home essentials. Shop now and experience seamless delivery!</p>
                <a href="/products" class="btn-shop" data-nav>Shop All Products</a>
            </div>

            <section class="carousel-section container">
                <h2 class="section-title">Featured Deals</h2>
                <div id="home-carousel-container"></div>
            </section>

            <section class="product-showcase container">
                <h2 class="section-title">Electronics You Might Like</h2>
                <div id="electronics-grid" class="product-grid"></div>
            </section>

            <section class="product-showcase container">
                <h2 class="section-title">Home & Kitchen Essentials</h2>
                <div id="home-kitchen-grid" class="product-grid"></div>
            </section>
        </div>
    `;

    // Render Carousel
    const carouselContainer = document.getElementById('home-carousel-container');
    const carouselProducts = products.filter(p => ['p101', 'p102', 'p103'].includes(p.id)); // Example featured products
    renderCarousel(carouselContainer, carouselProducts);

    // Render Electronics Grid
    const electronicsGrid = document.getElementById('electronics-grid');
    const electronics = products.filter(p => p.category === 'Electronics').slice(0, 4); // Show top 4 electronics
    electronics.forEach(product => {
        electronicsGrid.appendChild(renderProductCard(product));
    });

    // Render Home & Kitchen Grid
    const homeKitchenGrid = document.getElementById('home-kitchen-grid');
    const homeKitchen = products.filter(p => p.category === 'Home & Kitchen').slice(0, 4); // Show top 4 home & kitchen
    homeKitchen.forEach(product => {
        homeKitchenGrid.appendChild(renderProductCard(product));
    });

    // Lazy load images (placeholders in this case)
    const lazyLoadPlaceholders = document.querySelectorAll('.product-card-image-placeholder');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('lazy-loaded'); // Simulate loading
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    lazyLoadPlaceholders.forEach(placeholder => observer.observe(placeholder));
};
