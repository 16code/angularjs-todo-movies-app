class FavoritesController {
    constructor($rootScope, $filter, FavoriteApi) {
        'ngInject';
        Object.assign(this, {$rootScope, $filter, FavoriteApi});
        this.activate();
    }
    activate() {
        const {id, session} = this.$rootScope.user;
        const queryData = {
            userId: id,
            type: 'movies',
            session_id: session
        };
        this.FavoriteApi.$list(queryData)
            .then((resp) => {
                this.movies = resp.results;
                console.log(resp);
            });
    }
    genre(ids) {
        return this.$filter('parseGenre')(ids);
    }
    vote(average) {
        return this.$filter('voteFilter')(average);
    }
}
export default FavoritesController;
