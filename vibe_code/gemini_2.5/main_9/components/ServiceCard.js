import { createElement } from '../utils/helpers.js';

export class ServiceCard {
    constructor(service) {
        this.service = service;
    }

    render() {
        const card = createElement('div', { class: 'service-card' });

        const icon = createElement('img', { src: this.service.icon, alt: `${this.service.title} icon` });
        const title = createElement('h3', {}, this.service.title);
        const description = createElement('p', {}, this.service.description);
        const link = createElement('a', { href: this.service.link, 'data-link': '' }, 'Read More');

        card.append(icon, title, description, link);

        return card;
    }
}
