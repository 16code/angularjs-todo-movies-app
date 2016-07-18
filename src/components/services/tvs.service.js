const errorHandler = Symbol();
class TvSource {
    constructor($resource, $q, API, ErrorHandler) {
        'ngInject';
        Object.assign(this, {$resource, $q, API, ErrorHandler});
        this[errorHandler] = this.ErrorHandler.catcher.bind(this.ErrorHandler);
        this.deferred = this.$q.defer();
    }
    sourceByList(tpye) {
        const api = this.$resource(`${this.API}/tv/:type`, {}, {
            get: {cache: true}
        });
        return this.$q((resolve) => {
            const promise = api.get(tpye).$promise;
            promise.then((resp) => resolve(resp))
            .catch(this[errorHandler]);
        });
    }
}
class TvService extends TvSource {
    // 电视列表
    $list(params) {
        return super.sourceByList(params);
    }
}
export default TvService;
