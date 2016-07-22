const [isLoggedIn, userInfo] = [Symbol(), Symbol()];
class AccountService {
    constructor($resource, $rootScope, $q, ErrorHandler, API) {
        'ngInject';
        Object.assign(this, {$resource, $rootScope, $q, ErrorHandler, API});
        this[isLoggedIn] = false;
        this[userInfo] = null;
    }
    // 验证用户是否已登录
    $isLoggedIn() {
        return this[isLoggedIn];
    }
    $login(token, account) {
        return this.$q((resolve, reject) => {
            const promise = this.$validateLogin(token, account);
            promise.then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    }
    // 请求token
    $requestToken() {
        const api = this.$resource(`${this.API}/authentication/token/new`);
        return this.$q((resolve) => {
            const promise = api.get().$promise;
            promise.then((resp) => resolve(resp))
                .catch((reason) => this.ErrorHandler.catcher(reason));
        });
    }
    // 验证登录状态
    $validateLogin(token, account) {
        const api = this.$resource(`${this.API}/authentication/token/validate_with_login`);
        const {username, password} = account;
        return this.$q((resolve, reject) => {
            const promise = api.get({request_token: token.request_token, username, password}).$promise;
            promise.then((resp) => {
                if (resp.success) {
                    return resolve(resp);
                }
                return resolve(false);
            }, (err) => {
                reject(err);
            });
        });
    }
    $session(token) {
        const api = this.$resource(`${this.API}/authentication/session/new`);
        return this.$q((resolve, reject) => {
            const promise = api.get({request_token: token.request_token}).$promise;
            promise.then((resp) => {
                if (resp.success) {
                    return resolve(resp);
                }
                return resolve(false);
            }, (err) => {
                reject(err);
            });
        });
    }
}

export default AccountService;
