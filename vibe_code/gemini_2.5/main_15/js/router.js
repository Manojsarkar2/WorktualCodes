class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;
    }

    async loadRoute(path) {
        if (this.rootElement) {
            this.rootElement.innerHTML = '';
            const View = this.routes[path];
            if (View) {
                const viewInstance = new View();
                const content = await viewInstance.render();
                if (typeof content === 'string') {
                    this.rootElement.innerHTML = content;
                } else {
                    this.rootElement.appendChild(content);
                }
                if (viewInstance.after_render) {
                    await viewInstance.after_render();
                }
            } else {
                this.rootElement.innerHTML = '<h1>404 - Page Not Found</h1>';
            }
        }
    }
}

export default Router;
