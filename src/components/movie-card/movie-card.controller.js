class MovieCardController {
    constructor($filter) {
        'ngInject';
        this.$filter = $filter;
    }
    $onInit() {
        this.genre = this.$filter('parseGenre')(this.movie.genre_ids);
        this.vote = this.$filter('voteFilter')(this.movie.vote_average);
    }
}

export default MovieCardController;
