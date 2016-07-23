const [isLoggedIn, userInfo] = [Symbol(), Symbol()];
class AccountService {
    constructor($resource, $rootScope, $q, ErrorHandler, Storage, API) {
        'ngInject';
        Object.assign(this, {$resource, $rootScope, $q, ErrorHandler, Storage, API});
        this[isLoggedIn] = false;
        this[userInfo] = null;
    }

    $login(account) {
        return this.$q((resolve, reject) => {
            const promise = this.$requestToken();
            promise.then((respToken) => respToken)
            .then((token) => this.$validateLoggedInOnline(token, account))
            .then((validate) => this.$createSession(validate))
            .then((data) => {
                // 返回用户token session 和账户信息
                const userData = {token: data.token, session: data.session, account};
                this.__setUser(userData);
                resolve(userData);
            })
            .catch((reason) => reject(reason));
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
    $validateLoggedInOnline(token, account) {
        const api = this.$resource(`${this.API}/authentication/token/validate_with_login`);
        const {username, password} = account;
        return this.$q((resolve, reject) => {
            const promise = api.get({request_token: token.request_token, username, password}).$promise;
            promise.then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    }
    // 创建用户session
    $createSession(validateToken) {
        const api = this.$resource(`${this.API}/authentication/session/new`);
        const {request_token} = validateToken;
        return this.$q((resolve, reject) => {
            const promise = api.get({request_token}).$promise;
            promise.then((resp) => {
                resolve({token: request_token, session: resp.session_id});
            }, (err) => {
                reject(err);
            });
        });
    }
    // 验证用户是否已登录
    $isLoggedIn() {
        if (!this[userInfo]) {
            const user = this.Storage.get('user');
            if (user) {
                this[isLoggedIn] = true;
            }
        }
        return this[isLoggedIn];
    }
    // 获取用户信息
    $getUserInfo() {
        return this[userInfo] || this.Storage.get('user');
    }
    __setUser(userData) {
        this[isLoggedIn] = true;
        this[userInfo] = userData;
        this.Storage.set('user', {
            token: userData.token,
            session: userData.session,
            username: userData.account.username
        });
    }
    __clearUser() {
        this[isLoggedIn] = false;
        this[userInfo] = null;
    }
}

export default AccountService;
