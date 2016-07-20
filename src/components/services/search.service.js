const errorHandler = Symbol();
class SearchServiceBase {
    constructor($resource, $q, API, ErrorHandler) {
        'ngInject';
        Object.assign(this, {$resource, $q, API, ErrorHandler});
        this[errorHandler] = this.ErrorHandler.catcher.bind(this.ErrorHandler);
        this.deferred = this.$q.defer();
    }
    search(params) {
        const api = this.$resource(`${this.API}/search/:type`, {}, {
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
class SearchService extends SearchServiceBase {
    $get(keyword) {
        return super.search(keyword);
    }
}
export default SearchService;
