/**
 * Renders the HTML for the footer.
 * @returns {string} The HTML string for the footer.
 */
export function renderFooter() {
    const currentYear = new Date().getFullYear();
    return `
        <footer class="footer">
            <p>&copy; ${currentYear} Gourmet Grub. All rights reserved.</p>
            <div class="footer-links">
                <a href="#/privacy">Privacy Policy</a>
                <a href="#/terms">Terms of Service</a>
            </div>
        </footer>
    `;
}
