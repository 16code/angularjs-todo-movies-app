// 依赖组件
import movieCard from '../../components/movie-card';
import pagination from '../../components/pagination';

import MoviesController from './movies.controller';
const module = angular.module('app.pages.movies', [movieCard.name, pagination.name])
    .controller(MoviesController.name, MoviesController);

export default module.name;
