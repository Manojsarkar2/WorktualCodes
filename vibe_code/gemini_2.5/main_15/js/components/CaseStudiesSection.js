import store from '../store.js';

class CaseStudiesSection {
    async render() {
        const arrowIcon = `
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7913 5.20831L5.20801 19.7916" stroke="#B9FF66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19.7913 19.7916L19.7913 5.20831L5.20801 5.20831" stroke="#B9FF66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const caseStudiesCards = store.caseStudies.map(study => `
            <div class="case-study-card">
                <p class="case-study-card__text">${study.text}</p>
                <a href="#" class="case-study-card__link">
                    Learn more ${arrowIcon}
                </a>
            </div>
        `).join('');

        return `
            <section class="case-studies section" id="case-studies">
                <div class="container">
                    <div class="section-header">
                        <div class="section-header__left">
                            <h2 class="section-title">Case Studies</h2>
                            <p class="section-subtitle">Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies</p>
                        </div>
                    </div>
                    <div class="case-studies__grid">
                        ${caseStudiesCards}
                    </div>
                </div>
            </section>
        `;
    }
}

export default new CaseStudiesSection();
