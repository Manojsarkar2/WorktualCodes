import { getServices } from '../data/mockData.js';

export const renderServicesPage = () => {
    const services = getServices();

    return `
        <section class="section">
            <h1>Our Comprehensive Medical Services</h1>
            <p>At MediCare Clinic, we are dedicated to providing a wide range of high-quality medical services to meet the diverse needs of our patients. Our experienced team uses the latest medical advancements to ensure you receive the best possible care.</p>

            <div class="accordion-container" id="services-accordion">
                ${services.map(service => `
                    <div class="accordion-item">
                        <div class="accordion-header" role="button" aria-expanded="false" aria-controls="content-${service.id}" tabindex="0">
                            <h3>${service.name}</h3>
                        </div>
                        <div id="content-${service.id}" class="accordion-content" role="region" aria-hidden="true">
                            <p>${service.description}</p>
                            <ul>
                                ${service.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                            <p><strong>Estimated Cost:</strong> ${service.cost}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
};
