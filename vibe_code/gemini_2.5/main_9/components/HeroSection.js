import { createElement } from '../utils/helpers.js';
import { ASSET_URLS } from '../utils/constants.js';

export class HeroSection {
    render() {
        const section = createElement('section', { class: 'hero-section section-padding' });
        const container = createElement('div', { class: 'container flex items-center' });

        const contentDiv = createElement('div', { class: 'hero-content' });
        const heading = createElement('h1', {}, 'Your Health Is Our Top Priority');
        const paragraph = createElement('p', {}, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.');
        const button = createElement('button', { class: 'btn btn-primary btn-appointment' }, 'Make an Appointment');

        contentDiv.append(heading, paragraph, button);

        const imageDiv = createElement('div', { class: 'hero-image' });
        const image = createElement('img', { src: ASSET_URLS.HERO_DOCTOR, alt: 'Doctor illustration' });
        imageDiv.appendChild(image);

        container.append(contentDiv, imageDiv);
        section.appendChild(container);

        return section;
    }
}
