import { products as allProducts } from './data/products.js';
import { Home } from './views/Home.js';
import { Products } from './views/Products.js';
import { Cart } from './views/Cart.js';
import { Contact } from './views/Contact.js';

const appState = {
  currentPage: 1,
  itemsPerPage: 6,
  filter: '',
  cart: JSON.parse(localStorage.getItem('flipshop_cart')) || {},
};

const appRoot = document.getElementById('app-root');

const routes = {
  '#home': Home,
  '#products': () => Products(allProducts, appState),
  '#cart': () => Cart(appState.cart, allProducts),
  '#contact': Contact,
};

const renderView = (viewHtml) => {
  appRoot.innerHTML = viewHtml;
  attachEventListenersForView();
};

const router = () => {
  const path = window.location.hash || '#home';
  const viewFunction = routes[path] || routes['#home'];
  renderView(viewFunction());
  updateActiveNavLink(path);
};

const updateActiveNavLink = (path) => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === path);
  });
};

const updateCartBadge = () => {
  const cartBadge = document.getElementById('cart-badge');
  const totalItems = Object.values(appState.cart).reduce((sum, quantity) => sum + quantity, 0);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
};

const saveCartToLocalStorage = () => {
  localStorage.setItem('flipshop_cart', JSON.stringify(appState.cart));
};

const handleAddToCart = (productId) => {
  appState.cart[productId] = (appState.cart[productId] || 0) + 1;
  saveCartToLocalStorage();
  updateCartBadge();
  showToast(`Added to cart!`);
};

const handleUpdateQuantity = (productId, change) => {
  if (appState.cart[productId]) {
    appState.cart[productId] += change;
    if (appState.cart[productId] <= 0) {
      delete appState.cart[productId];
    }
    saveCartToLocalStorage();
    updateCartBadge();
    router(); // Re-render the cart view
  }
};

const handleRemoveFromCart = (productId) => {
  delete appState.cart[productId];
  saveCartToLocalStorage();
  updateCartBadge();
  router(); // Re-render the cart view
};

const handleSearch = () => {
    const searchInput = document.getElementById('search-input');
    appState.filter = searchInput.value.trim();
    appState.currentPage = 1;
    window.location.hash = '#products';
    // If already on products page, just re-render
    if (window.location.hash === '#products') {
        router();
    }
};

const handleContactFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    
    // Basic validation
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    [name, email, message].forEach(input => {
        const errorDiv = input.nextElementSibling;
        if (input.value.trim() === '') {
            isValid = false;
            errorDiv.textContent = `${input.name} is required.`;
        } else {
            errorDiv.textContent = '';
        }
    });

    if (isValid) {
        console.log('Form submitted:', { name: name.value, email: email.value, message: message.value });
        form.style.display = 'none';
        document.getElementById('form-success-message').style.display = 'block';
    }
};

const showToast = (message) => {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function attachEventListenersForView() {
    // Product page listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.onclick = (e) => handleAddToCart(e.target.dataset.productId);
    });
    document.querySelectorAll('.pagination-btn').forEach(button => {
        button.onclick = (e) => {
            appState.currentPage = parseInt(e.target.dataset.page);
            router();
        };
    });

    // Cart page listeners
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.onclick = (e) => handleUpdateQuantity(e.target.dataset.productId, 1);
    });
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.onclick = (e) => handleUpdateQuantity(e.target.dataset.productId, -1);
    });
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.onclick = (e) => handleRemoveFromCart(e.target.dataset.productId);
    });
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = () => alert('Checkout functionality is not implemented in this demo.');
    }

    // Contact page listener
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = handleContactFormSubmit;
    }
}

// Global event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }));

  // Search functionality
  document.getElementById('search-btn').addEventListener('click', handleSearch);
  document.getElementById('search-input').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleSearch();
  });

  // Initial setup
  window.addEventListener('hashchange', router);
  router(); // Initial page load
  updateCartBadge();
});