import store from '../store.js';

class ProcessSection {
    async render() {
        const processCards = store.processSteps.map((step, index) => `
            <div class="process-card">
                <div class="process-card__header">
                    <span class="process-card__number">${(index + 1).toString().padStart(2, '0')}</span>
                    <h3 class="process-card__title">${step.title}</h3>
                </div>
                <p class="process-card__description">${step.description}</p>
            </div>
        `).join('');

        return `
            <section class="process section" id="process">
                <div class="container">
                    <div class="section-header">
                        <div class="section-header__left">
                            <h2 class="section-title">Our Working Process</h2>
                            <p class="section-subtitle">Step-by-Step Guide to Achieving Your Business Goals.</p>
                        </div>
                    </div>
                    <div class="process-grid">
                        ${processCards}
                    </div>
                </div>
            </section>
        `;
    }
}

export default new ProcessSection();
