document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('.main-header');
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Smooth scrolling and client-side routing
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Add a little extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without full page reload
                history.pushState(null, '', targetId);

                // Close mobile nav if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');

    const highlightNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 30; // Adjust for header height and padding
            if (pageYOffset >= sectionTop) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });

        // Handle initial load or refresh to set active link based on URL hash
        if (!current && window.location.hash) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === window.location.hash) {
                    link.classList.add('active');
                }
            });
        } else if (!window.location.hash && !current) {
             // If no hash and not scrolled, default to home
            document.querySelector('a[href="#hero"]').classList.add('active');
        }
    };

    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink); // Call on load to set initial active state

    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Contact Form Submission (Mock)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.style.display = 'none';
            formStatus.classList.remove('success', 'error');

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
                return;
            }

            if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.add('error');
                formStatus.style.display = 'block';
                return;
            }

            // Simulate API call
            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% success rate

                if (success) {
                    formStatus.textContent = 'Thank you for your message! We will get back to you shortly.';
                    formStatus.classList.add('success');
                    form.reset(); // Clear form fields on success
                } else {
                    formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
                    formStatus.classList.add('error');
                }
                formStatus.style.display = 'block';

                // Optional: Store in localStorage (mocking session/form data)
                const formData = {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                let sentMessages = JSON.parse(localStorage.getItem('sentMessages')) || [];
                sentMessages.push(formData);
                localStorage.setItem('sentMessages', JSON.stringify(sentMessages));

            }, 1000);
        });
    }
});
