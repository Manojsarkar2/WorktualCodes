export default function renderSidebar() {
    return `
        <nav class="sidebar-nav">
            <ul>
                <li><a href="/" data-link><span>Home</span></a></li>
                <li><a href="/trending" data-link><span>Trending</span></a></li>
                <li><a href="/subscriptions" data-link><span>Subscriptions</span></a></li>
            </ul>
            <hr style="margin: 16px 0; border-color: var(--border-color);">
            <ul>
                <li><a href="/contact" data-link><span>Contact</span></a></li>
            </ul>
        </nav>
    `;
}