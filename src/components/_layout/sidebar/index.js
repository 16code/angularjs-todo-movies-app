import './sidebar.less';
import sidebarHtml from './sidebar.html';
import SidebarController from './sidebar.controller';
const sidebarModule = angular.module('app.components.sidebar', [])
    .controller(SidebarController.name, SidebarController);

export {sidebarModule, sidebarHtml};
