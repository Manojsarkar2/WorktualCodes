import { createElement } from '../utils/helpers.js';
import { Navbar } from '../components/Navbar.js';
import { HeroSection } from '../components/HeroSection.js';
import { ServicesSection } from '../components/ServicesSection.js';
import { AboutUsSection } from '../components/AboutUsSection.js';
import { DoctorsSection } from '../components/DoctorsSection.js';
import { TestimonialsSection } from '../components/TestimonialsSection.js';
import { AppointmentCTASection } from '../components/AppointmentCTASection.js';
import { Footer } from '../components/Footer.js';

export class HomeView {
    async render() {
        const fragment = document.createDocumentFragment();

        const navbar = new Navbar();
        fragment.appendChild(navbar.render());

        const heroSection = new HeroSection();
        fragment.appendChild(heroSection.render());

        const servicesSection = new ServicesSection();
        fragment.appendChild(await servicesSection.render());

        const aboutUsSection = new AboutUsSection();
        fragment.appendChild(aboutUsSection.render());

        const doctorsSection = new DoctorsSection();
        fragment.appendChild(await doctorsSection.render());

        const testimonialsSection = new TestimonialsSection();
        fragment.appendChild(await testimonialsSection.render());

        const appointmentCTASection = new AppointmentCTASection();
        fragment.appendChild(appointmentCTASection.render());

        const footer = new Footer();
        fragment.appendChild(footer.render());

        return fragment;
    }
}
