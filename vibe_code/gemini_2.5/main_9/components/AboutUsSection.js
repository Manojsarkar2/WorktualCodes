import { createElement } from '../utils/helpers.js';
import { ASSET_URLS } from '../utils/constants.js';

export class AboutUsSection {
    render() {
        const section = createElement('section', { id: 'about', class: 'about-us-section section-padding' });
        const container = createElement('div', { class: 'container' });

        const imageDiv = createElement('div', { class: 'about-us-image' });
        const image = createElement('img', { src: ASSET_URLS.ABOUT_TEAM, alt: 'Medical team' });
        imageDiv.appendChild(image);

        const contentDiv = createElement('div', { class: 'about-us-content' });
        const heading = createElement('h2', {}, 'Why Choose Us?');
        const list = createElement('ul', { class: 'about-us-list' });
        const listItems = [
            'Qualified Doctors',
            'Emergency Care',
            '24/7 Support'
        ];
        listItems.forEach(itemText => {
            const listItem = createElement('li', {});
            const icon = createElement('img', { src: ASSET_URLS.CHECK_CIRCLE_ICON, alt: 'Check icon' });
            listItem.append(icon, itemText);
            list.appendChild(listItem);
        });
        const button = createElement('button', { class: 'btn btn-primary', 'data-link': '', href: '/about' }, 'Learn More');

        contentDiv.append(heading, list, button);

        container.append(imageDiv, contentDiv);
        section.appendChild(container);

        return section;
    }
}
