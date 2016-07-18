class MoviesController {
    constructor($rootScope, $q, $state, MoviesApi, RouterHelper) {
        'ngInject';
        Object.assign(this, {$rootScope, $q, $state, MoviesApi, RouterHelper});
        this.paginationConfig = {
            currentPage: this.$state.params.page || 1,
            itemsPerPage: 20,
            pagesLength: 9,
            pageOnChange: () => {
                this.$state.go($state.current, {page: this.paginationConfig.currentPage});
            }
        };
        // 数据类型说明
        // popular 推荐，  now_playing 已上线电影， upcoming 即将上线，top_rated 热门
        $state.params.type = $state.params.type || 'now_playing';
        this.movieType = 'now_playing';
        this.title = '电影';
        this.activate();
    }
    activate() {
        // 更新文档标题
        this.updateDocTitle();
        // 获取电影列表数据
        this.$getMovies();
        this.$rootScope.$on('$stateChangeStart', () => {
            this.$rootScope.stateCurrentParma = null;
        });
    }
    updateDocTitle() {
        if (this.$state.params && this.$state.params.type) {
            this.$rootScope.stateCurrentParma = this.$state.params.type;
            this.movieType = this.$state.params.type;
            switch (this.$state.params.type) {
                case 'now_playing':
                    this.title = '院线热播';
                    break;
                case 'upcoming':
                    this.title = '即将上映';
                    break;
                case 'top_rated':
                    this.title = '电影排行';
                    break;
                default:
                    this.title = '所有电影';
            }
            this.RouterHelper.updateDocTitle(this.title);
        }
    }
    $getMovies() {
        const popularMoviesPromise = this.MoviesApi.$list(
            {movie_type: this.movieType, page: this.paginationConfig.currentPage});
        popularMoviesPromise.then((resp) => {
            this.movies = resp.results;
            this.totalResults = resp.total_results;
            // 更新分页
            this.paginationConfig.totalItems = resp.total_results;
            this.paginationConfig.currentPage = resp.page;
        });
    }
}

export default MoviesController;
