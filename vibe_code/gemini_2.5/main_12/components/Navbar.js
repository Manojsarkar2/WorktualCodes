export function render() {
    return `
        <nav class="main-nav">
            <div class="nav-logo">
                <a href="#/">Shop<span>Sphere</span></a>
            </div>
            <ul class="nav-links">
                <li><a href="#/">Home</a></li>
                <li><a href="#/products">Products</a></li>
                <li><a href="#/contact">Contact</a></li>
            </ul>
            <div class="nav-actions">
                <a href="#/cart" class="nav-cart">
                    <span>🛒</span>
                    <span class="cart-count">0</span>
                </a>
            </div>
            <div class="hamburger">&#9776;</div>
        </nav>
    `;
}