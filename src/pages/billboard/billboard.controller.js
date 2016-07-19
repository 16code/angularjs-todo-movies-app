const [timer, ajaxBusy, currentPage, ScrollHandler] = [Symbol(), Symbol(), Symbol(), Symbol()];
class BillboardController {
    constructor($document, $timeout, $rootScope, MoviesApi, ScrollEvent) {
        'ngInject';
        Object.assign(this, {$document, $timeout, $rootScope, MoviesApi, ScrollEvent});
        this[ScrollHandler] = this.ScrollEvent.$offsetTop.bind(this.ScrollEvent);
        this.movies = [];
        this[currentPage] = false;
        this[ajaxBusy] = false;
        this[timer] = false;
        this.activate();
    }
    activate() {
        // 获取电影列表数据
        this.$rootScope.$on('$stateChangeSuccess', () => {
            angular.element(this.$document[0]).unbind('scroll');
            this[ajaxBusy] = false;
        });
        this.$getMovies();
        this.scrollEvent();
    }
    scrollEvent() {
        angular.element(this.$document[0]).bind('scroll', () => {
            if (this[timer]) this.$timeout.cancel(this[timer]);
            this[timer] = this.$timeout(() => {
                const loadingCondition = this[ScrollHandler]();
                if (loadingCondition < 100 && !this[ajaxBusy]) {
                    this.$getMovies();
                }
            }, 1000);
        });
    }
    $getMovies() {
        if (this[ajaxBusy]) return;
        this[ajaxBusy] = true;
        const topRatedMoviesPromise = this.MoviesApi.$list({movie_type: 'top_rated', page: this[currentPage] || 1});
        topRatedMoviesPromise.then((resp) => {
            this.totalResults = resp.total_results;
            this.movies = this.movies.concat(resp.results);
            // 更新分页
            this.totalItems = resp.total_results;
            this[currentPage] = resp.page;
            this[currentPage]++;
            this[ajaxBusy] = false;
        }, () => {
            this[ajaxBusy] = false;
        });
    }
}
export default BillboardController;
