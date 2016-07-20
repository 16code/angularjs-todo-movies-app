class HeaderController {
    constructor($state) {
        'ngInject';
        this.$state = $state;
    }
    searchStart(key) {
        if (key) {
            this.$state.go('root.layout.search', {type: 'movie', keyword: key});
        }
    }
}

export default HeaderController;
