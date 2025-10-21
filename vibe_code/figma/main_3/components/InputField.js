export const InputField = ({ type = 'text', placeholder = '', name = '', value = '', className = '' }) => {
    return `
        <input type="${type}" placeholder="${placeholder}" name="${name}" value="${value}" class="input-field ${className}">
    `;
};
