// 电影列表组件
import './movie-card.less';
import movieCardHtml from './movie-card.html';
import MovieCardController from './movie-card.controller';
const MovieCardComponent = {
    bindings: {
        movie: '<'
    },
    transclude: {
        handle: '?handle'
    },
    template: movieCardHtml,
    controller: MovieCardController,
    controllerAs: 'vm'
};

export default angular.module('app.components.movieCard', [])
    .filter('parseGenre', () => {
        const originGenres = require('./origin-genres').default;
        return (genres) => {
            const result = [];
            for (const genre of genres) {
                originGenres.forEach((origin) => {
                    if (origin.id === genre) {
                        result.push(origin.name);
                    }
                });
            }
            return result.slice(0, 3).join(', ');
        };
    })
    .component('movieCard', MovieCardComponent);
