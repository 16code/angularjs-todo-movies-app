import './person-profile.less';

import PersonProfileController from './person-profile.controller';
const module = angular.module('app.pages.personProfile', [])
    .controller(PersonProfileController.name, PersonProfileController);

export default module.name;
