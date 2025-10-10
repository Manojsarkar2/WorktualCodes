export const renderSignupView = (container) => {
    container.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signupForm">
            <label for="newUsername">Username:</label>
            <input type="text" id="newUsername" name="newUsername" required>

            <label for="newPassword">Password:</label>
            <input type="password" id="newPassword" name="newPassword" required>

            <button type="submit">Sign Up</button>
        </form>
    `;

    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle signup logic here (e.g., store new user data)
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Mock signup (replace with actual logic)
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);
        alert('Sign up successful!');
        // Redirect to login or another page
    });
};