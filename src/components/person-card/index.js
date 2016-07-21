// 电影列表组件
import './person-card.less';
import personCardHtml from './person-card.html';
import PersonCardController from './person-card.controller';
const PresonCardComponent = {
    bindings: {
        person: '<'
    },
    template: personCardHtml,
    controller: PersonCardController,
    controllerAs: 'vm'
};

export default angular.module('app.components.personCard', [])
    .component('personCard', PresonCardComponent);
