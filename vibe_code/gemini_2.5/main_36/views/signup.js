export const Signup = () => `
    <div class="contact-form-container">
        <h2>Create Your Flipkart Account</h2>
        <form id="signup-form">
            <label for="signup-name">Name:</label>
            <input type="text" id="signup-name" name="name" required>

            <label for="signup-email">Email:</label>
            <input type="email" id="signup-email" name="email" required>

            <label for="signup-password">Password:</label>
            <input type="password" id="signup-password" name="password" required>

            <label for="signup-confirm-password">Confirm Password:</label>
            <input type="password" id="signup-confirm-password" name="confirmPassword" required>

            <button type="submit">Sign Up</button>
        </form>
        <p class="text-center mt-20">Already have an account? <a href="/login" data-link>Login</a></p>
    </div>
`;