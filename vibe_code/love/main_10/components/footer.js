import { getElement } from '../utils/dom.js';

/**
 * Generates the HTML for the footer section.
 * @returns {string} The HTML string for the footer.
 */
function generateFooterHTML() {
    return `
        <div class="container footer-content">
            <div class="footer-section">
                <h4>Get to Know Us</h4>
                <ul>
                    <li><a href="#" data-route="/about">About Us</a></li>
                    <li><a href="#" data-route="/careers">Careers</a></li>
                    <li><a href="#" data-route="/press-releases">Press Releases</a></li>
                    <li><a href="#" data-route="/amazon-science">Amazon Science</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Make Money with Us</h4>
                <ul>
                    <li><a href="#" data-route="/sell-on-amazon">Sell on Amazon</a></li>
                    <li><a href="#" data-route="/sell-apps">Sell apps on Amazon</a></li>
                    <li><a href="#" data-route="/supply-chain">Supply Chain by Amazon</a></li>
                    <li><a href="#" data-route="/affiliate-program">Become an Affiliate</a></li>
                    <li><a href="#" data-route="/advertise-your-products">Advertise Your Products</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Amazon Payment Products</h4>
                <ul>
                    <li><a href="#" data-route="/amazon-rewards-visa">Amazon Rewards Visa Signature Cards</a></li>
                    <li><a href="#" data-route="/amazon-store-card">Amazon.com Store Card</a></li>
                    <li><a href="#" data-route="/amazon-secured-card">Amazon Secured Card</a></li>
                    <li><a href="#" data-route="/currency-converter">Currency Converter</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Let Us Help You</h4>
                <ul>
                    <li><a href="#" data-route="/account">Your Account</a></li>
                    <li><a href="#" data-route="/orders">Your Orders</a></li>
                    <li><a href="#" data-route="/shipping-rates">Shipping Rates & Policies</a></li>
                    <li><a href="#" data-route="/returns">Returns & Replacements</a></li>
                    <li><a href="#" data-route="/help">Help</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 1996-2023, Amazon Clone, Inc. or its affiliates</p>
            <p>
                <a href="#" data-route="/conditions-of-use">Conditions of Use</a>
                <a href="#" data-route="/privacy-notice">Privacy Notice</a>
                <a href="#" data-route="/interest-based-ads">Interest-Based Ads</a>
            </p>
        </div>
    `;
}

/**
 * Renders the footer into the DOM.
 */
export function renderFooter() {
    const footerContainer = getElement('#footer-container');
    if (!footerContainer) return;

    footerContainer.classList.add('footer'); // Add base footer class
    footerContainer.innerHTML = generateFooterHTML();
}