class SignInController {
    constructor(AccountApi) {
        'ngInject';
        Object.assign(this, {AccountApi});
        this.$checkLoggedInStatus();
    }

    // 验证用户本地 session
    $checkLoggedInStatus() {
        this.hasUserLoginState = true;
        const isLoggedIn = this.AccountApi.$isLoggedIn();
        if (isLoggedIn) {
            const userInfo = this.AccountApi.$getUserInfo();
            this.userInfo = userInfo;
            console.log(this.userInfo);
        } else {
            this.hasUserLoginState = false;
        }
    }
}
export default SignInController;
