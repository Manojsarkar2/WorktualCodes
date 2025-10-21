import { createCarousel } from '../components/carousel.js';
import { createProductCard } from '../components/productCard.js';
import { getProductsData } from '../script.js';

export const HomeView = async () => {
    const products = getProductsData();
    const featuredProducts = products.slice(0, 4); // Take first 4 as featured

    const carouselSlides = [
        {
            title: 'Welcome to Amazon Clone!',
            description: 'Your one-stop shop for everything you need.',
            link: '/products',
            bgColor: '#232F3E'
        },
        {
            title: 'Deals of the Day',
            description: 'Don\'t miss out on our limited-time offers!',
            link: '/deals',
            bgColor: '#FF9900'
        },
        {
            title: 'New Arrivals',
            description: 'Discover the latest products across all categories.',
            link: '/products',
            bgColor: '#007185'
        }
    ];

    return `
        <section class="hero-section">
            <div id="home-carousel" class="carousel-container"></div>
        </section>

        <section class="featured-products-section container">
            <h2 class="section-title">Featured Products</h2>
            <div class="grid-container" id="featured-products-grid">
                ${featuredProducts.map(product => createProductCard(product).outerHTML).join('')}
            </div>
        </section>

        <section class="categories-section container">
            <h2 class="section-title">Shop by Category</h2>
            <div class="grid-container">
                <div class="product-card text-center">
                    <h3>Electronics</h3>
                    <p>Smart devices, TVs, audio</p>
                    <button onclick="window.navigateTo('/products?category=Electronics')">Shop Now</button>
                </div>
                <div class="product-card text-center">
                    <h3>Books & Kindle</h3>
                    <p>Read your next favorite story</p>
                    <button onclick="window.navigateTo('/products?category=Books%20%26%20Kindle')">Shop Now</button>
                </div>
                <div class="product-card text-center">
                    <h3>Home & Kitchen</h3>
                    <p>Essentials for your home</p>
                    <button onclick="window.navigateTo('/products?category=Home%20%26%20Kitchen')">Shop Now</button>
                </div>
                <div class="product-card text-center">
                    <h3>Smart Home</h3>
                    <p>Automate your living space</p>
                    <button onclick="window.navigateTo('/products?category=Smart%20Home')">Shop Now</button>
                </div>
            </div>
        </section>
    `;
};

HomeView.afterRender = () => {
    const carouselContainer = document.getElementById('home-carousel');
    if (carouselContainer) {
        const carouselSlides = [
            {
                title: 'Welcome to Amazon Clone!',
                description: 'Your one-stop shop for everything you need.',
                link: '/products',
                bgColor: '#232F3E'
            },
            {
                title: 'Deals of the Day',
                description: 'Don\'t miss out on our limited-time offers!',
                link: '/deals',
                bgColor: '#FF9900'
            },
            {
                title: 'New Arrivals',
                description: 'Discover the latest products across all categories.',
                link: '/products',
                bgColor: '#007185'
            }
        ];
        createCarousel('home-carousel', carouselSlides);
    }
};
