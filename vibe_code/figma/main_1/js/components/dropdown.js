export const Dropdown = ({ label, options }) => {
    return `
        <label>${label}:
            <select>
                ${options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
            </select>
        </label>
    `;
};