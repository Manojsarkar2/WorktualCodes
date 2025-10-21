import SearchBar from './SearchBar.js';

const TopBar = () => {
    return `
        <div class="top-bar">
            <h1>Flipkart</h1>
            ${SearchBar()}
            <span class="cart-icon">🛒</span>
        </div>
    `;
};

export default TopBar;