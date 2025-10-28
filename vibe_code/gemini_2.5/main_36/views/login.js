export const Login = () => `
    <div class="contact-form-container">
        <h2>Login to Flipkart</h2>
        <form id="login-form">
            <label for="login-email">Email:</label>
            <input type="email" id="login-email" name="email" required>

            <label for="login-password">Password:</label>
            <input type="password" id="login-password" name="password" required>

            <button type="submit">Login</button>
        </form>
        <p class="text-center mt-20">Don't have an account? <a href="/signup" data-link>Sign Up</a></p>
    </div>
`;