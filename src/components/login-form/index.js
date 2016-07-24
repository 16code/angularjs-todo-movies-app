import './login-form.less';
import loginFormHTML from './login-form.html';
import LoginFormcontroller from './login-form.controller.js';
const loginFormComponent = {
    bindings: {
        hasUserLoginState: '<',
        userInfo: '<',
        loginError: '<'
    },
    template: loginFormHTML,
    controller: LoginFormcontroller,
    controllerAs: 'form'
};
export default angular.module('app.components.loginForm', [])
    .component('loginForm', loginFormComponent);
