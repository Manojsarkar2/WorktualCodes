import { Carousel } from '../components/Carousel.js';
import { ProductCard } from '../components/ProductCard.js';

export const HomeView = (products, onAddToCart) => {
    const homeDiv = document.createElement('div');
    homeDiv.className = 'home-view container';

    // Hero Carousel Section
    const heroCarouselSection = document.createElement('section');
    heroCarouselSection.className = 'hero-carousel';
    heroCarouselSection.setAttribute('aria-label', 'Promotional Banners');
    heroCarouselSection.innerHTML = `
        <div class="carousel">
            <div class="carousel-inner">
                <div class="carousel-item"><h2>Big Billion Days Sale!</h2><p>Grab the best deals now.</p></div>
                <div class="carousel-item bg-yellow"><h2>Electronics Extravaganza</h2><p>Up to 70% off on Mobiles & Laptops</p></div>
                <div class="carousel-item bg-green"><h2>Fashion Fiesta</h2><p>New styles every day!</p></div>
            </div>
            <button class="carousel-button prev" aria-label="Previous slide">&#10094;</button>
            <button class="carousel-button next" aria-label="Next slide">&#10095;</button>
        </div>
    `;
    homeDiv.appendChild(heroCarouselSection);

    // Categories Grid Section
    const categoriesSection = document.createElement('section');
    categoriesSection.className = 'category-grid';
    categoriesSection.setAttribute('aria-label', 'Shop by Category');
    categoriesSection.innerHTML = `
        <a href="#products?category=electronics" class="category-item" aria-label="Electronics category">
            <div class="icon">📱</div>
            <span>Electronics</span>
        </a>
        <a href="#products?category=fashion" class="category-item" aria-label="Fashion category">
            <div class="icon">👕</div>
            <span>Fashion</span>
        </a>
        <a href="#products?category=home-furniture" class="category-item" aria-label="Home & Furniture category">
            <div class="icon">🛋️</div>
            <span>Home & Furniture</span>
        </a>
        <a href="#products?category=appliances" class="category-item" aria-label="Appliances category">
            <div class="icon">📺</div>
            <span>Appliances</span>
        </a>
        <a href="#products?category=beauty-toys" class="category-item" aria-label="Beauty, Toys & More category">
            <div class="icon">💄</div>
            <span>Beauty, Toys & More</span>
        </a>
        <a href="#products?category=grocery" class="category-item" aria-label="Grocery category">
            <div class="icon">🍎</div>
            <span>Grocery</span>
        </a>
        <a href="#products?category=travel" class="category-item" aria-label="Travel category">
            <div class="icon">✈️</div>
            <span>Travel</span>
        </a>
        <a href="#products?category=two-wheelers" class="category-item" aria-label="Two Wheelers category">
            <div class="icon">🏍️</div>
            <span>Two Wheelers</span>
        </a>
    `;
    homeDiv.appendChild(categoriesSection);

    // Top Deals Section
    const topDealsSection = document.createElement('section');
    topDealsSection.className = 'product-section';
    topDealsSection.setAttribute('aria-labelledby', 'top-deals-heading');
    topDealsSection.innerHTML = `<h2 id="top-deals-heading">Top Deals of the Day</h2><div class="product-grid"></div>`;
    const topDealsGrid = topDealsSection.querySelector('.product-grid');
    products.filter(p => p.discount > 20).slice(0, 4).forEach(product => {
        topDealsGrid.appendChild(ProductCard(product, onAddToCart));
    });
    homeDiv.appendChild(topDealsSection);

    // Electronics Section
    const electronicsSection = document.createElement('section');
    electronicsSection.className = 'product-section';
    electronicsSection.setAttribute('aria-labelledby', 'electronics-heading');
    electronicsSection.innerHTML = `<h2 id="electronics-heading">Best in Electronics</h2><div class="product-grid"></div>`;
    const electronicsGrid = electronicsSection.querySelector('.product-grid');
    products.filter(p => p.category === 'Electronics').slice(0, 4).forEach(product => {
        electronicsGrid.appendChild(ProductCard(product, onAddToCart));
    });
    homeDiv.appendChild(electronicsSection);

    // Fashion Trends Section
    const fashionSection = document.createElement('section');
    fashionSection.className = 'product-section';
    fashionSection.setAttribute('aria-labelledby', 'fashion-heading');
    fashionSection.innerHTML = `<h2 id="fashion-heading">Fashion Trends</h2><div class="product-grid"></div>`;
    const fashionGrid = fashionSection.querySelector('.product-grid');
    products.filter(p => p.category === 'Fashion').slice(0, 4).forEach(product => {
        fashionGrid.appendChild(ProductCard(product, onAddToCart));
    });
    homeDiv.appendChild(fashionSection);

    return homeDiv;
};
