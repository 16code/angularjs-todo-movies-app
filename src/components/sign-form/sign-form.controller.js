// 首先说明一下 这个登录有点绕， 是因为接口的问题， 建议在使用过程中不这么应用
// 1. 拿着 api key 去请求 request token
// 2. 拿着 request token 去验证用户状态
// 3. 那个 request token 去请求 session_id
// 特别说明 第2步不可绕过
class SignFormcontroller {
    constructor($state, AccountApi, Storage) {
        'ngInject';
        Object.assign(this, {$state, AccountApi, Storage});
    }
    submit(account) {
        const self = this;
        // 表单是否验证通过
        if (this.loginForm.$invalid) return;
        this.loginError = null;
        this.isAjaxRequest = true;
        // api 需要先去请求 request token
        this.AccountApi.$requestToken()
            .then((resp) => {
                // token 请求成功执行登录操作
                if (resp.success) {
                    self.login(resp, account);
                }
            })
            .catch(self._error);
    }
    login(token, account) {
        const login = this.AccountApi.$login(token, account);
        login.then((resp) => {
            this.setErrorMessage('success', '登录成功，正在创建session');
            this.session(resp, account);
        }, (err) => this._error(err));
    }
    session(token, account) {
        const session = this.AccountApi.$session(token);
        session.then((resp) => {
            this.setErrorMessage('success', 'session创建成功');
            this.Storage.set('session', {
                session_id: resp.session_id,
                username: account.username
            });
        }, (err) => this._error(err));
    }
    _error(reason) {
        console.log(reason);
        this.setErrorMessage('error', reason.data.status_message);
        this.isAjaxRequest = false;
    }
    setErrorMessage(type, text) {
        this.loginError = {
            type,
            text
        };
    }
}
export default SignFormcontroller;
