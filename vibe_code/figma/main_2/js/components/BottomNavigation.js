const BottomNavigation = () => {
    return `
        <div class="bottom-navigation">
            <button onclick="navigateTo('/')"><img src="assets/home.svg" alt="Home">Home</button>
            <button onclick="navigateTo('/categories')"><img src="assets/categories.svg" alt="Categories">Categories</button>
            <button onclick="navigateTo('/notifications')"><img src="assets/notifications.svg" alt="Notifications">Notifications</button>
            <button onclick="navigateTo('/account')"><img src="assets/account.svg" alt="Account">Account</button>
        </div>
    `;
};

export default BottomNavigation;