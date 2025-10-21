import { Header, updateActiveNav } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { Button } from '../components/Button.js';
import { InputField } from '../components/InputField.js';

export const ContactView = {
    render: (container) => {
        updateActiveNav('/contact');
        container.innerHTML = `
            ${Header()}
            <main class="container section-padding">
                <h1 class="text-center">Contact Us</h1>
                <p class="text-center" style="margin-bottom: var(--spacing-xl);">We'd love to hear from you! Reach out with any questions or feedback.</p>
                <div style="max-width: 600px; margin: 0 auto; padding: var(--spacing-lg); border: 1px solid #eee; border-radius: var(--border-radius-md); background-color: var(--color-background);">
                    <form onsubmit="event.preventDefault(); alert('Message sent! We will get back to you shortly.'); this.reset();">
                        <div style="margin-bottom: var(--spacing-md);">
                            <label for="name" style="display: block; margin-bottom: var(--spacing-xs); font-weight: var(--font-weight-medium);">Name</label>
                            ${InputField({ type: 'text', placeholder: 'Your Name', name: 'name', className: 'full-width' })}
                        </div>
                        <div style="margin-bottom: var(--spacing-md);">
                            <label for="email" style="display: block; margin-bottom: var(--spacing-xs); font-weight: var(--font-weight-medium);">Email</label>
                            ${InputField({ type: 'email', placeholder: 'Your Email', name: 'email', className: 'full-width' })}
                        </div>
                        <div style="margin-bottom: var(--spacing-lg);">
                            <label for="message" style="display: block; margin-bottom: var(--spacing-xs); font-weight: var(--font-weight-medium);">Message</label>
                            <textarea id="message" name="message" rows="6" placeholder="Your Message" class="input-field full-width" style="width: 100%; resize: vertical;"></textarea>
                        </div>
                        ${Button({ label: 'Send Message', type: 'submit', className: 'btn-primary' })}
                    </form>
                </div>
            </main>
            ${Footer()}
        `;
    }
};
