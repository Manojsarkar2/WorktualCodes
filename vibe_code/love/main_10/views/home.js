import { generateCarouselHTML, initCarousel } from '../components/carousel.js';
import { generateProductCardHTML, initProductCardListeners } from '../components/productCard.js';
import { products } from '../data/products.js';
import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for the Home page.
 * @returns {string} The HTML string for the Home page.
 */
export function getHomePageHTML() {
    const carouselSlides = [
        {
            title: 'Discover the Latest Tech', 
            description: 'Shop our wide selection of electronics, from smart devices to entertainment systems.', 
            background: 'https://via.placeholder.com/1200x400/FF9900/FFFFFF?text=New+Electronics', // Placeholder image
            link: '/products', 
            linkText: 'Shop Electronics'
        },
        {
            title: 'Books for Every Reader', 
            description: 'Explore bestsellers, new releases, and classic literature.', 
            background: 'https://via.placeholder.com/1200x400/232F3E/FFFFFF?text=Great+Books', // Placeholder image
            link: '/products', 
            linkText: 'Browse Books'
        },
        {
            title: 'Home Essentials & Decor', 
            description: 'Find everything you need to make your house a home.', 
            background: 'https://via.placeholder.com/1200x400/007185/FFFFFF?text=Home+Goods', // Placeholder image
            link: '/products', 
            linkText: 'Explore Home'
        }
    ];

    // Get a few featured products for the home page
    const featuredProducts = products.slice(0, 4);
    const productCardsHTML = featuredProducts.map(product => generateProductCardHTML(product)).join('');

    return `
        <div class="home-page">
            ${generateCarouselHTML(carouselSlides, 'home-carousel')}

            <div class="container">
                <section class="featured-products">
                    <h2>Featured Products</h2>
                    <div class="product-grid">
                        ${productCardsHTML}
                    </div>
                </section>

                <section class="category-showcase">
                    <h2>Shop by Category</h2>
                    <div class="category-grid product-grid">
                        <div class="product-card">
                            <div class="product-card-image"><span>Electronics</span></div>
                            <h3><a href="/products?category=Electronics" data-route="/products?category=Electronics">Electronics</a></h3>
                            <p>Smart devices, TVs, audio & more.</p>
                        </div>
                        <div class="product-card">
                            <div class="product-card-image"><span>Books</span></div>
                            <h3><a href="/products?category=Books" data-route="/products?category=Books">Books & Media</a></h3>
                            <p>Bestsellers, e-books, movies.</p>
                        </div>
                        <div class="product-card">
                            <div class="product-card-image"><span>Home & Kitchen</span></div>
                            <h3><a href="/products?category=Home%20&%20Kitchen" data-route="/products?category=Home%20&%20Kitchen">Home & Kitchen</a></h3>
                            <p>Appliances, decor, cookware.</p>
                        </div>
                        <div class="product-card">
                            <div class="product-card-image"><span>Smart Home</span></div>
                            <h3><a href="/products?category=Smart%20Home" data-route="/products?category=Smart%20Home">Smart Home</a></h3>
                            <p>Security, lighting, assistants.</p>
                        </div>
                    </div>
                </section>

                <section class="about-us-promo text-center">
                    <h2>About Amazon Clone</h2>
                    <p>Your one-stop shop for millions of products, delivered with speed and convenience. We are committed to providing you with the best online shopping experience.</p>
                    <a href="/contact" data-route="/contact" class="btn btn-secondary">Learn More & Contact Us</a>
                </section>
            </div>
        </div>
    `;
}

/**
 * Initializes any interactive components on the Home page.
 */
export function initHomePage() {
    initCarousel('home-carousel');
    const productGrid = getElement('.featured-products .product-grid');
    if (productGrid) {
        initProductCardListeners(productGrid);
    }

    // Lazy load images (placeholders in this case)
    document.querySelectorAll('.product-card-image').forEach(el => {
        // In a real app, you'd replace this with actual image loading logic
        // For now, we just ensure the placeholder text is visible.
        // If you had actual image URLs, you'd do something like:
        // const img = new Image();
        // img.src = el.dataset.src; // Assuming data-src attribute for actual image
        // img.onload = () => { el.innerHTML = ''; el.appendChild(img); };
    });
}