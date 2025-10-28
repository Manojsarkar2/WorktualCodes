import { getTestimonials } from '../data/mockData.js';

export const renderHomePage = () => {
    const testimonials = getTestimonials();

    return `
        <section class="hero">
            <h1>Your Health, Our Priority</h1>
            <p>Providing compassionate and cutting-edge medical care for a healthier you. Trust MediCare Clinic for all your healthcare needs.</p>
            <a href="/appointments" class="btn-primary" role="button">Book an Appointment</a>
        </section>

        <section class="section about-us">
            <h2>About Our Clinic</h2>
            <div class="grid-container">
                <div class="grid-item">
                    <h3>Experienced Professionals</h3>
                    <p>Our team comprises highly qualified and compassionate doctors, nurses, and staff dedicated to your well-being.</p>
                </div>
                <div class="grid-item">
                    <h3>State-of-the-Art Facilities</h3>
                    <p>Equipped with modern technology and advanced medical equipment to ensure accurate diagnoses and effective treatments.</p>
                </div>
                <div class="grid-item">
                    <h3>Patient-Centered Care</h3>
                    <p>We believe in personalized care, listening to your concerns, and involving you in every step of your health journey.</p>
                </div>
            </div>
        </section>

        <section class="section services-preview">
            <h2>Our Key Services</h2>
            <div class="grid-container">
                <div class="grid-item">
                    <h3>General Consultations</h3>
                    <p>Comprehensive check-ups, preventive care, and management of common illnesses.</p>
                </div>
                <div class="grid-item">
                    <h3>Specialist Referrals</h3>
                    <p>Access to a network of top specialists for advanced medical conditions.</p>
                </div>
                <div class="grid-item">
                    <h3>Diagnostic Imaging</h3>
                    <p>On-site X-ray, Ultrasound, and other diagnostic services for quick results.</p>
                </div>
                <div class="grid-item">
                    <h3>Vaccinations</h3>
                    <p>Stay protected with our wide range of adult and pediatric vaccination programs.</p>
                </div>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <a href="/services" class="btn-primary" role="button" style="background-color: var(--secondary-color);">View All Services</a>
            </div>
        </section>

        <section class="section testimonials">
            <h2>What Our Patients Say</h2>
            <div class="carousel-container">
                <div class="carousel-slides">
                    ${testimonials.map(t => `
                        <div class="carousel-slide">
                            <p>"${t.quote}"</p>
                            <p class="author">- ${t.author}, ${t.city}</p>
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-nav-btn prev" aria-label="Previous testimonial">&#10094;</button>
                <button class="carousel-nav-btn next" aria-label="Next testimonial">&#10095;</button>
            </div>
        </section>
    `;
};
