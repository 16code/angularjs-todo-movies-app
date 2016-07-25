const [timer, backdropsIsLoaded] = [Symbol(), Symbol()];
class MovieProfileController {
    constructor($rootScope, $document, $timeout, movieProfile, RouterHelper, MoviesApi, FavoriteApi) {
        'ngInject';
        Object.assign(this, {
            $rootScope,
            $document,
            $timeout,
            movieProfile,
            RouterHelper,
            MoviesApi,
            FavoriteApi
        });
        this.movie = this.movieProfile.profile;
        this.credits = this.movieProfile.credits;
        this[backdropsIsLoaded] = false;
        this[timer] = false;
        this.scrollFunc = null;
        // 更新标题
        RouterHelper.updateDocTitle(this.movie.title);
        this.activate();
    }
    activate() {
        this.getMovieKeyWords();
        if (this.$rootScope.userIsLoggedIn && this.$rootScope.user.session) {
            this.validateFavoriteState();
        }
    }
    validateFavoriteState() {
        const query = {
            session_id: this.$rootScope.user.session,
            id: this.movie.id
        };
        this.FavoriteApi.$favoriteState(query)
            .then((resp) => {
                this.isFavorite = resp;
            });
    }
    getMovieKeyWords() {
        this.MoviesApi.$profile({id: this.movie.id, type: 'keywords'})
            .then((resp) => {
                this.tags = resp.keywords;
                this.tags.$resolved = resp.$resolved;
                this.loadImages();
            }, (err) => {
                console.log(err);
                this.tags.$resolved = true;
            });
    }
    // 加载海报和剧照
    loadImages() {
        this[backdropsIsLoaded] = true;
        this.MoviesApi.$profile({id: this.movie.id, type: 'images', language: 'en'})
            .then((resp) => {
                angular.element(this.$document[0]).unbind('scroll');
                this.backdrops = resp.backdrops;
                this.posters = resp.posters.slice(0, 10);
                this.posters.$resolved = resp.$resolved;
            }, (err) => {
                console.log(err);
                this[backdropsIsLoaded] = false;
                this.posters.$resolved = true;
            });
    }
    // 添加收藏 && 取消收藏
    favoriteHandle(id) {
        const params = {
            session: this.$rootScope.user.session,
            media_type: 'movie',
            media_id: id,
            favorite: !this.isFavorite.favorite
        };
        this.FavoriteApi.$favorite(params)
            .then(() => {
                this.isFavorite.favorite = !this.isFavorite.favorite;
            });
    }
}
export default MovieProfileController;
