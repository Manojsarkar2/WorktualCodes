export const Button = ({ label, onClick, type = 'button', className = 'btn-primary', link = null }) => {
    if (link) {
        return `<a href="${link}" class="btn ${className}" onclick="event.preventDefault(); window.router.navigate('${link}');">${label}</a>`;
    }
    return `<button type="${type}" class="btn ${className}" onclick="${onClick || ''}">${label}</button>`;
};
