export const createElement = (tag, attributes = {}, ...children) => {
    const element = document.createElement(tag);

    for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'htmlFor') {
                element.setAttribute('for', attributes[key]);
            } else if (key.startsWith('on') && typeof attributes[key] === 'function') {
                const eventName = key.substring(2).toLowerCase();
                element.addEventListener(eventName, attributes[key]);
            } else {
                element.setAttribute(key, attributes[key]);
            }
        }
    }

    children.forEach(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        } else if (Array.isArray(child)) {
            child.forEach(subChild => {
                if (typeof subChild === 'string' || typeof subChild === 'number') {
                    element.appendChild(document.createTextNode(subChild));
                } else if (subChild instanceof Node) {
                    element.appendChild(subChild);
                }
            });
        }
    });

    return element;
};

export const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    let lastResult;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            inThrottle = true;
            lastResult = func.apply(context, args);
            setTimeout(() => (inThrottle = false), limit);
        }
        return lastResult;
    };
};
