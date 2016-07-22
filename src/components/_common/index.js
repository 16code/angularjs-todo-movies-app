import RouterHelperProvider from '../services/router-helper.provider';
import LoginResolveService from '../services/user-resolve.service';
import MoviesService from '../services/movies.service';
import PersonService from '../services/person.service';
import TvService from '../services/tvs.service';
import Base64Unicode from '../services/base64code.service';
import ScrollEventService from '../services/scroll-coord-event.service';
import HttpInterceptor from '../services/http-interceptor.service';
import ErrorHandlerService from '../services/error-handler.service';
import ErrorMessagesService from '../services/error-messages.service';
import AccountService from '../services/account.service';
import StorageService from '../services/storage.service';
// filter
import filter from '../filter';
// components
import loadingBar from '../loading-bar';
import uiButterbar from '../ui-butterbar';
import imgLoad from '../img-load';
import breadcrumb from '../breadcrumb';
import notification from '../ui-notification';
// config
import appConfig from './config';
// constant
import appConstant from './constant.config';
// run
import appRun from './run';
export default angular.module('app.common',
    [
        appConstant.name,
        loadingBar.name,
        uiButterbar.name,
        imgLoad.name,
        breadcrumb.name,
        notification.name,
        filter.name
    ])
    .service('ErrorHandler', ErrorHandlerService)
    .service('ErrorMessage', ErrorMessagesService)
    .service('LoginResolve', LoginResolveService)
    .service('MoviesApi', MoviesService)
    .service('PersonApi', PersonService)
    .service('AccountApi', AccountService)
    .service('TvApi', TvService)
    .service('Base64code', Base64Unicode)
    .service('Storage', StorageService)
    .service('ScrollEvent', ScrollEventService)
    .factory('HttpInterceptor', HttpInterceptor)
    .provider('RouterHelper', RouterHelperProvider)
    .filter('voteFilter', () => {
        return (vote) => {
            const result = Number(vote);
            return result.toFixed(1);
        };
    })
    .config(appConfig)
    .run(appRun);
