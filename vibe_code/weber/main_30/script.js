const cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadPage('home');

    // Navigation
    document.querySelectorAll('a[data-page]').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Hamburger menu
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    // Modal close
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal' || e.target.classList.contains('close-button')) {
            closeModal();
        }
    });

    // Initial cart count update
    updateCartCount();
});

function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
            // Attach event listeners specific to the loaded page
            if (page === 'products') {
                attachAddToCartListeners();
            } else if (page === 'cart') {
                displayCart();
            }
            if (page === 'login' || page === 'signup') {
                attachFormListeners(page);
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content').innerHTML = '<p>Error loading page.</p>';
        });
}

function attachFormListeners(page) {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            handleFormSubmit(this, page);
        });
    }
}

function handleFormSubmit(form, page) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // Mock authentication/registration
    localStorage.setItem('user', JSON.stringify(data));
    alert(`${page === 'login' ? 'Login' : 'Signup'} successful!`);
    loadPage('home'); // Redirect to home after successful login/signup
}

function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                name: this.parentNode.querySelector('h3').textContent,
                price: parseFloat(this.parentNode.querySelector('.price').textContent.replace('$', '')),
                id: this.parentNode.id // Assuming each product item has a unique ID
            };
            addToCart(product);
        });
    });
}

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function displayCart() {
    const cartContent = document.getElementById('content');
    cartContent.innerHTML = '<h2>Shopping Cart</h2>';

    if (cart.length === 0) {
        cartContent.innerHTML += '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;
    const cartList = document.createElement('ul');
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(listItem);
        total += item.price;
    });

    cartContent.appendChild(cartList);
    cartContent.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;
    cartContent.innerHTML += '<button onclick="checkout()">Checkout</button>';
}

function checkout() {
    alert('Checkout complete! Total amount: $' + cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
    cart.length = 0; // Clear the cart
    updateCartCount();
    loadPage('home');
}

function showModal(content) {
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
