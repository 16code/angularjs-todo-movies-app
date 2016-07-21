class PersonProfileController {
    constructor($stateParams, $filter, personProfile, PersonApi, RouterHelper) {
        'ngInject';
        Object.assign(this, {$stateParams, $filter, personProfile, PersonApi});
        this.profile = personProfile;
        this.popularity = $filter('voteFilter')(this.profile.popularity);
        RouterHelper.updateDocTitle(this.profile.name);
        this.activate();
    }
    activate() {
        this.PersonApi.$movies({
            id: this.$stateParams.id,
            type: 'movie_credits',
            sort_by: 'created_at'
        }).then((resp) => {
            this.sortList = resp.cast;
            this.sortByDateMovies = this.sortList.sort((a, b) => {
                return new Date(b.release_date) - new Date(a.release_date);
            });
            this.movies = resp.cast.slice(0, 10);
            this.timeLineMovies = this.groupMovies();
        });
    }
    groupMovies() {
        const movieGroup = {};
        const hasKey = Object.prototype.hasOwnProperty;
        for (const movie of this.sortByDateMovies) {
            const movieDate = new Date(movie.release_date);
            const movieYear = movieDate.getFullYear();
            let movieMonth = (movieDate.getMonth() + 1);
            let movieDay = movieDate.getDate();
            movieMonth = movieMonth < 10 ? `0${movieMonth}` : movieMonth;
            movieDay = movieDay < 10 ? `0${movieDay}` : movieDay;
            const parseDate = `${movieMonth}-${movieDay}`;
            if (!hasKey.call(movieGroup, movieYear)) {
                movieGroup[movieYear] = [];
            }
            movie.release_date = parseDate;
            movieGroup[movieYear].push(movie);
        }
        return movieGroup;
    }
}

export default PersonProfileController;
