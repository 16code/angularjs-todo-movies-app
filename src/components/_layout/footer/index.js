import './footer.less';
import footerHtml from './footer.html';
import FooterController from './footer.controller';
const footerModule = angular.module('app.components.footer', [])
    .controller(FooterController.name, FooterController);

export {footerModule, footerHtml};
