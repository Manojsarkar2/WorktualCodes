import TopBar from '../components/TopBar.js';
import CategorySection from '../components/CategorySection.js';
import BannerCarousel from '../components/BannerCarousel.js';
import ProductCard from '../components/ProductCard.js';
import BottomNavigation from '../components/BottomNavigation.js';
import { getStore } from '../utils/store.js';

const Home = () => {
    const products = getStore().products || [];

    const productCards = products.map(product => {
        return ProductCard(product);
    }).join('');

    return `
        ${TopBar()}
        ${CategorySection()}
        ${BannerCarousel()}
        <div class="featured-products">
            ${productCards}
        </div>
        ${BottomNavigation()}
    `;
};

export default Home;