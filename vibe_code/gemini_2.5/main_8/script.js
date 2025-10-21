document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('.nav-link, .logo, .nav-btn');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    // --- Page Content Definitions ---
    const getHomePageContent = () => `
        <section class="hero-section">
            <div class="container hero-content">
                <div class="hero-text">
                    <h1>Unlock the Power of AI with Our Solutions</h1>
                    <p>Leverage cutting-edge artificial intelligence to transform your business operations and drive innovation, delivering unparalleled efficiency and growth.</p>
                    <div class="hero-buttons">
                        <a href="/features" class="btn btn-primary" data-route="/features">Learn More</a>
                        <a href="/contact" class="btn btn-secondary" data-route="/contact">Get Started</a>
                    </div>
                </div>
                <div class="hero-image">AI Insights</div>
            </div>
        </section>
        <section class="features-section">
            <div class="container">
                <h2>Why Choose Us?</h2>
                <p class="subtitle">Experience the difference with our unparalleled AI expertise and innovative solutions designed for your success.</p>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3>Advanced Analytics</h3>
                        <p>Gain deeper insights with our powerful data analysis tools, turning raw data into actionable intelligence.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🤖</div>
                        <h3>Intelligent Automation</h3>
                        <p>Automate repetitive tasks and streamline workflows efficiently, freeing up your team for strategic initiatives.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📈</div>
                        <h3>Scalable Solutions</h3>
                        <p>Our AI solutions grow seamlessly with your business, adapting to your evolving needs and future challenges.</p>
                    </div>
                </div>
            </div>
        </section>
    `;

    const getFeaturesPageContent = () => `
        <section class="features-section about-section">
            <div class="container">
                <h2>Our Core Features</h2>
                <p>Discover the comprehensive capabilities that make our AI solutions stand out. We empower businesses with tools for intelligent decision-making and operational excellence.</p>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🧠</div>
                        <h3>Machine Learning Models</h3>
                        <p>Utilize state-of-the-art ML models for predictive analysis, pattern recognition, and data-driven forecasting.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">☁️</div>
                        <h3>Cloud Integration</h3>
                        <p>Seamlessly integrate our AI solutions with your existing cloud infrastructure for flexible and robust performance.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔒</div>
                        <h3>Data Security</h3>
                        <p>Ensure the highest level of data protection and privacy with our advanced security protocols and compliance measures.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">⚡</div>
                        <h3>Real-time Processing</h3>
                        <p>Process and analyze data in real-time, enabling immediate insights and rapid response to market changes.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🛠️</div>
                        <h3>Customizable Dashboards</h3>
                        <p>Tailor your data visualization and reporting with fully customizable dashboards that fit your specific needs.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🤝</div>
                        <h3>Dedicated Support</h3>
                        <p>Benefit from our expert support team, available to assist you at every step of your AI journey.</p>
                    </div>
                </div>
            </div>
        </section>
    `;

    const getAboutPageContent = () => `
        <section class="about-section">
            <div class="container">
                <h2>About AI Solutions Pro</h2>
                <p>At AI Solutions Pro, we are passionate about harnessing the transformative power of Artificial Intelligence to drive business growth and innovation. Founded on the principles of excellence and client success, our team of dedicated AI specialists, data scientists, and engineers works tirelessly to deliver bespoke solutions that address the unique challenges of modern enterprises.</p>
                <p>Our mission is to empower organizations across industries by providing cutting-edge AI technologies that optimize operations, enhance decision-making, and unlock new opportunities. We believe in a collaborative approach, working closely with our clients to understand their vision and translate it into tangible, impactful AI-driven results.</p>
                <p>Join us on a journey to redefine what's possible with AI.</p>
            </div>
        </section>
    `;

    const getContactPageContent = () => `
        <section class="contact-section">
            <div class="container">
                <h2>Get in Touch</h2>
                <p>Have questions or ready to start your AI transformation? Fill out the form below, and our team will get back to you shortly.</p>
                <form class="contact-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        </section>
    `;

    const routes = {
        '/': getHomePageContent,
        '/features': getFeaturesPageContent,
        '/about': getAboutPageContent,
        '/contact': getContactPageContent
    };

    // --- Routing Logic ---
    const renderContent = (path) => {
        const contentFunction = routes[path] || routes['/']; // Default to home if route not found
        appContent.innerHTML = contentFunction();
        updateActiveNav(path);
        window.scrollTo(0, 0); // Scroll to top on route change
    };

    const navigate = (event) => {
        event.preventDefault();
        const targetPath = event.target.dataset.route || event.target.closest('[data-route]').dataset.route;
        if (targetPath && window.location.pathname !== targetPath) {
            window.history.pushState({}, '', targetPath);
            renderContent(targetPath);
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        }
    };

    const updateActiveNav = (currentPath) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.dataset.route;
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    };

    // --- Event Listeners ---
    navLinks.forEach(link => link.addEventListener('click', navigate));
    window.addEventListener('popstate', () => renderContent(window.location.pathname));

    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Initial render
    renderContent(window.location.pathname);
});
