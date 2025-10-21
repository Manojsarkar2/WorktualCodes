export async function renderSignup() {
    return `
        <section id="signup">
            <h2>Signup</h2>
            <form class="auth-form">
                <label for="signup-name">Name:</label>
                <input type="text" id="signup-name" name="signup-name" required>

                <label for="signup-email">Email:</label>
                <input type="email" id="signup-email" name="signup-email" required>

                <label for="signup-password">Password:</label>
                <input type="password" id="signup-password" name="signup-password" required>

                <button type="submit">Signup</button>
            </form>
        </section>
    `;
}