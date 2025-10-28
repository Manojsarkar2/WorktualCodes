import Header from '../components/Header.js';
import HeroSection from '../components/HeroSection.js';
import ServicesSection from '../components/ServicesSection.js';
import CtaSection from '../components/CtaSection.js';
import CaseStudiesSection from '../components/CaseStudiesSection.js';
import ProcessSection from '../components/ProcessSection.js';
import TeamSection from '../components/TeamSection.js';
import TestimonialsSection from '../components/TestimonialsSection.js';
import ContactSection from '../components/ContactSection.js';
import Footer from '../components/Footer.js';

class HomePage {
    async render() {
        return `
            ${await Header.render()}
            <main>
                ${await HeroSection.render()}
                ${await ServicesSection.render()}
                ${await CtaSection.render()}
                ${await CaseStudiesSection.render()}
                ${await ProcessSection.render()}
                ${await TeamSection.render()}
                ${await TestimonialsSection.render()}
                ${await ContactSection.render()}
            </main>
            ${await Footer.render()}
        `;
    }

    async after_render() {
        if (TeamSection.after_render) await TeamSection.after_render();
        if (TestimonialsSection.after_render) await TestimonialsSection.after_render();
        if (ContactSection.after_render) await ContactSection.after_render();
    }
}

export default HomePage;
