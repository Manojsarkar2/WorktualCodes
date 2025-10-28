export function createElement(tag, attributes = {}, ...children) {
    const element = document.createElement(tag);

    for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            element.setAttribute(key, attributes[key]);
        }
    }

    children.forEach(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        } else if (child !== null && typeof child !== 'undefined') {
            console.warn('Attempted to append non-Node, non-string, non-number child:', child);
        }
    });

    return element;
}

// Debounce function (example utility, not strictly needed for this project but good for real apps)
export function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}
