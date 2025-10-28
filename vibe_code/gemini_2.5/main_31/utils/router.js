let currentRenderFunction = null;

export const initRouter = (renderCallback) => {
    if (renderCallback) {
        currentRenderFunction = renderCallback;
    }

    const navigate = (path) => {
        if (window.location.pathname !== path) {
            window.history.pushState({}, path, window.location.origin + path);
            if (currentRenderFunction) {
                currentRenderFunction(path);
            }
        }
    };

    const handleLocation = () => {
        const path = window.location.pathname;
        if (currentRenderFunction) {
            currentRenderFunction(path);
        }
    };

    window.onpopstate = handleLocation;

    return { navigate, handleLocation };
};
