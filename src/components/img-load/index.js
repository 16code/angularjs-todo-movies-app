import imgLoadDirective from './imgload.directive';
const imgLoad = angular.module('app.components.imgload', [])
    .directive('imgload', imgLoadDirective);
export default imgLoad;
