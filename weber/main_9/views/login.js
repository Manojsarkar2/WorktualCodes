export const renderLoginView = (container) => {
    container.innerHTML = `
        <h1>Login</h1>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Login</button>
        </form>
    `;

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle login logic here (e.g., validate against stored data)
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Mock authentication (replace with actual logic)
        if (username === 'user' && password === 'password') {
            alert('Login successful!');
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect to profile or another page
        } else {
            alert('Invalid credentials.');
        }
    });
};