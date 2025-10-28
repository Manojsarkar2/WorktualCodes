import { renderContactForm } from '../components/forms.js';

const initAccordion = () => {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.icon');

            header.classList.toggle('active');
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
                header.setAttribute('aria-expanded', 'false');
            } else {
                content.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
};

export const renderContact = () => {
    setTimeout(initAccordion, 0); // Initialize accordion after content is rendered

    return `
        <div class="contact-page">
            <section class="page-section">
                ${renderContactForm()}
            </section>

            <section class="page-section">
                <h2>Frequently Asked Questions</h2>
                <div class="accordion-container">
                    <div class="accordion-item">
                        <div class="accordion-header" role="button" aria-expanded="false" tabindex="0">
                            <span>How do I upload a video?</span>
                            <span class="icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <p>Currently, this is a demo application and video uploads are not supported. In a real application, you would typically find an upload button in the header or sidebar after logging in.</p>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header" role="button" aria-expanded="false" tabindex="0">
                            <span>Can I create playlists?</span>
                            <span class="icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <p>Playlist creation is a planned feature for future development. For now, you can view mock playlists in your Library.</p>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header" role="button" aria-expanded="false" tabindex="0">
                            <span>Is there a mobile app?</span>
                            <span class="icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <p>This web application is designed to be fully responsive and works well on mobile browsers. There is no dedicated mobile app for this demo.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
};
