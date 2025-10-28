const createStore = (initialState) => {
    let state = initialState;
    const listeners = new Set();

    return {
        getState: () => state,
        setState: (newState) => {
            const prevState = state;
            state = { ...state, ...newState };
            // Notify listeners about the change
            listeners.forEach(listener => listener(state, prevState));
        },
        subscribe: (listener) => {
            listeners.add(listener);
            // Return an unsubscribe function
            return () => listeners.delete(listener);
        }
    };
};

export const store = createStore({
    // Example state properties
    isLoading: false,
    contactFormStatus: null, // 'idle', 'submitting', 'success', 'error'
    subscribeFormStatus: null,
    // Any other global state like modal open/close, user data, etc.
});