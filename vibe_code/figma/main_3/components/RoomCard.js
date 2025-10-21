export const RoomCard = ({ image, label }) => {
    return `
        <div class="room-card">
            <img src="${image}" alt="${label}">
            <span class="room-card-label">${label}</span>
        </div>
    `;
};
