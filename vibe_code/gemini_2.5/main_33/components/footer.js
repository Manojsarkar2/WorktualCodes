export function getFooterHTML() {
    return `
        <footer class="footer">
            <p>&copy; 2023 Amazon-like Store. All rights reserved.</p>
            <div class="footer-links">
                <a href="/about" data-link>About Us</a>
                <a href="/contact" data-link>Contact</a>
                <a href="#" onclick="event.preventDefault(); alert('Privacy Policy content would go here.');">Privacy Policy</a>
                <a href="#" onclick="event.preventDefault(); alert('Terms of Service content would go here.');">Terms of Service</a>
            </div>
        </footer>
    `;
}
