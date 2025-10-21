import { Header, updateActiveNav } from '../components/Header.js';
import { Button } from '../components/Button.js';
import { CardGrid } from '../components/CardGrid.js';
import { RoomCard } from '../components/RoomCard.js';
import { FeatureCard } from '../components/FeatureCard.js';
import { ProductCard } from '../components/ProductCard.js';
import { InputField } from '../components/InputField.js';
import { Footer } from '../components/Footer.js';
import { api } from '../services/api.js';

export const HomeView = { 
    render: async (container) => {
        updateActiveNav('/');

        // Fetch mock data
        const products = await api.fetchProducts();
        const categories = await api.fetchCategories();

        const featuredProducts = products.slice(0, 4); // Get first 4 products

        container.innerHTML = `
            ${Header()}
            <main>
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="hero-content">
                        <h1>Modern Interior Design</h1>
                        <p>A fusion of style and comfort, our curated collection brings elegance to every corner of your home.</p>
                        ${Button({ label: 'Shop Now', link: '/shop' })}
                    </div>
                </section>

                <!-- Browse by Room Section -->
                <section class="browse-by-room-section section-padding">
                    <div class="container text-center">
                        <h2>Browse by Room</h2>
                        <p>Discover furniture tailored for every space.</p>
                        ${CardGrid({ 
                            children: categories.map(cat => RoomCard({ image: cat.image, label: cat.name })), 
                            columns: 4 
                        })}
                    </div>
                </section>

                <!-- Why Choose Us Section -->
                <section class="why-choose-us-section section-padding">
                    <div class="container text-center">
                        <h2>Why Choose Us</h2>
                        <p>Experience the difference with Furni.</p>
                        ${CardGrid({ 
                            children: [
                                FeatureCard({ iconName: 'Shipping', title: 'Free Shipping', description: 'Enjoy complimentary shipping on all orders.' }),
                                FeatureCard({ iconName: 'Support', title: '24/7 Support', description: 'Our dedicated team is here to help you anytime.' }),
                                FeatureCard({ iconName: 'Price', title: 'Affordable Price', description: 'Premium quality without the premium price tag.' })
                            ],
                            columns: 3
                        })}
                    </div>
                </section>

                <!-- Featured Products Section -->
                <section class="featured-products-section section-padding">
                    <div class="container text-center">
                        <h2>Featured Products</h2>
                        <p>Handpicked selections for your home.</p>
                        ${CardGrid({ 
                            children: featuredProducts.map(product => ProductCard({ 
                                id: product.id, 
                                image: product.image, 
                                name: product.name, 
                                price: product.price 
                            })), 
                            columns: 4 
                        })}
                    </div>
                </section>

                <!-- Newsletter Section -->
                <section class="newsletter-section">
                    <div class="container">
                        <h2>Join Our Newsletter</h2>
                        <p>Stay up-to-date with our latest collections and exclusive offers.</p>
                        <form class="newsletter-form" onsubmit="window.handleNewsletterSubmit(event)">
                            ${InputField({ type: 'email', placeholder: 'Enter your email', name: 'email' })}
                            ${Button({ label: 'Subscribe', type: 'submit', className: 'btn-primary' })}
                        </form>
                    </div>
                </section>
            </main>
            ${Footer()}
        `;
    }
};
