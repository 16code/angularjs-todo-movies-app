// 依赖组件
import movieCard from '../../components/movie-card';
import pagination from '../../components/pagination';

import PlayingController from './now-playing/controller';
import UpcomingController from './upcoming/controller';
import PopularController from './popular/controller';

const module = angular.module('app.pages.movies', [movieCard.name, pagination.name])
    .controller(PlayingController.name, PlayingController)
    .controller(UpcomingController.name, UpcomingController)
    .controller(PopularController.name, PopularController);

export default module.name;
