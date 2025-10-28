export const mockLogin = (username, password) => {
    // In a real app, this would be an API call.
    // For mock purposes, a simple check.
    if (username === 'user@example.com' && password === 'password123') {
        const user = { username: username, token: 'mock-jwt-token', role: 'patient' };
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user: user };
    } else {
        return { success: false, message: 'Invalid credentials.' };
    }
};

export const mockSignup = (username, password) => {
    // Simulate user registration
    const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    if (existingUsers.some(u => u.username === username)) {
        return { success: false, message: 'User already exists.' };
    }
    const newUser = { username: username, password: password, role: 'patient' };
    existingUsers.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
    return { success: true, message: 'Registration successful. Please log in.' };
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.removeItem('currentUser');
};
