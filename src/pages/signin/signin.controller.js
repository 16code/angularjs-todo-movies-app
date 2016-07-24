class SignInController {
    constructor($timeout, $rootScope, AccountApi) {
        'ngInject';
        Object.assign(this, {$timeout, $rootScope, AccountApi});
        this.$checkLoggedInStatus();
    }

    // 验证用户本地 session
    $checkLoggedInStatus() {
        this.hasUserLoginState = true;
        const isLoggedIn = this.AccountApi.$isLoggedIn();
        if (isLoggedIn) {
            const userInfo = this.AccountApi.$getUserInfo();
            this.$timeout(() => {
                this.userInfo = userInfo;
            }, 3000);
            console.log(userInfo);
            console.log(this.$rootScope.prev);
        } else {
            this.hasUserLoginState = false;
        }
    }
}
export default SignInController;
