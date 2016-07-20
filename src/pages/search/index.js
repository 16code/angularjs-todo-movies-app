import './search.less';
// 依赖组件
import SearchService from '../../components/services/search.service';
import pagination from '../../components/pagination';
import personCard from '../../components/person-card';
import SearchController from './search.controller';
const module = angular.module('app.pages.search', [pagination.name, personCard.name])
    .service('SearchApi', SearchService)
    .controller(SearchController.name, SearchController);

export default module.name;
