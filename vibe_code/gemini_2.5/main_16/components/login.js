export function renderLogin() {
    return `
        <section class="form-container">
            <h1>Login to Your Account</h1>
            <form id="login-form">
                <div class="form-group">
                    <label for="loginUsername">Username</label>
                    <input type="text" id="loginUsername" name="username" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" name="password" required>
                </div>
                <button type="submit" class="primary">Login</button>
            </form>
            <p class="switch-form">Don't have an account? <a href="/signup" class="nav-link">Sign Up</a></p>
        </section>
    `;
}
