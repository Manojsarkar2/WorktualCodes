import { navigateTo, logoutUser, getUser } from '../script.js';

export const renderNavbar = (user, cartItemCount) => {
    const loggedIn = !!user;
    const username = user ? user.username : 'Guest';

    return `
        <nav class="navbar">
            <a href="/" class="navbar-brand" data-link>Amazon Clone</a>
            <div class="navbar-search">
                <input type="text" id="search-input" placeholder="Search Amazon Clone...">
                <button id="search-button" aria-label="Search"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
            </div>
            <div class="hamburger-menu">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <ul class="navbar-links">
                <li><a href="/" data-link>Home</a></li>
                <li><a href="/products" data-link>Products</a></li>
                <li><a href="/deals" data-link>Deals</a></li>
                <li><a href="/customer-service" data-link>Customer Service</a></li>
                <li><a href="/contact" data-link>Contact</a></li>
                <li>
                    <a href="/cart" data-link aria-label="Shopping Cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        <span id="cart-count" class="navbar-cart-count" style="display: ${cartItemCount > 0 ? 'block' : 'none'};">${cartItemCount}</span>
                    </a>
                </li>
                ${loggedIn ? `
                    <li><a href="#" id="user-greeting">Hello, ${username.split(' ')[0]}</a></li>
                    <li><button id="logout-button" class="small-button">Logout</button></li>
                ` : `
                    <li><a href="/login" data-link>Sign In</a></li>
                    <li><a href="/signup" data-link>Sign Up</a></li>
                `}
            </ul>
        </nav>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    // Event listener for logout button (needs to be attached after navbar is rendered)
    document.getElementById('header').addEventListener('click', (e) => {
        if (e.target.id === 'logout-button') {
            logoutUser();
        }
    });
});
