export const renderFooter = () => {
    return `
        <footer class="footer" role="contentinfo">
            <div class="footer-content">
                <div class="footer-section about">
                    <h3>About Us</h3>
                    <p>MediCare Clinic is dedicated to providing top-tier medical care with compassion and professionalism. Your health is our utmost priority.</p>
                </div>
                <div class="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/doctors">Our Doctors</a></li>
                        <li><a href="/appointments">Book Appointment</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-section contact">
                    <h3>Contact Info</h3>
                    <p><strong>Address:</strong> 123 Health Lane, Wellness City, HC 10001</p>
                    <p><strong>Phone:</strong> <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@medicareclinic.com">info@medicareclinic.com</a></p>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; ${new Date().getFullYear()} MediCare Clinic. All rights reserved.
            </div>
        </footer>
    `;
};
