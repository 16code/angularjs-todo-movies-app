class LoginController {
    constructor($state, $timeout, $rootScope, AccountApi) {
        'ngInject';
        Object.assign(this, {$state, $timeout, $rootScope, AccountApi});
        const action = this.$state.params.action;
        if (action === 'logout') {
            this.hasUserLoginState = false;
            this.AccountApi.$logout()
                .then(() => {
                    this.loginError = {
                        type: 'success',
                        text: '你已经成功退出登录!'
                    };
                });
        } else {
            this.$checkLoggedInStatus();
        }
    }

    // 验证用户本地 session
    $checkLoggedInStatus() {
        this.hasUserLoginState = true;
        const isLoggedIn = this.AccountApi.$isLoggedIn();
        if (isLoggedIn) {
            const userInfo = this.AccountApi.$getUserInfo();
            this.$timeout(() => {
                this.userInfo = userInfo;
            }, 1000);
            this.$timeout(() => {
                this.$state.go(this.$rootScope.prev.state, this.$rootScope.prev.params);
                this.$rootScope.prev = null;
            }, 2000);
        } else {
            this.$timeout(() => {
                this.hasUserLoginState = false;
            }, 1000);
        }
    }
}
export default LoginController;
