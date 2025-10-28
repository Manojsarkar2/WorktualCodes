import { $ } from '../utils/dom.js';
import { subscribeToNewsletter } from '../api/mockApi.js';
import { store } from '../store.js';

export const Footer = () => {
    const footerEl = $.create('footer', { class: 'footer' });
    const container = $.create('div', { class: 'container' });

    const footerTop = $.create('div', { class: 'footer-top' });

    // Footer Brand & Socials
    const footerBrand = $.create('div', { class: 'footer-brand' });
    footerBrand.innerHTML = `
        <img src="assets/images/logo.svg" alt="Positivus Logo" class="footer-logo">
        <p class="text-small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="footer-social-links">
            <a href="#" class="footer-social-link" aria-label="Facebook"><img src="assets/images/facebook.svg" alt="Facebook"></a>
            <a href="#" class="footer-social-link" aria-label="Twitter"><img src="assets/images/twitter.svg" alt="Twitter"></a>
            <a href="#" class="footer-social-link" aria-label="LinkedIn"><img src="assets/images/linkedin.svg" alt="LinkedIn"></a>
        </div>
    `;
    footerTop.appendChild(footerBrand);

    // Footer Nav Columns
    const footerNavColumns = $.create('div', { class: 'footer-nav-columns' });
    const navData = [
        { title: 'Company', links: ['About Us', 'Services', 'Use Cases', 'Blog', 'Contact Us'] },
        { title: 'Support', links: ['Help Center', 'Terms of Service', 'Legal', 'Privacy Policy'] }
    ];

    navData.forEach(colData => {
        const column = $.create('div', { class: 'footer-nav-column' });
        column.innerHTML = `<h4>${colData.title}</h4>`;
        const ul = $.create('ul');
        colData.links.forEach(linkText => {
            const li = $.create('li');
            const link = $.create('a', { href: `#${linkText.toLowerCase().replace(/\s/g, '-')}`, 'data-nav-link': '' });
            link.textContent = linkText;
            li.appendChild(link);
            ul.appendChild(li);
        });
        column.appendChild(ul);
        footerNavColumns.appendChild(column);
    });
    footerTop.appendChild(footerNavColumns);

    // Footer Subscribe
    const footerSubscribe = $.create('div', { class: 'footer-subscribe' });
    footerSubscribe.innerHTML = `<h4>Join Our Newsletter</h4>`;
    const subscribeForm = $.create('form', { class: 'subscribe-form' });
    subscribeForm.innerHTML = `
        <input type="email" placeholder="Your email address" required aria-label="Email for newsletter">
        <button type="submit">Subscribe</button>
        <p class="form-message text-small" id="footer-subscribe-message"></p>
    `;
    footerSubscribe.appendChild(subscribeForm);

    const subscribeEmailInput = subscribeForm.querySelector('input');
    const subscribeMessageEl = subscribeForm.querySelector('#footer-subscribe-message');

    subscribeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = subscribeEmailInput.value;
        if (!email) {
            subscribeMessageEl.textContent = 'Please enter your email.';
            subscribeMessageEl.className = 'form-message text-small error';
            return;
        }

        store.setState({ subscribeFormStatus: 'submitting' });
        subscribeMessageEl.textContent = 'Subscribing...';
        subscribeMessageEl.className = 'form-message text-small';

        try {
            await subscribeToNewsletter(email);
            subscribeMessageEl.textContent = 'Thank you for subscribing!';
            subscribeMessageEl.className = 'form-message text-small success';
            subscribeEmailInput.value = '';
        } catch (error) {
            subscribeMessageEl.textContent = 'Subscription failed. Please try again.';
            subscribeMessageEl.className = 'form-message text-small error';
        } finally {
            store.setState({ subscribeFormStatus: null });
        }
    });

    footerTop.appendChild(footerSubscribe);
    container.appendChild(footerTop);

    // Footer Bottom
    const footerBottom = $.create('div', { class: 'footer-bottom' });
    footerBottom.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} Positivus. All Rights Reserved.</p>
    `;
    container.appendChild(footerBottom);

    footerEl.appendChild(container);
    return footerEl;
};
