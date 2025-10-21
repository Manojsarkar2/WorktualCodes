import { createProductCard } from '../components/productCard.js';
import { getProductsData } from '../script.js';

export const DealsView = async () => {
    const products = getProductsData();
    // For a real app, this would fetch actual deals. For now, let's pick some random products.
    const dealProducts = products.filter((_, index) => index % 3 === 0).slice(0, 6);

    return `
        <div class="container">
            <h1 class="section-title">Today's Deals</h1>
            <p class="text-center" style="margin-bottom: 30px;">Don't miss out on these limited-time offers!</p>
            <div class="grid-container" id="deals-grid">
                ${dealProducts.length > 0 
                    ? dealProducts.map(product => createProductCard(product).outerHTML).join('')
                    : '<p class="text-center">No deals available right now. Check back soon!</p>'
                }
            </div>
        </div>
    `;
};

DealsView.afterRender = () => {
    // Any specific logic for deals page after render, e.g., countdown timers
};
