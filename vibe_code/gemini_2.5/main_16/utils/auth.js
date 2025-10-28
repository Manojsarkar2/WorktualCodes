import { state, addUser, setCurrentUser, clearCurrentUser } from './state.js';

export async function login(username, password) {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 300)); 

    const user = state.users.find(u => u.username === username && u.password === password);
    if (user) {
        setCurrentUser({ username: user.username }); // Store only necessary user info
        return true;
    }
    return false;
}

export async function signup(username, password) {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 300)); 

    const success = addUser(username, password);
    return success;
}

export function logout() {
    clearCurrentUser();
}

export function getCurrentUser() {
    return state.currentUser;
}
