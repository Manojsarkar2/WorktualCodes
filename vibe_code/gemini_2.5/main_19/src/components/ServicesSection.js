import { createElement } from '../utils.js';
import { FeatureCard } from './FeatureCard.js';
import { api } from '../api.js';

export const ServicesSection = async () => {
    const servicesData = await api.getServices();

    const cards = servicesData.map(service => FeatureCard({ ...service, type: 'icon-left' }));

    return createElement('section', { id: 'services', className: 'services-section section-padding' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'section-header' },
                createElement('h2', { className: 'section-title' }, 'Our Services'),
                createElement('p', { className: 'section-subtitle' }, 'We offer a comprehensive range of medical services to meet all your healthcare needs, delivered with precision and care.')
            ),
            createElement('div', { className: 'services-grid' }, ...cards)
        )
    );
};
