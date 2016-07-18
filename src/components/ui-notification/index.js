import './notify.less';
import NotificationProvider from './notification.provider';
export default angular.module('app.components.notification', [])
    .provider('Notification', NotificationProvider);
