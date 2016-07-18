import './breadcrumb.less';
import breadcrumbHtml from './breadcrumb.html';
import BreadcrumbController from './breadcrumb.controller';
const breadcrumbComponent = {
    bindings: true,
    template: breadcrumbHtml,
    controller: BreadcrumbController,
    controllerAs: 'vm'
};
export default angular.module('app.components.breadcrumb', [])
    .component('breadcrumb', breadcrumbComponent);
