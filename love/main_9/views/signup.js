function renderSignup() {
    return `
        <div class="signup">
            <h2>Signup</h2>
            <form id="signupForm">
                <label for="signupEmail">Email:</label>
                <input type="email" id="signupEmail" name="signupEmail" required>

                <label for="signupPassword">Password:</label>
                <input type="password" id="signupPassword" name="signupPassword" required>

                <button type="submit">Signup</button>
            </form>
        </div>
    `;
}
