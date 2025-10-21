export const renderSignup = (app) => {
    app.innerHTML = `
        <h1>Signup</h1>
        <form>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"><br><br>
            <button type="submit">Signup</button>
        </form>
    `;
};