import { createElement } from '../utils.js';
import { Button } from './Button.js';
import { router } from '../router.js';

export const HeroSection = () => {
    const handleBookAppointmentClick = (e) => {
        e.preventDefault();
        router.handleHashScroll('#contact'); // Scroll to contact section
    };

    const handleLearnMoreClick = (e) => {
        e.preventDefault();
        router.handleHashScroll('#about'); // Scroll to about section
    };

    return createElement('section', { id: 'hero', className: 'hero-section' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'hero-content' },
                createElement('h1', {}, 'We Are Always Here For Your Medical Care'),
                createElement('p', {}, 'MedCare is dedicated to providing exceptional healthcare services with a focus on patient well-being and advanced medical treatments. Your health is our priority.'),
                createElement('div', { className: 'hero-buttons' },
                    Button({
                        text: 'Book an Appointment',
                        type: 'primary',
                        onClick: handleBookAppointmentClick
                    }),
                    Button({
                        text: 'Learn More',
                        type: 'secondary',
                        onClick: handleLearnMoreClick
                    })
                )
            ),
            createElement('div', { className: 'hero-image' },
                createElement('img', { src: 'src/assets/img/hero.jpg', alt: 'Doctor with patient' })
            )
        )
    );
};
