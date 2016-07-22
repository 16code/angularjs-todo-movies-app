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
import tvRouter from './pages/tv/tv.router';
import personRouter from './pages/person/person.router';

import tagRouter from './pages/tag/tag.router';
import searchRouter from './pages/search/search.router';

import billboardRouter from './pages/billboard/billboard.router';
import moviesProfileRouter from './pages/movie-profile/movie-profile.router';
import personProfileRouter from './pages/person-profile/person-profile.router';

import signInRouter from './pages/signin/signin.router';

import notfoundRouter from './pages/404/404.router';
// 模块
const modules = [
    uiRouter,
    'oc.lazyLoad',
    ngResource,
    ngAnimate,
    layoutModule.name,
    homeRouter.name,
    moviesRouter.name,
    tvRouter.name,
    personRouter.name,
    tagRouter.name,
    searchRouter.name,
    billboardRouter.name,
    moviesProfileRouter.name,
    personProfileRouter.name,
    signInRouter.name,
    notfoundRouter.name
];

// global __APP_NAME__:true
export default angular.module(__APP_NAME__, modules);
