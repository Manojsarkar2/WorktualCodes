import { createElement } from '../utils/helpers.js';
import { ASSET_URLS } from '../utils/constants.js';

export class Navbar {
    constructor() {
        this.navLinks = ['Home', 'About', 'Services', 'Doctors', 'Blog', 'Contact'];
    }

    render() {
        const navElement = createElement('nav', { class: 'navbar' });
        const container = createElement('div', { class: 'container' });

        const logo = createElement('a', { href: '/', class: 'navbar-logo', 'data-link': '' }, 'Medical');

        const navLinksList = createElement('ul', { class: 'nav-links' });
        this.navLinks.forEach(linkText => {
            const listItem = createElement('li');
            const link = createElement('a', { href: `/${linkText.toLowerCase()}`, 'data-link': '' }, linkText);
            listItem.appendChild(link);
            navLinksList.appendChild(listItem);
        });

        const appointmentButton = createElement('button', { class: 'btn btn-primary btn-appointment' }, 'Make an Appointment');

        container.append(logo, navLinksList, appointmentButton);
        navElement.appendChild(container);

        return navElement;
    }
}
