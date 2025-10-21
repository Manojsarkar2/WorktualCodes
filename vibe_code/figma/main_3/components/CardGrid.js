export const CardGrid = ({ children, columns = 4 }) => {
    return `
        <div class="card-grid grid-cols-${columns}">
            ${children.join('')}
        </div>
    `;
};
