import { createElement } from '../utils.js';
import { DoctorCard } from './DoctorCard.js';
import { api } from '../api.js';

export const OurDoctorsSection = async () => {
    const doctorsData = await api.getDoctors();

    const doctorCards = doctorsData.map(doctor => DoctorCard(doctor));

    return createElement('section', { id: 'doctors', className: 'our-doctors-section section-padding' },
        createElement('div', { className: 'container' },
            createElement('div', { className: 'section-header' },
                createElement('h2', { className: 'section-title' }, 'Our Qualified Doctors'),
                createElement('p', { className: 'section-subtitle' }, 'Meet our team of dedicated and experienced medical professionals, committed to providing you with the best care.')
            ),
            createElement('div', { className: 'doctors-grid' }, ...doctorCards)
        )
    );
};
