// 电影列表组件
import './tv-card.less';
import tvCardHtml from './tv-card.html';
const TvCardComponent = {
    bindings: {
        tv: '<'
    },
    template: tvCardHtml,
    controller: class TvController {
        constructor() {
            'ngInject';
        }
    },
    controllerAs: 'vm'
};

export default angular.module('app.components.tvCard', [])
    .component('tvCard', TvCardComponent);
