import { SearchBar } from './searchBar.js';
import { Button } from './button.js';
import { CartIcon } from './cartIcon.js';

export const Header = () => {
    return `
        <header class="header">
            <div class="header-container container">
                <a href="/" class="logo">Flipkart</a>
                ${SearchBar({ placeholder: 'Search for products, brands and more' })}
                <div>
                    ${Button({ label: 'Login' })}
                    ${CartIcon()}
                </div>
            </div>
        </header>
    `;
};