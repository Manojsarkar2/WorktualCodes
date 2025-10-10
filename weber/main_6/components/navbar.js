export function renderNavbar(parent) {
    parent.innerHTML = `
        <a href="#/" >Home</a>
        <a href="#/about">About</a>
        <a href="#/products">Products</a>
        <a href="#/contact">Contact</a>
        <a href="#/login">Login</a>
        <a href="#/signup">Signup</a>
    `;
}