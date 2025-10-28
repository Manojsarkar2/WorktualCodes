import { createElement } from '../utils.js';
import { Header } from '../components/Header.js';
import { HeroSection } from '../components/HeroSection.js';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection.js';
import { ServicesSection } from '../components/ServicesSection.js';
import { OurDoctorsSection } from '../components/OurDoctorsSection.js';
import { TestimonialsSection } from '../components/TestimonialsSection.js';
import { ContactSection } from '../components/ContactSection.js';
import { Footer } from '../components/Footer.js';

export const HomeView = () => {
    const main = createElement('main', { className: 'main-content' });

    // Async components need to be resolved and appended. 
    // For simplicity, we'll append a loading state or directly append the promise result.
    // A more robust solution would involve state management for loading states.
    
    const renderAsyncSection = async (sectionComponent, parentElement) => {
        const loadingElement = createElement('div', { className: 'loading-spinner' }, 'Loading...');
        parentElement.appendChild(loadingElement);
        try {
            const section = await sectionComponent();
            parentElement.replaceChild(section, loadingElement);
        } catch (error) {
            console.error('Failed to load section:', error);
            const errorElement = createElement('div', { className: 'error-message' }, 'Failed to load content.');
            parentElement.replaceChild(errorElement, loadingElement);
        }
    };

    const whyChooseUsContainer = createElement('div');
    renderAsyncSection(WhyChooseUsSection, whyChooseUsContainer);

    const servicesContainer = createElement('div');
    renderAsyncSection(ServicesSection, servicesContainer);

    const doctorsContainer = createElement('div');
    renderAsyncSection(OurDoctorsSection, doctorsContainer);

    const testimonialsContainer = createElement('div');
    renderAsyncSection(TestimonialsSection, testimonialsContainer);

    main.appendChild(HeroSection());
    main.appendChild(whyChooseUsContainer);
    main.appendChild(servicesContainer);
    main.appendChild(doctorsContainer);
    main.appendChild(testimonialsContainer);
    main.appendChild(ContactSection());

    return createElement('div', { className: 'home-view' },
        Header(),
        main,
        Footer()
    );
};
