class PersonController {
    constructor($state, PersonApi) {
        'ngInject';
        Object.assign(this, {$state, PersonApi});
        this.title = '热门电影人';
        this.paginationConfig = {
            currentPage: this.$state.params.page || 1,
            itemsPerPage: 20,
            pagesLength: 9,
            state: $state.current.name
        };
        this.activate();
    }
    activate() {
        const PersonPromise = this.PersonApi.$profile({
            type: 'popular',
            page: this.paginationConfig.currentPage
        });
        PersonPromise.then((resp) => {
            this.persons = resp.results;
            this.totalResults = resp.total_results;
            // 更新分页
            this.paginationConfig.totalItems = resp.total_results;
            this.paginationConfig.currentPage = resp.page;
        });
    }
}
export default PersonController;
