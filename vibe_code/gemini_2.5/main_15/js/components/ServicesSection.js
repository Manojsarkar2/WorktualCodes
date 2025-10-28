import store from '../store.js';

class ServicesSection {
    async render() {
        const arrowIcon = `
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 25L25 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 5H25V25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const servicesCards = store.services.map((service, index) => `
            <div class="service-card">
                <div class="service-card__header">
                    <h3 class="service-card__title"><span>${service.title.split(' ')[0]}</span> ${service.title.split(' ').slice(1).join(' ')}</h3>
                    <div class="service-card__icon">${arrowIcon}</div>
                </div>
                <p class="service-card__description">${service.description}</p>
            </div>
        `).join('');

        return `
            <section class="services section" id="services">
                <div class="container">
                    <div class="section-header">
                        <div class="section-header__left">
                            <h2 class="section-title">Services</h2>
                            <p class="section-subtitle">At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:</p>
                        </div>
                    </div>
                    <div class="services-grid">
                        ${servicesCards}
                    </div>
                </div>
            </section>
        `;
    }
}

export default new ServicesSection();
