const store = {};

export const getStore = () => {
    return store;
};

export const updateStore = (key, value) => {
    store[key] = value;
    // You might want to trigger a re-render here if needed
    // For simplicity, we're skipping it in this example
};