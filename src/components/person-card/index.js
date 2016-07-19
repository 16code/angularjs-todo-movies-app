// 电影列表组件
import './person-card.less';
import personCardHtml from './person-card.html';
const PresonCardComponent = {
    bindings: {
        person: '<'
    },
    template: personCardHtml,
    controllerAs: 'vm'
};

export default angular.module('app.components.personCard', [])
    .component('personCard', PresonCardComponent);
