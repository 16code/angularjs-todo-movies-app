const errorHandler = Symbol();
class MoviesSource {
    constructor($resource, $q, API, ErrorHandler) {
        'ngInject';
        Object.assign(this, {$resource, $q, API, ErrorHandler});
        this[errorHandler] = this.ErrorHandler.catcher.bind(this.ErrorHandler);
        this.deferred = this.$q.defer();
    }
    sourceByList(movieType) {
        const api = this.$resource(`${this.API}/movie/:movie_type`, {}, {
            get: {cache: true}
        });
        return this.$q((resolve) => {
            const promise = api.get(movieType).$promise;
            promise.then((resp) => resolve(resp))
            .catch(this[errorHandler]);
        });
    }
    sourceByOne(params) {
        const api = this.$resource(`${this.API}/movie/:id/:type`, {}, {
            get: {cache: true}
        });
        return this.$q((resolve) => {
            const promise = api.get(params).$promise;
            promise.then((resp) => resolve(resp))
            .catch(this[errorHandler]);
        });
    }
}
class MoviesService extends MoviesSource {
    // 电影列表
    $list(params) {
        return super.sourceByList(params);
    }
    // 电影详情
    $profile(params) {
        return super.sourceByOne(params);
    }
}
export default MoviesService;
