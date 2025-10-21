export class Modal {
    constructor(rootId) {
        this.root = document.getElementById(rootId);
        if (!this.root) {
            console.error(`Modal root element with ID '${rootId}' not found.`);
            return;
        }
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-modal', 'true');
        this.overlay.setAttribute('aria-hidden', 'true');

        this.contentWrapper = document.createElement('div');
        this.contentWrapper.className = 'modal-content';
        this.contentWrapper.setAttribute('tabindex', '-1');

        this.closeButton = document.createElement('button');
        this.closeButton.className = 'modal-close-button';
        this.closeButton.innerHTML = '&times;';
        this.closeButton.setAttribute('aria-label', 'Close modal');
        this.closeButton.addEventListener('click', () => this.close());

        this.overlay.appendChild(this.contentWrapper);
        this.root.appendChild(this.overlay);

        this.boundKeyHandler = this.handleKeyDown.bind(this);
        this.boundOverlayClickHandler = this.handleOverlayClick.bind(this);
    }

    open(title, contentElement) {
        if (!this.root) return;

        this.contentWrapper.innerHTML = ''; // Clear previous content

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        titleElement.id = 'modal-title';
        this.contentWrapper.setAttribute('aria-labelledby', 'modal-title');

        this.contentWrapper.appendChild(this.closeButton);
        this.contentWrapper.appendChild(titleElement);
        this.contentWrapper.appendChild(contentElement);

        this.overlay.classList.add('active');
        this.overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent scrolling body
        this.contentWrapper.focus(); // Focus on modal content for accessibility

        document.addEventListener('keydown', this.boundKeyHandler);
        this.overlay.addEventListener('click', this.boundOverlayClickHandler);
    }

    close() {
        if (!this.root) return;

        this.overlay.classList.remove('active');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore body scrolling

        document.removeEventListener('keydown', this.boundKeyHandler);
        this.overlay.removeEventListener('click', this.boundOverlayClickHandler);
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.close();
        }
        // Optional: Trap focus within the modal for better accessibility
        if (event.key === 'Tab') {
            const focusableElements = this.contentWrapper.querySelectorAll(
                'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusable || document.activeElement === this.contentWrapper) {
                    lastFocusable.focus();
                    event.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    event.preventDefault();
                }
            }
        }
    }

    handleOverlayClick(event) {
        if (event.target === this.overlay) {
            this.close();
        }
    }
}
