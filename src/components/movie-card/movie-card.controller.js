class MovieCardController {
    constructor($filter) {
        'ngInject';
        this.genre = $filter('parseGenre')(this.movie.genre_ids);
        this.vote = $filter('voteFilter')(this.movie.vote_average);
    }
}

export default MovieCardController;
