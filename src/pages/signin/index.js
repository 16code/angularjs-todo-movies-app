import SignInForm from '../../components/sign-form';

import SignInController from './signin.controller';
const module = angular.module('app.pages.signIn', [SignInForm.name])
    .controller(SignInController.name, SignInController);

export default module.name;
