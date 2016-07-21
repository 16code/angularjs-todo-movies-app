// 电影列表组件
import './movie-card.less';
import movieCardHtml from './movie-card.html';
import MovieCardController from './movie-card.controller';
const MovieCardComponent = {
    bindings: {
        movie: '<'
    },
    template: movieCardHtml,
    controller: MovieCardController,
    controllerAs: 'vm'
};

export default angular.module('app.components.movieCard', [])
    .component('movieCard', MovieCardComponent);
