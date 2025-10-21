// script.js

// Mock Data
const coursesData = [
    { id: 1, name: 'Web Development Fundamentals', description: 'Learn the basics of HTML, CSS, and JavaScript.', price: 49.99 },
    { id: 2, name: 'Advanced JavaScript', description: 'Dive deep into JavaScript concepts and techniques.', price: 79.99 },
    { id: 3, name: 'React for Beginners', description: 'Build interactive UIs with React.', price: 99.99 },
    { id: 4, name: 'Node.js and Express', description: 'Create server-side applications with Node.js.', price: 89.99 },
    { id: 5, name: 'Data Science with Python', description: 'Explore data analysis and machine learning with Python.', price: 119.99 }
];

let cart = [];
let isLoggedIn = false;

// DOM Elements
const contentDiv = document.getElementById('content');
const navbarDiv = document.getElementById('navbar');
const footerDiv = document.getElementById('footer');
const modalDiv = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const courseListDiv = document.getElementById('course-list');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');

// Helper Functions
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showModal(message) {
    modalMessage.textContent = message;
    modalDiv.style.display = 'block';
}

function closeModal() {
    modalDiv.style.display = 'none';
}

function updateCartDisplay() {
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
        total += item.price;
    });

    cartTotalSpan.textContent = total.toFixed(2);
}

// Event Listeners
modalDiv.addEventListener('click', closeModal);

// Form Event Listeners
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log('Contact Form Submitted:', { name, email, message });
    showModal('Thank you for your message!');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    // Mock authentication
    if (email === 'test@example.com' && password === 'password') {
        isLoggedIn = true;
        showModal('Login successful!');
        showPage('home');
    } else {
        showModal('Invalid credentials.');
    }
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    console.log('Signup Form Submitted:', { name, email, password });
    showModal('Signup successful! Please login.');
    showPage('login');
});

document.getElementById('checkout').addEventListener('click', function() {
    if (cart.length === 0) {
        showModal('Your cart is empty.');
    } else {
        showModal('Checkout successful! Thank you for your purchase.');
        cart = [];
        updateCartDisplay();
    }
});

// Component Rendering
function renderNavbar() {
    navbarDiv.innerHTML = `
        <h1>LearnSphere</h1>
        <nav>
            <a href="#home" onclick="showPage('home')">Home</a>
            <a href="#courses" onclick="showPage('courses')">Courses</a>
            <a href="#contact" onclick="showPage('contact')">Contact</a>
            <a href="#login" onclick="showPage('login')">Login</a>
            <a href="#signup" onclick="showPage('signup')">Sign Up</a>
            <a href="#cart" onclick="showPage('cart')">Cart (${cart.length})</a>
        </nav>
    `;
}

function renderFooter() {
    footerDiv.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} LearnSphere. All rights reserved.</p>
    `;
}

function renderCourses() {
    courseListDiv.innerHTML = '';
    coursesData.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-item');
        courseDiv.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <p>Price: $${course.price.toFixed(2)}</p>
            <button onclick="addToCart(${course.id})">Add to Cart</button>
        `;
        courseListDiv.appendChild(courseDiv);
    });
}

function addToCart(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        cart.push(course);
        updateCartDisplay();
        renderNavbar(); // Update cart count in navbar
        showModal(`${course.name} added to cart!`);
    }
}

// Initial Render
renderNavbar();
renderFooter();
renderCourses();
showPage('home');