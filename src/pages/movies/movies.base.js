class MoviesBaseController {
    // 数据类型说明
    // popular 推荐，  now_playing 已上线电影， upcoming 即将上线，top_rated 热门
    constructor() {
        this.paginationConfig = {
            itemsPerPage: 20,
            pagesLength: 9
        };
    }
    activate() {
        this.$getMovies();
    }
    $getMovies() {
        const popularMoviesPromise = this.MoviesApi.$list({
            movie_type: this.movieType,
            page: this.paginationConfig.currentPage || 1
        });
        popularMoviesPromise.then((resp) => {
            this.movies = resp.results;
            this.totalResults = resp.total_results;
            // 更新分页
            this.paginationConfig.totalItems = resp.total_results;
            this.paginationConfig.currentPage = resp.page;
        });
    }
}

export default MoviesBaseController;
