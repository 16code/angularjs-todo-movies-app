// 电影排行榜列表组件
import './billboard-card.less';
import billboardCardHtml from './billboard-card.html';
import BillboardCardController from './billboard-card.controller';
const BillboardCardComponent = {
    bindings: {
        movie: '<',
        index: '@'
    },
    template: billboardCardHtml,
    controller: BillboardCardController,
    controllerAs: 'vm'
};

export default angular.module('app.components.billboardCard', [])
    .component('billboardCard', BillboardCardComponent);
