class PersonProfileController {
    constructor($stateParams, personProfile, PersonApi) {
        'ngInject';
        Object.assign(this, {$stateParams, personProfile, PersonApi});
        this.profile = personProfile;
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
        });
    }
}

export default PersonProfileController;
