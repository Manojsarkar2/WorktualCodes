import { createElement } from '../utils/helpers.js';

export class Button {
    constructor(options) {
        this.label = options.label || 'Button';
        this.className = options.className || 'btn btn-primary';
        this.onClick = options.onClick || (() => {});
        this.type = options.type || 'button';
        this.href = options.href || null;
        this.dataLink = options.dataLink || false;
    }

    render() {
        const buttonProps = {
            class: this.className,
            type: this.type
        };

        if (this.href) {
            buttonProps.href = this.href;
            if (this.dataLink) {
                buttonProps['data-link'] = '';
            }
            const linkElement = createElement('a', buttonProps, this.label);
            linkElement.addEventListener('click', this.onClick);
            return linkElement;
        } else {
            const buttonElement = createElement('button', buttonProps, this.label);
            buttonElement.addEventListener('click', this.onClick);
            return buttonElement;
        }
    }
}
