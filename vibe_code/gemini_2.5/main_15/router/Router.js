class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.navigate(location.pathname));
        document.addEventListener('click', e => {
            const link = e.target.closest('a');
            if (link && link.matches('[data-link]')) {
                e.preventDefault();
                this.navigate(link.getAttribute('href'));
            }
        });
        this.navigate(location.pathname);
    }

    async navigate(path) {
        if (location.pathname !== path) {
            history.pushState(null, null, path);
        }
        const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/404');
        
        if (route) {
            const page = new route.component();
            const content = await page.render();
            this.rootElement.innerHTML = ''; // Clear previous content
            
            if (typeof content === 'string') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;
                while(tempDiv.firstChild) {
                    this.rootElement.appendChild(tempDiv.firstChild);
                }
            } else if (content instanceof Node) {
                this.rootElement.appendChild(content);
            }

            window.scrollTo(0, 0);

            if (page.after_render) {
                await page.after_render();
            }
        }
    }
}

export default Router;
