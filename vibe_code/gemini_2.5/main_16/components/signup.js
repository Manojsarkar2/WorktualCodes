export function renderSignup() {
    return `
        <section class="form-container">
            <h1>Create an Account</h1>
            <form id="signup-form">
                <div class="form-group">
                    <label for="signupUsername">Username</label>
                    <input type="text" id="signupUsername" name="username" required>
                </div>
                <div class="form-group">
                    <label for="signupPassword">Password</label>
                    <input type="password" id="signupPassword" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>
                <button type="submit" class="primary">Sign Up</button>
            </form>
            <p class="switch-form">Already have an account? <a href="/login" class="nav-link">Login</a></p>
        </section>
    `;
}
