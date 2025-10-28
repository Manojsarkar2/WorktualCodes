import { createElement } from '../utils/helpers.js';
import { Button } from '../components/Button.js';
import { ServiceCard } from '../components/ServiceCard.js';
import { DoctorCard } from '../components/DoctorCard.js';
import { TestimonialCard } from '../components/TestimonialCard.js';
import * as api from '../api.js';
import { qs, qsa } from '../utils/dom.js';

export const HomeView = () => {
    const homeContainer = createElement('div', { className: 'home-view' });

    // Hero Section
    const renderHeroSection = () => {
        return createElement('section', { id: 'hero-section', className: 'hero-section section-padding' },
            createElement('div', { className: 'container flex align-center' },
                createElement('div', { className: 'hero-content' },
                    createElement('h1', {}, 'Your Health, Our Priority.'),
                    createElement('p', {}, 'We are dedicated to providing the best medical care with a focus on patient well-being and advanced treatments.'),
                    Button({ label: 'Make an Appointment', className: 'btn-primary btn-appointment' })
                ),
                createElement('div', { className: 'hero-image' },
                    createElement('img', { src: 'assets/images/hero-doctor.webp', alt: 'Doctor with patient or medical team' })
                )
            )
        );
    };

    // Services Section
    const renderServicesSection = async () => {
        const section = createElement('section', { id: 'services-section', className: 'services-section section-padding bg-accent text-center' },
            createElement('div', { className: 'container' },
                createElement('h2', {}, 'Our Services'),
                createElement('p', {}, 'We offer a comprehensive range of medical services to cater to all your health needs.'),
                createElement('div', { className: 'services-grid' })
            )
        );

        const servicesGrid = qs('.services-grid', section);
        try {
            const services = await api.getServices();
            services.forEach(service => {
                servicesGrid.appendChild(ServiceCard(service));
            });
        } catch (error) {
            console.error('Failed to load services:', error);
            servicesGrid.innerHTML = '<p>Failed to load services. Please try again later.</p>';
        }

        return section;
    };

    // About Us Section
    const renderAboutUsSection = () => {
        return createElement('section', { id: 'about-us-section', className: 'about-us-section section-padding' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'about-us-image' },
                    createElement('img', { src: 'assets/images/medical-facility.webp', alt: 'Modern medical facility interior' })
                ),
                createElement('div', { className: 'about-us-content' },
                    createElement('h2', {}, 'About Us'),
                    createElement('p', {}, 'We are a leading medical center committed to delivering exceptional healthcare services. Our team of experienced professionals ensures personalized care.'),
                    createElement('ul', {}, 
                        createElement('li', {}, 'Experienced Doctors'),
                        createElement('li', {}, 'Modern Equipment'),
                        createElement('li', {}, '24/7 Support'),
                        createElement('li', {}, 'Affordable Prices')
                    ),
                    Button({ label: 'Learn More', className: 'btn-primary' })
                )
            )
        );
    };

    // Doctors Section
    const renderDoctorsSection = async () => {
        const section = createElement('section', { id: 'doctors-section', className: 'doctors-section section-padding text-center' },
            createElement('div', { className: 'container' },
                createElement('h2', {}, 'Our Qualified Doctors'),
                createElement('p', {}, 'Meet our team of highly skilled and compassionate doctors dedicated to your health.'),
                createElement('div', { className: 'doctors-grid' })
            )
        );

        const doctorsGrid = qs('.doctors-grid', section);
        try {
            const doctors = await api.getDoctors();
            doctors.forEach(doctor => {
                doctorsGrid.appendChild(DoctorCard(doctor));
            });
        } catch (error) {
            console.error('Failed to load doctors:', error);
            doctorsGrid.innerHTML = '<p>Failed to load doctors. Please try again later.</p>';
        }

        return section;
    };

    // Testimonials Section
    const renderTestimonialsSection = async () => {
        const section = createElement('section', { id: 'testimonials-section', className: 'testimonials-section section-padding bg-accent text-center' },
            createElement('div', { className: 'container' },
                createElement('h2', {}, 'What Our Patients Say'),
                createElement('p', {}, 'Hear from our satisfied patients about their experiences with our medical services.'),
                createElement('div', { className: 'testimonials-carousel' },
                    createElement('div', { className: 'carousel-inner' }),
                    createElement('div', { className: 'carousel-dots' })
                )
            )
        );

        const carouselInner = qs('.carousel-inner', section);
        const carouselDots = qs('.carousel-dots', section);

        try {
            const testimonials = await api.getTestimonials();
            testimonials.forEach((testimonial, index) => {
                carouselInner.appendChild(TestimonialCard(testimonial));
                const dot = createElement('span', { className: 'dot', 'data-index': index });
                dot.addEventListener('click', () => showSlide(index));
                carouselDots.appendChild(dot);
            });

            let currentSlide = 0;
            const slides = qsa('.testimonial-card', carouselInner);
            const dots = qsa('.dot', carouselDots);

            const showSlide = (index) => {
                if (index >= slides.length) currentSlide = 0;
                if (index < 0) currentSlide = slides.length - 1;
                currentSlide = index;

                carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
                dots.forEach((dot, i) => {
                    if (i === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            };

            // Initial slide display
            if (slides.length > 0) {
                showSlide(0);
            }

            // Auto-advance carousel
            setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000); // Change slide every 5 seconds

        } catch (error) {
            console.error('Failed to load testimonials:', error);
            carouselInner.innerHTML = '<p>Failed to load testimonials. Please try again later.</p>';
        }

        return section;
    };

    // Call to Action Section
    const renderCallToActionSection = () => {
        return createElement('section', { id: 'cta-section', className: 'cta-section section-padding' },
            createElement('div', { className: 'container' },
                createElement('h2', {}, 'Need a Doctor for Check-up?'),
                createElement('p', {}, "Don't hesitate to contact us for an appointment. We are here to help you."),
                Button({ label: 'Make an Appointment', className: 'btn-secondary btn-appointment' })
            )
        );
    };

    // Append all sections to the home container
    homeContainer.appendChild(renderHeroSection());
    renderServicesSection().then(section => homeContainer.appendChild(section));
    homeContainer.appendChild(renderAboutUsSection());
    renderDoctorsSection().then(section => homeContainer.appendChild(section));
    renderTestimonialsSection().then(section => homeContainer.appendChild(section));
    homeContainer.appendChild(renderCallToActionSection());

    return homeContainer;
};
