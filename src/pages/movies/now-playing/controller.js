import MoviesBaseController from '../movies.base';

class PlayingController extends MoviesBaseController {
    constructor($q, $state, MoviesApi) {
        'ngInject';
        super();
        Object.assign(this, {$q, $state, MoviesApi});
        this.movieType = 'now_playing';
        this.title = '院线热播';
        this.description = `Get the list of movies playing that have been,
            or are being released this week. This list refreshes every day.`;
        this.paginationConfig = {
            currentPage: $state.params.page,
            pageOnChange: () => {
                $state.go($state.current, {page: this.paginationConfig.currentPage});
            }
        };
        super.activate();
    }
}

export default PlayingController;
