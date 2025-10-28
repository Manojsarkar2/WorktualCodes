export const getNavbarHTML = () => `
    <nav class="navbar">
        <a href="/" class="navbar-brand" data-link>The Arcane Archives</a>
        <div class="hamburger" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul class="navbar-nav">
            <li><a href="/" data-link>Home</a></li>
            <li><a href="/books" data-link>Books</a></li>
            <li><a href="/authors" data-link>Authors</a></li>
            <li><a href="/genres" data-link>Genres</a></li>
            <li><a href="/contact" data-link>Contact</a></li>
        </ul>
    </nav>
`;