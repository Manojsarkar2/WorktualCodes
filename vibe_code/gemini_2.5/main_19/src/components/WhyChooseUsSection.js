import { createElement } from '../utils.js';
import { FeatureCard } from './FeatureCard.js';
import { api } from '../api.js';

export const WhyChooseUsSection = async () => {
    const whyChooseUsData = await api.getWhyChooseUs();

    const cards = whyChooseUsData.map(item => FeatureCard({ ...item, type: 'icon-top' }));

    return createElement('section', { id: 'about', className: 'why-choose-us-section section-padding' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'section-header' },
                createElement('h2', { className: 'section-title' }, 'Why Choose Us'),
                createElement('p', { className: 'section-subtitle' }, 'Discover the reasons why MedCare is your best choice for health and wellness. We combine expertise, modern facilities, and compassionate care.')
            ),
            createElement('div', { className: 'feature-grid' }, ...cards)
        )
    );
};
