import MoviesBaseController from '../movies.base';

class PopularController extends MoviesBaseController {
    constructor($q, $state, MoviesApi) {
        'ngInject';
        super();
        Object.assign(this, {$q, $state, MoviesApi});
        this.movieType = 'popular';
        this.title = '高分电影';
        this.paginationConfig = {
            currentPage: $state.params.page,
            pageOnChange: () => {
                $state.go($state.current, {page: this.paginationConfig.currentPage});
            }
        };
        super.activate();
    }
}

export default PopularController;
