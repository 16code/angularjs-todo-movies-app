import paginationHtml from './pagination.html';
import './pagination.less';
import PaginationController from './pagination.controller';
const PagingComponent = {
    bindings: {
        config: '='
    },
    template: paginationHtml,
    controller: PaginationController,
    controllerAs: 'pagination'
};

export default angular.module('app.components.pagination', [])
    .component('pagination', PagingComponent);
