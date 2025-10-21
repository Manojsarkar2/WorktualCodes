const routes = {
    '/': Home,
    '/contact': Contact,
    '/features': Features,
    '/downloads': Downloads,
    '/security': Security,
    '/privacy': Privacy,
    '/faq': FAQ,
    '/blog': Blog,
    '/cart': Cart
};

function updateContent() {
    const path = window.location.hash.substring(1) || '/';
    const content = routes[path] || Home; // Default to Home if route not found
    document.getElementById('content').innerHTML = content.render();
    content.afterRender();
}

window.addEventListener('hashchange', updateContent);
window.addEventListener('load', () => {
    Navbar.render();
    Footer.render();
    updateContent();
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#navbar ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});