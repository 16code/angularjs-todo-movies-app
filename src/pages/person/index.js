import './person.less';

import pagination from '../../components/pagination';
import PersonController from './person.controller';
import personCard from '../../components/person-card';
const module = angular.module('app.pages.person', [
    personCard.name,
    pagination.name
]).controller(PersonController.name, PersonController);

export default module.name;
