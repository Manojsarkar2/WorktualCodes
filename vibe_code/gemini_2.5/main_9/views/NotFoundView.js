import { createElement } from '../utils/helpers.js';

export class NotFoundView {
    render() {
        const div = createElement('div', { class: 'container section-padding text-center' });
        const heading = createElement('h1', {}, '404 - Page Not Found');
        const paragraph = createElement('p', {}, 'The page you are looking for does not exist.');
        const homeLink = createElement('a', { href: '/', 'data-link': '', class: 'btn btn-primary' }, 'Go to Home');

        div.append(heading, paragraph, homeLink);
        return div;
    }
}
