class Cta {
    async render() {
        return `
            <section class="cta-section">
                <div class="container cta-container">
                    <div class="cta-content">
                        <div class="cta-header">
                            <h3>Let's make things happen</h3>
                            <p>Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.</p>
                        </div>
                        <a href="/contact" data-link class="btn btn-primary">Get your free proposal</a>
                    </div>
                    <div class="cta-image">
                        <img src="./assets/images/cta-image.png" alt="Illustration of people collaborating on a project">
                    </div>
                </div>
            </section>
        `;
    }
}
export default Cta;
