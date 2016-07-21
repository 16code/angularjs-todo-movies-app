import MoviesBaseController from '../movies.base';

class UpcomingController extends MoviesBaseController {
    constructor($q, $state, MoviesApi) {
        'ngInject';
        super();
        Object.assign(this, {$q, $state, MoviesApi});
        this.movieType = 'upcoming';
        this.title = '即将上映';
        this.description = 'Get the list of upcoming movies by release date. This list refreshes every day.';
        this.paginationConfig = {
            currentPage: $state.params.page,
            state: $state.current.name
        };
        super.activate();
    }
}

export default UpcomingController;
