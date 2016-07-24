// 首先说明一下 这个登录有点绕， 是因为接口的问题， 建议在使用过程中不这么应用
// 1. 拿着 api key 去请求 request token
// 2. 拿着 request token 去验证用户状态
// 3. 那个 request token 去请求 session_id
// 特别说明 第2步不可绕过
class LoginFormcontroller {
    constructor($state, $rootScope, AccountApi) {
        'ngInject';
        Object.assign(this, {$state, $rootScope, AccountApi});
    }
    login(account) {
        // 表单是否验证通过
        if (this.loginForm.$invalid) return;
        this.loginError = null;
        this.isAjaxRequest = true;
        this.AccountApi.$login(account)
            .then(() => {
                this.$state.go(this.$rootScope.prev.state, this.$rootScope.prev.params);
                this.$rootScope.prev = null;
            }, (err) => this.__error(err));
    }
    __error(reason) {
        console.log(reason);
        this.__setErrorMessage('error', reason.data.status_message);
        this.isAjaxRequest = false;
    }
    __setErrorMessage(type, text) {
        this.loginError = {
            type,
            text
        };
    }
}
export default LoginFormcontroller;
