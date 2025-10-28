import { createElement } from '../utils/helpers.js';
import { ServiceCard } from './ServiceCard.js';
import api from '../api.js';

export class ServicesSection {
    constructor() {
        this.services = [];
    }

    async render() {
        this.services = await api.getServices();

        const section = createElement('section', { id: 'services', class: 'services-section section-padding text-center' });
        const container = createElement('div', { class: 'container' });

        const headerDiv = createElement('div', { class: 'section-header' });
        const heading = createElement('h2', {}, 'Our Services');
        const paragraph = createElement('p', {}, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.');
        headerDiv.append(heading, paragraph);

        const cardsGrid = createElement('div', { class: 'grid grid-cols-3 gap-lg' });
        this.services.forEach(service => {
            const card = new ServiceCard(service);
            cardsGrid.appendChild(card.render());
        });

        container.append(headerDiv, cardsGrid);
        section.appendChild(container);

        return section;
    }
}
