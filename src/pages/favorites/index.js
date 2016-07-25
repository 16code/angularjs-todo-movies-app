import './favorites.less';
import FavoriteService from '../../components/services/favorites.service';
import FavoritesController from './favorites.controller';
const module = angular.module('app.pages.favorites', [])
    .service('FavoriteApi', FavoriteService)
    .controller(FavoritesController.name, FavoritesController);

export default module.name;
