import { updateCartUI } from '../script.js';

export const Header = {
    render: () => {
        return `
        <header class="main-header">
            <nav class="navbar">
                <div class="nav-logo">
                    <a href="#/">Bloom & Petal</a>
                </div>
                <ul class="nav-links">
                    <li><a href="#/">Home</a></li>
                    <li><a href="#/shop">Shop</a></li>
                    <li><a href="#/our-story">Our Story</a></li>
                    <li><a href="#/contact">Contact</a></li>
                </ul>
                <div class="nav-actions">
                    <button class="cart-button" aria-label="Open shopping cart">
                        <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                        <span class="cart-item-count">0</span>
                    </button>
                    <div class="hamburger">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </nav>
        </header>
        `;
    },
    after_render: () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        updateCartUI();
    }
};