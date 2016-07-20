const errorHandler = Symbol();
class TagServiceBase {
    constructor($resource, $q, API, ErrorHandler) {
        'ngInject';
        Object.assign(this, {$resource, $q, API, ErrorHandler});
        this[errorHandler] = this.ErrorHandler.catcher.bind(this.ErrorHandler);
        this.deferred = this.$q.defer();
    }
    tag(params) {
        const api = this.$resource(`${this.API}/keyword/:id/movies`, {}, {
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
class TagService extends TagServiceBase {
    $get(id) {
        return super.tag(id);
    }
}
export default TagService;
