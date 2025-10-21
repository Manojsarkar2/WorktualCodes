import { ProductCard } from '../components/ProductCard.js';

export const OffersView = (products, onAddToCart) => {
    const offersDiv = document.createElement('div');
    offersDiv.className = 'offers-view container';
    offersDiv.innerHTML = `
        <h2 class="text-center" style="color: var(--primary-blue); margin-bottom: 30px;">Exciting Offers & Deals</h2>
        <p class="text-center" style="margin-bottom: 40px; color: var(--text-light);">Discover the best discounts across various categories!</p>
    `;

    const offerSections = [
        { title: 'Deals of the Day', filter: p => p.discount > 25, limit: 8 },
        { title: 'Electronics Hot Deals', filter: p => p.category === 'Electronics' && p.discount > 15, limit: 8 },
        { title: 'Fashion Clearance Sale', filter: p => p.category === 'Fashion' && p.discount > 30, limit: 8 },
        { title: 'Home & Kitchen Savings', filter: p => p.category === 'Home & Furniture' && p.discount > 10, limit: 8 }
    ];

    offerSections.forEach(sectionData => {
        const section = document.createElement('section');
        section.className = 'product-section';
        section.setAttribute('aria-labelledby', `offer-heading-${sectionData.title.replace(/\s/g, '-')}`);
        section.innerHTML = `<h2 id="offer-heading-${sectionData.title.replace(/\s/g, '-')}">${sectionData.title}</h2><div class="product-grid"></div>`;

        const productGrid = section.querySelector('.product-grid');
        const filteredProducts = products.filter(sectionData.filter).slice(0, sectionData.limit);

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                productGrid.appendChild(ProductCard(product, onAddToCart));
            });
        } else {
            productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-light);">No offers available in this section right now. Check back soon!</p>';
        }

        offersDiv.appendChild(section);
    });

    return offersDiv;
};
