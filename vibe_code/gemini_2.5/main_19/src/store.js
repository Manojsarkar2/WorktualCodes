export const store = (() => {
    let state = {
        route: '/',
        data: null, // Placeholder for potential future data fetching
        // ... other global state properties
    };
    const listeners = [];

    const getState = () => ({ ...state }); // Return a copy of the state

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            // Unsubscribe function
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    };

    const dispatch = (actionType, payload) => {
        let newState = { ...state };

        switch (actionType) {
            case 'ROUTE_CHANGE':
                newState.route = payload;
                break;
            // Add other action types as needed
            case 'SET_DATA':
                newState.data = payload;
                break;
            default:
                console.warn(`Unknown action type: ${actionType}`);
                return;
        }

        state = newState;
        listeners.forEach(listener => listener(getState()));
    };

    return {
        getState,
        subscribe,
        dispatch,
    };
})();
