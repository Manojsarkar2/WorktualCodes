document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const modal = document.getElementById('modal');
    const closeModalButton = document.querySelector('.close-button');
    const modalText = document.getElementById('modal-text');

    // Load initial content (Home page)
    loadContent('home.html');

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page + '.html');
        });
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navLinksList.classList.toggle('show');
    });

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Modal functions
    function showModal(text) {
        modalText.textContent = text;
        modal.style.display = 'block';
    }

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form Handling (Example for Contact Form)
    if (document.location.pathname.includes('contact.html')) {
        const contactForm = document.querySelector('form');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = contactForm.querySelector('#name').value;
                const email = contactForm.querySelector('#email').value;
                const message = contactForm.querySelector('#message').value;

                // Basic validation
                if (!name || !email || !message) {
                    showModal('Please fill in all fields.');
                    return;
                }

                // Store data (mock)
                const contactData = {
                    name: name,
                    email: email,
                    message: message
                };
                localStorage.setItem('contactData', JSON.stringify(contactData));

                showModal('Message sent successfully!');
                contactForm.reset();
            });
        }
    }

    // Load Content Function
    function loadContent(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;

                // Re-attach event listeners for forms if needed
                if (page === 'contact.html') {
                    const contactForm = document.querySelector('form');
                    if (contactForm) {
                        contactForm.addEventListener('submit', (event) => {
                            event.preventDefault();
                            const name = contactForm.querySelector('#name').value;
                            const email = contactForm.querySelector('#email').value;
                            const message = contactForm.querySelector('#message').value;

                            // Basic validation
                            if (!name || !email || !message) {
                                showModal('Please fill in all fields.');
                                return;
                            }

                            // Store data (mock)
                            const contactData = {
                                name: name,
                                email: email,
                                message: message
                            };
                            localStorage.setItem('contactData', JSON.stringify(contactData));

                            showModal('Message sent successfully!');
                            contactForm.reset();
                        });
                    }
                }
            })
            .catch(error => {
                contentDiv.innerHTML = `<p>Error loading content: ${error}</p>`;
                console.error('Error loading content:', error);
            });
    }
});