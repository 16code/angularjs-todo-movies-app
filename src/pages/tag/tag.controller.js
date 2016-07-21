class TagController {
    constructor($stateParams, $state, TagApi, RouterHelper) {
        'ngInject';
        Object.assign(this, {$stateParams, $state, TagApi, RouterHelper});
        this.paginationConfig = {
            currentPage: this.$stateParams.page || 1,
            itemsPerPage: 20,
            pagesLength: 9,
            state: $state.current.name
        };
        this.title = ($stateParams.name).replace(/\-/, ' ');
        this.description = 'Get the basic information for a specific keyword id.';
        this.RouterHelper.updateDocTitle(`与${this.title}相关的电影`);
        this.activate();
    }
    activate() {
        const TagPromise = this.TagApi.$get({
            id: this.$stateParams.id,
            page: this.paginationConfig.currentPage
        });
        TagPromise.then((resp) => {
            this.movies = resp.results;
            this.totalResults = resp.total_results;
            // 更新分页
            this.paginationConfig.totalItems = resp.total_results;
            this.paginationConfig.currentPage = resp.page;
        });
    }
}
export default TagController;
