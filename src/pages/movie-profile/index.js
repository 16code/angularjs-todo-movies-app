import './movie-profile.less';

import FavoriteService from '../../components/services/favorites.service';

import MovieProfileController from './movie-profile.controller';
const movieProfileModule = angular.module('app.pages.moviceProfile', [])
    .service('FavoriteApi', FavoriteService)
    .controller(MovieProfileController.name, MovieProfileController);

export default movieProfileModule.name;
