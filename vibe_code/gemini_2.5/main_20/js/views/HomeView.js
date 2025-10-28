import { $ } from '../utils/dom.js';
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { ServiceCard } from '../components/ServiceCard.js';
import { CaseStudyCard } from '../components/CaseStudyCard.js';
import { TestimonialCard } from '../components/TestimonialCard.js';
import { TeamMemberCard } from '../components/TeamMemberCard.js';
import { Accordion } from '../components/Accordion.js';
import { fetchServices, fetchCaseStudies, fetchTestimonials, fetchTeam, fetchFaq, submitContactForm } from '../api/mockApi.js';
import { store } from '../store.js';

export const HomeView = async () => {
    const page = $.create('div', { class: 'home-page' });

    // Append Header
    page.appendChild(Header());

    // Main content area
    const main = $.create('main');

    // 1. Hero Section
    const heroSection = $.create('section', { id: 'hero', class: 'hero-section' });
    heroSection.innerHTML = `
        <div class="hero-content container">
            <div class="hero-text-content">
                <h1>Navigating the digital landscape for success</h1>
                <p class="text-large">Our agency uses a data-driven approach to help businesses achieve their online goals and grow their brand.</p>
                <a href="#contact" data-nav-link class="button button-primary">Book a consultation</a>
            </div>
            <div class="hero-image-container">
                <img src="assets/images/hero-main.png" alt="People working on digital marketing" class="hero-image">
            </div>
        </div>
        <div class="hero-line-decoration"></div>
    `;
    main.appendChild(heroSection);

    // 2. Client Logos (Implicit from Figma - usually below hero)
    const clientsSection = $.create('section', { class: 'section-padding' });
    clientsSection.innerHTML = `
        <div class="container">
            <div class="flex-group" style="justify-content: space-around; flex-wrap: wrap; gap: var(--spacing-lg);">
                <img src="assets/images/client-logo-1.png" alt="Client Logo 1" style="height: 30px;">
                <img src="assets/images/client-logo-2.png" alt="Client Logo 2" style="height: 30px;">
                <img src="assets/images/client-logo-3.png" alt="Client Logo 3" style="height: 30px;">
                <img src="assets/images/client-logo-4.png" alt="Client Logo 4" style="height: 30px;">
                <img src="assets/images/client-logo-5.png" alt="Client Logo 5" style="height: 30px;">
            </div>
        </div>
    `;
    main.appendChild(clientsSection);

    // 3. Services Section
    const servicesSection = $.create('section', { id: 'services', class: 'services-section section-padding' });
    const servicesContainer = $.create('div', { class: 'container' });
    servicesContainer.innerHTML = `
        <h2 class="section-title">Services</h2>
        <div class="services-grid"></div>
        <div class="services-decoration-line"></div>
    `;
    const servicesGrid = servicesContainer.querySelector('.services-grid');

    const services = await fetchServices();
    services.forEach(service => {
        servicesGrid.appendChild(ServiceCard(service));
    });

    servicesSection.appendChild(servicesContainer);
    main.appendChild(servicesSection);

    // 4. Why Us Section
    const whyUsSection = $.create('section', { id: 'about-us', class: 'why-us-section' });
    const whyUsContent = $.create('div', { class: 'why-us-content container' });
    whyUsContent.innerHTML = `
        <div class="why-us-text-content">
            <h2>Why Us</h2>
            <p>Our agency stands out with a unique blend of creativity, data-driven strategies, and a client-centric approach that ensures tailored solutions for your business success.</p>
            <ul class="why-us-list" role="list">
                <li class="why-us-list-item">
                    <img src="assets/images/star.svg" alt="star icon" class="icon">
                    <div>
                        <h4>Experienced Team</h4>
                        <p>Our team consists of seasoned professionals with years of experience in the digital marketing industry.</p>
                    </div>
                </li>
                <li class="why-us-list-item">
                    <img src="assets/images/star.svg" alt="star icon" class="icon">
                    <div>
                        <h4>Tailored Strategies</h4>
                        <p>We believe in custom solutions, not one-size-fits-all approaches, ensuring your unique needs are met.</p>
                    </div>
                </li>
                <li class="why-us-list-item">
                    <img src="assets/images/star.svg" alt="star icon" class="icon">
                    <div>
                        <h4>Proven Results</h4>
                        <p>Our track record speaks for itself, with a history of delivering measurable success for our clients.</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="why-us-illustration">
            <img src="assets/images/why-us-illustration.svg" alt="Why Choose Us illustration">
        </div>
    `;
    whyUsSection.appendChild(whyUsContent);
    main.appendChild(whyUsSection);

    // 5. Case Studies Section
    const caseStudiesSection = $.create('section', { id: 'use-cases', class: 'case-studies-section section-padding' });
    const caseStudiesContainer = $.create('div', { class: 'container' });
    caseStudiesContainer.innerHTML = `
        <h2 class="section-title">Case Studies</h2>
        <div class="case-studies-grid"></div>
    `;
    const caseStudiesGrid = caseStudiesContainer.querySelector('.case-studies-grid');

    const caseStudies = await fetchCaseStudies();
    caseStudies.forEach(study => {
        caseStudiesGrid.appendChild(CaseStudyCard(study));
    });
    caseStudiesSection.appendChild(caseStudiesContainer);
    main.appendChild(caseStudiesSection);

    // 6. Testimonials Section
    const testimonialsSection = $.create('section', { id: 'testimonials', class: 'testimonials-section section-padding' });
    const testimonialsContainer = $.create('div', { class: 'container' });
    testimonialsContainer.innerHTML = `
        <h2 class="section-title">Testimonials</h2>
        <div class="testimonials-grid"></div>
    `;
    const testimonialsGrid = testimonialsContainer.querySelector('.testimonials-grid');

    const testimonials = await fetchTestimonials();
    testimonials.forEach(testimonial => {
        testimonialsGrid.appendChild(TestimonialCard(testimonial));
    });
    testimonialsSection.appendChild(testimonialsContainer);
    main.appendChild(testimonialsSection);

    // 7. Our Team Section
    const teamSection = $.create('section', { id: 'team', class: 'team-section section-padding' });
    const teamContainer = $.create('div', { class: 'container' });
    teamContainer.innerHTML = `
        <h2 class="section-title">Our Team</h2>
        <p class="text-large text-center" style="max-width: 800px; margin: 0 auto var(--spacing-xxl) auto; color: var(--color-text-grey);">Meet the dedicated professionals behind Positivus, each bringing unique expertise to drive your digital success.</p>
        <div class="team-grid"></div>
    `;
    const teamGrid = teamContainer.querySelector('.team-grid');

    const teamMembers = await fetchTeam();
    teamMembers.forEach(member => {
        teamGrid.appendChild(TeamMemberCard(member));
    });
    teamSection.appendChild(teamContainer);
    main.appendChild(teamSection);

    // 8. FAQ Section
    const faqSection = $.create('section', { id: 'faq', class: 'faq-section section-padding' });
    const faqContent = $.create('div', { class: 'faq-content container' });
    faqContent.innerHTML = `
        <div class="faq-text-content">
            <h2>Frequently Asked Questions</h2>
            <p class="text-large">Everything you need to know about our services and how we can help you.</p>
            <a href="#contact" data-nav-link class="button button-primary">Ask a question</a>
        </div>
        <div class="accordion-container"></div>
    `;
    const accordionContainer = faqContent.querySelector('.accordion-container');

    const faqItems = await fetchFaq();
    faqItems.forEach(item => {
        accordionContainer.appendChild(Accordion(item));
    });
    faqSection.appendChild(faqContent);
    main.appendChild(faqSection);

    // 9. Contact Us Section
    const contactSection = $.create('section', { id: 'contact', class: 'contact-section' });
    const contactContent = $.create('div', { class: 'contact-content container' });
    contactContent.innerHTML = `
        <div class="contact-text-content">
            <h2>Let's Make Things Happen</h2>
            <p class="text-large">Contact us today to schedule a consultation and take the first step towards achieving your business goals.</p>
            <p class="text-small">We're eager to hear from you and explore how our expertise can drive your success.</p>
        </div>
        <div class="contact-form-container">
            <h3>Get in touch!</h3>
            <form class="contact-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your email address" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" placeholder="Your message" required></textarea>
                </div>
                <button type="submit" class="form-submit-button">Submit</button>
                <p class="form-message text-small" id="contact-form-message"></p>
            </form>
        </div>
    `;

    const contactForm = contactContent.querySelector('.contact-form');
    const contactFormMessageEl = contactContent.querySelector('#contact-form-message');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Simple client-side validation
        if (!data.name || !data.email || !data.message) {
            contactFormMessageEl.textContent = 'Please fill in all fields.';
            contactFormMessageEl.className = 'form-message text-small error';
            return;
        }

        store.setState({ contactFormStatus: 'submitting' });
        contactFormMessageEl.textContent = 'Sending message...';
        contactFormMessageEl.className = 'form-message text-small';

        try {
            await submitContactForm(data);
            contactFormMessageEl.textContent = 'Your message has been sent successfully!';
            contactFormMessageEl.className = 'form-message text-small success';
            e.target.reset(); // Clear form
        } catch (error) {
            contactFormMessageEl.textContent = 'Failed to send message. Please try again.';
            contactFormMessageEl.className = 'form-message text-small error';
        } finally {
            store.setState({ contactFormStatus: null });
        }
    });

    contactSection.appendChild(contactContent);
    main.appendChild(contactSection);

    page.appendChild(main);

    // Append Footer
    page.appendChild(Footer());

    return page;
};
