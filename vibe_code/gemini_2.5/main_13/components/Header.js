export default function renderHeader() {
    return `
        <div class="header-left">
            <button class="hamburger-menu">&#9776;</button>
            <a href="/" class="logo" data-link>RealTime<span>Tube</span></a>
        </div>
        <div class="search-container">
            <input type="text" placeholder="Search">
            <button>&#128269;</button>
        </div>
        <div class="header-right">
            <div class="user-profile"></div>
        </div>
    `;
}