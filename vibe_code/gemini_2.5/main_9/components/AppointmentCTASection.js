import { createElement } from '../utils/helpers.js';

export class AppointmentCTASection {
    render() {
        const section = createElement('section', { class: 'appointment-cta-section section-padding' });
        const container = createElement('div', { class: 'container' });

        const heading = createElement('h2', {}, 'Need a Doctor for Check-up?');
        const paragraph = createElement('p', {}, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.');
        const button = createElement('button', { class: 'btn btn-primary btn-appointment' }, 'Make an Appointment');

        container.append(heading, paragraph, button);
        section.appendChild(container);

        return section;
    }
}
