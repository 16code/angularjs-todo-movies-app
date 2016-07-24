import loginForm from '../../components/login-form';

import LoginController from './login.controller';
const module = angular.module('app.pages.login', [loginForm.name])
    .controller(LoginController.name, LoginController);

export default module.name;
