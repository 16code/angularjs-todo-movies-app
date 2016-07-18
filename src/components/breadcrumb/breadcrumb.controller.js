class BreadcrumbController {
    constructor($state, $rootScope) {
        'ngInject';
        Object.assign(this, {$state, $rootScope});
        this.breadcrumb(this.$state.current, this.$state.params);
    }
    breadcrumb(state, params) {
        this.breadcrumbs = [];
        const currentName = state.name;
        const parentStateNames = this.getParentStates(currentName);
        parentStateNames.forEach((name) => {
            const stateConfig = this.$state.get(name);
            if (stateConfig.abstract) return;
            const breadcrumb = {
                link: name,
                text: stateConfig.data.title
            };
            this.breadcrumbs.push(breadcrumb);
        });
        const length = this.breadcrumbs.length;
        if (params && length > 0) {
            const lastBreadcrumb = this.breadcrumbs[length - 1];
            lastBreadcrumb.link = `${lastBreadcrumb.link}(${JSON.stringify(params)})`;
        }
    }
    getParentStates(stateName) {
        const states = [];
        try {
            const splitStates = stateName.split('.');
            if (splitStates.length > 1) {
                for (let i = 1; i < splitStates.length; i++) {
                    const name = splitStates.slice(0, i + 1);
                    states.push(name.join('.'));
                }
            }
        } catch (e) {
            console.log(e);
        }
        return states;
    }
}

export default BreadcrumbController;
