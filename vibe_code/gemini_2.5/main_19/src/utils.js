export const createElement = (tag, attributes = {}, ...children) => {
    const element = document.createElement(tag);

    for (const key in attributes) {
        if (key.startsWith('on') && typeof attributes[key] === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, attributes[key]);
        } else if (key === 'className') {
            element.setAttribute('class', attributes[key]);
        } else if (key === 'style' && typeof attributes[key] === 'object') {
            Object.assign(element.style, attributes[key]);
        } else if (key === 'dataset' && typeof attributes[key] === 'object') {
            for (const dataKey in attributes[key]) {
                element.dataset[dataKey] = attributes[key][dataKey];
            }
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }

    children.forEach(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        } else if (Array.isArray(child)) {
            child.forEach(c => {
                if (typeof c === 'string' || typeof c === 'number') {
                    element.appendChild(document.createTextNode(c));
                } else if (c instanceof Node) {
                    element.appendChild(c);
                }
            });
        }
    });

    return element;
};

export const render = (parent, child) => {
    parent.innerHTML = ''; // Clear existing content
    parent.appendChild(child);
};

export const sanitizeHTML = (str) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};
