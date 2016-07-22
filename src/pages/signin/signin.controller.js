class SignInController {
    constructor(Storage, AccountApi) {
        'ngInject';
        Object.assign(this, {Storage, AccountApi});
        const aa = this.Storage.get('acc');
        console.log(aa);
    }
}
export default SignInController;
