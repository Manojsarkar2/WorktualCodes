export function renderSignupView(parent) {
    parent.innerHTML = `
        <div class="container">
            <h1>Signup</h1>
            <form>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email"><br><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password"><br><br>
                <input type="submit" value="Submit">
            </form>
        </div>
    `;
}