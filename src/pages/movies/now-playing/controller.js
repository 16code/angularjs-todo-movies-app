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
            state: $state.current.name
        };
        super.activate();
    }
}

export default PlayingController;
