import { $ } from '../utils/dom.js';
import { Button } from './Button.js';

export const Header = () => {
    const headerEl = $.create('header', { class: 'header' });
    const headerContent = $.create('div', { class: 'header-content container' });

    headerContent.innerHTML = `
        <a href="/" data-nav-link><img src="assets/images/logo.svg" alt="Positivus Logo" class="header-logo"></a>
        <nav>
            <button class="nav-toggle-button" aria-label="Toggle navigation"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
            <ul class="nav-list" role="navigation">
                <li class="nav-item"><a href="#about-us" data-nav-link>About us</a></li>
                <li class="nav-item"><a href="#services" data-nav-link>Services</a></li>
                <li class="nav-item"><a href="#use-cases" data-nav-link>Use Cases</a></li>
                <li class="nav-item"><a href="#testimonials" data-nav-link>Testimonials</a></li>
                <li class="nav-item"><a href="#team" data-nav-link>Our Team</a></li>
                <li class="nav-item"><a href="#contact" data-nav-link>Contact Us</a></li>
            </ul>
        </nav>
    `;

    const getStartedButton = Button({ text: 'Get Started', onClick: () => console.log('Get Started clicked!'), variant: 'secondary' });
    headerContent.appendChild(getStartedButton);
    headerEl.appendChild(headerContent);

    return headerEl;
};
