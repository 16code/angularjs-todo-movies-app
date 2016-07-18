// 依赖组件
import tvCard from '../../components/tv-card';
import pagination from '../../components/pagination';

import TvController from './tv.controller';
import TvTodayController from './today/today.controller';

const module = angular.module('app.pages.tv', [tvCard.name, pagination.name])
    .controller(TvController.name, TvController)
    .controller(TvTodayController.name, TvTodayController);

export default module.name;
