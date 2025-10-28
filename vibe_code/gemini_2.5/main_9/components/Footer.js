import { createElement } from '../utils/helpers.js';
import { ASSET_URLS } from '../utils/constants.js';

export class Footer {
    render() {
        const footerElement = createElement('footer', { class: 'footer' });
        const container = createElement('div', { class: 'container' });

        // Column 1: Logo and Address
        const col1 = createElement('div', { class: 'footer-col' });
        const logo = createElement('a', { href: '/', class: 'navbar-logo', 'data-link': '' }, 'Medical');
        const address = createElement('p', {}, '123 Health St, Wellness City, 12345');
        const phone = createElement('p', {}, 'Phone: (123) 456-7890');
        const email = createElement('p', {}, 'Email: info@medical.com');
        col1.append(logo, address, phone, email);

        // Column 2: Quick Links
        const col2 = createElement('div', { class: 'footer-col' });
        const quickLinksHeading = createElement('h3', {}, 'Quick Links');
        const quickLinksList = createElement('ul', { class: 'nav-links' });
        ['Home', 'About', 'Services', 'Contact'].forEach(linkText => {
            const listItem = createElement('li');
            const link = createElement('a', { href: `/${linkText.toLowerCase()}`, 'data-link': '' }, linkText);
            listItem.appendChild(link);
            quickLinksList.appendChild(listItem);
        });
        col2.append(quickLinksHeading, quickLinksList);

        // Column 3: Our Services
        const col3 = createElement('div', { class: 'footer-col' });
        const servicesHeading = createElement('h3', {}, 'Our Services');
        const servicesList = createElement('ul', { class: 'nav-links' });
        ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'].forEach(linkText => {
            const listItem = createElement('li');
            const link = createElement('a', { href: `/services#${linkText.toLowerCase()}`, 'data-link': '' }, linkText);
            listItem.appendChild(link);
            servicesList.appendChild(listItem);
        });
        col3.append(servicesHeading, servicesList);

        // Column 4: Social Media
        const col4 = createElement('div', { class: 'footer-col' });
        const socialHeading = createElement('h3', {}, 'Follow Us');
        const socialsDiv = createElement('div', { class: 'footer-socials' });
        const socialIcons = [
            { icon: ASSET_URLS.FACEBOOK_ICON, alt: 'Facebook', url: '#' },
            { icon: ASSET_URLS.TWITTER_ICON, alt: 'Twitter', url: '#' },
            { icon: ASSET_URLS.INSTAGRAM_ICON, alt: 'Instagram', url: '#' },
            { icon: ASSET_URLS.LINKEDIN_ICON, alt: 'LinkedIn', url: '#' }
        ];
        socialIcons.forEach(social => {
            const socialLink = createElement('a', { href: social.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': social.alt });
            const socialImg = createElement('img', { src: social.icon, alt: social.alt });
            socialLink.appendChild(socialImg);
            socialsDiv.appendChild(socialLink);
        });
        col4.append(socialHeading, socialsDiv);

        container.append(col1, col2, col3, col4);

        const copyrightDiv = createElement('div', { class: 'footer-bottom' });
        const copyrightText = createElement('p', {}, `© ${new Date().getFullYear()} Medical. All rights reserved.`);
        copyrightDiv.appendChild(copyrightText);

        footerElement.append(container, copyrightDiv);

        return footerElement;
    }
}
