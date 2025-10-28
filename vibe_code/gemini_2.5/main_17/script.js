import * as Router from './utils/router.js';
import * as Auth from './utils/auth.js';
import * as Navbar from './components/navbar.js';
import * as Footer from './components/footer.js';

// Page render functions
import { renderHomePage } from './pages/home.js';
import { renderMenuPage } from './pages/menu.js';
import { renderCartPage } from './pages/cart.js';
import { renderContactPage } from './pages/contact.js';
import { renderLoginPage } from './pages/login.js';
import { renderSignupPage } from './pages/signup.js';

const appRoot = document.getElementById('app-root');
const navbarContainer = document.getElementById('navbar-container');
const mainContent = document.getElementById('main-content');
const footerContainer = document.getElementById('footer-container');

/**
 * Renders the main application based on the current route.
 */
async function renderApp() {
    const path = Router.getRoute();
    const isAuthenticated = Auth.isAuthenticated();

    // Render Navbar
    navbarContainer.innerHTML = Navbar.renderNavbar(isAuthenticated);
    Navbar.attachNavbarEventListeners(isAuthenticated, () => {
        // Callback for auth state change in navbar (e.g., logout button click)
        renderApp(); // Re-render to update navbar and potentially redirect
    });

    // Render Footer (static for now)
    footerContainer.innerHTML = Footer.renderFooter();

    // Render Main Content based on route
    mainContent.innerHTML = ''; // Clear previous content
    switch (path) {
        case '/':
        case '/home':
            mainContent.innerHTML = renderHomePage();
            document.title = 'Gourmet Grub - Home';
            break;
        case '/menu':
            mainContent.innerHTML = await renderMenuPage();
            document.title = 'Gourmet Grub - Menu';
            break;
        case '/cart':
            mainContent.innerHTML = renderCartPage();
            document.title = 'Gourmet Grub - Your Cart';
            break;
        case '/contact':
            mainContent.innerHTML = renderContactPage();
            document.title = 'Gourmet Grub - Contact Us';
            break;
        case '/login':
            if (isAuthenticated) {
                Router.navigateTo('/home');
                return;
            }
            mainContent.innerHTML = renderLoginPage();
            document.title = 'Gourmet Grub - Login';
            break;
        case '/signup':
            if (isAuthenticated) {
                Router.navigateTo('/home');
                return;
            }
            mainContent.innerHTML = renderSignupPage();
            document.title = 'Gourmet Grub - Sign Up';
            break;
        default:
            // Basic 404 page
            mainContent.innerHTML = `
                <section class="hero-section">
                    <h1>404 - Page Not Found</h1>
                    <p>Oops! The page you are looking for does not exist.</p>
                    <div class="cta-buttons">
                        <a href="#/home" class="btn btn-primary">Go to Home</a>
                    </div>
                </section>
            `;
            document.title = 'Gourmet Grub - Not Found';
            break;
    }

    // Re-attach event listeners for the newly rendered content
    attachPageEventListeners();
}

/**
 * Attaches event listeners specific to the currently rendered page.
 * This needs to be called after new content is loaded into mainContent.
 */
function attachPageEventListeners() {
    const path = Router.getRoute();
    switch (path) {
        case '/':
        case '/home':
            // Example: Add event listeners for home page buttons
            const viewMenuBtn = mainContent.querySelector('#view-menu-btn');
            if (viewMenuBtn) {
                viewMenuBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    Router.navigateTo('/menu');
                });
            }
            break;
        case '/menu':
            // Event listeners for Add to Cart buttons on the menu page are handled within renderMenuPage itself
            // due to the dynamic nature of product loading and direct interaction with cart.js.
            // The renderMenuPage function is responsible for both rendering and attaching its specific handlers.
            break;
        case '/cart':
            // Cart item update/remove/checkout listeners are handled within renderCartPage.
            break;
        case '/contact':
            // Contact form submission listener is handled within renderContactPage.
            break;
        case '/login':
            // Login form submission listener is handled within renderLoginPage.
            break;
        case '/signup':
            // Signup form submission listener is handled within renderSignupPage.
            break;
    }

    // General navigation listeners for internal links within the main content
    mainContent.querySelectorAll('a[href^="#/"]').forEach(link => {
        link.removeEventListener('click', handleInternalNavLinkClick); // Prevent duplicate listeners
        link.addEventListener('click', handleInternalNavLinkClick);
    });
}

function handleInternalNavLinkClick(e) {
    e.preventDefault();
    const path = e.target.getAttribute('href').substring(1); // Remove '#'
    Router.navigateTo(path);
}

// Initial render and listen for route changes
document.addEventListener('DOMContentLoaded', () => {
    Router.onNavigate(renderApp);
    renderApp();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', renderApp);
