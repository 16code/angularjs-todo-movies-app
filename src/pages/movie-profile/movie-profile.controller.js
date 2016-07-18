const [timer, backdropsIsLoaded, ScrollHandler] = [Symbol(), Symbol(), Symbol()];
class MovieProfileController {
    constructor($document, $timeout, movieProfile, RouterHelper, ScrollEvent, MoviesApi) {
        'ngInject';
        Object.assign(this, {$document, $timeout, movieProfile, RouterHelper, ScrollEvent, MoviesApi});
        this[ScrollHandler] = this.ScrollEvent.$offsetTop.bind(this.ScrollEvent);
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
        this.scrollEvent();
    }
    scrollEvent() {
        if (!this.scrollFunc) {
            this.scrollFunc = () => {
                if (this[timer]) this.$timeout.cancel(this[timer]);
                this[timer] = this.$timeout(() => {
                    const loadingCondition = this[ScrollHandler]();
                    if (loadingCondition < 30 && !this[backdropsIsLoaded]) {
                        this.loadImages();
                    }
                }, 1000);
            };
        }
        angular.element(this.$document[0]).bind('scroll', this.scrollFunc);
    }
    // 加载海报和剧照
    loadImages() {
        this[backdropsIsLoaded] = true;
        this.MoviesApi.$profile({id: this.movie.id, type: 'images', language: 'en'})
            .then((resp) => {
                angular.element(this.$document[0]).unbind('scroll');
                this.backdrops = resp.backdrops;
                this.posters = resp.posters;
                this.posters.$resolved = resp.$resolved;
            }, (err) => {
                console.log(err);
                this[backdropsIsLoaded] = false;
            });
    }
}
export default MovieProfileController;
