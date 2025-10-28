class CtaSection {
    async render() {
        return `
            <section class="cta section">
                <div class="container">
                    <div class="cta__content">
                        <h2 class="cta__title">Let's make things happen</h2>
                        <p class="cta__description">Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.</p>
                        <a href="#contact" class="btn btn-dark">Get your free proposal</a>
                    </div>
                    <div class="cta__image">
                        <img src="https://placehold.co/550x400/191A23/B9FF66?text=Illustration" alt="Team working">
                    </div>
                </div>
            </section>
        `;
    }
}

export default new CtaSection();
