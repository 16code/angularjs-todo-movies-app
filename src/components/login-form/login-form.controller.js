// 首先说明一下 这个登录有点绕， 是因为接口的问题， 建议在使用过程中不这么应用
// 1. 拿着 api key 去请求 request token
// 2. 拿着 request token 去验证用户状态
// 3. 拿着 request token 去请求 session_id
// 4. 拿着 session_id 去请求用户信息
// 特别说明 第2步不可绕过
class LoginFormcontroller {
    constructor($state, $rootScope, $timeout, AccountApi) {
        'ngInject';
        Object.assign(this, {$state, $rootScope, $timeout, AccountApi});
    }
    login(account) {
        // 表单是否验证通过
        if (this.loginForm.$invalid) return;
        this.loginError = null;
        this.isAjaxRequest = true;
        this.AccountApi.$login(account)
            .then(() => {
                this.__setErrorMessage('success', '登录成功，正在重定向到登录前的页面!');
                this.$timeout(() => {
                    const uri = this.$state.href(this.$rootScope.prev.state, this.$rootScope.prev.params);
                    this.$rootScope.prev = null;
                    window.location.href = uri;
                }, 2000);
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
