document.addEventListener('DOMContentLoaded', function () {
    // Logout functionality
    const logoutButton = document.getElementById('logout');

    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();
            // Clear user session (example: remove from localStorage)
            localStorage.removeItem('user');
            // Redirect to login page
            window.location.href = 'pages/login.html';
        });
    }

    // Check if user is logged in (example)
    const user = localStorage.getItem('user');
    if (!user && window.location.pathname !== '/pages/login.html' && window.location.pathname !== '/pages/signup.html') {
        // If not logged in and not on login/signup page, redirect to login
        //window.location.href = 'pages/login.html';
    }

    // Example: Display user info on the page (if logged in)
    // const userInfoElement = document.getElementById('user-info');
    // if (userInfoElement && user) {
    //     userInfoElement.textContent = `Welcome, ${JSON.parse(user).username}!`;
    // }
});