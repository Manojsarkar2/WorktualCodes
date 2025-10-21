import { Header, updateActiveNav } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { api } from '../services/api.js';
import { ProductCard } from '../components/ProductCard.js';
import { CardGrid } from '../components/CardGrid.js';

export const ShopView = {
    render: async (container) => {
        updateActiveNav('/shop');
        const products = await api.fetchProducts();

        container.innerHTML = `
            ${Header()}
            <main class="container section-padding">
                <h1 class="text-center">Our Shop</h1>
                <p class="text-center" style="margin-bottom: var(--spacing-xl);">Explore our exquisite collection of interior decor.</p>
                ${CardGrid({ 
                    children: products.map(product => ProductCard({ 
                        id: product.id, 
                        image: product.image, 
                        name: product.name, 
                        price: product.price 
                    })), 
                    columns: 4 
                })}
            </main>
            ${Footer()}
        `;
    }
};
