class SearchController {
    constructor($stateParams, $location, $state, SearchApi, RouterHelper) {
        'ngInject';
        Object.assign(this, {
            $stateParams,
            $location,
            $state,
            SearchApi,
            RouterHelper
        });
        this.paginationConfig = {
            currentPage: this.$stateParams.page || 1,
            itemsPerPage: 20,
            pagesLength: 9,
            state: $state.current.name
        };
        this.currentType = $stateParams.type || 'movie';
        if (!$stateParams.type) {
            this.currentType = 'movie';
        }
        this.searchTypes = {
            movie: {
                key: 'movie',
                color: 'warning',
                totalResults: this.moviesLastTotal
            },
            person: {
                key: 'person',
                color: 'primary',
                totalResults: this.personsLastTotal
            }
        };
        this.keyword = $stateParams.keyword || null;
        if (this.keyword) {
            this.activate();
        }
    }
    activate() {
        this.$location.search('keyword', this.keyword);
        const SearchPromise = this.SearchApi.$get({
            type: this.currentType || 'movie',
            query: this.keyword,
            page: this.paginationConfig.currentPage
        });
        SearchPromise.then((resp) => {
            if (this.currentType === 'movie') {
                this.movies = resp.results;
                this.searchTypes.movie.totalResults = resp.total_results;
                this.searchTypes.person.totalResults = this.personsLastTotal;
            } else {
                this.persons = resp.results;
                this.searchTypes.movie.totalResults = this.moviesLastTotal;
                this.searchTypes.person.totalResults = resp.total_results;
            }
            this.totalResults = resp.total_results;
            this.$resolved = resp.$resolved;
            // 更新分页
            this.paginationConfig.totalItems = resp.total_results;
            this.paginationConfig.currentPage = resp.page;
            this.RouterHelper.updateDocTitle(`${this.keyword}的搜索结果，共计${this.totalResults}条数据`);
        }, () => {
            this.$resolved = true;
        });
    }
    searchStart() {
        this.activate();
    }
    changeSearchType(type) {
        this.paginationConfig.currentPage = 1;
        this.currentType = type.key;
        this.$location.search('page', 1);
        this.$location.search('type', this.currentType);
        this.activate();
    }
}
export default SearchController;
