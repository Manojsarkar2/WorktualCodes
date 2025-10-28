import Header from '../components/Header.js';
import Hero from '../components/Hero.js';
import Services from '../components/Services.js';
import Cta from '../components/Cta.js';
import CaseStudies from '../components/CaseStudies.js';
import Team from '../components/Team.js';
import Contact from '../components/Contact.js';
import Footer from '../components/Footer.js';

class HomePage {
    async render() {
        const header = new Header();
        const hero = new Hero();
        const services = new Services();
        const cta = new Cta();
        const caseStudies = new CaseStudies();
        const team = new Team();
        const contact = new Contact();
        const footer = new Footer();

        return `
            ${await header.render()}
            <main>
                ${await hero.render()}
                ${await services.render()}
                ${await cta.render()}
                ${await caseStudies.render()}
                ${await team.render()}
                ${await contact.render()}
            </main>
            ${await footer.render()}
        `;
    }

    async after_render() {
        new Header().after_render();
        new Contact().after_render();
    }
}

export default HomePage;
