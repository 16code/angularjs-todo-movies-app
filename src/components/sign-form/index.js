import './sign-form.less';
import signFormHTML from './sign-form.html';
import SignFormcontroller from './sign-form.controller.js';
const signInFormComponent = {
    bindings: {
        needCheckLogin: '<',
        userInfo: '<'
    },
    template: signFormHTML,
    controller: SignFormcontroller,
    controllerAs: 'form'
};
export default angular.module('app.components.signInForm', [])
    .component('signinForm', signInFormComponent);
