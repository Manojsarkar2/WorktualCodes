function renderLogin() {
    return `
        <div class="login">
            <h2>Login</h2>
            <form id="loginForm">
                <label for="loginEmail">Email:</label>
                <input type="email" id="loginEmail" name="loginEmail" required>

                <label for="loginPassword">Password:</label>
                <input type="password" id="loginPassword" name="loginPassword" required>

                <button type="submit">Login</button>
            </form>
        </div>
    `;
}

function attachAuthFormListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Mock authentication logic
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (email === 'test@example.com' && password === 'password') {
                alert('Login successful!');
                // Store session data (mock)
                localStorage.setItem('user', JSON.stringify({ email: email }));
                navigateTo('/home');
            } else {
                alert('Invalid credentials.');
            }
        });
    }
}
