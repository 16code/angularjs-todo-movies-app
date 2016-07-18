import './home.less';
import HomeController from './home.controller';
import movieCard from '../../components/movie-card';
const module = angular.module('app.pages.home', [
    movieCard.name
]).controller(HomeController.name, HomeController);

export default module.name;
