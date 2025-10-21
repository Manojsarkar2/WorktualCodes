export async function renderLogin() {
    return `
        <section id="login">
            <h2>Login</h2>
            <form class="auth-form">
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" name="login-email" required>

                <label for="login-password">Password:</label>
                <input type="password" id="login-password" name="login-password" required>

                <button type="submit">Login</button>
            </form>
        </section>
    `;
}