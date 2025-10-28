const store = {
    state: {
        user: null,
        modalOpen: false,
        // Add other global state properties here
    },
    listeners: [],

    getState() {
        return { ...this.state };
    },

    dispatch(actionType, payload) {
        switch (actionType) {
            case 'SET_USER':
                this.state.user = payload;
                break;
            case 'OPEN_MODAL':
                this.state.modalOpen = true;
                break;
            case 'CLOSE_MODAL':
                this.state.modalOpen = false;
                break;
            // Add more actions as needed
            default:
                console.warn(`Unknown action type: ${actionType}`);
        }
        this.notifyListeners();
    },

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    },

    notifyListeners() {
        this.listeners.forEach(listener => listener());
    }
};

export default store;
