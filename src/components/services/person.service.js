const errorHandler = Symbol();
class PersonSource {
    constructor($resource, $q, API, ErrorHandler) {
        'ngInject';
        Object.assign(this, {$resource, $q, API, ErrorHandler});
        this[errorHandler] = this.ErrorHandler.catcher.bind(this.ErrorHandler);
        this.deferred = this.$q.defer();
    }
    source(params) {
        const api = this.$resource(`${this.API}/person/:type`, {}, {
            get: {cache: true}
        });
        return this.$q((resolve, reject) => {
            const promise = api.get(params).$promise;
            promise.then((resp) => resolve(resp), (err) => {
                reject(err);
                return this[errorHandler](err.code);
            });
        });
    }
    getMoviesById(params) {
        const api = this.$resource(`${this.API}/person/:id/:type`, {}, {
            get: {cache: true}
        });
        return this.$q((resolve, reject) => {
            const promise = api.get(params).$promise;
            promise.then((resp) => resolve(resp), (err) => {
                reject(err);
                return this[errorHandler](err.code);
            });
        });
    }
}
class PersonService extends PersonSource {
    // 电影人信息
    $profile(params) {
        return super.source(params);
    }
    $movies(params) {
        return super.getMoviesById(params);
    }
}
export default PersonService;
