import { createElement } from '../utils/helpers.js';
import { DoctorCard } from './DoctorCard.js';
import api from '../api.js';

export class DoctorsSection {
    constructor() {
        this.doctors = [];
    }

    async render() {
        this.doctors = await api.getDoctors();

        const section = createElement('section', { id: 'doctors', class: 'doctors-section section-padding text-center' });
        const container = createElement('div', { class: 'container' });

        const headerDiv = createElement('div', { class: 'section-header' });
        const heading = createElement('h2', {}, 'Our Doctors');
        const paragraph = createElement('p', {}, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.');
        headerDiv.append(heading, paragraph);

        const cardsGrid = createElement('div', { class: 'grid grid-cols-4 gap-lg' });
        this.doctors.forEach(doctor => {
            const card = new DoctorCard(doctor);
            cardsGrid.appendChild(card.render());
        });

        container.append(headerDiv, cardsGrid);
        section.appendChild(container);

        return section;
    }
}
