const state = {
    activeNav: '#home',
    isModalOpen: false,
    // Add other global state here
};

const subscribers = {};

export const store = {
    getState: () => ({ ...state }), // Return a copy to prevent direct modification

    setState: (newState) => {
        for (const key in newState) {
            if (Object.prototype.hasOwnProperty.call(newState, key) && state[key] !== newState[key]) {
                state[key] = newState[key];
                if (subscribers[key]) {
                    subscribers[key].forEach(callback => callback(state[key]));
                }
            }
        }
    },

    subscribe: (key, callback) => {
        if (!subscribers[key]) {
            subscribers[key] = [];
        }
        subscribers[key].push(callback);
        // Immediately call with current state if available
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            callback(state[key]);
        }
        // Return unsubscribe function
        return () => {
            subscribers[key] = subscribers[key].filter(sub => sub !== callback);
        };
    },

    unsubscribe: (key, callback) => {
        if (subscribers[key]) {
            subscribers[key] = subscribers[key].filter(sub => sub !== callback);
        }
    }
};
