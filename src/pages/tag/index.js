// 依赖组件
import TagService from '../../components/services/tag.service';
import movieCard from '../../components/movie-card';
import pagination from '../../components/pagination';

import TagController from './tag.controller';
const module = angular.module('app.pages.tag', [
    movieCard.name,
    pagination.name
])
    .service('TagApi', TagService)
    .controller(TagController.name, TagController);

export default module.name;
