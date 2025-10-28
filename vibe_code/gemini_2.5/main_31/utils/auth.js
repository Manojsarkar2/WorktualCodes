const USERS_KEY = 'whimsy_world_users';
const CURRENT_USER_KEY = 'whimsy_world_current_user';

const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const saveCurrentUser = (user) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

const removeCurrentUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const signupUser = (username, email, password) => {
    const users = getUsers();
    if (users.some(user => user.email === email)) {
        return false; // User with this email already exists
    }

    const newUser = { username, email, password };
    users.push(newUser);
    saveUsers(users);
    saveCurrentUser(newUser); // Log in new user automatically
    return true;
};

export const loginUser = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        saveCurrentUser(user);
        return true;
    }
    return false;
};

export const logoutUser = () => {
    removeCurrentUser();
};

export const isAuthenticated = () => {
    return !!localStorage.getItem(CURRENT_USER_KEY);
};

export const getUser = () => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
};
