export const renderNavbar = () => {
    return `
        <nav class="navbar" role="navigation" aria-label="Main navigation">
            <a href="/" class="navbar-brand">MediCare Clinic</a>
            <div class="hamburger" role="button" aria-label="Toggle navigation menu" aria-expanded="false">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="nav-links">
                <li><a href="/" aria-current="page">Home</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/doctors">Doctors</a></li>
                <li><a href="/appointments">Appointments</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    `;
};
