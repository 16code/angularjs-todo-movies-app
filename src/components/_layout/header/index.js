import './header.less';
import headerHtml from './header.html';
import HeaderController from './header.controller';
const headerModule = angular.module('app.components.header', [])
    .controller(HeaderController.name, HeaderController);

export {headerModule, headerHtml};
