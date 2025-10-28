import { createElement } from '../utils/helpers.js';

export class DoctorCard {
    constructor(doctor) {
        this.doctor = doctor;
    }

    render() {
        const card = createElement('div', { class: 'doctor-card' });

        const image = createElement('img', { src: this.doctor.image, alt: `Dr. ${this.doctor.name}` });

        const infoDiv = createElement('div', { class: 'doctor-info' });
        const name = createElement('h3', {}, this.doctor.name);
        const specialization = createElement('p', {}, this.doctor.specialization);

        const socialsDiv = createElement('div', { class: 'doctor-socials' });
        this.doctor.socials.forEach(social => {
            const socialLink = createElement('a', { href: social.url, target: '_blank', rel: 'noopener noreferrer' });
            const socialIcon = createElement('img', { src: social.icon, alt: 'Social icon' });
            socialLink.appendChild(socialIcon);
            socialsDiv.appendChild(socialLink);
        });

        infoDiv.append(name, specialization, socialsDiv);
        card.append(image, infoDiv);

        return card;
    }
}
