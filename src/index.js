// base style
import './styles/ui.less';
import 'simple-line-icons/css/simple-line-icons.css';

// 全局依赖模块
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngAnimate from 'angular-animate';
import 'oclazyload';
// pages
import layoutModule from './components/_layout';
import homeRouter from './pages/home/home.router';
import moviesRouter from './pages/movies/movies.router';
import billboardRouter from './pages/billboard/billboard.router';
import moviesProfileRouter from './pages/movie-profile/movie-profile.router';

// 模块
const modules = [
    uiRouter,
    'oc.lazyLoad',
    ngResource,
    ngAnimate,
    layoutModule.name,
    homeRouter.name,
    moviesRouter.name,
    billboardRouter.name,
    moviesProfileRouter.name
];

// global __APP_NAME__:true
export default angular.module(__APP_NAME__, modules);
