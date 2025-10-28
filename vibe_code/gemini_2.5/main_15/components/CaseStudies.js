class CaseStudies {
    async render() {
        const arrowIcon = `<img src="./assets/images/arrow-right-green.svg" alt="Learn more">`;
        return `
            <section class="case-studies-section" id="use-cases">
                <div class="container">
                    <div class="section-header">
                        <h2>Case Studies</h2>
                        <p>Explore how we've helped our clients achieve their marketing goals and drive real results.</p>
                    </div>
                    <div class="case-studies-grid">
                        <div class="case-study-card">
                            <p>For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.</p>
                            <a href="/use-cases" data-link class="learn-more-link">Learn more ${arrowIcon}</a>
                        </div>
                        <div class="case-study-card">
                            <p>For a B2B software company, we developed an SEO strategy that resulted in a 200% increase in organic traffic and a 150% increase in leads.</p>
                            <a href="/use-cases" data-link class="learn-more-link">Learn more ${arrowIcon}</a>
                        </div>
                        <div class="case-study-card">
                            <p>For a national retail chain, we created a social media marketing campaign that increased brand awareness by 40% and drove a 20% increase in in-store sales.</p>
                            <a href="/use-cases" data-link class="learn-more-link">Learn more ${arrowIcon}</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
export default CaseStudies;
