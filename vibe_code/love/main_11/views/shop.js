import { shopItems } from '../data/shopItems.js';

export const getShopPageContent = async () => {
    const categories = [...new Set(shopItems.map(item => item.category))];

    return `
        <section class="hero-section text-center">
            <h1>Clash of Clans Shop</h1>
            <p class="lead">Boost your village and army with exclusive in-game items!</p>
        </section>

        <div class="tabs-container" id="shop-tabs">
            <div class="tab-buttons">
                ${categories.map((category, index) => `
                    <button class="tab-button ${index === 0 ? 'active' : ''}" data-tab="${category.toLowerCase().replace(/\s/g, '-')}">${category}</button>
                `).join('')}
            </div>
            ${categories.map((category, index) => `
                <div class="tab-content" id="${category.toLowerCase().replace(/\s/g, '-')}" style="display:${index === 0 ? 'block' : 'none'};">
                    <div class="shop-grid">
                        ${shopItems.filter(item => item.category === category).map(item => `
                            <div class="card shop-item-card">
                                <h3>${item.name}</h3>
                                <p>${item.description}</p>
                                <p class="price"><strong>$${item.price.toFixed(2)}</strong></p>
                                <button class="btn btn-primary add-to-cart-btn"
                                    data-product-id="${item.id}"
                                    data-product-name="${item.name}"
                                    data-product-price="${item.price}"
                                    data-product-category="${item.category}"
                                    aria-label="Add ${item.name} to cart">
                                    Add to Cart
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};
