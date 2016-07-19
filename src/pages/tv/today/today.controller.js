class TvTodayController {
    constructor($rootScope, $q, $state, TvApi) {
        'ngInject';
        Object.assign(this, {$rootScope, $q, $state, TvApi});
        this.paginationConfig = {
            currentPage: this.$state.params.page || 1,
            itemsPerPage: 20,
            pagesLength: 9,
            pageOnChange: () => {
                this.$state.go($state.current, {page: this.paginationConfig.currentPage});
            }
        };
        this.title = '今日播出剧集';
        this.description = `Get the list of TV shows that air today. Without a specified timezone,
            this query defaults to EST (Eastern Time UTC-05:00).`;
        this.activate();
    }
    activate() {
        // 获取电影列表数据
        this.$getTv();
    }
    $getTv() {
        const TvPromise = this.TvApi.$list(
            {type: 'airing_today', page: this.paginationConfig.currentPage});
        TvPromise.then((resp) => {
            this.tvs = resp.results;
            this.totalResults = resp.total_results;
            // 更新分页
            this.paginationConfig.totalItems = resp.total_results;
            this.paginationConfig.currentPage = resp.page;
        });
    }
}

export default TvTodayController;
