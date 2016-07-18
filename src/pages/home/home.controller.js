class HomeController {
    constructor($q, MoviesApi) {
        'ngInject';
        Object.assign(this, {$q, MoviesApi});
        this.activate();
    }
    activate() {
        this.getPopularMovies();
    }
    getPopularMovies() {
        const popularMoviesPromise = this.MoviesApi.$list({movie_type: 'now_playing'});
        popularMoviesPromise.then((resp) => {
            this.popularMovies = resp.results.slice(0, 10);
            this.upComingMovies = resp.results.slice(10, 20);
            this.getTopRatedMovies();
        }, (err) => {
            console.log(err);
        });
    }
    getTopRatedMovies() {
        const topMoviesPromise = this.MoviesApi.$list({movie_type: 'top_rated'});
        topMoviesPromise.then((resp) => {
            this.topRatedMovies = resp.results.slice(0, 20);
        }, (err) => {
            console.log(err);
        });
    }
}

export default HomeController;
