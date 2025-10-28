export function render() {
    const year = new Date().getFullYear();
    return `
        <div class="footer-content">
            <p>&copy; ${year} ShopSphere. All rights reserved.</p>
            <p>A Vanilla JS project inspired by Amazon.</p>
        </div>
    `;
}