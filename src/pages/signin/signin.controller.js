class SignInController {
    constructor(Storage, AccountApi) {
        'ngInject';
        Object.assign(this, {Storage, AccountApi});
        this.$checkLoggedInStatus();
    }
    // 验证本地 session_id
    $checkLoggedInStatus() {
        this.needCheckLogin = true;
        const userSession = this.Storage.get('session');
        if (userSession) {
            this.userInfo = userSession;
        } else {
            this.needCheckLogin = false;
        }
    }
}
export default SignInController;
