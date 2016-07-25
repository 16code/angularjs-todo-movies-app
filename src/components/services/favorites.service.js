const errorHandler = Symbol();
class FavoritesService {
    constructor($resource, $q, API, ErrorHandler) {
        'ngInject';
        Object.assign(this, {$resource, $q, API, ErrorHandler});
        this[errorHandler] = this.ErrorHandler.catcher.bind(this.ErrorHandler);
    }
    $list(parames) {
        const api = this.$resource(`${this.API}/account/:userId/favorite/:type`, {}, {
            get: {cache: false}
        });
        return this.$q((resolve, reject) => {
            const promise = api.get(parames).$promise;
            promise.then((resp) => resolve(resp), (err) => {
                reject(err);
                return this[errorHandler](err.code);
            });
        });
    }
    // 查看电影收藏状态
    $favoriteState(parames) {
        const api = this.$resource(`${this.API}/movie/:id/account_states`);
        return this.$q((resolve, reject) => {
            const promise = api.get(parames).$promise;
            promise.then((resp) => resolve(resp), (err) => {
                reject(err);
                return this[errorHandler](err.code);
            });
        });
    }
    // 添加或删除收藏
    $favorite(parames) {
        const api = this.$resource(`${this.API}/account/:id/favorite?`, {id: '@media_id', session_id: '@session'});
        return this.$q((resolve, reject) => {
            const promise = api.save(parames).$promise;
            promise.then(
                (resp) => resolve(resp),
                (err) => reject(err)
            );
        });
    }
}
export default FavoritesService;
